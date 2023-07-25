"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManageDevice = void 0;
const AWS = require("aws-sdk");
const tableName = process.env.TABLE_NAME;
const documentClient = new AWS.DynamoDB.DocumentClient({
    region: process.env.region,
});
class ManageDevice {
    constructor(payLooad) {
        this.payload = payLooad;
    }
    async saveData() {
        console.info('returning from module 17', this.payload);
        const bodypram = JSON.parse(this.payload);
        console.info('after parse', bodypram);
        var params = {
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
            console.info('inside try', bodypram);
            const returnResult = await documentClient.put(params).promise();
            console.info('after db request', returnResult);
            return returnResult;
        }
        catch (e) {
            return {
                statusCode: 500,
                body: e === 500 ? 'Invalid Request Body' : e, // here we can create and import a commomn error function or specific error handling function where the out put can be organise 
            };
        }
    }
}
exports.ManageDevice = ManageDevice;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZURhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBOEI7QUFHOUIsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUE7QUFDeEMsTUFBTSxjQUFjLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQztJQUNyRCxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNO0NBQzNCLENBQUMsQ0FBQztBQUVILE1BQWEsWUFBWTtJQUd6QixZQUFZLFFBQWE7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7SUFDNUIsQ0FBQztJQUVNLEtBQUssQ0FBQyxRQUFRO1FBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3RELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQ3JDLElBQUksTUFBTSxHQUFHO1lBQ1QsU0FBUyxFQUFFLFNBQVU7WUFDckIsSUFBSSxFQUFFO2dCQUNKLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTTtnQkFDdkIsWUFBWSxFQUFHLFFBQVEsQ0FBQyxZQUFZO2dCQUNwQyxZQUFZLEVBQUcsUUFBUSxDQUFDLFlBQVk7Z0JBQ3BDLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTztnQkFDekIsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNO2dCQUN2QixRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7Z0JBQzNCLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSztnQkFDckIsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPO2FBQzFCO1NBQ0YsQ0FBQztRQUNKLElBQUk7WUFDSixPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQTtZQUNwQyxNQUFNLFlBQVksR0FBRyxNQUFNLGNBQWMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDaEUsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBQyxZQUFZLENBQUMsQ0FBQTtZQUM3QyxPQUFPLFlBQVksQ0FBQTtTQUNsQjtRQUFDLE9BQU8sQ0FBQyxFQUFDO1lBQ1AsT0FBTztnQkFDSCxVQUFVLEVBQUcsR0FBRztnQkFDaEIsSUFBSSxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsZ0lBQWdJO2FBQy9LLENBQUM7U0FDUDtJQUNMLENBQUM7Q0FFQTtBQXJDRCxvQ0FxQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBBV1MgZnJvbSBcImF3cy1zZGtcIlxuXG5cbmNvbnN0IHRhYmxlTmFtZSA9IHByb2Nlc3MuZW52LlRBQkxFX05BTUVcbmNvbnN0IGRvY3VtZW50Q2xpZW50ID0gbmV3IEFXUy5EeW5hbW9EQi5Eb2N1bWVudENsaWVudCh7XG4gIHJlZ2lvbjogcHJvY2Vzcy5lbnYucmVnaW9uLFxufSk7XG5cbmV4cG9ydCBjbGFzcyBNYW5hZ2VEZXZpY2Uge1xucHVibGljIHBheWxvYWQgOiBhbnk7XG5cbmNvbnN0cnVjdG9yKHBheUxvb2FkOiBhbnkpe1xuICAgIHRoaXMucGF5bG9hZCA9IHBheUxvb2FkO1xufVxuXG5wdWJsaWMgYXN5bmMgc2F2ZURhdGEoKXtcbiAgICBjb25zb2xlLmluZm8oJ3JldHVybmluZyBmcm9tIG1vZHVsZSAxNycsIHRoaXMucGF5bG9hZClcbiAgICBjb25zdCBib2R5cHJhbSA9IEpTT04ucGFyc2UodGhpcy5wYXlsb2FkKTtcbiAgICBjb25zb2xlLmluZm8oJ2FmdGVyIHBhcnNlJywgYm9keXByYW0pXG4gICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgICAgVGFibGVOYW1lOiB0YWJsZU5hbWUhLFxuICAgICAgICBJdGVtOiB7XG4gICAgICAgICAgVXNlcklkOiBib2R5cHJhbS51c2VySWQsXG4gICAgICAgICAgQ3VzdG9tZXJOYW1lIDogYm9keXByYW0uY3VzdG9tZXJOYW1lLFxuICAgICAgICAgIEFwcGFydG1lbnRObyA6IGJvZHlwcmFtLmFwcGFydG1lbnRObyxcbiAgICAgICAgICBBZGRyZXNzOiBib2R5cHJhbS5hZGRyZXNzLFxuICAgICAgICAgIFN1YnVyYjogYm9keXByYW0uc3VidXJiLFxuICAgICAgICAgIFBvc3RDb2RlOiBib2R5cHJhbS5wb3N0Q29kZSxcbiAgICAgICAgICBTdGF0ZTogYm9keXByYW0uc3RhdGUsXG4gICAgICAgICAgQ291bnRyeTogYm9keXByYW0uY291bnRyeVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIHRyeSB7XG4gICAgY29uc29sZS5pbmZvKCdpbnNpZGUgdHJ5JywgYm9keXByYW0pXG4gICAgY29uc3QgcmV0dXJuUmVzdWx0ID0gYXdhaXQgZG9jdW1lbnRDbGllbnQucHV0KHBhcmFtcykucHJvbWlzZSgpO1xuICAgIGNvbnNvbGUuaW5mbygnYWZ0ZXIgZGIgcmVxdWVzdCcscmV0dXJuUmVzdWx0KVxuICAgIHJldHVybiByZXR1cm5SZXN1bHRcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXR1c0NvZGU6ICA1MDAsXG4gICAgICAgICAgICBib2R5OiBlID09PSA1MDAgPyAnSW52YWxpZCBSZXF1ZXN0IEJvZHknIDogZSwgLy8gaGVyZSB3ZSBjYW4gY3JlYXRlIGFuZCBpbXBvcnQgYSBjb21tb21uIGVycm9yIGZ1bmN0aW9uIG9yIHNwZWNpZmljIGVycm9yIGhhbmRsaW5nIGZ1bmN0aW9uIHdoZXJlIHRoZSBvdXQgcHV0IGNhbiBiZSBvcmdhbmlzZSBcbiAgICAgICAgICB9O1xuICAgIH1cbn1cblxufVxuIl19