"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const saveData_1 = require("../modules/saveData");
const handler = async (event) => {
    try {
        if (event.httpMethod === "POST") {
            const manageDevice = new saveData_1.SaveCustomerAddress(event);
            await manageDevice.saveData();
        }
        // Construct the response
        const response = {
            statusCode: 200,
            body: JSON.stringify('Success')
        };
        return response;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGFuZGxlci9zYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxrREFBMEQ7QUFFbkQsTUFBTSxPQUFPLEdBQVksS0FBSyxFQUFFLEtBQVUsRUFBRSxFQUFFO0lBQ25ELElBQUk7UUFDRixJQUFJLEtBQUssQ0FBQyxVQUFVLEtBQUssTUFBTSxFQUFDO1lBQzlCLE1BQU0sWUFBWSxHQUFHLElBQUksOEJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEQsTUFBTSxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDL0I7UUFDRCx5QkFBeUI7UUFDekIsTUFBTSxRQUFRLEdBQUc7WUFDZixVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztTQUNoQyxDQUFDO1FBQ0YsT0FBTyxRQUFRLENBQUM7S0FDakI7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLCtCQUErQjtRQUMvQixNQUFNLGFBQWEsR0FBRztZQUNwQixVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtTQUMzRCxDQUFDO1FBQ0YsT0FBTyxhQUFhLENBQUM7S0FDdEI7QUFDSCxDQUFDLENBQUE7QUFwQlksUUFBQSxPQUFPLFdBb0JuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWxhbWJkYVwiO1xuaW1wb3J0IHsgU2F2ZUN1c3RvbWVyQWRkcmVzcyB9IGZyb20gJy4uL21vZHVsZXMvc2F2ZURhdGEnO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudDogYW55KSA9PiB7XG4gIHRyeSB7IFxuICAgIGlmIChldmVudC5odHRwTWV0aG9kID09PSBcIlBPU1RcIil7XG4gICAgICBjb25zdCBtYW5hZ2VEZXZpY2UgPSBuZXcgU2F2ZUN1c3RvbWVyQWRkcmVzcyhldmVudCk7XG4gICAgICBhd2FpdCBtYW5hZ2VEZXZpY2Uuc2F2ZURhdGEoKTtcbiAgICB9XG4gICAgLy8gQ29uc3RydWN0IHRoZSByZXNwb25zZVxuICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoJ1N1Y2Nlc3MnKVxuICAgIH07XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gQ29uc3RydWN0IHRoZSBlcnJvciByZXNwb25zZVxuICAgIGNvbnN0IGVycm9yUmVzcG9uc2UgPSB7XG4gICAgICBzdGF0dXNDb2RlOiA1MDAsXG4gICAgICBib2R5OiAodHlwZW9mIGUgPT09ICdzdHJpbmcnKSA/IGUgOiAnSW52YWxpZCBSZXF1ZXN0IEJvZHknXG4gICAgfTtcbiAgICByZXR1cm4gZXJyb3JSZXNwb25zZTtcbiAgfVxufVxuIl19