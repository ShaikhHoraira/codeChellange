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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZURhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9oYW5kbGVyL3NhdmVEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUErQjtBQUcvQixNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztBQUN6QyxNQUFNLGNBQWMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDO0lBQ3JELE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU07Q0FDM0IsQ0FBQyxDQUFDO0FBRUgsTUFBYSxtQkFBbUI7SUFHaEMsWUFBWSxPQUFZO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQzNCLENBQUM7SUFBQSxDQUFDO0lBRUssS0FBSyxDQUFDLFFBQVE7UUFDakIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLElBQUksTUFBTSxHQUFHO1lBQ1QsU0FBUyxFQUFFLFNBQVU7WUFDckIsSUFBSSxFQUFFO2dCQUNKLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTTtnQkFDdkIsWUFBWSxFQUFHLFFBQVEsQ0FBQyxZQUFZO2dCQUNwQyxZQUFZLEVBQUcsUUFBUSxDQUFDLFlBQVk7Z0JBQ3BDLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTztnQkFDekIsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNO2dCQUN2QixRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7Z0JBQzNCLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSztnQkFDckIsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPO2FBQzFCO1NBQ0YsQ0FBQztRQUNKLElBQUk7WUFDRixNQUFNLGNBQWMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDM0MsT0FBTyxJQUFJLENBQUE7U0FDWjtRQUFDLE9BQU8sQ0FBQyxFQUFDO1lBQ1AsT0FBTztnQkFDTCxVQUFVLEVBQUcsR0FBRztnQkFDaEIsSUFBSSxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsZ0lBQWdJO2FBQ2pMLENBQUM7U0FDSDtJQUNILENBQUM7Q0FDRjtBQWhDRCxrREFnQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBBV1MgZnJvbSBcImF3cy1zZGtcIjtcblxuXG5jb25zdCB0YWJsZU5hbWUgPSBwcm9jZXNzLmVudi5UQUJMRV9OQU1FO1xuY29uc3QgZG9jdW1lbnRDbGllbnQgPSBuZXcgQVdTLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50KHtcbiAgcmVnaW9uOiBwcm9jZXNzLmVudi5yZWdpb24sXG59KTtcblxuZXhwb3J0IGNsYXNzIFNhdmVDdXN0b21lckFkZHJlc3Mge1xucHVibGljIHBheWxvYWQgOiBhbnk7XG5cbmNvbnN0cnVjdG9yKHBheUxvYWQ6IGFueSl7XG4gICAgdGhpcy5wYXlsb2FkID0gcGF5TG9hZDtcbn07XG5cbnB1YmxpYyBhc3luYyBzYXZlRGF0YSgpe1xuICAgIGNvbnN0IGJvZHlwcmFtID0gSlNPTi5wYXJzZSh0aGlzLnBheWxvYWQuYm9keSk7XG4gICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgICAgVGFibGVOYW1lOiB0YWJsZU5hbWUhLFxuICAgICAgICBJdGVtOiB7XG4gICAgICAgICAgVXNlcklkOiBib2R5cHJhbS51c2VySWQsXG4gICAgICAgICAgQ3VzdG9tZXJOYW1lIDogYm9keXByYW0uY3VzdG9tZXJOYW1lLFxuICAgICAgICAgIEFwcGFydG1lbnRObyA6IGJvZHlwcmFtLmFwcGFydG1lbnRObyxcbiAgICAgICAgICBBZGRyZXNzOiBib2R5cHJhbS5hZGRyZXNzLFxuICAgICAgICAgIFN1YnVyYjogYm9keXByYW0uc3VidXJiLFxuICAgICAgICAgIFBvc3RDb2RlOiBib2R5cHJhbS5wb3N0Q29kZSxcbiAgICAgICAgICBTdGF0ZTogYm9keXByYW0uc3RhdGUsXG4gICAgICAgICAgQ291bnRyeTogYm9keXByYW0uY291bnRyeVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBkb2N1bWVudENsaWVudC5wdXQocGFyYW1zKS5wcm9taXNlKCk7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHN0YXR1c0NvZGU6ICA1MDAsXG4gICAgICAgICAgYm9keTogZSA9PT0gNTAwID8gJ0ludmFsaWQgUmVxdWVzdCBCb2R5JyA6IGUsIC8vIGhlcmUgd2UgY2FuIGNyZWF0ZSBhbmQgaW1wb3J0IGEgY29tbW9tbiBlcnJvciBmdW5jdGlvbiBvciBzcGVjaWZpYyBlcnJvciBoYW5kbGluZyBmdW5jdGlvbiB3aGVyZSB0aGUgb3V0IHB1dCBjYW4gYmUgb3JnYW5pc2UgXG4gICAgICB9O1xuICAgIH1cbiAgfVxufVxuIl19