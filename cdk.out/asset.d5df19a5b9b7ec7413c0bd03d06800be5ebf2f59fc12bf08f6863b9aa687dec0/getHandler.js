"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const AWS = require("aws-sdk");
const tableName = process.env.TODO_TABLE_NAME;
const documentClient = new AWS.DynamoDB.DocumentClient({
    region: process.env.region,
});
const handler = async (event) => {
    console.info(event);
    const bodypram = JSON.parse(event.body);
    const params = {
        // Key: {
        //   UserId: bodypram.userId,
        // },
        //AttributesToGet: ['pushNotification', 'notificationType', 'notificationSubType'],
        IndexName: 'UserId',
        KeyConditionExpression: 'UserId = :UserId',
        ExpressionAttributeValues: {
            ':UserId': 1,
        },
        TableName: tableName,
    };
    try {
        let response;
        if (event.httpMethod === "GET") {
            // response = await documentClient.get(params).promise();
            // console.info(response)
            // return response.Item;
            const data = await documentClient.scan(params).promise();
            const items = data.Items;
            const response = {
                statusCode: 200,
                body: JSON.stringify(items)
            };
            console.info(`body: ${response.body}`);
            return response;
        }
        return {
            statusCode: 200,
            body: response,
        };
    }
    catch (e) {
        return {
            statusCode: 500,
            body: e === 500 ? 'Invalid Request Body' : 'Something went wrong',
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsK0JBQThCO0FBRzlCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFBO0FBRTdDLE1BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7SUFDckQsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTTtDQUMzQixDQUFDLENBQUM7QUFDSSxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVyxFQUFFLEVBQUU7SUFDcEQsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNuQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QyxNQUFNLE1BQU0sR0FBRztRQUNiLFNBQVM7UUFDVCw2QkFBNkI7UUFDN0IsS0FBSztRQUNMLG1GQUFtRjtRQUNuRixTQUFTLEVBQUUsUUFBUTtRQUNuQixzQkFBc0IsRUFBRSxrQkFBa0I7UUFDMUMseUJBQXlCLEVBQUU7WUFDekIsU0FBUyxFQUFFLENBQUM7U0FDYjtRQUNELFNBQVMsRUFBRSxTQUFVO0tBQ3RCLENBQUM7SUFHRixJQUFJO1FBQ0YsSUFBSSxRQUFRLENBQUM7UUFDWixJQUFJLEtBQUssQ0FBQyxVQUFVLEtBQUssS0FBSyxFQUFDO1lBQzlCLHlEQUF5RDtZQUN6RCx5QkFBeUI7WUFDekIsd0JBQXdCO1lBQ3hCLE1BQU0sSUFBSSxHQUFHLE1BQU0sY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN6RCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3pCLE1BQU0sUUFBUSxHQUFHO2dCQUNmLFVBQVUsRUFBRSxHQUFHO2dCQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQzthQUM1QixDQUFBO1lBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3RDLE9BQU8sUUFBUSxDQUFBO1NBRWhCO1FBQ0QsT0FBTztZQUNILFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLFFBQVE7U0FDZixDQUFDO0tBQ0w7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU87WUFDSCxVQUFVLEVBQUcsR0FBRztZQUNoQixJQUFJLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtTQUNsRSxDQUFDO0tBQ0w7QUFDSCxDQUFDLENBQUM7QUEzQ1csUUFBQSxPQUFPLFdBMkNsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuaW1wb3J0ICogYXMgQVdTIGZyb20gXCJhd3Mtc2RrXCJcblxuXG5jb25zdCB0YWJsZU5hbWUgPSBwcm9jZXNzLmVudi5UT0RPX1RBQkxFX05BTUVcblxuY29uc3QgZG9jdW1lbnRDbGllbnQgPSBuZXcgQVdTLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50KHtcbiAgcmVnaW9uOiBwcm9jZXNzLmVudi5yZWdpb24sXG59KTtcbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBIYW5kbGVyID0gYXN5bmMgKGV2ZW50IDogYW55KSA9PiB7XG4gIGNvbnNvbGUuaW5mbyhldmVudClcbiAgY29uc3QgYm9keXByYW0gPSBKU09OLnBhcnNlKGV2ZW50LmJvZHkpXG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAvLyBLZXk6IHtcbiAgICAvLyAgIFVzZXJJZDogYm9keXByYW0udXNlcklkLFxuICAgIC8vIH0sXG4gICAgLy9BdHRyaWJ1dGVzVG9HZXQ6IFsncHVzaE5vdGlmaWNhdGlvbicsICdub3RpZmljYXRpb25UeXBlJywgJ25vdGlmaWNhdGlvblN1YlR5cGUnXSxcbiAgICBJbmRleE5hbWU6ICdVc2VySWQnLFxuICAgIEtleUNvbmRpdGlvbkV4cHJlc3Npb246ICdVc2VySWQgPSA6VXNlcklkJyxcbiAgICBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzOiB7XG4gICAgICAnOlVzZXJJZCc6IDEsXG4gICAgfSxcbiAgICBUYWJsZU5hbWU6IHRhYmxlTmFtZSEsXG4gIH07XG5cblxuICB0cnkge1xuICAgIGxldCByZXNwb25zZTtcbiAgICAgaWYgKGV2ZW50Lmh0dHBNZXRob2QgPT09IFwiR0VUXCIpe1xuICAgICAgLy8gcmVzcG9uc2UgPSBhd2FpdCBkb2N1bWVudENsaWVudC5nZXQocGFyYW1zKS5wcm9taXNlKCk7XG4gICAgICAvLyBjb25zb2xlLmluZm8ocmVzcG9uc2UpXG4gICAgICAvLyByZXR1cm4gcmVzcG9uc2UuSXRlbTtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBkb2N1bWVudENsaWVudC5zY2FuKHBhcmFtcykucHJvbWlzZSgpO1xuICAgICAgY29uc3QgaXRlbXMgPSBkYXRhLkl0ZW1zO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbXMpXG4gICAgICB9XG4gICAgICBjb25zb2xlLmluZm8oYGJvZHk6ICR7cmVzcG9uc2UuYm9keX1gKVxuICAgICAgcmV0dXJuIHJlc3BvbnNlXG5cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiByZXNwb25zZSxcbiAgICAgIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAgNTAwLFxuICAgICAgICBib2R5OiBlID09PSA1MDAgPyAnSW52YWxpZCBSZXF1ZXN0IEJvZHknIDogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyxcbiAgICAgIH07XG4gIH1cbn07XG5cbiJdfQ==