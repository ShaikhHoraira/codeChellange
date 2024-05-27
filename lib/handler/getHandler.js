"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const getData_1 = require("../modules/getData");
const handler = async (event) => {
    try {
        // Validate presence of userId
        const { userId, suburb, postcode } = event.queryStringParameters;
        if (!userId) {
            throw new Error("Missing parameter: userId");
        }
        const manageDevice = new getData_1.GetCustomerAddress(userId, suburb, postcode);
        const result = await manageDevice.getData();
        return {
            statusCode: 200,
            body: JSON.stringify(result),
        };
    }
    catch (e) {
        // Differentiate between validation and access errors
        if (e.message.includes('Missing parameter') || e.message.includes('Invalid format')) {
            // Validation error - return 400
            return {
                statusCode: 400,
                body: e.message,
            };
        }
        else {
            // Access-related error (e.g., unauthorized user) - return 403
            return {
                statusCode: 403,
                body: 'Forbidden access',
            };
        }
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVyL2dldEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsZ0RBQXdEO0FBRWpELE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFVLEVBQUUsRUFBRTtJQUNuRCxJQUFJO1FBQ0YsOEJBQThCO1FBQzlCLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQztRQUNqRSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1NBQzlDO1FBQ0QsTUFBTSxZQUFZLEdBQUcsSUFBSSw0QkFBa0IsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3RFLE1BQU0sTUFBTSxHQUFHLE1BQU0sWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzVDLE9BQU87WUFDTCxVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztTQUM3QixDQUFDO0tBQ0g7SUFBQyxPQUFPLENBQU0sRUFBRTtRQUNmLHFEQUFxRDtRQUNyRCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtZQUNuRixnQ0FBZ0M7WUFDaEMsT0FBTztnQkFDTCxVQUFVLEVBQUUsR0FBRztnQkFDZixJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU87YUFDaEIsQ0FBQztTQUNIO2FBQU07WUFDTCw4REFBOEQ7WUFDOUQsT0FBTztnQkFDTCxVQUFVLEVBQUUsR0FBRztnQkFDZixJQUFJLEVBQUUsa0JBQWtCO2FBQ3pCLENBQUM7U0FDSDtLQUNGO0FBQ0gsQ0FBQyxDQUFDO0FBN0JXLFFBQUEsT0FBTyxXQTZCbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSBcImF3cy1sYW1iZGFcIjtcbmltcG9ydCB7IEdldEN1c3RvbWVyQWRkcmVzcyB9IGZyb20gJy4uL21vZHVsZXMvZ2V0RGF0YSc7XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBIYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBhbnkpID0+IHtcbiAgdHJ5IHtcbiAgICAvLyBWYWxpZGF0ZSBwcmVzZW5jZSBvZiB1c2VySWRcbiAgICBjb25zdCB7IHVzZXJJZCwgc3VidXJiLCBwb3N0Y29kZSB9ID0gZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzO1xuICAgIGlmICghdXNlcklkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIHBhcmFtZXRlcjogdXNlcklkXCIpO1xuICAgIH1cbiAgICBjb25zdCBtYW5hZ2VEZXZpY2UgPSBuZXcgR2V0Q3VzdG9tZXJBZGRyZXNzKHVzZXJJZCwgc3VidXJiLCBwb3N0Y29kZSk7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgbWFuYWdlRGV2aWNlLmdldERhdGEoKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVzdWx0KSxcbiAgICB9O1xuICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICAvLyBEaWZmZXJlbnRpYXRlIGJldHdlZW4gdmFsaWRhdGlvbiBhbmQgYWNjZXNzIGVycm9yc1xuICAgIGlmIChlLm1lc3NhZ2UuaW5jbHVkZXMoJ01pc3NpbmcgcGFyYW1ldGVyJykgfHwgZS5tZXNzYWdlLmluY2x1ZGVzKCdJbnZhbGlkIGZvcm1hdCcpKSB7XG4gICAgICAvLyBWYWxpZGF0aW9uIGVycm9yIC0gcmV0dXJuIDQwMFxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogNDAwLFxuICAgICAgICBib2R5OiBlLm1lc3NhZ2UsXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBBY2Nlc3MtcmVsYXRlZCBlcnJvciAoZS5nLiwgdW5hdXRob3JpemVkIHVzZXIpIC0gcmV0dXJuIDQwM1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogNDAzLFxuICAgICAgICBib2R5OiAnRm9yYmlkZGVuIGFjY2VzcycsXG4gICAgICB9O1xuICAgIH1cbiAgfVxufTtcbiJdfQ==