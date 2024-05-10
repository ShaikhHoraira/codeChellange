import { CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Function, Runtime, Code } from "aws-cdk-lib/aws-lambda";
import { RestApi, LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { Stack } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';

// Import the AWS SDK module
import * as AWS from 'aws-sdk';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';

export class RestApiConstruct extends Construct {
  constructor(scope: Construct, id: string,stack : Stack) {
    super(scope, id);

    // Configure the AWS SDK with region
    AWS.config.update({ region: process.env.AWS_REGION });

    const saveAddress = new Table(stack, "Address", {
      partitionKey: { name: "UserId", type: AttributeType.STRING },
      tableName: "Tu_Test_TableName",
    });
    saveAddress.addGlobalSecondaryIndex({
      indexName: 'UserIdIndex',
      partitionKey: { name: 'UserId', type: AttributeType.STRING },
    });

    const getUserdataLambda = new Function(stack, "GetCustomerAddressLambdaHandler", {
      runtime: Runtime.NODEJS_20_X,
      code: Code.fromAsset('handler'), 
      handler: 'getHandler.handler',
      environment: {
        TABLE_NAME: saveAddress.tableName,
      },
    });
    getUserdataLambda.grantPrincipal.addToPrincipalPolicy(
      new PolicyStatement({
        resources: ['*'],
        actions: ['dynamodb:getItem', 'secretsmanager:GetSecretValue'],
      }),
    );

    const saveUserdataLambda = new Function(stack, "PutCustomerAddressLambdaHandler", {
      runtime: Runtime.NODEJS_20_X,
      code: Code.fromAsset("handler"),
      handler: 'saveHandler.handler',
      environment: {
        TABLE_NAME: saveAddress.tableName,
      },
    });
    saveUserdataLambda.grantPrincipal.addToPrincipalPolicy(
      new PolicyStatement({
        resources: ['*'],
        actions: ['dynamodb:PutItem', 'secretsmanager:GetSecretValue'],
      }),
    );
    getUserdataLambda.role?.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'));
    saveAddress.grantWriteData(saveUserdataLambda);

    const api = new RestApi(this, "Tu_testApi", {
      defaultMethodOptions: {
        apiKeyRequired: true,
      },
      defaultCorsPreflightOptions:{
        statusCode: 204,
        allowOrigins: ['*'],
        allowHeaders: ['Content-Type','Authorization','X-Api-Key'],
        allowMethods: ['POST', 'GET']
      }
      
    });
    const userAddressApi = api.root.resourceForPath('userAddress');
    userAddressApi.addMethod('GET', new LambdaIntegration(getUserdataLambda));
    userAddressApi.addMethod('POST', new LambdaIntegration(saveUserdataLambda));
    
    const apiKey = api.addApiKey('ApiKey',{
      apiKeyName: 'tuApiKey',
      value: 'thisIsJustSampleAPi123' // we can get the apis using aws secret and get the key to fetch here 
    });
    console.log("🚀 ~ RestApiConstruct ~ constructor ~ apiKey:", apiKey)
    const plan = api.addUsagePlan('Tu_api-usage-plan', { // we can use rate limit and other usage plans 
      name: `api-usage-plan`,
      apiStages: [{ stage: api.deploymentStage }],
    });

  
    plan.addApiKey(apiKey);
  
    new CfnOutput(this, "API URL", {
      value: api.url ?? "Something went wrong"
    });

  };
}
