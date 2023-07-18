import { Handler } from "aws-cdk-lib/aws-lambda";


const tableName = process.env.TODO_TABLE_NAME
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'ap-southeast-2'});

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});



export const handler: Handler = async (event : any) => {
console.info("EVENT\n" + tableName)

const bodypram = JSON.parse(event.body)
const customerId = bodypram.custometId;
const customerName = bodypram.custometName
var params = {
  TableName: tableName,
  Item: {
    CUSTOMER_ID : customerId,
    CUSTOMER_NAME : customerName
  }
};
  try {
    let response;
    // if (event.httpMethod === 'POST') {
      
      response = await ddb.put(params).promise();


      // const tryThis = await saveDevice(event);
      // console.info(tryThis)
      // const result = await client.send(new PutCommand(params));
      // if (result.$metadata && result.$metadata.httpStatusCode && result.$metadata.httpStatusCode === 200) {
      //   return true;
      // } else {
      //   return false;
      // }
    // } 
    return {
        statusCode: 200,
        body: `${tableName} Success`,
      };
  } catch (e) {
    return {
        statusCode:  500,
        body: e === 500 ? 'Invalid Request Body' : 'Something went wrong',
      };
  }
  
};






// export async function saveDevice(event : object): Promise<boolean> {
  


//   try {
//     const result = await client.send(new PutCommand(params));
//     if (result.$metadata && result.$metadata.httpStatusCode && result.$metadata.httpStatusCode === 200) {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (err: any) {
//     throw err;
//   }
// }
