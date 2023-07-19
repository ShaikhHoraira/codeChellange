import { Handler } from "aws-cdk-lib/aws-lambda";
import * as AWS from "aws-sdk"


const tableName = process.env.TODO_TABLE_NAME

const documentClient = new AWS.DynamoDB.DocumentClient({
  region: process.env.region,
});
export const handler: Handler = async (event : any) => {
  console.info(event)
  const bodypram = JSON.parse(event.body)
  // const params = {
  //   // Key: {
  //   //   UserId: bodypram.userId,
  //   // },
  //   //AttributesToGet: ['Address', 'Suburb', 'State'],
  //   IndexName: 'UserId',
  //   KeyConditionExpression: 'userId = :userId',
  //   ExpressionAttributeNames: {
  //     '#userId': 'UserId'
  //   },
  //   ExpressionAttributeValues: {
  //     ':userId': '1',
  //   },
  //   TableName: tableName!,
  // };
  // const params = {
  //   IndexName: 'UserId',
  //   KeyConditionExpression: '#userId = :userId',
  //   ExpressionAttributeNames: {
  //     '#userId': 'UserId'
  //   },
  //   ExpressionAttributeValues: {
  //     ':userId': '1',
  //   },
  //   TableName: tableName!,
  // };
  // const params = {
  //   IndexName: 'UserIdIndex', // Update with the correct index name
  //   KeyConditionExpression: 'UserId = :userId',
  //   ExpressionAttributeValues: {
  //     ':userId': '1',
  //   },
  //   TableName: tableName!,
  // };
  const params = {
    IndexName: 'UserIdIndex', // Update with the correct index name
    KeyConditionExpression: 'UserId = :userId and #suburb = :suburbValue',
    ExpressionAttributeNames: {
      '#suburb': 'Suburb',
    },
    ExpressionAttributeValues: {
      ':userId': '1',
      ':suburbValue': 'Maribyrnong',
    },
    TableName: tableName!,
  };
  
  
  
  try {
    let response;
     if (event.httpMethod === "GET"){
      // response = await documentClient.get(params).promise();
      // console.info(response)
      // return response.Item;
      const data = await documentClient.query(params).promise();
      const items = data.Items;
      const response = {
        statusCode: 200,
        body: JSON.stringify(items)
      }
      console.info(`body: ${response.body}`)
      return response
    }
    return {
        statusCode: 200,
        body: response,
      };
  } catch (e) {
    console.info(e)
    return {
        statusCode:  500,
        body: e === 500 ? 'Invalid Request Body' : e,
      };
  }
};

