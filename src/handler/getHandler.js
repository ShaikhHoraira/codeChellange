"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const getData_1 = require("./getData");
const handler = async (event) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdUNBQStDO0FBRXhDLE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFVLEVBQUUsRUFBRTtJQUNuRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUU7WUFDdkUsT0FBTztnQkFDTCxVQUFVLEVBQUUsR0FBRztnQkFDZixJQUFJLEVBQUUsdUNBQXVDO2dCQUM3QyxPQUFPLEVBQUU7b0JBQ1AsNkJBQTZCLEVBQUUsR0FBRztvQkFDbEMsOEJBQThCLEVBQUUsY0FBYztvQkFDOUMsOEJBQThCLEVBQUUsNkJBQTZCO29CQUM3RCxNQUFNLEVBQUUsUUFBUTtpQkFDakI7YUFDRixDQUFDO1NBQ0g7UUFBQSxDQUFDO1FBRUYsTUFBTSxZQUFZLEdBQUcsSUFBSSw0QkFBa0IsQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFKLE1BQU0sTUFBTSxHQUFHLE1BQU0sWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRTVDLE9BQU87WUFDTCxVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztZQUM1QixPQUFPLEVBQUU7Z0JBQ1AsNkJBQTZCLEVBQUUsR0FBRztnQkFDbEMsOEJBQThCLEVBQUUsY0FBYztnQkFDOUMsOEJBQThCLEVBQUUsNkJBQTZCO2dCQUM3RCxNQUFNLEVBQUUsUUFBUTthQUNqQjtTQUNGLENBQUM7S0FDSDtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTztZQUNMLFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsc0JBQXNCO1lBQzFELE9BQU8sRUFBRTtnQkFDUCw2QkFBNkIsRUFBRSxHQUFHO2dCQUNsQyw4QkFBOEIsRUFBRSxjQUFjO2dCQUM5Qyw4QkFBOEIsRUFBRSw2QkFBNkI7Z0JBQzdELE1BQU0sRUFBRSxRQUFRO2FBQ2pCO1NBQ0YsQ0FBQztLQUNIO0FBQ0gsQ0FBQyxDQUFDO0FBeENXLFFBQUEsT0FBTyxXQXdDbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSBcImF3cy1sYW1iZGFcIjtcbmltcG9ydCB7IEdldEN1c3RvbWVyQWRkcmVzcyB9IGZyb20gJy4vZ2V0RGF0YSc7XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBIYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBhbnkpID0+IHtcbiAgdHJ5IHtcbiAgICBpZiAoIWV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycy51c2VySWQgfHwgIWV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogNDAwLFxuICAgICAgICBib2R5OiBcIk1pc3NpbmcgdXNlcklkLCBQbGVhc2UgcHJvdmlkZSB1c2VySWRcIixcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsIC8vIG9yIHNwZWNpZmljIG9yaWdpbihzKVxuICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJzogJ09QVElPTlMsIEdFVCcsIC8vIEluY2x1ZGUgT1BUSU9OUyBmb3IgcHJlZmxpZ2h0IHJlcXVlc3RzXG4gICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnOiAnQ29udGVudC1UeXBlLCBBdXRob3JpemF0aW9uJyxcbiAgICAgICAgICAnVmFyeSc6ICdPcmlnaW4nLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgY29uc3QgbWFuYWdlRGV2aWNlID0gbmV3IEdldEN1c3RvbWVyQWRkcmVzcyhldmVudC5xdWVyeVN0cmluZ1BhcmFtZXRlcnMudXNlcklkLCBldmVudC5xdWVyeVN0cmluZ1BhcmFtZXRlcnMuc3VidXJiLCBldmVudC5xdWVyeVN0cmluZ1BhcmFtZXRlcnMucG9zdGNvZGUpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IG1hbmFnZURldmljZS5nZXREYXRhKCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVzdWx0KSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJywgLy8gb3Igc3BlY2lmaWMgb3JpZ2luKHMpXG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJzogJ09QVElPTlMsIEdFVCcsXG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJzogJ0NvbnRlbnQtVHlwZSwgQXV0aG9yaXphdGlvbicsXG4gICAgICAgICdWYXJ5JzogJ09yaWdpbicsXG4gICAgICB9LFxuICAgIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzQ29kZTogNTAwLFxuICAgICAgYm9keTogKHR5cGVvZiBlID09PSAnc3RyaW5nJykgPyBlIDogJ0ludmFsaWQgUmVxdWVzdCBCb2R5JyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJywgLy8gb3Igc3BlY2lmaWMgb3JpZ2luKHMpXG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJzogJ09QVElPTlMsIEdFVCcsXG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJzogJ0NvbnRlbnQtVHlwZSwgQXV0aG9yaXphdGlvbicsXG4gICAgICAgICdWYXJ5JzogJ09yaWdpbicsXG4gICAgICB9LFxuICAgIH07XG4gIH1cbn07XG4iXX0=