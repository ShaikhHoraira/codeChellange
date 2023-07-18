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
// var Dynamodb = require('aws-sdk/clients/dynamodb');
// const dbClient = new Dynamodb.DocumentClient();
// // Set the region 
// Dynamodb.config.update({region: 'ap-southeast-2'});
// // var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
// var params = {
//   TableName: tableName,
//   Item: {
//     'CUSTOMER_ID' : 'asdasd',
//     'CUSTOMER_NAME' : 'adasdsa'
//   }
// };
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: 'ap-southeast-2' });
// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
var params = {
    TableName: 'CUSTOMER_LIST',
    Item: {
        'CUSTOMER_ID': { N: '001' },
        'CUSTOMER_NAME': { S: 'Richard Roe' }
    }
};
const handler = async (event) => {
    console.info("EVENT\n" + tableName);
    try {
        let response;
        if (event.httpMethod === 'POST') {
            const result = await ddb.put(params).promise();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw2REFBNkQ7QUFDN0QsV0FBVztBQUNYLDRCQUE0QjtBQUM1QixnQkFBZ0I7QUFDaEIscUJBQXFCO0FBQ3JCLGtDQUFrQztBQUdsQyxnR0FBZ0c7QUFDL0YsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUE7QUFDOUMsb0NBQW9DO0FBQ3BDLDBCQUEwQjtBQUMxQixZQUFZO0FBQ1osNEJBQTRCO0FBQzVCLG9CQUFvQjtBQUNwQix1Q0FBdUM7QUFDdkMsT0FBTztBQUNQLEtBQUs7QUFFTCwrQkFBK0I7QUFDL0Isc0RBQXNEO0FBQ3RELGtEQUFrRDtBQUNsRCxxQkFBcUI7QUFDckIsc0RBQXNEO0FBQ3RELDZEQUE2RDtBQUM3RCxpQkFBaUI7QUFDakIsMEJBQTBCO0FBQzFCLFlBQVk7QUFDWixnQ0FBZ0M7QUFDaEMsa0NBQWtDO0FBQ2xDLE1BQU07QUFDTixLQUFLO0FBQ0wsK0JBQStCO0FBQy9CLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM3QixrQkFBa0I7QUFDbEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBQyxNQUFNLEVBQUUsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDO0FBRTlDLHFDQUFxQztBQUNyQyxJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFDLENBQUMsQ0FBQztBQUV2RCxJQUFJLE1BQU0sR0FBRztJQUNYLFNBQVMsRUFBRSxlQUFlO0lBQzFCLElBQUksRUFBRTtRQUNKLGFBQWEsRUFBRyxFQUFDLENBQUMsRUFBRSxLQUFLLEVBQUM7UUFDMUIsZUFBZSxFQUFHLEVBQUMsQ0FBQyxFQUFFLGFBQWEsRUFBQztLQUNyQztDQUNGLENBQUM7QUFFSyxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVyxFQUFFLEVBQUU7SUFDdEQsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUE7SUFFakMsSUFBSTtRQUNGLElBQUksUUFBUSxDQUFDO1FBQ2IsSUFBSSxLQUFLLENBQUMsVUFBVSxLQUFLLE1BQU0sRUFBRTtZQUMvQixNQUFNLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDL0MsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUMsQ0FBQTtZQUd4QywyQ0FBMkM7WUFDM0Msd0JBQXdCO1lBQ3hCLDREQUE0RDtZQUM1RCx3R0FBd0c7WUFDeEcsaUJBQWlCO1lBQ2pCLFdBQVc7WUFDWCxrQkFBa0I7WUFDbEIsSUFBSTtTQUNMO1FBQ0QsT0FBTztZQUNILFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLEdBQUcsU0FBUyxVQUFVO1NBQzdCLENBQUM7S0FDTDtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTztZQUNILFVBQVUsRUFBRyxHQUFHO1lBQ2hCLElBQUksRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsc0JBQXNCO1NBQ2xFLENBQUM7S0FDTDtBQUVILENBQUMsQ0FBQztBQTlCVyxRQUFBLE9BQU8sV0E4QmxCO0FBT0YsdUVBQXVFO0FBSXZFLFVBQVU7QUFDVixnRUFBZ0U7QUFDaEUsNEdBQTRHO0FBQzVHLHFCQUFxQjtBQUNyQixlQUFlO0FBQ2Ysc0JBQXNCO0FBQ3RCLFFBQVE7QUFDUix5QkFBeUI7QUFDekIsaUJBQWlCO0FBQ2pCLE1BQU07QUFDTixJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XG4vLyBpbXBvcnQgeyBEeW5hbW9EQkNsaWVudCB9IGZyb20gJ0Bhd3Mtc2RrL2NsaWVudC1keW5hbW9kYic7XG4vLyBpbXBvcnQge1xuLy8gICBEeW5hbW9EQkRvY3VtZW50Q2xpZW50LFxuLy8gICBQdXRDb21tYW5kLFxuLy8gICBQdXRDb21tYW5kSW5wdXQsXG4vLyB9IGZyb20gJ0Bhd3Mtc2RrL2xpYi1keW5hbW9kYic7XG5cblxuLy8gY29uc3QgY2xpZW50ID0gRHluYW1vREJEb2N1bWVudENsaWVudC5mcm9tKG5ldyBEeW5hbW9EQkNsaWVudCh7IHJlZ2lvbjogJ2FwLXNvdXRoZWFzdC0yJyB9KSk7XG4gY29uc3QgdGFibGVOYW1lID0gcHJvY2Vzcy5lbnYuVE9ET19UQUJMRV9OQU1FXG4vLyBjb25zdCBwYXJhbXM6IFB1dENvbW1hbmRJbnB1dCA9IHtcbi8vICAgVGFibGVOYW1lOiB0YWJsZU5hbWUsXG4vLyAgIEl0ZW06IHtcbi8vICAgICBEZXZpY2VUb2tlbjogJ2V2ZW50Jyxcbi8vICAgICBLZXk6ICdldmVudCcsXG4vLyAgICAgRm9yZ2VJZDogJ2V2ZW50JyB8fCAnYW5vbnltb3VzJyxcbi8vICAgfSxcbi8vIH07XG5cbi8vIExvYWQgdGhlIEFXUyBTREsgZm9yIE5vZGUuanNcbi8vIHZhciBEeW5hbW9kYiA9IHJlcXVpcmUoJ2F3cy1zZGsvY2xpZW50cy9keW5hbW9kYicpO1xuLy8gY29uc3QgZGJDbGllbnQgPSBuZXcgRHluYW1vZGIuRG9jdW1lbnRDbGllbnQoKTtcbi8vIC8vIFNldCB0aGUgcmVnaW9uIFxuLy8gRHluYW1vZGIuY29uZmlnLnVwZGF0ZSh7cmVnaW9uOiAnYXAtc291dGhlYXN0LTInfSk7XG4vLyAvLyB2YXIgZGRiID0gbmV3IEFXUy5EeW5hbW9EQih7YXBpVmVyc2lvbjogJzIwMTItMDgtMTAnfSk7XG4vLyB2YXIgcGFyYW1zID0ge1xuLy8gICBUYWJsZU5hbWU6IHRhYmxlTmFtZSxcbi8vICAgSXRlbToge1xuLy8gICAgICdDVVNUT01FUl9JRCcgOiAnYXNkYXNkJyxcbi8vICAgICAnQ1VTVE9NRVJfTkFNRScgOiAnYWRhc2RzYSdcbi8vICAgfVxuLy8gfTtcbi8vIExvYWQgdGhlIEFXUyBTREsgZm9yIE5vZGUuanNcbnZhciBBV1MgPSByZXF1aXJlKCdhd3Mtc2RrJyk7XG4vLyBTZXQgdGhlIHJlZ2lvbiBcbkFXUy5jb25maWcudXBkYXRlKHtyZWdpb246ICdhcC1zb3V0aGVhc3QtMid9KTtcblxuLy8gQ3JlYXRlIHRoZSBEeW5hbW9EQiBzZXJ2aWNlIG9iamVjdFxudmFyIGRkYiA9IG5ldyBBV1MuRHluYW1vREIoe2FwaVZlcnNpb246ICcyMDEyLTA4LTEwJ30pO1xuXG52YXIgcGFyYW1zID0ge1xuICBUYWJsZU5hbWU6ICdDVVNUT01FUl9MSVNUJyxcbiAgSXRlbToge1xuICAgICdDVVNUT01FUl9JRCcgOiB7TjogJzAwMSd9LFxuICAgICdDVVNUT01FUl9OQU1FJyA6IHtTOiAnUmljaGFyZCBSb2UnfVxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudCA6IGFueSkgPT4ge1xuY29uc29sZS5pbmZvKFwiRVZFTlRcXG5cIiArIHRhYmxlTmFtZSlcblxuICB0cnkge1xuICAgIGxldCByZXNwb25zZTtcbiAgICBpZiAoZXZlbnQuaHR0cE1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBkZGIucHV0KHBhcmFtcykucHJvbWlzZSgpO1xuICAgICAgY29uc29sZS5pbmZvKFwiRVZFTlRcXG4gbGluZSA0MlwiICsgcmVzdWx0KVxuXG5cbiAgICAgIC8vIGNvbnN0IHRyeVRoaXMgPSBhd2FpdCBzYXZlRGV2aWNlKGV2ZW50KTtcbiAgICAgIC8vIGNvbnNvbGUuaW5mbyh0cnlUaGlzKVxuICAgICAgLy8gY29uc3QgcmVzdWx0ID0gYXdhaXQgY2xpZW50LnNlbmQobmV3IFB1dENvbW1hbmQocGFyYW1zKSk7XG4gICAgICAvLyBpZiAocmVzdWx0LiRtZXRhZGF0YSAmJiByZXN1bHQuJG1ldGFkYXRhLmh0dHBTdGF0dXNDb2RlICYmIHJlc3VsdC4kbWV0YWRhdGEuaHR0cFN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgLy8gICByZXR1cm4gdHJ1ZTtcbiAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAvLyAgIHJldHVybiBmYWxzZTtcbiAgICAgIC8vIH1cbiAgICB9IFxuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keTogYCR7dGFibGVOYW1lfSBTdWNjZXNzYCxcbiAgICAgIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAgNTAwLFxuICAgICAgICBib2R5OiBlID09PSA1MDAgPyAnSW52YWxpZCBSZXF1ZXN0IEJvZHknIDogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyxcbiAgICAgIH07XG4gIH1cbiAgXG59O1xuXG5cblxuXG5cblxuLy8gZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVEZXZpY2UoZXZlbnQgOiBvYmplY3QpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgXG5cblxuLy8gICB0cnkge1xuLy8gICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNsaWVudC5zZW5kKG5ldyBQdXRDb21tYW5kKHBhcmFtcykpO1xuLy8gICAgIGlmIChyZXN1bHQuJG1ldGFkYXRhICYmIHJlc3VsdC4kbWV0YWRhdGEuaHR0cFN0YXR1c0NvZGUgJiYgcmVzdWx0LiRtZXRhZGF0YS5odHRwU3RhdHVzQ29kZSA9PT0gMjAwKSB7XG4vLyAgICAgICByZXR1cm4gdHJ1ZTtcbi8vICAgICB9IGVsc2Uge1xuLy8gICAgICAgcmV0dXJuIGZhbHNlO1xuLy8gICAgIH1cbi8vICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbi8vICAgICB0aHJvdyBlcnI7XG4vLyAgIH1cbi8vIH1cbiJdfQ==