import { Handler } from "aws-cdk-lib/aws-lambda";
import * as AWS from "aws-sdk";
import axios from 'axios';


const tableName = process.env.TODO_TABLE_NAME

const documentClient = new AWS.DynamoDB.DocumentClient({
  region: process.env.region,
});
export const handler: Handler = async (event : any) => {
  console.info(event)
  const bodypram = JSON.parse(event.body)
  const suburb = bodypram.suburb;
  const postcode = bodypram.postcode;
  const params: AWS.DynamoDB.DocumentClient.ScanInput = {
    // Key: {
    //   UserId: bodypram.userId,
    // },
    //AttributesToGet: ['pushNotification', 'notificationType', 'notificationSubType'],
    TableName: tableName!,
  };
  if (suburb) {
    params.FilterExpression = '#suburb = :suburb';
    params.ExpressionAttributeNames = {
      '#suburb': 'suburb',
    };
    params.ExpressionAttributeValues = {
      ':suburb': suburb,
    };
  }
  if (postcode) {
    params.FilterExpression = '#postcode = :postcode';
    params.ExpressionAttributeNames = {
      '#postcode': 'postcode',
    };
    params.ExpressionAttributeValues = {
      ':postcode': postcode,
    };
  }
  try {
    if (event.httpMethod === 'GET') {
      const data = await documentClient.scan(params).promise();
      const items = data.Items;
      const response = {
        statusCode: 200,
        body: JSON.stringify(items),
      };
      console.info(`body: ${response.body}`);
      return response;
    }

    const axiosResponse = await axios.get('https://jhzgllmrv0.execute-api.ap-southeast-2.amazonaws.com/prod/userAddress', {
      params: bodypram,
    });
    return {
      statusCode: axiosResponse.status,
      body: JSON.stringify(axiosResponse.data),
    };
  } catch (e) {
    return {
        statusCode:  500,
        body: e === 500 ? 'Invalid Request Body' : 'Something went wrong',
      };
  }
};