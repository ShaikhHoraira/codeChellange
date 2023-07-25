import * as AWS from "aws-sdk"


const tableName = process.env.TABLE_NAME
const documentClient = new AWS.DynamoDB.DocumentClient({
  region: process.env.region,
});

export class ManageDevice {
public payload : any;

constructor(payLooad: any){
    this.payload = payLooad;
}

public async saveData(){
    console.info('returning from module 17', this.payload)
    const bodypram = JSON.parse(this.payload.body);
    console.info('after parse', bodypram)
    var params = {
        TableName: tableName!,
        Item: {
          UserId: bodypram.userId,
          CustomerName : bodypram.customerName,
          AppartmentNo : bodypram.appartmentNo,
          Address: bodypram.address,
          Suburb: bodypram.suburb,
          PostCode: bodypram.postCode,
          State: bodypram.state,
          Country: bodypram.country
        }
      };
    try {
    console.info('inside try', bodypram)
    // const returnResult = 
    await documentClient.put(params).promise();
    // console.info('after db request',returnResult)
    return true
    } catch (e){
        return {
            statusCode:  500,
            body: e === 500 ? 'Invalid Request Body' : e, // here we can create and import a commomn error function or specific error handling function where the out put can be organise 
          };
    }
}

}
