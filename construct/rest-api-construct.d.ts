import { Construct } from 'constructs';
import { RestApi } from "aws-cdk-lib/aws-apigateway";
import { Stack } from 'aws-cdk-lib';
export declare class RestApiConstruct extends Construct {
    restApi: RestApi;
    constructor(scope: Construct, id: string, stack: Stack);
    addApiResponses(restApi: RestApi): void;
}
