import { Handler } from "aws-lambda";
import { GetInsuranceCostData } from '../../modules/FinancialCost/getInsuranceCostData';

export const handler: Handler = async (event: any) => {
  console.log("We are in getInsuranceId")
  try {
    const { insuranceId } = event.queryStringParameters;
    console.log(event.queryStringParameters)
    if (!insuranceId) {
      throw new Error("Missing parameter: insuranceId");
    }
    const manageDevice = new GetInsuranceCostData(insuranceId);
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
