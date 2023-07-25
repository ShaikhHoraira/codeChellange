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
            console.info('inside try', bodypram);
            // const returnResult = 
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZURhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBOEI7QUFHOUIsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUE7QUFDeEMsTUFBTSxjQUFjLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQztJQUNyRCxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNO0NBQzNCLENBQUMsQ0FBQztBQUVILE1BQWEsbUJBQW1CO0lBR2hDLFlBQVksT0FBWTtRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBRU0sS0FBSyxDQUFDLFFBQVE7UUFDakIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLElBQUksTUFBTSxHQUFHO1lBQ1QsU0FBUyxFQUFFLFNBQVU7WUFDckIsSUFBSSxFQUFFO2dCQUNKLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTTtnQkFDdkIsWUFBWSxFQUFHLFFBQVEsQ0FBQyxZQUFZO2dCQUNwQyxZQUFZLEVBQUcsUUFBUSxDQUFDLFlBQVk7Z0JBQ3BDLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTztnQkFDekIsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNO2dCQUN2QixRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7Z0JBQzNCLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSztnQkFDckIsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPO2FBQzFCO1NBQ0YsQ0FBQztRQUNKLElBQUk7WUFDSixPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQTtZQUNwQyx3QkFBd0I7WUFDeEIsTUFBTSxjQUFjLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzNDLE9BQU8sSUFBSSxDQUFBO1NBQ1Y7UUFBQyxPQUFPLENBQUMsRUFBQztZQUNQLE9BQU87Z0JBQ0gsVUFBVSxFQUFHLEdBQUc7Z0JBQ2hCLElBQUksRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLGdJQUFnSTthQUMvSyxDQUFDO1NBQ1A7SUFDTCxDQUFDO0NBRUE7QUFuQ0Qsa0RBbUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgQVdTIGZyb20gXCJhd3Mtc2RrXCJcblxuXG5jb25zdCB0YWJsZU5hbWUgPSBwcm9jZXNzLmVudi5UQUJMRV9OQU1FXG5jb25zdCBkb2N1bWVudENsaWVudCA9IG5ldyBBV1MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQoe1xuICByZWdpb246IHByb2Nlc3MuZW52LnJlZ2lvbixcbn0pO1xuXG5leHBvcnQgY2xhc3MgU2F2ZUN1c3RvbWVyQWRkcmVzcyB7XG5wdWJsaWMgcGF5bG9hZCA6IGFueTtcblxuY29uc3RydWN0b3IocGF5TG9hZDogYW55KXtcbiAgICB0aGlzLnBheWxvYWQgPSBwYXlMb2FkO1xufVxuXG5wdWJsaWMgYXN5bmMgc2F2ZURhdGEoKXtcbiAgICBjb25zdCBib2R5cHJhbSA9IEpTT04ucGFyc2UodGhpcy5wYXlsb2FkLmJvZHkpO1xuICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAgIFRhYmxlTmFtZTogdGFibGVOYW1lISxcbiAgICAgICAgSXRlbToge1xuICAgICAgICAgIFVzZXJJZDogYm9keXByYW0udXNlcklkLFxuICAgICAgICAgIEN1c3RvbWVyTmFtZSA6IGJvZHlwcmFtLmN1c3RvbWVyTmFtZSxcbiAgICAgICAgICBBcHBhcnRtZW50Tm8gOiBib2R5cHJhbS5hcHBhcnRtZW50Tm8sXG4gICAgICAgICAgQWRkcmVzczogYm9keXByYW0uYWRkcmVzcyxcbiAgICAgICAgICBTdWJ1cmI6IGJvZHlwcmFtLnN1YnVyYixcbiAgICAgICAgICBQb3N0Q29kZTogYm9keXByYW0ucG9zdENvZGUsXG4gICAgICAgICAgU3RhdGU6IGJvZHlwcmFtLnN0YXRlLFxuICAgICAgICAgIENvdW50cnk6IGJvZHlwcmFtLmNvdW50cnlcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB0cnkge1xuICAgIGNvbnNvbGUuaW5mbygnaW5zaWRlIHRyeScsIGJvZHlwcmFtKVxuICAgIC8vIGNvbnN0IHJldHVyblJlc3VsdCA9IFxuICAgIGF3YWl0IGRvY3VtZW50Q2xpZW50LnB1dChwYXJhbXMpLnByb21pc2UoKTtcbiAgICByZXR1cm4gdHJ1ZVxuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdHVzQ29kZTogIDUwMCxcbiAgICAgICAgICAgIGJvZHk6IGUgPT09IDUwMCA/ICdJbnZhbGlkIFJlcXVlc3QgQm9keScgOiBlLCAvLyBoZXJlIHdlIGNhbiBjcmVhdGUgYW5kIGltcG9ydCBhIGNvbW1vbW4gZXJyb3IgZnVuY3Rpb24gb3Igc3BlY2lmaWMgZXJyb3IgaGFuZGxpbmcgZnVuY3Rpb24gd2hlcmUgdGhlIG91dCBwdXQgY2FuIGJlIG9yZ2FuaXNlIFxuICAgICAgICAgIH07XG4gICAgfVxufVxuXG59XG4iXX0=