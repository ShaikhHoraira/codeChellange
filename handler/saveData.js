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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZURhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFHL0IsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7QUFDekMsTUFBTSxjQUFjLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQztJQUNyRCxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNO0NBQzNCLENBQUMsQ0FBQztBQUVILE1BQWEsbUJBQW1CO0lBR2hDLFlBQVksT0FBWTtRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBQUEsQ0FBQztJQUVLLEtBQUssQ0FBQyxRQUFRO1FBQ2pCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxJQUFJLE1BQU0sR0FBRztZQUNULFNBQVMsRUFBRSxTQUFVO1lBQ3JCLElBQUksRUFBRTtnQkFDSixNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU07Z0JBQ3ZCLFlBQVksRUFBRyxRQUFRLENBQUMsWUFBWTtnQkFDcEMsWUFBWSxFQUFHLFFBQVEsQ0FBQyxZQUFZO2dCQUNwQyxPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU87Z0JBQ3pCLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTTtnQkFDdkIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRO2dCQUMzQixLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUs7Z0JBQ3JCLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTzthQUMxQjtTQUNGLENBQUM7UUFDSixJQUFJO1lBQ0YsTUFBTSxjQUFjLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzNDLE9BQU8sSUFBSSxDQUFBO1NBQ1o7UUFBQyxPQUFPLENBQUMsRUFBQztZQUNQLE9BQU87Z0JBQ0wsVUFBVSxFQUFHLEdBQUc7Z0JBQ2hCLElBQUksRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLGdJQUFnSTthQUNqTCxDQUFDO1NBQ0g7SUFDSCxDQUFDO0NBQ0Y7QUFoQ0Qsa0RBZ0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgQVdTIGZyb20gXCJhd3Mtc2RrXCI7XG5cblxuY29uc3QgdGFibGVOYW1lID0gcHJvY2Vzcy5lbnYuVEFCTEVfTkFNRTtcbmNvbnN0IGRvY3VtZW50Q2xpZW50ID0gbmV3IEFXUy5EeW5hbW9EQi5Eb2N1bWVudENsaWVudCh7XG4gIHJlZ2lvbjogcHJvY2Vzcy5lbnYucmVnaW9uLFxufSk7XG5cbmV4cG9ydCBjbGFzcyBTYXZlQ3VzdG9tZXJBZGRyZXNzIHtcbnB1YmxpYyBwYXlsb2FkIDogYW55O1xuXG5jb25zdHJ1Y3RvcihwYXlMb2FkOiBhbnkpe1xuICAgIHRoaXMucGF5bG9hZCA9IHBheUxvYWQ7XG59O1xuXG5wdWJsaWMgYXN5bmMgc2F2ZURhdGEoKXtcbiAgICBjb25zdCBib2R5cHJhbSA9IEpTT04ucGFyc2UodGhpcy5wYXlsb2FkLmJvZHkpO1xuICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAgIFRhYmxlTmFtZTogdGFibGVOYW1lISxcbiAgICAgICAgSXRlbToge1xuICAgICAgICAgIFVzZXJJZDogYm9keXByYW0udXNlcklkLFxuICAgICAgICAgIEN1c3RvbWVyTmFtZSA6IGJvZHlwcmFtLmN1c3RvbWVyTmFtZSxcbiAgICAgICAgICBBcHBhcnRtZW50Tm8gOiBib2R5cHJhbS5hcHBhcnRtZW50Tm8sXG4gICAgICAgICAgQWRkcmVzczogYm9keXByYW0uYWRkcmVzcyxcbiAgICAgICAgICBTdWJ1cmI6IGJvZHlwcmFtLnN1YnVyYixcbiAgICAgICAgICBQb3N0Q29kZTogYm9keXByYW0ucG9zdENvZGUsXG4gICAgICAgICAgU3RhdGU6IGJvZHlwcmFtLnN0YXRlLFxuICAgICAgICAgIENvdW50cnk6IGJvZHlwcmFtLmNvdW50cnlcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgZG9jdW1lbnRDbGllbnQucHV0KHBhcmFtcykucHJvbWlzZSgpO1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzdGF0dXNDb2RlOiAgNTAwLFxuICAgICAgICAgIGJvZHk6IGUgPT09IDUwMCA/ICdJbnZhbGlkIFJlcXVlc3QgQm9keScgOiBlLCAvLyBoZXJlIHdlIGNhbiBjcmVhdGUgYW5kIGltcG9ydCBhIGNvbW1vbW4gZXJyb3IgZnVuY3Rpb24gb3Igc3BlY2lmaWMgZXJyb3IgaGFuZGxpbmcgZnVuY3Rpb24gd2hlcmUgdGhlIG91dCBwdXQgY2FuIGJlIG9yZ2FuaXNlIFxuICAgICAgfTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==