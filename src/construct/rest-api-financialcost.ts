// import { CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Runtime, Code, Function } from 'aws-cdk-lib/aws-lambda';
import * as cdk from 'aws-cdk-lib';
import { RestApi, LambdaIntegration, ResponseType, CfnMethod, Cors, AuthorizationType, RequestValidator } from "aws-cdk-lib/aws-apigateway";
// import { Stack, CfnOutput } from 'aws-cdk-lib';
import {  Stack } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { ApiCommonResponse } from '../modules/Common/api-common-response';
import path = require('path');
import * as AWS from 'aws-sdk';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import FinancialCostSchema from '../schema/financialCostSchema'
//import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { CustomResourceProvider } from './common/customeSecret';

export class FinancialCostConstruct extends Construct {
  public FinanceRestApi: RestApi;
  public restAPIKeyArn: string | undefined;
  constructor(scope: Construct, id: string,stack : Stack) {
    super(scope, id);
    const stackName = Stack.of(this).stackName;

    AWS.config.update({ region: process.env.AWS_REGION });

    const saveAddress = new Table(stack, "InsuranceDetails", {
      partitionKey: { name: "InsuranceId", type: AttributeType.STRING },
      tableName: "FinanceInsuranceDB",
    });
    saveAddress.addGlobalSecondaryIndex({
      indexName: 'FinanceInsuranceIndex',
      partitionKey: { name: 'InsuranceId', type: AttributeType.STRING },
    });

    //Lambda GET
    const handlerDir = path.resolve(__dirname, '../../lib');
    const getInsurancedataLambda = new Function(stack, "GetInsuranceLambda", {
      runtime: Runtime.NODEJS_20_X,
      code: Code.fromAsset(handlerDir), 
      handler: 'handler/FinancialCost/getInsuranceIdHandler.handler',
      environment: {
        TABLE_NAME: saveAddress.tableName,
      },
    });
    getInsurancedataLambda.grantPrincipal.addToPrincipalPolicy(
      new PolicyStatement({
        resources: ['*'],
        actions: ['dynamodb:getItem', 'secretsmanager:GetSecretValue'],
      }),
    );
    
    //lambda SAVE
    const saveInsurancedataLambda = new Function(stack, "PutInsuranceLambda", {
      runtime: Runtime.NODEJS_20_X, // Adjust runtime if necessary
      code: Code.fromAsset(handlerDir),
      handler: 'handler/FinancialCost/saveInsuranceIdHandler.handler',
      environment: {
        TABLE_NAME: saveAddress.tableName,
      },
    });

    saveInsurancedataLambda.grantPrincipal.addToPrincipalPolicy(
      new PolicyStatement({
        resources: ['*'],
        actions: ['dynamodb:PutItem', 'secretsmanager:GetSecretValue'],
      }),
    );
    getInsurancedataLambda.role?.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'));
    saveAddress.grantWriteData(saveInsurancedataLambda);

    const FinanceRestApi = new RestApi(this, "FinancialCost", {
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
    this.FinanceRestApi = FinanceRestApi;
    const requestValidator = new RequestValidator(this, 'financial-cost-request-validator', {
      restApi: this.FinanceRestApi,
      validateRequestBody: true,
      validateRequestParameters: true,
    });
    const financialCostModel = FinanceRestApi.addModel(
      'financial-cost-data-model',
      {
        schema: FinancialCostSchema, // change
        description: 'Request model for financialCost data ',
        modelName: 'FinancialCostcostSchemaInput',
        contentType: 'application/json',
      },
    );
    const InsuranceCostApi = FinanceRestApi.root.resourceForPath('insuranceId'); // here we can make more endpoint based on out future need
    // const RentCostApi = restApi.root.resourceForPath('Rent');
    // const UtilitiesCostApi = restApi.root.resourceForPath('Utilities');
    // const MaintenanceCostApi = restApi.root.resourceForPath('Maintenance');
    // const RepairsCosteApi = restApi.root.resourceForPath('Repairs');
    InsuranceCostApi.addMethod('GET', new LambdaIntegration(getInsurancedataLambda));
    InsuranceCostApi.addMethod('POST', new LambdaIntegration(saveInsurancedataLambda),{
      authorizationType: AuthorizationType.NONE,
      requestModels: {
        'application/json': financialCostModel,
      },
      requestValidator,
    }
  
  );
    // RentCostApi.addMethod('POST', new LambdaIntegration(saveEmployeedataLambda));
    // UtilitiesCostApi.addMethod('POST', new LambdaIntegration(saveEmployeedataLambda));
    // MaintenanceCostApi.addMethod('POST', new LambdaIntegration(saveEmployeedataLambda));
    // RepairsCosteApi.addMethod('POST', new LambdaIntegration(saveEmployeedataLambda));
    
    
    this.addApiKey(stackName, FinanceRestApi);
    this.addApiResponses(FinanceRestApi);

    FinanceRestApi.methods
      .filter(method => method.httpMethod === 'OPTIONS')
      .forEach(method => {
        const cfnMethod = method.node.defaultChild as CfnMethod;
        cfnMethod.apiKeyRequired = false;
      });
  };

  addApiKey(stackName: string, restApi: RestApi) {
    const secrateNameApi = `${stackName}/${this.FinanceRestApi}/api-key`
    // const secret = new Secret(this, 'FinancialCostApiSecret', {
    //   secretName: secrateNameApi,
    //   description: 'Financial Cost API Gateway API Key',
    //   generateSecretString: {
    //     generateStringKey: 'key',
    //     secretStringTemplate: JSON.stringify({}),
    //     excludeCharacters: ' %+~`#$&*()|[]{}:;<>?!\'/@"\\',
    //   },
    // });
    // this.restAPIKeyArn = secret.secretArn;
    //   new CfnOutput(this, 'financialAPIKeyArnAtSource', {
    //     value: this.restAPIKeyArn ?? '',
    //   });
      const plan = restApi.addUsagePlan('Financial-Cost-APi--usage-plan', {
        name: `${stackName}-FinanceRestApi-usage-plan`,
        apiStages: [{ stage: restApi.deploymentStage }],
      });
    const customResourceProvider = new CustomResourceProvider(this, 'FinancialCostApiResourceProvider', Stack.of(this), secrateNameApi);
    const customResource = new cdk.CustomResource(this, 'customResourceProviderForFinancialCostApi', {
      serviceToken: customResourceProvider.serviceToken,
      // properties: {
      //   SECRET_NAME: secret.secretName,
      // },
    });
      const apiKey = restApi.addApiKey('ApiKey', {
        apiKeyName: secrateNameApi,
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
