"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const AWS = require("aws-sdk");
// import { ManageDevice } from './saveData'
const path = require("path");
const saveDataPath = path.join(__dirname, 'modules', 'saveData');
//const saveDataPath = path.join(__dirname, 'modules', 'saveData');
const { ManageDevice } = require(saveDataPath);
const tableName = process.env.TABLE_NAME;
const documentClient = new AWS.DynamoDB.DocumentClient({
    region: process.env.region,
});
const handler = async (event) => {
    const bodypram = JSON.parse(event.body);
    const manageDevice = new ManageDevice(bodypram);
    const returnResult = manageDevice.saveData();
    console.info('returning from module', returnResult);
    var params = {
        TableName: tableName,
        Item: {
            UserId: bodypram.userId,
            CustomerName: bodypram.customerName,
            AppartmentNo: bodypram.appartmentNo,
            Address: bodypram.address,
            Suburb: bodypram.suburb,
            PostCode: bodypram.postCode,
            State: bodypram.state,
            Country: bodypram.country
        }
    };
    try {
        await documentClient.put(params).promise();
        return {
            statusCode: 200,
            body: 'Success'
        };
    }
    catch (e) {
        ;
        return {
            statusCode: 500,
            body: e === 500 ? 'Invalid Request Body' : 'Something went wrong', // here we can create and import a commomn error function or specific error handling function where the out put can be organise 
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwrQkFBOEI7QUFDOUIsNENBQTRDO0FBQzVDLDZCQUE4QjtBQUM5QixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUcsVUFBVSxDQUFDLENBQUE7QUFDakUsbUVBQW1FO0FBQ25FLE1BQU0sRUFBRSxZQUFZLEVBQUUsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDL0MsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUE7QUFFeEMsTUFBTSxjQUFjLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQztJQUNyRCxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNO0NBQzNCLENBQUMsQ0FBQztBQUdJLE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFXLEVBQUUsRUFBRTtJQUV0RCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxNQUFNLFlBQVksR0FBRyxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoRCxNQUFNLFlBQVksR0FBRyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDN0MsT0FBTyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxZQUFZLENBQUMsQ0FBQTtJQUNuRCxJQUFJLE1BQU0sR0FBRztRQUNYLFNBQVMsRUFBRSxTQUFVO1FBQ3JCLElBQUksRUFBRTtZQUNKLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTTtZQUN2QixZQUFZLEVBQUcsUUFBUSxDQUFDLFlBQVk7WUFDcEMsWUFBWSxFQUFHLFFBQVEsQ0FBQyxZQUFZO1lBQ3BDLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTztZQUN6QixNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU07WUFDdkIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRO1lBQzNCLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSztZQUNyQixPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU87U0FDMUI7S0FDRixDQUFDO0lBRUEsSUFBSTtRQUNGLE1BQU0sY0FBYyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMzQyxPQUFPO1lBQ0gsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsU0FBUztTQUNoQixDQUFDO0tBQ0w7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUFDLENBQUM7UUFDWixPQUFPO1lBQ0gsVUFBVSxFQUFHLEdBQUc7WUFDaEIsSUFBSSxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxzQkFBc0IsRUFBRSxnSUFBZ0k7U0FDcE0sQ0FBQztLQUNMO0FBQ0gsQ0FBQyxDQUFBO0FBaENZLFFBQUEsT0FBTyxXQWdDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcbmltcG9ydCAqIGFzIEFXUyBmcm9tIFwiYXdzLXNka1wiXG4vLyBpbXBvcnQgeyBNYW5hZ2VEZXZpY2UgfSBmcm9tICcuL3NhdmVEYXRhJ1xuaW1wb3J0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBzYXZlRGF0YVBhdGggPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnbW9kdWxlcycgLCAnc2F2ZURhdGEnKVxuLy9jb25zdCBzYXZlRGF0YVBhdGggPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnbW9kdWxlcycsICdzYXZlRGF0YScpO1xuY29uc3QgeyBNYW5hZ2VEZXZpY2UgfSA9IHJlcXVpcmUoc2F2ZURhdGFQYXRoKTtcbmNvbnN0IHRhYmxlTmFtZSA9IHByb2Nlc3MuZW52LlRBQkxFX05BTUVcblxuY29uc3QgZG9jdW1lbnRDbGllbnQgPSBuZXcgQVdTLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50KHtcbiAgcmVnaW9uOiBwcm9jZXNzLmVudi5yZWdpb24sXG59KTtcblxuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudCA6IGFueSkgPT4ge1xuXG5jb25zdCBib2R5cHJhbSA9IEpTT04ucGFyc2UoZXZlbnQuYm9keSk7XG5jb25zdCBtYW5hZ2VEZXZpY2UgPSBuZXcgTWFuYWdlRGV2aWNlKGJvZHlwcmFtKTtcbmNvbnN0IHJldHVyblJlc3VsdCA9IG1hbmFnZURldmljZS5zYXZlRGF0YSgpO1xuY29uc29sZS5pbmZvKCdyZXR1cm5pbmcgZnJvbSBtb2R1bGUnLCByZXR1cm5SZXN1bHQpXG52YXIgcGFyYW1zID0ge1xuICBUYWJsZU5hbWU6IHRhYmxlTmFtZSEsXG4gIEl0ZW06IHtcbiAgICBVc2VySWQ6IGJvZHlwcmFtLnVzZXJJZCxcbiAgICBDdXN0b21lck5hbWUgOiBib2R5cHJhbS5jdXN0b21lck5hbWUsXG4gICAgQXBwYXJ0bWVudE5vIDogYm9keXByYW0uYXBwYXJ0bWVudE5vLFxuICAgIEFkZHJlc3M6IGJvZHlwcmFtLmFkZHJlc3MsXG4gICAgU3VidXJiOiBib2R5cHJhbS5zdWJ1cmIsXG4gICAgUG9zdENvZGU6IGJvZHlwcmFtLnBvc3RDb2RlLFxuICAgIFN0YXRlOiBib2R5cHJhbS5zdGF0ZSxcbiAgICBDb3VudHJ5OiBib2R5cHJhbS5jb3VudHJ5XG4gIH1cbn07XG5cbiAgdHJ5IHsgXG4gICAgYXdhaXQgZG9jdW1lbnRDbGllbnQucHV0KHBhcmFtcykucHJvbWlzZSgpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keTogJ1N1Y2Nlc3MnXG4gICAgICB9O1xuICB9IGNhdGNoIChlKSB7O1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6ICA1MDAsXG4gICAgICAgIGJvZHk6IGUgPT09IDUwMCA/ICdJbnZhbGlkIFJlcXVlc3QgQm9keScgOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnLCAvLyBoZXJlIHdlIGNhbiBjcmVhdGUgYW5kIGltcG9ydCBhIGNvbW1vbW4gZXJyb3IgZnVuY3Rpb24gb3Igc3BlY2lmaWMgZXJyb3IgaGFuZGxpbmcgZnVuY3Rpb24gd2hlcmUgdGhlIG91dCBwdXQgY2FuIGJlIG9yZ2FuaXNlIFxuICAgICAgfTtcbiAgfVxufVxuIl19