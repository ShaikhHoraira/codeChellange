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
        AttributesToGet: ['Address', 'Suburb', 'State'],
        IndexName: 'UserId',
        KeyConditionExpression: 'UserId = :userId',
        ExpressionAttributeNames: {
            'UserId': 'UserId'
        },
        ExpressionAttributeValues: {
            ':userId': '1',
        },
        TableName: tableName,
    };
    try {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsK0JBQThCO0FBRzlCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFBO0FBRTdDLE1BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7SUFDckQsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTTtDQUMzQixDQUFDLENBQUM7QUFDSSxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVyxFQUFFLEVBQUU7SUFDcEQsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNuQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QyxNQUFNLE1BQU0sR0FBRztRQUNiLFNBQVM7UUFDVCw2QkFBNkI7UUFDN0IsS0FBSztRQUNMLGVBQWUsRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDO1FBQy9DLFNBQVMsRUFBRSxRQUFRO1FBQ25CLHNCQUFzQixFQUFFLGtCQUFrQjtRQUMxQyx3QkFBd0IsRUFBRTtZQUN4QixRQUFRLEVBQUUsUUFBUTtTQUNyQjtRQUNDLHlCQUF5QixFQUFFO1lBQ3pCLFNBQVMsRUFBRSxHQUFHO1NBQ2Y7UUFDRCxTQUFTLEVBQUUsU0FBVTtLQUN0QixDQUFDO0lBRUYsSUFBSTtRQUNGLElBQUksUUFBUSxDQUFDO1FBQ1osSUFBSSxLQUFLLENBQUMsVUFBVSxLQUFLLEtBQUssRUFBQztZQUM5Qix5REFBeUQ7WUFDekQseUJBQXlCO1lBQ3pCLHdCQUF3QjtZQUN4QixNQUFNLElBQUksR0FBRyxNQUFNLGNBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDMUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN6QixNQUFNLFFBQVEsR0FBRztnQkFDZixVQUFVLEVBQUUsR0FBRztnQkFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7YUFDNUIsQ0FBQTtZQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUN0QyxPQUFPLFFBQVEsQ0FBQTtTQUNoQjtRQUNELE9BQU87WUFDSCxVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxRQUFRO1NBQ2YsQ0FBQztLQUNMO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2YsT0FBTztZQUNILFVBQVUsRUFBRyxHQUFHO1lBQ2hCLElBQUksRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3QyxDQUFDO0tBQ0w7QUFDSCxDQUFDLENBQUM7QUE3Q1csUUFBQSxPQUFPLFdBNkNsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuaW1wb3J0ICogYXMgQVdTIGZyb20gXCJhd3Mtc2RrXCJcblxuXG5jb25zdCB0YWJsZU5hbWUgPSBwcm9jZXNzLmVudi5UT0RPX1RBQkxFX05BTUVcblxuY29uc3QgZG9jdW1lbnRDbGllbnQgPSBuZXcgQVdTLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50KHtcbiAgcmVnaW9uOiBwcm9jZXNzLmVudi5yZWdpb24sXG59KTtcbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBIYW5kbGVyID0gYXN5bmMgKGV2ZW50IDogYW55KSA9PiB7XG4gIGNvbnNvbGUuaW5mbyhldmVudClcbiAgY29uc3QgYm9keXByYW0gPSBKU09OLnBhcnNlKGV2ZW50LmJvZHkpXG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAvLyBLZXk6IHtcbiAgICAvLyAgIFVzZXJJZDogYm9keXByYW0udXNlcklkLFxuICAgIC8vIH0sXG4gICAgQXR0cmlidXRlc1RvR2V0OiBbJ0FkZHJlc3MnLCAnU3VidXJiJywgJ1N0YXRlJ10sXG4gICAgSW5kZXhOYW1lOiAnVXNlcklkJyxcbiAgICBLZXlDb25kaXRpb25FeHByZXNzaW9uOiAnVXNlcklkID0gOnVzZXJJZCcsXG4gICAgRXhwcmVzc2lvbkF0dHJpYnV0ZU5hbWVzOiB7XG4gICAgICAnVXNlcklkJzogJ1VzZXJJZCdcbiAgfSxcbiAgICBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzOiB7XG4gICAgICAnOnVzZXJJZCc6ICcxJyxcbiAgICB9LFxuICAgIFRhYmxlTmFtZTogdGFibGVOYW1lISxcbiAgfTtcblxuICB0cnkge1xuICAgIGxldCByZXNwb25zZTtcbiAgICAgaWYgKGV2ZW50Lmh0dHBNZXRob2QgPT09IFwiR0VUXCIpe1xuICAgICAgLy8gcmVzcG9uc2UgPSBhd2FpdCBkb2N1bWVudENsaWVudC5nZXQocGFyYW1zKS5wcm9taXNlKCk7XG4gICAgICAvLyBjb25zb2xlLmluZm8ocmVzcG9uc2UpXG4gICAgICAvLyByZXR1cm4gcmVzcG9uc2UuSXRlbTtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBkb2N1bWVudENsaWVudC5xdWVyeShwYXJhbXMpLnByb21pc2UoKTtcbiAgICAgIGNvbnN0IGl0ZW1zID0gZGF0YS5JdGVtcztcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW1zKVxuICAgICAgfVxuICAgICAgY29uc29sZS5pbmZvKGBib2R5OiAke3Jlc3BvbnNlLmJvZHl9YClcbiAgICAgIHJldHVybiByZXNwb25zZVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHJlc3BvbnNlLFxuICAgICAgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuaW5mbyhlKVxuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6ICA1MDAsXG4gICAgICAgIGJvZHk6IGUgPT09IDUwMCA/ICdJbnZhbGlkIFJlcXVlc3QgQm9keScgOiBlLFxuICAgICAgfTtcbiAgfVxufTtcblxuIl19