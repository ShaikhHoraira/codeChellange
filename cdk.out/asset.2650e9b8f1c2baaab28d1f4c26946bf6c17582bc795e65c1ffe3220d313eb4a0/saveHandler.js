"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.handler = void 0;
const AWS = require("aws-sdk");
// const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
// import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
// const client = new DynamoDBClient({});
// const docClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.TODO_TABLE_NAME;
// var AWS = require('aws-sdk');
// // Set the region 
// AWS.config.update({region: 'ap-southeast-2'});
// // Create the DynamoDB service object
// var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const documentClient = new AWS.DynamoDB.DocumentClient({
    region: process.env.region,
});
// const data = {
//   notificationType: 'payload.notificationType',
//   notificationSubType: 'payload.notificationSubType',
//   images: 'payload.images'
// };
// var params = {
//   TableName: 'BasictestStack-Address079826E9-YBWBKMN4WHET',
//   Item: data
// };
const handler = async (event) => {
    console.info("EVENT\n" + tableName + event.body);
    const bodypram = JSON.parse(event.body);
    const customerId = bodypram.postcode;
    const customerName = bodypram.custometName;
    var params = {
        TableName: 'BasictestStack-Address079826E9-YBWBKMN4WHET',
        Item: {
            postcode: '12312321',
            CUSTOMER_ID: customerId,
            CUSTOMER_NAME: customerName
        }
    };
    // var params = {
    //   TableName: tableName,
    //   Item: {
    //     CUSTOMER_ID : customerId,
    //     CUSTOMER_NAME : customerName
    //   }
    // };
    // const command = new PutCommand({
    //   TableName: tableName,
    //   Item: {
    //     CUSTOMER_ID : customerId,
    //     CUSTOMER_NAME : customerName
    // //   },
    // });
    try {
        let response;
        response = await documentClient.put(params).promise();
        console.info(response + "this is line 55");
        // const response = await docClient.send(command);
        // console.info(response);
        // return response;
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
        return {
            statusCode: 200,
            body: JSON.stringify('response')
        };
    }
    catch (e) {
        console.info(e + "this is line 55");
        return {
            statusCode: 500,
            body: e === 500 ? 'Invalid Request Body' : e,
        };
    }
};
exports.handler = handler;
const main = async () => {
};
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwrQkFBOEI7QUFDOUIsa0VBQWtFO0FBRWxFLDhFQUE4RTtBQUU5RSx5Q0FBeUM7QUFDekMseURBQXlEO0FBRXpELE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFBO0FBQzdDLGdDQUFnQztBQUNoQyxxQkFBcUI7QUFDckIsaURBQWlEO0FBRWpELHdDQUF3QztBQUN4QywwREFBMEQ7QUFFMUQsTUFBTSxjQUFjLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQztJQUNyRCxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNO0NBQzNCLENBQUMsQ0FBQztBQUNILGlCQUFpQjtBQUNqQixrREFBa0Q7QUFDbEQsd0RBQXdEO0FBQ3hELDZCQUE2QjtBQUM3QixLQUFLO0FBQ0wsaUJBQWlCO0FBQ2pCLDhEQUE4RDtBQUM5RCxlQUFlO0FBQ2YsS0FBSztBQUVFLE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFXLEVBQUUsRUFBRTtJQUN0RCxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBRWhELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZDLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDckMsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQTtJQUMxQyxJQUFJLE1BQU0sR0FBRztRQUNYLFNBQVMsRUFBRSw2Q0FBNkM7UUFDeEQsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLFVBQVU7WUFDcEIsV0FBVyxFQUFHLFVBQVU7WUFDeEIsYUFBYSxFQUFHLFlBQVk7U0FDN0I7S0FDRixDQUFDO0lBQ0YsaUJBQWlCO0lBQ2pCLDBCQUEwQjtJQUMxQixZQUFZO0lBQ1osZ0NBQWdDO0lBQ2hDLG1DQUFtQztJQUNuQyxNQUFNO0lBQ04sS0FBSztJQUNMLG1DQUFtQztJQUNuQywwQkFBMEI7SUFDMUIsWUFBWTtJQUNaLGdDQUFnQztJQUNoQyxtQ0FBbUM7SUFDbkMsVUFBVTtJQUNWLE1BQU07SUFDSixJQUFJO1FBRUQsSUFBSSxRQUFRLENBQUM7UUFDWixRQUFRLEdBQUksTUFBTSxjQUFjLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3ZELE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLGlCQUFpQixDQUFDLENBQUE7UUFDOUMsa0RBQWtEO1FBQ2xELDBCQUEwQjtRQUMxQixtQkFBbUI7UUFDakIscUNBQXFDO1FBRW5DLDhDQUE4QztRQUM5QyxtQkFBbUI7UUFFbkIsMkNBQTJDO1FBQzNDLHdCQUF3QjtRQUN4Qiw0REFBNEQ7UUFDNUQsd0dBQXdHO1FBQ3hHLGlCQUFpQjtRQUNqQixXQUFXO1FBQ1gsa0JBQWtCO1FBQ2xCLElBQUk7UUFDTixLQUFLO1FBQ0wsT0FBTztZQUNILFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFFO1NBQ2xDLENBQUM7S0FDTDtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsaUJBQWlCLENBQUMsQ0FBQTtRQUNuQyxPQUFPO1lBQ0gsVUFBVSxFQUFHLEdBQUc7WUFDaEIsSUFBSSxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzdDLENBQUM7S0FDTDtBQUVILENBQUMsQ0FBQztBQTlEVyxRQUFBLE9BQU8sV0E4RGxCO0FBU0ssTUFBTSxJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7QUFJL0IsQ0FBQyxDQUFDO0FBSlcsUUFBQSxJQUFJLFFBSWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcbmltcG9ydCAqIGFzIEFXUyBmcm9tIFwiYXdzLXNka1wiXG4vLyBjb25zdCB7IER5bmFtb0RCQ2xpZW50IH0gPSByZXF1aXJlKCdAYXdzLXNkay9jbGllbnQtZHluYW1vZGInKTtcblxuLy8gaW1wb3J0IHsgUHV0Q29tbWFuZCwgRHluYW1vREJEb2N1bWVudENsaWVudCB9IGZyb20gXCJAYXdzLXNkay9saWItZHluYW1vZGJcIjtcblxuLy8gY29uc3QgY2xpZW50ID0gbmV3IER5bmFtb0RCQ2xpZW50KHt9KTtcbi8vIGNvbnN0IGRvY0NsaWVudCA9IER5bmFtb0RCRG9jdW1lbnRDbGllbnQuZnJvbShjbGllbnQpO1xuXG5jb25zdCB0YWJsZU5hbWUgPSBwcm9jZXNzLmVudi5UT0RPX1RBQkxFX05BTUVcbi8vIHZhciBBV1MgPSByZXF1aXJlKCdhd3Mtc2RrJyk7XG4vLyAvLyBTZXQgdGhlIHJlZ2lvbiBcbi8vIEFXUy5jb25maWcudXBkYXRlKHtyZWdpb246ICdhcC1zb3V0aGVhc3QtMid9KTtcblxuLy8gLy8gQ3JlYXRlIHRoZSBEeW5hbW9EQiBzZXJ2aWNlIG9iamVjdFxuLy8gdmFyIGRkYiA9IG5ldyBBV1MuRHluYW1vREIoe2FwaVZlcnNpb246ICcyMDEyLTA4LTEwJ30pO1xuXG5jb25zdCBkb2N1bWVudENsaWVudCA9IG5ldyBBV1MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQoe1xuICByZWdpb246IHByb2Nlc3MuZW52LnJlZ2lvbixcbn0pO1xuLy8gY29uc3QgZGF0YSA9IHtcbi8vICAgbm90aWZpY2F0aW9uVHlwZTogJ3BheWxvYWQubm90aWZpY2F0aW9uVHlwZScsXG4vLyAgIG5vdGlmaWNhdGlvblN1YlR5cGU6ICdwYXlsb2FkLm5vdGlmaWNhdGlvblN1YlR5cGUnLFxuLy8gICBpbWFnZXM6ICdwYXlsb2FkLmltYWdlcydcbi8vIH07XG4vLyB2YXIgcGFyYW1zID0ge1xuLy8gICBUYWJsZU5hbWU6ICdCYXNpY3Rlc3RTdGFjay1BZGRyZXNzMDc5ODI2RTktWUJXQktNTjRXSEVUJyxcbi8vICAgSXRlbTogZGF0YVxuLy8gfTtcblxuZXhwb3J0IGNvbnN0IGhhbmRsZXI6IEhhbmRsZXIgPSBhc3luYyAoZXZlbnQgOiBhbnkpID0+IHtcbmNvbnNvbGUuaW5mbyhcIkVWRU5UXFxuXCIgKyB0YWJsZU5hbWUgKyBldmVudC5ib2R5KVxuXG5jb25zdCBib2R5cHJhbSA9IEpTT04ucGFyc2UoZXZlbnQuYm9keSlcbmNvbnN0IGN1c3RvbWVySWQgPSBib2R5cHJhbS5wb3N0Y29kZTtcbmNvbnN0IGN1c3RvbWVyTmFtZSA9IGJvZHlwcmFtLmN1c3RvbWV0TmFtZVxudmFyIHBhcmFtcyA9IHtcbiAgVGFibGVOYW1lOiAnQmFzaWN0ZXN0U3RhY2stQWRkcmVzczA3OTgyNkU5LVlCV0JLTU40V0hFVCcsXG4gIEl0ZW06IHtcbiAgICBwb3N0Y29kZTogJzEyMzEyMzIxJyxcbiAgICBDVVNUT01FUl9JRCA6IGN1c3RvbWVySWQsXG4gICAgQ1VTVE9NRVJfTkFNRSA6IGN1c3RvbWVyTmFtZVxuICB9XG59O1xuLy8gdmFyIHBhcmFtcyA9IHtcbi8vICAgVGFibGVOYW1lOiB0YWJsZU5hbWUsXG4vLyAgIEl0ZW06IHtcbi8vICAgICBDVVNUT01FUl9JRCA6IGN1c3RvbWVySWQsXG4vLyAgICAgQ1VTVE9NRVJfTkFNRSA6IGN1c3RvbWVyTmFtZVxuLy8gICB9XG4vLyB9O1xuLy8gY29uc3QgY29tbWFuZCA9IG5ldyBQdXRDb21tYW5kKHtcbi8vICAgVGFibGVOYW1lOiB0YWJsZU5hbWUsXG4vLyAgIEl0ZW06IHtcbi8vICAgICBDVVNUT01FUl9JRCA6IGN1c3RvbWVySWQsXG4vLyAgICAgQ1VTVE9NRVJfTkFNRSA6IGN1c3RvbWVyTmFtZVxuLy8gLy8gICB9LFxuLy8gfSk7XG4gIHRyeSB7XG4gICBcbiAgICAgbGV0IHJlc3BvbnNlO1xuICAgICAgcmVzcG9uc2UgPSAgYXdhaXQgZG9jdW1lbnRDbGllbnQucHV0KHBhcmFtcykucHJvbWlzZSgpO1xuICAgICAgY29uc29sZS5pbmZvKHJlc3BvbnNlICsgXCJ0aGlzIGlzIGxpbmUgNTVcIilcbiAgLy8gY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkb2NDbGllbnQuc2VuZChjb21tYW5kKTtcbiAgLy8gY29uc29sZS5pbmZvKHJlc3BvbnNlKTtcbiAgLy8gcmV0dXJuIHJlc3BvbnNlO1xuICAgIC8vIGlmIChldmVudC5odHRwTWV0aG9kID09PSAnUE9TVCcpIHtcbiAgICAgIFxuICAgICAgLy8gcmVzcG9uc2UgPSBhd2FpdCBkZGIucHV0KHBhcmFtcykucHJvbWlzZSgpO1xuICAgICAgLy8gcmV0dXJuIHJlc3BvbnNlO1xuXG4gICAgICAvLyBjb25zdCB0cnlUaGlzID0gYXdhaXQgc2F2ZURldmljZShldmVudCk7XG4gICAgICAvLyBjb25zb2xlLmluZm8odHJ5VGhpcylcbiAgICAgIC8vIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNsaWVudC5zZW5kKG5ldyBQdXRDb21tYW5kKHBhcmFtcykpO1xuICAgICAgLy8gaWYgKHJlc3VsdC4kbWV0YWRhdGEgJiYgcmVzdWx0LiRtZXRhZGF0YS5odHRwU3RhdHVzQ29kZSAmJiByZXN1bHQuJG1ldGFkYXRhLmh0dHBTdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgIC8vICAgcmV0dXJuIHRydWU7XG4gICAgICAvLyB9IGVsc2Uge1xuICAgICAgLy8gICByZXR1cm4gZmFsc2U7XG4gICAgICAvLyB9XG4gICAgLy8gfSBcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KCdyZXNwb25zZScgKVxuICAgICAgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuaW5mbyhlICsgXCJ0aGlzIGlzIGxpbmUgNTVcIilcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAgNTAwLFxuICAgICAgICBib2R5OiBlID09PSA1MDAgPyAnSW52YWxpZCBSZXF1ZXN0IEJvZHknIDogZSxcbiAgICAgIH07XG4gIH1cbiAgXG59O1xuXG5cblxuXG5cblxuXG5cbmV4cG9ydCBjb25zdCBtYWluID0gYXN5bmMgKCkgPT4ge1xuICBcblxuICBcbn07XG5cbiJdfQ==