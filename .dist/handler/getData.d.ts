import { DynamoDB } from "aws-sdk";
export declare class GetCustomerAddress {
    userId: any;
    suburb: any;
    postcode: any;
    constructor(userId: any, suburb: any, postcode: any);
    getData(): Promise<DynamoDB.DocumentClient.ItemList | {
        statusCode: number;
        body: unknown;
    } | undefined>;
}
