"use strict";
// import { Handler } from "aws-cdk-lib/aws-lambda";
// import { SaveCustomerAddress } from './saveData';
// export const handler: Handler = async (event: any) => {
//   try { 
//     if (event.httpMethod === "POST"){
//     const manageDevice = new SaveCustomerAddress(event);
//     await manageDevice.saveData();
//     }
//     return {
//         statusCode: 200,
//         body: 'Success'
//       };
//   } catch (e) {
//     return {
//         statusCode:  500,
//         body: e === 500 ? 'Invalid Request Body' : e, // here we can create and import a commomn error function or specific error handling function where the out put can be organise 
//       };
//   }
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0RBQW9EO0FBQ3BELG9EQUFvRDtBQUdwRCwwREFBMEQ7QUFDMUQsV0FBVztBQUNYLHdDQUF3QztBQUN4QywyREFBMkQ7QUFDM0QscUNBQXFDO0FBQ3JDLFFBQVE7QUFDUixlQUFlO0FBQ2YsMkJBQTJCO0FBQzNCLDBCQUEwQjtBQUMxQixXQUFXO0FBQ1gsa0JBQWtCO0FBQ2xCLGVBQWU7QUFDZiw0QkFBNEI7QUFDNUIseUxBQXlMO0FBQ3pMLFdBQVc7QUFDWCxNQUFNO0FBQ04sSUFBSSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuLy8gaW1wb3J0IHsgU2F2ZUN1c3RvbWVyQWRkcmVzcyB9IGZyb20gJy4vc2F2ZURhdGEnO1xuXG5cbi8vIGV4cG9ydCBjb25zdCBoYW5kbGVyOiBIYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBhbnkpID0+IHtcbi8vICAgdHJ5IHsgXG4vLyAgICAgaWYgKGV2ZW50Lmh0dHBNZXRob2QgPT09IFwiUE9TVFwiKXtcbi8vICAgICBjb25zdCBtYW5hZ2VEZXZpY2UgPSBuZXcgU2F2ZUN1c3RvbWVyQWRkcmVzcyhldmVudCk7XG4vLyAgICAgYXdhaXQgbWFuYWdlRGV2aWNlLnNhdmVEYXRhKCk7XG4vLyAgICAgfVxuLy8gICAgIHJldHVybiB7XG4vLyAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbi8vICAgICAgICAgYm9keTogJ1N1Y2Nlc3MnXG4vLyAgICAgICB9O1xuLy8gICB9IGNhdGNoIChlKSB7XG4vLyAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgc3RhdHVzQ29kZTogIDUwMCxcbi8vICAgICAgICAgYm9keTogZSA9PT0gNTAwID8gJ0ludmFsaWQgUmVxdWVzdCBCb2R5JyA6IGUsIC8vIGhlcmUgd2UgY2FuIGNyZWF0ZSBhbmQgaW1wb3J0IGEgY29tbW9tbiBlcnJvciBmdW5jdGlvbiBvciBzcGVjaWZpYyBlcnJvciBoYW5kbGluZyBmdW5jdGlvbiB3aGVyZSB0aGUgb3V0IHB1dCBjYW4gYmUgb3JnYW5pc2UgXG4vLyAgICAgICB9O1xuLy8gICB9XG4vLyB9XG4iXX0=