//import { CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Function, Runtime, Code } from "aws-cdk-lib/aws-lambda";
//import { RestApi, LambdaIntegration, MockIntegration, PassthroughBehavior } from "aws-cdk-lib/aws-apigateway";
import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';

export class BasictestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const saveAddress = new Table(this, "Address", {
      partitionKey: { name: "UserId", type: AttributeType.STRING },
      tableName: "Tu_Test_TableName",
    });
    saveAddress.addGlobalSecondaryIndex({
      indexName: 'UserIdIndex',
      partitionKey: { name: 'UserId', type: AttributeType.STRING },
    });

    const getUserdataLambda = new Function(this, "GetCustomerAddressLambdaHandler", {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset('handler'), // Adjusted path
      handler: 'getHandler.handler',
      environment: {
        TABLE_NAME: saveAddress.tableName,
      },
    });

    const saveUserdataLambda = new Function(this, "PutCustomerAddressLambdaHandler", {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset("handler"), // Adjusted path
      handler: 'saveHandler.handler',
      environment: {
        TABLE_NAME: saveAddress.tableName,
      },
    });
    getUserdataLambda.role?.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'));
    saveAddress.grantWriteData(saveUserdataLambda);

    // const api = new RestApi(this, "Tu_testApi", {
    //   defaultMethodOptions: {
    //     apiKeyRequired: true,
    //   },
    //   defaultCorsPreflightOptions:{
    //     statusCode: 200,
    //     allowOrigins: ['*'],
    //     allowHeaders: ['Content-Type','Authorization','X-Api-Key'],
    //     allowMethods: ['POST', 'GET']
    //   }
      
    // });
    // const userAddressApi = api.root.resourceForPath('userAddress');
    // userAddressApi.addMethod('GET', new LambdaIntegration(getUserdataLambda));
    // userAddressApi.addMethod('POST', new LambdaIntegration(saveUserdataLambda));
    // userAddressApi.addMethod('OPTIONS', new MockIntegration({
    //   integrationResponses: [{
    //     statusCode: '200',
    //     responseParameters: {
    //       'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
    //       'method.response.header.Access-Control-Allow-Methods': "'OPTIONS,GET,POST'",
    //       'method.response.header.Access-Control-Allow-Origin': "'*'",
    //     },
    //   }],
    //   passthroughBehavior: PassthroughBehavior.NEVER,
    //   requestTemplates: {
    //     'application/json': '{"statusCode": 200}',
    //   },
    // }), {
    //   methodResponses: [{
    //     statusCode: '200',
    //     responseParameters: {
    //       'method.response.header.Access-Control-Allow-Headers': true,
    //       'method.response.header.Access-Control-Allow-Methods': true,
    //       'method.response.header.Access-Control-Allow-Origin': true,
    //     },
    //   }],
    // });
    
    // const apiKey = api.addApiKey('ApiKey',{
    //   apiKeyName: 'tuApiKey',
    //   value: 'thisIsJustSampleAPi123' // we can get the apis using aws secret and get the key to fetch here 
    // });
    // const plan = api.addUsagePlan('Tu_api-usage-plan', { // we can use rate limit and other usage plans 
    //   name: `api-usage-plan`,
    //   apiStages: [{ stage: api.deploymentStage }],
    // });
  
    // plan.addApiKey(apiKey);
  
    // new CfnOutput(this, "API URL", {
    //   value: api.url ?? "Something went wrong"
    // });

  };
}
