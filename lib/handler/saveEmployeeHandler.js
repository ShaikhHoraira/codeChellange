"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const saveData_1 = require("../modules/saveData");
const handler = async (event) => {
    console.log("We are in saveEmployeeHandler");
    try {
        if (event.httpMethod === "POST") {
            const manageDevice = new saveData_1.SaveCustomerAddress(event);
            const responseData = await manageDevice.saveData();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUVtcGxveWVlSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVyL3NhdmVFbXBsb3llZUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0Esa0RBQTBEO0FBRW5ELE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFVLEVBQUUsRUFBRTtJQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUE7SUFDNUMsSUFBSTtRQUNGLElBQUksS0FBSyxDQUFDLFVBQVUsS0FBSyxNQUFNLEVBQUM7WUFDOUIsTUFBTSxZQUFZLEdBQUcsSUFBSSw4QkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwRCxNQUFNLFlBQVksR0FBRyxNQUFNLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLDRDQUE0QyxFQUFFLFlBQVksQ0FBQyxDQUFBO1NBQ3hFO1FBQ0QseUJBQXlCO1FBQ3pCLE1BQU0sUUFBUSxHQUFHO1lBQ2YsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7U0FDaEMsQ0FBQztRQUNGLE9BQU8sUUFBUSxDQUFDO1FBQ2hCLDJDQUEyQztRQUMzQyxXQUFXO1FBQ1gsdUJBQXVCO1FBQ3ZCLGtCQUFrQjtRQUNsQixJQUFJO0tBQ0w7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLCtCQUErQjtRQUMvQixNQUFNLGFBQWEsR0FBRztZQUNwQixVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtTQUMzRCxDQUFDO1FBQ0YsT0FBTyxhQUFhLENBQUM7S0FDdEI7QUFDSCxDQUFDLENBQUE7QUEzQlksUUFBQSxPQUFPLFdBMkJuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWxhbWJkYVwiO1xuaW1wb3J0IHsgU2F2ZUN1c3RvbWVyQWRkcmVzcyB9IGZyb20gJy4uL21vZHVsZXMvc2F2ZURhdGEnO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudDogYW55KSA9PiB7XG4gIGNvbnNvbGUubG9nKFwiV2UgYXJlIGluIHNhdmVFbXBsb3llZUhhbmRsZXJcIilcbiAgdHJ5IHsgXG4gICAgaWYgKGV2ZW50Lmh0dHBNZXRob2QgPT09IFwiUE9TVFwiKXtcbiAgICAgIGNvbnN0IG1hbmFnZURldmljZSA9IG5ldyBTYXZlQ3VzdG9tZXJBZGRyZXNzKGV2ZW50KTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9IGF3YWl0IG1hbmFnZURldmljZS5zYXZlRGF0YSgpO1xuICAgICAgY29uc29sZS5sb2coXCLwn5qAIH4gY29uc3RoYW5kbGVyOkhhbmRsZXI9IH4gcmVzcG9uc2VEYXRhOlwiLCByZXNwb25zZURhdGEpXG4gICAgfVxuICAgIC8vIENvbnN0cnVjdCB0aGUgcmVzcG9uc2VcbiAgICBjb25zdCByZXNwb25zZSA9IHtcbiAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KCdTdWNjZXNzJylcbiAgICB9O1xuICAgIHJldHVybiByZXNwb25zZTtcbiAgICAvLyBjb25zb2xlLmxvZyhcImxhbWJkYSBjYWxsZWRcIiwgZXZlbnQucGF0aClcbiAgICAvLyByZXR1cm4ge1xuICAgIC8vICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgLy8gICAgIGJvZHk6IGV2ZW50XG4gICAgLy8gfVxuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gQ29uc3RydWN0IHRoZSBlcnJvciByZXNwb25zZVxuICAgIGNvbnN0IGVycm9yUmVzcG9uc2UgPSB7XG4gICAgICBzdGF0dXNDb2RlOiA1MDAsXG4gICAgICBib2R5OiAodHlwZW9mIGUgPT09ICdzdHJpbmcnKSA/IGUgOiAnSW52YWxpZCBSZXF1ZXN0IEJvZHknXG4gICAgfTtcbiAgICByZXR1cm4gZXJyb3JSZXNwb25zZTtcbiAgfVxufVxuIl19