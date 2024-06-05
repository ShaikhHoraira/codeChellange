import { Handler } from "aws-lambda";
import { SaveMarketingCostData } from '../../modules/MarketingandSalesCost/saveMarketingCostData';

export const handler: Handler = async (event: any) => {
  console.log("We are in saveRentId")
  try { 
    if (event.httpMethod === "POST"){
      const manageDevice = new SaveMarketingCostData(event);
      const responseData = await manageDevice.saveMarketingData();
      console.log("🚀 ~ consthandler:Handler= ~ responseData:", responseData)
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify('Success')
    };
    return response;
    // }
  } catch (e) {
    const errorResponse = {
      statusCode: 500,
      body: (typeof e === 'string') ? e : 'Invalid Request Body'
    };
    return errorResponse;
  }
}
