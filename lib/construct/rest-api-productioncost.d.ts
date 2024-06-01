import { Construct } from 'constructs';
import { RestApi } from "aws-cdk-lib/aws-apigateway";
import { Stack } from 'aws-cdk-lib';
export declare class ProductionCostConstruct extends Construct {
    restApi: RestApi;
    restAPIKeyArn: string | undefined;
    constructor(scope: Construct, id: string, stack: Stack, _getSecretValueFn: any, _customResource: any);
    addApiKey(stackName: string, restApi: RestApi): void;
    addApiResponses(restApi: RestApi): void;
}
