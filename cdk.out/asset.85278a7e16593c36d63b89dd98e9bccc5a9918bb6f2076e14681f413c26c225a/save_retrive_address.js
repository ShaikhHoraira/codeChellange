"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TuHandler = void 0;
const save_data_1 = require("../modules/save_data");
const get_data_1 = require("../modules/get_data");
const TuHandler = async (event) => {
    const manageSaveData = new save_data_1.ManageSaveData();
    const manageGetData = new get_data_1.ManageGetData();
    try {
        let response;
        if (event.httpMethod === 'GET') {
            response = await manageSaveData.saveDevice(event.dynamodb.tableName, '');
            console.log("🚀 ~ file: save_retrive_address.ts:12 ~ constTuHandler:Handler= ~ response:", response);
        }
        else if (event.httpMethod === "POST") {
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
exports.TuHandler = TuHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZV9yZXRyaXZlX2FkZHJlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlX3JldHJpdmVfYWRkcmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxvREFBb0Q7QUFDcEQsa0RBQWtEO0FBRTNDLE1BQU0sU0FBUyxHQUFZLEtBQUssRUFBRSxLQUFXLEVBQUUsRUFBRTtJQUN4RCxNQUFNLGNBQWMsR0FBRyxJQUFJLDBCQUFjLEVBQUUsQ0FBQztJQUM1QyxNQUFNLGFBQWEsR0FBRyxJQUFJLHdCQUFhLEVBQUUsQ0FBQztJQUN4QyxJQUFJO1FBQ0YsSUFBSSxRQUFRLENBQUM7UUFDYixJQUFJLEtBQUssQ0FBQyxVQUFVLEtBQUssS0FBSyxFQUFFO1lBQzlCLFFBQVEsR0FBRyxNQUFNLGNBQWMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUMsRUFBRSxDQUFDLENBQUM7WUFDeEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2RUFBNkUsRUFBRSxRQUFRLENBQUMsQ0FBQTtTQUNyRzthQUFNLElBQUksS0FBSyxDQUFDLFVBQVUsS0FBSyxNQUFNLEVBQUM7WUFDckMsUUFBUSxHQUFJLE1BQU0sYUFBYSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsNkVBQTZFLEVBQUUsUUFBUSxDQUFDLENBQUE7U0FDckc7UUFDRCxPQUFPO1lBQ0gsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsU0FBUztTQUNoQixDQUFDO0tBQ0w7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU87WUFDSCxVQUFVLEVBQUcsR0FBRztZQUNoQixJQUFJLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtTQUNsRSxDQUFDO0tBQ0w7QUFDSCxDQUFDLENBQUM7QUF0QlcsUUFBQSxTQUFTLGFBc0JwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuaW1wb3J0IHtNYW5hZ2VTYXZlRGF0YX0gZnJvbSAnLi4vbW9kdWxlcy9zYXZlX2RhdGEnO1xuaW1wb3J0IHtNYW5hZ2VHZXREYXRhfSBmcm9tICcuLi9tb2R1bGVzL2dldF9kYXRhJztcblxuZXhwb3J0IGNvbnN0IFR1SGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudCA6IGFueSkgPT4ge1xuY29uc3QgbWFuYWdlU2F2ZURhdGEgPSBuZXcgTWFuYWdlU2F2ZURhdGEoKTtcbmNvbnN0IG1hbmFnZUdldERhdGEgPSBuZXcgTWFuYWdlR2V0RGF0YSgpO1xuICB0cnkge1xuICAgIGxldCByZXNwb25zZTtcbiAgICBpZiAoZXZlbnQuaHR0cE1ldGhvZCA9PT0gJ0dFVCcpIHtcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgbWFuYWdlU2F2ZURhdGEuc2F2ZURldmljZShldmVudC5keW5hbW9kYi50YWJsZU5hbWUsJycpO1xuICAgICAgY29uc29sZS5sb2coXCLwn5qAIH4gZmlsZTogc2F2ZV9yZXRyaXZlX2FkZHJlc3MudHM6MTIgfiBjb25zdFR1SGFuZGxlcjpIYW5kbGVyPSB+IHJlc3BvbnNlOlwiLCByZXNwb25zZSlcbiAgICB9IGVsc2UgaWYgKGV2ZW50Lmh0dHBNZXRob2QgPT09IFwiUE9TVFwiKXtcbiAgICAgIHJlc3BvbnNlID0gIGF3YWl0IG1hbmFnZUdldERhdGEuZ2V0RGV2aWNlQnlEZXZpY2VUb2tlbignJyk7XG4gICAgICBjb25zb2xlLmxvZyhcIvCfmoAgfiBmaWxlOiBzYXZlX3JldHJpdmVfYWRkcmVzcy50czoxNiB+IGNvbnN0VHVIYW5kbGVyOkhhbmRsZXI9IH4gcmVzcG9uc2U6XCIsIHJlc3BvbnNlKVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6ICdTdWNjZXNzJyxcbiAgICAgIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAgNTAwLFxuICAgICAgICBib2R5OiBlID09PSA1MDAgPyAnSW52YWxpZCBSZXF1ZXN0IEJvZHknIDogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyxcbiAgICAgIH07XG4gIH1cbn07Il19