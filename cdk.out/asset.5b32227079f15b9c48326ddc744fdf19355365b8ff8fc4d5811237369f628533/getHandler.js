"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const get_data_1 = require("../modules/get_data");
const handler = async (event) => {
    const manageGetData = new get_data_1.ManageGetData();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsa0RBQW9EO0FBRTdDLE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFXLEVBQUUsRUFBRTtJQUN0RCxNQUFNLGFBQWEsR0FBRyxJQUFJLHdCQUFhLEVBQUUsQ0FBQztJQUN4QyxJQUFJO1FBQ0YsSUFBSSxRQUFRLENBQUM7UUFDWixJQUFJLEtBQUssQ0FBQyxVQUFVLEtBQUssS0FBSyxFQUFDO1lBQ2hDLGdFQUFnRTtZQUNoRSx5R0FBeUc7U0FFeEc7UUFDRCxPQUFPO1lBQ0gsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsU0FBUztTQUNoQixDQUFDO0tBQ0w7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU87WUFDSCxVQUFVLEVBQUcsR0FBRztZQUNoQixJQUFJLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtTQUNsRSxDQUFDO0tBQ0w7QUFDSCxDQUFDLENBQUM7QUFuQlcsUUFBQSxPQUFPLFdBbUJsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuaW1wb3J0IHsgTWFuYWdlU2F2ZURhdGEgfSBmcm9tICcuLi9tb2R1bGVzL3NhdmVfZGF0YSc7XG5pbXBvcnQgeyBNYW5hZ2VHZXREYXRhIH0gZnJvbSAnLi4vbW9kdWxlcy9nZXRfZGF0YSc7XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBIYW5kbGVyID0gYXN5bmMgKGV2ZW50IDogYW55KSA9PiB7XG5jb25zdCBtYW5hZ2VHZXREYXRhID0gbmV3IE1hbmFnZUdldERhdGEoKTtcbiAgdHJ5IHtcbiAgICBsZXQgcmVzcG9uc2U7XG4gICAgIGlmIChldmVudC5odHRwTWV0aG9kID09PSBcIkdFVFwiKXtcbiAgICAvLyAgIHJlc3BvbnNlID0gIGF3YWl0IG1hbmFnZUdldERhdGEuZ2V0RGV2aWNlQnlEZXZpY2VUb2tlbignJyk7XG4gICAgLy8gICBjb25zb2xlLmxvZyhcIvCfmoAgfiBmaWxlOiBzYXZlX3JldHJpdmVfYWRkcmVzcy50czoxNiB+IGNvbnN0VHVIYW5kbGVyOkhhbmRsZXI9IH4gcmVzcG9uc2U6XCIsIHJlc3BvbnNlKVxuXG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keTogJ1N1Y2Nlc3MnLFxuICAgICAgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6ICA1MDAsXG4gICAgICAgIGJvZHk6IGUgPT09IDUwMCA/ICdJbnZhbGlkIFJlcXVlc3QgQm9keScgOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnLFxuICAgICAgfTtcbiAgfVxufTsiXX0=