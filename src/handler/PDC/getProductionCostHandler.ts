import { Handler } from "aws-lambda";
import { GetCustomerAddress } from '../../modules/PDC/getProductionCostData';

export const handler: Handler = async (event: any) => {
  try {
    const { productionCostId } = event.queryStringParameters;
    if (!productionCostId) {
      throw new Error("Missing parameter: productionCostId");
    }
    const manageDevice = new GetCustomerAddress(productionCostId);
    const result = await manageDevice.getData();
    console.log()
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
