import { Handler } from "aws-cdk-lib/aws-lambda";
import * as AWS from "aws-sdk"

const tableName = process.env.TODO_TABLE_NAME

const documentClient = new AWS.DynamoDB.DocumentClient({
  region: process.env.region,
});

export const handler: Handler = async (event : any) => {
console.info("EVENT\n" + tableName + event.body)

const bodypram = JSON.parse(event.body)
const customerId = bodypram.postcode;
const customerName = bodypram.custometName
var params = {
  TableName: tableName!,
  Item: {
    postcode: '12312321',
    CUSTOMER_ID : customerId,
    CUSTOMER_NAME : customerName
  }
};

  try {
     let response;
      response =  await documentClient.put(params).promise();
      console.info(response + "this is line 55")
    return {
        statusCode: 200,
        body: JSON.stringify(response)
      };
  } catch (e) {
    console.info(e + "this is line 55")
    return {
        statusCode:  500,
        body: e === 500 ? 'Invalid Request Body' : e,
      };
  }
};








export const main = async () => {
  

  
};

