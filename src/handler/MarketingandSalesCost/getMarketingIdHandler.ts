import { Handler } from "aws-lambda";
import { GetMarketingCostData } from '../../modules/MarketingandSalesCost/getMarketingCostData';

export const handler: Handler = async (event: any) => {
  console.log("We are in marketingInvoiceId")
  try {
    const { marketingInvoiceId } = event.queryStringParameters;
    console.log(event.queryStringParameters)
    if (!marketingInvoiceId) {
      throw new Error("Missing parameter: marketingInvoiceId");
    }
    const manageDevice = new GetMarketingCostData(marketingInvoiceId);
    const result = await manageDevice.getMarketingData();

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
