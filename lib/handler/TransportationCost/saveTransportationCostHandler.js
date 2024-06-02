"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const saveTransportationCostData_ts_1 = require("../../modules/TransportationCost/saveTransportationCostData.ts");
const handler = async (event) => {
    console.log(event);
    console.log(" THis is TransportationCostLambda");
    try {
        let responseDB;
        if (event.httpMethod === "POST") {
            const manageDevice = new saveTransportationCostData_ts_1.saveTransportationCostData(event);
            responseDB = await manageDevice.saveData();
        }
        // Construct the response
        const response = {
            statusCode: 200,
            body: JSON.stringify(responseDB)
        };
        return response;
    }
    catch (e) {
        // Construct the error response
        const errorResponse = {
            statusCode: 500,
            body: (typeof e === 'string') ? e : 'Invalid Request Body'
        };
        return errorResponse;
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZVRyYW5zcG9ydGF0aW9uQ29zdEhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaGFuZGxlci9UcmFuc3BvcnRhdGlvbkNvc3Qvc2F2ZVRyYW5zcG9ydGF0aW9uQ29zdEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0Esa0hBQTRHO0FBRXJHLE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFVLEVBQUUsRUFBRTtJQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLENBQUMsQ0FBQTtJQUNoRCxJQUFJO1FBQ0YsSUFBSSxVQUFVLENBQUM7UUFDZixJQUFJLEtBQUssQ0FBQyxVQUFVLEtBQUssTUFBTSxFQUFDO1lBQzlCLE1BQU0sWUFBWSxHQUFHLElBQUksMERBQTBCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0QsVUFBVSxHQUFFLE1BQU0sWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQzNDO1FBQ0QseUJBQXlCO1FBQ3pCLE1BQU0sUUFBUSxHQUFHO1lBQ2YsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7U0FDakMsQ0FBQztRQUNGLE9BQU8sUUFBUSxDQUFDO0tBQ2pCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDViwrQkFBK0I7UUFDL0IsTUFBTSxhQUFhLEdBQUc7WUFDcEIsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxzQkFBc0I7U0FDM0QsQ0FBQztRQUNGLE9BQU8sYUFBYSxDQUFDO0tBQ3RCO0FBQ0gsQ0FBQyxDQUFBO0FBdkJZLFFBQUEsT0FBTyxXQXVCbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSBcImF3cy1sYW1iZGFcIjtcbmltcG9ydCB7IHNhdmVUcmFuc3BvcnRhdGlvbkNvc3REYXRhIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9UcmFuc3BvcnRhdGlvbkNvc3Qvc2F2ZVRyYW5zcG9ydGF0aW9uQ29zdERhdGEudHMnO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudDogYW55KSA9PiB7XG4gIGNvbnNvbGUubG9nKGV2ZW50KVxuICBjb25zb2xlLmxvZyhcIiBUSGlzIGlzIFRyYW5zcG9ydGF0aW9uQ29zdExhbWJkYVwiKVxuICB0cnkgeyBcbiAgICBsZXQgcmVzcG9uc2VEQjtcbiAgICBpZiAoZXZlbnQuaHR0cE1ldGhvZCA9PT0gXCJQT1NUXCIpe1xuICAgICAgY29uc3QgbWFuYWdlRGV2aWNlID0gbmV3IHNhdmVUcmFuc3BvcnRhdGlvbkNvc3REYXRhKGV2ZW50KTtcbiAgICAgIHJlc3BvbnNlREIgPWF3YWl0IG1hbmFnZURldmljZS5zYXZlRGF0YSgpO1xuICAgIH1cbiAgICAvLyBDb25zdHJ1Y3QgdGhlIHJlc3BvbnNlXG4gICAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShyZXNwb25zZURCKVxuICAgIH07XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gQ29uc3RydWN0IHRoZSBlcnJvciByZXNwb25zZVxuICAgIGNvbnN0IGVycm9yUmVzcG9uc2UgPSB7XG4gICAgICBzdGF0dXNDb2RlOiA1MDAsXG4gICAgICBib2R5OiAodHlwZW9mIGUgPT09ICdzdHJpbmcnKSA/IGUgOiAnSW52YWxpZCBSZXF1ZXN0IEJvZHknXG4gICAgfTtcbiAgICByZXR1cm4gZXJyb3JSZXNwb25zZTtcbiAgfVxufVxuIl19