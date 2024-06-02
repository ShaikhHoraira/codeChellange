"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const getTransportationCostData_1 = require("../../modules/TransportationCost/getTransportationCostData");
const handler = async (event) => {
    try {
        const { transportId } = event.queryStringParameters;
        if (!transportId) {
            throw new Error("Missing parameter: transportId");
        }
        const manageDevice = new getTransportationCostData_1.GetTransportationAddress(transportId);
        const result = await manageDevice.getData();
        console.log();
        return {
            statusCode: 200,
            body: JSON.stringify(result),
        };
    }
    catch (e) {
        if (e.message.includes('Missing parameter') || e.message.includes('Invalid format')) {
            return {
                statusCode: 400,
                body: e.message,
            };
        }
        else {
            return {
                statusCode: 403,
                body: 'Forbidden access',
            };
        }
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VHJhbnNwb3J0YXRpb25Db3N0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVyL1RyYW5zcG9ydGF0aW9uQ29zdC9nZXRUcmFuc3BvcnRhdGlvbkNvc3RIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDBHQUFzRztBQUUvRixNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVSxFQUFFLEVBQUU7SUFDbkQsSUFBSTtRQUNGLE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRyxLQUFLLENBQUMscUJBQXFCLENBQUM7UUFDcEQsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7U0FDbkQ7UUFDRCxNQUFNLFlBQVksR0FBRyxJQUFJLG9EQUF3QixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sTUFBTSxHQUFHLE1BQU0sWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzVDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQTtRQUNiLE9BQU87WUFDTCxVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztTQUM3QixDQUFDO0tBQ0g7SUFBQyxPQUFPLENBQU0sRUFBRTtRQUNmLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQ25GLE9BQU87Z0JBQ0wsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPO2FBQ2hCLENBQUM7U0FDSDthQUFNO1lBQ0wsT0FBTztnQkFDTCxVQUFVLEVBQUUsR0FBRztnQkFDZixJQUFJLEVBQUUsa0JBQWtCO2FBQ3pCLENBQUM7U0FDSDtLQUNGO0FBQ0gsQ0FBQyxDQUFDO0FBMUJXLFFBQUEsT0FBTyxXQTBCbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSBcImF3cy1sYW1iZGFcIjtcbmltcG9ydCB7IEdldFRyYW5zcG9ydGF0aW9uQWRkcmVzcyB9IGZyb20gJy4uLy4uL21vZHVsZXMvVHJhbnNwb3J0YXRpb25Db3N0L2dldFRyYW5zcG9ydGF0aW9uQ29zdERhdGEnO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudDogYW55KSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyB0cmFuc3BvcnRJZCB9ID0gZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzO1xuICAgIGlmICghdHJhbnNwb3J0SWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgcGFyYW1ldGVyOiB0cmFuc3BvcnRJZFwiKTtcbiAgICB9XG4gICAgY29uc3QgbWFuYWdlRGV2aWNlID0gbmV3IEdldFRyYW5zcG9ydGF0aW9uQWRkcmVzcyh0cmFuc3BvcnRJZCk7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgbWFuYWdlRGV2aWNlLmdldERhdGEoKTtcbiAgICBjb25zb2xlLmxvZygpXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlc3VsdCksXG4gICAgfTtcbiAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgaWYgKGUubWVzc2FnZS5pbmNsdWRlcygnTWlzc2luZyBwYXJhbWV0ZXInKSB8fCBlLm1lc3NhZ2UuaW5jbHVkZXMoJ0ludmFsaWQgZm9ybWF0JykpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDQwMCxcbiAgICAgICAgYm9keTogZS5tZXNzYWdlLFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogNDAzLFxuICAgICAgICBib2R5OiAnRm9yYmlkZGVuIGFjY2VzcycsXG4gICAgICB9O1xuICAgIH1cbiAgfVxufTtcbiJdfQ==