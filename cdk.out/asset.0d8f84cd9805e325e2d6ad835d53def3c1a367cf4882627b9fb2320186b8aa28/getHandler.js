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
    const params = {
        IndexName: 'UserId',
        KeyConditionExpression: '#userId = :userId',
        ExpressionAttributeNames: {
            '#userId': 'UserId'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsK0JBQThCO0FBRzlCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFBO0FBRTdDLE1BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7SUFDckQsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTTtDQUMzQixDQUFDLENBQUM7QUFDSSxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVyxFQUFFLEVBQUU7SUFDcEQsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNuQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QyxtQkFBbUI7SUFDbkIsY0FBYztJQUNkLGtDQUFrQztJQUNsQyxVQUFVO0lBQ1YsdURBQXVEO0lBQ3ZELHlCQUF5QjtJQUN6QixnREFBZ0Q7SUFDaEQsZ0NBQWdDO0lBQ2hDLDBCQUEwQjtJQUMxQixPQUFPO0lBQ1AsaUNBQWlDO0lBQ2pDLHNCQUFzQjtJQUN0QixPQUFPO0lBQ1AsMkJBQTJCO0lBQzNCLEtBQUs7SUFDTCxNQUFNLE1BQU0sR0FBRztRQUNiLFNBQVMsRUFBRSxRQUFRO1FBQ25CLHNCQUFzQixFQUFFLG1CQUFtQjtRQUMzQyx3QkFBd0IsRUFBRTtZQUN4QixTQUFTLEVBQUUsUUFBUTtTQUNwQjtRQUNELHlCQUF5QixFQUFFO1lBQ3pCLFNBQVMsRUFBRSxHQUFHO1NBQ2Y7UUFDRCxTQUFTLEVBQUUsU0FBVTtLQUN0QixDQUFDO0lBRUYsSUFBSTtRQUNGLElBQUksUUFBUSxDQUFDO1FBQ1osSUFBSSxLQUFLLENBQUMsVUFBVSxLQUFLLEtBQUssRUFBQztZQUM5Qix5REFBeUQ7WUFDekQseUJBQXlCO1lBQ3pCLHdCQUF3QjtZQUN4QixNQUFNLElBQUksR0FBRyxNQUFNLGNBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDMUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN6QixNQUFNLFFBQVEsR0FBRztnQkFDZixVQUFVLEVBQUUsR0FBRztnQkFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7YUFDNUIsQ0FBQTtZQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUN0QyxPQUFPLFFBQVEsQ0FBQTtTQUNoQjtRQUNELE9BQU87WUFDSCxVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxRQUFRO1NBQ2YsQ0FBQztLQUNMO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2YsT0FBTztZQUNILFVBQVUsRUFBRyxHQUFHO1lBQ2hCLElBQUksRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3QyxDQUFDO0tBQ0w7QUFDSCxDQUFDLENBQUM7QUF4RFcsUUFBQSxPQUFPLFdBd0RsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuaW1wb3J0ICogYXMgQVdTIGZyb20gXCJhd3Mtc2RrXCJcblxuXG5jb25zdCB0YWJsZU5hbWUgPSBwcm9jZXNzLmVudi5UT0RPX1RBQkxFX05BTUVcblxuY29uc3QgZG9jdW1lbnRDbGllbnQgPSBuZXcgQVdTLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50KHtcbiAgcmVnaW9uOiBwcm9jZXNzLmVudi5yZWdpb24sXG59KTtcbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBIYW5kbGVyID0gYXN5bmMgKGV2ZW50IDogYW55KSA9PiB7XG4gIGNvbnNvbGUuaW5mbyhldmVudClcbiAgY29uc3QgYm9keXByYW0gPSBKU09OLnBhcnNlKGV2ZW50LmJvZHkpXG4gIC8vIGNvbnN0IHBhcmFtcyA9IHtcbiAgLy8gICAvLyBLZXk6IHtcbiAgLy8gICAvLyAgIFVzZXJJZDogYm9keXByYW0udXNlcklkLFxuICAvLyAgIC8vIH0sXG4gIC8vICAgLy9BdHRyaWJ1dGVzVG9HZXQ6IFsnQWRkcmVzcycsICdTdWJ1cmInLCAnU3RhdGUnXSxcbiAgLy8gICBJbmRleE5hbWU6ICdVc2VySWQnLFxuICAvLyAgIEtleUNvbmRpdGlvbkV4cHJlc3Npb246ICd1c2VySWQgPSA6dXNlcklkJyxcbiAgLy8gICBFeHByZXNzaW9uQXR0cmlidXRlTmFtZXM6IHtcbiAgLy8gICAgICcjdXNlcklkJzogJ1VzZXJJZCdcbiAgLy8gICB9LFxuICAvLyAgIEV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXM6IHtcbiAgLy8gICAgICc6dXNlcklkJzogJzEnLFxuICAvLyAgIH0sXG4gIC8vICAgVGFibGVOYW1lOiB0YWJsZU5hbWUhLFxuICAvLyB9O1xuICBjb25zdCBwYXJhbXMgPSB7XG4gICAgSW5kZXhOYW1lOiAnVXNlcklkJyxcbiAgICBLZXlDb25kaXRpb25FeHByZXNzaW9uOiAnI3VzZXJJZCA9IDp1c2VySWQnLFxuICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVOYW1lczoge1xuICAgICAgJyN1c2VySWQnOiAnVXNlcklkJ1xuICAgIH0sXG4gICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xuICAgICAgJzp1c2VySWQnOiAnMScsXG4gICAgfSxcbiAgICBUYWJsZU5hbWU6IHRhYmxlTmFtZSEsXG4gIH07XG4gIFxuICB0cnkge1xuICAgIGxldCByZXNwb25zZTtcbiAgICAgaWYgKGV2ZW50Lmh0dHBNZXRob2QgPT09IFwiR0VUXCIpe1xuICAgICAgLy8gcmVzcG9uc2UgPSBhd2FpdCBkb2N1bWVudENsaWVudC5nZXQocGFyYW1zKS5wcm9taXNlKCk7XG4gICAgICAvLyBjb25zb2xlLmluZm8ocmVzcG9uc2UpXG4gICAgICAvLyByZXR1cm4gcmVzcG9uc2UuSXRlbTtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBkb2N1bWVudENsaWVudC5xdWVyeShwYXJhbXMpLnByb21pc2UoKTtcbiAgICAgIGNvbnN0IGl0ZW1zID0gZGF0YS5JdGVtcztcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW1zKVxuICAgICAgfVxuICAgICAgY29uc29sZS5pbmZvKGBib2R5OiAke3Jlc3BvbnNlLmJvZHl9YClcbiAgICAgIHJldHVybiByZXNwb25zZVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHJlc3BvbnNlLFxuICAgICAgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuaW5mbyhlKVxuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6ICA1MDAsXG4gICAgICAgIGJvZHk6IGUgPT09IDUwMCA/ICdJbnZhbGlkIFJlcXVlc3QgQm9keScgOiBlLFxuICAgICAgfTtcbiAgfVxufTtcblxuIl19