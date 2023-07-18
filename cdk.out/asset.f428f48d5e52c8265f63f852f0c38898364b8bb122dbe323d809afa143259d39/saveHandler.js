"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// import {ManageSaveData} from '../modules/save_data';
// import {ManageGetData} from '../modules/get_data';
const handler = async (event) => {
    // const manageSaveData = new ManageSaveData(process.env.TODO_TABLE_NAME);
    // const manageGetData = new ManageGetData();
    try {
        let response;
        if (event.httpMethod === 'POST') {
            // response = await manageSaveData.saveDevice(event.dynamodb.tableName,'');
            // console.log("🚀 ~ file: save_retrive_address.ts:12 ~ constTuHandler:Handler= ~ response:", response)
        }
        return {
            statusCode: 200,
            body: 'Success',
        };
    }
    catch (e) {
        return {
            statusCode: 500,
            body: e === 500 ? 'Invalid Request Body' : 'Something went wrong',
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1REFBdUQ7QUFDdkQscURBQXFEO0FBRTlDLE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFXLEVBQUUsRUFBRTtJQUN0RCwwRUFBMEU7SUFDMUUsNkNBQTZDO0lBQzNDLElBQUk7UUFDRixJQUFJLFFBQVEsQ0FBQztRQUNiLElBQUksS0FBSyxDQUFDLFVBQVUsS0FBSyxNQUFNLEVBQUU7WUFDL0IsMkVBQTJFO1lBQzNFLHVHQUF1RztTQUN4RztRQUNELE9BQU87WUFDSCxVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxTQUFTO1NBQ2hCLENBQUM7S0FDTDtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTztZQUNILFVBQVUsRUFBRyxHQUFHO1lBQ2hCLElBQUksRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsc0JBQXNCO1NBQ2xFLENBQUM7S0FDTDtBQUNILENBQUMsQ0FBQztBQW5CVyxRQUFBLE9BQU8sV0FtQmxCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XG4vLyBpbXBvcnQge01hbmFnZVNhdmVEYXRhfSBmcm9tICcuLi9tb2R1bGVzL3NhdmVfZGF0YSc7XG4vLyBpbXBvcnQge01hbmFnZUdldERhdGF9IGZyb20gJy4uL21vZHVsZXMvZ2V0X2RhdGEnO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudCA6IGFueSkgPT4ge1xuLy8gY29uc3QgbWFuYWdlU2F2ZURhdGEgPSBuZXcgTWFuYWdlU2F2ZURhdGEocHJvY2Vzcy5lbnYuVE9ET19UQUJMRV9OQU1FKTtcbi8vIGNvbnN0IG1hbmFnZUdldERhdGEgPSBuZXcgTWFuYWdlR2V0RGF0YSgpO1xuICB0cnkge1xuICAgIGxldCByZXNwb25zZTtcbiAgICBpZiAoZXZlbnQuaHR0cE1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgICAvLyByZXNwb25zZSA9IGF3YWl0IG1hbmFnZVNhdmVEYXRhLnNhdmVEZXZpY2UoZXZlbnQuZHluYW1vZGIudGFibGVOYW1lLCcnKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwi8J+agCB+IGZpbGU6IHNhdmVfcmV0cml2ZV9hZGRyZXNzLnRzOjEyIH4gY29uc3RUdUhhbmRsZXI6SGFuZGxlcj0gfiByZXNwb25zZTpcIiwgcmVzcG9uc2UpXG4gICAgfSBcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6ICdTdWNjZXNzJyxcbiAgICAgIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAgNTAwLFxuICAgICAgICBib2R5OiBlID09PSA1MDAgPyAnSW52YWxpZCBSZXF1ZXN0IEJvZHknIDogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyxcbiAgICAgIH07XG4gIH1cbn07Il19