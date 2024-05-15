import { Handler } from "aws-lambda";
import { SaveCustomerAddress } from '../modules/saveData';

export const handler: Handler = async (event: any) => {
  console.log("We are in saveEmployeeHandler")
  try { 
    if (event.httpMethod === "POST"){
      const manageDevice = new SaveCustomerAddress(event);
      const responseData = await manageDevice.saveData();
      console.log("🚀 ~ consthandler:Handler= ~ responseData:", responseData)
    }
    // Construct the response
    const response = {
      statusCode: 200,
      body: JSON.stringify('Success')
    };
    return response;
    // console.log("lambda called", event.path)
    // return {
    //     statusCode: 200,
    //     body: event
    // }
  } catch (e) {
    // Construct the error response
    const errorResponse = {
      statusCode: 500,
      body: (typeof e === 'string') ? e : 'Invalid Request Body'
    };
    return errorResponse;
  }
}
