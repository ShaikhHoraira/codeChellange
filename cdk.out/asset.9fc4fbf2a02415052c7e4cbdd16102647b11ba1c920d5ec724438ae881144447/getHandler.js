"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const AWS = require("aws-sdk");
const tableName = process.env.TODO_TABLE_NAME;
const documentClient = new AWS.DynamoDB.DocumentClient({
    region: process.env.region,
});
const handler = async (event) => {
    const bodypram = JSON.parse(event.body);
    const params = {
        Key: {
            postcode: bodypram.userId,
        },
        //AttributesToGet: ['pushNotification', 'notificationType', 'notificationSubType'],
        TableName: tableName,
    };
    try {
        //let response;
        if (event.httpMethod === "GET") {
            const result = await documentClient.get(params).promise();
            console.info(result);
            return result.Item;
        }
        return {
            statusCode: 200,
            body: 'Success',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsK0JBQThCO0FBRTlCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFBO0FBRTdDLE1BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7SUFDckQsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTTtDQUMzQixDQUFDLENBQUM7QUFDSSxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVyxFQUFFLEVBQUU7SUFDcEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkMsTUFBTSxNQUFNLEdBQUc7UUFDYixHQUFHLEVBQUU7WUFDSCxRQUFRLEVBQUUsUUFBUSxDQUFDLE1BQU07U0FDMUI7UUFDRCxtRkFBbUY7UUFDbkYsU0FBUyxFQUFFLFNBQVU7S0FDdEIsQ0FBQztJQUdGLElBQUk7UUFDRixlQUFlO1FBQ2QsSUFBSSxLQUFLLENBQUMsVUFBVSxLQUFLLEtBQUssRUFBQztZQUM5QixNQUFNLE1BQU0sR0FBRyxNQUFNLGNBQWMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDMUQsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNwQixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FFcEI7UUFDRCxPQUFPO1lBQ0gsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsU0FBUztTQUNoQixDQUFDO0tBQ0w7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU87WUFDSCxVQUFVLEVBQUcsR0FBRztZQUNoQixJQUFJLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtTQUNsRSxDQUFDO0tBQ0w7QUFDSCxDQUFDLENBQUM7QUE3QlcsUUFBQSxPQUFPLFdBNkJsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuaW1wb3J0ICogYXMgQVdTIGZyb20gXCJhd3Mtc2RrXCJcblxuY29uc3QgdGFibGVOYW1lID0gcHJvY2Vzcy5lbnYuVE9ET19UQUJMRV9OQU1FXG5cbmNvbnN0IGRvY3VtZW50Q2xpZW50ID0gbmV3IEFXUy5EeW5hbW9EQi5Eb2N1bWVudENsaWVudCh7XG4gIHJlZ2lvbjogcHJvY2Vzcy5lbnYucmVnaW9uLFxufSk7XG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudCA6IGFueSkgPT4ge1xuICBjb25zdCBib2R5cHJhbSA9IEpTT04ucGFyc2UoZXZlbnQuYm9keSlcbiAgY29uc3QgcGFyYW1zID0ge1xuICAgIEtleToge1xuICAgICAgcG9zdGNvZGU6IGJvZHlwcmFtLnVzZXJJZCxcbiAgICB9LFxuICAgIC8vQXR0cmlidXRlc1RvR2V0OiBbJ3B1c2hOb3RpZmljYXRpb24nLCAnbm90aWZpY2F0aW9uVHlwZScsICdub3RpZmljYXRpb25TdWJUeXBlJ10sXG4gICAgVGFibGVOYW1lOiB0YWJsZU5hbWUhLFxuICB9O1xuXG5cbiAgdHJ5IHtcbiAgICAvL2xldCByZXNwb25zZTtcbiAgICAgaWYgKGV2ZW50Lmh0dHBNZXRob2QgPT09IFwiR0VUXCIpe1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZG9jdW1lbnRDbGllbnQuZ2V0KHBhcmFtcykucHJvbWlzZSgpO1xuICAgICAgY29uc29sZS5pbmZvKHJlc3VsdClcbiAgICAgIHJldHVybiByZXN1bHQuSXRlbTtcblxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6ICdTdWNjZXNzJyxcbiAgICAgIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAgNTAwLFxuICAgICAgICBib2R5OiBlID09PSA1MDAgPyAnSW52YWxpZCBSZXF1ZXN0IEJvZHknIDogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyxcbiAgICAgIH07XG4gIH1cbn07Il19