import { Handler } from "aws-cdk-lib/aws-lambda";
import * as AWS from "aws-sdk"


const tableName = process.env.TODO_TABLE_NAME

const documentClient = new AWS.DynamoDB.DocumentClient({
  region: process.env.region,
});
export const handler: Handler = async (event : any) => {
  
  try {
    if (!event.queryStringParameters || !event.queryStringParameters.userId) {
      return {
        statusCode: 400,
        body: "Missing userId parameter",
      };
    }
    const params = {
      IndexName: 'UserIdIndex', // Update with the correct index name
      KeyConditionExpression: 'UserId = :userId',
      ExpressionAttributeValues: {
        ':userId': event.queryStringParameters.userId,
      },
      TableName: tableName!,
    };
    let response;
     if (event.httpMethod === "GET"){
      const data = await documentClient.query(params).promise();
      const items = data.Items;
      const response = {
        statusCode: 200,
        body: JSON.stringify(items)
      }

      return response
    }els 
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

