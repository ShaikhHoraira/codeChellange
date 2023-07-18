"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// import {ManageSaveData} from '../modules/save_data';
// import {ManageGetData} from '../modules/get_data';
const handler = async (event) => {
    // const manageGetData = new ManageGetData();
    try {
        let response;
        if (event.httpMethod === "GET") {
            //   response =  await manageGetData.getDeviceByDeviceToken('');
            //   console.log("🚀 ~ file: save_retrive_address.ts:16 ~ constTuHandler:Handler= ~ response:", response)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdURBQXVEO0FBQ3ZELHFEQUFxRDtBQUU5QyxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVyxFQUFFLEVBQUU7SUFDdEQsNkNBQTZDO0lBQzNDLElBQUk7UUFDRixJQUFJLFFBQVEsQ0FBQztRQUNaLElBQUksS0FBSyxDQUFDLFVBQVUsS0FBSyxLQUFLLEVBQUM7WUFDaEMsZ0VBQWdFO1lBQ2hFLHlHQUF5RztTQUV4RztRQUNELE9BQU87WUFDSCxVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxTQUFTO1NBQ2hCLENBQUM7S0FDTDtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTztZQUNILFVBQVUsRUFBRyxHQUFHO1lBQ2hCLElBQUksRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsc0JBQXNCO1NBQ2xFLENBQUM7S0FDTDtBQUNILENBQUMsQ0FBQztBQW5CVyxRQUFBLE9BQU8sV0FtQmxCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XG4vLyBpbXBvcnQge01hbmFnZVNhdmVEYXRhfSBmcm9tICcuLi9tb2R1bGVzL3NhdmVfZGF0YSc7XG4vLyBpbXBvcnQge01hbmFnZUdldERhdGF9IGZyb20gJy4uL21vZHVsZXMvZ2V0X2RhdGEnO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudCA6IGFueSkgPT4ge1xuLy8gY29uc3QgbWFuYWdlR2V0RGF0YSA9IG5ldyBNYW5hZ2VHZXREYXRhKCk7XG4gIHRyeSB7XG4gICAgbGV0IHJlc3BvbnNlO1xuICAgICBpZiAoZXZlbnQuaHR0cE1ldGhvZCA9PT0gXCJHRVRcIil7XG4gICAgLy8gICByZXNwb25zZSA9ICBhd2FpdCBtYW5hZ2VHZXREYXRhLmdldERldmljZUJ5RGV2aWNlVG9rZW4oJycpO1xuICAgIC8vICAgY29uc29sZS5sb2coXCLwn5qAIH4gZmlsZTogc2F2ZV9yZXRyaXZlX2FkZHJlc3MudHM6MTYgfiBjb25zdFR1SGFuZGxlcjpIYW5kbGVyPSB+IHJlc3BvbnNlOlwiLCByZXNwb25zZSlcblxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6ICdTdWNjZXNzJyxcbiAgICAgIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAgNTAwLFxuICAgICAgICBib2R5OiBlID09PSA1MDAgPyAnSW52YWxpZCBSZXF1ZXN0IEJvZHknIDogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyxcbiAgICAgIH07XG4gIH1cbn07Il19