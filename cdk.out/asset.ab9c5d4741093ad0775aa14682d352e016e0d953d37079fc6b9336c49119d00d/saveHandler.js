"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const save_data_1 = require("../modules/save_data");
const get_data_1 = require("../modules/get_data");
const handler = async (event) => {
    const manageSaveData = new save_data_1.ManageSaveData(process.env.TODO_TABLE_NAME);
    const manageGetData = new get_data_1.ManageGetData();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxvREFBb0Q7QUFDcEQsa0RBQWtEO0FBRTNDLE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFXLEVBQUUsRUFBRTtJQUN0RCxNQUFNLGNBQWMsR0FBRyxJQUFJLDBCQUFjLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN2RSxNQUFNLGFBQWEsR0FBRyxJQUFJLHdCQUFhLEVBQUUsQ0FBQztJQUN4QyxJQUFJO1FBQ0YsSUFBSSxRQUFRLENBQUM7UUFDYixJQUFJLEtBQUssQ0FBQyxVQUFVLEtBQUssTUFBTSxFQUFFO1lBQy9CLDJFQUEyRTtZQUMzRSx1R0FBdUc7U0FDeEc7UUFDRCxPQUFPO1lBQ0gsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsU0FBUztTQUNoQixDQUFDO0tBQ0w7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU87WUFDSCxVQUFVLEVBQUcsR0FBRztZQUNoQixJQUFJLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtTQUNsRSxDQUFDO0tBQ0w7QUFDSCxDQUFDLENBQUM7QUFuQlcsUUFBQSxPQUFPLFdBbUJsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuaW1wb3J0IHtNYW5hZ2VTYXZlRGF0YX0gZnJvbSAnLi4vbW9kdWxlcy9zYXZlX2RhdGEnO1xuaW1wb3J0IHtNYW5hZ2VHZXREYXRhfSBmcm9tICcuLi9tb2R1bGVzL2dldF9kYXRhJztcblxuZXhwb3J0IGNvbnN0IGhhbmRsZXI6IEhhbmRsZXIgPSBhc3luYyAoZXZlbnQgOiBhbnkpID0+IHtcbmNvbnN0IG1hbmFnZVNhdmVEYXRhID0gbmV3IE1hbmFnZVNhdmVEYXRhKHByb2Nlc3MuZW52LlRPRE9fVEFCTEVfTkFNRSk7XG5jb25zdCBtYW5hZ2VHZXREYXRhID0gbmV3IE1hbmFnZUdldERhdGEoKTtcbiAgdHJ5IHtcbiAgICBsZXQgcmVzcG9uc2U7XG4gICAgaWYgKGV2ZW50Lmh0dHBNZXRob2QgPT09ICdQT1NUJykge1xuICAgICAgLy8gcmVzcG9uc2UgPSBhd2FpdCBtYW5hZ2VTYXZlRGF0YS5zYXZlRGV2aWNlKGV2ZW50LmR5bmFtb2RiLnRhYmxlTmFtZSwnJyk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcIvCfmoAgfiBmaWxlOiBzYXZlX3JldHJpdmVfYWRkcmVzcy50czoxMiB+IGNvbnN0VHVIYW5kbGVyOkhhbmRsZXI9IH4gcmVzcG9uc2U6XCIsIHJlc3BvbnNlKVxuICAgIH0gXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiAnU3VjY2VzcycsXG4gICAgICB9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogIDUwMCxcbiAgICAgICAgYm9keTogZSA9PT0gNTAwID8gJ0ludmFsaWQgUmVxdWVzdCBCb2R5JyA6ICdTb21ldGhpbmcgd2VudCB3cm9uZycsXG4gICAgICB9O1xuICB9XG59OyJdfQ==