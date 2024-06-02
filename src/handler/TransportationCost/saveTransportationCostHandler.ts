import { Handler } from "aws-lambda";
import { saveTransportationCostData } from '../../modules/TransportationCost/saveTransportationCostData.ts';

export const handler: Handler = async (event: any) => {
  console.log(event)
  console.log(" THis is TransportationCostLambda")
  try { 
    let responseDB;
    if (event.httpMethod === "POST"){
      const manageDevice = new saveTransportationCostData(event);
      responseDB =await manageDevice.saveData();
    }
    // Construct the response
    const response = {
      statusCode: 200,
      body: JSON.stringify(responseDB)
    };
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
