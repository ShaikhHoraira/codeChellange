import { Runtime, Code, Function } from 'aws-cdk-lib/aws-lambda';
import * as cr from 'aws-cdk-lib/custom-resources';
import * as path from 'path';
import { Construct } from 'constructs';
import { Stack } from 'aws-cdk-lib';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';

export class CustomResourceProvider extends Construct {
  public readonly serviceToken: string;

  constructor(scope: Construct, id: string , stack: Stack, secretName : string) {
    super(scope, id);
    const handlerDir = path.resolve(__dirname, '../../../lib');
    // Define the Lambda function
    const getSecretValueFunction = new Function(stack, 'GetSecretValueFunction', {
      runtime: Runtime.NODEJS_20_X,
      handler: 'handler/common/secretHandler.handler',
      code: Code.fromAsset(handlerDir),
      environment:{
        SECRET_NAME: secretName,
      }
    });
    getSecretValueFunction.grantPrincipal.addToPrincipalPolicy(
      new PolicyStatement({
        resources: ['*'],
        actions: [
          'lambda:InvokeFunction',
          'secretsmanager:GetSecretValue',
        ],
      }),
    );
    const provider = new cr.Provider(this, 'ResourceProviderHandler', {
      onEventHandler: getSecretValueFunction,
    });

    this.serviceToken = provider.serviceToken;
  }
}
