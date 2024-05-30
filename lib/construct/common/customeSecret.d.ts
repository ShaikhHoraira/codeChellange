import { Construct } from 'constructs';
import { Stack } from 'aws-cdk-lib';
export declare class CustomResourceProvider extends Construct {
    readonly serviceToken: string;
    constructor(scope: Construct, id: string, stack: Stack);
}
