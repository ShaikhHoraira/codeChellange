// import * as AWS from 'aws-sdk';

// const tableName = process.env.TODO_TABLE_NAME;
// const documentClient = new AWS.DynamoDB.DocumentClient({
//   region: process.env.region,
// });

// export const handler = async (event : any, _context: any) => {
//   console.info(event);

//   const queryParams = event.queryStringParameters;
//   const suburb = queryParams.suburb;
//   const postcode = queryParams.postcode;

//   const params: AWS.DynamoDB.DocumentClient.ScanInput = {
//     TableName: tableName!,
//   };

//   if (suburb) {
//     params.FilterExpression = '#suburb = :suburb';
//     params.ExpressionAttributeNames = {
//       '#suburb': 'Suburb',
//     };
//     params.ExpressionAttributeValues = {
//       ':suburb': suburb,
//     };
//   }

//   if (postcode) {
//     params.FilterExpression = '#postCode = :postCode';
//     params.ExpressionAttributeNames = {
//       '#postCode': 'PostCode',
//     };
//     params.ExpressionAttributeValues = {
//       ':postCode': postcode,
//     };
//   }

//   try {
//     const data = await documentClient.scan(params).promise();
//     const items = data.Items;
//     const response = {
//       statusCode: 200,
//       body: JSON.stringify(items),
//     };
//     console.info(`body: ${response.body}`);
//     return response;
//   } catch (e) {
//     return {
//       statusCode: 500,
//       body: e === 500 ? 'Invalid Request Parameters' : 'Something went wrong',
//     };
//   }
// };


import { Handler } from "aws-cdk-lib/aws-lambda";
import * as AWS from 'aws-sdk';

const tableName = process.env.TODO_TABLE_NAME;
const documentClient = new AWS.DynamoDB.DocumentClient({
  region: process.env.region,
});

export const handler: Handler = async (event: any, _context: any) => {
  console.info(event);

  const queryParams = event.queryStringParameters;
  const suburb = queryParams.suburb;
  const postCode = queryParams.postcode;

  let params: AWS.DynamoDB.DocumentClient.QueryInput = {
    TableName: tableName!,
  };

  if (suburb || postCode) {
    let KeyConditionExpression = '';
    let ExpressionAttributeValues: AWS.DynamoDB.DocumentClient.ExpressionAttributeValueMap = {};

    if (suburb) {
      KeyConditionExpression += '#Suburb = :Suburb';
      ExpressionAttributeValues[':Suburb'] = suburb;
    }

    if (postCode) {
      if (KeyConditionExpression) {
        KeyConditionExpression += ' AND ';
      }
      KeyConditionExpression += '#PostCode = :PostCode';
      ExpressionAttributeValues[':PostCode'] = postCode;
    }

    params = {
      ...params,
      KeyConditionExpression,
      ExpressionAttributeNames: {
        '#Suburb': 'Suburb',
        '#PostCode': 'PostCode',
      },
      ExpressionAttributeValues,
    };
  } else {
    // No filtering conditions specified, return empty result
    return {
      statusCode: 200,
      body: JSON.stringify([]),
    };
  }

  try {
    const data = await documentClient.query(params).promise();
    const items = data.Items;
    const response = {
      statusCode: 200,
      body: JSON.stringify(items),
    };
    console.info(`body: ${response.body}`);
    return response;
  } catch (e) {
    console.info(e);
    return {
      statusCode: 500,
      body: e === 500 ? 'Invalid Request Parameters' : e,
    };
  }
};




