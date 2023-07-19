"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const AWS = require("aws-sdk");
const tableName = process.env.TODO_TABLE_NAME;
const documentClient = new AWS.DynamoDB.DocumentClient({
    region: process.env.region,
});
const handler = async (event) => {
    //console.info(event.queryStringParameters.userId)
    // const params = {
    //   IndexName: 'UserIdIndex', // Update with the correct index name
    //   KeyConditionExpression: 'UserId = :userId',
    //   ExpressionAttributeValues: {
    //     ':userId': event.queryStringParameters.userId,
    //   },
    //   TableName: tableName!,
    // };
    const params1 = {
        TableName: tableName,
    };
    try {
        let response;
        if (event.httpMethod === "GET") {
            // response = await documentClient.get(params).promise();
            // console.info(response)
            // return response.Item;
            const data = await documentClient.query(params1).promise();
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
        console.info(e);
        return {
            statusCode: 500,
            body: e === 500 ? 'Invalid Request Body' : e,
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsK0JBQThCO0FBRzlCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFBO0FBRTdDLE1BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7SUFDckQsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTTtDQUMzQixDQUFDLENBQUM7QUFDSSxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVyxFQUFFLEVBQUU7SUFDcEQsa0RBQWtEO0lBQ2xELG1CQUFtQjtJQUNuQixvRUFBb0U7SUFDcEUsZ0RBQWdEO0lBQ2hELGlDQUFpQztJQUNqQyxxREFBcUQ7SUFDckQsT0FBTztJQUNQLDJCQUEyQjtJQUMzQixLQUFLO0lBQ0wsTUFBTSxPQUFPLEdBQUc7UUFFZCxTQUFTLEVBQUUsU0FBVTtLQUN0QixDQUFDO0lBQ0YsSUFBSTtRQUNGLElBQUksUUFBUSxDQUFDO1FBQ1osSUFBSSxLQUFLLENBQUMsVUFBVSxLQUFLLEtBQUssRUFBQztZQUM5Qix5REFBeUQ7WUFDekQseUJBQXlCO1lBQ3pCLHdCQUF3QjtZQUN4QixNQUFNLElBQUksR0FBRyxNQUFNLGNBQWMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDM0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN6QixNQUFNLFFBQVEsR0FBRztnQkFDZixVQUFVLEVBQUUsR0FBRztnQkFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7YUFDNUIsQ0FBQTtZQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUN0QyxPQUFPLFFBQVEsQ0FBQTtTQUNoQjtRQUNELE9BQU87WUFDSCxVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxRQUFRO1NBQ2YsQ0FBQztLQUNMO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2YsT0FBTztZQUNILFVBQVUsRUFBRyxHQUFHO1lBQ2hCLElBQUksRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3QyxDQUFDO0tBQ0w7QUFDSCxDQUFDLENBQUM7QUF4Q1csUUFBQSxPQUFPLFdBd0NsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuaW1wb3J0ICogYXMgQVdTIGZyb20gXCJhd3Mtc2RrXCJcblxuXG5jb25zdCB0YWJsZU5hbWUgPSBwcm9jZXNzLmVudi5UT0RPX1RBQkxFX05BTUVcblxuY29uc3QgZG9jdW1lbnRDbGllbnQgPSBuZXcgQVdTLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50KHtcbiAgcmVnaW9uOiBwcm9jZXNzLmVudi5yZWdpb24sXG59KTtcbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBIYW5kbGVyID0gYXN5bmMgKGV2ZW50IDogYW55KSA9PiB7XG4gIC8vY29uc29sZS5pbmZvKGV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycy51c2VySWQpXG4gIC8vIGNvbnN0IHBhcmFtcyA9IHtcbiAgLy8gICBJbmRleE5hbWU6ICdVc2VySWRJbmRleCcsIC8vIFVwZGF0ZSB3aXRoIHRoZSBjb3JyZWN0IGluZGV4IG5hbWVcbiAgLy8gICBLZXlDb25kaXRpb25FeHByZXNzaW9uOiAnVXNlcklkID0gOnVzZXJJZCcsXG4gIC8vICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xuICAvLyAgICAgJzp1c2VySWQnOiBldmVudC5xdWVyeVN0cmluZ1BhcmFtZXRlcnMudXNlcklkLFxuICAvLyAgIH0sXG4gIC8vICAgVGFibGVOYW1lOiB0YWJsZU5hbWUhLFxuICAvLyB9O1xuICBjb25zdCBwYXJhbXMxID0ge1xuICAgIFxuICAgIFRhYmxlTmFtZTogdGFibGVOYW1lISxcbiAgfTtcbiAgdHJ5IHtcbiAgICBsZXQgcmVzcG9uc2U7XG4gICAgIGlmIChldmVudC5odHRwTWV0aG9kID09PSBcIkdFVFwiKXtcbiAgICAgIC8vIHJlc3BvbnNlID0gYXdhaXQgZG9jdW1lbnRDbGllbnQuZ2V0KHBhcmFtcykucHJvbWlzZSgpO1xuICAgICAgLy8gY29uc29sZS5pbmZvKHJlc3BvbnNlKVxuICAgICAgLy8gcmV0dXJuIHJlc3BvbnNlLkl0ZW07XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgZG9jdW1lbnRDbGllbnQucXVlcnkocGFyYW1zMSkucHJvbWlzZSgpO1xuICAgICAgY29uc3QgaXRlbXMgPSBkYXRhLkl0ZW1zO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbXMpXG4gICAgICB9XG4gICAgICBjb25zb2xlLmluZm8oYGJvZHk6ICR7cmVzcG9uc2UuYm9keX1gKVxuICAgICAgcmV0dXJuIHJlc3BvbnNlXG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keTogcmVzcG9uc2UsXG4gICAgICB9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5pbmZvKGUpXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogIDUwMCxcbiAgICAgICAgYm9keTogZSA9PT0gNTAwID8gJ0ludmFsaWQgUmVxdWVzdCBCb2R5JyA6IGUsXG4gICAgICB9O1xuICB9XG59O1xuXG4iXX0=