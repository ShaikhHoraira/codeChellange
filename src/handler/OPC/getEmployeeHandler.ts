import { Handler } from "aws-lambda";
import { GetCustomerAddress } from '../../modules/OPC/getEmployeeData';

export const handler: Handler = async (event: any) => {
  try {
    const { employeeId } = event.queryStringParameters;
    if (!employeeId) {
      throw new Error("Missing parameter: employeeId");
    }
    const manageDevice = new GetCustomerAddress(employeeId);
    const result = await manageDevice.getData();

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
