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
    const bodypram = JSON.parse(this.payload);
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
     const returnResult = await documentClient.put(params).promise();
    console.info(returnResult)
    return returnResult
    
}

}
