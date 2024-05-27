"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const saveEmployeeData_1 = require("../../modules/OPC/saveEmployeeData");
const handler = async (event) => {
    console.log("We are in saveEmployeeHandler");
    try {
        if (event.httpMethod === "POST") {
            const manageDevice = new saveEmployeeData_1.SaveCustomerAddress(event);
            const responseData = await manageDevice.saveData();
            console.log("🚀 ~ consthandler:Handler= ~ responseData:", responseData);
        }
        // Construct the response
        // const response = {
        //   statusCode: 200,
        //   body: JSON.stringify('Success')
        // };
        console.log("this is console log from save rent id from infracture construct");
        console.log(event);
        const response = {
            statusCode: 200,
            body: JSON.stringify(event)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZVJlbnRJZEhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaGFuZGxlci9JbmZyYXN0cnVjdHVyZUNvc3Qvc2F2ZVJlbnRJZEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EseUVBQXlFO0FBRWxFLE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFVLEVBQUUsRUFBRTtJQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUE7SUFDNUMsSUFBSTtRQUNGLElBQUksS0FBSyxDQUFDLFVBQVUsS0FBSyxNQUFNLEVBQUM7WUFDOUIsTUFBTSxZQUFZLEdBQUcsSUFBSSxzQ0FBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwRCxNQUFNLFlBQVksR0FBRyxNQUFNLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLDRDQUE0QyxFQUFFLFlBQVksQ0FBQyxDQUFBO1NBQ3hFO1FBQ0QseUJBQXlCO1FBQ3pCLHFCQUFxQjtRQUNyQixxQkFBcUI7UUFDckIsb0NBQW9DO1FBQ3BDLEtBQUs7UUFFTCxPQUFPLENBQUMsR0FBRyxDQUFDLGlFQUFpRSxDQUFDLENBQUE7UUFDOUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNsQixNQUFNLFFBQVEsR0FBRztZQUNmLFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1NBQzVCLENBQUE7UUFDRCxPQUFPLFFBQVEsQ0FBQztLQUNqQjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsK0JBQStCO1FBQy9CLE1BQU0sYUFBYSxHQUFHO1lBQ3BCLFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsc0JBQXNCO1NBQzNELENBQUM7UUFDRixPQUFPLGFBQWEsQ0FBQztLQUN0QjtBQUNILENBQUMsQ0FBQTtBQTdCWSxRQUFBLE9BQU8sV0E2Qm5CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gXCJhd3MtbGFtYmRhXCI7XG5pbXBvcnQgeyBTYXZlQ3VzdG9tZXJBZGRyZXNzIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9PUEMvc2F2ZUVtcGxveWVlRGF0YSc7XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBIYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBhbnkpID0+IHtcbiAgY29uc29sZS5sb2coXCJXZSBhcmUgaW4gc2F2ZUVtcGxveWVlSGFuZGxlclwiKVxuICB0cnkgeyBcbiAgICBpZiAoZXZlbnQuaHR0cE1ldGhvZCA9PT0gXCJQT1NUXCIpe1xuICAgICAgY29uc3QgbWFuYWdlRGV2aWNlID0gbmV3IFNhdmVDdXN0b21lckFkZHJlc3MoZXZlbnQpO1xuICAgICAgY29uc3QgcmVzcG9uc2VEYXRhID0gYXdhaXQgbWFuYWdlRGV2aWNlLnNhdmVEYXRhKCk7XG4gICAgICBjb25zb2xlLmxvZyhcIvCfmoAgfiBjb25zdGhhbmRsZXI6SGFuZGxlcj0gfiByZXNwb25zZURhdGE6XCIsIHJlc3BvbnNlRGF0YSlcbiAgICB9XG4gICAgLy8gQ29uc3RydWN0IHRoZSByZXNwb25zZVxuICAgIC8vIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgIC8vICAgc3RhdHVzQ29kZTogMjAwLFxuICAgIC8vICAgYm9keTogSlNPTi5zdHJpbmdpZnkoJ1N1Y2Nlc3MnKVxuICAgIC8vIH07XG5cbiAgICBjb25zb2xlLmxvZyhcInRoaXMgaXMgY29uc29sZSBsb2cgZnJvbSBzYXZlIHJlbnQgaWQgZnJvbSBpbmZyYWN0dXJlIGNvbnN0cnVjdFwiKVxuICAgIGNvbnNvbGUubG9nKGV2ZW50KVxuICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZXZlbnQpXG4gICAgfVxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIENvbnN0cnVjdCB0aGUgZXJyb3IgcmVzcG9uc2VcbiAgICBjb25zdCBlcnJvclJlc3BvbnNlID0ge1xuICAgICAgc3RhdHVzQ29kZTogNTAwLFxuICAgICAgYm9keTogKHR5cGVvZiBlID09PSAnc3RyaW5nJykgPyBlIDogJ0ludmFsaWQgUmVxdWVzdCBCb2R5J1xuICAgIH07XG4gICAgcmV0dXJuIGVycm9yUmVzcG9uc2U7XG4gIH1cbn1cbiJdfQ==