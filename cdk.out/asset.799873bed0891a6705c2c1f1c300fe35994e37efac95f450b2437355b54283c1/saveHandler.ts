import { Handler } from "aws-cdk-lib/aws-lambda";
import * as AWS from "aws-sdk"
import { ManageDevice } from './saveData'

const tableName = process.env.TABLE_NAME

const documentClient = new AWS.DynamoDB.DocumentClient({
  region: process.env.region,
});


export const handler: Handler = async (event : any) => {

const bodypram = JSON.parse(event.body);
const manageDevice = new ManageDevice(bodypram);
const returnResult = manageDevice.saveData();
console.info('returning from module', returnResult)
var params = {
  TableName: tableName!,
  Item: {
    UserId: bodypram.userId,
    CustomerName : bodypram.customerName,
    AppartmentNo : bodypram.appartmentNo,
    Address: bodypram.address,
    Suburb: bodypram.suburb,
    PostCode: bodypram.postCode,
    State: bodypram.state,
    Country: bodypram.country
  }
};

  try { 
    await documentClient.put(params).promise();
    return {
        statusCode: 200,
        body: 'Success'
      };
  } catch (e) {;
    return {
        statusCode:  500,
        body: e === 500 ? 'Invalid Request Body' : 'Something went wrong', // here we can create and import a commomn error function or specific error handling function where the out put can be organise 
      };
  }
}
