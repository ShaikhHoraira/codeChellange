import { Handler } from "aws-cdk-lib/aws-lambda";
// import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
// import {
//   DynamoDBDocumentClient,
//   PutCommand,
//   PutCommandInput,
// } from '@aws-sdk/lib-dynamodb';


// const client = DynamoDBDocumentClient.from(new DynamoDBClient({ region: 'ap-southeast-2' }));
 const tableName = process.env.TODO_TABLE_NAME
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
const dbClient = Dynamodb.DocumentClient()
// Set the region 
// AWS.config.update({region: 'ap-southeast-2'});
// var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
var params = {
  TableName: tableName,
  Item: {
    'CUSTOMER_ID' : 'asdasd',
    'CUSTOMER_NAME' : {S: 'Richard Roe'}
  }
};

export const handler: Handler = async (event : any) => {
//console.info("EVENT\n" + event.body.data)

  try {
    let response;
    if (event.httpMethod === 'POST') {
      // const tryThis = await saveDevice(event);
      // console.info(tryThis)
      const result = dbClient.put(params).promise();

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
  } catch (e) {
    return {
        statusCode:  500,
        body: e === 500 ? 'Invalid Request Body' : 'Something went wrong',
      };
  }
  
};






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
