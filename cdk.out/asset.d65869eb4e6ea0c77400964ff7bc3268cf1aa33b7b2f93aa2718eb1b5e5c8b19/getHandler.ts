import { Handler } from "aws-cdk-lib/aws-lambda";
import { GetCustomerAddress } from './getData'


export const handler: Handler = async (event : any) => {
  try {
    if (!event.queryStringParameters.userId || !event.queryStringParameters ) {
      return {
        statusCode: 400,
        body: "Missing userId, Please provide userId",
      };
    };
    const manageDevice = new GetCustomerAddress(event.queryStringParameters.userId);
    const result = await manageDevice.getData();
    console.info('result from module get', result)
    return {
      statusCode: 200,
      body: result
    };
  } catch (e) {
    console.info(e)
    return {
        statusCode:  500,
        body: e === 500 ? 'Invalid Request Body' : e,
      };
  };
};
