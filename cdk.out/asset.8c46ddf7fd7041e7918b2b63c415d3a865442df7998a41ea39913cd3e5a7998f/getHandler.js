"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const AWS = require("aws-sdk");
const tableName = process.env.TODO_TABLE_NAME;
const documentClient = new AWS.DynamoDB.DocumentClient({
    region: process.env.region,
});
const handler = async (event) => {
    try {
        if (!event.queryStringParameters || !event.queryStringParameters.userId) {
            return {
                statusCode: 400,
                body: "Missing userId parameter",
            };
        }
        const params = {
            IndexName: 'UserIdIndex',
            KeyConditionExpression: 'UserId = :userId',
            ExpressionAttributeValues: {
                ':userId': event.queryStringParameters.userId,
            },
            TableName: tableName,
        };
        let response;
        if (event.httpMethod === "GET") {
            // response = await documentClient.get(params).promise();
            // console.info(response)
            // return response.Item;
            const data = await documentClient.query(params).promise();
            const items = data.Items;
            const response = {
                statusCode: 200,
                body: JSON.stringify(items)
            };
            return response;
        }
        return {
            statusCode: 200,
            body: response,
        };
    }
    catch (e) {
        console.info(e);
        return {
            statusCode: 500,
            body: e === 500 ? 'Invalid Request Body' : e,
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsK0JBQThCO0FBRzlCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFBO0FBRTdDLE1BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7SUFDckQsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTTtDQUMzQixDQUFDLENBQUM7QUFDSSxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVyxFQUFFLEVBQUU7SUFFcEQsSUFBSTtRQUNGLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsTUFBTSxFQUFFO1lBQ3ZFLE9BQU87Z0JBQ0wsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsSUFBSSxFQUFFLDBCQUEwQjthQUNqQyxDQUFDO1NBQ0g7UUFDRCxNQUFNLE1BQU0sR0FBRztZQUNiLFNBQVMsRUFBRSxhQUFhO1lBQ3hCLHNCQUFzQixFQUFFLGtCQUFrQjtZQUMxQyx5QkFBeUIsRUFBRTtnQkFDekIsU0FBUyxFQUFFLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNO2FBQzlDO1lBQ0QsU0FBUyxFQUFFLFNBQVU7U0FDdEIsQ0FBQztRQUNGLElBQUksUUFBUSxDQUFDO1FBQ1osSUFBSSxLQUFLLENBQUMsVUFBVSxLQUFLLEtBQUssRUFBQztZQUM5Qix5REFBeUQ7WUFDekQseUJBQXlCO1lBQ3pCLHdCQUF3QjtZQUN4QixNQUFNLElBQUksR0FBRyxNQUFNLGNBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDMUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN6QixNQUFNLFFBQVEsR0FBRztnQkFDZixVQUFVLEVBQUUsR0FBRztnQkFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7YUFDNUIsQ0FBQTtZQUVELE9BQU8sUUFBUSxDQUFBO1NBQ2hCO1FBQ0QsT0FBTztZQUNILFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLFFBQVE7U0FDZixDQUFDO0tBQ0w7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDZixPQUFPO1lBQ0gsVUFBVSxFQUFHLEdBQUc7WUFDaEIsSUFBSSxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzdDLENBQUM7S0FDTDtBQUNILENBQUMsQ0FBQztBQTFDVyxRQUFBLE9BQU8sV0EwQ2xCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XG5pbXBvcnQgKiBhcyBBV1MgZnJvbSBcImF3cy1zZGtcIlxuXG5cbmNvbnN0IHRhYmxlTmFtZSA9IHByb2Nlc3MuZW52LlRPRE9fVEFCTEVfTkFNRVxuXG5jb25zdCBkb2N1bWVudENsaWVudCA9IG5ldyBBV1MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQoe1xuICByZWdpb246IHByb2Nlc3MuZW52LnJlZ2lvbixcbn0pO1xuZXhwb3J0IGNvbnN0IGhhbmRsZXI6IEhhbmRsZXIgPSBhc3luYyAoZXZlbnQgOiBhbnkpID0+IHtcbiAgXG4gIHRyeSB7XG4gICAgaWYgKCFldmVudC5xdWVyeVN0cmluZ1BhcmFtZXRlcnMgfHwgIWV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycy51c2VySWQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDQwMCxcbiAgICAgICAgYm9keTogXCJNaXNzaW5nIHVzZXJJZCBwYXJhbWV0ZXJcIixcbiAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIEluZGV4TmFtZTogJ1VzZXJJZEluZGV4JywgLy8gVXBkYXRlIHdpdGggdGhlIGNvcnJlY3QgaW5kZXggbmFtZVxuICAgICAgS2V5Q29uZGl0aW9uRXhwcmVzc2lvbjogJ1VzZXJJZCA9IDp1c2VySWQnLFxuICAgICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xuICAgICAgICAnOnVzZXJJZCc6IGV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycy51c2VySWQsXG4gICAgICB9LFxuICAgICAgVGFibGVOYW1lOiB0YWJsZU5hbWUhLFxuICAgIH07XG4gICAgbGV0IHJlc3BvbnNlO1xuICAgICBpZiAoZXZlbnQuaHR0cE1ldGhvZCA9PT0gXCJHRVRcIil7XG4gICAgICAvLyByZXNwb25zZSA9IGF3YWl0IGRvY3VtZW50Q2xpZW50LmdldChwYXJhbXMpLnByb21pc2UoKTtcbiAgICAgIC8vIGNvbnNvbGUuaW5mbyhyZXNwb25zZSlcbiAgICAgIC8vIHJldHVybiByZXNwb25zZS5JdGVtO1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGRvY3VtZW50Q2xpZW50LnF1ZXJ5KHBhcmFtcykucHJvbWlzZSgpO1xuICAgICAgY29uc3QgaXRlbXMgPSBkYXRhLkl0ZW1zO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbXMpXG4gICAgICB9XG4gICAgICBcbiAgICAgIHJldHVybiByZXNwb25zZVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHJlc3BvbnNlLFxuICAgICAgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuaW5mbyhlKVxuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6ICA1MDAsXG4gICAgICAgIGJvZHk6IGUgPT09IDUwMCA/ICdJbnZhbGlkIFJlcXVlc3QgQm9keScgOiBlLFxuICAgICAgfTtcbiAgfVxufTtcblxuIl19