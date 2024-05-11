import { Handler } from "aws-lambda";
import { SaveCustomerAddress } from '../modules/saveData';

export const handler: Handler = async (event: any) => {
  try { 
    if (event.httpMethod === "POST"){
      const manageDevice = new SaveCustomerAddress(event);
      await manageDevice.saveData();
    }

    // Construct the response
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // or specific origin(s)
        'Access-Control-Allow-Methods': 'OPTIONS, POST', // Include OPTIONS for preflight requests
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Api-Key',
        'Vary': 'Origin',
      },
      body: JSON.stringify('Success')
    };

    return response;
  } catch (e) {
    // Construct the error response
    const errorResponse = {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // or specific origin(s)
        'Access-Control-Allow-Methods': 'OPTIONS, POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Api-Key',
        'Vary': 'Origin',
      },
      body: (typeof e === 'string') ? e : 'Invalid Request Body'
    };

    return errorResponse;
  }
}
