"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveCustomerAddress = void 0;
const AWS = require("aws-sdk");
const tableName = process.env.TABLE_NAME;
const documentClient = new AWS.DynamoDB.DocumentClient({
    region: process.env.region,
});
class SaveCustomerAddress {
    constructor(payLoad) {
        this.payload = payLoad;
    }
    ;
    async saveData() {
        const bodypram = JSON.parse(this.payload.body);
        let params = {
            TableName: tableName,
            Item: {
                UserId: bodypram.userId,
                CustomerName: bodypram.customerName,
                AppartmentNo: bodypram.appartmentNo,
                Address: bodypram.address,
                Suburb: bodypram.suburb,
                PostCode: bodypram.postCode,
                State: bodypram.state,
                Country: bodypram.country
            }
        };
        try {
            await documentClient.put(params).promise();
            return true;
        }
        catch (e) {
            return {
                statusCode: 500,
                body: e === 500 ? 'Invalid Request Body' : e, // here we can create and import a commomn error function or specific error handling function where the out put can be organise 
            };
        }
    }
}
exports.SaveCustomerAddress = SaveCustomerAddress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZURhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFFL0IsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7QUFDekMsTUFBTSxjQUFjLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQztJQUNyRCxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNO0NBQzNCLENBQUMsQ0FBQztBQUVILE1BQWEsbUJBQW1CO0lBR2hDLFlBQVksT0FBWTtRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBQUEsQ0FBQztJQUVLLEtBQUssQ0FBQyxRQUFRO1FBQ2pCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxJQUFJLE1BQU0sR0FBRztZQUNULFNBQVMsRUFBRSxTQUFVO1lBQ3JCLElBQUksRUFBRTtnQkFDSixNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU07Z0JBQ3ZCLFlBQVksRUFBRyxRQUFRLENBQUMsWUFBWTtnQkFDcEMsWUFBWSxFQUFHLFFBQVEsQ0FBQyxZQUFZO2dCQUNwQyxPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU87Z0JBQ3pCLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTTtnQkFDdkIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRO2dCQUMzQixLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUs7Z0JBQ3JCLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTzthQUMxQjtTQUNGLENBQUM7UUFDSixJQUFJO1lBQ0YsTUFBTSxjQUFjLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzNDLE9BQU8sSUFBSSxDQUFBO1NBQ1o7UUFBQyxPQUFPLENBQUMsRUFBQztZQUNQLE9BQU87Z0JBQ0wsVUFBVSxFQUFHLEdBQUc7Z0JBQ2hCLElBQUksRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLGdJQUFnSTthQUNqTCxDQUFDO1NBQ0g7SUFDSCxDQUFDO0NBQ0Y7QUFoQ0Qsa0RBZ0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgQVdTIGZyb20gXCJhd3Mtc2RrXCI7XG5cbmNvbnN0IHRhYmxlTmFtZSA9IHByb2Nlc3MuZW52LlRBQkxFX05BTUU7XG5jb25zdCBkb2N1bWVudENsaWVudCA9IG5ldyBBV1MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQoe1xuICByZWdpb246IHByb2Nlc3MuZW52LnJlZ2lvbixcbn0pO1xuXG5leHBvcnQgY2xhc3MgU2F2ZUN1c3RvbWVyQWRkcmVzcyB7XG5wdWJsaWMgcGF5bG9hZCA6IGFueTtcblxuY29uc3RydWN0b3IocGF5TG9hZDogYW55KXtcbiAgICB0aGlzLnBheWxvYWQgPSBwYXlMb2FkO1xufTtcblxucHVibGljIGFzeW5jIHNhdmVEYXRhKCl7XG4gICAgY29uc3QgYm9keXByYW0gPSBKU09OLnBhcnNlKHRoaXMucGF5bG9hZC5ib2R5KTtcbiAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgICBUYWJsZU5hbWU6IHRhYmxlTmFtZSEsXG4gICAgICAgIEl0ZW06IHtcbiAgICAgICAgICBVc2VySWQ6IGJvZHlwcmFtLnVzZXJJZCxcbiAgICAgICAgICBDdXN0b21lck5hbWUgOiBib2R5cHJhbS5jdXN0b21lck5hbWUsXG4gICAgICAgICAgQXBwYXJ0bWVudE5vIDogYm9keXByYW0uYXBwYXJ0bWVudE5vLFxuICAgICAgICAgIEFkZHJlc3M6IGJvZHlwcmFtLmFkZHJlc3MsXG4gICAgICAgICAgU3VidXJiOiBib2R5cHJhbS5zdWJ1cmIsXG4gICAgICAgICAgUG9zdENvZGU6IGJvZHlwcmFtLnBvc3RDb2RlLFxuICAgICAgICAgIFN0YXRlOiBib2R5cHJhbS5zdGF0ZSxcbiAgICAgICAgICBDb3VudHJ5OiBib2R5cHJhbS5jb3VudHJ5XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGRvY3VtZW50Q2xpZW50LnB1dChwYXJhbXMpLnByb21pc2UoKTtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc3RhdHVzQ29kZTogIDUwMCxcbiAgICAgICAgICBib2R5OiBlID09PSA1MDAgPyAnSW52YWxpZCBSZXF1ZXN0IEJvZHknIDogZSwgLy8gaGVyZSB3ZSBjYW4gY3JlYXRlIGFuZCBpbXBvcnQgYSBjb21tb21uIGVycm9yIGZ1bmN0aW9uIG9yIHNwZWNpZmljIGVycm9yIGhhbmRsaW5nIGZ1bmN0aW9uIHdoZXJlIHRoZSBvdXQgcHV0IGNhbiBiZSBvcmdhbmlzZSBcbiAgICAgIH07XG4gICAgfVxuICB9XG59XG4iXX0=