"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// import { GetCustomerAddress } from '../modules/getData';
const handler = async (_event) => {
    // try {
    //   // Validate presence of userId
    //   const manageDevice = new GetCustomerAddress(event.queryStringParameters.userId, event.queryStringParameters.suburb, event.queryStringParameters.postcode);
    //   const result = await manageDevice.getData();
    //   return {
    //     statusCode: 200,
    //     body: JSON.stringify(result),
    //     headers: {
    //       'Access-Control-Allow-Origin': "'*'", // or specific origin(s)
    //       'Access-Control-Allow-Methods': 'OPTIONS, GET',
    //       'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Api-Key',
    //       'Vary': 'Origin',
    //     },
    //   };
    // } catch (e : any) {
    //   // Differentiate between validation and access errors
    //   if (e.message.includes('Missing parameter') || e.message.includes('Invalid format')) {
    //     // Validation error - return 400
    //     return {
    //       statusCode: 400,
    //       body: e.message,
    //       headers: {
    //         'Access-Control-Allow-Origin': "'*'", // or specific origin(s)
    //         'Access-Control-Allow-Methods': 'OPTIONS, GET',
    //         'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Api-Key',
    //         'Vary': 'Origin',
    //       },
    //     };
    //   } else {
    //     // Access-related error (e.g., unauthorized user) - return 403
    //     return {
    //       statusCode: 403,
    //       body: 'Forbidden access',
    //       headers: {
    //         'Access-Control-Allow-Origin': "'*'", // or specific origin(s)
    //         'Access-Control-Allow-Methods': 'OPTIONS, GET',
    //         'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Api-Key',
    //         'Vary': 'Origin',
    //       },
    //     };
    //   }
    // }
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVyL2dldEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsMkRBQTJEO0FBRXBELE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxNQUFXLEVBQUUsRUFBRTtJQUNwRCxRQUFRO0lBQ1IsbUNBQW1DO0lBRW5DLCtKQUErSjtJQUMvSixpREFBaUQ7SUFFakQsYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixvQ0FBb0M7SUFDcEMsaUJBQWlCO0lBQ2pCLHVFQUF1RTtJQUN2RSx3REFBd0Q7SUFDeEQsa0ZBQWtGO0lBQ2xGLDBCQUEwQjtJQUMxQixTQUFTO0lBQ1QsT0FBTztJQUNQLHNCQUFzQjtJQUN0QiwwREFBMEQ7SUFDMUQsMkZBQTJGO0lBQzNGLHVDQUF1QztJQUN2QyxlQUFlO0lBQ2YseUJBQXlCO0lBQ3pCLHlCQUF5QjtJQUN6QixtQkFBbUI7SUFDbkIseUVBQXlFO0lBQ3pFLDBEQUEwRDtJQUMxRCxvRkFBb0Y7SUFDcEYsNEJBQTRCO0lBQzVCLFdBQVc7SUFDWCxTQUFTO0lBQ1QsYUFBYTtJQUNiLHFFQUFxRTtJQUNyRSxlQUFlO0lBQ2YseUJBQXlCO0lBQ3pCLGtDQUFrQztJQUNsQyxtQkFBbUI7SUFDbkIseUVBQXlFO0lBQ3pFLDBEQUEwRDtJQUMxRCxvRkFBb0Y7SUFDcEYsNEJBQTRCO0lBQzVCLFdBQVc7SUFDWCxTQUFTO0lBQ1QsTUFBTTtJQUNOLElBQUk7SUFFSixNQUFNLFFBQVEsR0FBRztRQUNmLFVBQVUsRUFBRSxHQUFHO1FBQ2YsT0FBTyxFQUFFO1lBQ0wsOEJBQThCLEVBQUcsY0FBYztZQUMvQyw2QkFBNkIsRUFBRSxHQUFHO1lBQ2xDLDhCQUE4QixFQUFFLGtCQUFrQjtTQUNyRDtRQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDO0tBQzdDLENBQUM7SUFDRixPQUFPLFFBQVEsQ0FBQztBQUNoQixDQUFDLENBQUM7QUF4RFcsUUFBQSxPQUFPLFdBd0RsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWxhbWJkYVwiO1xuLy8gaW1wb3J0IHsgR2V0Q3VzdG9tZXJBZGRyZXNzIH0gZnJvbSAnLi4vbW9kdWxlcy9nZXREYXRhJztcblxuZXhwb3J0IGNvbnN0IGhhbmRsZXI6IEhhbmRsZXIgPSBhc3luYyAoX2V2ZW50OiBhbnkpID0+IHtcbiAgLy8gdHJ5IHtcbiAgLy8gICAvLyBWYWxpZGF0ZSBwcmVzZW5jZSBvZiB1c2VySWRcblxuICAvLyAgIGNvbnN0IG1hbmFnZURldmljZSA9IG5ldyBHZXRDdXN0b21lckFkZHJlc3MoZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzLnVzZXJJZCwgZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzLnN1YnVyYiwgZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzLnBvc3Rjb2RlKTtcbiAgLy8gICBjb25zdCByZXN1bHQgPSBhd2FpdCBtYW5hZ2VEZXZpY2UuZ2V0RGF0YSgpO1xuXG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgLy8gICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlc3VsdCksXG4gIC8vICAgICBoZWFkZXJzOiB7XG4gIC8vICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLCAvLyBvciBzcGVjaWZpYyBvcmlnaW4ocylcbiAgLy8gICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnOiAnT1BUSU9OUywgR0VUJyxcbiAgLy8gICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnOiAnQ29udGVudC1UeXBlLCBBdXRob3JpemF0aW9uLCBYLUFwaS1LZXknLFxuICAvLyAgICAgICAnVmFyeSc6ICdPcmlnaW4nLFxuICAvLyAgICAgfSxcbiAgLy8gICB9O1xuICAvLyB9IGNhdGNoIChlIDogYW55KSB7XG4gIC8vICAgLy8gRGlmZmVyZW50aWF0ZSBiZXR3ZWVuIHZhbGlkYXRpb24gYW5kIGFjY2VzcyBlcnJvcnNcbiAgLy8gICBpZiAoZS5tZXNzYWdlLmluY2x1ZGVzKCdNaXNzaW5nIHBhcmFtZXRlcicpIHx8IGUubWVzc2FnZS5pbmNsdWRlcygnSW52YWxpZCBmb3JtYXQnKSkge1xuICAvLyAgICAgLy8gVmFsaWRhdGlvbiBlcnJvciAtIHJldHVybiA0MDBcbiAgLy8gICAgIHJldHVybiB7XG4gIC8vICAgICAgIHN0YXR1c0NvZGU6IDQwMCxcbiAgLy8gICAgICAgYm9keTogZS5tZXNzYWdlLFxuICAvLyAgICAgICBoZWFkZXJzOiB7XG4gIC8vICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsIC8vIG9yIHNwZWNpZmljIG9yaWdpbihzKVxuICAvLyAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJzogJ09QVElPTlMsIEdFVCcsXG4gIC8vICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnOiAnQ29udGVudC1UeXBlLCBBdXRob3JpemF0aW9uLCBYLUFwaS1LZXknLFxuICAvLyAgICAgICAgICdWYXJ5JzogJ09yaWdpbicsXG4gIC8vICAgICAgIH0sXG4gIC8vICAgICB9O1xuICAvLyAgIH0gZWxzZSB7XG4gIC8vICAgICAvLyBBY2Nlc3MtcmVsYXRlZCBlcnJvciAoZS5nLiwgdW5hdXRob3JpemVkIHVzZXIpIC0gcmV0dXJuIDQwM1xuICAvLyAgICAgcmV0dXJuIHtcbiAgLy8gICAgICAgc3RhdHVzQ29kZTogNDAzLFxuICAvLyAgICAgICBib2R5OiAnRm9yYmlkZGVuIGFjY2VzcycsXG4gIC8vICAgICAgIGhlYWRlcnM6IHtcbiAgLy8gICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIiwgLy8gb3Igc3BlY2lmaWMgb3JpZ2luKHMpXG4gIC8vICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnOiAnT1BUSU9OUywgR0VUJyxcbiAgLy8gICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycyc6ICdDb250ZW50LVR5cGUsIEF1dGhvcml6YXRpb24sIFgtQXBpLUtleScsXG4gIC8vICAgICAgICAgJ1ZhcnknOiAnT3JpZ2luJyxcbiAgLy8gICAgICAgfSxcbiAgLy8gICAgIH07XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzQ29kZTogMjAwLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzXCIgOiBcIkNvbnRlbnQtVHlwZVwiLFxuICAgICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiOiBcIipcIixcbiAgICAgICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzXCI6IFwiT1BUSU9OUyxQT1NULEdFVFwiXG4gICAgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSgnSGVsbG8gZnJvbSBMYW1iZGEhJyksXG59O1xucmV0dXJuIHJlc3BvbnNlO1xufTtcbiJdfQ==