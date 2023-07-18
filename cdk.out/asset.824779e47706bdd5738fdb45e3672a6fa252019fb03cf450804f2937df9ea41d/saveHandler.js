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
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: 'ap-southeast-2' });
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
var params = {
    TableName: tableName,
    Item: {
        'CUSTOMER_ID': { N: '001' },
        'CUSTOMER_NAME': { S: 'Richard Roe' }
    }
};
const handler = async (event) => {
    console.info("EVENT\n" + event.body.data);
    try {
        let response;
        if (event.httpMethod === 'POST') {
            // const tryThis = await saveDevice(event);
            // console.info(tryThis)
            ddb.putItem(params, function (err, data) {
                if (err) {
                    console.log("Error", err);
                }
                else {
                    console.log("Success", data);
                }
            });
            // const result = await client.send(new PutCommand(params));
            // if (result.$metadata && result.$metadata.httpStatusCode && result.$metadata.httpStatusCode === 200) {
            //   return true;
            // } else {
            //   return false;
            // }
        }
        return {
            statusCode: 200,
            body: `${event.body} Success`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw2REFBNkQ7QUFDN0QsV0FBVztBQUNYLDRCQUE0QjtBQUM1QixnQkFBZ0I7QUFDaEIscUJBQXFCO0FBQ3JCLGtDQUFrQztBQUdsQyxnR0FBZ0c7QUFDL0YsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUE7QUFDOUMsb0NBQW9DO0FBQ3BDLDBCQUEwQjtBQUMxQixZQUFZO0FBQ1osNEJBQTRCO0FBQzVCLG9CQUFvQjtBQUNwQix1Q0FBdUM7QUFDdkMsT0FBTztBQUNQLEtBQUs7QUFFTCwrQkFBK0I7QUFDL0IsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzdCLGtCQUFrQjtBQUNsQixHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFDLE1BQU0sRUFBRSxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7QUFDOUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUMsVUFBVSxFQUFFLFlBQVksRUFBQyxDQUFDLENBQUM7QUFDdkQsSUFBSSxNQUFNLEdBQUc7SUFDWCxTQUFTLEVBQUUsU0FBUztJQUNwQixJQUFJLEVBQUU7UUFDSixhQUFhLEVBQUcsRUFBQyxDQUFDLEVBQUUsS0FBSyxFQUFDO1FBQzFCLGVBQWUsRUFBRyxFQUFDLENBQUMsRUFBRSxhQUFhLEVBQUM7S0FDckM7Q0FDRixDQUFDO0FBRUssTUFBTSxPQUFPLEdBQVksS0FBSyxFQUFFLEtBQVcsRUFBRSxFQUFFO0lBQ3RELE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFFdkMsSUFBSTtRQUNGLElBQUksUUFBUSxDQUFDO1FBQ2IsSUFBSSxLQUFLLENBQUMsVUFBVSxLQUFLLE1BQU0sRUFBRTtZQUMvQiwyQ0FBMkM7WUFDM0Msd0JBQXdCO1lBQ3hCLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFVBQVMsR0FBUSxFQUFFLElBQVM7Z0JBQzlDLElBQUksR0FBRyxFQUFFO29CQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUMzQjtxQkFBTTtvQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDOUI7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVILDREQUE0RDtZQUM1RCx3R0FBd0c7WUFDeEcsaUJBQWlCO1lBQ2pCLFdBQVc7WUFDWCxrQkFBa0I7WUFDbEIsSUFBSTtTQUNMO1FBQ0QsT0FBTztZQUNILFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLElBQUksVUFBVTtTQUM5QixDQUFDO0tBQ0w7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU87WUFDSCxVQUFVLEVBQUcsR0FBRztZQUNoQixJQUFJLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtTQUNsRSxDQUFDO0tBQ0w7QUFFSCxDQUFDLENBQUM7QUFsQ1csUUFBQSxPQUFPLFdBa0NsQjtBQU9GLHVFQUF1RTtBQUl2RSxVQUFVO0FBQ1YsZ0VBQWdFO0FBQ2hFLDRHQUE0RztBQUM1RyxxQkFBcUI7QUFDckIsZUFBZTtBQUNmLHNCQUFzQjtBQUN0QixRQUFRO0FBQ1IseUJBQXlCO0FBQ3pCLGlCQUFpQjtBQUNqQixNQUFNO0FBQ04sSUFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuLy8gaW1wb3J0IHsgRHluYW1vREJDbGllbnQgfSBmcm9tICdAYXdzLXNkay9jbGllbnQtZHluYW1vZGInO1xuLy8gaW1wb3J0IHtcbi8vICAgRHluYW1vREJEb2N1bWVudENsaWVudCxcbi8vICAgUHV0Q29tbWFuZCxcbi8vICAgUHV0Q29tbWFuZElucHV0LFxuLy8gfSBmcm9tICdAYXdzLXNkay9saWItZHluYW1vZGInO1xuXG5cbi8vIGNvbnN0IGNsaWVudCA9IER5bmFtb0RCRG9jdW1lbnRDbGllbnQuZnJvbShuZXcgRHluYW1vREJDbGllbnQoeyByZWdpb246ICdhcC1zb3V0aGVhc3QtMicgfSkpO1xuIGNvbnN0IHRhYmxlTmFtZSA9IHByb2Nlc3MuZW52LlRPRE9fVEFCTEVfTkFNRVxuLy8gY29uc3QgcGFyYW1zOiBQdXRDb21tYW5kSW5wdXQgPSB7XG4vLyAgIFRhYmxlTmFtZTogdGFibGVOYW1lLFxuLy8gICBJdGVtOiB7XG4vLyAgICAgRGV2aWNlVG9rZW46ICdldmVudCcsXG4vLyAgICAgS2V5OiAnZXZlbnQnLFxuLy8gICAgIEZvcmdlSWQ6ICdldmVudCcgfHwgJ2Fub255bW91cycsXG4vLyAgIH0sXG4vLyB9O1xuXG4vLyBMb2FkIHRoZSBBV1MgU0RLIGZvciBOb2RlLmpzXG52YXIgQVdTID0gcmVxdWlyZSgnYXdzLXNkaycpO1xuLy8gU2V0IHRoZSByZWdpb24gXG5BV1MuY29uZmlnLnVwZGF0ZSh7cmVnaW9uOiAnYXAtc291dGhlYXN0LTInfSk7XG52YXIgZGRiID0gbmV3IEFXUy5EeW5hbW9EQih7YXBpVmVyc2lvbjogJzIwMTItMDgtMTAnfSk7XG52YXIgcGFyYW1zID0ge1xuICBUYWJsZU5hbWU6IHRhYmxlTmFtZSxcbiAgSXRlbToge1xuICAgICdDVVNUT01FUl9JRCcgOiB7TjogJzAwMSd9LFxuICAgICdDVVNUT01FUl9OQU1FJyA6IHtTOiAnUmljaGFyZCBSb2UnfVxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudCA6IGFueSkgPT4ge1xuY29uc29sZS5pbmZvKFwiRVZFTlRcXG5cIiArIGV2ZW50LmJvZHkuZGF0YSlcblxuICB0cnkge1xuICAgIGxldCByZXNwb25zZTtcbiAgICBpZiAoZXZlbnQuaHR0cE1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgICAvLyBjb25zdCB0cnlUaGlzID0gYXdhaXQgc2F2ZURldmljZShldmVudCk7XG4gICAgICAvLyBjb25zb2xlLmluZm8odHJ5VGhpcylcbiAgICAgIGRkYi5wdXRJdGVtKHBhcmFtcywgZnVuY3Rpb24oZXJyOiBhbnksIGRhdGE6IGFueSkge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvclwiLCBlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3VjY2Vzc1wiLCBkYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNsaWVudC5zZW5kKG5ldyBQdXRDb21tYW5kKHBhcmFtcykpO1xuICAgICAgLy8gaWYgKHJlc3VsdC4kbWV0YWRhdGEgJiYgcmVzdWx0LiRtZXRhZGF0YS5odHRwU3RhdHVzQ29kZSAmJiByZXN1bHQuJG1ldGFkYXRhLmh0dHBTdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgIC8vICAgcmV0dXJuIHRydWU7XG4gICAgICAvLyB9IGVsc2Uge1xuICAgICAgLy8gICByZXR1cm4gZmFsc2U7XG4gICAgICAvLyB9XG4gICAgfSBcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IGAke2V2ZW50LmJvZHl9IFN1Y2Nlc3NgLFxuICAgICAgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6ICA1MDAsXG4gICAgICAgIGJvZHk6IGUgPT09IDUwMCA/ICdJbnZhbGlkIFJlcXVlc3QgQm9keScgOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnLFxuICAgICAgfTtcbiAgfVxuICBcbn07XG5cblxuXG5cblxuXG4vLyBleHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZURldmljZShldmVudCA6IG9iamVjdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICBcblxuXG4vLyAgIHRyeSB7XG4vLyAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2xpZW50LnNlbmQobmV3IFB1dENvbW1hbmQocGFyYW1zKSk7XG4vLyAgICAgaWYgKHJlc3VsdC4kbWV0YWRhdGEgJiYgcmVzdWx0LiRtZXRhZGF0YS5odHRwU3RhdHVzQ29kZSAmJiByZXN1bHQuJG1ldGFkYXRhLmh0dHBTdGF0dXNDb2RlID09PSAyMDApIHtcbi8vICAgICAgIHJldHVybiB0cnVlO1xuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgICByZXR1cm4gZmFsc2U7XG4vLyAgICAgfVxuLy8gICB9IGNhdGNoIChlcnI6IGFueSkge1xuLy8gICAgIHRocm93IGVycjtcbi8vICAgfVxuLy8gfVxuIl19