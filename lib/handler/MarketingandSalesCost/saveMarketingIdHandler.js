"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const saveMarketingCostData_1 = require("../../modules/MarketingandSalesCost/saveMarketingCostData");
const handler = async (event) => {
    console.log("We are in saveRentId");
    try {
        if (event.httpMethod === "POST") {
            const manageDevice = new saveMarketingCostData_1.SaveMarketingCostData(event);
            const responseData = await manageDevice.saveMarketingData();
            console.log("🚀 ~ consthandler:Handler= ~ responseData:", responseData);
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify('Success')
        };
        return response;
        // }
    }
    catch (e) {
        const errorResponse = {
            statusCode: 500,
            body: (typeof e === 'string') ? e : 'Invalid Request Body'
        };
        return errorResponse;
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZU1hcmtldGluZ0lkSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVyL01hcmtldGluZ2FuZFNhbGVzQ29zdC9zYXZlTWFya2V0aW5nSWRIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHFHQUFrRztBQUUzRixNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVSxFQUFFLEVBQUU7SUFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO0lBQ25DLElBQUk7UUFDRixJQUFJLEtBQUssQ0FBQyxVQUFVLEtBQUssTUFBTSxFQUFDO1lBQzlCLE1BQU0sWUFBWSxHQUFHLElBQUksNkNBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEQsTUFBTSxZQUFZLEdBQUcsTUFBTSxZQUFZLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUM1RCxPQUFPLENBQUMsR0FBRyxDQUFDLDRDQUE0QyxFQUFFLFlBQVksQ0FBQyxDQUFBO1NBQ3hFO1FBQ0QsTUFBTSxRQUFRLEdBQUc7WUFDZixVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztTQUNoQyxDQUFDO1FBQ0YsT0FBTyxRQUFRLENBQUM7UUFDaEIsSUFBSTtLQUNMO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixNQUFNLGFBQWEsR0FBRztZQUNwQixVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtTQUMzRCxDQUFDO1FBQ0YsT0FBTyxhQUFhLENBQUM7S0FDdEI7QUFDSCxDQUFDLENBQUE7QUFyQlksUUFBQSxPQUFPLFdBcUJuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWxhbWJkYVwiO1xuaW1wb3J0IHsgU2F2ZU1hcmtldGluZ0Nvc3REYXRhIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9NYXJrZXRpbmdhbmRTYWxlc0Nvc3Qvc2F2ZU1hcmtldGluZ0Nvc3REYXRhJztcblxuZXhwb3J0IGNvbnN0IGhhbmRsZXI6IEhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IGFueSkgPT4ge1xuICBjb25zb2xlLmxvZyhcIldlIGFyZSBpbiBzYXZlUmVudElkXCIpXG4gIHRyeSB7IFxuICAgIGlmIChldmVudC5odHRwTWV0aG9kID09PSBcIlBPU1RcIil7XG4gICAgICBjb25zdCBtYW5hZ2VEZXZpY2UgPSBuZXcgU2F2ZU1hcmtldGluZ0Nvc3REYXRhKGV2ZW50KTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9IGF3YWl0IG1hbmFnZURldmljZS5zYXZlTWFya2V0aW5nRGF0YSgpO1xuICAgICAgY29uc29sZS5sb2coXCLwn5qAIH4gY29uc3RoYW5kbGVyOkhhbmRsZXI9IH4gcmVzcG9uc2VEYXRhOlwiLCByZXNwb25zZURhdGEpXG4gICAgfVxuICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoJ1N1Y2Nlc3MnKVxuICAgIH07XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIC8vIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnN0IGVycm9yUmVzcG9uc2UgPSB7XG4gICAgICBzdGF0dXNDb2RlOiA1MDAsXG4gICAgICBib2R5OiAodHlwZW9mIGUgPT09ICdzdHJpbmcnKSA/IGUgOiAnSW52YWxpZCBSZXF1ZXN0IEJvZHknXG4gICAgfTtcbiAgICByZXR1cm4gZXJyb3JSZXNwb25zZTtcbiAgfVxufVxuIl19