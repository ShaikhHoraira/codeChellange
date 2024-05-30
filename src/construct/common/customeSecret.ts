import { Runtime, Code, Function } from 'aws-cdk-lib/aws-lambda';
import * as cr from 'aws-cdk-lib/custom-resources';
import * as path from 'path';
import { Construct } from 'constructs';

export class CustomResourceProvider extends Construct {
  public readonly serviceToken: string;

  constructor(scope: Construct, id: string) {
    super(scope, id);
    const handlerDir = path.resolve(__dirname, '../../../lib');
    // Define the Lambda function
    const getSecretValueFunction = new Function(this, 'GetSecretValueFunction', {
      runtime: Runtime.NODEJS_20_X,
      handler: 'handler/common/secretHandler.handler',
      code: Code.fromAsset(handlerDir),
    });

    // Create the custom resource provider
    const provider = new cr.Provider(this, 'CustomResourceProvider', {
      onEventHandler: getSecretValueFunction,
    });

    this.serviceToken = provider.serviceToken;
  }
}
