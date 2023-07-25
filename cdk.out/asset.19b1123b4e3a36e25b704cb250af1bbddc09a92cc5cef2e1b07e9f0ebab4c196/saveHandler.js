"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const saveData_1 = require("./saveData");
// const tableName = process.env.TABLE_NAME
// const documentClient = new AWS.DynamoDB.DocumentClient({
//   region: process.env.region,
// });
const handler = async (event) => {
    //const bodypram = JSON.parse(event.body);
    try {
        const manageDevice = new saveData_1.ManageDevice(event);
        await manageDevice.saveData();
        //console.info('returning from module', returnResult)
        return {
            statusCode: 200,
            body: 'Success'
        };
    }
    catch (e) {
        return {
            statusCode: 500,
            body: e === 500 ? 'Invalid Request Body' : e, // here we can create and import a commomn error function or specific error handling function where the out put can be organise 
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSx5Q0FBeUM7QUFFekMsMkNBQTJDO0FBRTNDLDJEQUEyRDtBQUMzRCxnQ0FBZ0M7QUFDaEMsTUFBTTtBQUdDLE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFVLEVBQUUsRUFBRTtJQUNuRCwwQ0FBMEM7SUFDMUMsSUFBSTtRQUNGLE1BQU0sWUFBWSxHQUFHLElBQUksdUJBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QyxNQUFNLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM5QixxREFBcUQ7UUFDckQsT0FBTztZQUNILFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLFNBQVM7U0FDaEIsQ0FBQztLQUNMO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPO1lBQ0gsVUFBVSxFQUFHLEdBQUc7WUFDaEIsSUFBSSxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsZ0lBQWdJO1NBQy9LLENBQUM7S0FDTDtBQUNILENBQUMsQ0FBQTtBQWhCWSxRQUFBLE9BQU8sV0FnQm5CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XG5pbXBvcnQgKiBhcyBBV1MgZnJvbSBcImF3cy1zZGtcIlxuaW1wb3J0IHsgTWFuYWdlRGV2aWNlIH0gZnJvbSAnLi9zYXZlRGF0YSdcblxuLy8gY29uc3QgdGFibGVOYW1lID0gcHJvY2Vzcy5lbnYuVEFCTEVfTkFNRVxuXG4vLyBjb25zdCBkb2N1bWVudENsaWVudCA9IG5ldyBBV1MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQoe1xuLy8gICByZWdpb246IHByb2Nlc3MuZW52LnJlZ2lvbixcbi8vIH0pO1xuXG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBIYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBhbnkpID0+IHtcbiAgLy9jb25zdCBib2R5cHJhbSA9IEpTT04ucGFyc2UoZXZlbnQuYm9keSk7XG4gIHRyeSB7IFxuICAgIGNvbnN0IG1hbmFnZURldmljZSA9IG5ldyBNYW5hZ2VEZXZpY2UoZXZlbnQpO1xuICAgIGF3YWl0IG1hbmFnZURldmljZS5zYXZlRGF0YSgpO1xuICAgIC8vY29uc29sZS5pbmZvKCdyZXR1cm5pbmcgZnJvbSBtb2R1bGUnLCByZXR1cm5SZXN1bHQpXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiAnU3VjY2VzcydcbiAgICAgIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAgNTAwLFxuICAgICAgICBib2R5OiBlID09PSA1MDAgPyAnSW52YWxpZCBSZXF1ZXN0IEJvZHknIDogZSwgLy8gaGVyZSB3ZSBjYW4gY3JlYXRlIGFuZCBpbXBvcnQgYSBjb21tb21uIGVycm9yIGZ1bmN0aW9uIG9yIHNwZWNpZmljIGVycm9yIGhhbmRsaW5nIGZ1bmN0aW9uIHdoZXJlIHRoZSBvdXQgcHV0IGNhbiBiZSBvcmdhbmlzZSBcbiAgICAgIH07XG4gIH1cbn1cbiJdfQ==