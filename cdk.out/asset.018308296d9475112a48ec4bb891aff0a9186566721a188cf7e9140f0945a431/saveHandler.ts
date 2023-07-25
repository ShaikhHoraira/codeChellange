import { Handler } from "aws-cdk-lib/aws-lambda";
import * as AWS from "aws-sdk"
import { ManageDevice } from './saveData'

// const tableName = process.env.TABLE_NAME

// const documentClient = new AWS.DynamoDB.DocumentClient({
//   region: process.env.region,
// });


export const handler: Handler = async (event: any) => {
  //const bodypram = JSON.parse(event.body);
  try { 
    const manageDevice = new ManageDevice(event);
    const returnResult = await manageDevice.saveData();
    // console.info('returning from module', returnResult)
    return {
        statusCode: 200,
        body: returnResult
      };
  } catch (e) {;
    return {
        statusCode:  500,
        body: e === 500 ? 'Invalid Request Body' : e, // here we can create and import a commomn error function or specific error handling function where the out put can be organise 
      };
  }
}
