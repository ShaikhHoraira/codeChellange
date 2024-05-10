import { Handler } from "aws-lambda";
import { GetCustomerAddress } from './getData';

export const handler: Handler = async (event: any) => {
  try {
    if (!event.queryStringParameters.userId || !event.queryStringParameters) {
      return {
        statusCode: 403,
        body: "Missing userId, Please provide userId",
        headers: {
          'Access-Control-Allow-Origin': '*', // or specific origin(s)
          'Access-Control-Allow-Methods': 'OPTIONS, GET', // Include OPTIONS for preflight requests
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Vary': 'Origin',
        },
      };
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
