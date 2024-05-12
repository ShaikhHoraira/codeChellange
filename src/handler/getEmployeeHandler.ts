import { Handler } from "aws-lambda";
import { GetCustomerAddress } from '../modules/getData';

export const handler: Handler = async (event: any) => {
  try {
    // Validate presence of userId
    const { userId, suburb, postcode } = event.queryStringParameters;
    if (!userId) {
      throw new Error("Missing parameter: userId");
    }
    const manageDevice = new GetCustomerAddress(userId, suburb, postcode);
    const result = await manageDevice.getData();
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (e: any) {
    // Differentiate between validation and access errors
    if (e.message.includes('Missing parameter') || e.message.includes('Invalid format')) {
      // Validation error - return 400
      return {
        statusCode: 400,
        body: e.message,
      };
    } else {
      // Access-related error (e.g., unauthorized user) - return 403
      return {
        statusCode: 403,
        body: 'Forbidden access',
      };
    }
  }
};
