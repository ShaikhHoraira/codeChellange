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
        const bodypram = JSON.parse(this.payload);
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
            const returnResult = await documentClient.put(params).promise();
            console.info(returnResult);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZURhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBOEI7QUFHOUIsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUE7QUFDeEMsTUFBTSxjQUFjLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQztJQUNyRCxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNO0NBQzNCLENBQUMsQ0FBQztBQUVILE1BQWEsWUFBWTtJQUd6QixZQUFZLFFBQWE7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7SUFDNUIsQ0FBQztJQUVNLEtBQUssQ0FBQyxRQUFRO1FBQ2pCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFDLElBQUksTUFBTSxHQUFHO1lBQ1QsU0FBUyxFQUFFLFNBQVU7WUFDckIsSUFBSSxFQUFFO2dCQUNKLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTTtnQkFDdkIsWUFBWSxFQUFHLFFBQVEsQ0FBQyxZQUFZO2dCQUNwQyxZQUFZLEVBQUcsUUFBUSxDQUFDLFlBQVk7Z0JBQ3BDLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTztnQkFDekIsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNO2dCQUN2QixRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7Z0JBQzNCLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSztnQkFDckIsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPO2FBQzFCO1NBQ0YsQ0FBQztRQUNKLElBQUk7WUFDSixNQUFNLFlBQVksR0FBRyxNQUFNLGNBQWMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDaEUsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUMxQixPQUFPLFlBQVksQ0FBQTtTQUNsQjtRQUFDLE9BQU8sQ0FBQyxFQUFDO1lBQ1AsT0FBTztnQkFDSCxVQUFVLEVBQUcsR0FBRztnQkFDaEIsSUFBSSxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsZ0lBQWdJO2FBQy9LLENBQUM7U0FDUDtJQUNMLENBQUM7Q0FFQTtBQWxDRCxvQ0FrQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBBV1MgZnJvbSBcImF3cy1zZGtcIlxuXG5cbmNvbnN0IHRhYmxlTmFtZSA9IHByb2Nlc3MuZW52LlRBQkxFX05BTUVcbmNvbnN0IGRvY3VtZW50Q2xpZW50ID0gbmV3IEFXUy5EeW5hbW9EQi5Eb2N1bWVudENsaWVudCh7XG4gIHJlZ2lvbjogcHJvY2Vzcy5lbnYucmVnaW9uLFxufSk7XG5cbmV4cG9ydCBjbGFzcyBNYW5hZ2VEZXZpY2Uge1xucHVibGljIHBheWxvYWQgOiBhbnk7XG5cbmNvbnN0cnVjdG9yKHBheUxvb2FkOiBhbnkpe1xuICAgIHRoaXMucGF5bG9hZCA9IHBheUxvb2FkO1xufVxuXG5wdWJsaWMgYXN5bmMgc2F2ZURhdGEoKXtcbiAgICBjb25zdCBib2R5cHJhbSA9IEpTT04ucGFyc2UodGhpcy5wYXlsb2FkKTtcbiAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgICBUYWJsZU5hbWU6IHRhYmxlTmFtZSEsXG4gICAgICAgIEl0ZW06IHtcbiAgICAgICAgICBVc2VySWQ6IGJvZHlwcmFtLnVzZXJJZCxcbiAgICAgICAgICBDdXN0b21lck5hbWUgOiBib2R5cHJhbS5jdXN0b21lck5hbWUsXG4gICAgICAgICAgQXBwYXJ0bWVudE5vIDogYm9keXByYW0uYXBwYXJ0bWVudE5vLFxuICAgICAgICAgIEFkZHJlc3M6IGJvZHlwcmFtLmFkZHJlc3MsXG4gICAgICAgICAgU3VidXJiOiBib2R5cHJhbS5zdWJ1cmIsXG4gICAgICAgICAgUG9zdENvZGU6IGJvZHlwcmFtLnBvc3RDb2RlLFxuICAgICAgICAgIFN0YXRlOiBib2R5cHJhbS5zdGF0ZSxcbiAgICAgICAgICBDb3VudHJ5OiBib2R5cHJhbS5jb3VudHJ5XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgdHJ5IHtcbiAgICBjb25zdCByZXR1cm5SZXN1bHQgPSBhd2FpdCBkb2N1bWVudENsaWVudC5wdXQocGFyYW1zKS5wcm9taXNlKCk7XG4gICAgY29uc29sZS5pbmZvKHJldHVyblJlc3VsdClcbiAgICByZXR1cm4gcmV0dXJuUmVzdWx0XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0dXNDb2RlOiAgNTAwLFxuICAgICAgICAgICAgYm9keTogZSA9PT0gNTAwID8gJ0ludmFsaWQgUmVxdWVzdCBCb2R5JyA6IGUsIC8vIGhlcmUgd2UgY2FuIGNyZWF0ZSBhbmQgaW1wb3J0IGEgY29tbW9tbiBlcnJvciBmdW5jdGlvbiBvciBzcGVjaWZpYyBlcnJvciBoYW5kbGluZyBmdW5jdGlvbiB3aGVyZSB0aGUgb3V0IHB1dCBjYW4gYmUgb3JnYW5pc2UgXG4gICAgICAgICAgfTtcbiAgICB9XG59XG5cbn1cbiJdfQ==