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
        console.info("EVENT\n line 22" + response);
        if (event.httpMethod === 'POST') {
            console.info("EVENT\n line 57" + response);
            response = await ddb.put(params).promise();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw2REFBNkQ7QUFDN0QsV0FBVztBQUNYLDRCQUE0QjtBQUM1QixnQkFBZ0I7QUFDaEIscUJBQXFCO0FBQ3JCLGtDQUFrQztBQUdsQyxnR0FBZ0c7QUFDL0YsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUE7QUFDOUMsb0NBQW9DO0FBQ3BDLDBCQUEwQjtBQUMxQixZQUFZO0FBQ1osNEJBQTRCO0FBQzVCLG9CQUFvQjtBQUNwQix1Q0FBdUM7QUFDdkMsT0FBTztBQUNQLEtBQUs7QUFFTCwrQkFBK0I7QUFDL0Isc0RBQXNEO0FBQ3RELGtEQUFrRDtBQUNsRCxxQkFBcUI7QUFDckIsc0RBQXNEO0FBQ3RELDZEQUE2RDtBQUM3RCxpQkFBaUI7QUFDakIsMEJBQTBCO0FBQzFCLFlBQVk7QUFDWixnQ0FBZ0M7QUFDaEMsa0NBQWtDO0FBQ2xDLE1BQU07QUFDTixLQUFLO0FBQ0wsK0JBQStCO0FBQy9CLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM3QixrQkFBa0I7QUFDbEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBQyxNQUFNLEVBQUUsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDO0FBRTlDLHFDQUFxQztBQUNyQyxJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFDLENBQUMsQ0FBQztBQUV2RCxJQUFJLE1BQU0sR0FBRztJQUNYLFNBQVMsRUFBRSxlQUFlO0lBQzFCLElBQUksRUFBRTtRQUNKLGFBQWEsRUFBRyxFQUFDLENBQUMsRUFBRSxLQUFLLEVBQUM7UUFDMUIsZUFBZSxFQUFHLEVBQUMsQ0FBQyxFQUFFLGFBQWEsRUFBQztLQUNyQztDQUNGLENBQUM7QUFFSyxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVyxFQUFFLEVBQUU7SUFDdEQsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUE7SUFFakMsSUFBSTtRQUNGLElBQUksUUFBUSxDQUFDO1FBQ2IsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUMsQ0FBQTtRQUMxQyxJQUFJLEtBQUssQ0FBQyxVQUFVLEtBQUssTUFBTSxFQUFFO1lBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLENBQUE7WUFDMUMsUUFBUSxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMzQyxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxDQUFBO1lBRzFDLDJDQUEyQztZQUMzQyx3QkFBd0I7WUFDeEIsNERBQTREO1lBQzVELHdHQUF3RztZQUN4RyxpQkFBaUI7WUFDakIsV0FBVztZQUNYLGtCQUFrQjtZQUNsQixJQUFJO1NBQ0w7UUFDRCxPQUFPO1lBQ0gsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsR0FBRyxTQUFTLFVBQVU7U0FDN0IsQ0FBQztLQUNMO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPO1lBQ0gsVUFBVSxFQUFHLEdBQUc7WUFDaEIsSUFBSSxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxzQkFBc0I7U0FDbEUsQ0FBQztLQUNMO0FBRUgsQ0FBQyxDQUFDO0FBaENXLFFBQUEsT0FBTyxXQWdDbEI7QUFPRix1RUFBdUU7QUFJdkUsVUFBVTtBQUNWLGdFQUFnRTtBQUNoRSw0R0FBNEc7QUFDNUcscUJBQXFCO0FBQ3JCLGVBQWU7QUFDZixzQkFBc0I7QUFDdEIsUUFBUTtBQUNSLHlCQUF5QjtBQUN6QixpQkFBaUI7QUFDakIsTUFBTTtBQUNOLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcbi8vIGltcG9ydCB7IER5bmFtb0RCQ2xpZW50IH0gZnJvbSAnQGF3cy1zZGsvY2xpZW50LWR5bmFtb2RiJztcbi8vIGltcG9ydCB7XG4vLyAgIER5bmFtb0RCRG9jdW1lbnRDbGllbnQsXG4vLyAgIFB1dENvbW1hbmQsXG4vLyAgIFB1dENvbW1hbmRJbnB1dCxcbi8vIH0gZnJvbSAnQGF3cy1zZGsvbGliLWR5bmFtb2RiJztcblxuXG4vLyBjb25zdCBjbGllbnQgPSBEeW5hbW9EQkRvY3VtZW50Q2xpZW50LmZyb20obmV3IER5bmFtb0RCQ2xpZW50KHsgcmVnaW9uOiAnYXAtc291dGhlYXN0LTInIH0pKTtcbiBjb25zdCB0YWJsZU5hbWUgPSBwcm9jZXNzLmVudi5UT0RPX1RBQkxFX05BTUVcbi8vIGNvbnN0IHBhcmFtczogUHV0Q29tbWFuZElucHV0ID0ge1xuLy8gICBUYWJsZU5hbWU6IHRhYmxlTmFtZSxcbi8vICAgSXRlbToge1xuLy8gICAgIERldmljZVRva2VuOiAnZXZlbnQnLFxuLy8gICAgIEtleTogJ2V2ZW50Jyxcbi8vICAgICBGb3JnZUlkOiAnZXZlbnQnIHx8ICdhbm9ueW1vdXMnLFxuLy8gICB9LFxuLy8gfTtcblxuLy8gTG9hZCB0aGUgQVdTIFNESyBmb3IgTm9kZS5qc1xuLy8gdmFyIER5bmFtb2RiID0gcmVxdWlyZSgnYXdzLXNkay9jbGllbnRzL2R5bmFtb2RiJyk7XG4vLyBjb25zdCBkYkNsaWVudCA9IG5ldyBEeW5hbW9kYi5Eb2N1bWVudENsaWVudCgpO1xuLy8gLy8gU2V0IHRoZSByZWdpb24gXG4vLyBEeW5hbW9kYi5jb25maWcudXBkYXRlKHtyZWdpb246ICdhcC1zb3V0aGVhc3QtMid9KTtcbi8vIC8vIHZhciBkZGIgPSBuZXcgQVdTLkR5bmFtb0RCKHthcGlWZXJzaW9uOiAnMjAxMi0wOC0xMCd9KTtcbi8vIHZhciBwYXJhbXMgPSB7XG4vLyAgIFRhYmxlTmFtZTogdGFibGVOYW1lLFxuLy8gICBJdGVtOiB7XG4vLyAgICAgJ0NVU1RPTUVSX0lEJyA6ICdhc2Rhc2QnLFxuLy8gICAgICdDVVNUT01FUl9OQU1FJyA6ICdhZGFzZHNhJ1xuLy8gICB9XG4vLyB9O1xuLy8gTG9hZCB0aGUgQVdTIFNESyBmb3IgTm9kZS5qc1xudmFyIEFXUyA9IHJlcXVpcmUoJ2F3cy1zZGsnKTtcbi8vIFNldCB0aGUgcmVnaW9uIFxuQVdTLmNvbmZpZy51cGRhdGUoe3JlZ2lvbjogJ2FwLXNvdXRoZWFzdC0yJ30pO1xuXG4vLyBDcmVhdGUgdGhlIER5bmFtb0RCIHNlcnZpY2Ugb2JqZWN0XG52YXIgZGRiID0gbmV3IEFXUy5EeW5hbW9EQih7YXBpVmVyc2lvbjogJzIwMTItMDgtMTAnfSk7XG5cbnZhciBwYXJhbXMgPSB7XG4gIFRhYmxlTmFtZTogJ0NVU1RPTUVSX0xJU1QnLFxuICBJdGVtOiB7XG4gICAgJ0NVU1RPTUVSX0lEJyA6IHtOOiAnMDAxJ30sXG4gICAgJ0NVU1RPTUVSX05BTUUnIDoge1M6ICdSaWNoYXJkIFJvZSd9XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBIYW5kbGVyID0gYXN5bmMgKGV2ZW50IDogYW55KSA9PiB7XG5jb25zb2xlLmluZm8oXCJFVkVOVFxcblwiICsgdGFibGVOYW1lKVxuXG4gIHRyeSB7XG4gICAgbGV0IHJlc3BvbnNlO1xuICAgIGNvbnNvbGUuaW5mbyhcIkVWRU5UXFxuIGxpbmUgMjJcIiArIHJlc3BvbnNlKVxuICAgIGlmIChldmVudC5odHRwTWV0aG9kID09PSAnUE9TVCcpIHtcbiAgICAgIGNvbnNvbGUuaW5mbyhcIkVWRU5UXFxuIGxpbmUgNTdcIiArIHJlc3BvbnNlKVxuICAgICAgcmVzcG9uc2UgPSBhd2FpdCBkZGIucHV0KHBhcmFtcykucHJvbWlzZSgpO1xuICAgICAgY29uc29sZS5pbmZvKFwiRVZFTlRcXG4gbGluZSA0MlwiICsgcmVzcG9uc2UpXG5cblxuICAgICAgLy8gY29uc3QgdHJ5VGhpcyA9IGF3YWl0IHNhdmVEZXZpY2UoZXZlbnQpO1xuICAgICAgLy8gY29uc29sZS5pbmZvKHRyeVRoaXMpXG4gICAgICAvLyBjb25zdCByZXN1bHQgPSBhd2FpdCBjbGllbnQuc2VuZChuZXcgUHV0Q29tbWFuZChwYXJhbXMpKTtcbiAgICAgIC8vIGlmIChyZXN1bHQuJG1ldGFkYXRhICYmIHJlc3VsdC4kbWV0YWRhdGEuaHR0cFN0YXR1c0NvZGUgJiYgcmVzdWx0LiRtZXRhZGF0YS5odHRwU3RhdHVzQ29kZSA9PT0gMjAwKSB7XG4gICAgICAvLyAgIHJldHVybiB0cnVlO1xuICAgICAgLy8gfSBlbHNlIHtcbiAgICAgIC8vICAgcmV0dXJuIGZhbHNlO1xuICAgICAgLy8gfVxuICAgIH0gXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiBgJHt0YWJsZU5hbWV9IFN1Y2Nlc3NgLFxuICAgICAgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6ICA1MDAsXG4gICAgICAgIGJvZHk6IGUgPT09IDUwMCA/ICdJbnZhbGlkIFJlcXVlc3QgQm9keScgOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnLFxuICAgICAgfTtcbiAgfVxuICBcbn07XG5cblxuXG5cblxuXG4vLyBleHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZURldmljZShldmVudCA6IG9iamVjdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICBcblxuXG4vLyAgIHRyeSB7XG4vLyAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2xpZW50LnNlbmQobmV3IFB1dENvbW1hbmQocGFyYW1zKSk7XG4vLyAgICAgaWYgKHJlc3VsdC4kbWV0YWRhdGEgJiYgcmVzdWx0LiRtZXRhZGF0YS5odHRwU3RhdHVzQ29kZSAmJiByZXN1bHQuJG1ldGFkYXRhLmh0dHBTdGF0dXNDb2RlID09PSAyMDApIHtcbi8vICAgICAgIHJldHVybiB0cnVlO1xuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgICByZXR1cm4gZmFsc2U7XG4vLyAgICAgfVxuLy8gICB9IGNhdGNoIChlcnI6IGFueSkge1xuLy8gICAgIHRocm93IGVycjtcbi8vICAgfVxuLy8gfVxuIl19