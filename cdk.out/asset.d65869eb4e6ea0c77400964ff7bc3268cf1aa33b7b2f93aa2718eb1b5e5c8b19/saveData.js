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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZURhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBOEI7QUFHOUIsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUE7QUFDeEMsTUFBTSxjQUFjLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQztJQUNyRCxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNO0NBQzNCLENBQUMsQ0FBQztBQUVILE1BQWEsbUJBQW1CO0lBR2hDLFlBQVksT0FBWTtRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBRU0sS0FBSyxDQUFDLFFBQVE7UUFDakIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLElBQUksTUFBTSxHQUFHO1lBQ1QsU0FBUyxFQUFFLFNBQVU7WUFDckIsSUFBSSxFQUFFO2dCQUNKLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTTtnQkFDdkIsWUFBWSxFQUFHLFFBQVEsQ0FBQyxZQUFZO2dCQUNwQyxZQUFZLEVBQUcsUUFBUSxDQUFDLFlBQVk7Z0JBQ3BDLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTztnQkFDekIsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNO2dCQUN2QixRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7Z0JBQzNCLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSztnQkFDckIsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPO2FBQzFCO1NBQ0YsQ0FBQztRQUNKLElBQUk7WUFDRixNQUFNLGNBQWMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDM0MsT0FBTyxJQUFJLENBQUE7U0FDWjtRQUFDLE9BQU8sQ0FBQyxFQUFDO1lBQ1AsT0FBTztnQkFDSCxVQUFVLEVBQUcsR0FBRztnQkFDaEIsSUFBSSxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsZ0lBQWdJO2FBQy9LLENBQUM7U0FDUDtJQUNMLENBQUM7Q0FFQTtBQWpDRCxrREFpQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBBV1MgZnJvbSBcImF3cy1zZGtcIlxuXG5cbmNvbnN0IHRhYmxlTmFtZSA9IHByb2Nlc3MuZW52LlRBQkxFX05BTUVcbmNvbnN0IGRvY3VtZW50Q2xpZW50ID0gbmV3IEFXUy5EeW5hbW9EQi5Eb2N1bWVudENsaWVudCh7XG4gIHJlZ2lvbjogcHJvY2Vzcy5lbnYucmVnaW9uLFxufSk7XG5cbmV4cG9ydCBjbGFzcyBTYXZlQ3VzdG9tZXJBZGRyZXNzIHtcbnB1YmxpYyBwYXlsb2FkIDogYW55O1xuXG5jb25zdHJ1Y3RvcihwYXlMb2FkOiBhbnkpe1xuICAgIHRoaXMucGF5bG9hZCA9IHBheUxvYWQ7XG59XG5cbnB1YmxpYyBhc3luYyBzYXZlRGF0YSgpe1xuICAgIGNvbnN0IGJvZHlwcmFtID0gSlNPTi5wYXJzZSh0aGlzLnBheWxvYWQuYm9keSk7XG4gICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgICAgVGFibGVOYW1lOiB0YWJsZU5hbWUhLFxuICAgICAgICBJdGVtOiB7XG4gICAgICAgICAgVXNlcklkOiBib2R5cHJhbS51c2VySWQsXG4gICAgICAgICAgQ3VzdG9tZXJOYW1lIDogYm9keXByYW0uY3VzdG9tZXJOYW1lLFxuICAgICAgICAgIEFwcGFydG1lbnRObyA6IGJvZHlwcmFtLmFwcGFydG1lbnRObyxcbiAgICAgICAgICBBZGRyZXNzOiBib2R5cHJhbS5hZGRyZXNzLFxuICAgICAgICAgIFN1YnVyYjogYm9keXByYW0uc3VidXJiLFxuICAgICAgICAgIFBvc3RDb2RlOiBib2R5cHJhbS5wb3N0Q29kZSxcbiAgICAgICAgICBTdGF0ZTogYm9keXByYW0uc3RhdGUsXG4gICAgICAgICAgQ291bnRyeTogYm9keXByYW0uY291bnRyeVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBkb2N1bWVudENsaWVudC5wdXQocGFyYW1zKS5wcm9taXNlKCk7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdHVzQ29kZTogIDUwMCxcbiAgICAgICAgICAgIGJvZHk6IGUgPT09IDUwMCA/ICdJbnZhbGlkIFJlcXVlc3QgQm9keScgOiBlLCAvLyBoZXJlIHdlIGNhbiBjcmVhdGUgYW5kIGltcG9ydCBhIGNvbW1vbW4gZXJyb3IgZnVuY3Rpb24gb3Igc3BlY2lmaWMgZXJyb3IgaGFuZGxpbmcgZnVuY3Rpb24gd2hlcmUgdGhlIG91dCBwdXQgY2FuIGJlIG9yZ2FuaXNlIFxuICAgICAgICAgIH07XG4gICAgfVxufVxuXG59XG4iXX0=