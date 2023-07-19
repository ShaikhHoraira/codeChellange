"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const AWS = require("aws-sdk");
const tableName = process.env.TODO_TABLE_NAME;
const documentClient = new AWS.DynamoDB.DocumentClient({
    region: process.env.region,
});
const handler = async (event) => {
    console.info(event.queryStringParameters.userId);
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
            ':userId': event.queryStringParameters.userId,
        },
        TableName: tableName,
    };
    // const params = {
    //   IndexName: 'SuburbIndex',
    //   KeyConditionExpression: 'UserId = :userId AND #suburb = :suburb',
    //   ExpressionAttributeValues: {
    //     ':userId': '1',
    //     ':suburb': 'Maribyrnong',
    //   },
    //   ExpressionAttributeNames: {
    //     '#suburb': 'Suburb',
    //   },
    //   TableName: tableName!,
    // };
    // const params = {
    //   IndexName: 'SuburbIndex',
    //   KeyConditionExpression: 'UserId = :userId AND #suburb = :suburb',
    //   ExpressionAttributeValues: {
    //     ':userId': '1',
    //     ':suburb': 'Maribyrnong',
    //   },
    //   ExpressionAttributeNames: {
    //     '#suburb': 'Suburb',
    //   },
    //   TableName: tableName!,
    //   ConsistentRead: false, // Enable eventual consistency
    // };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsK0JBQThCO0FBRzlCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFBO0FBRTdDLE1BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7SUFDckQsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTTtDQUMzQixDQUFDLENBQUM7QUFDSSxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVyxFQUFFLEVBQUU7SUFDcEQsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDaEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkMsbUJBQW1CO0lBQ25CLGNBQWM7SUFDZCxrQ0FBa0M7SUFDbEMsVUFBVTtJQUNWLHVEQUF1RDtJQUN2RCx5QkFBeUI7SUFDekIsZ0RBQWdEO0lBQ2hELGdDQUFnQztJQUNoQywwQkFBMEI7SUFDMUIsT0FBTztJQUNQLGlDQUFpQztJQUNqQyxzQkFBc0I7SUFDdEIsT0FBTztJQUNQLDJCQUEyQjtJQUMzQixLQUFLO0lBQ0wsbUJBQW1CO0lBQ25CLHlCQUF5QjtJQUN6QixpREFBaUQ7SUFDakQsZ0NBQWdDO0lBQ2hDLDBCQUEwQjtJQUMxQixPQUFPO0lBQ1AsaUNBQWlDO0lBQ2pDLHNCQUFzQjtJQUN0QixPQUFPO0lBQ1AsMkJBQTJCO0lBQzNCLEtBQUs7SUFDTCxNQUFNLE1BQU0sR0FBRztRQUNiLFNBQVMsRUFBRSxhQUFhO1FBQ3hCLHNCQUFzQixFQUFFLGtCQUFrQjtRQUMxQyx5QkFBeUIsRUFBRTtZQUN6QixTQUFTLEVBQUUsS0FBSyxDQUFDLHFCQUFxQixDQUFDLE1BQU07U0FDOUM7UUFDRCxTQUFTLEVBQUUsU0FBVTtLQUN0QixDQUFDO0lBQ0YsbUJBQW1CO0lBQ25CLDhCQUE4QjtJQUM5QixzRUFBc0U7SUFDdEUsaUNBQWlDO0lBQ2pDLHNCQUFzQjtJQUN0QixnQ0FBZ0M7SUFDaEMsT0FBTztJQUNQLGdDQUFnQztJQUNoQywyQkFBMkI7SUFDM0IsT0FBTztJQUNQLDJCQUEyQjtJQUMzQixLQUFLO0lBRUwsbUJBQW1CO0lBQ25CLDhCQUE4QjtJQUM5QixzRUFBc0U7SUFDdEUsaUNBQWlDO0lBQ2pDLHNCQUFzQjtJQUN0QixnQ0FBZ0M7SUFDaEMsT0FBTztJQUNQLGdDQUFnQztJQUNoQywyQkFBMkI7SUFDM0IsT0FBTztJQUNQLDJCQUEyQjtJQUMzQiwwREFBMEQ7SUFDMUQsS0FBSztJQUlMLElBQUk7UUFDRixJQUFJLFFBQVEsQ0FBQztRQUNaLElBQUksS0FBSyxDQUFDLFVBQVUsS0FBSyxLQUFLLEVBQUM7WUFDOUIseURBQXlEO1lBQ3pELHlCQUF5QjtZQUN6Qix3QkFBd0I7WUFDeEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxjQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzFELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDekIsTUFBTSxRQUFRLEdBQUc7Z0JBQ2YsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO2FBQzVCLENBQUE7WUFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDdEMsT0FBTyxRQUFRLENBQUE7U0FDaEI7UUFDRCxPQUFPO1lBQ0gsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsUUFBUTtTQUNmLENBQUM7S0FDTDtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNmLE9BQU87WUFDSCxVQUFVLEVBQUcsR0FBRztZQUNoQixJQUFJLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0MsQ0FBQztLQUNMO0FBQ0gsQ0FBQyxDQUFDO0FBNUZXLFFBQUEsT0FBTyxXQTRGbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcbmltcG9ydCAqIGFzIEFXUyBmcm9tIFwiYXdzLXNka1wiXG5cblxuY29uc3QgdGFibGVOYW1lID0gcHJvY2Vzcy5lbnYuVE9ET19UQUJMRV9OQU1FXG5cbmNvbnN0IGRvY3VtZW50Q2xpZW50ID0gbmV3IEFXUy5EeW5hbW9EQi5Eb2N1bWVudENsaWVudCh7XG4gIHJlZ2lvbjogcHJvY2Vzcy5lbnYucmVnaW9uLFxufSk7XG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudCA6IGFueSkgPT4ge1xuICBjb25zb2xlLmluZm8oZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzLnVzZXJJZClcbiAgY29uc3QgYm9keXByYW0gPSBKU09OLnBhcnNlKGV2ZW50LmJvZHkpXG4gIC8vIGNvbnN0IHBhcmFtcyA9IHtcbiAgLy8gICAvLyBLZXk6IHtcbiAgLy8gICAvLyAgIFVzZXJJZDogYm9keXByYW0udXNlcklkLFxuICAvLyAgIC8vIH0sXG4gIC8vICAgLy9BdHRyaWJ1dGVzVG9HZXQ6IFsnQWRkcmVzcycsICdTdWJ1cmInLCAnU3RhdGUnXSxcbiAgLy8gICBJbmRleE5hbWU6ICdVc2VySWQnLFxuICAvLyAgIEtleUNvbmRpdGlvbkV4cHJlc3Npb246ICd1c2VySWQgPSA6dXNlcklkJyxcbiAgLy8gICBFeHByZXNzaW9uQXR0cmlidXRlTmFtZXM6IHtcbiAgLy8gICAgICcjdXNlcklkJzogJ1VzZXJJZCdcbiAgLy8gICB9LFxuICAvLyAgIEV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXM6IHtcbiAgLy8gICAgICc6dXNlcklkJzogJzEnLFxuICAvLyAgIH0sXG4gIC8vICAgVGFibGVOYW1lOiB0YWJsZU5hbWUhLFxuICAvLyB9O1xuICAvLyBjb25zdCBwYXJhbXMgPSB7XG4gIC8vICAgSW5kZXhOYW1lOiAnVXNlcklkJyxcbiAgLy8gICBLZXlDb25kaXRpb25FeHByZXNzaW9uOiAnI3VzZXJJZCA9IDp1c2VySWQnLFxuICAvLyAgIEV4cHJlc3Npb25BdHRyaWJ1dGVOYW1lczoge1xuICAvLyAgICAgJyN1c2VySWQnOiAnVXNlcklkJ1xuICAvLyAgIH0sXG4gIC8vICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xuICAvLyAgICAgJzp1c2VySWQnOiAnMScsXG4gIC8vICAgfSxcbiAgLy8gICBUYWJsZU5hbWU6IHRhYmxlTmFtZSEsXG4gIC8vIH07XG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICBJbmRleE5hbWU6ICdVc2VySWRJbmRleCcsIC8vIFVwZGF0ZSB3aXRoIHRoZSBjb3JyZWN0IGluZGV4IG5hbWVcbiAgICBLZXlDb25kaXRpb25FeHByZXNzaW9uOiAnVXNlcklkID0gOnVzZXJJZCcsXG4gICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xuICAgICAgJzp1c2VySWQnOiBldmVudC5xdWVyeVN0cmluZ1BhcmFtZXRlcnMudXNlcklkLFxuICAgIH0sXG4gICAgVGFibGVOYW1lOiB0YWJsZU5hbWUhLFxuICB9O1xuICAvLyBjb25zdCBwYXJhbXMgPSB7XG4gIC8vICAgSW5kZXhOYW1lOiAnU3VidXJiSW5kZXgnLFxuICAvLyAgIEtleUNvbmRpdGlvbkV4cHJlc3Npb246ICdVc2VySWQgPSA6dXNlcklkIEFORCAjc3VidXJiID0gOnN1YnVyYicsXG4gIC8vICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xuICAvLyAgICAgJzp1c2VySWQnOiAnMScsXG4gIC8vICAgICAnOnN1YnVyYic6ICdNYXJpYnlybm9uZycsXG4gIC8vICAgfSxcbiAgLy8gICBFeHByZXNzaW9uQXR0cmlidXRlTmFtZXM6IHtcbiAgLy8gICAgICcjc3VidXJiJzogJ1N1YnVyYicsXG4gIC8vICAgfSxcbiAgLy8gICBUYWJsZU5hbWU6IHRhYmxlTmFtZSEsXG4gIC8vIH07XG4gIFxuICAvLyBjb25zdCBwYXJhbXMgPSB7XG4gIC8vICAgSW5kZXhOYW1lOiAnU3VidXJiSW5kZXgnLFxuICAvLyAgIEtleUNvbmRpdGlvbkV4cHJlc3Npb246ICdVc2VySWQgPSA6dXNlcklkIEFORCAjc3VidXJiID0gOnN1YnVyYicsXG4gIC8vICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xuICAvLyAgICAgJzp1c2VySWQnOiAnMScsXG4gIC8vICAgICAnOnN1YnVyYic6ICdNYXJpYnlybm9uZycsXG4gIC8vICAgfSxcbiAgLy8gICBFeHByZXNzaW9uQXR0cmlidXRlTmFtZXM6IHtcbiAgLy8gICAgICcjc3VidXJiJzogJ1N1YnVyYicsXG4gIC8vICAgfSxcbiAgLy8gICBUYWJsZU5hbWU6IHRhYmxlTmFtZSEsXG4gIC8vICAgQ29uc2lzdGVudFJlYWQ6IGZhbHNlLCAvLyBFbmFibGUgZXZlbnR1YWwgY29uc2lzdGVuY3lcbiAgLy8gfTtcbiAgXG4gIFxuICBcbiAgdHJ5IHtcbiAgICBsZXQgcmVzcG9uc2U7XG4gICAgIGlmIChldmVudC5odHRwTWV0aG9kID09PSBcIkdFVFwiKXtcbiAgICAgIC8vIHJlc3BvbnNlID0gYXdhaXQgZG9jdW1lbnRDbGllbnQuZ2V0KHBhcmFtcykucHJvbWlzZSgpO1xuICAgICAgLy8gY29uc29sZS5pbmZvKHJlc3BvbnNlKVxuICAgICAgLy8gcmV0dXJuIHJlc3BvbnNlLkl0ZW07XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgZG9jdW1lbnRDbGllbnQucXVlcnkocGFyYW1zKS5wcm9taXNlKCk7XG4gICAgICBjb25zdCBpdGVtcyA9IGRhdGEuSXRlbXM7XG4gICAgICBjb25zdCByZXNwb25zZSA9IHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtcylcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUuaW5mbyhgYm9keTogJHtyZXNwb25zZS5ib2R5fWApXG4gICAgICByZXR1cm4gcmVzcG9uc2VcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiByZXNwb25zZSxcbiAgICAgIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmluZm8oZSlcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAgNTAwLFxuICAgICAgICBib2R5OiBlID09PSA1MDAgPyAnSW52YWxpZCBSZXF1ZXN0IEJvZHknIDogZSxcbiAgICAgIH07XG4gIH1cbn07XG5cbiJdfQ==