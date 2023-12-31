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
        const returnResult = await documentClient.put(params).promise();
        console.info(returnResult);
        return returnResult;
    }
}
exports.ManageDevice = ManageDevice;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZURhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBOEI7QUFJOUIsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUE7QUFDeEMsTUFBTSxjQUFjLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQztJQUNyRCxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNO0NBQzNCLENBQUMsQ0FBQztBQUdILE1BQWEsWUFBWTtJQUd6QixZQUFZLFFBQWE7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7SUFDNUIsQ0FBQztJQUVNLEtBQUssQ0FBQyxRQUFRO1FBQ2pCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFDLElBQUksTUFBTSxHQUFHO1lBQ1QsU0FBUyxFQUFFLFNBQVU7WUFDckIsSUFBSSxFQUFFO2dCQUNKLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTTtnQkFDdkIsWUFBWSxFQUFHLFFBQVEsQ0FBQyxZQUFZO2dCQUNwQyxZQUFZLEVBQUcsUUFBUSxDQUFDLFlBQVk7Z0JBQ3BDLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTztnQkFDekIsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNO2dCQUN2QixRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7Z0JBQzNCLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSztnQkFDckIsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPO2FBQzFCO1NBQ0YsQ0FBQztRQUNILE1BQU0sWUFBWSxHQUFHLE1BQU0sY0FBYyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNqRSxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQzFCLE9BQU8sWUFBWSxDQUFBO0lBRXZCLENBQUM7Q0FFQTtBQTVCRCxvQ0E0QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBBV1MgZnJvbSBcImF3cy1zZGtcIlxuXG5cblxuY29uc3QgdGFibGVOYW1lID0gcHJvY2Vzcy5lbnYuVEFCTEVfTkFNRVxuY29uc3QgZG9jdW1lbnRDbGllbnQgPSBuZXcgQVdTLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50KHtcbiAgcmVnaW9uOiBwcm9jZXNzLmVudi5yZWdpb24sXG59KTtcblxuXG5leHBvcnQgY2xhc3MgTWFuYWdlRGV2aWNlIHtcbnB1YmxpYyBwYXlsb2FkIDogYW55O1xuXG5jb25zdHJ1Y3RvcihwYXlMb29hZDogYW55KXtcbiAgICB0aGlzLnBheWxvYWQgPSBwYXlMb29hZDtcbn1cblxucHVibGljIGFzeW5jIHNhdmVEYXRhKCl7XG4gICAgY29uc3QgYm9keXByYW0gPSBKU09OLnBhcnNlKHRoaXMucGF5bG9hZCk7XG4gICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgICAgVGFibGVOYW1lOiB0YWJsZU5hbWUhLFxuICAgICAgICBJdGVtOiB7XG4gICAgICAgICAgVXNlcklkOiBib2R5cHJhbS51c2VySWQsXG4gICAgICAgICAgQ3VzdG9tZXJOYW1lIDogYm9keXByYW0uY3VzdG9tZXJOYW1lLFxuICAgICAgICAgIEFwcGFydG1lbnRObyA6IGJvZHlwcmFtLmFwcGFydG1lbnRObyxcbiAgICAgICAgICBBZGRyZXNzOiBib2R5cHJhbS5hZGRyZXNzLFxuICAgICAgICAgIFN1YnVyYjogYm9keXByYW0uc3VidXJiLFxuICAgICAgICAgIFBvc3RDb2RlOiBib2R5cHJhbS5wb3N0Q29kZSxcbiAgICAgICAgICBTdGF0ZTogYm9keXByYW0uc3RhdGUsXG4gICAgICAgICAgQ291bnRyeTogYm9keXByYW0uY291bnRyeVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICBjb25zdCByZXR1cm5SZXN1bHQgPSBhd2FpdCBkb2N1bWVudENsaWVudC5wdXQocGFyYW1zKS5wcm9taXNlKCk7XG4gICAgY29uc29sZS5pbmZvKHJldHVyblJlc3VsdClcbiAgICByZXR1cm4gcmV0dXJuUmVzdWx0XG4gICAgXG59XG5cbn1cbiJdfQ==