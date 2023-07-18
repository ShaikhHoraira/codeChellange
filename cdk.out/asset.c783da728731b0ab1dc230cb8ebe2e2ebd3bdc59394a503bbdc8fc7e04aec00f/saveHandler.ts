import { Handler } from "aws-cdk-lib/aws-lambda";
import * as AWS from "aws-sdk"
// const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');

// import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// const client = new DynamoDBClient({});
// const docClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.TODO_TABLE_NAME
// var AWS = require('aws-sdk');
// // Set the region 
// AWS.config.update({region: 'ap-southeast-2'});

// // Create the DynamoDB service object
// var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const documentClient = new AWS.DynamoDB.DocumentClient({
  region: process.env.region,
});
const data = {
  notificationType: 'payload.notificationType',
  notificationSubType: 'payload.notificationSubType',
  images: 'payload.images'
};
var params = {
  TableName: 'BasictestStack-Address079826E9-YBWBKMN4WHET',
  Item: data,
};

export const handler: Handler = async (event : any) => {
console.info("EVENT\n" + tableName + event.body)

// const bodypram = JSON.parse(event.body)
// const customerId = bodypram.custometId;
// const customerName = bodypram.custometName
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
//   },
// });
  try {
   
     let response;
      response =  await documentClient.put(params).promise();
      console.info(response + "this is line 55")
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
        body: JSON.stringify('response' )
      };
  } catch (e) {
    return {
        statusCode:  500,
        body: e === 500 ? 'Invalid Request Body' : 'Something went wrong',
      };
  }
  
};








export const main = async () => {
  

  
};

