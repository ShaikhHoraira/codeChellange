"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const saveEmployeeData_1 = require("../../modules/OPC/saveEmployeeData");
const handler = async (event) => {
    console.log("We are in saveEmployeeHandler");
    try {
        if (event.httpMethod === "POST") {
            const manageDevice = new saveEmployeeData_1.SaveCustomerAddress(event);
            const responseData = await manageDevice.saveData();
            console.log("🚀 ~ consthandler:Handler= ~ responseData:", responseData);
        }
        // Construct the response
        const response = {
            statusCode: 200,
            body: JSON.stringify('Success')
        };
        return response;
        // console.log("lambda called", event.path)
        // return {
        //     statusCode: 200,
        //     body: event
        // }
    }
    catch (e) {
        // Construct the error response
        const errorResponse = {
            statusCode: 500,
            body: (typeof e === 'string') ? e : 'Invalid Request Body'
        };
        return errorResponse;
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUVtcGxveWVlSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVyL09QQy9zYXZlRW1wbG95ZWVIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHlFQUF5RTtBQUVsRSxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVSxFQUFFLEVBQUU7SUFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFBO0lBQzVDLElBQUk7UUFDRixJQUFJLEtBQUssQ0FBQyxVQUFVLEtBQUssTUFBTSxFQUFDO1lBQzlCLE1BQU0sWUFBWSxHQUFHLElBQUksc0NBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEQsTUFBTSxZQUFZLEdBQUcsTUFBTSxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0Q0FBNEMsRUFBRSxZQUFZLENBQUMsQ0FBQTtTQUN4RTtRQUNELHlCQUF5QjtRQUN6QixNQUFNLFFBQVEsR0FBRztZQUNmLFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1NBQ2hDLENBQUM7UUFDRixPQUFPLFFBQVEsQ0FBQztRQUNoQiwyQ0FBMkM7UUFDM0MsV0FBVztRQUNYLHVCQUF1QjtRQUN2QixrQkFBa0I7UUFDbEIsSUFBSTtLQUNMO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDViwrQkFBK0I7UUFDL0IsTUFBTSxhQUFhLEdBQUc7WUFDcEIsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxzQkFBc0I7U0FDM0QsQ0FBQztRQUNGLE9BQU8sYUFBYSxDQUFDO0tBQ3RCO0FBQ0gsQ0FBQyxDQUFBO0FBM0JZLFFBQUEsT0FBTyxXQTJCbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSBcImF3cy1sYW1iZGFcIjtcbmltcG9ydCB7IFNhdmVDdXN0b21lckFkZHJlc3MgfSBmcm9tICcuLi8uLi9tb2R1bGVzL09QQy9zYXZlRW1wbG95ZWVEYXRhJztcblxuZXhwb3J0IGNvbnN0IGhhbmRsZXI6IEhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IGFueSkgPT4ge1xuICBjb25zb2xlLmxvZyhcIldlIGFyZSBpbiBzYXZlRW1wbG95ZWVIYW5kbGVyXCIpXG4gIHRyeSB7IFxuICAgIGlmIChldmVudC5odHRwTWV0aG9kID09PSBcIlBPU1RcIil7XG4gICAgICBjb25zdCBtYW5hZ2VEZXZpY2UgPSBuZXcgU2F2ZUN1c3RvbWVyQWRkcmVzcyhldmVudCk7XG4gICAgICBjb25zdCByZXNwb25zZURhdGEgPSBhd2FpdCBtYW5hZ2VEZXZpY2Uuc2F2ZURhdGEoKTtcbiAgICAgIGNvbnNvbGUubG9nKFwi8J+agCB+IGNvbnN0aGFuZGxlcjpIYW5kbGVyPSB+IHJlc3BvbnNlRGF0YTpcIiwgcmVzcG9uc2VEYXRhKVxuICAgIH1cbiAgICAvLyBDb25zdHJ1Y3QgdGhlIHJlc3BvbnNlXG4gICAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSgnU3VjY2VzcycpXG4gICAgfTtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgLy8gY29uc29sZS5sb2coXCJsYW1iZGEgY2FsbGVkXCIsIGV2ZW50LnBhdGgpXG4gICAgLy8gcmV0dXJuIHtcbiAgICAvLyAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgIC8vICAgICBib2R5OiBldmVudFxuICAgIC8vIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIENvbnN0cnVjdCB0aGUgZXJyb3IgcmVzcG9uc2VcbiAgICBjb25zdCBlcnJvclJlc3BvbnNlID0ge1xuICAgICAgc3RhdHVzQ29kZTogNTAwLFxuICAgICAgYm9keTogKHR5cGVvZiBlID09PSAnc3RyaW5nJykgPyBlIDogJ0ludmFsaWQgUmVxdWVzdCBCb2R5J1xuICAgIH07XG4gICAgcmV0dXJuIGVycm9yUmVzcG9uc2U7XG4gIH1cbn1cbiJdfQ==