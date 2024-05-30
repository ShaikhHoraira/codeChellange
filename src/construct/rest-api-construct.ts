// import { CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Runtime, Code, Function } from 'aws-cdk-lib/aws-lambda';
import { RestApi, LambdaIntegration, ResponseType, CfnMethod, Cors, RequestValidator, AuthorizationType } from "aws-cdk-lib/aws-apigateway";
import { CfnOutput, Stack } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { ApiCommonResponse } from '../modules/Common/api-common-response';
import path = require('path');
import * as AWS from 'aws-sdk';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import RegistrationSchema from '../schema/registrationSchema'
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { CustomResourceProvider } from './common/customeSecret';
import * as cdk from 'aws-cdk-lib';
//import { Secret } from 'aws-cdk-lib/aws-secretsmanager';

export class RestApiConstruct extends Construct {
  public restApi: RestApi;
  public restAPIKeyArn: string | undefined;
  //private _apiKeyName: string | undefined;
  constructor(scope: Construct, id: string, stack : Stack) {
    super(scope, id);
    const stackName = Stack.of(this).stackName;

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
      deployOptions:{
          dataTraceEnabled: true,
          tracingEnabled: true,
          stageName: 'v1',
          // loggingLevel: MethodLoggingLevel.INFO,
      },
    defaultMethodOptions: {
      apiKeyRequired: true,
    },
    defaultCorsPreflightOptions: {
      allowOrigins: [
        '*',
        // support localhost as an origin only in non-prod environments
      ],
      allowHeaders: Cors.DEFAULT_HEADERS.concat(['x-api-key']),
    },
  });
  
    this.restApi = restApi;
    const userAddressApi = restApi.root.resourceForPath('userDetails');
    
    const requestValidator = new RequestValidator(this, 'user-registerdb-request-validator', {
      restApi: this.restApi,
      validateRequestBody: true,
      validateRequestParameters: true,
    });

    const userRegistrationModel = restApi.addModel(
      'register-User-data-model',
      {
        schema: RegistrationSchema, // change
        description: 'Request model for userRegistration data ',
        modelName: 'userRegistrationDataInputDB',
        contentType: 'application/json',
      },
    );
    
    userAddressApi.addMethod('GET', new LambdaIntegration(getUserdataLambda));
    userAddressApi.addMethod('POST', new LambdaIntegration(saveUserdataLambda),{
      authorizationType: AuthorizationType.NONE,
      requestModels: {
        'application/json': userRegistrationModel,
      },
      requestValidator,
    });
    
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
  const secretNameforAPi = `${stackName}/${this.restApi}/api-key`
  console.log("🚀 ~ RestApiConstruct ~ addApiKey ~ inside add apikey function:", restApi)
  const secret = new Secret(this, 'ApiSecretRegistration', {
    secretName: 'secretNameforAPi',
    description: 'Register Customer API Gateway API Key',
    generateSecretString: {
      generateStringKey: 'key',
      secretStringTemplate: JSON.stringify({}),
      excludeCharacters: ' %+~`#$&*()|[]{}:;<>?!\'/@"\\',
    },
  });
  console.log("🚀 ~ RestApiConstruct ~ addApiKey ~ inside add apikey function:", secret)
  this.restAPIKeyArn = secret.secretArn;

    new CfnOutput(this, 'restAPIKeyArnAtSource', {
      value: this.restAPIKeyArn ?? '',
    });
    const plan = restApi.addUsagePlan('userAPi-address-usage-plan', {
      name: `${stackName}-api-usage-plan`,
      apiStages: [{ stage: restApi.deploymentStage }],
    });
    console.log("🚀 ~ RestApiConstruct ~ addApiKey ~ inside add apikey after the plan code block:", plan)
    

  console.log("🚀 ~ RestApiConstruct ~ addApiKey ~ secret:", secretNameforAPi)
  const customResourceProvider = new CustomResourceProvider(this, 'ApiResourceProvider', Stack.of(this));
  const customResource = new cdk.CustomResource(this, 'customResourceProviderForApi', {
    serviceToken: customResourceProvider.serviceToken,
    properties: {
      SECRET_NAME: 'secretNameforAPi',
    },
  });
  console.log("🚀 ~ RestApiConstruct ~ addApiKey ~ after custome resourse:", secretNameforAPi)
    const apiKey = restApi.addApiKey('ApiKey', {
      apiKeyName: 'this._apiKeyName',
      value: customResource.getAttString('SecretValue'),
    });
    plan.addApiKey(apiKey);
    

    
  }

  addApiResponses(restApi: RestApi) {
    const commonResponse = new ApiCommonResponse();
    // ***************** Error 400
    restApi.addGatewayResponse('BAD_REQUEST_BODY', {
      type: ResponseType.BAD_REQUEST_BODY,
      responseHeaders: {
        'Access-Control-Allow-Origin': "'*'",
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
          'Access-Control-Allow-Origin': "'*'", // Corrected syntax
          'Access-Control-Allow-Methods': "'OPTIONS, GET'",
          'Access-Control-Allow-Headers': "'Content-Type, Authorization'",
          'Vary': "'Origin'",
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
        'Access-Control-Allow-Origin': "'*'", // Corrected syntax
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
