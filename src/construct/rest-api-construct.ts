// import { CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Runtime, Code, Function } from 'aws-cdk-lib/aws-lambda';
import { RestApi, LambdaIntegration, ResponseType, CfnMethod } from "aws-cdk-lib/aws-apigateway";
import { Stack } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { ApiCommonResponse } from '../modules/Common/api-common-response';
import path = require('path');
// Import the AWS SDK module
import * as AWS from 'aws-sdk';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
//import { Secret } from 'aws-cdk-lib/aws-secretsmanager';

export class RestApiConstruct extends Construct {
  public restApi: RestApi;

  constructor(scope: Construct, id: string,stack : Stack) {
    super(scope, id);
    const stackName = Stack.of(this).stackName;
    // Configure the AWS SDK with region
    AWS.config.update({ region: process.env.AWS_REGION });

    const saveAddress = new Table(stack, "Details", {
      partitionKey: { name: "UserId", type: AttributeType.STRING },
      tableName: "CustomerDB",
    });
    saveAddress.addGlobalSecondaryIndex({
      indexName: 'UserIdIndex',
      partitionKey: { name: 'UserId', type: AttributeType.STRING },
    });
    const handlerDir = path.resolve(__dirname, '../../lib');
    const getUserdataLambda = new Function(stack, "GetCustomerAddressLambdaHandler", {
      runtime: Runtime.NODEJS_20_X,
      code: Code.fromAsset(handlerDir), 
      handler: 'handler/getHandler.handler',
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
      runtime: Runtime.NODEJS_20_X, // Adjust runtime if necessary
      code: Code.fromAsset(handlerDir),
      handler: 'handler/saveHandler.handler',
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

    const restApi = new RestApi(this, "UserContacts", {
      defaultMethodOptions: {
        apiKeyRequired: true,
      },
      defaultCorsPreflightOptions:{
        statusCode: 200,
        allowOrigins: ["'*'"],
        allowHeaders: ['Content-Type','Authorization','X-Api-Key'],
        allowMethods: ['POST', 'GET']
      }
      
    });
    this.restApi = restApi;
    const userAddressApi = restApi.root.resourceForPath('userDetails');
    userAddressApi.addMethod('GET', new LambdaIntegration(getUserdataLambda));
    userAddressApi.addMethod('POST', new LambdaIntegration(saveUserdataLambda));
    
    // const apiKey = api.addApiKey('ApiKey',{
    console.log("🚀 ~ RestApiConstruct ~ constructor ~ restApi:", restApi)
    //   apiKeyName: 'tuApiKey',
    //   value: 'thisIsJustSampleAPi123' // we can get the apis using aws secret and get the key to fetch here 
    // });
    // console.log("🚀 ~ RestApiConstruct ~ constructor ~ apiKey:", apiKey)
    // const plan = api.addUsagePlan('Tu_api-usage-plan', { // we can use rate limit and other usage plans 
    //   name: `api-usage-plan`,
    //   apiStages: [{ stage: api.deploymentStage }],
    // });

  
    // plan.addApiKey(apiKey);
  
    // new CfnOutput(this, "API URL", {
    //   value: api.url ?? "Something went wrong"
    // });
    this.addApiKey(stackName, restApi);
    this.addApiResponses(restApi);

    restApi.methods
      .filter(method => method.httpMethod === 'OPTIONS')
      .forEach(method => {
        const cfnMethod = method.node.defaultChild as CfnMethod;
        cfnMethod.apiKeyRequired = false;
      });
  };

addApiKey(stackName: string, restApi: RestApi) {
    // API Gateway API Key
    // const secret = new Secret(this, 'UserContacts-userAddress-api-secret', {
    //   secretName: `${stackName}/api-key`,
    //   description: 'Mobile push notification API Gateway API Key',
    //   generateSecretString: {
    //     generateStringKey: 'key',
    //     secretStringTemplate: JSON.stringify({}),
    //     excludeCharacters: ' %+~`#$&*()|[]{}:;<>?!\'/@"\\',
    //   },
    // });

    const apiKey = restApi.addApiKey('ApiKey', {
      apiKeyName: 'this._apiKeyName',
      value: 'secret.secretValueFromJson',
    });

    // this.restAPIKeyArn = secret.secretArn;

    // new CfnOutput(this, 'restAPIKeyArnAtSource', {
    //   value: this.restAPIKeyArn ?? '',
    // });

    const plan = restApi.addUsagePlan('userAPi-address-usage-plan', {
      name: `${stackName}-api-usage-plan`,
      apiStages: [{ stage: restApi.deploymentStage }],
    });

    plan.addApiKey(apiKey);
  }

  addApiResponses(restApi: RestApi) {
    const commonResponse = new ApiCommonResponse();
    // ***************** Error 400
    restApi.addGatewayResponse('BAD_REQUEST_BODY', {
      type: ResponseType.BAD_REQUEST_BODY,
      responseHeaders: {
        'Access-Control-Allow-Origin': '\'*\'',
      },
      templates: {
        'application/json': commonResponse.setResponseWithOutReason(400, 'Bad Request', '$context.requestId').body,
      },
    });
    // *****************Error 403
    restApi.addGatewayResponse('WAF_FILTERED', {
      type: ResponseType.WAF_FILTERED,
      responseHeaders: {
        'Access-Control-Allow-Origin': "'*'",

      },
      templates: {
        'application/json': commonResponse.setResponseWithOutReason(403, 'Forbidden', '$context.requestId').body,
      },
    });
    restApi.addGatewayResponse('EXPIRED_TOKEN', {
      type: ResponseType.EXPIRED_TOKEN,
      responseHeaders: {
        'Access-Control-Allow-Origin': "'*'",
      },
      templates: {
        'application/json': commonResponse.setResponseWithOutReason(403, 'Forbidden', '$context.requestId').body,
      },
    });
    restApi.addGatewayResponse('INVALID_API_KEY', {
      type: ResponseType.INVALID_API_KEY,
      responseHeaders: {
        'Access-Control-Allow-Origin': "'*'",
      },
      templates: {
        'application/json': commonResponse.setResponseWithOutReason(403, 'Forbidden', '$context.requestId').body,
      },
    });
    restApi.addGatewayResponse('ACCESS_DENIED', {
      type: ResponseType.ACCESS_DENIED,
      responseHeaders: {
        'Access-Control-Allow-Origin': "'*'",
      },
      templates: {
        'application/json': commonResponse.setResponseWithOutReason(403, 'Forbidden', '$context.requestId').body,
      },
    });
    restApi.addGatewayResponse('INVALID_SIGNATURE', {
      type: ResponseType.INVALID_SIGNATURE,
      responseHeaders: {
        'Access-Control-Allow-Origin': "'*'",
      },
      templates: {
        'application/json': commonResponse.setResponseWithOutReason(403, 'Forbidden', '$context.requestId').body,
      },
    });
    restApi.addGatewayResponse('MISSING_AUTHENTICATION_TOKEN', {
      type: ResponseType.MISSING_AUTHENTICATION_TOKEN,
      responseHeaders: {
        'Access-Control-Allow-Origin': "'*'",
        'Access-Control-Allow-Methods': 'OPTIONS, GET',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Vary': 'Origin',
      },
      templates: {
        'application/json': commonResponse.setResponseWithOutReason(403, 'Forbidden', '$context.requestId').body,
      },
    });
    // *****************Error 5xx
    restApi.addGatewayResponse('DEFAULT_5XX', {
      type: ResponseType.DEFAULT_5XX,
      responseHeaders: {
        'Access-Control-Allow-Origin': "'*'",
      },
      templates: {
        'application/json': commonResponse.setResponseWithOutReason(500, 'Internal Server Error', '$context.requestId').body,
      },
    });
    // ***************** Error 401
    restApi.addGatewayResponse('UNAUTHORIZED', {
      type: ResponseType.UNAUTHORIZED,
      responseHeaders: {
        'Access-Control-Allow-Origin': "'*'",
      },
      templates: {
        'application/json': commonResponse.setResponseWithOutReason(401, 'Unauthorized', '$context.requestId').body,
      },
    });
    // ***************** Error for 429
    restApi.addGatewayResponse('QUOTA_EXCEEDED', {
      type: ResponseType.QUOTA_EXCEEDED,
      responseHeaders: {
        'Access-Control-Allow-Origin': "'*'",
      },
      templates: {
        'application/json': commonResponse.setResponseWithOutReason(429, 'Limit Exceeded', '$context.requestId').body,
      },
    });
    restApi.addGatewayResponse('THROTTLED', {
      type: ResponseType.THROTTLED,
      responseHeaders: {
        'Access-Control-Allow-Origin': "'*'",
      },
      templates: {
        'application/json': commonResponse.setResponseWithOutReason(429, 'Limit Exceeded', '$context.requestId').body,
      },
    });
  }
}
