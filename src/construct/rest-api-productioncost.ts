// import { CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Runtime, Code, Function } from 'aws-cdk-lib/aws-lambda';
import { RestApi, LambdaIntegration, ResponseType, CfnMethod, Cors, AuthorizationType, RequestValidator } from "aws-cdk-lib/aws-apigateway";
import { Stack } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { ApiCommonResponse } from '../modules/Common/api-common-response';
import path = require('path');
// Import the AWS SDK module
import * as AWS from 'aws-sdk';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import ProductionCostcostSchema from '../schema/registrationSchema'
//import { Secret } from 'aws-cdk-lib/aws-secretsmanager';

export class ProductionCostcost extends Construct {
  public restApi: RestApi;

  constructor(scope: Construct, id: string,stack : Stack) {
    super(scope, id);
    const stackName = Stack.of(this).stackName;
    // Configure the AWS SDK with region
    AWS.config.update({ region: process.env.AWS_REGION });

    const saveAddress = new Table(stack, "ProductionCostDetails", {
      partitionKey: { name: "ProductionCostId", type: AttributeType.STRING },
      tableName: "ProductionCostDB",
    });
    saveAddress.addGlobalSecondaryIndex({
      indexName: 'ProductionCostIdIndex',
      partitionKey: { name: 'ProductionCostId', type: AttributeType.STRING },
    });
    const handlerDir = path.resolve(__dirname, '../../lib');
    const getProductionCostdataLambda = new Function(stack, "GetProductionCostLambda", {
      runtime: Runtime.NODEJS_20_X,
      code: Code.fromAsset(handlerDir), 
      handler: 'handler/PDC/getProductionCostHandler.handler',
      environment: {
        TABLE_NAME: saveAddress.tableName,
      },
    });
    getProductionCostdataLambda.grantPrincipal.addToPrincipalPolicy(
      new PolicyStatement({
        resources: ['*'],
        actions: ['dynamodb:getItem', 'secretsmanager:GetSecretValue'],
      }),
    );
    

    const saveProductionCostdataLambda = new Function(stack, "PutProductionCostLambda", {
      runtime: Runtime.NODEJS_20_X, // Adjust runtime if necessary
      code: Code.fromAsset(handlerDir),
      handler: 'handler/PDC/saveProductionCostHandler.handler',
      environment: {
        TABLE_NAME: saveAddress.tableName,
      },
    });

    saveProductionCostdataLambda.grantPrincipal.addToPrincipalPolicy(
      new PolicyStatement({
        resources: ['*'],
        actions: ['dynamodb:PutItem', 'secretsmanager:GetSecretValue'],
      }),
    );
    getProductionCostdataLambda.role?.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'));
    saveAddress.grantWriteData(saveProductionCostdataLambda);
    
    const restApi = new RestApi(this, "ProductionCost", {
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
    const requestValidator = new RequestValidator(this, 'user-registerdb-request-validator', {
      restApi: this.restApi,
      validateRequestBody: true,
      validateRequestParameters: true,
    });
    const userRegistrationModel = restApi.addModel(
      'register-User-data-model',
      {
        schema: ProductionCostcostSchema, // change
        description: 'Request model for userRegistration data ',
        modelName: 'userRegistrationDataInputDB',
        contentType: 'application/json',
      },
    );
    const ProductionCostApi = restApi.root.resourceForPath('Materials');
    //restApi.root.resourceForPath('Technology');
    // const RentCostApi = restApi.root.resourceForPath('Technology');
    // const UtilitiesCostApi = restApi.root.resourceForPath('Utilities');
    // const MaintenanceCostApi = restApi.root.resourceForPath('Maintenance');
    // const RepairsCosteApi = restApi.root.resourceForPath('Repairs');
    ProductionCostApi.addMethod('GET', new LambdaIntegration(getProductionCostdataLambda));
    
    ProductionCostApi.addMethod('POST', new LambdaIntegration(saveProductionCostdataLambda),{
      authorizationType: AuthorizationType.NONE,
      requestModels: {
        'application/json': userRegistrationModel,
      },
      requestValidator,
    });
    // RentCostApi.addMethod('POST', new LambdaIntegration(saveProductionCostdataLambda));
    // UtilitiesCostApi.addMethod('POST', new LambdaIntegration(saveProductionCostdataLambda));
    // MaintenanceCostApi.addMethod('POST', new LambdaIntegration(saveProductionCostdataLambda));
    // RepairsCosteApi.addMethod('POST', new LambdaIntegration(saveProductionCostdataLambda));
    
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
    //   description: 'API Gateway API Key',
    //   generateSecretString: {
    //     generateStringKey: 'key',
    //     secretStringTemplate: JSON.stringify({}),
    //     excludeCharacters: ' %+~`#$&*()|[]{}:;<>?!\'/@"\\',
    //   },
    // });

    const apiKey = restApi.addApiKey('ApiKey', {
      apiKeyName: 'this._apiKeyName_Production',
      value: 'secret.secretValueFromJsonForProductioncost',
    });

    // this.restAPIKeyArn = secret.secretArn;

    // new CfnOutput(this, 'restAPIKeyArnAtSource', {
    //   value: this.restAPIKeyArn ?? '',
    // });

    const plan = restApi.addUsagePlan('ProductionCostAPi-address-usage-plan', {
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
