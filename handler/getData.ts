import * as AWS from "aws-sdk"

const tableName = process.env.TABLE_NAME;
const documentClient = new AWS.DynamoDB.DocumentClient({
  region: process.env.region,
});

export class GetCustomerAddress {
public userId : any;
    
constructor(userId: any){
        this.userId = userId;
    };
public async getData(){
    let item;
    const params = {
            IndexName: 'UserIdIndex',
            KeyConditionExpression: 'UserId = :userId',
            ExpressionAttributeValues: {
            ':userId': this.userId,
             },
            TableName: tableName!,
         };
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



    