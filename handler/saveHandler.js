"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const saveData_1 = require("./saveData");
const handler = async (event) => {
    try {
        if (event.httpMethod === "POST") {
            const manageDevice = new saveData_1.SaveCustomerAddress(event);
            let reply = await manageDevice.saveData();
            console.log(reply);
        }
        // Construct the response
        const response = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS, POST',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Vary': 'Origin',
            },
            body: JSON.stringify('Success')
        };
        return response;
    }
    catch (e) {
        // Construct the error response
        const errorResponse = {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS, POST',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Vary': 'Origin',
            },
            body: (typeof e === 'string') ? e : 'Invalid Request Body'
        };
        return errorResponse;
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx5Q0FBaUQ7QUFFMUMsTUFBTSxPQUFPLEdBQVksS0FBSyxFQUFFLEtBQVUsRUFBRSxFQUFFO0lBQ25ELElBQUk7UUFDRixJQUFJLEtBQUssQ0FBQyxVQUFVLEtBQUssTUFBTSxFQUFDO1lBQzlCLE1BQU0sWUFBWSxHQUFHLElBQUksOEJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEQsSUFBSSxLQUFLLEdBQUcsTUFBTSxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUNuQjtRQUVELHlCQUF5QjtRQUN6QixNQUFNLFFBQVEsR0FBRztZQUNmLFVBQVUsRUFBRSxHQUFHO1lBQ2YsT0FBTyxFQUFFO2dCQUNQLDZCQUE2QixFQUFFLEdBQUc7Z0JBQ2xDLDhCQUE4QixFQUFFLGVBQWU7Z0JBQy9DLDhCQUE4QixFQUFFLDZCQUE2QjtnQkFDN0QsTUFBTSxFQUFFLFFBQVE7YUFDakI7WUFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7U0FDaEMsQ0FBQztRQUVGLE9BQU8sUUFBUSxDQUFDO0tBQ2pCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDViwrQkFBK0I7UUFDL0IsTUFBTSxhQUFhLEdBQUc7WUFDcEIsVUFBVSxFQUFFLEdBQUc7WUFDZixPQUFPLEVBQUU7Z0JBQ1AsNkJBQTZCLEVBQUUsR0FBRztnQkFDbEMsOEJBQThCLEVBQUUsZUFBZTtnQkFDL0MsOEJBQThCLEVBQUUsNkJBQTZCO2dCQUM3RCxNQUFNLEVBQUUsUUFBUTthQUNqQjtZQUNELElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtTQUMzRCxDQUFDO1FBRUYsT0FBTyxhQUFhLENBQUM7S0FDdEI7QUFDSCxDQUFDLENBQUE7QUFwQ1ksUUFBQSxPQUFPLFdBb0NuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWxhbWJkYVwiO1xuaW1wb3J0IHsgU2F2ZUN1c3RvbWVyQWRkcmVzcyB9IGZyb20gJy4vc2F2ZURhdGEnO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudDogYW55KSA9PiB7XG4gIHRyeSB7IFxuICAgIGlmIChldmVudC5odHRwTWV0aG9kID09PSBcIlBPU1RcIil7XG4gICAgICBjb25zdCBtYW5hZ2VEZXZpY2UgPSBuZXcgU2F2ZUN1c3RvbWVyQWRkcmVzcyhldmVudCk7XG4gICAgICBsZXQgcmVwbHkgPSBhd2FpdCBtYW5hZ2VEZXZpY2Uuc2F2ZURhdGEoKTtcbiAgICAgIGNvbnNvbGUubG9nKHJlcGx5KVxuICAgIH1cblxuICAgIC8vIENvbnN0cnVjdCB0aGUgcmVzcG9uc2VcbiAgICBjb25zdCByZXNwb25zZSA9IHtcbiAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJywgLy8gb3Igc3BlY2lmaWMgb3JpZ2luKHMpXG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJzogJ09QVElPTlMsIFBPU1QnLCAvLyBJbmNsdWRlIE9QVElPTlMgZm9yIHByZWZsaWdodCByZXF1ZXN0c1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycyc6ICdDb250ZW50LVR5cGUsIEF1dGhvcml6YXRpb24nLFxuICAgICAgICAnVmFyeSc6ICdPcmlnaW4nLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KCdTdWNjZXNzJylcbiAgICB9O1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gQ29uc3RydWN0IHRoZSBlcnJvciByZXNwb25zZVxuICAgIGNvbnN0IGVycm9yUmVzcG9uc2UgPSB7XG4gICAgICBzdGF0dXNDb2RlOiA1MDAsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsIC8vIG9yIHNwZWNpZmljIG9yaWdpbihzKVxuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcyc6ICdPUFRJT05TLCBQT1NUJyxcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnOiAnQ29udGVudC1UeXBlLCBBdXRob3JpemF0aW9uJyxcbiAgICAgICAgJ1ZhcnknOiAnT3JpZ2luJyxcbiAgICAgIH0sXG4gICAgICBib2R5OiAodHlwZW9mIGUgPT09ICdzdHJpbmcnKSA/IGUgOiAnSW52YWxpZCBSZXF1ZXN0IEJvZHknXG4gICAgfTtcblxuICAgIHJldHVybiBlcnJvclJlc3BvbnNlO1xuICB9XG59XG4iXX0=