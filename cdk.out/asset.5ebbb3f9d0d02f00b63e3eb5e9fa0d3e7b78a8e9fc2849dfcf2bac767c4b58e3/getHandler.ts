import { Handler } from "aws-cdk-lib/aws-lambda";

export const handler: Handler = async (event : any) => {
  try {
    let response;
     if (event.httpMethod === "GET"){
    //   response =  await manageGetData.getDeviceByDeviceToken('');
    //   console.log("🚀 ~ file: save_retrive_address.ts:16 ~ constTuHandler:Handler= ~ response:", response)

    }
    return {
        statusCode: 200,
        body: 'Success',
      };
  } catch (e) {
    return {
        statusCode:  500,
        body: e === 500 ? 'Invalid Request Body' : 'Something went wrong',
      };
  }
};