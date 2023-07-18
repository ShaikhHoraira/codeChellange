"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.handler = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const client = new client_dynamodb_1.DynamoDBClient({});
const docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
const tableName = process.env.TODO_TABLE_NAME;
// var AWS = require('aws-sdk');
// // Set the region 
// AWS.config.update({region: 'ap-southeast-2'});
// // Create the DynamoDB service object
// var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const handler = async (event) => {
    console.info("EVENT\n" + tableName);
    const bodypram = JSON.parse(event.body);
    const customerId = bodypram.custometId;
    const customerName = bodypram.custometName;
    // var params = {
    //   TableName: tableName,
    //   Item: {
    //     CUSTOMER_ID : customerId,
    //     CUSTOMER_NAME : customerName
    //   }
    // };
    const command = new lib_dynamodb_1.PutCommand({
        TableName: tableName,
        Item: {
            CUSTOMER_ID: customerId,
            CUSTOMER_NAME: customerName
        },
    });
    try {
        // let response;
        const response = await docClient.send(command);
        console.info(response);
        return response;
        // if (event.httpMethod === 'POST') {
        // response = await ddb.put(params).promise();
        // return response;
        // const tryThis = await saveDevice(event);
        // console.info(tryThis)
        // const result = await client.send(new PutCommand(params));
        // if (result.$metadata && result.$metadata.httpStatusCode && result.$metadata.httpStatusCode === 200) {
        //   return true;
        // } else {
        //   return false;
        // }
        // } 
        // return {
        //     statusCode: 200,
        //     body: JSON.stringify(response )
        //   };
    }
    catch (e) {
        return {
            statusCode: 500,
            body: e === 500 ? 'Invalid Request Body' : 'Something went wrong',
        };
    }
};
exports.handler = handler;
const main = async () => {
};
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw4REFBMEQ7QUFDMUQsd0RBQTJFO0FBRTNFLE1BQU0sTUFBTSxHQUFHLElBQUksZ0NBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN0QyxNQUFNLFNBQVMsR0FBRyxxQ0FBc0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFdEQsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUE7QUFDN0MsZ0NBQWdDO0FBQ2hDLHFCQUFxQjtBQUNyQixpREFBaUQ7QUFFakQsd0NBQXdDO0FBQ3hDLDBEQUEwRDtBQUluRCxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVyxFQUFFLEVBQUU7SUFDdEQsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUE7SUFFbkMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkMsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUN2QyxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFBO0lBQzFDLGlCQUFpQjtJQUNqQiwwQkFBMEI7SUFDMUIsWUFBWTtJQUNaLGdDQUFnQztJQUNoQyxtQ0FBbUM7SUFDbkMsTUFBTTtJQUNOLEtBQUs7SUFDTCxNQUFNLE9BQU8sR0FBRyxJQUFJLHlCQUFVLENBQUM7UUFDN0IsU0FBUyxFQUFFLFNBQVM7UUFDcEIsSUFBSSxFQUFFO1lBQ0osV0FBVyxFQUFHLFVBQVU7WUFDeEIsYUFBYSxFQUFHLFlBQVk7U0FDN0I7S0FDRixDQUFDLENBQUM7SUFDRCxJQUFJO1FBQ0YsZ0JBQWdCO1FBRWxCLE1BQU0sUUFBUSxHQUFHLE1BQU0sU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZCLE9BQU8sUUFBUSxDQUFDO1FBQ2QscUNBQXFDO1FBRW5DLDhDQUE4QztRQUM5QyxtQkFBbUI7UUFFbkIsMkNBQTJDO1FBQzNDLHdCQUF3QjtRQUN4Qiw0REFBNEQ7UUFDNUQsd0dBQXdHO1FBQ3hHLGlCQUFpQjtRQUNqQixXQUFXO1FBQ1gsa0JBQWtCO1FBQ2xCLElBQUk7UUFDTixLQUFLO1FBQ0wsV0FBVztRQUNYLHVCQUF1QjtRQUN2QixzQ0FBc0M7UUFDdEMsT0FBTztLQUNSO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPO1lBQ0gsVUFBVSxFQUFHLEdBQUc7WUFDaEIsSUFBSSxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxzQkFBc0I7U0FDbEUsQ0FBQztLQUNMO0FBRUgsQ0FBQyxDQUFDO0FBbkRXLFFBQUEsT0FBTyxXQW1EbEI7QUFTSyxNQUFNLElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtBQUkvQixDQUFDLENBQUM7QUFKVyxRQUFBLElBQUksUUFJZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuaW1wb3J0IHsgRHluYW1vREJDbGllbnQgfSBmcm9tIFwiQGF3cy1zZGsvY2xpZW50LWR5bmFtb2RiXCI7XG5pbXBvcnQgeyBQdXRDb21tYW5kLCBEeW5hbW9EQkRvY3VtZW50Q2xpZW50IH0gZnJvbSBcIkBhd3Mtc2RrL2xpYi1keW5hbW9kYlwiO1xuXG5jb25zdCBjbGllbnQgPSBuZXcgRHluYW1vREJDbGllbnQoe30pO1xuY29uc3QgZG9jQ2xpZW50ID0gRHluYW1vREJEb2N1bWVudENsaWVudC5mcm9tKGNsaWVudCk7XG5cbmNvbnN0IHRhYmxlTmFtZSA9IHByb2Nlc3MuZW52LlRPRE9fVEFCTEVfTkFNRVxuLy8gdmFyIEFXUyA9IHJlcXVpcmUoJ2F3cy1zZGsnKTtcbi8vIC8vIFNldCB0aGUgcmVnaW9uIFxuLy8gQVdTLmNvbmZpZy51cGRhdGUoe3JlZ2lvbjogJ2FwLXNvdXRoZWFzdC0yJ30pO1xuXG4vLyAvLyBDcmVhdGUgdGhlIER5bmFtb0RCIHNlcnZpY2Ugb2JqZWN0XG4vLyB2YXIgZGRiID0gbmV3IEFXUy5EeW5hbW9EQih7YXBpVmVyc2lvbjogJzIwMTItMDgtMTAnfSk7XG5cblxuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudCA6IGFueSkgPT4ge1xuY29uc29sZS5pbmZvKFwiRVZFTlRcXG5cIiArIHRhYmxlTmFtZSlcblxuY29uc3QgYm9keXByYW0gPSBKU09OLnBhcnNlKGV2ZW50LmJvZHkpXG5jb25zdCBjdXN0b21lcklkID0gYm9keXByYW0uY3VzdG9tZXRJZDtcbmNvbnN0IGN1c3RvbWVyTmFtZSA9IGJvZHlwcmFtLmN1c3RvbWV0TmFtZVxuLy8gdmFyIHBhcmFtcyA9IHtcbi8vICAgVGFibGVOYW1lOiB0YWJsZU5hbWUsXG4vLyAgIEl0ZW06IHtcbi8vICAgICBDVVNUT01FUl9JRCA6IGN1c3RvbWVySWQsXG4vLyAgICAgQ1VTVE9NRVJfTkFNRSA6IGN1c3RvbWVyTmFtZVxuLy8gICB9XG4vLyB9O1xuY29uc3QgY29tbWFuZCA9IG5ldyBQdXRDb21tYW5kKHtcbiAgVGFibGVOYW1lOiB0YWJsZU5hbWUsXG4gIEl0ZW06IHtcbiAgICBDVVNUT01FUl9JRCA6IGN1c3RvbWVySWQsXG4gICAgQ1VTVE9NRVJfTkFNRSA6IGN1c3RvbWVyTmFtZVxuICB9LFxufSk7XG4gIHRyeSB7XG4gICAgLy8gbGV0IHJlc3BvbnNlO1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZG9jQ2xpZW50LnNlbmQoY29tbWFuZCk7XG4gIGNvbnNvbGUuaW5mbyhyZXNwb25zZSk7XG4gIHJldHVybiByZXNwb25zZTtcbiAgICAvLyBpZiAoZXZlbnQuaHR0cE1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgICBcbiAgICAgIC8vIHJlc3BvbnNlID0gYXdhaXQgZGRiLnB1dChwYXJhbXMpLnByb21pc2UoKTtcbiAgICAgIC8vIHJldHVybiByZXNwb25zZTtcblxuICAgICAgLy8gY29uc3QgdHJ5VGhpcyA9IGF3YWl0IHNhdmVEZXZpY2UoZXZlbnQpO1xuICAgICAgLy8gY29uc29sZS5pbmZvKHRyeVRoaXMpXG4gICAgICAvLyBjb25zdCByZXN1bHQgPSBhd2FpdCBjbGllbnQuc2VuZChuZXcgUHV0Q29tbWFuZChwYXJhbXMpKTtcbiAgICAgIC8vIGlmIChyZXN1bHQuJG1ldGFkYXRhICYmIHJlc3VsdC4kbWV0YWRhdGEuaHR0cFN0YXR1c0NvZGUgJiYgcmVzdWx0LiRtZXRhZGF0YS5odHRwU3RhdHVzQ29kZSA9PT0gMjAwKSB7XG4gICAgICAvLyAgIHJldHVybiB0cnVlO1xuICAgICAgLy8gfSBlbHNlIHtcbiAgICAgIC8vICAgcmV0dXJuIGZhbHNlO1xuICAgICAgLy8gfVxuICAgIC8vIH0gXG4gICAgLy8gcmV0dXJuIHtcbiAgICAvLyAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgIC8vICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShyZXNwb25zZSApXG4gICAgLy8gICB9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogIDUwMCxcbiAgICAgICAgYm9keTogZSA9PT0gNTAwID8gJ0ludmFsaWQgUmVxdWVzdCBCb2R5JyA6ICdTb21ldGhpbmcgd2VudCB3cm9uZycsXG4gICAgICB9O1xuICB9XG4gIFxufTtcblxuXG5cblxuXG5cblxuXG5leHBvcnQgY29uc3QgbWFpbiA9IGFzeW5jICgpID0+IHtcbiAgXG5cbiAgXG59O1xuXG4iXX0=