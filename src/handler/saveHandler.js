"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const saveData_1 = require("./saveData");
const handler = async (event) => {
    try {
        if (event.httpMethod === "POST") {
            const manageDevice = new saveData_1.SaveCustomerAddress(event);
            await manageDevice.saveData();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx5Q0FBaUQ7QUFFMUMsTUFBTSxPQUFPLEdBQVksS0FBSyxFQUFFLEtBQVUsRUFBRSxFQUFFO0lBQ25ELElBQUk7UUFDRixJQUFJLEtBQUssQ0FBQyxVQUFVLEtBQUssTUFBTSxFQUFDO1lBQzlCLE1BQU0sWUFBWSxHQUFHLElBQUksOEJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEQsTUFBTSxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDL0I7UUFHRCx5QkFBeUI7UUFDekIsTUFBTSxRQUFRLEdBQUc7WUFDZixVQUFVLEVBQUUsR0FBRztZQUNmLE9BQU8sRUFBRTtnQkFDUCw2QkFBNkIsRUFBRSxHQUFHO2dCQUNsQyw4QkFBOEIsRUFBRSxlQUFlO2dCQUMvQyw4QkFBOEIsRUFBRSw2QkFBNkI7Z0JBQzdELE1BQU0sRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1NBQ2hDLENBQUM7UUFFRixPQUFPLFFBQVEsQ0FBQztLQUNqQjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsK0JBQStCO1FBQy9CLE1BQU0sYUFBYSxHQUFHO1lBQ3BCLFVBQVUsRUFBRSxHQUFHO1lBQ2YsT0FBTyxFQUFFO2dCQUNQLDZCQUE2QixFQUFFLEdBQUc7Z0JBQ2xDLDhCQUE4QixFQUFFLGVBQWU7Z0JBQy9DLDhCQUE4QixFQUFFLDZCQUE2QjtnQkFDN0QsTUFBTSxFQUFFLFFBQVE7YUFDakI7WUFDRCxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxzQkFBc0I7U0FDM0QsQ0FBQztRQUVGLE9BQU8sYUFBYSxDQUFDO0tBQ3RCO0FBQ0gsQ0FBQyxDQUFBO0FBcENZLFFBQUEsT0FBTyxXQW9DbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSBcImF3cy1sYW1iZGFcIjtcbmltcG9ydCB7IFNhdmVDdXN0b21lckFkZHJlc3MgfSBmcm9tICcuL3NhdmVEYXRhJztcblxuZXhwb3J0IGNvbnN0IGhhbmRsZXI6IEhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IGFueSkgPT4ge1xuICB0cnkgeyBcbiAgICBpZiAoZXZlbnQuaHR0cE1ldGhvZCA9PT0gXCJQT1NUXCIpe1xuICAgICAgY29uc3QgbWFuYWdlRGV2aWNlID0gbmV3IFNhdmVDdXN0b21lckFkZHJlc3MoZXZlbnQpO1xuICAgICAgYXdhaXQgbWFuYWdlRGV2aWNlLnNhdmVEYXRhKCk7XG4gICAgfVxuICAgIFxuXG4gICAgLy8gQ29uc3RydWN0IHRoZSByZXNwb25zZVxuICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLCAvLyBvciBzcGVjaWZpYyBvcmlnaW4ocylcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnOiAnT1BUSU9OUywgUE9TVCcsIC8vIEluY2x1ZGUgT1BUSU9OUyBmb3IgcHJlZmxpZ2h0IHJlcXVlc3RzXG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJzogJ0NvbnRlbnQtVHlwZSwgQXV0aG9yaXphdGlvbicsXG4gICAgICAgICdWYXJ5JzogJ09yaWdpbicsXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoJ1N1Y2Nlc3MnKVxuICAgIH07XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBDb25zdHJ1Y3QgdGhlIGVycm9yIHJlc3BvbnNlXG4gICAgY29uc3QgZXJyb3JSZXNwb25zZSA9IHtcbiAgICAgIHN0YXR1c0NvZGU6IDUwMCxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJywgLy8gb3Igc3BlY2lmaWMgb3JpZ2luKHMpXG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJzogJ09QVElPTlMsIFBPU1QnLFxuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycyc6ICdDb250ZW50LVR5cGUsIEF1dGhvcml6YXRpb24nLFxuICAgICAgICAnVmFyeSc6ICdPcmlnaW4nLFxuICAgICAgfSxcbiAgICAgIGJvZHk6ICh0eXBlb2YgZSA9PT0gJ3N0cmluZycpID8gZSA6ICdJbnZhbGlkIFJlcXVlc3QgQm9keSdcbiAgICB9O1xuXG4gICAgcmV0dXJuIGVycm9yUmVzcG9uc2U7XG4gIH1cbn1cbiJdfQ==