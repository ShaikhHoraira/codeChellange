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
        console.log("🚀 ~ SaveCustomerAddress ~ constructor ~ payLoad:", payLoad);
        this.payload = payLoad;
    }
    ;
    async saveData() {
        const bodypram = JSON.parse(this.payload.body);
        console.log("🚀 ~ SaveCustomerAddress ~ saveData ~ bodypram:", bodypram);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZURhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFFL0IsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7QUFDekMsTUFBTSxjQUFjLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQztJQUNyRCxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNO0NBQzNCLENBQUMsQ0FBQztBQUVILE1BQWEsbUJBQW1CO0lBR2hDLFlBQVksT0FBWTtRQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLG1EQUFtRCxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBQ3pFLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQzNCLENBQUM7SUFBQSxDQUFDO0lBRUssS0FBSyxDQUFDLFFBQVE7UUFDakIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsaURBQWlELEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDeEUsSUFBSSxNQUFNLEdBQUc7WUFDVCxTQUFTLEVBQUUsU0FBVTtZQUNyQixJQUFJLEVBQUU7Z0JBQ0osTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNO2dCQUN2QixZQUFZLEVBQUcsUUFBUSxDQUFDLFlBQVk7Z0JBQ3BDLFlBQVksRUFBRyxRQUFRLENBQUMsWUFBWTtnQkFDcEMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPO2dCQUN6QixNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU07Z0JBQ3ZCLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUTtnQkFDM0IsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLO2dCQUNyQixPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU87YUFDMUI7U0FDRixDQUFDO1FBQ0osSUFBSTtZQUNGLE1BQU0sY0FBYyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMzQyxPQUFPLElBQUksQ0FBQTtTQUNaO1FBQUMsT0FBTyxDQUFDLEVBQUM7WUFDUCxPQUFPO2dCQUNMLFVBQVUsRUFBRyxHQUFHO2dCQUNoQixJQUFJLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxnSUFBZ0k7YUFDakwsQ0FBQztTQUNIO0lBQ0gsQ0FBQztDQUNGO0FBbENELGtEQWtDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEFXUyBmcm9tIFwiYXdzLXNka1wiO1xuXG5jb25zdCB0YWJsZU5hbWUgPSBwcm9jZXNzLmVudi5UQUJMRV9OQU1FO1xuY29uc3QgZG9jdW1lbnRDbGllbnQgPSBuZXcgQVdTLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50KHtcbiAgcmVnaW9uOiBwcm9jZXNzLmVudi5yZWdpb24sXG59KTtcblxuZXhwb3J0IGNsYXNzIFNhdmVDdXN0b21lckFkZHJlc3Mge1xucHVibGljIHBheWxvYWQgOiBhbnk7XG5cbmNvbnN0cnVjdG9yKHBheUxvYWQ6IGFueSl7XG4gICAgY29uc29sZS5sb2coXCLwn5qAIH4gU2F2ZUN1c3RvbWVyQWRkcmVzcyB+IGNvbnN0cnVjdG9yIH4gcGF5TG9hZDpcIiwgcGF5TG9hZClcbiAgICB0aGlzLnBheWxvYWQgPSBwYXlMb2FkO1xufTtcblxucHVibGljIGFzeW5jIHNhdmVEYXRhKCl7XG4gICAgY29uc3QgYm9keXByYW0gPSBKU09OLnBhcnNlKHRoaXMucGF5bG9hZC5ib2R5KTtcbiAgICBjb25zb2xlLmxvZyhcIvCfmoAgfiBTYXZlQ3VzdG9tZXJBZGRyZXNzIH4gc2F2ZURhdGEgfiBib2R5cHJhbTpcIiwgYm9keXByYW0pXG4gICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgICAgVGFibGVOYW1lOiB0YWJsZU5hbWUhLFxuICAgICAgICBJdGVtOiB7XG4gICAgICAgICAgVXNlcklkOiBib2R5cHJhbS51c2VySWQsXG4gICAgICAgICAgQ3VzdG9tZXJOYW1lIDogYm9keXByYW0uY3VzdG9tZXJOYW1lLFxuICAgICAgICAgIEFwcGFydG1lbnRObyA6IGJvZHlwcmFtLmFwcGFydG1lbnRObyxcbiAgICAgICAgICBBZGRyZXNzOiBib2R5cHJhbS5hZGRyZXNzLFxuICAgICAgICAgIFN1YnVyYjogYm9keXByYW0uc3VidXJiLFxuICAgICAgICAgIFBvc3RDb2RlOiBib2R5cHJhbS5wb3N0Q29kZSxcbiAgICAgICAgICBTdGF0ZTogYm9keXByYW0uc3RhdGUsXG4gICAgICAgICAgQ291bnRyeTogYm9keXByYW0uY291bnRyeVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBkb2N1bWVudENsaWVudC5wdXQocGFyYW1zKS5wcm9taXNlKCk7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHN0YXR1c0NvZGU6ICA1MDAsXG4gICAgICAgICAgYm9keTogZSA9PT0gNTAwID8gJ0ludmFsaWQgUmVxdWVzdCBCb2R5JyA6IGUsIC8vIGhlcmUgd2UgY2FuIGNyZWF0ZSBhbmQgaW1wb3J0IGEgY29tbW9tbiBlcnJvciBmdW5jdGlvbiBvciBzcGVjaWZpYyBlcnJvciBoYW5kbGluZyBmdW5jdGlvbiB3aGVyZSB0aGUgb3V0IHB1dCBjYW4gYmUgb3JnYW5pc2UgXG4gICAgICB9O1xuICAgIH1cbiAgfVxufVxuIl19