"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveTransportationCostData = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const tableName = process.env.TABLE_NAME || "";
const region = process.env.REGION;
class saveTransportationCostData {
    constructor(payload) {
        console.log("🚀 ~ saveTransportationCostData ~ constructor ~ payload:", payload);
        this.ddbClient = new client_dynamodb_1.DynamoDBClient({ region });
        this.payload = payload;
    }
    async saveData() {
        try {
            const bodyParams = JSON.parse(this.payload.body);
            const params = {
                TableName: tableName,
                Item: {
                    TransportationId: { S: bodyParams.transportId },
                    CustomerName: { S: bodyParams.customerName },
                    AppartmentNo: { S: bodyParams.appartmentNo },
                    Address: { S: bodyParams.address },
                    Suburb: { S: bodyParams.suburb },
                    PostCode: { S: bodyParams.postCode },
                    State: { S: bodyParams.state },
                    Country: { S: bodyParams.country },
                },
            };
            const result = await this.ddbClient.send(new client_dynamodb_1.PutItemCommand(params)); // Use this.ddbClient here
            return result;
        }
        catch (error) {
            console.error("Error saving data to DynamoDB:", error);
            return false;
        }
    }
}
exports.saveTransportationCostData = saveTransportationCostData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZVRyYW5zcG9ydGF0aW9uQ29zdERhdGEudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9UcmFuc3BvcnRhdGlvbkNvc3Qvc2F2ZVRyYW5zcG9ydGF0aW9uQ29zdERhdGEudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsOERBQTBFO0FBRTFFLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQztBQUMvQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztBQUVsQyxNQUFhLDBCQUEwQjtJQUlyQyxZQUFZLE9BQVk7UUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQywwREFBMEQsRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUNoRixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksZ0NBQWMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQUdNLEtBQUssQ0FBQyxRQUFRO1FBQ25CLElBQUk7WUFDRixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakQsTUFBTSxNQUFNLEdBQXdCO2dCQUNsQyxTQUFTLEVBQUUsU0FBUztnQkFDcEIsSUFBSSxFQUFFO29CQUNKLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxXQUFXLEVBQUU7b0JBQy9DLFlBQVksRUFBRSxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsWUFBWSxFQUFFO29CQUM1QyxZQUFZLEVBQUUsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLFlBQVksRUFBRTtvQkFDNUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxPQUFPLEVBQUU7b0JBQ2xDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsTUFBTSxFQUFFO29CQUNoQyxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLFFBQVEsRUFBRTtvQkFDcEMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxLQUFLLEVBQUU7b0JBQzlCLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsT0FBTyxFQUFFO2lCQUNuQzthQUNGLENBQUM7WUFFRixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksZ0NBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsMEJBQTBCO1lBQ2hHLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdkQsT0FBTyxLQUFLLENBQUM7U0FDZDtJQUNILENBQUM7Q0FDRjtBQW5DRCxnRUFtQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEeW5hbW9EQkNsaWVudCwgUHV0SXRlbUNvbW1hbmQgfSBmcm9tIFwiQGF3cy1zZGsvY2xpZW50LWR5bmFtb2RiXCI7XG5cbmNvbnN0IHRhYmxlTmFtZSA9IHByb2Nlc3MuZW52LlRBQkxFX05BTUUgfHwgXCJcIjtcbmNvbnN0IHJlZ2lvbiA9IHByb2Nlc3MuZW52LlJFR0lPTjtcblxuZXhwb3J0IGNsYXNzIHNhdmVUcmFuc3BvcnRhdGlvbkNvc3REYXRhIHtcbiAgcHJpdmF0ZSBkZGJDbGllbnQ6IER5bmFtb0RCQ2xpZW50O1xuICBwdWJsaWMgcGF5bG9hZDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHBheWxvYWQ6IGFueSkge1xuICAgIGNvbnNvbGUubG9nKFwi8J+agCB+IHNhdmVUcmFuc3BvcnRhdGlvbkNvc3REYXRhIH4gY29uc3RydWN0b3IgfiBwYXlsb2FkOlwiLCBwYXlsb2FkKVxuICAgIHRoaXMuZGRiQ2xpZW50ID0gbmV3IER5bmFtb0RCQ2xpZW50KHsgcmVnaW9uIH0pO1xuICAgIHRoaXMucGF5bG9hZCA9IHBheWxvYWQ7XG4gIH1cblxuXG4gIHB1YmxpYyBhc3luYyBzYXZlRGF0YSgpOiBQcm9taXNlPGFueT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBib2R5UGFyYW1zID0gSlNPTi5wYXJzZSh0aGlzLnBheWxvYWQuYm9keSk7XG4gICAgICBjb25zdCBwYXJhbXM6IFB1dEl0ZW1Db21tYW5kSW5wdXQgPSB7XG4gICAgICAgIFRhYmxlTmFtZTogdGFibGVOYW1lLFxuICAgICAgICBJdGVtOiB7XG4gICAgICAgICAgVHJhbnNwb3J0YXRpb25JZDogeyBTOiBib2R5UGFyYW1zLnRyYW5zcG9ydElkIH0sICAvLyBTcGVjaWZ5aW5nIHN0cmluZyB0eXBlIGZvciBVc2VySWRcbiAgICAgICAgICBDdXN0b21lck5hbWU6IHsgUzogYm9keVBhcmFtcy5jdXN0b21lck5hbWUgfSxcbiAgICAgICAgICBBcHBhcnRtZW50Tm86IHsgUzogYm9keVBhcmFtcy5hcHBhcnRtZW50Tm8gfSxcbiAgICAgICAgICBBZGRyZXNzOiB7IFM6IGJvZHlQYXJhbXMuYWRkcmVzcyB9LFxuICAgICAgICAgIFN1YnVyYjogeyBTOiBib2R5UGFyYW1zLnN1YnVyYiB9LFxuICAgICAgICAgIFBvc3RDb2RlOiB7IFM6IGJvZHlQYXJhbXMucG9zdENvZGUgfSxcbiAgICAgICAgICBTdGF0ZTogeyBTOiBib2R5UGFyYW1zLnN0YXRlIH0sXG4gICAgICAgICAgQ291bnRyeTogeyBTOiBib2R5UGFyYW1zLmNvdW50cnkgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuZGRiQ2xpZW50LnNlbmQobmV3IFB1dEl0ZW1Db21tYW5kKHBhcmFtcykpOyAvLyBVc2UgdGhpcy5kZGJDbGllbnQgaGVyZVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHNhdmluZyBkYXRhIHRvIER5bmFtb0RCOlwiLCBlcnJvcik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59XG5cbmludGVyZmFjZSBQdXRJdGVtQ29tbWFuZElucHV0IHtcbiAgVGFibGVOYW1lOiBzdHJpbmc7XG4gIEl0ZW06IHsgW2tleTogc3RyaW5nXTogRHluYW1vREJBdHRyaWJ1dGVWYWx1ZSB9O1xufVxuXG5pbnRlcmZhY2UgRHluYW1vREJBdHRyaWJ1dGVWYWx1ZSB7XG4gIFM6IHN0cmluZztcbn1cbiJdfQ==