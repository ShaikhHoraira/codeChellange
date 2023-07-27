import * as AWS from "aws-sdk"
import { DynamoDB } from "aws-sdk";
const tableName = process.env.TABLE_NAME;
const documentClient = new AWS.DynamoDB.DocumentClient({
  region: process.env.region,
});

export class GetCustomerAddress {
public userId : any;
public suburb : any;
public postcode : any;
    
constructor(userId: any, suburb : any, postcode: any){
        this.userId = userId;
        this.suburb = suburb;
        this.postcode = postcode;
    };
public async getData(){
    let item;
    const params: DynamoDB.DocumentClient.QueryInput = {
            IndexName: 'UserIdIndex',
            KeyConditionExpression: 'UserId = :userId',
            ExpressionAttributeValues: {
            ':userId': this.userId,
             },
            TableName: tableName!,
         };
         if (this.suburb) {
          params.FilterExpression = 'Suburb = :suburb';
          params.ExpressionAttributeValues![':suburb'] = this.suburb;
        }
    
        // Check if postcode parameter is provided and add it to the query
        if (this.postcode) {
          if (params.FilterExpression) {
            params.FilterExpression += ' AND PostCode = :postcode';
          } else {
            params.FilterExpression = 'PostCode = :postcode';
          }
          params.ExpressionAttributeValues![':postcode'] = this.postcode;
        }
        try{
            console.info('inside try', this.userId);
            const data = await documentClient.query(params).promise();
            item = data.Items;
            return item;
         }catch(e){
            return {
                statusCode:  500,
                body: e === 500 ? 'Invalid Request Body' : e, // here we can create and import a commomn error function or specific error handling function where the out put can be organise 
              };
         }
    }
}



    