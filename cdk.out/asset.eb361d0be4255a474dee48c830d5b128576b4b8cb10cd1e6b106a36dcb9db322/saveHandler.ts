import { Handler } from "aws-cdk-lib/aws-lambda";
// import {ManageSaveData} from '../modules/save_data';
// import {ManageGetData} from '../modules/get_data';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

import {
  DynamoDBDocumentClient,
  PutCommand,
  PutCommandInput,
} from '@aws-sdk/lib-dynamodb';

export const handler: Handler = async (event : any) => {
// const manageSaveData = new ManageSaveData(process.env.TODO_TABLE_NAME);
// const manageGetData = new ManageGetData();
console.info("EVENT\n" + event.body.data)

  try {
    let response;
    if (event.httpMethod === 'POST') {
      // response = await manageSaveData.saveDevice(event.dynamodb.tableName,'');
      // console.log("🚀 ~ file: save_retrive_address.ts:12 ~ constTuHandler:Handler= ~ response:", response)
      const tryThis = await saveDevice(event)
      console.info(tryThis)
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

export async function saveDevice(event : object): Promise<boolean> {
  const client = DynamoDBDocumentClient.from(new DynamoDBClient({ region: process.env.AWS_REGION }));
  const params: PutCommandInput = {
    TableName: process.env.TODO_TABLE_NAME!,
    Item: {
      DeviceToken: event,
      Key: event,
      ForgeId: event || 'anonymous',
    },
  };

  try {
    const result = await client.send(new PutCommand(params));
    if (result.$metadata && result.$metadata.httpStatusCode && result.$metadata.httpStatusCode === 200) {
      return true;
    } else {
      return false;
    }
  } catch (err: any) {
    throw err;
  }
}
