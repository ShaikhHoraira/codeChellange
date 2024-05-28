import { Construct } from 'constructs';
import { RestApi } from "aws-cdk-lib/aws-apigateway";
import { Stack } from 'aws-cdk-lib';
export declare class OperatingcostConstruct extends Construct {
    restApi: RestApi;
    constructor(scope: Construct, id: string, stack: Stack);
    addApiKey(stackName: string, restApi: RestApi): void;
    addApiResponses(restApi: RestApi): void;
}
