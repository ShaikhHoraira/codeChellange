"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const AWS = require("aws-sdk");
const secretsManager = new AWS.SecretsManager();
const handler = async function (_event) {
    const secretName = process.env.SECRET_NAME;
    if (!secretName) {
        throw new Error('Environment variable SECRET_NAME is not defined');
    }
    try {
        const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
        const secret = JSON.parse(data.SecretString);
        return {
            PhysicalResourceId: secretName,
            Data: {
                SecretValue: secret.key
            }
        };
    }
    catch (error) {
        console.error(error);
        throw new Error(`Error retrieving secret: ${error.message}`);
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjcmV0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVyL2NvbW1vbi9zZWNyZXRIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUErQjtBQUMvQixNQUFNLGNBQWMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUd6QyxNQUFNLE9BQU8sR0FBWSxLQUFLLFdBQVUsTUFBWTtJQUN6RCxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztJQUMzQyxJQUFJLENBQUMsVUFBVSxFQUFFO1FBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO0tBQ3BFO0lBQ0QsSUFBSTtRQUNGLE1BQU0sSUFBSSxHQUFHLE1BQU0sY0FBYyxDQUFDLGNBQWMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3JGLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQWEsQ0FBQyxDQUFDO1FBQzlDLE9BQU87WUFDTCxrQkFBa0IsRUFBRSxVQUFVO1lBQzlCLElBQUksRUFBRTtnQkFDSixXQUFXLEVBQUUsTUFBTSxDQUFDLEdBQUc7YUFDeEI7U0FDRixDQUFDO0tBQ0g7SUFBQyxPQUFPLEtBQVUsRUFBRTtRQUNuQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0tBQzlEO0FBQ0gsQ0FBQyxDQUFDO0FBbEJXLFFBQUEsT0FBTyxXQWtCbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBBV1MgZnJvbSAnYXdzLXNkayc7XG5jb25zdCBzZWNyZXRzTWFuYWdlciA9IG5ldyBBV1MuU2VjcmV0c01hbmFnZXIoKTtcbmltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWxhbWJkYVwiO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIGZ1bmN0aW9uKF9ldmVudCA6IGFueSkge1xuICBjb25zdCBzZWNyZXROYW1lID0gcHJvY2Vzcy5lbnYuU0VDUkVUX05BTUU7XG4gIGlmICghc2VjcmV0TmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignRW52aXJvbm1lbnQgdmFyaWFibGUgU0VDUkVUX05BTUUgaXMgbm90IGRlZmluZWQnKTtcbiAgfVxuICB0cnkge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBzZWNyZXRzTWFuYWdlci5nZXRTZWNyZXRWYWx1ZSh7IFNlY3JldElkOiBzZWNyZXROYW1lIH0pLnByb21pc2UoKTtcbiAgICBjb25zdCBzZWNyZXQgPSBKU09OLnBhcnNlKGRhdGEuU2VjcmV0U3RyaW5nISk7XG4gICAgcmV0dXJuIHtcbiAgICAgIFBoeXNpY2FsUmVzb3VyY2VJZDogc2VjcmV0TmFtZSxcbiAgICAgIERhdGE6IHtcbiAgICAgICAgU2VjcmV0VmFsdWU6IHNlY3JldC5rZXlcbiAgICAgIH1cbiAgICB9O1xuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvciByZXRyaWV2aW5nIHNlY3JldDogJHtlcnJvci5tZXNzYWdlfWApO1xuICB9XG59O1xuIl19