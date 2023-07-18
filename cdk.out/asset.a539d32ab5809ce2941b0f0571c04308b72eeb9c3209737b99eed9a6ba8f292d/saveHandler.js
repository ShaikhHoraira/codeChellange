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
        'CUSTOMER_ID': 'This is idf',
        'CUSTOMER_NAME': 'this is name'
    }
};
const handler = async (event) => {
    console.info("EVENT\n" + tableName);
    try {
        let response;
        console.info("EVENT\n line 22" + response);
        if (event.httpMethod === 'POST') {
            console.info("EVENT\n line 57" + response);
            response = await ddb.PutItemCommand(params).promise();
            console.info("EVENT\n line 42" + response);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSw2REFBNkQ7QUFDN0QsV0FBVztBQUNYLDRCQUE0QjtBQUM1QixnQkFBZ0I7QUFDaEIscUJBQXFCO0FBQ3JCLGtDQUFrQztBQUdsQyxnR0FBZ0c7QUFDL0YsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUE7QUFDOUMsb0NBQW9DO0FBQ3BDLDBCQUEwQjtBQUMxQixZQUFZO0FBQ1osNEJBQTRCO0FBQzVCLG9CQUFvQjtBQUNwQix1Q0FBdUM7QUFDdkMsT0FBTztBQUNQLEtBQUs7QUFFTCwrQkFBK0I7QUFDL0Isc0RBQXNEO0FBQ3RELGtEQUFrRDtBQUNsRCxxQkFBcUI7QUFDckIsc0RBQXNEO0FBQ3RELDZEQUE2RDtBQUM3RCxpQkFBaUI7QUFDakIsMEJBQTBCO0FBQzFCLFlBQVk7QUFDWixnQ0FBZ0M7QUFDaEMsa0NBQWtDO0FBQ2xDLE1BQU07QUFDTixLQUFLO0FBQ0wsK0JBQStCO0FBQy9CLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM3QixrQkFBa0I7QUFDbEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBQyxNQUFNLEVBQUUsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDO0FBRTlDLHFDQUFxQztBQUNyQyxJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFDLENBQUMsQ0FBQztBQUV2RCxJQUFJLE1BQU0sR0FBRztJQUNYLFNBQVMsRUFBRSxlQUFlO0lBQzFCLElBQUksRUFBRTtRQUNKLGFBQWEsRUFBRyxhQUFhO1FBQzdCLGVBQWUsRUFBRyxjQUFjO0tBQ2pDO0NBQ0YsQ0FBQztBQUVLLE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFXLEVBQUUsRUFBRTtJQUN0RCxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQTtJQUVqQyxJQUFJO1FBQ0YsSUFBSSxRQUFRLENBQUM7UUFDYixPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxDQUFBO1FBQzFDLElBQUksS0FBSyxDQUFDLFVBQVUsS0FBSyxNQUFNLEVBQUU7WUFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUMsQ0FBQTtZQUMxQyxRQUFRLEdBQUcsTUFBTSxHQUFHLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3RELE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLENBQUE7WUFHMUMsMkNBQTJDO1lBQzNDLHdCQUF3QjtZQUN4Qiw0REFBNEQ7WUFDNUQsd0dBQXdHO1lBQ3hHLGlCQUFpQjtZQUNqQixXQUFXO1lBQ1gsa0JBQWtCO1lBQ2xCLElBQUk7U0FDTDtRQUNELE9BQU87WUFDSCxVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxHQUFHLFNBQVMsVUFBVTtTQUM3QixDQUFDO0tBQ0w7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU87WUFDSCxVQUFVLEVBQUcsR0FBRztZQUNoQixJQUFJLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtTQUNsRSxDQUFDO0tBQ0w7QUFFSCxDQUFDLENBQUM7QUFoQ1csUUFBQSxPQUFPLFdBZ0NsQjtBQU9GLHVFQUF1RTtBQUl2RSxVQUFVO0FBQ1YsZ0VBQWdFO0FBQ2hFLDRHQUE0RztBQUM1RyxxQkFBcUI7QUFDckIsZUFBZTtBQUNmLHNCQUFzQjtBQUN0QixRQUFRO0FBQ1IseUJBQXlCO0FBQ3pCLGlCQUFpQjtBQUNqQixNQUFNO0FBQ04sSUFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFB1dEl0ZW1Db21tYW5kIH0gZnJvbSAnQGF3cy1zZGsvY2xpZW50LWR5bmFtb2RiJztcbmltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuLy8gaW1wb3J0IHsgRHluYW1vREJDbGllbnQgfSBmcm9tICdAYXdzLXNkay9jbGllbnQtZHluYW1vZGInO1xuLy8gaW1wb3J0IHtcbi8vICAgRHluYW1vREJEb2N1bWVudENsaWVudCxcbi8vICAgUHV0Q29tbWFuZCxcbi8vICAgUHV0Q29tbWFuZElucHV0LFxuLy8gfSBmcm9tICdAYXdzLXNkay9saWItZHluYW1vZGInO1xuXG5cbi8vIGNvbnN0IGNsaWVudCA9IER5bmFtb0RCRG9jdW1lbnRDbGllbnQuZnJvbShuZXcgRHluYW1vREJDbGllbnQoeyByZWdpb246ICdhcC1zb3V0aGVhc3QtMicgfSkpO1xuIGNvbnN0IHRhYmxlTmFtZSA9IHByb2Nlc3MuZW52LlRPRE9fVEFCTEVfTkFNRVxuLy8gY29uc3QgcGFyYW1zOiBQdXRDb21tYW5kSW5wdXQgPSB7XG4vLyAgIFRhYmxlTmFtZTogdGFibGVOYW1lLFxuLy8gICBJdGVtOiB7XG4vLyAgICAgRGV2aWNlVG9rZW46ICdldmVudCcsXG4vLyAgICAgS2V5OiAnZXZlbnQnLFxuLy8gICAgIEZvcmdlSWQ6ICdldmVudCcgfHwgJ2Fub255bW91cycsXG4vLyAgIH0sXG4vLyB9O1xuXG4vLyBMb2FkIHRoZSBBV1MgU0RLIGZvciBOb2RlLmpzXG4vLyB2YXIgRHluYW1vZGIgPSByZXF1aXJlKCdhd3Mtc2RrL2NsaWVudHMvZHluYW1vZGInKTtcbi8vIGNvbnN0IGRiQ2xpZW50ID0gbmV3IER5bmFtb2RiLkRvY3VtZW50Q2xpZW50KCk7XG4vLyAvLyBTZXQgdGhlIHJlZ2lvbiBcbi8vIER5bmFtb2RiLmNvbmZpZy51cGRhdGUoe3JlZ2lvbjogJ2FwLXNvdXRoZWFzdC0yJ30pO1xuLy8gLy8gdmFyIGRkYiA9IG5ldyBBV1MuRHluYW1vREIoe2FwaVZlcnNpb246ICcyMDEyLTA4LTEwJ30pO1xuLy8gdmFyIHBhcmFtcyA9IHtcbi8vICAgVGFibGVOYW1lOiB0YWJsZU5hbWUsXG4vLyAgIEl0ZW06IHtcbi8vICAgICAnQ1VTVE9NRVJfSUQnIDogJ2FzZGFzZCcsXG4vLyAgICAgJ0NVU1RPTUVSX05BTUUnIDogJ2FkYXNkc2EnXG4vLyAgIH1cbi8vIH07XG4vLyBMb2FkIHRoZSBBV1MgU0RLIGZvciBOb2RlLmpzXG52YXIgQVdTID0gcmVxdWlyZSgnYXdzLXNkaycpO1xuLy8gU2V0IHRoZSByZWdpb24gXG5BV1MuY29uZmlnLnVwZGF0ZSh7cmVnaW9uOiAnYXAtc291dGhlYXN0LTInfSk7XG5cbi8vIENyZWF0ZSB0aGUgRHluYW1vREIgc2VydmljZSBvYmplY3RcbnZhciBkZGIgPSBuZXcgQVdTLkR5bmFtb0RCKHthcGlWZXJzaW9uOiAnMjAxMi0wOC0xMCd9KTtcblxudmFyIHBhcmFtcyA9IHtcbiAgVGFibGVOYW1lOiAnQ1VTVE9NRVJfTElTVCcsXG4gIEl0ZW06IHtcbiAgICAnQ1VTVE9NRVJfSUQnIDogJ1RoaXMgaXMgaWRmJyxcbiAgICAnQ1VTVE9NRVJfTkFNRScgOiAndGhpcyBpcyBuYW1lJ1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudCA6IGFueSkgPT4ge1xuY29uc29sZS5pbmZvKFwiRVZFTlRcXG5cIiArIHRhYmxlTmFtZSlcblxuICB0cnkge1xuICAgIGxldCByZXNwb25zZTtcbiAgICBjb25zb2xlLmluZm8oXCJFVkVOVFxcbiBsaW5lIDIyXCIgKyByZXNwb25zZSlcbiAgICBpZiAoZXZlbnQuaHR0cE1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgICBjb25zb2xlLmluZm8oXCJFVkVOVFxcbiBsaW5lIDU3XCIgKyByZXNwb25zZSlcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgZGRiLlB1dEl0ZW1Db21tYW5kKHBhcmFtcykucHJvbWlzZSgpO1xuICAgICAgY29uc29sZS5pbmZvKFwiRVZFTlRcXG4gbGluZSA0MlwiICsgcmVzcG9uc2UpXG5cblxuICAgICAgLy8gY29uc3QgdHJ5VGhpcyA9IGF3YWl0IHNhdmVEZXZpY2UoZXZlbnQpO1xuICAgICAgLy8gY29uc29sZS5pbmZvKHRyeVRoaXMpXG4gICAgICAvLyBjb25zdCByZXN1bHQgPSBhd2FpdCBjbGllbnQuc2VuZChuZXcgUHV0Q29tbWFuZChwYXJhbXMpKTtcbiAgICAgIC8vIGlmIChyZXN1bHQuJG1ldGFkYXRhICYmIHJlc3VsdC4kbWV0YWRhdGEuaHR0cFN0YXR1c0NvZGUgJiYgcmVzdWx0LiRtZXRhZGF0YS5odHRwU3RhdHVzQ29kZSA9PT0gMjAwKSB7XG4gICAgICAvLyAgIHJldHVybiB0cnVlO1xuICAgICAgLy8gfSBlbHNlIHtcbiAgICAgIC8vICAgcmV0dXJuIGZhbHNlO1xuICAgICAgLy8gfVxuICAgIH0gXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiBgJHt0YWJsZU5hbWV9IFN1Y2Nlc3NgLFxuICAgICAgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6ICA1MDAsXG4gICAgICAgIGJvZHk6IGUgPT09IDUwMCA/ICdJbnZhbGlkIFJlcXVlc3QgQm9keScgOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnLFxuICAgICAgfTtcbiAgfVxuICBcbn07XG5cblxuXG5cblxuXG4vLyBleHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZURldmljZShldmVudCA6IG9iamVjdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICBcblxuXG4vLyAgIHRyeSB7XG4vLyAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2xpZW50LnNlbmQobmV3IFB1dENvbW1hbmQocGFyYW1zKSk7XG4vLyAgICAgaWYgKHJlc3VsdC4kbWV0YWRhdGEgJiYgcmVzdWx0LiRtZXRhZGF0YS5odHRwU3RhdHVzQ29kZSAmJiByZXN1bHQuJG1ldGFkYXRhLmh0dHBTdGF0dXNDb2RlID09PSAyMDApIHtcbi8vICAgICAgIHJldHVybiB0cnVlO1xuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgICByZXR1cm4gZmFsc2U7XG4vLyAgICAgfVxuLy8gICB9IGNhdGNoIChlcnI6IGFueSkge1xuLy8gICAgIHRocm93IGVycjtcbi8vICAgfVxuLy8gfVxuIl19