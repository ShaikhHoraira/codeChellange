import * as AWS from "aws-sdk";
export declare class ManageDevice {
    payload: any;
    constructor(payLooad: any);
    saveData(): Promise<import("aws-sdk/lib/request").PromiseResult<AWS.DynamoDB.DocumentClient.PutItemOutput, AWS.AWSError> | {
        statusCode: number;
        body: unknown;
    }>;
}
