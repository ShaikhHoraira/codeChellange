import { Handler } from "aws-lambda";
import { GetCustomerAddress } from './getData';

export const handler: Handler = async (event: any) => {
  
  console.log("received UserId:", event)
  try {
    if (!event.queryStringParameters.userId || !event.queryStringParameters) {
      const response = {
        statusCode: 204,
        headers: {
            "Access-Control-Allow-Headers" : "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
    };

    const manageDevice = new GetCustomerAddress(event.queryStringParameters.userId, event.queryStringParameters.suburb, event.queryStringParameters.postcode);
    const result = await manageDevice.getData();

    return {
      statusCode: 200,
      body: JSON.stringify(result),
      headers: {
        'Access-Control-Allow-Origin': '*', // or specific origin(s)
        'Access-Control-Allow-Methods': 'OPTIONS, GET',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Vary': 'Origin',
      },
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: (typeof e === 'string') ? e : 'Invalid Request Body',
      headers: {
        'Access-Control-Allow-Origin': '*', // or specific origin(s)
        'Access-Control-Allow-Methods': 'OPTIONS, GET',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Vary': 'Origin',
      },
    };
  }
};
