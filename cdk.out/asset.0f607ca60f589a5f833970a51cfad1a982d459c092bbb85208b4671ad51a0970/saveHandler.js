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
            // const tryThis = await saveDevice(event);
            // console.info(tryThis)
            const result = await dbClient.put(params).promise();
            console.info("EVENT\n" + result);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw2REFBNkQ7QUFDN0QsV0FBVztBQUNYLDRCQUE0QjtBQUM1QixnQkFBZ0I7QUFDaEIscUJBQXFCO0FBQ3JCLGtDQUFrQztBQUdsQyxnR0FBZ0c7QUFDL0YsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUE7QUFDOUMsb0NBQW9DO0FBQ3BDLDBCQUEwQjtBQUMxQixZQUFZO0FBQ1osNEJBQTRCO0FBQzVCLG9CQUFvQjtBQUNwQix1Q0FBdUM7QUFDdkMsT0FBTztBQUNQLEtBQUs7QUFFTCwrQkFBK0I7QUFDL0IsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDbkQsTUFBTSxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDL0Msa0JBQWtCO0FBQ2xCLGlEQUFpRDtBQUNqRCwwREFBMEQ7QUFDMUQsSUFBSSxNQUFNLEdBQUc7SUFDWCxTQUFTLEVBQUUsU0FBUztJQUNwQixJQUFJLEVBQUU7UUFDSixhQUFhLEVBQUcsUUFBUTtRQUN4QixlQUFlLEVBQUcsU0FBUztLQUM1QjtDQUNGLENBQUM7QUFFSyxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVyxFQUFFLEVBQUU7SUFDdEQsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUE7SUFFakMsSUFBSTtRQUNGLElBQUksUUFBUSxDQUFDO1FBQ2IsSUFBSSxLQUFLLENBQUMsVUFBVSxLQUFLLE1BQU0sRUFBRTtZQUMvQiwyQ0FBMkM7WUFDM0Msd0JBQXdCO1lBQ3hCLE1BQU0sTUFBTSxHQUFHLE1BQU0sUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNwRCxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsQ0FBQTtZQUNoQyw0REFBNEQ7WUFDNUQsd0dBQXdHO1lBQ3hHLGlCQUFpQjtZQUNqQixXQUFXO1lBQ1gsa0JBQWtCO1lBQ2xCLElBQUk7U0FDTDtRQUNELE9BQU87WUFDSCxVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxHQUFHLFNBQVMsVUFBVTtTQUM3QixDQUFDO0tBQ0w7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU87WUFDSCxVQUFVLEVBQUcsR0FBRztZQUNoQixJQUFJLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtTQUNsRSxDQUFDO0tBQ0w7QUFFSCxDQUFDLENBQUM7QUE1QlcsUUFBQSxPQUFPLFdBNEJsQjtBQU9GLHVFQUF1RTtBQUl2RSxVQUFVO0FBQ1YsZ0VBQWdFO0FBQ2hFLDRHQUE0RztBQUM1RyxxQkFBcUI7QUFDckIsZUFBZTtBQUNmLHNCQUFzQjtBQUN0QixRQUFRO0FBQ1IseUJBQXlCO0FBQ3pCLGlCQUFpQjtBQUNqQixNQUFNO0FBQ04sSUFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuLy8gaW1wb3J0IHsgRHluYW1vREJDbGllbnQgfSBmcm9tICdAYXdzLXNkay9jbGllbnQtZHluYW1vZGInO1xuLy8gaW1wb3J0IHtcbi8vICAgRHluYW1vREJEb2N1bWVudENsaWVudCxcbi8vICAgUHV0Q29tbWFuZCxcbi8vICAgUHV0Q29tbWFuZElucHV0LFxuLy8gfSBmcm9tICdAYXdzLXNkay9saWItZHluYW1vZGInO1xuXG5cbi8vIGNvbnN0IGNsaWVudCA9IER5bmFtb0RCRG9jdW1lbnRDbGllbnQuZnJvbShuZXcgRHluYW1vREJDbGllbnQoeyByZWdpb246ICdhcC1zb3V0aGVhc3QtMicgfSkpO1xuIGNvbnN0IHRhYmxlTmFtZSA9IHByb2Nlc3MuZW52LlRPRE9fVEFCTEVfTkFNRVxuLy8gY29uc3QgcGFyYW1zOiBQdXRDb21tYW5kSW5wdXQgPSB7XG4vLyAgIFRhYmxlTmFtZTogdGFibGVOYW1lLFxuLy8gICBJdGVtOiB7XG4vLyAgICAgRGV2aWNlVG9rZW46ICdldmVudCcsXG4vLyAgICAgS2V5OiAnZXZlbnQnLFxuLy8gICAgIEZvcmdlSWQ6ICdldmVudCcgfHwgJ2Fub255bW91cycsXG4vLyAgIH0sXG4vLyB9O1xuXG4vLyBMb2FkIHRoZSBBV1MgU0RLIGZvciBOb2RlLmpzXG52YXIgRHluYW1vZGIgPSByZXF1aXJlKCdhd3Mtc2RrL2NsaWVudHMvZHluYW1vZGInKTtcbmNvbnN0IGRiQ2xpZW50ID0gbmV3IER5bmFtb2RiLkRvY3VtZW50Q2xpZW50KCk7XG4vLyBTZXQgdGhlIHJlZ2lvbiBcbi8vIEFXUy5jb25maWcudXBkYXRlKHtyZWdpb246ICdhcC1zb3V0aGVhc3QtMid9KTtcbi8vIHZhciBkZGIgPSBuZXcgQVdTLkR5bmFtb0RCKHthcGlWZXJzaW9uOiAnMjAxMi0wOC0xMCd9KTtcbnZhciBwYXJhbXMgPSB7XG4gIFRhYmxlTmFtZTogdGFibGVOYW1lLFxuICBJdGVtOiB7XG4gICAgJ0NVU1RPTUVSX0lEJyA6ICdhc2Rhc2QnLFxuICAgICdDVVNUT01FUl9OQU1FJyA6ICdhZGFzZHNhJ1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudCA6IGFueSkgPT4ge1xuY29uc29sZS5pbmZvKFwiRVZFTlRcXG5cIiArIHRhYmxlTmFtZSlcblxuICB0cnkge1xuICAgIGxldCByZXNwb25zZTtcbiAgICBpZiAoZXZlbnQuaHR0cE1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgICAvLyBjb25zdCB0cnlUaGlzID0gYXdhaXQgc2F2ZURldmljZShldmVudCk7XG4gICAgICAvLyBjb25zb2xlLmluZm8odHJ5VGhpcylcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRiQ2xpZW50LnB1dChwYXJhbXMpLnByb21pc2UoKTtcbiAgICAgIGNvbnNvbGUuaW5mbyhcIkVWRU5UXFxuXCIgKyByZXN1bHQpXG4gICAgICAvLyBjb25zdCByZXN1bHQgPSBhd2FpdCBjbGllbnQuc2VuZChuZXcgUHV0Q29tbWFuZChwYXJhbXMpKTtcbiAgICAgIC8vIGlmIChyZXN1bHQuJG1ldGFkYXRhICYmIHJlc3VsdC4kbWV0YWRhdGEuaHR0cFN0YXR1c0NvZGUgJiYgcmVzdWx0LiRtZXRhZGF0YS5odHRwU3RhdHVzQ29kZSA9PT0gMjAwKSB7XG4gICAgICAvLyAgIHJldHVybiB0cnVlO1xuICAgICAgLy8gfSBlbHNlIHtcbiAgICAgIC8vICAgcmV0dXJuIGZhbHNlO1xuICAgICAgLy8gfVxuICAgIH0gXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiBgJHt0YWJsZU5hbWV9IFN1Y2Nlc3NgLFxuICAgICAgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6ICA1MDAsXG4gICAgICAgIGJvZHk6IGUgPT09IDUwMCA/ICdJbnZhbGlkIFJlcXVlc3QgQm9keScgOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnLFxuICAgICAgfTtcbiAgfVxuICBcbn07XG5cblxuXG5cblxuXG4vLyBleHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZURldmljZShldmVudCA6IG9iamVjdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICBcblxuXG4vLyAgIHRyeSB7XG4vLyAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2xpZW50LnNlbmQobmV3IFB1dENvbW1hbmQocGFyYW1zKSk7XG4vLyAgICAgaWYgKHJlc3VsdC4kbWV0YWRhdGEgJiYgcmVzdWx0LiRtZXRhZGF0YS5odHRwU3RhdHVzQ29kZSAmJiByZXN1bHQuJG1ldGFkYXRhLmh0dHBTdGF0dXNDb2RlID09PSAyMDApIHtcbi8vICAgICAgIHJldHVybiB0cnVlO1xuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgICByZXR1cm4gZmFsc2U7XG4vLyAgICAgfVxuLy8gICB9IGNhdGNoIChlcnI6IGFueSkge1xuLy8gICAgIHRocm93IGVycjtcbi8vICAgfVxuLy8gfVxuIl19