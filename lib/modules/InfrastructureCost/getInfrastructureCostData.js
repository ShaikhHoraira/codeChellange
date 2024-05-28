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
    constructor(rentId) {
        this.rentId = rentId;
        // this.suburb = suburb;
        // this.postcode = postcode;
    }
    async getRentData() {
        const params = {
            TableName: TABLE_NAME,
            IndexName: "RentIndex",
            KeyConditionExpression: "RentId = :rentId",
            ExpressionAttributeValues: {
                ":rentId": { S: this.rentId }, // Specifying string type for userId
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SW5mcmFzdHJ1Y3R1cmVDb3N0RGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL0luZnJhc3RydWN0dXJlQ29zdC9nZXRJbmZyYXN0cnVjdHVyZUNvc3REYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhEQUF3RTtBQUV4RSxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7QUFDaEQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFFbEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxnQ0FBYyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUVqRCxNQUFhLHlCQUF5QjtJQUVwQyxnREFBZ0Q7SUFDaEQsa0RBQWtEO0lBRWxELFlBQVksTUFBYztRQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQix3QkFBd0I7UUFDeEIsNEJBQTRCO0lBQzlCLENBQUM7SUFFTSxLQUFLLENBQUMsV0FBVztRQUN0QixNQUFNLE1BQU0sR0FBc0I7WUFDaEMsU0FBUyxFQUFFLFVBQVU7WUFDckIsU0FBUyxFQUFFLFdBQVc7WUFDdEIsc0JBQXNCLEVBQUUsa0JBQWtCO1lBQzFDLHlCQUF5QixFQUFFO2dCQUN6QixTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLG9DQUFvQzthQUNwRTtTQUNGLENBQUM7UUFHRixJQUFJO1lBQ0YsTUFBTSxJQUFJLEdBQUcsTUFBTSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksOEJBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzVELE9BQU8sSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQyx1Q0FBdUM7U0FDakU7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsMEJBQTBCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDakQsb0RBQW9EO1lBQ3BELE9BQU8sRUFBRSxDQUFDLENBQUMsMERBQTBEO1NBQ3RFO0lBQ0gsQ0FBQztDQUNGO0FBL0JELDhEQStCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IER5bmFtb0RCQ2xpZW50LCBRdWVyeUNvbW1hbmQgfSBmcm9tIFwiQGF3cy1zZGsvY2xpZW50LWR5bmFtb2RiXCI7XG5cbmNvbnN0IFRBQkxFX05BTUUgPSBwcm9jZXNzLmVudi5UQUJMRV9OQU1FIHx8ICcnO1xuY29uc3QgcmVnaW9uID0gcHJvY2Vzcy5lbnYuUkVHSU9OO1xuXG5jb25zdCBkZGJDbGllbnQgPSBuZXcgRHluYW1vREJDbGllbnQoeyByZWdpb24gfSk7XG5cbmV4cG9ydCBjbGFzcyBHZXRJbmZyYXN0cnVjdHVyZUNvc3REYXRhIHtcbiAgcHVibGljIHJlbnRJZDogc3RyaW5nO1xuICAvLyBwdWJsaWMgc3VidXJiPzogc3RyaW5nOyAvLyBPcHRpb25hbCBwYXJhbWV0ZXJcbiAgLy8gcHVibGljIHBvc3Rjb2RlPzogc3RyaW5nOyAvLyBPcHRpb25hbCBwYXJhbWV0ZXJcblxuICBjb25zdHJ1Y3RvcihyZW50SWQ6IHN0cmluZykge1xuICAgIHRoaXMucmVudElkID0gcmVudElkO1xuICAgIC8vIHRoaXMuc3VidXJiID0gc3VidXJiO1xuICAgIC8vIHRoaXMucG9zdGNvZGUgPSBwb3N0Y29kZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRSZW50RGF0YSgpOiBQcm9taXNlPGFueVtdPiB7XG4gICAgY29uc3QgcGFyYW1zOiBRdWVyeUNvbW1hbmRJbnB1dCA9IHtcbiAgICAgIFRhYmxlTmFtZTogVEFCTEVfTkFNRSxcbiAgICAgIEluZGV4TmFtZTogXCJSZW50SW5kZXhcIiwgLy8gQXNzdW1pbmcgeW91ciBzZWNvbmRhcnkgaW5kZXggbmFtZVxuICAgICAgS2V5Q29uZGl0aW9uRXhwcmVzc2lvbjogXCJSZW50SWQgPSA6cmVudElkXCIsXG4gICAgICBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzOiB7XG4gICAgICAgIFwiOnJlbnRJZFwiOiB7IFM6IHRoaXMucmVudElkIH0sIC8vIFNwZWNpZnlpbmcgc3RyaW5nIHR5cGUgZm9yIHVzZXJJZFxuICAgICAgfSxcbiAgICB9O1xuXG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGRkYkNsaWVudC5zZW5kKG5ldyBRdWVyeUNvbW1hbmQocGFyYW1zKSk7XG4gICAgICByZXR1cm4gZGF0YS5JdGVtcyA/PyBbXTsgLy8gUmV0dXJuIGVtcHR5IGFycmF5IGlmIG5vIGl0ZW1zIGZvdW5kXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBxdWVyeWluZyBEeW5hbW9EQjpcIiwgZXJyb3IpO1xuICAgICAgLy8gSW1wbGVtZW50IHlvdXIgc3BlY2lmaWMgZXJyb3IgaGFuZGxpbmcgbG9naWMgaGVyZVxuICAgICAgcmV0dXJuIFtdOyAvLyBSZXR1cm4gZW1wdHkgYXJyYXkgdG8gYXZvaWQgcG90ZW50aWFsIGRvd25zdHJlYW0gZXJyb3JzXG4gICAgfVxuICB9XG59XG5cbmludGVyZmFjZSBRdWVyeUNvbW1hbmRJbnB1dCB7XG4gIFRhYmxlTmFtZTogc3RyaW5nO1xuICBJbmRleE5hbWU/OiBzdHJpbmc7XG4gIEtleUNvbmRpdGlvbkV4cHJlc3Npb246IHN0cmluZztcbiAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczogeyBba2V5OiBzdHJpbmddOiBEeW5hbW9EQkF0dHJpYnV0ZVZhbHVlIH07IC8vIEludGVyZmFjZSBmb3IgdHlwZSBzYWZldHlcbiAgRmlsdGVyRXhwcmVzc2lvbj86IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIER5bmFtb0RCQXR0cmlidXRlVmFsdWUge1xuICBTOiBzdHJpbmc7IC8vIEV4YW1wbGU6IFN0cmluZyBkYXRhIHR5cGVcbiAgLy8gQWRkIG90aGVyIGRhdGEgdHlwZXMgYXMgbmVlZGVkIChlLmcuLCBOIGZvciBudW1iZXIpXG59XG4iXX0=