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
        const params = {
            IndexName: 'UserIdIndex',
            KeyConditionExpression: 'UserId = :userId',
            ExpressionAttributeValues: {
              ':userId': this.userId,
            },
            TableName: tableName!,
          };
          
            const data = await documentClient.query(params).promise();
            const items = data.Items;
          
          return {
              statusCode: 200,
              body: items,
            };


    }


}



    