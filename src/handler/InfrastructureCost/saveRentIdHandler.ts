import { Handler } from "aws-lambda";
import { SaveInfrastructureCostData } from '../../modules/InfrastructureCost/saveInfrastructureCostData';

export const handler: Handler = async (event: any) => {
  console.log("We are in saveRentId")
  try { 
    if (event.httpMethod === "POST"){
      const manageDevice = new SaveInfrastructureCostData(event);
      const responseData = await manageDevice.saveRentData();
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
