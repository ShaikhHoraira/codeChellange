"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const saveInfrastructureCostData_1 = require("../../modules/InfrastructureCost/saveInfrastructureCostData");
const handler = async (event) => {
    console.log("We are in saveRentId");
    try {
        if (event.httpMethod === "POST") {
            const manageDevice = new saveInfrastructureCostData_1.saveInfrastructureCostData(event);
            const responseData = await manageDevice.saveRentData();
            console.log("🚀 ~ consthandler:Handler= ~ responseData:", responseData);
        }
        // Construct the response
        const response = {
            statusCode: 200,
            body: JSON.stringify('Success')
        };
        return response;
        // console.log("lambda called", event.path)
        // return {
        //     statusCode: 200,
        //     body: event
        // }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZVJlbnRJZEhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaGFuZGxlci9JbmZyYXN0cnVjdHVyZUNvc3Qvc2F2ZVJlbnRJZEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNEdBQXlHO0FBRWxHLE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFVLEVBQUUsRUFBRTtJQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUE7SUFDbkMsSUFBSTtRQUNGLElBQUksS0FBSyxDQUFDLFVBQVUsS0FBSyxNQUFNLEVBQUM7WUFDOUIsTUFBTSxZQUFZLEdBQUcsSUFBSSx1REFBMEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzRCxNQUFNLFlBQVksR0FBRyxNQUFNLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN2RCxPQUFPLENBQUMsR0FBRyxDQUFDLDRDQUE0QyxFQUFFLFlBQVksQ0FBQyxDQUFBO1NBQ3hFO1FBQ0QseUJBQXlCO1FBQ3pCLE1BQU0sUUFBUSxHQUFHO1lBQ2YsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7U0FDaEMsQ0FBQztRQUNGLE9BQU8sUUFBUSxDQUFDO1FBQ2hCLDJDQUEyQztRQUMzQyxXQUFXO1FBQ1gsdUJBQXVCO1FBQ3ZCLGtCQUFrQjtRQUNsQixJQUFJO0tBQ0w7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLCtCQUErQjtRQUMvQixNQUFNLGFBQWEsR0FBRztZQUNwQixVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtTQUMzRCxDQUFDO1FBQ0YsT0FBTyxhQUFhLENBQUM7S0FDdEI7QUFDSCxDQUFDLENBQUE7QUEzQlksUUFBQSxPQUFPLFdBMkJuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWxhbWJkYVwiO1xuaW1wb3J0IHsgc2F2ZUluZnJhc3RydWN0dXJlQ29zdERhdGEgfSBmcm9tICcuLi8uLi9tb2R1bGVzL0luZnJhc3RydWN0dXJlQ29zdC9zYXZlSW5mcmFzdHJ1Y3R1cmVDb3N0RGF0YSc7XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBIYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBhbnkpID0+IHtcbiAgY29uc29sZS5sb2coXCJXZSBhcmUgaW4gc2F2ZVJlbnRJZFwiKVxuICB0cnkgeyBcbiAgICBpZiAoZXZlbnQuaHR0cE1ldGhvZCA9PT0gXCJQT1NUXCIpe1xuICAgICAgY29uc3QgbWFuYWdlRGV2aWNlID0gbmV3IHNhdmVJbmZyYXN0cnVjdHVyZUNvc3REYXRhKGV2ZW50KTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9IGF3YWl0IG1hbmFnZURldmljZS5zYXZlUmVudERhdGEoKTtcbiAgICAgIGNvbnNvbGUubG9nKFwi8J+agCB+IGNvbnN0aGFuZGxlcjpIYW5kbGVyPSB+IHJlc3BvbnNlRGF0YTpcIiwgcmVzcG9uc2VEYXRhKVxuICAgIH1cbiAgICAvLyBDb25zdHJ1Y3QgdGhlIHJlc3BvbnNlXG4gICAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSgnU3VjY2VzcycpXG4gICAgfTtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgLy8gY29uc29sZS5sb2coXCJsYW1iZGEgY2FsbGVkXCIsIGV2ZW50LnBhdGgpXG4gICAgLy8gcmV0dXJuIHtcbiAgICAvLyAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgIC8vICAgICBib2R5OiBldmVudFxuICAgIC8vIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIENvbnN0cnVjdCB0aGUgZXJyb3IgcmVzcG9uc2VcbiAgICBjb25zdCBlcnJvclJlc3BvbnNlID0ge1xuICAgICAgc3RhdHVzQ29kZTogNTAwLFxuICAgICAgYm9keTogKHR5cGVvZiBlID09PSAnc3RyaW5nJykgPyBlIDogJ0ludmFsaWQgUmVxdWVzdCBCb2R5J1xuICAgIH07XG4gICAgcmV0dXJuIGVycm9yUmVzcG9uc2U7XG4gIH1cbn1cbiJdfQ==