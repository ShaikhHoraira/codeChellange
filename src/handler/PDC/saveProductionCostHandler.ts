import { Handler } from "aws-lambda";
// import { SaveCustomerAddress } from '../modules/saveData';

export const handler: Handler = async (event: any) => {
  try { 
    // if (event.httpMethod === "POST"){
    //   const manageDevice = new SaveCustomerAddress(event);
    //   await manageDevice.saveData();
    // }
    // // Construct the response
    // const response = {
    //   statusCode: 200,
    //   body: JSON.stringify('Success')
    // };
    // return response;
    console.log("")
    console.log(" THis is poroductionCostLambda",event)
    return {
        statusCode: 200,
        body: event
    }
  } catch (e) {
    // Construct the error response
    const errorResponse = {
      statusCode: 500,
      body: (typeof e === 'string') ? e : 'Invalid Request Body'
    };
    return errorResponse;
  }
}
