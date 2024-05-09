"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const getData_1 = require("./getData");
const handler = async (event) => {
    try {
        if (!event.queryStringParameters.userId || !event.queryStringParameters) {
            return {
                statusCode: 400,
                body: "Missing userId, Please provide userId",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdUNBQStDO0FBSXhDLE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFXLEVBQUUsRUFBRTtJQUNwRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUc7WUFDeEUsT0FBTztnQkFDTCxVQUFVLEVBQUUsR0FBRztnQkFDZixJQUFJLEVBQUUsdUNBQXVDO2FBQzlDLENBQUM7U0FDSDtRQUFBLENBQUM7UUFDRixNQUFNLFlBQVksR0FBRyxJQUFJLDRCQUFrQixDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekosTUFBTSxNQUFNLEdBQUcsTUFBTSxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDNUMsT0FBTztZQUNMLFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO1NBQzdCLENBQUM7S0FDSDtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTztZQUNILFVBQVUsRUFBRyxHQUFHO1lBQ2hCLElBQUksRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3QyxDQUFDO0tBQ0w7SUFBQSxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBcEJXLFFBQUEsT0FBTyxXQW9CbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcbmltcG9ydCB7IEdldEN1c3RvbWVyQWRkcmVzcyB9IGZyb20gJy4vZ2V0RGF0YSc7XG5cblxuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudCA6IGFueSkgPT4ge1xuICB0cnkge1xuICAgIGlmICghZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzLnVzZXJJZCB8fCAhZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzICkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogNDAwLFxuICAgICAgICBib2R5OiBcIk1pc3NpbmcgdXNlcklkLCBQbGVhc2UgcHJvdmlkZSB1c2VySWRcIixcbiAgICAgIH07XG4gICAgfTtcbiAgICBjb25zdCBtYW5hZ2VEZXZpY2UgPSBuZXcgR2V0Q3VzdG9tZXJBZGRyZXNzKGV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycy51c2VySWQsZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzLnN1YnVyYiwgZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzLnBvc3Rjb2RlKTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBtYW5hZ2VEZXZpY2UuZ2V0RGF0YSgpO1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShyZXN1bHQpXG4gICAgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6ICA1MDAsXG4gICAgICAgIGJvZHk6IGUgPT09IDUwMCA/ICdJbnZhbGlkIFJlcXVlc3QgQm9keScgOiBlLFxuICAgICAgfTtcbiAgfTtcbn07Il19