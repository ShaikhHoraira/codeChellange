import { Handler } from "aws-cdk-lib/aws-lambda";
// import {ManageSaveData} from '../modules/save_data';
// import {ManageGetData} from '../modules/get_data';
// import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

// import {
//   DynamoDBDocumentClient,
//   PutCommand,
//   PutCommandInput,
// } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, PutCommandInput } from '@aws-sdk/lib-dynamodb';
export const handler: Handler = async (event : any) => {
// const manageSaveData = new ManageSaveData(process.env.TODO_TABLE_NAME);
// const manageGetData = new ManageGetData();
console.info("EVENT\n" + event.body.data)

const dynamoDBClient = new DynamoDBClient({ region: 'ap-southeast-2' });
const documentClient = DynamoDBDocumentClient.from(dynamoDBClient);
const params: PutCommandInput = {
  TableName: process.env.TODO_TABLE_NAME,
  Item: {
    DeviceToken: 'DEVICE_TOKEN',
    Key: 'KEY',
    ForgeId: 'FORGE_ID',
  },
};
try {
  const result = await documentClient.send(new PutCommand(params));
  console.log('Item saved successfully:', result);
} catch (error) {
  console.error('Error saving item:', error);
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
