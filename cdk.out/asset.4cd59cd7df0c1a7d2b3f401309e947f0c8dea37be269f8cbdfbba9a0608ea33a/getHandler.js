"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const AWS = require("aws-sdk");
const tableName = process.env.TODO_TABLE_NAME;
const documentClient = new AWS.DynamoDB.DocumentClient({
    region: process.env.region,
});
const handler = async (event) => {
    console.info(event.queryStringParameters);
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
        IndexName: 'UserIdIndex',
        KeyConditionExpression: 'UserId = :userId',
        ExpressionAttributeNames: {
            '#suburb': 'Suburb',
        },
        ExpressionAttributeValues: {
            ':userId': '1',
        },
        ProjectionExpression: 'Maribyrnong123',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsK0JBQThCO0FBRzlCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFBO0FBRTdDLE1BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7SUFDckQsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTTtDQUMzQixDQUFDLENBQUM7QUFDSSxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVyxFQUFFLEVBQUU7SUFDcEQsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQTtJQUN6QyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QyxtQkFBbUI7SUFDbkIsY0FBYztJQUNkLGtDQUFrQztJQUNsQyxVQUFVO0lBQ1YsdURBQXVEO0lBQ3ZELHlCQUF5QjtJQUN6QixnREFBZ0Q7SUFDaEQsZ0NBQWdDO0lBQ2hDLDBCQUEwQjtJQUMxQixPQUFPO0lBQ1AsaUNBQWlDO0lBQ2pDLHNCQUFzQjtJQUN0QixPQUFPO0lBQ1AsMkJBQTJCO0lBQzNCLEtBQUs7SUFDTCxtQkFBbUI7SUFDbkIseUJBQXlCO0lBQ3pCLGlEQUFpRDtJQUNqRCxnQ0FBZ0M7SUFDaEMsMEJBQTBCO0lBQzFCLE9BQU87SUFDUCxpQ0FBaUM7SUFDakMsc0JBQXNCO0lBQ3RCLE9BQU87SUFDUCwyQkFBMkI7SUFDM0IsS0FBSztJQUNMLG1CQUFtQjtJQUNuQixvRUFBb0U7SUFDcEUsZ0RBQWdEO0lBQ2hELGlDQUFpQztJQUNqQyxzQkFBc0I7SUFDdEIsT0FBTztJQUNQLDJCQUEyQjtJQUMzQixLQUFLO0lBQ0wsTUFBTSxNQUFNLEdBQUc7UUFDYixTQUFTLEVBQUUsYUFBYTtRQUN4QixzQkFBc0IsRUFBRSxrQkFBa0I7UUFDMUMsd0JBQXdCLEVBQUU7WUFDeEIsU0FBUyxFQUFFLFFBQVE7U0FDcEI7UUFDRCx5QkFBeUIsRUFBRTtZQUN6QixTQUFTLEVBQUUsR0FBRztTQUNmO1FBQ0Qsb0JBQW9CLEVBQUUsZ0JBQWdCO1FBQ3RDLFNBQVMsRUFBRSxTQUFVO0tBQ3RCLENBQUM7SUFHRixJQUFJO1FBQ0YsSUFBSSxRQUFRLENBQUM7UUFDWixJQUFJLEtBQUssQ0FBQyxVQUFVLEtBQUssS0FBSyxFQUFDO1lBQzlCLHlEQUF5RDtZQUN6RCx5QkFBeUI7WUFDekIsd0JBQXdCO1lBQ3hCLE1BQU0sSUFBSSxHQUFHLE1BQU0sY0FBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMxRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3pCLE1BQU0sUUFBUSxHQUFHO2dCQUNmLFVBQVUsRUFBRSxHQUFHO2dCQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQzthQUM1QixDQUFBO1lBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3RDLE9BQU8sUUFBUSxDQUFBO1NBQ2hCO1FBQ0QsT0FBTztZQUNILFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLFFBQVE7U0FDZixDQUFDO0tBQ0w7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDZixPQUFPO1lBQ0gsVUFBVSxFQUFHLEdBQUc7WUFDaEIsSUFBSSxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzdDLENBQUM7S0FDTDtBQUNILENBQUMsQ0FBQztBQTdFVyxRQUFBLE9BQU8sV0E2RWxCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XG5pbXBvcnQgKiBhcyBBV1MgZnJvbSBcImF3cy1zZGtcIlxuXG5cbmNvbnN0IHRhYmxlTmFtZSA9IHByb2Nlc3MuZW52LlRPRE9fVEFCTEVfTkFNRVxuXG5jb25zdCBkb2N1bWVudENsaWVudCA9IG5ldyBBV1MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQoe1xuICByZWdpb246IHByb2Nlc3MuZW52LnJlZ2lvbixcbn0pO1xuZXhwb3J0IGNvbnN0IGhhbmRsZXI6IEhhbmRsZXIgPSBhc3luYyAoZXZlbnQgOiBhbnkpID0+IHtcbiAgY29uc29sZS5pbmZvKGV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycylcbiAgY29uc3QgYm9keXByYW0gPSBKU09OLnBhcnNlKGV2ZW50LmJvZHkpXG4gIC8vIGNvbnN0IHBhcmFtcyA9IHtcbiAgLy8gICAvLyBLZXk6IHtcbiAgLy8gICAvLyAgIFVzZXJJZDogYm9keXByYW0udXNlcklkLFxuICAvLyAgIC8vIH0sXG4gIC8vICAgLy9BdHRyaWJ1dGVzVG9HZXQ6IFsnQWRkcmVzcycsICdTdWJ1cmInLCAnU3RhdGUnXSxcbiAgLy8gICBJbmRleE5hbWU6ICdVc2VySWQnLFxuICAvLyAgIEtleUNvbmRpdGlvbkV4cHJlc3Npb246ICd1c2VySWQgPSA6dXNlcklkJyxcbiAgLy8gICBFeHByZXNzaW9uQXR0cmlidXRlTmFtZXM6IHtcbiAgLy8gICAgICcjdXNlcklkJzogJ1VzZXJJZCdcbiAgLy8gICB9LFxuICAvLyAgIEV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXM6IHtcbiAgLy8gICAgICc6dXNlcklkJzogJzEnLFxuICAvLyAgIH0sXG4gIC8vICAgVGFibGVOYW1lOiB0YWJsZU5hbWUhLFxuICAvLyB9O1xuICAvLyBjb25zdCBwYXJhbXMgPSB7XG4gIC8vICAgSW5kZXhOYW1lOiAnVXNlcklkJyxcbiAgLy8gICBLZXlDb25kaXRpb25FeHByZXNzaW9uOiAnI3VzZXJJZCA9IDp1c2VySWQnLFxuICAvLyAgIEV4cHJlc3Npb25BdHRyaWJ1dGVOYW1lczoge1xuICAvLyAgICAgJyN1c2VySWQnOiAnVXNlcklkJ1xuICAvLyAgIH0sXG4gIC8vICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xuICAvLyAgICAgJzp1c2VySWQnOiAnMScsXG4gIC8vICAgfSxcbiAgLy8gICBUYWJsZU5hbWU6IHRhYmxlTmFtZSEsXG4gIC8vIH07XG4gIC8vIGNvbnN0IHBhcmFtcyA9IHtcbiAgLy8gICBJbmRleE5hbWU6ICdVc2VySWRJbmRleCcsIC8vIFVwZGF0ZSB3aXRoIHRoZSBjb3JyZWN0IGluZGV4IG5hbWVcbiAgLy8gICBLZXlDb25kaXRpb25FeHByZXNzaW9uOiAnVXNlcklkID0gOnVzZXJJZCcsXG4gIC8vICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xuICAvLyAgICAgJzp1c2VySWQnOiAnMScsXG4gIC8vICAgfSxcbiAgLy8gICBUYWJsZU5hbWU6IHRhYmxlTmFtZSEsXG4gIC8vIH07XG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICBJbmRleE5hbWU6ICdVc2VySWRJbmRleCcsIC8vIFVwZGF0ZSB3aXRoIHRoZSBjb3JyZWN0IGluZGV4IG5hbWVcbiAgICBLZXlDb25kaXRpb25FeHByZXNzaW9uOiAnVXNlcklkID0gOnVzZXJJZCcsXG4gICAgRXhwcmVzc2lvbkF0dHJpYnV0ZU5hbWVzOiB7XG4gICAgICAnI3N1YnVyYic6ICdTdWJ1cmInLFxuICAgIH0sXG4gICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xuICAgICAgJzp1c2VySWQnOiAnMScsXG4gICAgfSxcbiAgICBQcm9qZWN0aW9uRXhwcmVzc2lvbjogJ01hcmlieXJub25nMTIzJywgLy8gSW5jbHVkZSB0aGUgZGVzaXJlZCBhdHRyaWJ1dGUgaW4gdGhlIHByb2plY3Rpb24gZXhwcmVzc2lvblxuICAgIFRhYmxlTmFtZTogdGFibGVOYW1lISxcbiAgfTtcbiAgXG4gIFxuICB0cnkge1xuICAgIGxldCByZXNwb25zZTtcbiAgICAgaWYgKGV2ZW50Lmh0dHBNZXRob2QgPT09IFwiR0VUXCIpe1xuICAgICAgLy8gcmVzcG9uc2UgPSBhd2FpdCBkb2N1bWVudENsaWVudC5nZXQocGFyYW1zKS5wcm9taXNlKCk7XG4gICAgICAvLyBjb25zb2xlLmluZm8ocmVzcG9uc2UpXG4gICAgICAvLyByZXR1cm4gcmVzcG9uc2UuSXRlbTtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBkb2N1bWVudENsaWVudC5xdWVyeShwYXJhbXMpLnByb21pc2UoKTtcbiAgICAgIGNvbnN0IGl0ZW1zID0gZGF0YS5JdGVtcztcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW1zKVxuICAgICAgfVxuICAgICAgY29uc29sZS5pbmZvKGBib2R5OiAke3Jlc3BvbnNlLmJvZHl9YClcbiAgICAgIHJldHVybiByZXNwb25zZVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHJlc3BvbnNlLFxuICAgICAgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuaW5mbyhlKVxuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6ICA1MDAsXG4gICAgICAgIGJvZHk6IGUgPT09IDUwMCA/ICdJbnZhbGlkIFJlcXVlc3QgQm9keScgOiBlLFxuICAgICAgfTtcbiAgfVxufTtcblxuIl19