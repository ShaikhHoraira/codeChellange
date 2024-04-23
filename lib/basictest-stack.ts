import { CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Function, Runtime, Code } from "aws-cdk-lib/aws-lambda";
import { RestApi, LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
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
      code: Code.fromAsset('handler'),
      handler: 'getHandler.handler',
      environment: {
        TABLE_NAME: saveAddress.tableName,
      },
    });

     const saveUserdataLambda = new Function(this, "PutCustomerAddressLambdaHandler", {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset("handler"),
      handler: "saveHandler.handler",
      environment: {
        TABLE_NAME: saveAddress.tableName,
      },
    });
    
    getUserdataLambda.role?.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'));
    saveAddress.grantWriteData(saveUserdataLambda);

    const api = new RestApi(this, "Tu_testApi", {
      defaultMethodOptions: {
        apiKeyRequired: true,
      },
    });
    const userAddressApi = api.root.resourceForPath('userAddress');
    console.log(userAddressApi)
    userAddressApi.addMethod('GET', new LambdaIntegration(getUserdataLambda));
    userAddressApi.addMethod('POST', new LambdaIntegration(saveUserdataLambda));
    
    const apiKey = api.addApiKey('ApiKey',{
      apiKeyName: 'tuApiKey',
      value: 'thisIsJustSampleAPi123' // we can get the apis using aws secret and get the key to fetch here 
    });
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
