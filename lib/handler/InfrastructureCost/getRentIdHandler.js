"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
//import { GetCustomerAddress } from '../../modules/OPC/getEmployeeData';
const handler = async (event) => {
    try {
        // const { employeeId } = event.queryStringParameters;
        // if (!employeeId) {
        //   throw new Error("Missing parameter: employeeId");
        // }
        // const manageDevice = new GetCustomerAddress(employeeId);
        // const result = await manageDevice.getData();
        // console.log(result)
        // return {
        //   statusCode: 200,
        //   body: JSON.stringify(result),
        // };
        console.log("this is console log from save rent id from infracture construct");
        console.log(event);
        const response = {
            statusCode: 200,
            body: JSON.stringify(event)
        };
        return response;
    }
    catch (e) {
        if (e.message.includes('Missing parameter') || e.message.includes('Invalid format')) {
            return {
                statusCode: 400,
                body: e.message,
            };
        }
        else {
            return {
                statusCode: 403,
                body: 'Forbidden access',
            };
        }
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UmVudElkSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVyL0luZnJhc3RydWN0dXJlQ29zdC9nZXRSZW50SWRIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHlFQUF5RTtBQUVsRSxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVSxFQUFFLEVBQUU7SUFDbkQsSUFBSTtRQUNGLHNEQUFzRDtRQUN0RCxxQkFBcUI7UUFDckIsc0RBQXNEO1FBQ3RELElBQUk7UUFDSiwyREFBMkQ7UUFDM0QsK0NBQStDO1FBRS9DLHNCQUFzQjtRQUN0QixXQUFXO1FBQ1gscUJBQXFCO1FBQ3JCLGtDQUFrQztRQUNsQyxLQUFLO1FBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpRUFBaUUsQ0FBQyxDQUFBO1FBQzlFLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDbEIsTUFBTSxRQUFRLEdBQUc7WUFDZixVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztTQUM1QixDQUFBO1FBQ0QsT0FBTyxRQUFRLENBQUM7S0FDakI7SUFBQyxPQUFPLENBQU0sRUFBRTtRQUNmLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQ25GLE9BQU87Z0JBQ0wsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPO2FBQ2hCLENBQUM7U0FDSDthQUFNO1lBQ0wsT0FBTztnQkFDTCxVQUFVLEVBQUUsR0FBRztnQkFDZixJQUFJLEVBQUUsa0JBQWtCO2FBQ3pCLENBQUM7U0FDSDtLQUNGO0FBQ0gsQ0FBQyxDQUFDO0FBbENXLFFBQUEsT0FBTyxXQWtDbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSBcImF3cy1sYW1iZGFcIjtcbi8vaW1wb3J0IHsgR2V0Q3VzdG9tZXJBZGRyZXNzIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9PUEMvZ2V0RW1wbG95ZWVEYXRhJztcblxuZXhwb3J0IGNvbnN0IGhhbmRsZXI6IEhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IGFueSkgPT4ge1xuICB0cnkge1xuICAgIC8vIGNvbnN0IHsgZW1wbG95ZWVJZCB9ID0gZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzO1xuICAgIC8vIGlmICghZW1wbG95ZWVJZCkge1xuICAgIC8vICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBwYXJhbWV0ZXI6IGVtcGxveWVlSWRcIik7XG4gICAgLy8gfVxuICAgIC8vIGNvbnN0IG1hbmFnZURldmljZSA9IG5ldyBHZXRDdXN0b21lckFkZHJlc3MoZW1wbG95ZWVJZCk7XG4gICAgLy8gY29uc3QgcmVzdWx0ID0gYXdhaXQgbWFuYWdlRGV2aWNlLmdldERhdGEoKTtcblxuICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdClcbiAgICAvLyByZXR1cm4ge1xuICAgIC8vICAgc3RhdHVzQ29kZTogMjAwLFxuICAgIC8vICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVzdWx0KSxcbiAgICAvLyB9O1xuICAgIGNvbnNvbGUubG9nKFwidGhpcyBpcyBjb25zb2xlIGxvZyBmcm9tIHNhdmUgcmVudCBpZCBmcm9tIGluZnJhY3R1cmUgY29uc3RydWN0XCIpXG4gICAgY29uc29sZS5sb2coZXZlbnQpXG4gICAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShldmVudClcbiAgICB9XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICBpZiAoZS5tZXNzYWdlLmluY2x1ZGVzKCdNaXNzaW5nIHBhcmFtZXRlcicpIHx8IGUubWVzc2FnZS5pbmNsdWRlcygnSW52YWxpZCBmb3JtYXQnKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogNDAwLFxuICAgICAgICBib2R5OiBlLm1lc3NhZ2UsXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiA0MDMsXG4gICAgICAgIGJvZHk6ICdGb3JiaWRkZW4gYWNjZXNzJyxcbiAgICAgIH07XG4gICAgfVxuICB9XG59O1xuIl19