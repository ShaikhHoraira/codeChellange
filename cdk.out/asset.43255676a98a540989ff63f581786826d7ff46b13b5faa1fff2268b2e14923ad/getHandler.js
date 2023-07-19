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
            ':userId': '1',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsK0JBQThCO0FBRzlCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFBO0FBRTdDLE1BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7SUFDckQsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTTtDQUMzQixDQUFDLENBQUM7QUFDSSxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVyxFQUFFLEVBQUU7SUFDcEQsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDaEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkMsbUJBQW1CO0lBQ25CLGNBQWM7SUFDZCxrQ0FBa0M7SUFDbEMsVUFBVTtJQUNWLHVEQUF1RDtJQUN2RCx5QkFBeUI7SUFDekIsZ0RBQWdEO0lBQ2hELGdDQUFnQztJQUNoQywwQkFBMEI7SUFDMUIsT0FBTztJQUNQLGlDQUFpQztJQUNqQyxzQkFBc0I7SUFDdEIsT0FBTztJQUNQLDJCQUEyQjtJQUMzQixLQUFLO0lBQ0wsbUJBQW1CO0lBQ25CLHlCQUF5QjtJQUN6QixpREFBaUQ7SUFDakQsZ0NBQWdDO0lBQ2hDLDBCQUEwQjtJQUMxQixPQUFPO0lBQ1AsaUNBQWlDO0lBQ2pDLHNCQUFzQjtJQUN0QixPQUFPO0lBQ1AsMkJBQTJCO0lBQzNCLEtBQUs7SUFDTCxNQUFNLE1BQU0sR0FBRztRQUNiLFNBQVMsRUFBRSxhQUFhO1FBQ3hCLHNCQUFzQixFQUFFLGtCQUFrQjtRQUMxQyx5QkFBeUIsRUFBRTtZQUN6QixTQUFTLEVBQUUsR0FBRztTQUNmO1FBQ0QsU0FBUyxFQUFFLFNBQVU7S0FDdEIsQ0FBQztJQUNGLG1CQUFtQjtJQUNuQiw4QkFBOEI7SUFDOUIsc0VBQXNFO0lBQ3RFLGlDQUFpQztJQUNqQyxzQkFBc0I7SUFDdEIsZ0NBQWdDO0lBQ2hDLE9BQU87SUFDUCxnQ0FBZ0M7SUFDaEMsMkJBQTJCO0lBQzNCLE9BQU87SUFDUCwyQkFBMkI7SUFDM0IsS0FBSztJQUVMLG1CQUFtQjtJQUNuQiw4QkFBOEI7SUFDOUIsc0VBQXNFO0lBQ3RFLGlDQUFpQztJQUNqQyxzQkFBc0I7SUFDdEIsZ0NBQWdDO0lBQ2hDLE9BQU87SUFDUCxnQ0FBZ0M7SUFDaEMsMkJBQTJCO0lBQzNCLE9BQU87SUFDUCwyQkFBMkI7SUFDM0IsMERBQTBEO0lBQzFELEtBQUs7SUFJTCxJQUFJO1FBQ0YsSUFBSSxRQUFRLENBQUM7UUFDWixJQUFJLEtBQUssQ0FBQyxVQUFVLEtBQUssS0FBSyxFQUFDO1lBQzlCLHlEQUF5RDtZQUN6RCx5QkFBeUI7WUFDekIsd0JBQXdCO1lBQ3hCLE1BQU0sSUFBSSxHQUFHLE1BQU0sY0FBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMxRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3pCLE1BQU0sUUFBUSxHQUFHO2dCQUNmLFVBQVUsRUFBRSxHQUFHO2dCQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQzthQUM1QixDQUFBO1lBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3RDLE9BQU8sUUFBUSxDQUFBO1NBQ2hCO1FBQ0QsT0FBTztZQUNILFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLFFBQVE7U0FDZixDQUFDO0tBQ0w7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDZixPQUFPO1lBQ0gsVUFBVSxFQUFHLEdBQUc7WUFDaEIsSUFBSSxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzdDLENBQUM7S0FDTDtBQUNILENBQUMsQ0FBQztBQTVGVyxRQUFBLE9BQU8sV0E0RmxCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XG5pbXBvcnQgKiBhcyBBV1MgZnJvbSBcImF3cy1zZGtcIlxuXG5cbmNvbnN0IHRhYmxlTmFtZSA9IHByb2Nlc3MuZW52LlRPRE9fVEFCTEVfTkFNRVxuXG5jb25zdCBkb2N1bWVudENsaWVudCA9IG5ldyBBV1MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQoe1xuICByZWdpb246IHByb2Nlc3MuZW52LnJlZ2lvbixcbn0pO1xuZXhwb3J0IGNvbnN0IGhhbmRsZXI6IEhhbmRsZXIgPSBhc3luYyAoZXZlbnQgOiBhbnkpID0+IHtcbiAgY29uc29sZS5pbmZvKGV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycy51c2VySWQpXG4gIGNvbnN0IGJvZHlwcmFtID0gSlNPTi5wYXJzZShldmVudC5ib2R5KVxuICAvLyBjb25zdCBwYXJhbXMgPSB7XG4gIC8vICAgLy8gS2V5OiB7XG4gIC8vICAgLy8gICBVc2VySWQ6IGJvZHlwcmFtLnVzZXJJZCxcbiAgLy8gICAvLyB9LFxuICAvLyAgIC8vQXR0cmlidXRlc1RvR2V0OiBbJ0FkZHJlc3MnLCAnU3VidXJiJywgJ1N0YXRlJ10sXG4gIC8vICAgSW5kZXhOYW1lOiAnVXNlcklkJyxcbiAgLy8gICBLZXlDb25kaXRpb25FeHByZXNzaW9uOiAndXNlcklkID0gOnVzZXJJZCcsXG4gIC8vICAgRXhwcmVzc2lvbkF0dHJpYnV0ZU5hbWVzOiB7XG4gIC8vICAgICAnI3VzZXJJZCc6ICdVc2VySWQnXG4gIC8vICAgfSxcbiAgLy8gICBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzOiB7XG4gIC8vICAgICAnOnVzZXJJZCc6ICcxJyxcbiAgLy8gICB9LFxuICAvLyAgIFRhYmxlTmFtZTogdGFibGVOYW1lISxcbiAgLy8gfTtcbiAgLy8gY29uc3QgcGFyYW1zID0ge1xuICAvLyAgIEluZGV4TmFtZTogJ1VzZXJJZCcsXG4gIC8vICAgS2V5Q29uZGl0aW9uRXhwcmVzc2lvbjogJyN1c2VySWQgPSA6dXNlcklkJyxcbiAgLy8gICBFeHByZXNzaW9uQXR0cmlidXRlTmFtZXM6IHtcbiAgLy8gICAgICcjdXNlcklkJzogJ1VzZXJJZCdcbiAgLy8gICB9LFxuICAvLyAgIEV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXM6IHtcbiAgLy8gICAgICc6dXNlcklkJzogJzEnLFxuICAvLyAgIH0sXG4gIC8vICAgVGFibGVOYW1lOiB0YWJsZU5hbWUhLFxuICAvLyB9O1xuICBjb25zdCBwYXJhbXMgPSB7XG4gICAgSW5kZXhOYW1lOiAnVXNlcklkSW5kZXgnLCAvLyBVcGRhdGUgd2l0aCB0aGUgY29ycmVjdCBpbmRleCBuYW1lXG4gICAgS2V5Q29uZGl0aW9uRXhwcmVzc2lvbjogJ1VzZXJJZCA9IDp1c2VySWQnLFxuICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXM6IHtcbiAgICAgICc6dXNlcklkJzogJzEnLFxuICAgIH0sXG4gICAgVGFibGVOYW1lOiB0YWJsZU5hbWUhLFxuICB9O1xuICAvLyBjb25zdCBwYXJhbXMgPSB7XG4gIC8vICAgSW5kZXhOYW1lOiAnU3VidXJiSW5kZXgnLFxuICAvLyAgIEtleUNvbmRpdGlvbkV4cHJlc3Npb246ICdVc2VySWQgPSA6dXNlcklkIEFORCAjc3VidXJiID0gOnN1YnVyYicsXG4gIC8vICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xuICAvLyAgICAgJzp1c2VySWQnOiAnMScsXG4gIC8vICAgICAnOnN1YnVyYic6ICdNYXJpYnlybm9uZycsXG4gIC8vICAgfSxcbiAgLy8gICBFeHByZXNzaW9uQXR0cmlidXRlTmFtZXM6IHtcbiAgLy8gICAgICcjc3VidXJiJzogJ1N1YnVyYicsXG4gIC8vICAgfSxcbiAgLy8gICBUYWJsZU5hbWU6IHRhYmxlTmFtZSEsXG4gIC8vIH07XG4gIFxuICAvLyBjb25zdCBwYXJhbXMgPSB7XG4gIC8vICAgSW5kZXhOYW1lOiAnU3VidXJiSW5kZXgnLFxuICAvLyAgIEtleUNvbmRpdGlvbkV4cHJlc3Npb246ICdVc2VySWQgPSA6dXNlcklkIEFORCAjc3VidXJiID0gOnN1YnVyYicsXG4gIC8vICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xuICAvLyAgICAgJzp1c2VySWQnOiAnMScsXG4gIC8vICAgICAnOnN1YnVyYic6ICdNYXJpYnlybm9uZycsXG4gIC8vICAgfSxcbiAgLy8gICBFeHByZXNzaW9uQXR0cmlidXRlTmFtZXM6IHtcbiAgLy8gICAgICcjc3VidXJiJzogJ1N1YnVyYicsXG4gIC8vICAgfSxcbiAgLy8gICBUYWJsZU5hbWU6IHRhYmxlTmFtZSEsXG4gIC8vICAgQ29uc2lzdGVudFJlYWQ6IGZhbHNlLCAvLyBFbmFibGUgZXZlbnR1YWwgY29uc2lzdGVuY3lcbiAgLy8gfTtcbiAgXG4gIFxuICBcbiAgdHJ5IHtcbiAgICBsZXQgcmVzcG9uc2U7XG4gICAgIGlmIChldmVudC5odHRwTWV0aG9kID09PSBcIkdFVFwiKXtcbiAgICAgIC8vIHJlc3BvbnNlID0gYXdhaXQgZG9jdW1lbnRDbGllbnQuZ2V0KHBhcmFtcykucHJvbWlzZSgpO1xuICAgICAgLy8gY29uc29sZS5pbmZvKHJlc3BvbnNlKVxuICAgICAgLy8gcmV0dXJuIHJlc3BvbnNlLkl0ZW07XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgZG9jdW1lbnRDbGllbnQucXVlcnkocGFyYW1zKS5wcm9taXNlKCk7XG4gICAgICBjb25zdCBpdGVtcyA9IGRhdGEuSXRlbXM7XG4gICAgICBjb25zdCByZXNwb25zZSA9IHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtcylcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUuaW5mbyhgYm9keTogJHtyZXNwb25zZS5ib2R5fWApXG4gICAgICByZXR1cm4gcmVzcG9uc2VcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiByZXNwb25zZSxcbiAgICAgIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmluZm8oZSlcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAgNTAwLFxuICAgICAgICBib2R5OiBlID09PSA1MDAgPyAnSW52YWxpZCBSZXF1ZXN0IEJvZHknIDogZSxcbiAgICAgIH07XG4gIH1cbn07XG5cbiJdfQ==