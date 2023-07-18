import { Handler } from "aws-cdk-lib/aws-lambda";
import * as AWS from "aws-sdk"

const tableName = process.env.TODO_TABLE_NAME

const documentClient = new AWS.DynamoDB.DocumentClient({
  region: process.env.region,
});
export const handler: Handler = async (event : any) => {
  const bodypram = JSON.parse(event.body)
  const params = {
    Key: {
      postcode: bodypram.userId,
    },
    //AttributesToGet: ['pushNotification', 'notificationType', 'notificationSubType'],
    TableName: tableName!,
  };


  try {
    //let response;
     if (event.httpMethod === "GET"){
      const result = await documentClient.get(params).promise();
      console.info(result)
      return result.Item;

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