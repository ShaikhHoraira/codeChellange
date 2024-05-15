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
    constructor(employeeId) {
        this.employeeId = employeeId;
        // this.suburb = suburb;
        // this.postcode = postcode;
    }
    async getData() {
        const params = {
            TableName: TABLE_NAME,
            IndexName: "EmployeeIdIndex",
            KeyConditionExpression: "EmployeeId = :employeeId",
            ExpressionAttributeValues: {
                ":employeeId": { S: this.employeeId }, // Specifying string type for userId
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RW1wbG95ZWVEYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZHVsZXMvZ2V0RW1wbG95ZWVEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhEQUF3RTtBQUV4RSxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7QUFDaEQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFFbEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxnQ0FBYyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUVqRCxNQUFhLGtCQUFrQjtJQUU3QixnREFBZ0Q7SUFDaEQsa0RBQWtEO0lBRWxELFlBQVksVUFBa0I7UUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0Isd0JBQXdCO1FBQ3hCLDRCQUE0QjtJQUM5QixDQUFDO0lBRU0sS0FBSyxDQUFDLE9BQU87UUFDbEIsTUFBTSxNQUFNLEdBQXNCO1lBQ2hDLFNBQVMsRUFBRSxVQUFVO1lBQ3JCLFNBQVMsRUFBRSxpQkFBaUI7WUFDNUIsc0JBQXNCLEVBQUUsMEJBQTBCO1lBQ2xELHlCQUF5QixFQUFFO2dCQUN6QixhQUFhLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLG9DQUFvQzthQUM1RTtTQUNGLENBQUM7UUFHRixJQUFJO1lBQ0YsTUFBTSxJQUFJLEdBQUcsTUFBTSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksOEJBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzVELE9BQU8sSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQyx1Q0FBdUM7U0FDakU7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsMEJBQTBCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDakQsb0RBQW9EO1lBQ3BELE9BQU8sRUFBRSxDQUFDLENBQUMsMERBQTBEO1NBQ3RFO0lBQ0gsQ0FBQztDQUNGO0FBL0JELGdEQStCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IER5bmFtb0RCQ2xpZW50LCBRdWVyeUNvbW1hbmQgfSBmcm9tIFwiQGF3cy1zZGsvY2xpZW50LWR5bmFtb2RiXCI7XG5cbmNvbnN0IFRBQkxFX05BTUUgPSBwcm9jZXNzLmVudi5UQUJMRV9OQU1FIHx8ICcnO1xuY29uc3QgcmVnaW9uID0gcHJvY2Vzcy5lbnYuUkVHSU9OO1xuXG5jb25zdCBkZGJDbGllbnQgPSBuZXcgRHluYW1vREJDbGllbnQoeyByZWdpb24gfSk7XG5cbmV4cG9ydCBjbGFzcyBHZXRDdXN0b21lckFkZHJlc3Mge1xuICBwdWJsaWMgZW1wbG95ZWVJZDogc3RyaW5nO1xuICAvLyBwdWJsaWMgc3VidXJiPzogc3RyaW5nOyAvLyBPcHRpb25hbCBwYXJhbWV0ZXJcbiAgLy8gcHVibGljIHBvc3Rjb2RlPzogc3RyaW5nOyAvLyBPcHRpb25hbCBwYXJhbWV0ZXJcblxuICBjb25zdHJ1Y3RvcihlbXBsb3llZUlkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmVtcGxveWVlSWQgPSBlbXBsb3llZUlkO1xuICAgIC8vIHRoaXMuc3VidXJiID0gc3VidXJiO1xuICAgIC8vIHRoaXMucG9zdGNvZGUgPSBwb3N0Y29kZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXREYXRhKCk6IFByb21pc2U8YW55W10+IHtcbiAgICBjb25zdCBwYXJhbXM6IFF1ZXJ5Q29tbWFuZElucHV0ID0ge1xuICAgICAgVGFibGVOYW1lOiBUQUJMRV9OQU1FLFxuICAgICAgSW5kZXhOYW1lOiBcIkVtcGxveWVlSWRJbmRleFwiLCAvLyBBc3N1bWluZyB5b3VyIHNlY29uZGFyeSBpbmRleCBuYW1lXG4gICAgICBLZXlDb25kaXRpb25FeHByZXNzaW9uOiBcIkVtcGxveWVlSWQgPSA6ZW1wbG95ZWVJZFwiLFxuICAgICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xuICAgICAgICBcIjplbXBsb3llZUlkXCI6IHsgUzogdGhpcy5lbXBsb3llZUlkIH0sIC8vIFNwZWNpZnlpbmcgc3RyaW5nIHR5cGUgZm9yIHVzZXJJZFxuICAgICAgfSxcbiAgICB9O1xuXG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGRkYkNsaWVudC5zZW5kKG5ldyBRdWVyeUNvbW1hbmQocGFyYW1zKSk7XG4gICAgICByZXR1cm4gZGF0YS5JdGVtcyA/PyBbXTsgLy8gUmV0dXJuIGVtcHR5IGFycmF5IGlmIG5vIGl0ZW1zIGZvdW5kXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBxdWVyeWluZyBEeW5hbW9EQjpcIiwgZXJyb3IpO1xuICAgICAgLy8gSW1wbGVtZW50IHlvdXIgc3BlY2lmaWMgZXJyb3IgaGFuZGxpbmcgbG9naWMgaGVyZVxuICAgICAgcmV0dXJuIFtdOyAvLyBSZXR1cm4gZW1wdHkgYXJyYXkgdG8gYXZvaWQgcG90ZW50aWFsIGRvd25zdHJlYW0gZXJyb3JzXG4gICAgfVxuICB9XG59XG5cbmludGVyZmFjZSBRdWVyeUNvbW1hbmRJbnB1dCB7XG4gIFRhYmxlTmFtZTogc3RyaW5nO1xuICBJbmRleE5hbWU/OiBzdHJpbmc7XG4gIEtleUNvbmRpdGlvbkV4cHJlc3Npb246IHN0cmluZztcbiAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczogeyBba2V5OiBzdHJpbmddOiBEeW5hbW9EQkF0dHJpYnV0ZVZhbHVlIH07IC8vIEludGVyZmFjZSBmb3IgdHlwZSBzYWZldHlcbiAgRmlsdGVyRXhwcmVzc2lvbj86IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIER5bmFtb0RCQXR0cmlidXRlVmFsdWUge1xuICBTOiBzdHJpbmc7IC8vIEV4YW1wbGU6IFN0cmluZyBkYXRhIHR5cGVcbiAgLy8gQWRkIG90aGVyIGRhdGEgdHlwZXMgYXMgbmVlZGVkIChlLmcuLCBOIGZvciBudW1iZXIpXG59XG4iXX0=