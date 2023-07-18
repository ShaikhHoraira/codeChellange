"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
// import {
//   DynamoDBDocumentClient,
//   PutCommand,
//   PutCommandInput,
// } from '@aws-sdk/lib-dynamodb';
// const client = DynamoDBDocumentClient.from(new DynamoDBClient({ region: 'ap-southeast-2' }));
const tableName = process.env.TODO_TABLE_NAME;
// const params: PutCommandInput = {
//   TableName: tableName,
//   Item: {
//     DeviceToken: 'event',
//     Key: 'event',
//     ForgeId: 'event' || 'anonymous',
//   },
// };
// Load the AWS SDK for Node.js
var Dynamodb = require('aws-sdk/clients/dynamodb');
const dbClient = new Dynamodb.DocumentClient();
// Set the region 
// AWS.config.update({region: 'ap-southeast-2'});
// var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
var params = {
    TableName: tableName,
    Item: {
        'CUSTOMER_ID': 'asdasd',
        'CUSTOMER_NAME': 'adasdsa'
    }
};
const handler = async (event) => {
    console.info("EVENT\n" + tableName);
    try {
        let response;
        if (event.httpMethod === 'POST') {
            const result = await dbClient.put(params).promise();
            console.info("EVENT\n line 42" + result);
            // const tryThis = await saveDevice(event);
            // console.info(tryThis)
            // const result = await client.send(new PutCommand(params));
            // if (result.$metadata && result.$metadata.httpStatusCode && result.$metadata.httpStatusCode === 200) {
            //   return true;
            // } else {
            //   return false;
            // }
        }
        return {
            statusCode: 200,
            body: `${tableName} Success`,
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
// export async function saveDevice(event : object): Promise<boolean> {
//   try {
//     const result = await client.send(new PutCommand(params));
//     if (result.$metadata && result.$metadata.httpStatusCode && result.$metadata.httpStatusCode === 200) {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (err: any) {
//     throw err;
//   }
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw2REFBNkQ7QUFDN0QsV0FBVztBQUNYLDRCQUE0QjtBQUM1QixnQkFBZ0I7QUFDaEIscUJBQXFCO0FBQ3JCLGtDQUFrQztBQUdsQyxnR0FBZ0c7QUFDL0YsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUE7QUFDOUMsb0NBQW9DO0FBQ3BDLDBCQUEwQjtBQUMxQixZQUFZO0FBQ1osNEJBQTRCO0FBQzVCLG9CQUFvQjtBQUNwQix1Q0FBdUM7QUFDdkMsT0FBTztBQUNQLEtBQUs7QUFFTCwrQkFBK0I7QUFDL0IsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDbkQsTUFBTSxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDL0Msa0JBQWtCO0FBQ2xCLGlEQUFpRDtBQUNqRCwwREFBMEQ7QUFDMUQsSUFBSSxNQUFNLEdBQUc7SUFDWCxTQUFTLEVBQUUsU0FBUztJQUNwQixJQUFJLEVBQUU7UUFDSixhQUFhLEVBQUcsUUFBUTtRQUN4QixlQUFlLEVBQUcsU0FBUztLQUM1QjtDQUNGLENBQUM7QUFFSyxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVyxFQUFFLEVBQUU7SUFDdEQsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUE7SUFFakMsSUFBSTtRQUNGLElBQUksUUFBUSxDQUFDO1FBQ2IsSUFBSSxLQUFLLENBQUMsVUFBVSxLQUFLLE1BQU0sRUFBRTtZQUMvQixNQUFNLE1BQU0sR0FBRyxNQUFNLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDcEQsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUMsQ0FBQTtZQUd4QywyQ0FBMkM7WUFDM0Msd0JBQXdCO1lBQ3hCLDREQUE0RDtZQUM1RCx3R0FBd0c7WUFDeEcsaUJBQWlCO1lBQ2pCLFdBQVc7WUFDWCxrQkFBa0I7WUFDbEIsSUFBSTtTQUNMO1FBQ0QsT0FBTztZQUNILFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLEdBQUcsU0FBUyxVQUFVO1NBQzdCLENBQUM7S0FDTDtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTztZQUNILFVBQVUsRUFBRyxHQUFHO1lBQ2hCLElBQUksRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsc0JBQXNCO1NBQ2xFLENBQUM7S0FDTDtBQUVILENBQUMsQ0FBQztBQTlCVyxRQUFBLE9BQU8sV0E4QmxCO0FBT0YsdUVBQXVFO0FBSXZFLFVBQVU7QUFDVixnRUFBZ0U7QUFDaEUsNEdBQTRHO0FBQzVHLHFCQUFxQjtBQUNyQixlQUFlO0FBQ2Ysc0JBQXNCO0FBQ3RCLFFBQVE7QUFDUix5QkFBeUI7QUFDekIsaUJBQWlCO0FBQ2pCLE1BQU07QUFDTixJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XG4vLyBpbXBvcnQgeyBEeW5hbW9EQkNsaWVudCB9IGZyb20gJ0Bhd3Mtc2RrL2NsaWVudC1keW5hbW9kYic7XG4vLyBpbXBvcnQge1xuLy8gICBEeW5hbW9EQkRvY3VtZW50Q2xpZW50LFxuLy8gICBQdXRDb21tYW5kLFxuLy8gICBQdXRDb21tYW5kSW5wdXQsXG4vLyB9IGZyb20gJ0Bhd3Mtc2RrL2xpYi1keW5hbW9kYic7XG5cblxuLy8gY29uc3QgY2xpZW50ID0gRHluYW1vREJEb2N1bWVudENsaWVudC5mcm9tKG5ldyBEeW5hbW9EQkNsaWVudCh7IHJlZ2lvbjogJ2FwLXNvdXRoZWFzdC0yJyB9KSk7XG4gY29uc3QgdGFibGVOYW1lID0gcHJvY2Vzcy5lbnYuVE9ET19UQUJMRV9OQU1FXG4vLyBjb25zdCBwYXJhbXM6IFB1dENvbW1hbmRJbnB1dCA9IHtcbi8vICAgVGFibGVOYW1lOiB0YWJsZU5hbWUsXG4vLyAgIEl0ZW06IHtcbi8vICAgICBEZXZpY2VUb2tlbjogJ2V2ZW50Jyxcbi8vICAgICBLZXk6ICdldmVudCcsXG4vLyAgICAgRm9yZ2VJZDogJ2V2ZW50JyB8fCAnYW5vbnltb3VzJyxcbi8vICAgfSxcbi8vIH07XG5cbi8vIExvYWQgdGhlIEFXUyBTREsgZm9yIE5vZGUuanNcbnZhciBEeW5hbW9kYiA9IHJlcXVpcmUoJ2F3cy1zZGsvY2xpZW50cy9keW5hbW9kYicpO1xuY29uc3QgZGJDbGllbnQgPSBuZXcgRHluYW1vZGIuRG9jdW1lbnRDbGllbnQoKTtcbi8vIFNldCB0aGUgcmVnaW9uIFxuLy8gQVdTLmNvbmZpZy51cGRhdGUoe3JlZ2lvbjogJ2FwLXNvdXRoZWFzdC0yJ30pO1xuLy8gdmFyIGRkYiA9IG5ldyBBV1MuRHluYW1vREIoe2FwaVZlcnNpb246ICcyMDEyLTA4LTEwJ30pO1xudmFyIHBhcmFtcyA9IHtcbiAgVGFibGVOYW1lOiB0YWJsZU5hbWUsXG4gIEl0ZW06IHtcbiAgICAnQ1VTVE9NRVJfSUQnIDogJ2FzZGFzZCcsXG4gICAgJ0NVU1RPTUVSX05BTUUnIDogJ2FkYXNkc2EnXG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBIYW5kbGVyID0gYXN5bmMgKGV2ZW50IDogYW55KSA9PiB7XG5jb25zb2xlLmluZm8oXCJFVkVOVFxcblwiICsgdGFibGVOYW1lKVxuXG4gIHRyeSB7XG4gICAgbGV0IHJlc3BvbnNlO1xuICAgIGlmIChldmVudC5odHRwTWV0aG9kID09PSAnUE9TVCcpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRiQ2xpZW50LnB1dChwYXJhbXMpLnByb21pc2UoKTtcbiAgICAgIGNvbnNvbGUuaW5mbyhcIkVWRU5UXFxuIGxpbmUgNDJcIiArIHJlc3VsdClcblxuXG4gICAgICAvLyBjb25zdCB0cnlUaGlzID0gYXdhaXQgc2F2ZURldmljZShldmVudCk7XG4gICAgICAvLyBjb25zb2xlLmluZm8odHJ5VGhpcylcbiAgICAgIC8vIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNsaWVudC5zZW5kKG5ldyBQdXRDb21tYW5kKHBhcmFtcykpO1xuICAgICAgLy8gaWYgKHJlc3VsdC4kbWV0YWRhdGEgJiYgcmVzdWx0LiRtZXRhZGF0YS5odHRwU3RhdHVzQ29kZSAmJiByZXN1bHQuJG1ldGFkYXRhLmh0dHBTdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgIC8vICAgcmV0dXJuIHRydWU7XG4gICAgICAvLyB9IGVsc2Uge1xuICAgICAgLy8gICByZXR1cm4gZmFsc2U7XG4gICAgICAvLyB9XG4gICAgfSBcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IGAke3RhYmxlTmFtZX0gU3VjY2Vzc2AsXG4gICAgICB9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogIDUwMCxcbiAgICAgICAgYm9keTogZSA9PT0gNTAwID8gJ0ludmFsaWQgUmVxdWVzdCBCb2R5JyA6ICdTb21ldGhpbmcgd2VudCB3cm9uZycsXG4gICAgICB9O1xuICB9XG4gIFxufTtcblxuXG5cblxuXG5cbi8vIGV4cG9ydCBhc3luYyBmdW5jdGlvbiBzYXZlRGV2aWNlKGV2ZW50IDogb2JqZWN0KTogUHJvbWlzZTxib29sZWFuPiB7XG4gIFxuXG5cbi8vICAgdHJ5IHtcbi8vICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjbGllbnQuc2VuZChuZXcgUHV0Q29tbWFuZChwYXJhbXMpKTtcbi8vICAgICBpZiAocmVzdWx0LiRtZXRhZGF0YSAmJiByZXN1bHQuJG1ldGFkYXRhLmh0dHBTdGF0dXNDb2RlICYmIHJlc3VsdC4kbWV0YWRhdGEuaHR0cFN0YXR1c0NvZGUgPT09IDIwMCkge1xuLy8gICAgICAgcmV0dXJuIHRydWU7XG4vLyAgICAgfSBlbHNlIHtcbi8vICAgICAgIHJldHVybiBmYWxzZTtcbi8vICAgICB9XG4vLyAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4vLyAgICAgdGhyb3cgZXJyO1xuLy8gICB9XG4vLyB9XG4iXX0=