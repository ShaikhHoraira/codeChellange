"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCustomerAddress = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const TABLE_NAME = process.env.TABLE_NAME || '';
const region = process.env.REGION;
const ddbClient = new client_dynamodb_1.DynamoDBClient({ region });
class GetCustomerAddress {
    // public suburb?: string; // Optional parameter
    // public postcode?: string; // Optional parameter
    constructor(rentId) {
        this.rentId = rentId;
        // this.suburb = suburb;
        // this.postcode = postcode;
    }
    async getData() {
        const params = {
            TableName: TABLE_NAME,
            IndexName: "RentId",
            KeyConditionExpression: "RentId = :rentId",
            ExpressionAttributeValues: {
                ":rentId": { S: this.rentId }, // Specifying string type for rentId
            },
        };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UHJvZHVjdGlvbkNvc3REYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvUERDL2dldFByb2R1Y3Rpb25Db3N0RGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4REFBd0U7QUFFeEUsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDO0FBQ2hELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO0FBRWxDLE1BQU0sU0FBUyxHQUFHLElBQUksZ0NBQWMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFFakQsTUFBYSxrQkFBa0I7SUFFN0IsZ0RBQWdEO0lBQ2hELGtEQUFrRDtJQUVsRCxZQUFZLE1BQWM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsd0JBQXdCO1FBQ3hCLDRCQUE0QjtJQUM5QixDQUFDO0lBRU0sS0FBSyxDQUFDLE9BQU87UUFDbEIsTUFBTSxNQUFNLEdBQXNCO1lBQ2hDLFNBQVMsRUFBRSxVQUFVO1lBQ3JCLFNBQVMsRUFBRSxRQUFRO1lBQ25CLHNCQUFzQixFQUFFLGtCQUFrQjtZQUMxQyx5QkFBeUIsRUFBRTtnQkFDekIsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxvQ0FBb0M7YUFDcEU7U0FDRixDQUFDO1FBR0YsSUFBSTtZQUNGLE1BQU0sSUFBSSxHQUFHLE1BQU0sU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLDhCQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM1RCxPQUFPLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUMsdUNBQXVDO1NBQ2pFO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLDBCQUEwQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2pELG9EQUFvRDtZQUNwRCxPQUFPLEVBQUUsQ0FBQyxDQUFDLDBEQUEwRDtTQUN0RTtJQUNILENBQUM7Q0FDRjtBQS9CRCxnREErQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEeW5hbW9EQkNsaWVudCwgUXVlcnlDb21tYW5kIH0gZnJvbSBcIkBhd3Mtc2RrL2NsaWVudC1keW5hbW9kYlwiO1xuXG5jb25zdCBUQUJMRV9OQU1FID0gcHJvY2Vzcy5lbnYuVEFCTEVfTkFNRSB8fCAnJztcbmNvbnN0IHJlZ2lvbiA9IHByb2Nlc3MuZW52LlJFR0lPTjtcblxuY29uc3QgZGRiQ2xpZW50ID0gbmV3IER5bmFtb0RCQ2xpZW50KHsgcmVnaW9uIH0pO1xuXG5leHBvcnQgY2xhc3MgR2V0Q3VzdG9tZXJBZGRyZXNzIHtcbiAgcHVibGljIHJlbnRJZDogc3RyaW5nO1xuICAvLyBwdWJsaWMgc3VidXJiPzogc3RyaW5nOyAvLyBPcHRpb25hbCBwYXJhbWV0ZXJcbiAgLy8gcHVibGljIHBvc3Rjb2RlPzogc3RyaW5nOyAvLyBPcHRpb25hbCBwYXJhbWV0ZXJcblxuICBjb25zdHJ1Y3RvcihyZW50SWQ6IHN0cmluZykge1xuICAgIHRoaXMucmVudElkID0gcmVudElkO1xuICAgIC8vIHRoaXMuc3VidXJiID0gc3VidXJiO1xuICAgIC8vIHRoaXMucG9zdGNvZGUgPSBwb3N0Y29kZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXREYXRhKCk6IFByb21pc2U8YW55W10+IHtcbiAgICBjb25zdCBwYXJhbXM6IFF1ZXJ5Q29tbWFuZElucHV0ID0ge1xuICAgICAgVGFibGVOYW1lOiBUQUJMRV9OQU1FLFxuICAgICAgSW5kZXhOYW1lOiBcIlJlbnRJZFwiLCAvLyBBc3N1bWluZyB5b3VyIHNlY29uZGFyeSBpbmRleCBuYW1lXG4gICAgICBLZXlDb25kaXRpb25FeHByZXNzaW9uOiBcIlJlbnRJZCA9IDpyZW50SWRcIixcbiAgICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXM6IHtcbiAgICAgICAgXCI6cmVudElkXCI6IHsgUzogdGhpcy5yZW50SWQgfSwgLy8gU3BlY2lmeWluZyBzdHJpbmcgdHlwZSBmb3IgcmVudElkXG4gICAgICB9LFxuICAgIH07XG5cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgZGRiQ2xpZW50LnNlbmQobmV3IFF1ZXJ5Q29tbWFuZChwYXJhbXMpKTtcbiAgICAgIHJldHVybiBkYXRhLkl0ZW1zID8/IFtdOyAvLyBSZXR1cm4gZW1wdHkgYXJyYXkgaWYgbm8gaXRlbXMgZm91bmRcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHF1ZXJ5aW5nIER5bmFtb0RCOlwiLCBlcnJvcik7XG4gICAgICAvLyBJbXBsZW1lbnQgeW91ciBzcGVjaWZpYyBlcnJvciBoYW5kbGluZyBsb2dpYyBoZXJlXG4gICAgICByZXR1cm4gW107IC8vIFJldHVybiBlbXB0eSBhcnJheSB0byBhdm9pZCBwb3RlbnRpYWwgZG93bnN0cmVhbSBlcnJvcnNcbiAgICB9XG4gIH1cbn1cblxuaW50ZXJmYWNlIFF1ZXJ5Q29tbWFuZElucHV0IHtcbiAgVGFibGVOYW1lOiBzdHJpbmc7XG4gIEluZGV4TmFtZT86IHN0cmluZztcbiAgS2V5Q29uZGl0aW9uRXhwcmVzc2lvbjogc3RyaW5nO1xuICBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzOiB7IFtrZXk6IHN0cmluZ106IER5bmFtb0RCQXR0cmlidXRlVmFsdWUgfTsgLy8gSW50ZXJmYWNlIGZvciB0eXBlIHNhZmV0eVxuICBGaWx0ZXJFeHByZXNzaW9uPzogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgRHluYW1vREJBdHRyaWJ1dGVWYWx1ZSB7XG4gIFM6IHN0cmluZzsgLy8gRXhhbXBsZTogU3RyaW5nIGRhdGEgdHlwZVxuICAvLyBBZGQgb3RoZXIgZGF0YSB0eXBlcyBhcyBuZWVkZWQgKGUuZy4sIE4gZm9yIG51bWJlcilcbn1cbiJdfQ==