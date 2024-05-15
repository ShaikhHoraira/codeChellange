"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const getEmployeeData_1 = require("../modules/getEmployeeData");
const handler = async (event) => {
    try {
        const { employeeId } = event.queryStringParameters;
        if (!employeeId) {
            throw new Error("Missing parameter: employeeId");
        }
        const manageDevice = new getEmployeeData_1.GetCustomerAddress(employeeId);
        const result = await manageDevice.getData();
        console.log(result);
        return {
            statusCode: 200,
            body: JSON.stringify(event),
        };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RW1wbG95ZWVIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hhbmRsZXIvZ2V0RW1wbG95ZWVIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLGdFQUFnRTtBQUV6RCxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVSxFQUFFLEVBQUU7SUFDbkQsSUFBSTtRQUNGLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxLQUFLLENBQUMscUJBQXFCLENBQUM7UUFDbkQsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztTQUNsRDtRQUNELE1BQU0sWUFBWSxHQUFHLElBQUksb0NBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNuQixPQUFPO1lBQ0wsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7U0FDNUIsQ0FBQztLQUNIO0lBQUMsT0FBTyxDQUFNLEVBQUU7UUFDZixJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtZQUNuRixPQUFPO2dCQUNMLFVBQVUsRUFBRSxHQUFHO2dCQUNmLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTzthQUNoQixDQUFDO1NBQ0g7YUFBTTtZQUNMLE9BQU87Z0JBQ0wsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsSUFBSSxFQUFFLGtCQUFrQjthQUN6QixDQUFDO1NBQ0g7S0FDRjtBQUNILENBQUMsQ0FBQztBQTNCVyxRQUFBLE9BQU8sV0EyQmxCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gXCJhd3MtbGFtYmRhXCI7XG5pbXBvcnQgeyBHZXRDdXN0b21lckFkZHJlc3MgfSBmcm9tICcuLi9tb2R1bGVzL2dldEVtcGxveWVlRGF0YSc7XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBIYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBhbnkpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGVtcGxveWVlSWQgfSA9IGV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycztcbiAgICBpZiAoIWVtcGxveWVlSWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgcGFyYW1ldGVyOiBlbXBsb3llZUlkXCIpO1xuICAgIH1cbiAgICBjb25zdCBtYW5hZ2VEZXZpY2UgPSBuZXcgR2V0Q3VzdG9tZXJBZGRyZXNzKGVtcGxveWVlSWQpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IG1hbmFnZURldmljZS5nZXREYXRhKCk7XG5cbiAgICBjb25zb2xlLmxvZyhyZXN1bHQpXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGV2ZW50KSxcbiAgICB9O1xuICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICBpZiAoZS5tZXNzYWdlLmluY2x1ZGVzKCdNaXNzaW5nIHBhcmFtZXRlcicpIHx8IGUubWVzc2FnZS5pbmNsdWRlcygnSW52YWxpZCBmb3JtYXQnKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogNDAwLFxuICAgICAgICBib2R5OiBlLm1lc3NhZ2UsXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiA0MDMsXG4gICAgICAgIGJvZHk6ICdGb3JiaWRkZW4gYWNjZXNzJyxcbiAgICAgIH07XG4gICAgfVxuICB9XG59O1xuIl19