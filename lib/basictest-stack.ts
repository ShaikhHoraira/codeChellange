import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as apigatewayv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as apigatewayv2Integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';

export class BasictestStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda function for handling GET requests
    const getUserdataLambda = new lambda.Function(this, 'GetUserDataLambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/get-userdata'),
    });

    // Lambda function for handling POST requests
    const saveUserdataLambda = new lambda.Function(this, 'SaveUserDataLambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/save-userdata'),
    });

    // API Gateway REST API
    const api = new apigateway.RestApi(this, 'Tu_testApi', {
      defaultCorsPreflightOptions: {
        statusCode: 200,
        allowOrigins: ['*'],
        allowHeaders: ['Content-Type', 'Authorization', 'X-Api-Key'],
        allowMethods: ['POST', 'GET']
      }
    });

    // Define resources and methods
    const userAddressApi = api.root.resourceForPath('userAddress');
    userAddressApi.addMethod('GET', new apigateway.LambdaIntegration(getUserdataLambda));
    userAddressApi.addMethod('POST', new apigateway.LambdaIntegration(saveUserdataLambda));

    // Output API URL
    new cdk.CfnOutput(this, 'API URL', {
      value: api.url ?? 'Something went wrong'
    });
  }
}
