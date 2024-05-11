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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVyL2dldEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsZ0RBQXdEO0FBRWpELE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFVLEVBQUUsRUFBRTtJQUNuRCxJQUFJO1FBQ0YsOEJBQThCO1FBQzlCLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQztRQUNqRSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1NBQzlDO1FBRUQsTUFBTSxZQUFZLEdBQUcsSUFBSSw0QkFBa0IsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3RFLE1BQU0sTUFBTSxHQUFHLE1BQU0sWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRTVDLE9BQU87WUFDTCxVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztZQUM1QixPQUFPLEVBQUU7Z0JBQ1AsNkJBQTZCLEVBQUUsR0FBRztnQkFDbEMsOEJBQThCLEVBQUUsY0FBYztnQkFDOUMsOEJBQThCLEVBQUUsd0NBQXdDO2dCQUN4RSxNQUFNLEVBQUUsUUFBUTthQUNqQjtTQUNGLENBQUM7S0FDSDtJQUFDLE9BQU8sQ0FBTSxFQUFFO1FBQ2YscURBQXFEO1FBQ3JELElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQ25GLGdDQUFnQztZQUNoQyxPQUFPO2dCQUNMLFVBQVUsRUFBRSxHQUFHO2dCQUNmLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTztnQkFDZixPQUFPLEVBQUU7b0JBQ1AsNkJBQTZCLEVBQUUsR0FBRztvQkFDbEMsOEJBQThCLEVBQUUsY0FBYztvQkFDOUMsOEJBQThCLEVBQUUsd0NBQXdDO29CQUN4RSxNQUFNLEVBQUUsUUFBUTtpQkFDakI7YUFDRixDQUFDO1NBQ0g7YUFBTTtZQUNMLDhEQUE4RDtZQUM5RCxPQUFPO2dCQUNMLFVBQVUsRUFBRSxHQUFHO2dCQUNmLElBQUksRUFBRSxrQkFBa0I7Z0JBQ3hCLE9BQU8sRUFBRTtvQkFDUCw2QkFBNkIsRUFBRSxHQUFHO29CQUNsQyw4QkFBOEIsRUFBRSxjQUFjO29CQUM5Qyw4QkFBOEIsRUFBRSx3Q0FBd0M7b0JBQ3hFLE1BQU0sRUFBRSxRQUFRO2lCQUNqQjthQUNGLENBQUM7U0FDSDtLQUNGO0FBQ0gsQ0FBQyxDQUFDO0FBakRXLFFBQUEsT0FBTyxXQWlEbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSBcImF3cy1sYW1iZGFcIjtcbmltcG9ydCB7IEdldEN1c3RvbWVyQWRkcmVzcyB9IGZyb20gJy4uL21vZHVsZXMvZ2V0RGF0YSc7XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBIYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBhbnkpID0+IHtcbiAgdHJ5IHtcbiAgICAvLyBWYWxpZGF0ZSBwcmVzZW5jZSBvZiB1c2VySWRcbiAgICBjb25zdCB7IHVzZXJJZCwgc3VidXJiLCBwb3N0Y29kZSB9ID0gZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzO1xuICAgIGlmICghdXNlcklkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIHBhcmFtZXRlcjogdXNlcklkXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IG1hbmFnZURldmljZSA9IG5ldyBHZXRDdXN0b21lckFkZHJlc3ModXNlcklkLCBzdWJ1cmIsIHBvc3Rjb2RlKTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBtYW5hZ2VEZXZpY2UuZ2V0RGF0YSgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlc3VsdCksXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsIC8vIEFsbG93IHJlcXVlc3RzIGZyb20gYW55IG9yaWdpblxuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcyc6ICdPUFRJT05TLCBHRVQnLFxuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycyc6ICdDb250ZW50LVR5cGUsIEF1dGhvcml6YXRpb24sIFgtQXBpLUtleScsXG4gICAgICAgICdWYXJ5JzogJ09yaWdpbicsXG4gICAgICB9LFxuICAgIH07XG4gIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgIC8vIERpZmZlcmVudGlhdGUgYmV0d2VlbiB2YWxpZGF0aW9uIGFuZCBhY2Nlc3MgZXJyb3JzXG4gICAgaWYgKGUubWVzc2FnZS5pbmNsdWRlcygnTWlzc2luZyBwYXJhbWV0ZXInKSB8fCBlLm1lc3NhZ2UuaW5jbHVkZXMoJ0ludmFsaWQgZm9ybWF0JykpIHtcbiAgICAgIC8vIFZhbGlkYXRpb24gZXJyb3IgLSByZXR1cm4gNDAwXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiA0MDAsXG4gICAgICAgIGJvZHk6IGUubWVzc2FnZSxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsIC8vIEFsbG93IHJlcXVlc3RzIGZyb20gYW55IG9yaWdpblxuICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJzogJ09QVElPTlMsIEdFVCcsXG4gICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnOiAnQ29udGVudC1UeXBlLCBBdXRob3JpemF0aW9uLCBYLUFwaS1LZXknLFxuICAgICAgICAgICdWYXJ5JzogJ09yaWdpbicsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBBY2Nlc3MtcmVsYXRlZCBlcnJvciAoZS5nLiwgdW5hdXRob3JpemVkIHVzZXIpIC0gcmV0dXJuIDQwM1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogNDAzLFxuICAgICAgICBib2R5OiAnRm9yYmlkZGVuIGFjY2VzcycsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLCAvLyBBbGxvdyByZXF1ZXN0cyBmcm9tIGFueSBvcmlnaW5cbiAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcyc6ICdPUFRJT05TLCBHRVQnLFxuICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJzogJ0NvbnRlbnQtVHlwZSwgQXV0aG9yaXphdGlvbiwgWC1BcGktS2V5JyxcbiAgICAgICAgICAnVmFyeSc6ICdPcmlnaW4nLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9XG4gIH1cbn07XG4iXX0=