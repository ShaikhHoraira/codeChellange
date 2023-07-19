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

  const suburb = event.suburb;
  const postCode = event.postCode;

  let params: AWS.DynamoDB.DocumentClient.ScanInput = {
    TableName: tableName!,
  };
  console.info('line 74');
  if (suburb || postCode) {
    let FilterExpression = '';
    let ExpressionAttributeValues: AWS.DynamoDB.DocumentClient.ExpressionAttributeValueMap = {};
    console.info('line 78');
    if (suburb) {
      FilterExpression += '#Suburb = :suburb';
      console.info('line 81');
      ExpressionAttributeValues[':suburb'] = suburb;
    }
    console.info('line 844');
    if (postCode) {
      if (FilterExpression) {
        FilterExpression += ' AND ';
        console.info('line 88');
      }
      console.info('line 90');
      FilterExpression += '#PostCode = :postCode';
      ExpressionAttributeValues[':postCode'] = postCode;
    }

    params = {
      ...params,
      FilterExpression,
      ExpressionAttributeNames: {
        '#Suburb': 'Suburb',
        '#PostCode': 'PostCode',
      },
      ExpressionAttributeValues,
    };
    console.info('line 104');
  }

  try {
    const data = await documentClient.scan(params).promise();
    console.info('line 109');
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
      body: 'Internal Server Error',
    };
  }
};





