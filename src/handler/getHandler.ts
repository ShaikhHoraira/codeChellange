import { Handler } from "aws-lambda";
import { GetCustomerAddress } from '../modules/getData';

export const handler: Handler = async (event: any) => {
  try {
    // Validate presence of userId

    const manageDevice = new GetCustomerAddress(event.queryStringParameters.userId, event.queryStringParameters.suburb, event.queryStringParameters.postcode);
    const result = await manageDevice.getData();

    return {
      statusCode: 204,
      body: JSON.stringify(result),
      headers: {
        'Access-Control-Allow-Origin': '*', // or specific origin(s)
        'Access-Control-Allow-Methods': 'OPTIONS, GET',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Api-Key',
        'Vary': 'Origin',
      },
    };
  } catch (e : any) {
    // Differentiate between validation and access errors
    if (e.message.includes('Missing parameter') || e.message.includes('Invalid format')) {
      // Validation error - return 400
      return {
        statusCode: 400,
        body: e.message,
        headers: {
          'Access-Control-Allow-Origin': '*', // or specific origin(s)
          'Access-Control-Allow-Methods': 'OPTIONS, GET',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Api-Key',
          'Vary': 'Origin',
        },
      };
    } else {
      // Access-related error (e.g., unauthorized user) - return 403
      return {
        statusCode: 403,
        body: 'Forbidden access',
        headers: {
          'Access-Control-Allow-Origin': '*', // or specific origin(s)
          'Access-Control-Allow-Methods': 'OPTIONS, GET',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Api-Key',
          'Vary': 'Origin',
        },
      };
    }
  }
};
