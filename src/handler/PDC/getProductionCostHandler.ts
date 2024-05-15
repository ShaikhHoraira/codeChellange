import { Handler } from "aws-lambda";
// import { GetCustomerAddress } from '../modules/getData';

export const handler: Handler = async (event: any) => {
  try {
    // const { userId, suburb, postcode } = event.queryStringParameters;
    // if (!userId) {
    //   throw new Error("Missing parameter: userId");
    // }
    // const manageDevice = new GetCustomerAddress(userId, suburb, postcode);
    // const result = await manageDevice.getData();
    console.log(event)
    return {
      statusCode: 200,
      body: JSON.stringify(event),
    };
  } catch (e: any) {
    if (e.message.includes('Missing parameter') || e.message.includes('Invalid format')) {
      return {
        statusCode: 400,
        body: e.message,
      };
    } else {
      return {
        statusCode: 403,
        body: 'Forbidden access',
      };
    }
  }
};
