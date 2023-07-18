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
console.info("EVENT\n" + event.body)

  try {
    let response;
    if (event.httpMethod === 'POST') {
      
      // response = await manageSaveData.saveDevice(event.dynamodb.tableName,'');
      // console.log("🚀 ~ file: save_retrive_address.ts:12 ~ constTuHandler:Handler= ~ response:", response)
    } 
    return {
        statusCode: 200,
        body: 'Success',
      };
  } catch (e) {
    return {
        statusCode:  500,
        body: e === 500 ? 'Invalid Request Body' : 'Something went wrong',
      };
  }
  
};
