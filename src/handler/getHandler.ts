import { Handler } from "aws-cdk-lib/aws-lambda";
import { GetCustomerAddress } from '../modules/getData';


export const handler: Handler = async (event : any) => {
  try {
    if (!event.queryStringParameters.userId || !event.queryStringParameters ) {
      return {
        statusCode: 400,
        body: "Missing userId, Please provide userId",
      };
    };
    const manageDevice = new GetCustomerAddress(event.queryStringParameters.userId,event.queryStringParameters.suburb, event.queryStringParameters.postcode);
    const result = await manageDevice.getData();
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (e) {
    return {
        statusCode:  500,
        body: e === 500 ? 'Invalid Request Body' : e,
      };
  };
};