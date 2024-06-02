import { Handler } from "aws-lambda";
import { GetTransportationAddress } from '../../modules/TransportationCost/getTransportationCostData';

export const handler: Handler = async (event: any) => {
  try {
    const { transportId } = event.queryStringParameters;
    if (!transportId) {
      throw new Error("Missing parameter: transportId");
    }
    const manageDevice = new GetTransportationAddress(transportId);
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
