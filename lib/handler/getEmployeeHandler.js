"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const getData_1 = require("../modules/getData");
const handler = async (event) => {
    try {
        // Validate presence of userId
        const { userId, suburb, postcode } = event.queryStringParameters;
        if (!userId) {
            throw new Error("Missing parameter: userId");
        }
        const manageDevice = new getData_1.GetCustomerAddress(userId, suburb, postcode);
        const result = await manageDevice.getData();
        return {
            statusCode: 200,
            body: JSON.stringify(result),
        };
    }
    catch (e) {
        // Differentiate between validation and access errors
        if (e.message.includes('Missing parameter') || e.message.includes('Invalid format')) {
            // Validation error - return 400
            return {
                statusCode: 400,
                body: e.message,
            };
        }
        else {
            // Access-related error (e.g., unauthorized user) - return 403
            return {
                statusCode: 403,
                body: 'Forbidden access',
            };
        }
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RW1wbG95ZWVIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hhbmRsZXIvZ2V0RW1wbG95ZWVIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLGdEQUF3RDtBQUVqRCxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVSxFQUFFLEVBQUU7SUFDbkQsSUFBSTtRQUNGLDhCQUE4QjtRQUM5QixNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxLQUFLLENBQUMscUJBQXFCLENBQUM7UUFDakUsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztTQUM5QztRQUNELE1BQU0sWUFBWSxHQUFHLElBQUksNEJBQWtCLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN0RSxNQUFNLE1BQU0sR0FBRyxNQUFNLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM1QyxPQUFPO1lBQ0wsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7U0FDN0IsQ0FBQztLQUNIO0lBQUMsT0FBTyxDQUFNLEVBQUU7UUFDZixxREFBcUQ7UUFDckQsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDbkYsZ0NBQWdDO1lBQ2hDLE9BQU87Z0JBQ0wsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPO2FBQ2hCLENBQUM7U0FDSDthQUFNO1lBQ0wsOERBQThEO1lBQzlELE9BQU87Z0JBQ0wsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsSUFBSSxFQUFFLGtCQUFrQjthQUN6QixDQUFDO1NBQ0g7S0FDRjtBQUNILENBQUMsQ0FBQztBQTdCVyxRQUFBLE9BQU8sV0E2QmxCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gXCJhd3MtbGFtYmRhXCI7XG5pbXBvcnQgeyBHZXRDdXN0b21lckFkZHJlc3MgfSBmcm9tICcuLi9tb2R1bGVzL2dldERhdGEnO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudDogYW55KSA9PiB7XG4gIHRyeSB7XG4gICAgLy8gVmFsaWRhdGUgcHJlc2VuY2Ugb2YgdXNlcklkXG4gICAgY29uc3QgeyB1c2VySWQsIHN1YnVyYiwgcG9zdGNvZGUgfSA9IGV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycztcbiAgICBpZiAoIXVzZXJJZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBwYXJhbWV0ZXI6IHVzZXJJZFwiKTtcbiAgICB9XG4gICAgY29uc3QgbWFuYWdlRGV2aWNlID0gbmV3IEdldEN1c3RvbWVyQWRkcmVzcyh1c2VySWQsIHN1YnVyYiwgcG9zdGNvZGUpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IG1hbmFnZURldmljZS5nZXREYXRhKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlc3VsdCksXG4gICAgfTtcbiAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgLy8gRGlmZmVyZW50aWF0ZSBiZXR3ZWVuIHZhbGlkYXRpb24gYW5kIGFjY2VzcyBlcnJvcnNcbiAgICBpZiAoZS5tZXNzYWdlLmluY2x1ZGVzKCdNaXNzaW5nIHBhcmFtZXRlcicpIHx8IGUubWVzc2FnZS5pbmNsdWRlcygnSW52YWxpZCBmb3JtYXQnKSkge1xuICAgICAgLy8gVmFsaWRhdGlvbiBlcnJvciAtIHJldHVybiA0MDBcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDQwMCxcbiAgICAgICAgYm9keTogZS5tZXNzYWdlLFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQWNjZXNzLXJlbGF0ZWQgZXJyb3IgKGUuZy4sIHVuYXV0aG9yaXplZCB1c2VyKSAtIHJldHVybiA0MDNcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDQwMyxcbiAgICAgICAgYm9keTogJ0ZvcmJpZGRlbiBhY2Nlc3MnLFxuICAgICAgfTtcbiAgICB9XG4gIH1cbn07XG4iXX0=