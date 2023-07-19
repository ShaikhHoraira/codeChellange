"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const AWS = require("aws-sdk");
const tableName = process.env.TODO_TABLE_NAME;
const documentClient = new AWS.DynamoDB.DocumentClient({
    region: process.env.region,
});
// export const handler: Handler = async (event : any) => {
//   console.info(event)
//   const bodypram = JSON.parse(event.body)
//   const params = {
//     // Key: {
//     //   UserId: bodypram.userId,
//     // },
//     //AttributesToGet: ['pushNotification', 'notificationType', 'notificationSubType'],
//     IndexName: 'UserId',
//     KeyConditionExpression: 'UserId = :UserId',
//     ExpressionAttributeValues: {
//       ':UserId': 1,
//     },
//     TableName: tableName!,
//   };
//   try {
//     let response;
//      if (event.httpMethod === "GET"){
//       // response = await documentClient.get(params).promise();
//       // console.info(response)
//       // return response.Item;
//       const data = await documentClient.query(params).promise();
//       const items = data.Items;
//       const response = {
//         statusCode: 200,
//         body: JSON.stringify(items)
//       }
//       console.info(`body: ${response.body}`)
//       return response
//     }
//     return {
//         statusCode: 200,
//         body: response,
//       };
//   } catch (e) {
//     console.info(e)
//     return {
//         statusCode:  500,
//         body: e === 500 ? 'Invalid Request Body' : e,
//       };
//   }
// };
const handler = async (event) => {
    console.info(event);
    const bodypram = JSON.parse(event.body);
    const params = {
        TableName: tableName,
        Key: {
            UserId: '1',
        },
    };
    try {
        let response;
        if (event.httpMethod === "GET") {
            // response = await documentClient.get(params).promise();
            // console.info(response)
            // return response.Item;
            const data = await documentClient.query(params).promise();
            const items = data.Items;
            response = {
                statusCode: 200,
                body: JSON.stringify(items),
            };
            console.info(`body: ${response.body}`);
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
            body: e === 500 ? "Invalid Request Body" : e,
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsK0JBQThCO0FBRzlCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFBO0FBRTdDLE1BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7SUFDckQsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTTtDQUMzQixDQUFDLENBQUM7QUFDSCwyREFBMkQ7QUFDM0Qsd0JBQXdCO0FBQ3hCLDRDQUE0QztBQUM1QyxxQkFBcUI7QUFDckIsZ0JBQWdCO0FBQ2hCLG9DQUFvQztBQUNwQyxZQUFZO0FBQ1osMEZBQTBGO0FBQzFGLDJCQUEyQjtBQUMzQixrREFBa0Q7QUFDbEQsbUNBQW1DO0FBQ25DLHNCQUFzQjtBQUN0QixTQUFTO0FBQ1QsNkJBQTZCO0FBQzdCLE9BQU87QUFHUCxVQUFVO0FBQ1Ysb0JBQW9CO0FBQ3BCLHdDQUF3QztBQUN4QyxrRUFBa0U7QUFDbEUsa0NBQWtDO0FBQ2xDLGlDQUFpQztBQUNqQyxtRUFBbUU7QUFDbkUsa0NBQWtDO0FBQ2xDLDJCQUEyQjtBQUMzQiwyQkFBMkI7QUFDM0Isc0NBQXNDO0FBQ3RDLFVBQVU7QUFDViwrQ0FBK0M7QUFDL0Msd0JBQXdCO0FBRXhCLFFBQVE7QUFDUixlQUFlO0FBQ2YsMkJBQTJCO0FBQzNCLDBCQUEwQjtBQUMxQixXQUFXO0FBQ1gsa0JBQWtCO0FBQ2xCLHNCQUFzQjtBQUN0QixlQUFlO0FBQ2YsNEJBQTRCO0FBQzVCLHdEQUF3RDtBQUN4RCxXQUFXO0FBQ1gsTUFBTTtBQUNOLEtBQUs7QUFHRSxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVSxFQUFFLEVBQUU7SUFDbkQsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxNQUFNLE1BQU0sR0FBRztRQUNiLFNBQVMsRUFBRSxTQUFVO1FBQ3JCLEdBQUcsRUFBRTtZQUNILE1BQU0sRUFBRSxHQUFHO1NBQ1o7S0FDRixDQUFDO0lBRUYsSUFBSTtRQUNGLElBQUksUUFBUSxDQUFDO1FBQ2IsSUFBSSxLQUFLLENBQUMsVUFBVSxLQUFLLEtBQUssRUFBRTtZQUM5Qix5REFBeUQ7WUFDekQseUJBQXlCO1lBQ3pCLHdCQUF3QjtZQUN4QixNQUFNLElBQUksR0FBRyxNQUFNLGNBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDMUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN6QixRQUFRLEdBQUc7Z0JBQ1QsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO2FBQzVCLENBQUM7WUFDRixPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7U0FDeEM7UUFFRCxPQUFPO1lBQ0wsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsUUFBUTtTQUNmLENBQUM7S0FDSDtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQixPQUFPO1lBQ0wsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0MsQ0FBQztLQUNIO0FBQ0gsQ0FBQyxDQUFDO0FBcENXLFFBQUEsT0FBTyxXQW9DbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcbmltcG9ydCAqIGFzIEFXUyBmcm9tIFwiYXdzLXNka1wiXG5cblxuY29uc3QgdGFibGVOYW1lID0gcHJvY2Vzcy5lbnYuVE9ET19UQUJMRV9OQU1FXG5cbmNvbnN0IGRvY3VtZW50Q2xpZW50ID0gbmV3IEFXUy5EeW5hbW9EQi5Eb2N1bWVudENsaWVudCh7XG4gIHJlZ2lvbjogcHJvY2Vzcy5lbnYucmVnaW9uLFxufSk7XG4vLyBleHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudCA6IGFueSkgPT4ge1xuLy8gICBjb25zb2xlLmluZm8oZXZlbnQpXG4vLyAgIGNvbnN0IGJvZHlwcmFtID0gSlNPTi5wYXJzZShldmVudC5ib2R5KVxuLy8gICBjb25zdCBwYXJhbXMgPSB7XG4vLyAgICAgLy8gS2V5OiB7XG4vLyAgICAgLy8gICBVc2VySWQ6IGJvZHlwcmFtLnVzZXJJZCxcbi8vICAgICAvLyB9LFxuLy8gICAgIC8vQXR0cmlidXRlc1RvR2V0OiBbJ3B1c2hOb3RpZmljYXRpb24nLCAnbm90aWZpY2F0aW9uVHlwZScsICdub3RpZmljYXRpb25TdWJUeXBlJ10sXG4vLyAgICAgSW5kZXhOYW1lOiAnVXNlcklkJyxcbi8vICAgICBLZXlDb25kaXRpb25FeHByZXNzaW9uOiAnVXNlcklkID0gOlVzZXJJZCcsXG4vLyAgICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xuLy8gICAgICAgJzpVc2VySWQnOiAxLFxuLy8gICAgIH0sXG4vLyAgICAgVGFibGVOYW1lOiB0YWJsZU5hbWUhLFxuLy8gICB9O1xuXG5cbi8vICAgdHJ5IHtcbi8vICAgICBsZXQgcmVzcG9uc2U7XG4vLyAgICAgIGlmIChldmVudC5odHRwTWV0aG9kID09PSBcIkdFVFwiKXtcbi8vICAgICAgIC8vIHJlc3BvbnNlID0gYXdhaXQgZG9jdW1lbnRDbGllbnQuZ2V0KHBhcmFtcykucHJvbWlzZSgpO1xuLy8gICAgICAgLy8gY29uc29sZS5pbmZvKHJlc3BvbnNlKVxuLy8gICAgICAgLy8gcmV0dXJuIHJlc3BvbnNlLkl0ZW07XG4vLyAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgZG9jdW1lbnRDbGllbnQucXVlcnkocGFyYW1zKS5wcm9taXNlKCk7XG4vLyAgICAgICBjb25zdCBpdGVtcyA9IGRhdGEuSXRlbXM7XG4vLyAgICAgICBjb25zdCByZXNwb25zZSA9IHtcbi8vICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuLy8gICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtcylcbi8vICAgICAgIH1cbi8vICAgICAgIGNvbnNvbGUuaW5mbyhgYm9keTogJHtyZXNwb25zZS5ib2R5fWApXG4vLyAgICAgICByZXR1cm4gcmVzcG9uc2VcblxuLy8gICAgIH1cbi8vICAgICByZXR1cm4ge1xuLy8gICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4vLyAgICAgICAgIGJvZHk6IHJlc3BvbnNlLFxuLy8gICAgICAgfTtcbi8vICAgfSBjYXRjaCAoZSkge1xuLy8gICAgIGNvbnNvbGUuaW5mbyhlKVxuLy8gICAgIHJldHVybiB7XG4vLyAgICAgICAgIHN0YXR1c0NvZGU6ICA1MDAsXG4vLyAgICAgICAgIGJvZHk6IGUgPT09IDUwMCA/ICdJbnZhbGlkIFJlcXVlc3QgQm9keScgOiBlLFxuLy8gICAgICAgfTtcbi8vICAgfVxuLy8gfTtcblxuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudDogYW55KSA9PiB7XG4gIGNvbnNvbGUuaW5mbyhldmVudCk7XG4gIGNvbnN0IGJvZHlwcmFtID0gSlNPTi5wYXJzZShldmVudC5ib2R5KTtcbiAgY29uc3QgcGFyYW1zID0ge1xuICAgIFRhYmxlTmFtZTogdGFibGVOYW1lISxcbiAgICBLZXk6IHtcbiAgICAgIFVzZXJJZDogJzEnLFxuICAgIH0sXG4gIH07XG5cbiAgdHJ5IHtcbiAgICBsZXQgcmVzcG9uc2U7XG4gICAgaWYgKGV2ZW50Lmh0dHBNZXRob2QgPT09IFwiR0VUXCIpIHtcbiAgICAgIC8vIHJlc3BvbnNlID0gYXdhaXQgZG9jdW1lbnRDbGllbnQuZ2V0KHBhcmFtcykucHJvbWlzZSgpO1xuICAgICAgLy8gY29uc29sZS5pbmZvKHJlc3BvbnNlKVxuICAgICAgLy8gcmV0dXJuIHJlc3BvbnNlLkl0ZW07XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgZG9jdW1lbnRDbGllbnQucXVlcnkocGFyYW1zKS5wcm9taXNlKCk7XG4gICAgICBjb25zdCBpdGVtcyA9IGRhdGEuSXRlbXM7XG4gICAgICByZXNwb25zZSA9IHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtcyksXG4gICAgICB9O1xuICAgICAgY29uc29sZS5pbmZvKGBib2R5OiAke3Jlc3BvbnNlLmJvZHl9YCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgIGJvZHk6IHJlc3BvbnNlLFxuICAgIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmluZm8oZSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1c0NvZGU6IDUwMCxcbiAgICAgIGJvZHk6IGUgPT09IDUwMCA/IFwiSW52YWxpZCBSZXF1ZXN0IEJvZHlcIiA6IGUsXG4gICAgfTtcbiAgfVxufTtcbiJdfQ==