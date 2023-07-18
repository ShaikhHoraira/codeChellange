import { Handler } from "aws-cdk-lib/aws-lambda";
import {ManageSaveData} from '../modules/save_data';
import {ManageGetData} from '../modules/get_data';

export const TuHandler: Handler = async (event : any) => {
const manageSaveData = new ManageSaveData();
const manageGetData = new ManageGetData();
  try {
    let response;
    if (event.httpMethod === 'GET') {
      response = await manageSaveData.saveDevice(event.dynamodb.tableName,'');
      console.log("🚀 ~ file: save_retrive_address.ts:12 ~ constTuHandler:Handler= ~ response:", response)
    } else if (event.httpMethod === "POST"){
      response =  await manageGetData.getDeviceByDeviceToken('');
      console.log("🚀 ~ file: save_retrive_address.ts:16 ~ constTuHandler:Handler= ~ response:", response)
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