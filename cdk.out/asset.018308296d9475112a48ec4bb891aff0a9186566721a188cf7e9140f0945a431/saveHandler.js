"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const saveData_1 = require("./saveData");
// const tableName = process.env.TABLE_NAME
// const documentClient = new AWS.DynamoDB.DocumentClient({
//   region: process.env.region,
// });
const handler = async (event) => {
    const bodypram = JSON.parse(event.body);
    try {
        const manageDevice = new saveData_1.ManageDevice(event);
        const returnResult = await manageDevice.saveData();
        // console.info('returning from module', returnResult)
        return {
            statusCode: 200,
            body: returnResult
        };
    }
    catch (e) {
        ;
        return {
            statusCode: 500,
            body: e === 500 ? 'Invalid Request Body' : e, // here we can create and import a commomn error function or specific error handling function where the out put can be organise 
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSx5Q0FBeUM7QUFFekMsMkNBQTJDO0FBRTNDLDJEQUEyRDtBQUMzRCxnQ0FBZ0M7QUFDaEMsTUFBTTtBQUdDLE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFVLEVBQUUsRUFBRTtJQUNuRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxJQUFJO1FBQ0YsTUFBTSxZQUFZLEdBQUcsSUFBSSx1QkFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLE1BQU0sWUFBWSxHQUFHLE1BQU0sWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ25ELHNEQUFzRDtRQUN0RCxPQUFPO1lBQ0gsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsWUFBWTtTQUNuQixDQUFDO0tBQ0w7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUFDLENBQUM7UUFDWixPQUFPO1lBQ0gsVUFBVSxFQUFHLEdBQUc7WUFDaEIsSUFBSSxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsZ0lBQWdJO1NBQy9LLENBQUM7S0FDTDtBQUNILENBQUMsQ0FBQTtBQWhCWSxRQUFBLE9BQU8sV0FnQm5CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XG5pbXBvcnQgKiBhcyBBV1MgZnJvbSBcImF3cy1zZGtcIlxuaW1wb3J0IHsgTWFuYWdlRGV2aWNlIH0gZnJvbSAnLi9zYXZlRGF0YSdcblxuLy8gY29uc3QgdGFibGVOYW1lID0gcHJvY2Vzcy5lbnYuVEFCTEVfTkFNRVxuXG4vLyBjb25zdCBkb2N1bWVudENsaWVudCA9IG5ldyBBV1MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQoe1xuLy8gICByZWdpb246IHByb2Nlc3MuZW52LnJlZ2lvbixcbi8vIH0pO1xuXG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBIYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBhbnkpID0+IHtcbiAgY29uc3QgYm9keXByYW0gPSBKU09OLnBhcnNlKGV2ZW50LmJvZHkpO1xuICB0cnkgeyBcbiAgICBjb25zdCBtYW5hZ2VEZXZpY2UgPSBuZXcgTWFuYWdlRGV2aWNlKGV2ZW50KTtcbiAgICBjb25zdCByZXR1cm5SZXN1bHQgPSBhd2FpdCBtYW5hZ2VEZXZpY2Uuc2F2ZURhdGEoKTtcbiAgICAvLyBjb25zb2xlLmluZm8oJ3JldHVybmluZyBmcm9tIG1vZHVsZScsIHJldHVyblJlc3VsdClcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHJldHVyblJlc3VsdFxuICAgICAgfTtcbiAgfSBjYXRjaCAoZSkgeztcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAgNTAwLFxuICAgICAgICBib2R5OiBlID09PSA1MDAgPyAnSW52YWxpZCBSZXF1ZXN0IEJvZHknIDogZSwgLy8gaGVyZSB3ZSBjYW4gY3JlYXRlIGFuZCBpbXBvcnQgYSBjb21tb21uIGVycm9yIGZ1bmN0aW9uIG9yIHNwZWNpZmljIGVycm9yIGhhbmRsaW5nIGZ1bmN0aW9uIHdoZXJlIHRoZSBvdXQgcHV0IGNhbiBiZSBvcmdhbmlzZSBcbiAgICAgIH07XG4gIH1cbn1cbiJdfQ==