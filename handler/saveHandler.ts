import { Handler } from "aws-cdk-lib/aws-lambda";
import { SaveCustomerAddress } from './saveData';

export const handler: Handler = async (event: any) => {
  try { 
    if (event.httpMethod === "POST"){
    const manageDevice = new SaveCustomerAddress(event);
    await manageDevice.saveData();
    }
    return {
        statusCode: 200,
        body: 'Success'
      };
  } catch (e) {
    return {
        statusCode:  500,
        body: e === 500 ? 'Invalid Request Body' : e, // here we can create and import a commomn error function or specific error handling function where the out put can be organise 
      };
  }
}
