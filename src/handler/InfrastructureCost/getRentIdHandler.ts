import { Handler } from "aws-lambda";
import { GetInfrastructureCostData } from '../../modules/InfrastructureCost/getInfrastructureCostData';

export const handler: Handler = async (event: any) => {
  console.log("We are in getRentID")
  try {
    const { employeeId } = event.queryStringParameters;
    if (!employeeId) {
      throw new Error("Missing parameter: rentID");
    }
    const manageDevice = new GetInfrastructureCostData(employeeId);
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
