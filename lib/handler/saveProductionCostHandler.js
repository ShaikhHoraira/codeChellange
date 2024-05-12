"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// import { SaveCustomerAddress } from '../modules/saveData';
const handler = async (event) => {
    try {
        // if (event.httpMethod === "POST"){
        //   const manageDevice = new SaveCustomerAddress(event);
        //   await manageDevice.saveData();
        // }
        // // Construct the response
        // const response = {
        //   statusCode: 200,
        //   body: JSON.stringify('Success')
        // };
        // return response;
        console.log(event);
        return {
            statusCode: 200,
            body: event
        };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZVByb2R1Y3Rpb25Db3N0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVyL3NhdmVQcm9kdWN0aW9uQ29zdEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNkRBQTZEO0FBRXRELE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFVLEVBQUUsRUFBRTtJQUNuRCxJQUFJO1FBQ0Ysb0NBQW9DO1FBQ3BDLHlEQUF5RDtRQUN6RCxtQ0FBbUM7UUFDbkMsSUFBSTtRQUNKLDRCQUE0QjtRQUM1QixxQkFBcUI7UUFDckIscUJBQXFCO1FBQ3JCLG9DQUFvQztRQUNwQyxLQUFLO1FBQ0wsbUJBQW1CO1FBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDbEIsT0FBTztZQUNILFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLEtBQUs7U0FDZCxDQUFBO0tBQ0Y7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLCtCQUErQjtRQUMvQixNQUFNLGFBQWEsR0FBRztZQUNwQixVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtTQUMzRCxDQUFDO1FBQ0YsT0FBTyxhQUFhLENBQUM7S0FDdEI7QUFDSCxDQUFDLENBQUE7QUF6QlksUUFBQSxPQUFPLFdBeUJuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWxhbWJkYVwiO1xuLy8gaW1wb3J0IHsgU2F2ZUN1c3RvbWVyQWRkcmVzcyB9IGZyb20gJy4uL21vZHVsZXMvc2F2ZURhdGEnO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudDogYW55KSA9PiB7XG4gIHRyeSB7IFxuICAgIC8vIGlmIChldmVudC5odHRwTWV0aG9kID09PSBcIlBPU1RcIil7XG4gICAgLy8gICBjb25zdCBtYW5hZ2VEZXZpY2UgPSBuZXcgU2F2ZUN1c3RvbWVyQWRkcmVzcyhldmVudCk7XG4gICAgLy8gICBhd2FpdCBtYW5hZ2VEZXZpY2Uuc2F2ZURhdGEoKTtcbiAgICAvLyB9XG4gICAgLy8gLy8gQ29uc3RydWN0IHRoZSByZXNwb25zZVxuICAgIC8vIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgIC8vICAgc3RhdHVzQ29kZTogMjAwLFxuICAgIC8vICAgYm9keTogSlNPTi5zdHJpbmdpZnkoJ1N1Y2Nlc3MnKVxuICAgIC8vIH07XG4gICAgLy8gcmV0dXJuIHJlc3BvbnNlO1xuICAgIGNvbnNvbGUubG9nKGV2ZW50KVxuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keTogZXZlbnRcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBDb25zdHJ1Y3QgdGhlIGVycm9yIHJlc3BvbnNlXG4gICAgY29uc3QgZXJyb3JSZXNwb25zZSA9IHtcbiAgICAgIHN0YXR1c0NvZGU6IDUwMCxcbiAgICAgIGJvZHk6ICh0eXBlb2YgZSA9PT0gJ3N0cmluZycpID8gZSA6ICdJbnZhbGlkIFJlcXVlc3QgQm9keSdcbiAgICB9O1xuICAgIHJldHVybiBlcnJvclJlc3BvbnNlO1xuICB9XG59XG4iXX0=