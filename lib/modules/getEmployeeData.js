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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RW1wbG95ZWVEYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZHVsZXMvZ2V0RW1wbG95ZWVEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhEQUF3RTtBQUV4RSxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7QUFDaEQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFFbEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxnQ0FBYyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUVqRCxNQUFhLGtCQUFrQjtJQUs3QixZQUFZLE1BQWMsRUFBRSxNQUFlLEVBQUUsUUFBaUI7UUFDNUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQUVNLEtBQUssQ0FBQyxPQUFPO1FBQ2xCLE1BQU0sTUFBTSxHQUFzQjtZQUNoQyxTQUFTLEVBQUUsVUFBVTtZQUNyQixTQUFTLEVBQUUsYUFBYTtZQUN4QixzQkFBc0IsRUFBRSxrQkFBa0I7WUFDMUMseUJBQXlCLEVBQUU7Z0JBQ3pCLFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsb0NBQW9DO2FBQ3BFO1NBQ0YsQ0FBQztRQUVGLCtDQUErQztRQUMvQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixNQUFNLENBQUMsZ0JBQWdCLEdBQUcsa0JBQWtCLENBQUM7WUFDN0MsTUFBTSxDQUFDLHlCQUF5QixDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNsRTtRQUVELHNGQUFzRjtRQUN0RixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxNQUFNLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQzNCLE1BQU0sQ0FBQyxnQkFBZ0IsSUFBSSwyQkFBMkIsQ0FBQzthQUN4RDtpQkFBTTtnQkFDTCxNQUFNLENBQUMsZ0JBQWdCLEdBQUcsc0JBQXNCLENBQUM7YUFDbEQ7WUFDRCxNQUFNLENBQUMseUJBQXlCLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ3RFO1FBRUQsSUFBSTtZQUNGLE1BQU0sSUFBSSxHQUFHLE1BQU0sU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLDhCQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM1RCxPQUFPLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUMsdUNBQXVDO1NBQ2pFO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLDBCQUEwQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2pELG9EQUFvRDtZQUNwRCxPQUFPLEVBQUUsQ0FBQyxDQUFDLDBEQUEwRDtTQUN0RTtJQUNILENBQUM7Q0FDRjtBQTlDRCxnREE4Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEeW5hbW9EQkNsaWVudCwgUXVlcnlDb21tYW5kIH0gZnJvbSBcIkBhd3Mtc2RrL2NsaWVudC1keW5hbW9kYlwiO1xuXG5jb25zdCBUQUJMRV9OQU1FID0gcHJvY2Vzcy5lbnYuVEFCTEVfTkFNRSB8fCAnJztcbmNvbnN0IHJlZ2lvbiA9IHByb2Nlc3MuZW52LlJFR0lPTjtcblxuY29uc3QgZGRiQ2xpZW50ID0gbmV3IER5bmFtb0RCQ2xpZW50KHsgcmVnaW9uIH0pO1xuXG5leHBvcnQgY2xhc3MgR2V0Q3VzdG9tZXJBZGRyZXNzIHtcbiAgcHVibGljIHVzZXJJZDogc3RyaW5nO1xuICBwdWJsaWMgc3VidXJiPzogc3RyaW5nOyAvLyBPcHRpb25hbCBwYXJhbWV0ZXJcbiAgcHVibGljIHBvc3Rjb2RlPzogc3RyaW5nOyAvLyBPcHRpb25hbCBwYXJhbWV0ZXJcblxuICBjb25zdHJ1Y3Rvcih1c2VySWQ6IHN0cmluZywgc3VidXJiPzogc3RyaW5nLCBwb3N0Y29kZT86IHN0cmluZykge1xuICAgIHRoaXMudXNlcklkID0gdXNlcklkO1xuICAgIHRoaXMuc3VidXJiID0gc3VidXJiO1xuICAgIHRoaXMucG9zdGNvZGUgPSBwb3N0Y29kZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXREYXRhKCk6IFByb21pc2U8YW55W10+IHtcbiAgICBjb25zdCBwYXJhbXM6IFF1ZXJ5Q29tbWFuZElucHV0ID0ge1xuICAgICAgVGFibGVOYW1lOiBUQUJMRV9OQU1FLFxuICAgICAgSW5kZXhOYW1lOiBcIlVzZXJJZEluZGV4XCIsIC8vIEFzc3VtaW5nIHlvdXIgc2Vjb25kYXJ5IGluZGV4IG5hbWVcbiAgICAgIEtleUNvbmRpdGlvbkV4cHJlc3Npb246IFwiVXNlcklkID0gOnVzZXJJZFwiLFxuICAgICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xuICAgICAgICBcIjp1c2VySWRcIjogeyBTOiB0aGlzLnVzZXJJZCB9LCAvLyBTcGVjaWZ5aW5nIHN0cmluZyB0eXBlIGZvciB1c2VySWRcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIC8vIEFkZCBmaWx0ZXIgZXhwcmVzc2lvbiBmb3Igc3VidXJiIGlmIHByb3ZpZGVkXG4gICAgaWYgKHRoaXMuc3VidXJiKSB7XG4gICAgICBwYXJhbXMuRmlsdGVyRXhwcmVzc2lvbiA9IFwiU3VidXJiID0gOnN1YnVyYlwiO1xuICAgICAgcGFyYW1zLkV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXNbXCI6c3VidXJiXCJdID0geyBTOiB0aGlzLnN1YnVyYiB9O1xuICAgIH1cblxuICAgIC8vIEFkZCBmaWx0ZXIgZXhwcmVzc2lvbiBmb3IgcG9zdGNvZGUgaWYgcHJvdmlkZWQgKGFwcGVuZCBBTkQgaWYgc3VidXJiIGZpbHRlciBleGlzdHMpXG4gICAgaWYgKHRoaXMucG9zdGNvZGUpIHtcbiAgICAgIGlmIChwYXJhbXMuRmlsdGVyRXhwcmVzc2lvbikge1xuICAgICAgICBwYXJhbXMuRmlsdGVyRXhwcmVzc2lvbiArPSBcIiBBTkQgUG9zdENvZGUgPSA6cG9zdGNvZGVcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmFtcy5GaWx0ZXJFeHByZXNzaW9uID0gXCJQb3N0Q29kZSA9IDpwb3N0Y29kZVwiO1xuICAgICAgfVxuICAgICAgcGFyYW1zLkV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXNbXCI6cG9zdGNvZGVcIl0gPSB7IFM6IHRoaXMucG9zdGNvZGUgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGRkYkNsaWVudC5zZW5kKG5ldyBRdWVyeUNvbW1hbmQocGFyYW1zKSk7XG4gICAgICByZXR1cm4gZGF0YS5JdGVtcyA/PyBbXTsgLy8gUmV0dXJuIGVtcHR5IGFycmF5IGlmIG5vIGl0ZW1zIGZvdW5kXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBxdWVyeWluZyBEeW5hbW9EQjpcIiwgZXJyb3IpO1xuICAgICAgLy8gSW1wbGVtZW50IHlvdXIgc3BlY2lmaWMgZXJyb3IgaGFuZGxpbmcgbG9naWMgaGVyZVxuICAgICAgcmV0dXJuIFtdOyAvLyBSZXR1cm4gZW1wdHkgYXJyYXkgdG8gYXZvaWQgcG90ZW50aWFsIGRvd25zdHJlYW0gZXJyb3JzXG4gICAgfVxuICB9XG59XG5cbmludGVyZmFjZSBRdWVyeUNvbW1hbmRJbnB1dCB7XG4gIFRhYmxlTmFtZTogc3RyaW5nO1xuICBJbmRleE5hbWU/OiBzdHJpbmc7XG4gIEtleUNvbmRpdGlvbkV4cHJlc3Npb246IHN0cmluZztcbiAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczogeyBba2V5OiBzdHJpbmddOiBEeW5hbW9EQkF0dHJpYnV0ZVZhbHVlIH07IC8vIEludGVyZmFjZSBmb3IgdHlwZSBzYWZldHlcbiAgRmlsdGVyRXhwcmVzc2lvbj86IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIER5bmFtb0RCQXR0cmlidXRlVmFsdWUge1xuICBTOiBzdHJpbmc7IC8vIEV4YW1wbGU6IFN0cmluZyBkYXRhIHR5cGVcbiAgLy8gQWRkIG90aGVyIGRhdGEgdHlwZXMgYXMgbmVlZGVkIChlLmcuLCBOIGZvciBudW1iZXIpXG59XG4iXX0=