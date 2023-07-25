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
        const bodypram = JSON.parse(this.payload.body);
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
            // const returnResult = 
            await documentClient.put(params).promise();
            // console.info('after db request',returnResult)
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
exports.ManageDevice = ManageDevice;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZURhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBOEI7QUFHOUIsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUE7QUFDeEMsTUFBTSxjQUFjLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQztJQUNyRCxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNO0NBQzNCLENBQUMsQ0FBQztBQUVILE1BQWEsWUFBWTtJQUd6QixZQUFZLFFBQWE7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7SUFDNUIsQ0FBQztJQUVNLEtBQUssQ0FBQyxRQUFRO1FBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3RELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUNyQyxJQUFJLE1BQU0sR0FBRztZQUNULFNBQVMsRUFBRSxTQUFVO1lBQ3JCLElBQUksRUFBRTtnQkFDSixNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU07Z0JBQ3ZCLFlBQVksRUFBRyxRQUFRLENBQUMsWUFBWTtnQkFDcEMsWUFBWSxFQUFHLFFBQVEsQ0FBQyxZQUFZO2dCQUNwQyxPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU87Z0JBQ3pCLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTTtnQkFDdkIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRO2dCQUMzQixLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUs7Z0JBQ3JCLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTzthQUMxQjtTQUNGLENBQUM7UUFDSixJQUFJO1lBQ0osT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUE7WUFDcEMsd0JBQXdCO1lBQ3hCLE1BQU0sY0FBYyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMzQyxnREFBZ0Q7WUFDaEQsT0FBTyxJQUFJLENBQUE7U0FDVjtRQUFDLE9BQU8sQ0FBQyxFQUFDO1lBQ1AsT0FBTztnQkFDSCxVQUFVLEVBQUcsR0FBRztnQkFDaEIsSUFBSSxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsZ0lBQWdJO2FBQy9LLENBQUM7U0FDUDtJQUNMLENBQUM7Q0FFQTtBQXRDRCxvQ0FzQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBBV1MgZnJvbSBcImF3cy1zZGtcIlxuXG5cbmNvbnN0IHRhYmxlTmFtZSA9IHByb2Nlc3MuZW52LlRBQkxFX05BTUVcbmNvbnN0IGRvY3VtZW50Q2xpZW50ID0gbmV3IEFXUy5EeW5hbW9EQi5Eb2N1bWVudENsaWVudCh7XG4gIHJlZ2lvbjogcHJvY2Vzcy5lbnYucmVnaW9uLFxufSk7XG5cbmV4cG9ydCBjbGFzcyBNYW5hZ2VEZXZpY2Uge1xucHVibGljIHBheWxvYWQgOiBhbnk7XG5cbmNvbnN0cnVjdG9yKHBheUxvb2FkOiBhbnkpe1xuICAgIHRoaXMucGF5bG9hZCA9IHBheUxvb2FkO1xufVxuXG5wdWJsaWMgYXN5bmMgc2F2ZURhdGEoKXtcbiAgICBjb25zb2xlLmluZm8oJ3JldHVybmluZyBmcm9tIG1vZHVsZSAxNycsIHRoaXMucGF5bG9hZClcbiAgICBjb25zdCBib2R5cHJhbSA9IEpTT04ucGFyc2UodGhpcy5wYXlsb2FkLmJvZHkpO1xuICAgIGNvbnNvbGUuaW5mbygnYWZ0ZXIgcGFyc2UnLCBib2R5cHJhbSlcbiAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgICBUYWJsZU5hbWU6IHRhYmxlTmFtZSEsXG4gICAgICAgIEl0ZW06IHtcbiAgICAgICAgICBVc2VySWQ6IGJvZHlwcmFtLnVzZXJJZCxcbiAgICAgICAgICBDdXN0b21lck5hbWUgOiBib2R5cHJhbS5jdXN0b21lck5hbWUsXG4gICAgICAgICAgQXBwYXJ0bWVudE5vIDogYm9keXByYW0uYXBwYXJ0bWVudE5vLFxuICAgICAgICAgIEFkZHJlc3M6IGJvZHlwcmFtLmFkZHJlc3MsXG4gICAgICAgICAgU3VidXJiOiBib2R5cHJhbS5zdWJ1cmIsXG4gICAgICAgICAgUG9zdENvZGU6IGJvZHlwcmFtLnBvc3RDb2RlLFxuICAgICAgICAgIFN0YXRlOiBib2R5cHJhbS5zdGF0ZSxcbiAgICAgICAgICBDb3VudHJ5OiBib2R5cHJhbS5jb3VudHJ5XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgdHJ5IHtcbiAgICBjb25zb2xlLmluZm8oJ2luc2lkZSB0cnknLCBib2R5cHJhbSlcbiAgICAvLyBjb25zdCByZXR1cm5SZXN1bHQgPSBcbiAgICBhd2FpdCBkb2N1bWVudENsaWVudC5wdXQocGFyYW1zKS5wcm9taXNlKCk7XG4gICAgLy8gY29uc29sZS5pbmZvKCdhZnRlciBkYiByZXF1ZXN0JyxyZXR1cm5SZXN1bHQpXG4gICAgcmV0dXJuIHRydWVcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXR1c0NvZGU6ICA1MDAsXG4gICAgICAgICAgICBib2R5OiBlID09PSA1MDAgPyAnSW52YWxpZCBSZXF1ZXN0IEJvZHknIDogZSwgLy8gaGVyZSB3ZSBjYW4gY3JlYXRlIGFuZCBpbXBvcnQgYSBjb21tb21uIGVycm9yIGZ1bmN0aW9uIG9yIHNwZWNpZmljIGVycm9yIGhhbmRsaW5nIGZ1bmN0aW9uIHdoZXJlIHRoZSBvdXQgcHV0IGNhbiBiZSBvcmdhbmlzZSBcbiAgICAgICAgICB9O1xuICAgIH1cbn1cblxufVxuIl19