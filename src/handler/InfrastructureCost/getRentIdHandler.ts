import { Handler } from "aws-lambda";
import { GetInfrastructureCostData } from '../../modules/InfrastructureCost/getInfrastructureCostData';

export const handler: Handler = async (event: any) => {
  console.log("We are in getRentID")
  try {
    const { rentId } = event.queryStringParameters;
    console.log(event.queryStringParameters)
    if (!rentId) {
      throw new Error("Missing parameter: rentId");
    }
    const manageDevice = new GetInfrastructureCostData(rentId);
    const result = await manageDevice.getRentData();

    console.log(result)
    return {
      statusCode: 200,
      body: JSON.stringify(result),
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
