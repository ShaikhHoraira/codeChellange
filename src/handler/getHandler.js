"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const getData_1 = require("./getData");
const handler = async (event) => {
    try {
        if (!event.queryStringParameters.userId || !event.queryStringParameters) {
            return {
                statusCode: 400,
                body: "Missing userId, Please provide userId just to see how that would react",
            };
        }
        ;
        const manageDevice = new getData_1.GetCustomerAddress(event.queryStringParameters.userId, event.queryStringParameters.suburb, event.queryStringParameters.postcode);
        const result = await manageDevice.getData();
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        };
    }
    catch (e) {
        return {
            statusCode: 500,
            body: e === 500 ? 'Invalid Request Body' : e,
        };
    }
    ;
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdUNBQStDO0FBR3hDLE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFXLEVBQUUsRUFBRTtJQUNwRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUc7WUFDeEUsT0FBTztnQkFDTCxVQUFVLEVBQUUsR0FBRztnQkFDZixJQUFJLEVBQUUsd0VBQXdFO2FBQy9FLENBQUM7U0FDSDtRQUFBLENBQUM7UUFDRixNQUFNLFlBQVksR0FBRyxJQUFJLDRCQUFrQixDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekosTUFBTSxNQUFNLEdBQUcsTUFBTSxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDNUMsT0FBTztZQUNMLFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO1NBQzdCLENBQUM7S0FDSDtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTztZQUNILFVBQVUsRUFBRyxHQUFHO1lBQ2hCLElBQUksRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3QyxDQUFDO0tBQ0w7SUFBQSxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBcEJXLFFBQUEsT0FBTyxXQW9CbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcbmltcG9ydCB7IEdldEN1c3RvbWVyQWRkcmVzcyB9IGZyb20gJy4vZ2V0RGF0YSc7XG5cblxuZXhwb3J0IGNvbnN0IGhhbmRsZXI6IEhhbmRsZXIgPSBhc3luYyAoZXZlbnQgOiBhbnkpID0+IHtcbiAgdHJ5IHtcbiAgICBpZiAoIWV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycy51c2VySWQgfHwgIWV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycyApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDQwMCxcbiAgICAgICAgYm9keTogXCJNaXNzaW5nIHVzZXJJZCwgUGxlYXNlIHByb3ZpZGUgdXNlcklkIGp1c3QgdG8gc2VlIGhvdyB0aGF0IHdvdWxkIHJlYWN0XCIsXG4gICAgICB9O1xuICAgIH07XG4gICAgY29uc3QgbWFuYWdlRGV2aWNlID0gbmV3IEdldEN1c3RvbWVyQWRkcmVzcyhldmVudC5xdWVyeVN0cmluZ1BhcmFtZXRlcnMudXNlcklkLGV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycy5zdWJ1cmIsIGV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycy5wb3N0Y29kZSk7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgbWFuYWdlRGV2aWNlLmdldERhdGEoKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVzdWx0KVxuICAgIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAgNTAwLFxuICAgICAgICBib2R5OiBlID09PSA1MDAgPyAnSW52YWxpZCBSZXF1ZXN0IEJvZHknIDogZSxcbiAgICAgIH07XG4gIH07XG59OyJdfQ==