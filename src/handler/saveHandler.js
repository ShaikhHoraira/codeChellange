"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const saveData_1 = require("./saveData");
const handler = async (event) => {
    try {
        if (event.httpMethod === "POST") {
            const manageDevice = new saveData_1.SaveCustomerAddress(event);
            await manageDevice.saveData();
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx5Q0FBaUQ7QUFHMUMsTUFBTSxPQUFPLEdBQVksS0FBSyxFQUFFLEtBQVUsRUFBRSxFQUFFO0lBQ25ELElBQUk7UUFDRixJQUFJLEtBQUssQ0FBQyxVQUFVLEtBQUssTUFBTSxFQUFDO1lBQ2hDLE1BQU0sWUFBWSxHQUFHLElBQUksOEJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEQsTUFBTSxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDN0I7UUFDRCxPQUFPO1lBQ0gsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsU0FBUztTQUNoQixDQUFDO0tBQ0w7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU87WUFDSCxVQUFVLEVBQUcsR0FBRztZQUNoQixJQUFJLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxnSUFBZ0k7U0FDL0ssQ0FBQztLQUNMO0FBQ0gsQ0FBQyxDQUFBO0FBaEJZLFFBQUEsT0FBTyxXQWdCbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcbmltcG9ydCB7IFNhdmVDdXN0b21lckFkZHJlc3MgfSBmcm9tICcuL3NhdmVEYXRhJztcblxuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudDogYW55KSA9PiB7XG4gIHRyeSB7IFxuICAgIGlmIChldmVudC5odHRwTWV0aG9kID09PSBcIlBPU1RcIil7XG4gICAgY29uc3QgbWFuYWdlRGV2aWNlID0gbmV3IFNhdmVDdXN0b21lckFkZHJlc3MoZXZlbnQpO1xuICAgIGF3YWl0IG1hbmFnZURldmljZS5zYXZlRGF0YSgpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6ICdTdWNjZXNzJ1xuICAgICAgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6ICA1MDAsXG4gICAgICAgIGJvZHk6IGUgPT09IDUwMCA/ICdJbnZhbGlkIFJlcXVlc3QgQm9keScgOiBlLCAvLyBoZXJlIHdlIGNhbiBjcmVhdGUgYW5kIGltcG9ydCBhIGNvbW1vbW4gZXJyb3IgZnVuY3Rpb24gb3Igc3BlY2lmaWMgZXJyb3IgaGFuZGxpbmcgZnVuY3Rpb24gd2hlcmUgdGhlIG91dCBwdXQgY2FuIGJlIG9yZ2FuaXNlIFxuICAgICAgfTtcbiAgfVxufVxuIl19