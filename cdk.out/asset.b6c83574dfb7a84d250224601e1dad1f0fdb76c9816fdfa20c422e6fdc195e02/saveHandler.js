"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const AWS = require("aws-sdk");
const tableName = process.env.TODO_TABLE_NAME;
const documentClient = new AWS.DynamoDB.DocumentClient({
    region: process.env.region,
});
const handler = async (event) => {
    const bodypram = JSON.parse(event.body);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwrQkFBOEI7QUFFOUIsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUE7QUFFN0MsTUFBTSxjQUFjLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQztJQUNyRCxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNO0NBQzNCLENBQUMsQ0FBQztBQUVJLE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFXLEVBQUUsRUFBRTtJQUV0RCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxJQUFJLE1BQU0sR0FBRztRQUNYLFNBQVMsRUFBRSxTQUFVO1FBQ3JCLElBQUksRUFBRTtZQUNKLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTTtZQUN2QixZQUFZLEVBQUcsUUFBUSxDQUFDLFlBQVk7WUFDcEMsWUFBWSxFQUFHLFFBQVEsQ0FBQyxZQUFZO1lBQ3BDLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTztZQUN6QixNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU07WUFDdkIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRO1lBQzNCLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSztZQUNyQixPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU87U0FDMUI7S0FDRixDQUFDO0lBRUEsSUFBSTtRQUNGLE1BQU0sY0FBYyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMzQyxPQUFPO1lBQ0gsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsU0FBUztTQUNoQixDQUFDO0tBQ0w7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUFDLENBQUM7UUFDWixPQUFPO1lBQ0gsVUFBVSxFQUFHLEdBQUc7WUFDaEIsSUFBSSxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxzQkFBc0IsRUFBRSxnSUFBZ0k7U0FDcE0sQ0FBQztLQUNMO0FBQ0gsQ0FBQyxDQUFBO0FBN0JZLFFBQUEsT0FBTyxXQTZCbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcbmltcG9ydCAqIGFzIEFXUyBmcm9tIFwiYXdzLXNka1wiXG5cbmNvbnN0IHRhYmxlTmFtZSA9IHByb2Nlc3MuZW52LlRPRE9fVEFCTEVfTkFNRVxuXG5jb25zdCBkb2N1bWVudENsaWVudCA9IG5ldyBBV1MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQoe1xuICByZWdpb246IHByb2Nlc3MuZW52LnJlZ2lvbixcbn0pO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudCA6IGFueSkgPT4ge1xuXG5jb25zdCBib2R5cHJhbSA9IEpTT04ucGFyc2UoZXZlbnQuYm9keSk7XG52YXIgcGFyYW1zID0ge1xuICBUYWJsZU5hbWU6IHRhYmxlTmFtZSEsXG4gIEl0ZW06IHtcbiAgICBVc2VySWQ6IGJvZHlwcmFtLnVzZXJJZCxcbiAgICBDdXN0b21lck5hbWUgOiBib2R5cHJhbS5jdXN0b21lck5hbWUsXG4gICAgQXBwYXJ0bWVudE5vIDogYm9keXByYW0uYXBwYXJ0bWVudE5vLFxuICAgIEFkZHJlc3M6IGJvZHlwcmFtLmFkZHJlc3MsXG4gICAgU3VidXJiOiBib2R5cHJhbS5zdWJ1cmIsXG4gICAgUG9zdENvZGU6IGJvZHlwcmFtLnBvc3RDb2RlLFxuICAgIFN0YXRlOiBib2R5cHJhbS5zdGF0ZSxcbiAgICBDb3VudHJ5OiBib2R5cHJhbS5jb3VudHJ5XG4gIH1cbn07XG5cbiAgdHJ5IHsgXG4gICAgYXdhaXQgZG9jdW1lbnRDbGllbnQucHV0KHBhcmFtcykucHJvbWlzZSgpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keTogJ1N1Y2Nlc3MnXG4gICAgICB9O1xuICB9IGNhdGNoIChlKSB7O1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6ICA1MDAsXG4gICAgICAgIGJvZHk6IGUgPT09IDUwMCA/ICdJbnZhbGlkIFJlcXVlc3QgQm9keScgOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnLCAvLyBoZXJlIHdlIGNhbiBjcmVhdGUgYW5kIGltcG9ydCBhIGNvbW1vbW4gZXJyb3IgZnVuY3Rpb24gb3Igc3BlY2lmaWMgZXJyb3IgaGFuZGxpbmcgZnVuY3Rpb24gd2hlcmUgdGhlIG91dCBwdXQgY2FuIGJlIG9yZ2FuaXNlIFxuICAgICAgfTtcbiAgfVxufVxuIl19