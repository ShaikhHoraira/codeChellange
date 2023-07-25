import * as AWS from "aws-sdk"

const tableName = process.env.TABLE_NAME
const documentClient = new AWS.DynamoDB.DocumentClient({
  region: process.env.region,
});


export class GetCustomerAddress {
public userId : any;
    
constructor(userId: any){
        this.userId = userId;
    }
public async getData(){
    console.info('getData function', this.userId)
    let item;
    const params = {
        IndexName: 'UserIdIndex',
        KeyConditionExpression: 'UserId = :userId',
        ExpressionAttributeValues: {
            ':userId': this.userId,
        },
        TableName: tableName!,
         };
         console.info('before try', this.userId)
        try{
            console.info('inside try', this.userId)
            const data = await documentClient.query(params).promise();
            item = data.Items;
            console.info('after db query', item)
            return item;
         }catch(e){
            return {
                statusCode:  500,
                body: e === 500 ? 'Invalid Request Body' : e, // here we can create and import a commomn error function or specific error handling function where the out put can be organise 
              };
         }
        
    }
}



    