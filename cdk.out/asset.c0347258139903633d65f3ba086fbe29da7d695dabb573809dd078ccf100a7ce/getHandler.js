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
    // const params = {
    //   IndexName: 'UserIdIndex', // Update with the correct index name
    //   KeyConditionExpression: 'UserId = :userId',
    //   ExpressionAttributeValues: {
    //     ':userId': '1',
    //   },
    //   TableName: tableName!,
    // };
    const params = {
        IndexName: 'SuburbIndex',
        KeyConditionExpression: 'UserId = :userId AND #suburb = :suburb',
        ExpressionAttributeValues: {
            ':userId': '1',
            ':suburb': 'Maribyrnong',
        },
        ExpressionAttributeNames: {
            '#suburb': 'Suburb',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsK0JBQThCO0FBRzlCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFBO0FBRTdDLE1BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7SUFDckQsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTTtDQUMzQixDQUFDLENBQUM7QUFDSSxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVyxFQUFFLEVBQUU7SUFDcEQsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNuQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QyxtQkFBbUI7SUFDbkIsY0FBYztJQUNkLGtDQUFrQztJQUNsQyxVQUFVO0lBQ1YsdURBQXVEO0lBQ3ZELHlCQUF5QjtJQUN6QixnREFBZ0Q7SUFDaEQsZ0NBQWdDO0lBQ2hDLDBCQUEwQjtJQUMxQixPQUFPO0lBQ1AsaUNBQWlDO0lBQ2pDLHNCQUFzQjtJQUN0QixPQUFPO0lBQ1AsMkJBQTJCO0lBQzNCLEtBQUs7SUFDTCxtQkFBbUI7SUFDbkIseUJBQXlCO0lBQ3pCLGlEQUFpRDtJQUNqRCxnQ0FBZ0M7SUFDaEMsMEJBQTBCO0lBQzFCLE9BQU87SUFDUCxpQ0FBaUM7SUFDakMsc0JBQXNCO0lBQ3RCLE9BQU87SUFDUCwyQkFBMkI7SUFDM0IsS0FBSztJQUNMLG1CQUFtQjtJQUNuQixvRUFBb0U7SUFDcEUsZ0RBQWdEO0lBQ2hELGlDQUFpQztJQUNqQyxzQkFBc0I7SUFDdEIsT0FBTztJQUNQLDJCQUEyQjtJQUMzQixLQUFLO0lBQ0wsTUFBTSxNQUFNLEdBQUc7UUFDYixTQUFTLEVBQUUsYUFBYTtRQUN4QixzQkFBc0IsRUFBRSx3Q0FBd0M7UUFDaEUseUJBQXlCLEVBQUU7WUFDekIsU0FBUyxFQUFFLEdBQUc7WUFDZCxTQUFTLEVBQUUsYUFBYTtTQUN6QjtRQUNELHdCQUF3QixFQUFFO1lBQ3hCLFNBQVMsRUFBRSxRQUFRO1NBQ3BCO1FBQ0QsU0FBUyxFQUFFLFNBQVU7S0FDdEIsQ0FBQztJQUtGLElBQUk7UUFDRixJQUFJLFFBQVEsQ0FBQztRQUNaLElBQUksS0FBSyxDQUFDLFVBQVUsS0FBSyxLQUFLLEVBQUM7WUFDOUIseURBQXlEO1lBQ3pELHlCQUF5QjtZQUN6Qix3QkFBd0I7WUFDeEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxjQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzFELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDekIsTUFBTSxRQUFRLEdBQUc7Z0JBQ2YsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO2FBQzVCLENBQUE7WUFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDdEMsT0FBTyxRQUFRLENBQUE7U0FDaEI7UUFDRCxPQUFPO1lBQ0gsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsUUFBUTtTQUNmLENBQUM7S0FDTDtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNmLE9BQU87WUFDSCxVQUFVLEVBQUcsR0FBRztZQUNoQixJQUFJLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0MsQ0FBQztLQUNMO0FBQ0gsQ0FBQyxDQUFDO0FBL0VXLFFBQUEsT0FBTyxXQStFbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcbmltcG9ydCAqIGFzIEFXUyBmcm9tIFwiYXdzLXNka1wiXG5cblxuY29uc3QgdGFibGVOYW1lID0gcHJvY2Vzcy5lbnYuVE9ET19UQUJMRV9OQU1FXG5cbmNvbnN0IGRvY3VtZW50Q2xpZW50ID0gbmV3IEFXUy5EeW5hbW9EQi5Eb2N1bWVudENsaWVudCh7XG4gIHJlZ2lvbjogcHJvY2Vzcy5lbnYucmVnaW9uLFxufSk7XG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudCA6IGFueSkgPT4ge1xuICBjb25zb2xlLmluZm8oZXZlbnQpXG4gIGNvbnN0IGJvZHlwcmFtID0gSlNPTi5wYXJzZShldmVudC5ib2R5KVxuICAvLyBjb25zdCBwYXJhbXMgPSB7XG4gIC8vICAgLy8gS2V5OiB7XG4gIC8vICAgLy8gICBVc2VySWQ6IGJvZHlwcmFtLnVzZXJJZCxcbiAgLy8gICAvLyB9LFxuICAvLyAgIC8vQXR0cmlidXRlc1RvR2V0OiBbJ0FkZHJlc3MnLCAnU3VidXJiJywgJ1N0YXRlJ10sXG4gIC8vICAgSW5kZXhOYW1lOiAnVXNlcklkJyxcbiAgLy8gICBLZXlDb25kaXRpb25FeHByZXNzaW9uOiAndXNlcklkID0gOnVzZXJJZCcsXG4gIC8vICAgRXhwcmVzc2lvbkF0dHJpYnV0ZU5hbWVzOiB7XG4gIC8vICAgICAnI3VzZXJJZCc6ICdVc2VySWQnXG4gIC8vICAgfSxcbiAgLy8gICBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzOiB7XG4gIC8vICAgICAnOnVzZXJJZCc6ICcxJyxcbiAgLy8gICB9LFxuICAvLyAgIFRhYmxlTmFtZTogdGFibGVOYW1lISxcbiAgLy8gfTtcbiAgLy8gY29uc3QgcGFyYW1zID0ge1xuICAvLyAgIEluZGV4TmFtZTogJ1VzZXJJZCcsXG4gIC8vICAgS2V5Q29uZGl0aW9uRXhwcmVzc2lvbjogJyN1c2VySWQgPSA6dXNlcklkJyxcbiAgLy8gICBFeHByZXNzaW9uQXR0cmlidXRlTmFtZXM6IHtcbiAgLy8gICAgICcjdXNlcklkJzogJ1VzZXJJZCdcbiAgLy8gICB9LFxuICAvLyAgIEV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXM6IHtcbiAgLy8gICAgICc6dXNlcklkJzogJzEnLFxuICAvLyAgIH0sXG4gIC8vICAgVGFibGVOYW1lOiB0YWJsZU5hbWUhLFxuICAvLyB9O1xuICAvLyBjb25zdCBwYXJhbXMgPSB7XG4gIC8vICAgSW5kZXhOYW1lOiAnVXNlcklkSW5kZXgnLCAvLyBVcGRhdGUgd2l0aCB0aGUgY29ycmVjdCBpbmRleCBuYW1lXG4gIC8vICAgS2V5Q29uZGl0aW9uRXhwcmVzc2lvbjogJ1VzZXJJZCA9IDp1c2VySWQnLFxuICAvLyAgIEV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXM6IHtcbiAgLy8gICAgICc6dXNlcklkJzogJzEnLFxuICAvLyAgIH0sXG4gIC8vICAgVGFibGVOYW1lOiB0YWJsZU5hbWUhLFxuICAvLyB9O1xuICBjb25zdCBwYXJhbXMgPSB7XG4gICAgSW5kZXhOYW1lOiAnU3VidXJiSW5kZXgnLFxuICAgIEtleUNvbmRpdGlvbkV4cHJlc3Npb246ICdVc2VySWQgPSA6dXNlcklkIEFORCAjc3VidXJiID0gOnN1YnVyYicsXG4gICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xuICAgICAgJzp1c2VySWQnOiAnMScsXG4gICAgICAnOnN1YnVyYic6ICdNYXJpYnlybm9uZycsXG4gICAgfSxcbiAgICBFeHByZXNzaW9uQXR0cmlidXRlTmFtZXM6IHtcbiAgICAgICcjc3VidXJiJzogJ1N1YnVyYicsXG4gICAgfSxcbiAgICBUYWJsZU5hbWU6IHRhYmxlTmFtZSEsXG4gIH07XG4gIFxuICBcbiAgXG4gIFxuICB0cnkge1xuICAgIGxldCByZXNwb25zZTtcbiAgICAgaWYgKGV2ZW50Lmh0dHBNZXRob2QgPT09IFwiR0VUXCIpe1xuICAgICAgLy8gcmVzcG9uc2UgPSBhd2FpdCBkb2N1bWVudENsaWVudC5nZXQocGFyYW1zKS5wcm9taXNlKCk7XG4gICAgICAvLyBjb25zb2xlLmluZm8ocmVzcG9uc2UpXG4gICAgICAvLyByZXR1cm4gcmVzcG9uc2UuSXRlbTtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBkb2N1bWVudENsaWVudC5xdWVyeShwYXJhbXMpLnByb21pc2UoKTtcbiAgICAgIGNvbnN0IGl0ZW1zID0gZGF0YS5JdGVtcztcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW1zKVxuICAgICAgfVxuICAgICAgY29uc29sZS5pbmZvKGBib2R5OiAke3Jlc3BvbnNlLmJvZHl9YClcbiAgICAgIHJldHVybiByZXNwb25zZVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHJlc3BvbnNlLFxuICAgICAgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuaW5mbyhlKVxuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6ICA1MDAsXG4gICAgICAgIGJvZHk6IGUgPT09IDUwMCA/ICdJbnZhbGlkIFJlcXVlc3QgQm9keScgOiBlLFxuICAgICAgfTtcbiAgfVxufTtcblxuIl19