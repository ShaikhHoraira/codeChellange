"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCustomerAddress = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const TABLE_NAME = process.env.TABLE_NAME || '';
const region = process.env.REGION;
const ddbClient = new client_dynamodb_1.DynamoDBClient({ region });
class GetCustomerAddress {
    constructor(userId, suburb, postcode) {
        this.userId = userId;
        this.suburb = suburb;
        this.postcode = postcode;
    }
    async getData() {
        const params = {
            TableName: TABLE_NAME,
            IndexName: "UserIdIndex",
            KeyConditionExpression: "UserId = :userId",
            ExpressionAttributeValues: {
                ":userId": { S: this.userId }, // Specifying string type for userId
            },
        };
        // Add filter expression for suburb if provided
        if (this.suburb) {
            params.FilterExpression = "Suburb = :suburb";
            params.ExpressionAttributeValues[":suburb"] = { S: this.suburb };
        }
        // Add filter expression for postcode if provided (append AND if suburb filter exists)
        if (this.postcode) {
            if (params.FilterExpression) {
                params.FilterExpression += " AND PostCode = :postcode";
            }
            else {
                params.FilterExpression = "PostCode = :postcode";
            }
            params.ExpressionAttributeValues[":postcode"] = { S: this.postcode };
        }
        try {
            const data = await ddbClient.send(new client_dynamodb_1.QueryCommand(params));
            return data.Items ?? []; // Return empty array if no items found
        }
        catch (error) {
            console.error("Error querying DynamoDB:", error);
            // Implement your specific error handling logic here
            return []; // Return empty array to avoid potential downstream errors
        }
    }
}
exports.GetCustomerAddress = GetCustomerAddress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2R1bGVzL2dldERhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsOERBQXdFO0FBRXhFLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQztBQUNoRCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztBQUVsQyxNQUFNLFNBQVMsR0FBRyxJQUFJLGdDQUFjLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBRWpELE1BQWEsa0JBQWtCO0lBSzdCLFlBQVksTUFBYyxFQUFFLE1BQWUsRUFBRSxRQUFpQjtRQUM1RCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRU0sS0FBSyxDQUFDLE9BQU87UUFDbEIsTUFBTSxNQUFNLEdBQXNCO1lBQ2hDLFNBQVMsRUFBRSxVQUFVO1lBQ3JCLFNBQVMsRUFBRSxhQUFhO1lBQ3hCLHNCQUFzQixFQUFFLGtCQUFrQjtZQUMxQyx5QkFBeUIsRUFBRTtnQkFDekIsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxvQ0FBb0M7YUFDcEU7U0FDRixDQUFDO1FBRUYsK0NBQStDO1FBQy9DLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQztZQUM3QyxNQUFNLENBQUMseUJBQXlCLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2xFO1FBRUQsc0ZBQXNGO1FBQ3RGLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDM0IsTUFBTSxDQUFDLGdCQUFnQixJQUFJLDJCQUEyQixDQUFDO2FBQ3hEO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxzQkFBc0IsQ0FBQzthQUNsRDtZQUNELE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDdEU7UUFFRCxJQUFJO1lBQ0YsTUFBTSxJQUFJLEdBQUcsTUFBTSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksOEJBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzVELE9BQU8sSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQyx1Q0FBdUM7U0FDakU7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsMEJBQTBCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDakQsb0RBQW9EO1lBQ3BELE9BQU8sRUFBRSxDQUFDLENBQUMsMERBQTBEO1NBQ3RFO0lBQ0gsQ0FBQztDQUNGO0FBOUNELGdEQThDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IER5bmFtb0RCQ2xpZW50LCBRdWVyeUNvbW1hbmQgfSBmcm9tIFwiQGF3cy1zZGsvY2xpZW50LWR5bmFtb2RiXCI7XG5cbmNvbnN0IFRBQkxFX05BTUUgPSBwcm9jZXNzLmVudi5UQUJMRV9OQU1FIHx8ICcnO1xuY29uc3QgcmVnaW9uID0gcHJvY2Vzcy5lbnYuUkVHSU9OO1xuXG5jb25zdCBkZGJDbGllbnQgPSBuZXcgRHluYW1vREJDbGllbnQoeyByZWdpb24gfSk7XG5cbmV4cG9ydCBjbGFzcyBHZXRDdXN0b21lckFkZHJlc3Mge1xuICBwdWJsaWMgdXNlcklkOiBzdHJpbmc7XG4gIHB1YmxpYyBzdWJ1cmI/OiBzdHJpbmc7IC8vIE9wdGlvbmFsIHBhcmFtZXRlclxuICBwdWJsaWMgcG9zdGNvZGU/OiBzdHJpbmc7IC8vIE9wdGlvbmFsIHBhcmFtZXRlclxuXG4gIGNvbnN0cnVjdG9yKHVzZXJJZDogc3RyaW5nLCBzdWJ1cmI/OiBzdHJpbmcsIHBvc3Rjb2RlPzogc3RyaW5nKSB7XG4gICAgdGhpcy51c2VySWQgPSB1c2VySWQ7XG4gICAgdGhpcy5zdWJ1cmIgPSBzdWJ1cmI7XG4gICAgdGhpcy5wb3N0Y29kZSA9IHBvc3Rjb2RlO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldERhdGEoKTogUHJvbWlzZTxhbnlbXT4ge1xuICAgIGNvbnN0IHBhcmFtczogUXVlcnlDb21tYW5kSW5wdXQgPSB7XG4gICAgICBUYWJsZU5hbWU6IFRBQkxFX05BTUUsXG4gICAgICBJbmRleE5hbWU6IFwiVXNlcklkSW5kZXhcIiwgLy8gQXNzdW1pbmcgeW91ciBzZWNvbmRhcnkgaW5kZXggbmFtZVxuICAgICAgS2V5Q29uZGl0aW9uRXhwcmVzc2lvbjogXCJVc2VySWQgPSA6dXNlcklkXCIsXG4gICAgICBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzOiB7XG4gICAgICAgIFwiOnVzZXJJZFwiOiB7IFM6IHRoaXMudXNlcklkIH0sIC8vIFNwZWNpZnlpbmcgc3RyaW5nIHR5cGUgZm9yIHVzZXJJZFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgLy8gQWRkIGZpbHRlciBleHByZXNzaW9uIGZvciBzdWJ1cmIgaWYgcHJvdmlkZWRcbiAgICBpZiAodGhpcy5zdWJ1cmIpIHtcbiAgICAgIHBhcmFtcy5GaWx0ZXJFeHByZXNzaW9uID0gXCJTdWJ1cmIgPSA6c3VidXJiXCI7XG4gICAgICBwYXJhbXMuRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlc1tcIjpzdWJ1cmJcIl0gPSB7IFM6IHRoaXMuc3VidXJiIH07XG4gICAgfVxuXG4gICAgLy8gQWRkIGZpbHRlciBleHByZXNzaW9uIGZvciBwb3N0Y29kZSBpZiBwcm92aWRlZCAoYXBwZW5kIEFORCBpZiBzdWJ1cmIgZmlsdGVyIGV4aXN0cylcbiAgICBpZiAodGhpcy5wb3N0Y29kZSkge1xuICAgICAgaWYgKHBhcmFtcy5GaWx0ZXJFeHByZXNzaW9uKSB7XG4gICAgICAgIHBhcmFtcy5GaWx0ZXJFeHByZXNzaW9uICs9IFwiIEFORCBQb3N0Q29kZSA9IDpwb3N0Y29kZVwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyYW1zLkZpbHRlckV4cHJlc3Npb24gPSBcIlBvc3RDb2RlID0gOnBvc3Rjb2RlXCI7XG4gICAgICB9XG4gICAgICBwYXJhbXMuRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlc1tcIjpwb3N0Y29kZVwiXSA9IHsgUzogdGhpcy5wb3N0Y29kZSB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgZGRiQ2xpZW50LnNlbmQobmV3IFF1ZXJ5Q29tbWFuZChwYXJhbXMpKTtcbiAgICAgIHJldHVybiBkYXRhLkl0ZW1zID8/IFtdOyAvLyBSZXR1cm4gZW1wdHkgYXJyYXkgaWYgbm8gaXRlbXMgZm91bmRcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHF1ZXJ5aW5nIER5bmFtb0RCOlwiLCBlcnJvcik7XG4gICAgICAvLyBJbXBsZW1lbnQgeW91ciBzcGVjaWZpYyBlcnJvciBoYW5kbGluZyBsb2dpYyBoZXJlXG4gICAgICByZXR1cm4gW107IC8vIFJldHVybiBlbXB0eSBhcnJheSB0byBhdm9pZCBwb3RlbnRpYWwgZG93bnN0cmVhbSBlcnJvcnNcbiAgICB9XG4gIH1cbn1cblxuaW50ZXJmYWNlIFF1ZXJ5Q29tbWFuZElucHV0IHtcbiAgVGFibGVOYW1lOiBzdHJpbmc7XG4gIEluZGV4TmFtZT86IHN0cmluZztcbiAgS2V5Q29uZGl0aW9uRXhwcmVzc2lvbjogc3RyaW5nO1xuICBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzOiB7IFtrZXk6IHN0cmluZ106IER5bmFtb0RCQXR0cmlidXRlVmFsdWUgfTsgLy8gSW50ZXJmYWNlIGZvciB0eXBlIHNhZmV0eVxuICBGaWx0ZXJFeHByZXNzaW9uPzogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgRHluYW1vREJBdHRyaWJ1dGVWYWx1ZSB7XG4gIFM6IHN0cmluZzsgLy8gRXhhbXBsZTogU3RyaW5nIGRhdGEgdHlwZVxuICAvLyBBZGQgb3RoZXIgZGF0YSB0eXBlcyBhcyBuZWVkZWQgKGUuZy4sIE4gZm9yIG51bWJlcilcbn1cbiJdfQ==