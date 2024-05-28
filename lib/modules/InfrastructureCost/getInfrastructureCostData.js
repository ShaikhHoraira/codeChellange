"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInfrastructureCostData = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const TABLE_NAME = process.env.TABLE_NAME || '';
const region = process.env.REGION;
const ddbClient = new client_dynamodb_1.DynamoDBClient({ region });
class GetInfrastructureCostData {
    // public suburb?: string; // Optional parameter
    // public postcode?: string; // Optional parameter
    constructor(productionCostId) {
        this.productionCostId = productionCostId;
        // this.suburb = suburb;
        // this.postcode = postcode;
    }
    async getRentData() {
        const params = {
            TableName: TABLE_NAME,
            IndexName: "ProductionCostIdIndex",
            KeyConditionExpression: "ProductionCostId = :productionCostId",
            ExpressionAttributeValues: {
                ":productionCostId": { S: this.productionCostId }, // Specifying string type for userId
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
exports.GetInfrastructureCostData = GetInfrastructureCostData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SW5mcmFzdHJ1Y3R1cmVDb3N0RGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL0luZnJhc3RydWN0dXJlQ29zdC9nZXRJbmZyYXN0cnVjdHVyZUNvc3REYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhEQUF3RTtBQUV4RSxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7QUFDaEQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFFbEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxnQ0FBYyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUVqRCxNQUFhLHlCQUF5QjtJQUVwQyxnREFBZ0Q7SUFDaEQsa0RBQWtEO0lBRWxELFlBQVksZ0JBQXdCO1FBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztRQUN6Qyx3QkFBd0I7UUFDeEIsNEJBQTRCO0lBQzlCLENBQUM7SUFFTSxLQUFLLENBQUMsV0FBVztRQUN0QixNQUFNLE1BQU0sR0FBc0I7WUFDaEMsU0FBUyxFQUFFLFVBQVU7WUFDckIsU0FBUyxFQUFFLHVCQUF1QjtZQUNsQyxzQkFBc0IsRUFBRSxzQ0FBc0M7WUFDOUQseUJBQXlCLEVBQUU7Z0JBQ3pCLG1CQUFtQixFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLG9DQUFvQzthQUN4RjtTQUNGLENBQUM7UUFHRixJQUFJO1lBQ0YsTUFBTSxJQUFJLEdBQUcsTUFBTSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksOEJBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzVELE9BQU8sSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQyx1Q0FBdUM7U0FDakU7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsMEJBQTBCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDakQsb0RBQW9EO1lBQ3BELE9BQU8sRUFBRSxDQUFDLENBQUMsMERBQTBEO1NBQ3RFO0lBQ0gsQ0FBQztDQUNGO0FBL0JELDhEQStCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IER5bmFtb0RCQ2xpZW50LCBRdWVyeUNvbW1hbmQgfSBmcm9tIFwiQGF3cy1zZGsvY2xpZW50LWR5bmFtb2RiXCI7XG5cbmNvbnN0IFRBQkxFX05BTUUgPSBwcm9jZXNzLmVudi5UQUJMRV9OQU1FIHx8ICcnO1xuY29uc3QgcmVnaW9uID0gcHJvY2Vzcy5lbnYuUkVHSU9OO1xuXG5jb25zdCBkZGJDbGllbnQgPSBuZXcgRHluYW1vREJDbGllbnQoeyByZWdpb24gfSk7XG5cbmV4cG9ydCBjbGFzcyBHZXRJbmZyYXN0cnVjdHVyZUNvc3REYXRhIHtcbiAgcHVibGljIHByb2R1Y3Rpb25Db3N0SWQ6IHN0cmluZztcbiAgLy8gcHVibGljIHN1YnVyYj86IHN0cmluZzsgLy8gT3B0aW9uYWwgcGFyYW1ldGVyXG4gIC8vIHB1YmxpYyBwb3N0Y29kZT86IHN0cmluZzsgLy8gT3B0aW9uYWwgcGFyYW1ldGVyXG5cbiAgY29uc3RydWN0b3IocHJvZHVjdGlvbkNvc3RJZDogc3RyaW5nKSB7XG4gICAgdGhpcy5wcm9kdWN0aW9uQ29zdElkID0gcHJvZHVjdGlvbkNvc3RJZDtcbiAgICAvLyB0aGlzLnN1YnVyYiA9IHN1YnVyYjtcbiAgICAvLyB0aGlzLnBvc3Rjb2RlID0gcG9zdGNvZGU7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0UmVudERhdGEoKTogUHJvbWlzZTxhbnlbXT4ge1xuICAgIGNvbnN0IHBhcmFtczogUXVlcnlDb21tYW5kSW5wdXQgPSB7XG4gICAgICBUYWJsZU5hbWU6IFRBQkxFX05BTUUsXG4gICAgICBJbmRleE5hbWU6IFwiUHJvZHVjdGlvbkNvc3RJZEluZGV4XCIsIC8vIEFzc3VtaW5nIHlvdXIgc2Vjb25kYXJ5IGluZGV4IG5hbWVcbiAgICAgIEtleUNvbmRpdGlvbkV4cHJlc3Npb246IFwiUHJvZHVjdGlvbkNvc3RJZCA9IDpwcm9kdWN0aW9uQ29zdElkXCIsXG4gICAgICBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzOiB7XG4gICAgICAgIFwiOnByb2R1Y3Rpb25Db3N0SWRcIjogeyBTOiB0aGlzLnByb2R1Y3Rpb25Db3N0SWQgfSwgLy8gU3BlY2lmeWluZyBzdHJpbmcgdHlwZSBmb3IgdXNlcklkXG4gICAgICB9LFxuICAgIH07XG5cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgZGRiQ2xpZW50LnNlbmQobmV3IFF1ZXJ5Q29tbWFuZChwYXJhbXMpKTtcbiAgICAgIHJldHVybiBkYXRhLkl0ZW1zID8/IFtdOyAvLyBSZXR1cm4gZW1wdHkgYXJyYXkgaWYgbm8gaXRlbXMgZm91bmRcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHF1ZXJ5aW5nIER5bmFtb0RCOlwiLCBlcnJvcik7XG4gICAgICAvLyBJbXBsZW1lbnQgeW91ciBzcGVjaWZpYyBlcnJvciBoYW5kbGluZyBsb2dpYyBoZXJlXG4gICAgICByZXR1cm4gW107IC8vIFJldHVybiBlbXB0eSBhcnJheSB0byBhdm9pZCBwb3RlbnRpYWwgZG93bnN0cmVhbSBlcnJvcnNcbiAgICB9XG4gIH1cbn1cblxuaW50ZXJmYWNlIFF1ZXJ5Q29tbWFuZElucHV0IHtcbiAgVGFibGVOYW1lOiBzdHJpbmc7XG4gIEluZGV4TmFtZT86IHN0cmluZztcbiAgS2V5Q29uZGl0aW9uRXhwcmVzc2lvbjogc3RyaW5nO1xuICBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzOiB7IFtrZXk6IHN0cmluZ106IER5bmFtb0RCQXR0cmlidXRlVmFsdWUgfTsgLy8gSW50ZXJmYWNlIGZvciB0eXBlIHNhZmV0eVxuICBGaWx0ZXJFeHByZXNzaW9uPzogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgRHluYW1vREJBdHRyaWJ1dGVWYWx1ZSB7XG4gIFM6IHN0cmluZzsgLy8gRXhhbXBsZTogU3RyaW5nIGRhdGEgdHlwZVxuICAvLyBBZGQgb3RoZXIgZGF0YSB0eXBlcyBhcyBuZWVkZWQgKGUuZy4sIE4gZm9yIG51bWJlcilcbn1cbiJdfQ==