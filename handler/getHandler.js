"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const getData_1 = require("./getData");
const handler = async (event) => {
    console.log("received UserId:", event);
    try {
        if (!event.queryStringParameters.userId || !event.queryStringParameters) {
            return {
                statusCode: 400,
                body: "Missing userId, Please provide userId",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS, GET',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                    'Vary': 'Origin',
                },
            };
        }
        ;
        const manageDevice = new getData_1.GetCustomerAddress(event.queryStringParameters.userId, event.queryStringParameters.suburb, event.queryStringParameters.postcode);
        const result = await manageDevice.getData();
        return {
            statusCode: 200,
            body: JSON.stringify(result),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS, GET',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Vary': 'Origin',
            },
        };
    }
    catch (e) {
        return {
            statusCode: 500,
            body: (typeof e === 'string') ? e : 'Invalid Request Body',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS, GET',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Vary': 'Origin',
            },
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdUNBQStDO0FBRXhDLE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFVLEVBQUUsRUFBRTtJQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ3RDLElBQUk7UUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsRUFBRTtZQUN2RSxPQUFPO2dCQUNMLFVBQVUsRUFBRSxHQUFHO2dCQUNmLElBQUksRUFBRSx1Q0FBdUM7Z0JBQzdDLE9BQU8sRUFBRTtvQkFDUCw2QkFBNkIsRUFBRSxHQUFHO29CQUNsQyw4QkFBOEIsRUFBRSxjQUFjO29CQUM5Qyw4QkFBOEIsRUFBRSw2QkFBNkI7b0JBQzdELE1BQU0sRUFBRSxRQUFRO2lCQUNqQjthQUNGLENBQUM7U0FDSDtRQUFBLENBQUM7UUFFRixNQUFNLFlBQVksR0FBRyxJQUFJLDRCQUFrQixDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUosTUFBTSxNQUFNLEdBQUcsTUFBTSxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFNUMsT0FBTztZQUNMLFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO1lBQzVCLE9BQU8sRUFBRTtnQkFDUCw2QkFBNkIsRUFBRSxHQUFHO2dCQUNsQyw4QkFBOEIsRUFBRSxjQUFjO2dCQUM5Qyw4QkFBOEIsRUFBRSw2QkFBNkI7Z0JBQzdELE1BQU0sRUFBRSxRQUFRO2FBQ2pCO1NBQ0YsQ0FBQztLQUNIO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPO1lBQ0wsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxzQkFBc0I7WUFDMUQsT0FBTyxFQUFFO2dCQUNQLDZCQUE2QixFQUFFLEdBQUc7Z0JBQ2xDLDhCQUE4QixFQUFFLGNBQWM7Z0JBQzlDLDhCQUE4QixFQUFFLDZCQUE2QjtnQkFDN0QsTUFBTSxFQUFFLFFBQVE7YUFDakI7U0FDRixDQUFDO0tBQ0g7QUFDSCxDQUFDLENBQUM7QUF6Q1csUUFBQSxPQUFPLFdBeUNsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWxhbWJkYVwiO1xuaW1wb3J0IHsgR2V0Q3VzdG9tZXJBZGRyZXNzIH0gZnJvbSAnLi9nZXREYXRhJztcblxuZXhwb3J0IGNvbnN0IGhhbmRsZXI6IEhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IGFueSkgPT4ge1xuICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIFVzZXJJZDpcIiwgZXZlbnQpXG4gIHRyeSB7XG4gICAgaWYgKCFldmVudC5xdWVyeVN0cmluZ1BhcmFtZXRlcnMudXNlcklkIHx8ICFldmVudC5xdWVyeVN0cmluZ1BhcmFtZXRlcnMpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDQwMCxcbiAgICAgICAgYm9keTogXCJNaXNzaW5nIHVzZXJJZCwgUGxlYXNlIHByb3ZpZGUgdXNlcklkXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLCAvLyBvciBzcGVjaWZpYyBvcmlnaW4ocylcbiAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcyc6ICdPUFRJT05TLCBHRVQnLCAvLyBJbmNsdWRlIE9QVElPTlMgZm9yIHByZWZsaWdodCByZXF1ZXN0c1xuICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJzogJ0NvbnRlbnQtVHlwZSwgQXV0aG9yaXphdGlvbicsXG4gICAgICAgICAgJ1ZhcnknOiAnT3JpZ2luJyxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGNvbnN0IG1hbmFnZURldmljZSA9IG5ldyBHZXRDdXN0b21lckFkZHJlc3MoZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzLnVzZXJJZCwgZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzLnN1YnVyYiwgZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzLnBvc3Rjb2RlKTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBtYW5hZ2VEZXZpY2UuZ2V0RGF0YSgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlc3VsdCksXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsIC8vIG9yIHNwZWNpZmljIG9yaWdpbihzKVxuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcyc6ICdPUFRJT05TLCBHRVQnLFxuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycyc6ICdDb250ZW50LVR5cGUsIEF1dGhvcml6YXRpb24nLFxuICAgICAgICAnVmFyeSc6ICdPcmlnaW4nLFxuICAgICAgfSxcbiAgICB9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1c0NvZGU6IDUwMCxcbiAgICAgIGJvZHk6ICh0eXBlb2YgZSA9PT0gJ3N0cmluZycpID8gZSA6ICdJbnZhbGlkIFJlcXVlc3QgQm9keScsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsIC8vIG9yIHNwZWNpZmljIG9yaWdpbihzKVxuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcyc6ICdPUFRJT05TLCBHRVQnLFxuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycyc6ICdDb250ZW50LVR5cGUsIEF1dGhvcml6YXRpb24nLFxuICAgICAgICAnVmFyeSc6ICdPcmlnaW4nLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG59O1xuIl19