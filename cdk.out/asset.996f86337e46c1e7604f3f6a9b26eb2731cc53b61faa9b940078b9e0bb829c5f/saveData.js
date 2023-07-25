"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManageDevice = void 0;
const AWS = require("aws-sdk");
const tableName = process.env.TABLE_NAME;
const documentClient = new AWS.DynamoDB.DocumentClient({
    region: process.env.region,
});
class ManageDevice {
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
exports.ManageDevice = ManageDevice;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZURhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBOEI7QUFHOUIsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUE7QUFDeEMsTUFBTSxjQUFjLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQztJQUNyRCxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNO0NBQzNCLENBQUMsQ0FBQztBQUVILE1BQWEsWUFBWTtJQUd6QixZQUFZLE9BQVk7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDM0IsQ0FBQztJQUVNLEtBQUssQ0FBQyxRQUFRO1FBQ2pCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxJQUFJLE1BQU0sR0FBRztZQUNULFNBQVMsRUFBRSxTQUFVO1lBQ3JCLElBQUksRUFBRTtnQkFDSixNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU07Z0JBQ3ZCLFlBQVksRUFBRyxRQUFRLENBQUMsWUFBWTtnQkFDcEMsWUFBWSxFQUFHLFFBQVEsQ0FBQyxZQUFZO2dCQUNwQyxPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU87Z0JBQ3pCLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTTtnQkFDdkIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRO2dCQUMzQixLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUs7Z0JBQ3JCLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTzthQUMxQjtTQUNGLENBQUM7UUFDSixJQUFJO1lBQ0osT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUE7WUFDcEMsd0JBQXdCO1lBQ3hCLE1BQU0sY0FBYyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMzQyxPQUFPLElBQUksQ0FBQTtTQUNWO1FBQUMsT0FBTyxDQUFDLEVBQUM7WUFDUCxPQUFPO2dCQUNILFVBQVUsRUFBRyxHQUFHO2dCQUNoQixJQUFJLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxnSUFBZ0k7YUFDL0ssQ0FBQztTQUNQO0lBQ0wsQ0FBQztDQUVBO0FBbkNELG9DQW1DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEFXUyBmcm9tIFwiYXdzLXNka1wiXG5cblxuY29uc3QgdGFibGVOYW1lID0gcHJvY2Vzcy5lbnYuVEFCTEVfTkFNRVxuY29uc3QgZG9jdW1lbnRDbGllbnQgPSBuZXcgQVdTLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50KHtcbiAgcmVnaW9uOiBwcm9jZXNzLmVudi5yZWdpb24sXG59KTtcblxuZXhwb3J0IGNsYXNzIE1hbmFnZURldmljZSB7XG5wdWJsaWMgcGF5bG9hZCA6IGFueTtcblxuY29uc3RydWN0b3IocGF5TG9hZDogYW55KXtcbiAgICB0aGlzLnBheWxvYWQgPSBwYXlMb2FkO1xufVxuXG5wdWJsaWMgYXN5bmMgc2F2ZURhdGEoKXtcbiAgICBjb25zdCBib2R5cHJhbSA9IEpTT04ucGFyc2UodGhpcy5wYXlsb2FkLmJvZHkpO1xuICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAgIFRhYmxlTmFtZTogdGFibGVOYW1lISxcbiAgICAgICAgSXRlbToge1xuICAgICAgICAgIFVzZXJJZDogYm9keXByYW0udXNlcklkLFxuICAgICAgICAgIEN1c3RvbWVyTmFtZSA6IGJvZHlwcmFtLmN1c3RvbWVyTmFtZSxcbiAgICAgICAgICBBcHBhcnRtZW50Tm8gOiBib2R5cHJhbS5hcHBhcnRtZW50Tm8sXG4gICAgICAgICAgQWRkcmVzczogYm9keXByYW0uYWRkcmVzcyxcbiAgICAgICAgICBTdWJ1cmI6IGJvZHlwcmFtLnN1YnVyYixcbiAgICAgICAgICBQb3N0Q29kZTogYm9keXByYW0ucG9zdENvZGUsXG4gICAgICAgICAgU3RhdGU6IGJvZHlwcmFtLnN0YXRlLFxuICAgICAgICAgIENvdW50cnk6IGJvZHlwcmFtLmNvdW50cnlcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB0cnkge1xuICAgIGNvbnNvbGUuaW5mbygnaW5zaWRlIHRyeScsIGJvZHlwcmFtKVxuICAgIC8vIGNvbnN0IHJldHVyblJlc3VsdCA9IFxuICAgIGF3YWl0IGRvY3VtZW50Q2xpZW50LnB1dChwYXJhbXMpLnByb21pc2UoKTtcbiAgICByZXR1cm4gdHJ1ZVxuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdHVzQ29kZTogIDUwMCxcbiAgICAgICAgICAgIGJvZHk6IGUgPT09IDUwMCA/ICdJbnZhbGlkIFJlcXVlc3QgQm9keScgOiBlLCAvLyBoZXJlIHdlIGNhbiBjcmVhdGUgYW5kIGltcG9ydCBhIGNvbW1vbW4gZXJyb3IgZnVuY3Rpb24gb3Igc3BlY2lmaWMgZXJyb3IgaGFuZGxpbmcgZnVuY3Rpb24gd2hlcmUgdGhlIG91dCBwdXQgY2FuIGJlIG9yZ2FuaXNlIFxuICAgICAgICAgIH07XG4gICAgfVxufVxuXG59XG4iXX0=