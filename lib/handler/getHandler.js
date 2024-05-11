"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const getData_1 = require("../modules/getData");
const handler = async (event) => {
    try {
        // Validate presence of userId
        const manageDevice = new getData_1.GetCustomerAddress(event.queryStringParameters.userId, event.queryStringParameters.suburb, event.queryStringParameters.postcode);
        const result = await manageDevice.getData();
        return {
            statusCode: 200,
            body: JSON.stringify(result),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS, GET',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Api-Key',
                'Vary': 'Origin',
            },
        };
    }
    catch (e) {
        // Differentiate between validation and access errors
        if (e.message.includes('Missing parameter') || e.message.includes('Invalid format')) {
            // Validation error - return 400
            return {
                statusCode: 400,
                body: e.message,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS, GET',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Api-Key',
                    'Vary': 'Origin',
                },
            };
        }
        else {
            // Access-related error (e.g., unauthorized user) - return 403
            return {
                statusCode: 403,
                body: 'Forbidden access',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS, GET',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Api-Key',
                    'Vary': 'Origin',
                },
            };
        }
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVyL2dldEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsZ0RBQXdEO0FBRWpELE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFVLEVBQUUsRUFBRTtJQUNuRCxJQUFJO1FBQ0YsOEJBQThCO1FBRTlCLE1BQU0sWUFBWSxHQUFHLElBQUksNEJBQWtCLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMscUJBQXFCLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxSixNQUFNLE1BQU0sR0FBRyxNQUFNLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUU1QyxPQUFPO1lBQ0wsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7WUFDNUIsT0FBTyxFQUFFO2dCQUNQLDZCQUE2QixFQUFFLEdBQUc7Z0JBQ2xDLDhCQUE4QixFQUFFLGNBQWM7Z0JBQzlDLDhCQUE4QixFQUFFLHdDQUF3QztnQkFDeEUsTUFBTSxFQUFFLFFBQVE7YUFDakI7U0FDRixDQUFDO0tBQ0g7SUFBQyxPQUFPLENBQU8sRUFBRTtRQUNoQixxREFBcUQ7UUFDckQsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDbkYsZ0NBQWdDO1lBQ2hDLE9BQU87Z0JBQ0wsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPO2dCQUNmLE9BQU8sRUFBRTtvQkFDUCw2QkFBNkIsRUFBRSxHQUFHO29CQUNsQyw4QkFBOEIsRUFBRSxjQUFjO29CQUM5Qyw4QkFBOEIsRUFBRSx3Q0FBd0M7b0JBQ3hFLE1BQU0sRUFBRSxRQUFRO2lCQUNqQjthQUNGLENBQUM7U0FDSDthQUFNO1lBQ0wsOERBQThEO1lBQzlELE9BQU87Z0JBQ0wsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsSUFBSSxFQUFFLGtCQUFrQjtnQkFDeEIsT0FBTyxFQUFFO29CQUNQLDZCQUE2QixFQUFFLEdBQUc7b0JBQ2xDLDhCQUE4QixFQUFFLGNBQWM7b0JBQzlDLDhCQUE4QixFQUFFLHdDQUF3QztvQkFDeEUsTUFBTSxFQUFFLFFBQVE7aUJBQ2pCO2FBQ0YsQ0FBQztTQUNIO0tBQ0Y7QUFDSCxDQUFDLENBQUM7QUE3Q1csUUFBQSxPQUFPLFdBNkNsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWxhbWJkYVwiO1xuaW1wb3J0IHsgR2V0Q3VzdG9tZXJBZGRyZXNzIH0gZnJvbSAnLi4vbW9kdWxlcy9nZXREYXRhJztcblxuZXhwb3J0IGNvbnN0IGhhbmRsZXI6IEhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IGFueSkgPT4ge1xuICB0cnkge1xuICAgIC8vIFZhbGlkYXRlIHByZXNlbmNlIG9mIHVzZXJJZFxuXG4gICAgY29uc3QgbWFuYWdlRGV2aWNlID0gbmV3IEdldEN1c3RvbWVyQWRkcmVzcyhldmVudC5xdWVyeVN0cmluZ1BhcmFtZXRlcnMudXNlcklkLCBldmVudC5xdWVyeVN0cmluZ1BhcmFtZXRlcnMuc3VidXJiLCBldmVudC5xdWVyeVN0cmluZ1BhcmFtZXRlcnMucG9zdGNvZGUpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IG1hbmFnZURldmljZS5nZXREYXRhKCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVzdWx0KSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJywgLy8gb3Igc3BlY2lmaWMgb3JpZ2luKHMpXG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJzogJ09QVElPTlMsIEdFVCcsXG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJzogJ0NvbnRlbnQtVHlwZSwgQXV0aG9yaXphdGlvbiwgWC1BcGktS2V5JyxcbiAgICAgICAgJ1ZhcnknOiAnT3JpZ2luJyxcbiAgICAgIH0sXG4gICAgfTtcbiAgfSBjYXRjaCAoZSA6IGFueSkge1xuICAgIC8vIERpZmZlcmVudGlhdGUgYmV0d2VlbiB2YWxpZGF0aW9uIGFuZCBhY2Nlc3MgZXJyb3JzXG4gICAgaWYgKGUubWVzc2FnZS5pbmNsdWRlcygnTWlzc2luZyBwYXJhbWV0ZXInKSB8fCBlLm1lc3NhZ2UuaW5jbHVkZXMoJ0ludmFsaWQgZm9ybWF0JykpIHtcbiAgICAgIC8vIFZhbGlkYXRpb24gZXJyb3IgLSByZXR1cm4gNDAwXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiA0MDAsXG4gICAgICAgIGJvZHk6IGUubWVzc2FnZSxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsIC8vIG9yIHNwZWNpZmljIG9yaWdpbihzKVxuICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJzogJ09QVElPTlMsIEdFVCcsXG4gICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnOiAnQ29udGVudC1UeXBlLCBBdXRob3JpemF0aW9uLCBYLUFwaS1LZXknLFxuICAgICAgICAgICdWYXJ5JzogJ09yaWdpbicsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBBY2Nlc3MtcmVsYXRlZCBlcnJvciAoZS5nLiwgdW5hdXRob3JpemVkIHVzZXIpIC0gcmV0dXJuIDQwM1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogNDAzLFxuICAgICAgICBib2R5OiAnRm9yYmlkZGVuIGFjY2VzcycsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLCAvLyBvciBzcGVjaWZpYyBvcmlnaW4ocylcbiAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcyc6ICdPUFRJT05TLCBHRVQnLFxuICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJzogJ0NvbnRlbnQtVHlwZSwgQXV0aG9yaXphdGlvbiwgWC1BcGktS2V5JyxcbiAgICAgICAgICAnVmFyeSc6ICdPcmlnaW4nLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9XG4gIH1cbn07XG4iXX0=