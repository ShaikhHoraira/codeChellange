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

export const handler: Handler = async (event: any, _context : any) => {
  console.info(event);

  const queryParams = event.queryStringParameters;
  const suburb = queryParams.Suburb;
  const postCode = queryParams.PostCode;

  let params: AWS.DynamoDB.DocumentClient.ScanInput = {
    TableName: tableName!,
  };

  if (suburb || postCode) {
    let FilterExpression = '';
    let ExpressionAttributeValues: Record<string, string> = {};;

    if (suburb) {
      FilterExpression += '#suburb = :suburb';
      ExpressionAttributeValues[':suburb'] = suburb;
    }

    if (postCode) {
      if (FilterExpression) {
        FilterExpression += ' OR ';
      }
      FilterExpression += '#postCode = :postCode';
      ExpressionAttributeValues[':postCode'] = postCode;
    }

    params = {
      ...params,
      FilterExpression,
      ExpressionAttributeNames: {
        '#suburb': 'Suburb',
        '#postCode': 'PostCode',
      },
      ExpressionAttributeValues,
    };
  }

  try {
    const data = await documentClient.scan(params).promise();
    const items = data.Items;
    const response = {
      statusCode: 200,
      body: JSON.stringify(items),
    };
    console.info(`body: ${response.body}`);
    return response;
  } catch (e) {
    console.info(e)
    return {
      statusCode: 500,
      body: e === 500 ? 'Invalid Request Parameters' : e,
    };
  }
};
