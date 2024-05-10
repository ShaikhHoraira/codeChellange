import * as AWS from "aws-sdk";

const tableName = process.env.TABLE_NAME;
const documentClient = new AWS.DynamoDB.DocumentClient({
  region: process.env.region,
});

export class SaveCustomerAddress {
public payload : any;

constructor(payLoad: any){
    console.log("🚀 ~ SaveCustomerAddress ~ constructor ~ payLoad:", payLoad)
    this.payload = payLoad;
};

public async saveData(){
    const bodypram = JSON.parse(this.payload.body);
    console.log("🚀 ~ SaveCustomerAddress ~ saveData ~ bodypram:", bodypram)
    let params = {
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
      await documentClient.put(params).promise();
      return true
    } catch (e){
        return {
          statusCode:  500,
          body: e === 500 ? 'Invalid Request Body' : e, // here we can create and import a commomn error function or specific error handling function where the out put can be organise 
      };
    }
  }
}
