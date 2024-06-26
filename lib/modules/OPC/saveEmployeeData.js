"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveCustomerAddress = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const tableName = process.env.TABLE_NAME || "";
const region = process.env.REGION;
const ddbClient = new client_dynamodb_1.DynamoDBClient({ region });
class SaveCustomerAddress {
    constructor(payload) {
        this.payload = payload;
    }
    async saveData() {
        try {
            const bodyParams = JSON.parse(this.payload.body);
            const params = {
                TableName: tableName,
                Item: {
                    EmployeeId: { S: bodyParams.employeeId },
                    CustomerName: { S: bodyParams.customerName },
                    AppartmentNo: { S: bodyParams.appartmentNo },
                    Address: { S: bodyParams.address },
                    Suburb: { S: bodyParams.suburb },
                    PostCode: { S: bodyParams.postCode },
                    State: { S: bodyParams.state },
                    Country: { S: bodyParams.country },
                },
            };
            await ddbClient.send(new client_dynamodb_1.PutItemCommand(params));
            return true;
        }
        catch (error) {
            console.error("Error saving data to DynamoDB:", error);
            // Implement your specific error handling logic here
            return false; // Indicate failure
        }
    }
}
exports.SaveCustomerAddress = SaveCustomerAddress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUVtcGxveWVlRGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL09QQy9zYXZlRW1wbG95ZWVEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhEQUEwRTtBQUUxRSxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7QUFDL0MsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFFbEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxnQ0FBYyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUVqRCxNQUFhLG1CQUFtQjtJQUc5QixZQUFZLE9BQVk7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQUVNLEtBQUssQ0FBQyxRQUFRO1FBQ25CLElBQUk7WUFDRixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFakQsTUFBTSxNQUFNLEdBQXdCO2dCQUNsQyxTQUFTLEVBQUUsU0FBUztnQkFDcEIsSUFBSSxFQUFFO29CQUNKLFVBQVUsRUFBRSxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsVUFBVSxFQUFFO29CQUN4QyxZQUFZLEVBQUUsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLFlBQVksRUFBRTtvQkFDNUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxZQUFZLEVBQUU7b0JBQzVDLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsT0FBTyxFQUFFO29CQUNsQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLE1BQU0sRUFBRTtvQkFDaEMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxRQUFRLEVBQUU7b0JBQ3BDLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsS0FBSyxFQUFFO29CQUM5QixPQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLE9BQU8sRUFBRTtpQkFDbkM7YUFDRixDQUFDO1lBRUYsTUFBTSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksZ0NBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2pELE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdkQsb0RBQW9EO1lBQ3BELE9BQU8sS0FBSyxDQUFDLENBQUMsbUJBQW1CO1NBQ2xDO0lBQ0gsQ0FBQztDQUNGO0FBakNELGtEQWlDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IER5bmFtb0RCQ2xpZW50LCBQdXRJdGVtQ29tbWFuZCB9IGZyb20gXCJAYXdzLXNkay9jbGllbnQtZHluYW1vZGJcIjtcblxuY29uc3QgdGFibGVOYW1lID0gcHJvY2Vzcy5lbnYuVEFCTEVfTkFNRSB8fCBcIlwiO1xuY29uc3QgcmVnaW9uID0gcHJvY2Vzcy5lbnYuUkVHSU9OO1xuXG5jb25zdCBkZGJDbGllbnQgPSBuZXcgRHluYW1vREJDbGllbnQoeyByZWdpb24gfSk7XG5cbmV4cG9ydCBjbGFzcyBTYXZlQ3VzdG9tZXJBZGRyZXNzIHtcbiAgcHVibGljIHBheWxvYWQ6IGFueTtcblxuICBjb25zdHJ1Y3RvcihwYXlsb2FkOiBhbnkpIHtcbiAgICB0aGlzLnBheWxvYWQgPSBwYXlsb2FkO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHNhdmVEYXRhKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBib2R5UGFyYW1zID0gSlNPTi5wYXJzZSh0aGlzLnBheWxvYWQuYm9keSk7XG5cbiAgICAgIGNvbnN0IHBhcmFtczogUHV0SXRlbUNvbW1hbmRJbnB1dCA9IHtcbiAgICAgICAgVGFibGVOYW1lOiB0YWJsZU5hbWUsXG4gICAgICAgIEl0ZW06IHtcbiAgICAgICAgICBFbXBsb3llZUlkOiB7IFM6IGJvZHlQYXJhbXMuZW1wbG95ZWVJZCB9LCAgLy8gU3BlY2lmeWluZyBzdHJpbmcgdHlwZSBmb3IgVXNlcklkXG4gICAgICAgICAgQ3VzdG9tZXJOYW1lOiB7IFM6IGJvZHlQYXJhbXMuY3VzdG9tZXJOYW1lIH0sXG4gICAgICAgICAgQXBwYXJ0bWVudE5vOiB7IFM6IGJvZHlQYXJhbXMuYXBwYXJ0bWVudE5vIH0sXG4gICAgICAgICAgQWRkcmVzczogeyBTOiBib2R5UGFyYW1zLmFkZHJlc3MgfSxcbiAgICAgICAgICBTdWJ1cmI6IHsgUzogYm9keVBhcmFtcy5zdWJ1cmIgfSxcbiAgICAgICAgICBQb3N0Q29kZTogeyBTOiBib2R5UGFyYW1zLnBvc3RDb2RlIH0sXG4gICAgICAgICAgU3RhdGU6IHsgUzogYm9keVBhcmFtcy5zdGF0ZSB9LFxuICAgICAgICAgIENvdW50cnk6IHsgUzogYm9keVBhcmFtcy5jb3VudHJ5IH0sXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICBhd2FpdCBkZGJDbGllbnQuc2VuZChuZXcgUHV0SXRlbUNvbW1hbmQocGFyYW1zKSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHNhdmluZyBkYXRhIHRvIER5bmFtb0RCOlwiLCBlcnJvcik7XG4gICAgICAvLyBJbXBsZW1lbnQgeW91ciBzcGVjaWZpYyBlcnJvciBoYW5kbGluZyBsb2dpYyBoZXJlXG4gICAgICByZXR1cm4gZmFsc2U7IC8vIEluZGljYXRlIGZhaWx1cmVcbiAgICB9XG4gIH1cbn1cblxuaW50ZXJmYWNlIFB1dEl0ZW1Db21tYW5kSW5wdXQge1xuICBUYWJsZU5hbWU6IHN0cmluZztcbiAgSXRlbTogeyBba2V5OiBzdHJpbmddOiBEeW5hbW9EQkF0dHJpYnV0ZVZhbHVlIH07IC8vIEludGVyZmFjZSBmb3IgdHlwZSBzYWZldHlcbn1cblxuaW50ZXJmYWNlIER5bmFtb0RCQXR0cmlidXRlVmFsdWUge1xuICBTOiBzdHJpbmc7IC8vIEV4YW1wbGU6IFN0cmluZyBkYXRhIHR5cGVcbiAgLy8gQWRkIG90aGVyIGRhdGEgdHlwZXMgYXMgbmVlZGVkIChlLmcuLCBOIGZvciBudW1iZXIpXG59XG4iXX0=