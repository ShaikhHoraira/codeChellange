"use strict";
// import { Handler } from "aws-lambda";
// import { SaveCustomerAddress } from '../modules/saveData';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGFuZGxlci9zYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsd0NBQXdDO0FBQ3hDLDZEQUE2RDs7O0FBd0M3RCwyREFBMkQ7QUFFcEQsTUFBTSxPQUFPLEdBQVksS0FBSyxFQUFFLE1BQVcsRUFBRSxFQUFFO0lBQ3BELFFBQVE7SUFDUixtQ0FBbUM7SUFFbkMsK0pBQStKO0lBQy9KLGlEQUFpRDtJQUVqRCxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG9DQUFvQztJQUNwQyxpQkFBaUI7SUFDakIsdUVBQXVFO0lBQ3ZFLHdEQUF3RDtJQUN4RCxrRkFBa0Y7SUFDbEYsMEJBQTBCO0lBQzFCLFNBQVM7SUFDVCxPQUFPO0lBQ1Asc0JBQXNCO0lBQ3RCLDBEQUEwRDtJQUMxRCwyRkFBMkY7SUFDM0YsdUNBQXVDO0lBQ3ZDLGVBQWU7SUFDZix5QkFBeUI7SUFDekIseUJBQXlCO0lBQ3pCLG1CQUFtQjtJQUNuQix5RUFBeUU7SUFDekUsMERBQTBEO0lBQzFELG9GQUFvRjtJQUNwRiw0QkFBNEI7SUFDNUIsV0FBVztJQUNYLFNBQVM7SUFDVCxhQUFhO0lBQ2IscUVBQXFFO0lBQ3JFLGVBQWU7SUFDZix5QkFBeUI7SUFDekIsa0NBQWtDO0lBQ2xDLG1CQUFtQjtJQUNuQix5RUFBeUU7SUFDekUsMERBQTBEO0lBQzFELG9GQUFvRjtJQUNwRiw0QkFBNEI7SUFDNUIsV0FBVztJQUNYLFNBQVM7SUFDVCxNQUFNO0lBQ04sSUFBSTtJQUVKLE1BQU0sUUFBUSxHQUFHO1FBQ2YsVUFBVSxFQUFFLEdBQUc7UUFDZixPQUFPLEVBQUU7WUFDTCw4QkFBOEIsRUFBRyxjQUFjO1lBQy9DLDZCQUE2QixFQUFFLEdBQUc7WUFDbEMsOEJBQThCLEVBQUUsa0JBQWtCO1NBQ3JEO1FBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUM7S0FDN0MsQ0FBQztJQUNGLE9BQU8sUUFBUSxDQUFDO0FBQ2hCLENBQUMsQ0FBQztBQXhEVyxRQUFBLE9BQU8sV0F3RGxCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gXCJhd3MtbGFtYmRhXCI7XG4vLyBpbXBvcnQgeyBTYXZlQ3VzdG9tZXJBZGRyZXNzIH0gZnJvbSAnLi4vbW9kdWxlcy9zYXZlRGF0YSc7XG5cbi8vIGV4cG9ydCBjb25zdCBoYW5kbGVyOiBIYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBhbnkpID0+IHtcbi8vICAgdHJ5IHsgXG4vLyAgICAgaWYgKGV2ZW50Lmh0dHBNZXRob2QgPT09IFwiUE9TVFwiKXtcbi8vICAgICAgIGNvbnN0IG1hbmFnZURldmljZSA9IG5ldyBTYXZlQ3VzdG9tZXJBZGRyZXNzKGV2ZW50KTtcbi8vICAgICAgIGF3YWl0IG1hbmFnZURldmljZS5zYXZlRGF0YSgpO1xuLy8gICAgIH1cblxuLy8gICAgIC8vIENvbnN0cnVjdCB0aGUgcmVzcG9uc2Vcbi8vICAgICBjb25zdCByZXNwb25zZSA9IHtcbi8vICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbi8vICAgICAgIGhlYWRlcnM6IHtcbi8vICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsIC8vIG9yIHNwZWNpZmljIG9yaWdpbihzKVxuLy8gICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcyc6ICdPUFRJT05TLCBQT1NUJywgLy8gSW5jbHVkZSBPUFRJT05TIGZvciBwcmVmbGlnaHQgcmVxdWVzdHNcbi8vICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnOiAnQ29udGVudC1UeXBlLCBBdXRob3JpemF0aW9uLCBYLUFwaS1LZXknLFxuLy8gICAgICAgICAnVmFyeSc6ICdPcmlnaW4nLFxuLy8gICAgICAgfSxcbi8vICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KCdTdWNjZXNzJylcbi8vICAgICB9O1xuXG4vLyAgICAgcmV0dXJuIHJlc3BvbnNlO1xuLy8gICB9IGNhdGNoIChlKSB7XG4vLyAgICAgLy8gQ29uc3RydWN0IHRoZSBlcnJvciByZXNwb25zZVxuLy8gICAgIGNvbnN0IGVycm9yUmVzcG9uc2UgPSB7XG4vLyAgICAgICBzdGF0dXNDb2RlOiA1MDAsXG4vLyAgICAgICBoZWFkZXJzOiB7XG4vLyAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLCAvLyBvciBzcGVjaWZpYyBvcmlnaW4ocylcbi8vICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnOiAnT1BUSU9OUywgUE9TVCcsXG4vLyAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJzogJ0NvbnRlbnQtVHlwZSwgQXV0aG9yaXphdGlvbiwgWC1BcGktS2V5Jyxcbi8vICAgICAgICAgJ1ZhcnknOiAnT3JpZ2luJyxcbi8vICAgICAgIH0sXG4vLyAgICAgICBib2R5OiAodHlwZW9mIGUgPT09ICdzdHJpbmcnKSA/IGUgOiAnSW52YWxpZCBSZXF1ZXN0IEJvZHknXG4vLyAgICAgfTtcblxuLy8gICAgIHJldHVybiBlcnJvclJlc3BvbnNlO1xuLy8gICB9XG4vLyB9XG5cbmltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWxhbWJkYVwiO1xuLy8gaW1wb3J0IHsgR2V0Q3VzdG9tZXJBZGRyZXNzIH0gZnJvbSAnLi4vbW9kdWxlcy9nZXREYXRhJztcblxuZXhwb3J0IGNvbnN0IGhhbmRsZXI6IEhhbmRsZXIgPSBhc3luYyAoX2V2ZW50OiBhbnkpID0+IHtcbiAgLy8gdHJ5IHtcbiAgLy8gICAvLyBWYWxpZGF0ZSBwcmVzZW5jZSBvZiB1c2VySWRcblxuICAvLyAgIGNvbnN0IG1hbmFnZURldmljZSA9IG5ldyBHZXRDdXN0b21lckFkZHJlc3MoZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzLnVzZXJJZCwgZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzLnN1YnVyYiwgZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzLnBvc3Rjb2RlKTtcbiAgLy8gICBjb25zdCByZXN1bHQgPSBhd2FpdCBtYW5hZ2VEZXZpY2UuZ2V0RGF0YSgpO1xuXG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgLy8gICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlc3VsdCksXG4gIC8vICAgICBoZWFkZXJzOiB7XG4gIC8vICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLCAvLyBvciBzcGVjaWZpYyBvcmlnaW4ocylcbiAgLy8gICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnOiAnT1BUSU9OUywgR0VUJyxcbiAgLy8gICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnOiAnQ29udGVudC1UeXBlLCBBdXRob3JpemF0aW9uLCBYLUFwaS1LZXknLFxuICAvLyAgICAgICAnVmFyeSc6ICdPcmlnaW4nLFxuICAvLyAgICAgfSxcbiAgLy8gICB9O1xuICAvLyB9IGNhdGNoIChlIDogYW55KSB7XG4gIC8vICAgLy8gRGlmZmVyZW50aWF0ZSBiZXR3ZWVuIHZhbGlkYXRpb24gYW5kIGFjY2VzcyBlcnJvcnNcbiAgLy8gICBpZiAoZS5tZXNzYWdlLmluY2x1ZGVzKCdNaXNzaW5nIHBhcmFtZXRlcicpIHx8IGUubWVzc2FnZS5pbmNsdWRlcygnSW52YWxpZCBmb3JtYXQnKSkge1xuICAvLyAgICAgLy8gVmFsaWRhdGlvbiBlcnJvciAtIHJldHVybiA0MDBcbiAgLy8gICAgIHJldHVybiB7XG4gIC8vICAgICAgIHN0YXR1c0NvZGU6IDQwMCxcbiAgLy8gICAgICAgYm9keTogZS5tZXNzYWdlLFxuICAvLyAgICAgICBoZWFkZXJzOiB7XG4gIC8vICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsIC8vIG9yIHNwZWNpZmljIG9yaWdpbihzKVxuICAvLyAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJzogJ09QVElPTlMsIEdFVCcsXG4gIC8vICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnOiAnQ29udGVudC1UeXBlLCBBdXRob3JpemF0aW9uLCBYLUFwaS1LZXknLFxuICAvLyAgICAgICAgICdWYXJ5JzogJ09yaWdpbicsXG4gIC8vICAgICAgIH0sXG4gIC8vICAgICB9O1xuICAvLyAgIH0gZWxzZSB7XG4gIC8vICAgICAvLyBBY2Nlc3MtcmVsYXRlZCBlcnJvciAoZS5nLiwgdW5hdXRob3JpemVkIHVzZXIpIC0gcmV0dXJuIDQwM1xuICAvLyAgICAgcmV0dXJuIHtcbiAgLy8gICAgICAgc3RhdHVzQ29kZTogNDAzLFxuICAvLyAgICAgICBib2R5OiAnRm9yYmlkZGVuIGFjY2VzcycsXG4gIC8vICAgICAgIGhlYWRlcnM6IHtcbiAgLy8gICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIiwgLy8gb3Igc3BlY2lmaWMgb3JpZ2luKHMpXG4gIC8vICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnOiAnT1BUSU9OUywgR0VUJyxcbiAgLy8gICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycyc6ICdDb250ZW50LVR5cGUsIEF1dGhvcml6YXRpb24sIFgtQXBpLUtleScsXG4gIC8vICAgICAgICAgJ1ZhcnknOiAnT3JpZ2luJyxcbiAgLy8gICAgICAgfSxcbiAgLy8gICAgIH07XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzQ29kZTogMjAwLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzXCIgOiBcIkNvbnRlbnQtVHlwZVwiLFxuICAgICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiOiBcIipcIixcbiAgICAgICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzXCI6IFwiT1BUSU9OUyxQT1NULEdFVFwiXG4gICAgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSgnSGVsbG8gZnJvbSBMYW1iZGEhJyksXG59O1xucmV0dXJuIHJlc3BvbnNlO1xufTtcbiJdfQ==