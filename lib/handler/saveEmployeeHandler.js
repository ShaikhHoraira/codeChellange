"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const saveData_1 = require("../modules/saveData");
const handler = async (event) => {
    try {
        if (event.httpMethod === "POST") {
            const manageDevice = new saveData_1.SaveCustomerAddress(event);
            await manageDevice.saveData();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUVtcGxveWVlSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVyL3NhdmVFbXBsb3llZUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0Esa0RBQTBEO0FBRW5ELE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFVLEVBQUUsRUFBRTtJQUNuRCxJQUFJO1FBQ0YsSUFBSSxLQUFLLENBQUMsVUFBVSxLQUFLLE1BQU0sRUFBQztZQUM5QixNQUFNLFlBQVksR0FBRyxJQUFJLDhCQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BELE1BQU0sWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQy9CO1FBQ0QseUJBQXlCO1FBQ3pCLE1BQU0sUUFBUSxHQUFHO1lBQ2YsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7U0FDaEMsQ0FBQztRQUNGLE9BQU8sUUFBUSxDQUFDO1FBQ2hCLDJDQUEyQztRQUMzQyxXQUFXO1FBQ1gsdUJBQXVCO1FBQ3ZCLGtCQUFrQjtRQUNsQixJQUFJO0tBQ0w7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLCtCQUErQjtRQUMvQixNQUFNLGFBQWEsR0FBRztZQUNwQixVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtTQUMzRCxDQUFDO1FBQ0YsT0FBTyxhQUFhLENBQUM7S0FDdEI7QUFDSCxDQUFDLENBQUE7QUF6QlksUUFBQSxPQUFPLFdBeUJuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWxhbWJkYVwiO1xuaW1wb3J0IHsgU2F2ZUN1c3RvbWVyQWRkcmVzcyB9IGZyb20gJy4uL21vZHVsZXMvc2F2ZURhdGEnO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudDogYW55KSA9PiB7XG4gIHRyeSB7IFxuICAgIGlmIChldmVudC5odHRwTWV0aG9kID09PSBcIlBPU1RcIil7XG4gICAgICBjb25zdCBtYW5hZ2VEZXZpY2UgPSBuZXcgU2F2ZUN1c3RvbWVyQWRkcmVzcyhldmVudCk7XG4gICAgICBhd2FpdCBtYW5hZ2VEZXZpY2Uuc2F2ZURhdGEoKTtcbiAgICB9XG4gICAgLy8gQ29uc3RydWN0IHRoZSByZXNwb25zZVxuICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoJ1N1Y2Nlc3MnKVxuICAgIH07XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIC8vIGNvbnNvbGUubG9nKFwibGFtYmRhIGNhbGxlZFwiLCBldmVudC5wYXRoKVxuICAgIC8vIHJldHVybiB7XG4gICAgLy8gICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAvLyAgICAgYm9keTogZXZlbnRcbiAgICAvLyB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBDb25zdHJ1Y3QgdGhlIGVycm9yIHJlc3BvbnNlXG4gICAgY29uc3QgZXJyb3JSZXNwb25zZSA9IHtcbiAgICAgIHN0YXR1c0NvZGU6IDUwMCxcbiAgICAgIGJvZHk6ICh0eXBlb2YgZSA9PT0gJ3N0cmluZycpID8gZSA6ICdJbnZhbGlkIFJlcXVlc3QgQm9keSdcbiAgICB9O1xuICAgIHJldHVybiBlcnJvclJlc3BvbnNlO1xuICB9XG59XG4iXX0=