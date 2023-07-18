
import { Handler } from "aws-cdk-lib/aws-lambda";
// import {ManageSaveData} from '../modules/save_data';
// import {ManageGetData} from '../modules/get_data';
// import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

// import {
//   DynamoDBDocumentClient,
//   PutCommand,
//   PutCommandInput,
// } from '@aws-sdk/lib-dynamodb';




// import AWS from 'aws-sdk';
// const documentClient = new AWS.DynamoDB.DocumentClient({
//   region: 'ap-southeast-2',
// });
// const data = {
//   Id: 'Address',
//   notificationType: 'payload.notificationType',
//   notificationSubType: 'payload.notificationSubType',
//   images: 'payload.images',
//   localNotification: 'payload.localNotification',
//   pushNotification: 'payload.pushNotification',
//   isPrivate: 'payload.isPrivate',
// };
// var params = {
//   TableName: process.env.TODO_TABLE_NAME,
//   Item: data,
// };



import { DynamoDBClient, PutItemCommand, PutItemCommandInput } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "ap-southeast-2" });
const params: PutItemCommandInput = {
  TableName: process.env.TODO_TABLE_NAME!,
  Item: {
    id: { S: "12345" }, // AttributeValue for string
    name: { S: "John Doe" },
    age: { N: "30" }, // AttributeValue for number
    isEmployed: { BOOL: true } // AttributeValue for boolean
  }
};


export const handler: Handler = async (event : any) => {
console.info("EVENT\n" + event.body.data)
  try {
    let response;
    if (event.httpMethod === 'POST') {
      // response = await manageSaveData.saveDevice(event.dynamodb.tableName,'');
      // console.log("🚀 ~ file: save_retrive_address.ts:12 ~ constTuHandler:Handler= ~ response:", response)



      // const tryThis = await documentClient.put(params).promise();
      // console.info(tryThis)


      const command = new PutItemCommand(params);

      client.send(command)
        .then((response) => {
          console.log("Item saved successfully:", response);
        })
        .catch((error) => {
          console.error("Error saving item:", error);
        });
      
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
//   const client = DynamoDBDocumentClient.from(new DynamoDBClient({ region: 'ap-southeast-2' }));
//   const params: PutCommandInput = {
//     TableName: process.env.TODO_TABLE_NAME!,
//     Item: {
//       DeviceToken: event,
//       Key: event,
//       ForgeId: event || 'anonymous',
//     },
//   };

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
