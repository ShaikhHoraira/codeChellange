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
            ':UserId': '1',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsK0JBQThCO0FBRzlCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFBO0FBRTdDLE1BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7SUFDckQsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTTtDQUMzQixDQUFDLENBQUM7QUFDSSxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVyxFQUFFLEVBQUU7SUFDcEQsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNuQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QyxNQUFNLE1BQU0sR0FBRztRQUNiLFNBQVM7UUFDVCw2QkFBNkI7UUFDN0IsS0FBSztRQUNMLG1GQUFtRjtRQUNuRixTQUFTLEVBQUUsUUFBUTtRQUNuQixzQkFBc0IsRUFBRSxrQkFBa0I7UUFDMUMseUJBQXlCLEVBQUU7WUFDekIsU0FBUyxFQUFFLEdBQUc7U0FDZjtRQUNELFNBQVMsRUFBRSxTQUFVO0tBQ3RCLENBQUM7SUFHRixJQUFJO1FBQ0YsSUFBSSxRQUFRLENBQUM7UUFDWixJQUFJLEtBQUssQ0FBQyxVQUFVLEtBQUssS0FBSyxFQUFDO1lBQzlCLHlEQUF5RDtZQUN6RCx5QkFBeUI7WUFDekIsd0JBQXdCO1lBQ3hCLE1BQU0sSUFBSSxHQUFHLE1BQU0sY0FBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMxRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3pCLE1BQU0sUUFBUSxHQUFHO2dCQUNmLFVBQVUsRUFBRSxHQUFHO2dCQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQzthQUM1QixDQUFBO1lBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3RDLE9BQU8sUUFBUSxDQUFBO1NBRWhCO1FBQ0QsT0FBTztZQUNILFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLFFBQVE7U0FDZixDQUFDO0tBQ0w7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDZixPQUFPO1lBQ0gsVUFBVSxFQUFHLEdBQUc7WUFDaEIsSUFBSSxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzdDLENBQUM7S0FDTDtBQUNILENBQUMsQ0FBQztBQTVDVyxRQUFBLE9BQU8sV0E0Q2xCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XG5pbXBvcnQgKiBhcyBBV1MgZnJvbSBcImF3cy1zZGtcIlxuXG5cbmNvbnN0IHRhYmxlTmFtZSA9IHByb2Nlc3MuZW52LlRPRE9fVEFCTEVfTkFNRVxuXG5jb25zdCBkb2N1bWVudENsaWVudCA9IG5ldyBBV1MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQoe1xuICByZWdpb246IHByb2Nlc3MuZW52LnJlZ2lvbixcbn0pO1xuZXhwb3J0IGNvbnN0IGhhbmRsZXI6IEhhbmRsZXIgPSBhc3luYyAoZXZlbnQgOiBhbnkpID0+IHtcbiAgY29uc29sZS5pbmZvKGV2ZW50KVxuICBjb25zdCBib2R5cHJhbSA9IEpTT04ucGFyc2UoZXZlbnQuYm9keSlcbiAgY29uc3QgcGFyYW1zID0ge1xuICAgIC8vIEtleToge1xuICAgIC8vICAgVXNlcklkOiBib2R5cHJhbS51c2VySWQsXG4gICAgLy8gfSxcbiAgICAvL0F0dHJpYnV0ZXNUb0dldDogWydwdXNoTm90aWZpY2F0aW9uJywgJ25vdGlmaWNhdGlvblR5cGUnLCAnbm90aWZpY2F0aW9uU3ViVHlwZSddLFxuICAgIEluZGV4TmFtZTogJ1VzZXJJZCcsXG4gICAgS2V5Q29uZGl0aW9uRXhwcmVzc2lvbjogJ1VzZXJJZCA9IDpVc2VySWQnLFxuICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXM6IHtcbiAgICAgICc6VXNlcklkJzogJzEnLFxuICAgIH0sXG4gICAgVGFibGVOYW1lOiB0YWJsZU5hbWUhLFxuICB9O1xuXG5cbiAgdHJ5IHtcbiAgICBsZXQgcmVzcG9uc2U7XG4gICAgIGlmIChldmVudC5odHRwTWV0aG9kID09PSBcIkdFVFwiKXtcbiAgICAgIC8vIHJlc3BvbnNlID0gYXdhaXQgZG9jdW1lbnRDbGllbnQuZ2V0KHBhcmFtcykucHJvbWlzZSgpO1xuICAgICAgLy8gY29uc29sZS5pbmZvKHJlc3BvbnNlKVxuICAgICAgLy8gcmV0dXJuIHJlc3BvbnNlLkl0ZW07XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgZG9jdW1lbnRDbGllbnQucXVlcnkocGFyYW1zKS5wcm9taXNlKCk7XG4gICAgICBjb25zdCBpdGVtcyA9IGRhdGEuSXRlbXM7XG4gICAgICBjb25zdCByZXNwb25zZSA9IHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtcylcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUuaW5mbyhgYm9keTogJHtyZXNwb25zZS5ib2R5fWApXG4gICAgICByZXR1cm4gcmVzcG9uc2VcblxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHJlc3BvbnNlLFxuICAgICAgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuaW5mbyhlKVxuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6ICA1MDAsXG4gICAgICAgIGJvZHk6IGUgPT09IDUwMCA/ICdJbnZhbGlkIFJlcXVlc3QgQm9keScgOiBlLFxuICAgICAgfTtcbiAgfVxufTtcblxuIl19