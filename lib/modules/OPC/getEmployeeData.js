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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RW1wbG95ZWVEYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvT1BDL2dldEVtcGxveWVlRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4REFBd0U7QUFFeEUsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDO0FBQ2hELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO0FBRWxDLE1BQU0sU0FBUyxHQUFHLElBQUksZ0NBQWMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFFakQsTUFBYSxrQkFBa0I7SUFFN0IsZ0RBQWdEO0lBQ2hELGtEQUFrRDtJQUVsRCxZQUFZLFVBQWtCO1FBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLHdCQUF3QjtRQUN4Qiw0QkFBNEI7SUFDOUIsQ0FBQztJQUVNLEtBQUssQ0FBQyxPQUFPO1FBQ2xCLE1BQU0sTUFBTSxHQUFzQjtZQUNoQyxTQUFTLEVBQUUsVUFBVTtZQUNyQixTQUFTLEVBQUUsaUJBQWlCO1lBQzVCLHNCQUFzQixFQUFFLDBCQUEwQjtZQUNsRCx5QkFBeUIsRUFBRTtnQkFDekIsYUFBYSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxvQ0FBb0M7YUFDNUU7U0FDRixDQUFDO1FBR0YsSUFBSTtZQUNGLE1BQU0sSUFBSSxHQUFHLE1BQU0sU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLDhCQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM1RCxPQUFPLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUMsdUNBQXVDO1NBQ2pFO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLDBCQUEwQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2pELG9EQUFvRDtZQUNwRCxPQUFPLEVBQUUsQ0FBQyxDQUFDLDBEQUEwRDtTQUN0RTtJQUNILENBQUM7Q0FDRjtBQS9CRCxnREErQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEeW5hbW9EQkNsaWVudCwgUXVlcnlDb21tYW5kIH0gZnJvbSBcIkBhd3Mtc2RrL2NsaWVudC1keW5hbW9kYlwiO1xuXG5jb25zdCBUQUJMRV9OQU1FID0gcHJvY2Vzcy5lbnYuVEFCTEVfTkFNRSB8fCAnJztcbmNvbnN0IHJlZ2lvbiA9IHByb2Nlc3MuZW52LlJFR0lPTjtcblxuY29uc3QgZGRiQ2xpZW50ID0gbmV3IER5bmFtb0RCQ2xpZW50KHsgcmVnaW9uIH0pO1xuXG5leHBvcnQgY2xhc3MgR2V0Q3VzdG9tZXJBZGRyZXNzIHtcbiAgcHVibGljIGVtcGxveWVlSWQ6IHN0cmluZztcbiAgLy8gcHVibGljIHN1YnVyYj86IHN0cmluZzsgLy8gT3B0aW9uYWwgcGFyYW1ldGVyXG4gIC8vIHB1YmxpYyBwb3N0Y29kZT86IHN0cmluZzsgLy8gT3B0aW9uYWwgcGFyYW1ldGVyXG5cbiAgY29uc3RydWN0b3IoZW1wbG95ZWVJZDogc3RyaW5nKSB7XG4gICAgdGhpcy5lbXBsb3llZUlkID0gZW1wbG95ZWVJZDtcbiAgICAvLyB0aGlzLnN1YnVyYiA9IHN1YnVyYjtcbiAgICAvLyB0aGlzLnBvc3Rjb2RlID0gcG9zdGNvZGU7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0RGF0YSgpOiBQcm9taXNlPGFueVtdPiB7XG4gICAgY29uc3QgcGFyYW1zOiBRdWVyeUNvbW1hbmRJbnB1dCA9IHtcbiAgICAgIFRhYmxlTmFtZTogVEFCTEVfTkFNRSxcbiAgICAgIEluZGV4TmFtZTogXCJFbXBsb3llZUlkSW5kZXhcIiwgLy8gQXNzdW1pbmcgeW91ciBzZWNvbmRhcnkgaW5kZXggbmFtZVxuICAgICAgS2V5Q29uZGl0aW9uRXhwcmVzc2lvbjogXCJFbXBsb3llZUlkID0gOmVtcGxveWVlSWRcIixcbiAgICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXM6IHtcbiAgICAgICAgXCI6ZW1wbG95ZWVJZFwiOiB7IFM6IHRoaXMuZW1wbG95ZWVJZCB9LCAvLyBTcGVjaWZ5aW5nIHN0cmluZyB0eXBlIGZvciB1c2VySWRcbiAgICAgIH0sXG4gICAgfTtcblxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBkZGJDbGllbnQuc2VuZChuZXcgUXVlcnlDb21tYW5kKHBhcmFtcykpO1xuICAgICAgcmV0dXJuIGRhdGEuSXRlbXMgPz8gW107IC8vIFJldHVybiBlbXB0eSBhcnJheSBpZiBubyBpdGVtcyBmb3VuZFxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcXVlcnlpbmcgRHluYW1vREI6XCIsIGVycm9yKTtcbiAgICAgIC8vIEltcGxlbWVudCB5b3VyIHNwZWNpZmljIGVycm9yIGhhbmRsaW5nIGxvZ2ljIGhlcmVcbiAgICAgIHJldHVybiBbXTsgLy8gUmV0dXJuIGVtcHR5IGFycmF5IHRvIGF2b2lkIHBvdGVudGlhbCBkb3duc3RyZWFtIGVycm9yc1xuICAgIH1cbiAgfVxufVxuXG5pbnRlcmZhY2UgUXVlcnlDb21tYW5kSW5wdXQge1xuICBUYWJsZU5hbWU6IHN0cmluZztcbiAgSW5kZXhOYW1lPzogc3RyaW5nO1xuICBLZXlDb25kaXRpb25FeHByZXNzaW9uOiBzdHJpbmc7XG4gIEV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXM6IHsgW2tleTogc3RyaW5nXTogRHluYW1vREJBdHRyaWJ1dGVWYWx1ZSB9OyAvLyBJbnRlcmZhY2UgZm9yIHR5cGUgc2FmZXR5XG4gIEZpbHRlckV4cHJlc3Npb24/OiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBEeW5hbW9EQkF0dHJpYnV0ZVZhbHVlIHtcbiAgUzogc3RyaW5nOyAvLyBFeGFtcGxlOiBTdHJpbmcgZGF0YSB0eXBlXG4gIC8vIEFkZCBvdGhlciBkYXRhIHR5cGVzIGFzIG5lZWRlZCAoZS5nLiwgTiBmb3IgbnVtYmVyKVxufVxuIl19