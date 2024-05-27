import { Handler } from "aws-lambda";
import { SaveCustomerAddress } from '../../modules/OPC/saveEmployeeData';

export const handler: Handler = async (event: any) => {
  console.log("We are in saveEmployeeHandler")
  try { 
    if (event.httpMethod === "POST"){
      const manageDevice = new SaveCustomerAddress(event);
      const responseData = await manageDevice.saveData();
      console.log("🚀 ~ consthandler:Handler= ~ responseData:", responseData)
    }
    // Construct the response
    // const response = {
    //   statusCode: 200,
    //   body: JSON.stringify('Success')
    // };

    console.log("this is console log from save rent id from infracture construct")
    console.log(event)
    const response = {
      statusCode: 200,
      body: JSON.stringify(event)
    }
    return response;
  } catch (e) {
    // Construct the error response
    const errorResponse = {
      statusCode: 500,
      body: (typeof e === 'string') ? e : 'Invalid Request Body'
    };
    return errorResponse;
  }
}
