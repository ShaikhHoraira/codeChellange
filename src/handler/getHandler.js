"use strict";
// import { Handler } from "aws-cdk-lib/aws-lambda";
// import { GetCustomerAddress } from './getData';
// export const handler: Handler = async (event : any) => {
//   try {
//     if (!event.queryStringParameters.userId || !event.queryStringParameters ) {
//       return {
//         statusCode: 400,
//         body: "Missing userId, Please provide userId",
//       };
//     };
//     const manageDevice = new GetCustomerAddress(event.queryStringParameters.userId,event.queryStringParameters.suburb, event.queryStringParameters.postcode);
//     const result = await manageDevice.getData();
//     return {
//       statusCode: 200,
//       body: JSON.stringify(result)
//     };
//   } catch (e) {
//     return {
//         statusCode:  500,
//         body: e === 500 ? 'Invalid Request Body' : e,
//       };
//   };
// };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9EQUFvRDtBQUNwRCxrREFBa0Q7QUFJbEQsMkRBQTJEO0FBQzNELFVBQVU7QUFDVixrRkFBa0Y7QUFDbEYsaUJBQWlCO0FBQ2pCLDJCQUEyQjtBQUMzQix5REFBeUQ7QUFDekQsV0FBVztBQUNYLFNBQVM7QUFDVCxnS0FBZ0s7QUFDaEssbURBQW1EO0FBQ25ELGVBQWU7QUFDZix5QkFBeUI7QUFDekIscUNBQXFDO0FBQ3JDLFNBQVM7QUFDVCxrQkFBa0I7QUFDbEIsZUFBZTtBQUNmLDRCQUE0QjtBQUM1Qix3REFBd0Q7QUFDeEQsV0FBVztBQUNYLE9BQU87QUFDUCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XG4vLyBpbXBvcnQgeyBHZXRDdXN0b21lckFkZHJlc3MgfSBmcm9tICcuL2dldERhdGEnO1xuXG5cblxuLy8gZXhwb3J0IGNvbnN0IGhhbmRsZXI6IEhhbmRsZXIgPSBhc3luYyAoZXZlbnQgOiBhbnkpID0+IHtcbi8vICAgdHJ5IHtcbi8vICAgICBpZiAoIWV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycy51c2VySWQgfHwgIWV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycyApIHtcbi8vICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgIHN0YXR1c0NvZGU6IDQwMCxcbi8vICAgICAgICAgYm9keTogXCJNaXNzaW5nIHVzZXJJZCwgUGxlYXNlIHByb3ZpZGUgdXNlcklkXCIsXG4vLyAgICAgICB9O1xuLy8gICAgIH07XG4vLyAgICAgY29uc3QgbWFuYWdlRGV2aWNlID0gbmV3IEdldEN1c3RvbWVyQWRkcmVzcyhldmVudC5xdWVyeVN0cmluZ1BhcmFtZXRlcnMudXNlcklkLGV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycy5zdWJ1cmIsIGV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycy5wb3N0Y29kZSk7XG4vLyAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgbWFuYWdlRGV2aWNlLmdldERhdGEoKTtcbi8vICAgICByZXR1cm4ge1xuLy8gICAgICAgc3RhdHVzQ29kZTogMjAwLFxuLy8gICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVzdWx0KVxuLy8gICAgIH07XG4vLyAgIH0gY2F0Y2ggKGUpIHtcbi8vICAgICByZXR1cm4ge1xuLy8gICAgICAgICBzdGF0dXNDb2RlOiAgNTAwLFxuLy8gICAgICAgICBib2R5OiBlID09PSA1MDAgPyAnSW52YWxpZCBSZXF1ZXN0IEJvZHknIDogZSxcbi8vICAgICAgIH07XG4vLyAgIH07XG4vLyB9OyJdfQ==