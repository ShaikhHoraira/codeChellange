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
    // const params = {
    //   // Key: {
    //   //   UserId: bodypram.userId,
    //   // },
    //   //AttributesToGet: ['Address', 'Suburb', 'State'],
    //   IndexName: 'UserId',
    //   KeyConditionExpression: 'userId = :userId',
    //   ExpressionAttributeNames: {
    //     '#userId': 'UserId'
    //   },
    //   ExpressionAttributeValues: {
    //     ':userId': '1',
    //   },
    //   TableName: tableName!,
    // };
    // const params = {
    //   IndexName: 'UserId',
    //   KeyConditionExpression: '#userId = :userId',
    //   ExpressionAttributeNames: {
    //     '#userId': 'UserId'
    //   },
    //   ExpressionAttributeValues: {
    //     ':userId': '1',
    //   },
    //   TableName: tableName!,
    // };
    const params = {
        IndexName: 'UserIdIndex',
        KeyConditionExpression: 'UserId = :userId',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsK0JBQThCO0FBRzlCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFBO0FBRTdDLE1BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7SUFDckQsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTTtDQUMzQixDQUFDLENBQUM7QUFDSSxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVyxFQUFFLEVBQUU7SUFDcEQsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNuQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QyxtQkFBbUI7SUFDbkIsY0FBYztJQUNkLGtDQUFrQztJQUNsQyxVQUFVO0lBQ1YsdURBQXVEO0lBQ3ZELHlCQUF5QjtJQUN6QixnREFBZ0Q7SUFDaEQsZ0NBQWdDO0lBQ2hDLDBCQUEwQjtJQUMxQixPQUFPO0lBQ1AsaUNBQWlDO0lBQ2pDLHNCQUFzQjtJQUN0QixPQUFPO0lBQ1AsMkJBQTJCO0lBQzNCLEtBQUs7SUFDTCxtQkFBbUI7SUFDbkIseUJBQXlCO0lBQ3pCLGlEQUFpRDtJQUNqRCxnQ0FBZ0M7SUFDaEMsMEJBQTBCO0lBQzFCLE9BQU87SUFDUCxpQ0FBaUM7SUFDakMsc0JBQXNCO0lBQ3RCLE9BQU87SUFDUCwyQkFBMkI7SUFDM0IsS0FBSztJQUNMLE1BQU0sTUFBTSxHQUFHO1FBQ2IsU0FBUyxFQUFFLGFBQWE7UUFDeEIsc0JBQXNCLEVBQUUsa0JBQWtCO1FBQzFDLHlCQUF5QixFQUFFO1lBQ3pCLFNBQVMsRUFBRSxHQUFHO1NBQ2Y7UUFDRCxTQUFTLEVBQUUsU0FBVTtLQUN0QixDQUFDO0lBR0YsSUFBSTtRQUNGLElBQUksUUFBUSxDQUFDO1FBQ1osSUFBSSxLQUFLLENBQUMsVUFBVSxLQUFLLEtBQUssRUFBQztZQUM5Qix5REFBeUQ7WUFDekQseUJBQXlCO1lBQ3pCLHdCQUF3QjtZQUN4QixNQUFNLElBQUksR0FBRyxNQUFNLGNBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDMUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN6QixNQUFNLFFBQVEsR0FBRztnQkFDZixVQUFVLEVBQUUsR0FBRztnQkFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7YUFDNUIsQ0FBQTtZQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUN0QyxPQUFPLFFBQVEsQ0FBQTtTQUNoQjtRQUNELE9BQU87WUFDSCxVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxRQUFRO1NBQ2YsQ0FBQztLQUNMO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2YsT0FBTztZQUNILFVBQVUsRUFBRyxHQUFHO1lBQ2hCLElBQUksRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3QyxDQUFDO0tBQ0w7QUFDSCxDQUFDLENBQUM7QUFqRVcsUUFBQSxPQUFPLFdBaUVsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuaW1wb3J0ICogYXMgQVdTIGZyb20gXCJhd3Mtc2RrXCJcblxuXG5jb25zdCB0YWJsZU5hbWUgPSBwcm9jZXNzLmVudi5UT0RPX1RBQkxFX05BTUVcblxuY29uc3QgZG9jdW1lbnRDbGllbnQgPSBuZXcgQVdTLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50KHtcbiAgcmVnaW9uOiBwcm9jZXNzLmVudi5yZWdpb24sXG59KTtcbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBIYW5kbGVyID0gYXN5bmMgKGV2ZW50IDogYW55KSA9PiB7XG4gIGNvbnNvbGUuaW5mbyhldmVudClcbiAgY29uc3QgYm9keXByYW0gPSBKU09OLnBhcnNlKGV2ZW50LmJvZHkpXG4gIC8vIGNvbnN0IHBhcmFtcyA9IHtcbiAgLy8gICAvLyBLZXk6IHtcbiAgLy8gICAvLyAgIFVzZXJJZDogYm9keXByYW0udXNlcklkLFxuICAvLyAgIC8vIH0sXG4gIC8vICAgLy9BdHRyaWJ1dGVzVG9HZXQ6IFsnQWRkcmVzcycsICdTdWJ1cmInLCAnU3RhdGUnXSxcbiAgLy8gICBJbmRleE5hbWU6ICdVc2VySWQnLFxuICAvLyAgIEtleUNvbmRpdGlvbkV4cHJlc3Npb246ICd1c2VySWQgPSA6dXNlcklkJyxcbiAgLy8gICBFeHByZXNzaW9uQXR0cmlidXRlTmFtZXM6IHtcbiAgLy8gICAgICcjdXNlcklkJzogJ1VzZXJJZCdcbiAgLy8gICB9LFxuICAvLyAgIEV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXM6IHtcbiAgLy8gICAgICc6dXNlcklkJzogJzEnLFxuICAvLyAgIH0sXG4gIC8vICAgVGFibGVOYW1lOiB0YWJsZU5hbWUhLFxuICAvLyB9O1xuICAvLyBjb25zdCBwYXJhbXMgPSB7XG4gIC8vICAgSW5kZXhOYW1lOiAnVXNlcklkJyxcbiAgLy8gICBLZXlDb25kaXRpb25FeHByZXNzaW9uOiAnI3VzZXJJZCA9IDp1c2VySWQnLFxuICAvLyAgIEV4cHJlc3Npb25BdHRyaWJ1dGVOYW1lczoge1xuICAvLyAgICAgJyN1c2VySWQnOiAnVXNlcklkJ1xuICAvLyAgIH0sXG4gIC8vICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xuICAvLyAgICAgJzp1c2VySWQnOiAnMScsXG4gIC8vICAgfSxcbiAgLy8gICBUYWJsZU5hbWU6IHRhYmxlTmFtZSEsXG4gIC8vIH07XG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICBJbmRleE5hbWU6ICdVc2VySWRJbmRleCcsIC8vIFVwZGF0ZSB3aXRoIHRoZSBjb3JyZWN0IGluZGV4IG5hbWVcbiAgICBLZXlDb25kaXRpb25FeHByZXNzaW9uOiAnVXNlcklkID0gOnVzZXJJZCcsXG4gICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xuICAgICAgJzp1c2VySWQnOiAnMScsXG4gICAgfSxcbiAgICBUYWJsZU5hbWU6IHRhYmxlTmFtZSEsXG4gIH07XG4gIFxuICBcbiAgdHJ5IHtcbiAgICBsZXQgcmVzcG9uc2U7XG4gICAgIGlmIChldmVudC5odHRwTWV0aG9kID09PSBcIkdFVFwiKXtcbiAgICAgIC8vIHJlc3BvbnNlID0gYXdhaXQgZG9jdW1lbnRDbGllbnQuZ2V0KHBhcmFtcykucHJvbWlzZSgpO1xuICAgICAgLy8gY29uc29sZS5pbmZvKHJlc3BvbnNlKVxuICAgICAgLy8gcmV0dXJuIHJlc3BvbnNlLkl0ZW07XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgZG9jdW1lbnRDbGllbnQucXVlcnkocGFyYW1zKS5wcm9taXNlKCk7XG4gICAgICBjb25zdCBpdGVtcyA9IGRhdGEuSXRlbXM7XG4gICAgICBjb25zdCByZXNwb25zZSA9IHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtcylcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUuaW5mbyhgYm9keTogJHtyZXNwb25zZS5ib2R5fWApXG4gICAgICByZXR1cm4gcmVzcG9uc2VcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiByZXNwb25zZSxcbiAgICAgIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmluZm8oZSlcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAgNTAwLFxuICAgICAgICBib2R5OiBlID09PSA1MDAgPyAnSW52YWxpZCBSZXF1ZXN0IEJvZHknIDogZSxcbiAgICAgIH07XG4gIH1cbn07XG5cbiJdfQ==