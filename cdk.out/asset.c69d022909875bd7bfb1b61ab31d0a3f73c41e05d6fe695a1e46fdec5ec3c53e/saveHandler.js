"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const saveData_1 = require("./saveData");
// const tableName = process.env.TABLE_NAME
// const documentClient = new AWS.DynamoDB.DocumentClient({
//   region: process.env.region,
// });
const handler = async (event) => {
    try {
        const manageDevice = new saveData_1.ManageDevice(event);
        const returnResult = await manageDevice.saveData();
        // console.info('returning from module', returnResult)
        return {
            statusCode: 200,
            body: returnResult
        };
    }
    catch (e) {
        ;
        return {
            statusCode: 500,
            body: e === 500 ? 'Invalid Request Body' : e, // here we can create and import a commomn error function or specific error handling function where the out put can be organise 
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSx5Q0FBeUM7QUFFekMsMkNBQTJDO0FBRTNDLDJEQUEyRDtBQUMzRCxnQ0FBZ0M7QUFDaEMsTUFBTTtBQUdDLE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFVLEVBQUUsRUFBRTtJQUNuRCxJQUFJO1FBQ0YsTUFBTSxZQUFZLEdBQUcsSUFBSSx1QkFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLE1BQU0sWUFBWSxHQUFHLE1BQU0sWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ25ELHNEQUFzRDtRQUN0RCxPQUFPO1lBQ0gsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsWUFBWTtTQUNuQixDQUFDO0tBQ0w7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUFDLENBQUM7UUFDWixPQUFPO1lBQ0gsVUFBVSxFQUFHLEdBQUc7WUFDaEIsSUFBSSxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsZ0lBQWdJO1NBQy9LLENBQUM7S0FDTDtBQUNILENBQUMsQ0FBQTtBQWZZLFFBQUEsT0FBTyxXQWVuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuaW1wb3J0ICogYXMgQVdTIGZyb20gXCJhd3Mtc2RrXCJcbmltcG9ydCB7IE1hbmFnZURldmljZSB9IGZyb20gJy4vc2F2ZURhdGEnXG5cbi8vIGNvbnN0IHRhYmxlTmFtZSA9IHByb2Nlc3MuZW52LlRBQkxFX05BTUVcblxuLy8gY29uc3QgZG9jdW1lbnRDbGllbnQgPSBuZXcgQVdTLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50KHtcbi8vICAgcmVnaW9uOiBwcm9jZXNzLmVudi5yZWdpb24sXG4vLyB9KTtcblxuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudDogYW55KSA9PiB7XG4gIHRyeSB7IFxuICAgIGNvbnN0IG1hbmFnZURldmljZSA9IG5ldyBNYW5hZ2VEZXZpY2UoZXZlbnQpO1xuICAgIGNvbnN0IHJldHVyblJlc3VsdCA9IGF3YWl0IG1hbmFnZURldmljZS5zYXZlRGF0YSgpO1xuICAgIC8vIGNvbnNvbGUuaW5mbygncmV0dXJuaW5nIGZyb20gbW9kdWxlJywgcmV0dXJuUmVzdWx0KVxuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keTogcmV0dXJuUmVzdWx0XG4gICAgICB9O1xuICB9IGNhdGNoIChlKSB7O1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6ICA1MDAsXG4gICAgICAgIGJvZHk6IGUgPT09IDUwMCA/ICdJbnZhbGlkIFJlcXVlc3QgQm9keScgOiBlLCAvLyBoZXJlIHdlIGNhbiBjcmVhdGUgYW5kIGltcG9ydCBhIGNvbW1vbW4gZXJyb3IgZnVuY3Rpb24gb3Igc3BlY2lmaWMgZXJyb3IgaGFuZGxpbmcgZnVuY3Rpb24gd2hlcmUgdGhlIG91dCBwdXQgY2FuIGJlIG9yZ2FuaXNlIFxuICAgICAgfTtcbiAgfVxufVxuIl19