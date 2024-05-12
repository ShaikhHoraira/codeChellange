"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
//import { GetCustomerAddress } from '../modules/getData';
const handler = async (event) => {
    try {
        // const { userId, suburb, postcode } = event.queryStringParameters;
        // if (!userId) {
        //   throw new Error("Missing parameter: userId");
        // }
        // const manageDevice = new GetCustomerAddress(userId, suburb, postcode);
        // const result = await manageDevice.getData();
        console.log(event);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RW1wbG95ZWVIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hhbmRsZXIvZ2V0RW1wbG95ZWVIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDBEQUEwRDtBQUVuRCxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVSxFQUFFLEVBQUU7SUFDbkQsSUFBSTtRQUNGLG9FQUFvRTtRQUNwRSxpQkFBaUI7UUFDakIsa0RBQWtEO1FBQ2xELElBQUk7UUFDSix5RUFBeUU7UUFDekUsK0NBQStDO1FBRS9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDbEIsT0FBTztZQUNMLFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1NBQzVCLENBQUM7S0FDSDtJQUFDLE9BQU8sQ0FBTSxFQUFFO1FBQ2YsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDbkYsT0FBTztnQkFDTCxVQUFVLEVBQUUsR0FBRztnQkFDZixJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU87YUFDaEIsQ0FBQztTQUNIO2FBQU07WUFDTCxPQUFPO2dCQUNMLFVBQVUsRUFBRSxHQUFHO2dCQUNmLElBQUksRUFBRSxrQkFBa0I7YUFDekIsQ0FBQztTQUNIO0tBQ0Y7QUFDSCxDQUFDLENBQUM7QUEzQlcsUUFBQSxPQUFPLFdBMkJsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWxhbWJkYVwiO1xuLy9pbXBvcnQgeyBHZXRDdXN0b21lckFkZHJlc3MgfSBmcm9tICcuLi9tb2R1bGVzL2dldERhdGEnO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudDogYW55KSA9PiB7XG4gIHRyeSB7XG4gICAgLy8gY29uc3QgeyB1c2VySWQsIHN1YnVyYiwgcG9zdGNvZGUgfSA9IGV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycztcbiAgICAvLyBpZiAoIXVzZXJJZCkge1xuICAgIC8vICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBwYXJhbWV0ZXI6IHVzZXJJZFwiKTtcbiAgICAvLyB9XG4gICAgLy8gY29uc3QgbWFuYWdlRGV2aWNlID0gbmV3IEdldEN1c3RvbWVyQWRkcmVzcyh1c2VySWQsIHN1YnVyYiwgcG9zdGNvZGUpO1xuICAgIC8vIGNvbnN0IHJlc3VsdCA9IGF3YWl0IG1hbmFnZURldmljZS5nZXREYXRhKCk7XG5cbiAgICBjb25zb2xlLmxvZyhldmVudClcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZXZlbnQpLFxuICAgIH07XG4gIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgIGlmIChlLm1lc3NhZ2UuaW5jbHVkZXMoJ01pc3NpbmcgcGFyYW1ldGVyJykgfHwgZS5tZXNzYWdlLmluY2x1ZGVzKCdJbnZhbGlkIGZvcm1hdCcpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiA0MDAsXG4gICAgICAgIGJvZHk6IGUubWVzc2FnZSxcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDQwMyxcbiAgICAgICAgYm9keTogJ0ZvcmJpZGRlbiBhY2Nlc3MnLFxuICAgICAgfTtcbiAgICB9XG4gIH1cbn07XG4iXX0=