"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const get_data_1 = require("../modules/get_data");
const handler = async (event) => {
    const manageGetData = new get_data_1.ManageGetData();
    try {
        let response;
        if (event.httpMethod === "GET") {
            response = await manageGetData.getDeviceByDeviceToken('');
            console.log("🚀 ~ file: save_retrive_address.ts:16 ~ constTuHandler:Handler= ~ response:", response);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsa0RBQWtEO0FBRTNDLE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFXLEVBQUUsRUFBRTtJQUN0RCxNQUFNLGFBQWEsR0FBRyxJQUFJLHdCQUFhLEVBQUUsQ0FBQztJQUN4QyxJQUFJO1FBQ0YsSUFBSSxRQUFRLENBQUM7UUFDWixJQUFJLEtBQUssQ0FBQyxVQUFVLEtBQUssS0FBSyxFQUFDO1lBQzlCLFFBQVEsR0FBSSxNQUFNLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMzRCxPQUFPLENBQUMsR0FBRyxDQUFDLDZFQUE2RSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1NBQ3JHO1FBQ0QsT0FBTztZQUNILFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLFNBQVM7U0FDaEIsQ0FBQztLQUNMO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPO1lBQ0gsVUFBVSxFQUFHLEdBQUc7WUFDaEIsSUFBSSxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxzQkFBc0I7U0FDbEUsQ0FBQztLQUNMO0FBQ0gsQ0FBQyxDQUFDO0FBbEJXLFFBQUEsT0FBTyxXQWtCbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcbmltcG9ydCB7TWFuYWdlU2F2ZURhdGF9IGZyb20gJy4uL21vZHVsZXMvc2F2ZV9kYXRhJztcbmltcG9ydCB7TWFuYWdlR2V0RGF0YX0gZnJvbSAnLi4vbW9kdWxlcy9nZXRfZGF0YSc7XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBIYW5kbGVyID0gYXN5bmMgKGV2ZW50IDogYW55KSA9PiB7XG5jb25zdCBtYW5hZ2VHZXREYXRhID0gbmV3IE1hbmFnZUdldERhdGEoKTtcbiAgdHJ5IHtcbiAgICBsZXQgcmVzcG9uc2U7XG4gICAgIGlmIChldmVudC5odHRwTWV0aG9kID09PSBcIkdFVFwiKXtcbiAgICAgIHJlc3BvbnNlID0gIGF3YWl0IG1hbmFnZUdldERhdGEuZ2V0RGV2aWNlQnlEZXZpY2VUb2tlbignJyk7XG4gICAgICBjb25zb2xlLmxvZyhcIvCfmoAgfiBmaWxlOiBzYXZlX3JldHJpdmVfYWRkcmVzcy50czoxNiB+IGNvbnN0VHVIYW5kbGVyOkhhbmRsZXI9IH4gcmVzcG9uc2U6XCIsIHJlc3BvbnNlKVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6ICdTdWNjZXNzJyxcbiAgICAgIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAgNTAwLFxuICAgICAgICBib2R5OiBlID09PSA1MDAgPyAnSW52YWxpZCBSZXF1ZXN0IEJvZHknIDogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyxcbiAgICAgIH07XG4gIH1cbn07Il19