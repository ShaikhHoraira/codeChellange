import { Handler } from "aws-lambda";
import { SaveCustomerAddress } from './saveData';

export const handler: Handler = async (event: any) => {
  try { 
    if (event.httpMethod === "POST"){
      const manageDevice = new SaveCustomerAddress(event);
      let reply = await manageDevice.saveData();
      console.log(reply)
    }

    // Construct the response
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // or specific origin(s)
        'Access-Control-Allow-Methods': 'OPTIONS, POST', // Include OPTIONS for preflight requests
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Vary': 'Origin',
      },
      body: (typeof e === 'string') ? e : 'Invalid Request Body'
    };

    return errorResponse;
  }
}
