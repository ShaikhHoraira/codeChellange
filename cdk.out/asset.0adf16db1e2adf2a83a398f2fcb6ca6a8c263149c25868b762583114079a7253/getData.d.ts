import * as AWS from "aws-sdk";
export declare class GetCustomerAddress {
    userId: any;
    constructor(userId: any);
    getData(): Promise<{
        statusCode: number;
        body: AWS.DynamoDB.DocumentClient.ItemList | undefined;
    }>;
}
