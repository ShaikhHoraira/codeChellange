import { DynamoDB } from "aws-sdk";
export declare class GetCustomerAddress {
    userId: string;
    suburb: string;
    postcode: string;
    constructor(userId: string, suburb: string, postcode: string);
    getData(): Promise<DynamoDB.DocumentClient.ItemList | {
        statusCode: number;
        body: unknown;
    } | undefined>;
}
