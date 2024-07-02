"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketingandSalesCostConstruct = void 0;
// import { CfnOutput } from 'aws-cdk-lib';
const constructs_1 = require("constructs");
const aws_dynamodb_1 = require("aws-cdk-lib/aws-dynamodb");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const cdk = require("aws-cdk-lib");
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
// import { CfnOutput, Stack } from 'aws-cdk-lib';
const aws_cdk_lib_1 = require("aws-cdk-lib");
const iam = require("aws-cdk-lib/aws-iam");
const api_common_response_1 = require("../modules/Common/api-common-response");
const path = require("path");
const AWS = require("aws-sdk");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
const marketingandSalesCostSchema_1 = require("../schema/marketingandSalesCostSchema");
// import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
const customeSecret_1 = require("./common/customeSecret");
class MarketingandSalesCostConstruct extends constructs_1.Construct {
    //private _apiKeyName: string | undefined;
    constructor(scope, id, stack) {
        super(scope, id);
        const stackName = aws_cdk_lib_1.Stack.of(this).stackName;
        AWS.config.update({ region: process.env.AWS_REGION });
        const saveAddress = new aws_dynamodb_1.Table(stack, "marketingandSalesCost", {
            partitionKey: { name: "MarketingInvoiceId", type: aws_dynamodb_1.AttributeType.STRING },
            tableName: "marketingandSalesDB",
        });
        saveAddress.addGlobalSecondaryIndex({
            indexName: 'MarketingInvoiceIdIndex',
            partitionKey: { name: 'MarketingInvoiceId', type: aws_dynamodb_1.AttributeType.STRING },
        });
        const handlerDir = path.resolve(__dirname, '../../lib');
        const getMarketingdataLambda = new aws_lambda_1.Function(stack, "GetMarketingDetialsLambda", {
            runtime: aws_lambda_1.Runtime.NODEJS_20_X,
            code: aws_lambda_1.Code.fromAsset(handlerDir),
            handler: 'handler/MarketingandSalesCost/getMarketingIdHandler.handler',
            environment: {
                TABLE_NAME: saveAddress.tableName,
            },
        });
        getMarketingdataLambda.grantPrincipal.addToPrincipalPolicy(new aws_iam_1.PolicyStatement({
            resources: ['*'],
            actions: ['dynamodb:getItem', 'secretsmanager:GetSecretValue'],
        }));
        const saveMarketingdataLambda = new aws_lambda_1.Function(stack, "SaveMarketingDetailsLambda", {
            runtime: aws_lambda_1.Runtime.NODEJS_20_X,
            code: aws_lambda_1.Code.fromAsset(handlerDir),
            handler: 'handler/MarketingandSalesCost/saveMarketingIdHandler.handler',
            environment: {
                TABLE_NAME: saveAddress.tableName,
            },
        });
        saveMarketingdataLambda.grantPrincipal.addToPrincipalPolicy(new aws_iam_1.PolicyStatement({
            resources: ['*'],
            actions: ['dynamodb:PutItem', 'secretsmanager:GetSecretValue'],
        }));
        getMarketingdataLambda.role?.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'));
        saveAddress.grantWriteData(saveMarketingdataLambda);
        const MarketingandSalesrestApi = new aws_apigateway_1.RestApi(this, "MarketingandSalesCost", {
            deployOptions: {
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
                allowHeaders: aws_apigateway_1.Cors.DEFAULT_HEADERS.concat(['x-api-key']),
            },
        });
        this.restApi = MarketingandSalesrestApi;
        const marketingCostIdCostApi = this.restApi.root.resourceForPath('marketingCost'); // here we can make many endpoints based on our future need
        const requestValidator = new aws_apigateway_1.RequestValidator(this, 'marketing-cost-request-validator', {
            restApi: this.restApi,
            validateRequestBody: true,
            validateRequestParameters: true,
        });
        const marketingCostCostModel = this.restApi.addModel('marketing-Cost-data-model', {
            schema: marketingandSalesCostSchema_1.default,
            description: 'Request model for marketingCost data ',
            modelName: 'marketingCostDataInputDB',
            contentType: 'application/json',
        });
        marketingCostIdCostApi.addMethod('GET', new aws_apigateway_1.LambdaIntegration(getMarketingdataLambda));
        marketingCostIdCostApi.addMethod('POST', new aws_apigateway_1.LambdaIntegration(saveMarketingdataLambda), {
            authorizationType: aws_apigateway_1.AuthorizationType.NONE,
            requestModels: {
                'application/json': marketingCostCostModel,
            },
            requestValidator,
        });
        this.addApiKey(stackName, this.restApi);
        this.addApiResponses(this.restApi);
        this.restApi.methods
            .filter(method => method.httpMethod === 'OPTIONS')
            .forEach(method => {
            const cfnMethod = method.node.defaultChild;
            cfnMethod.apiKeyRequired = false;
        });
    }
    ;
    addApiKey(stackName, restApi) {
        const secrateNameApi = `${stackName}/${restApi}/api-key`;
        // const secret = new Secret(this, 'ApiSecretMarketingCost', {
        //   secretName: secrateNameApi,
        //   description: 'Marketing Cost API Gateway API Key',
        //   generateSecretString: {
        //     generateStringKey: 'key',
        //     secretStringTemplate: JSON.stringify({}),
        //     excludeCharacters: ' %+~`#$&*()|[]{}:;<>?!\'/@"\\',
        //   },
        // });
        // this.restAPIKeyArn = secret.secretArn;
        //   new CfnOutput(this, 'marketingAPIKeyArnAtSource', {
        //     value: this.restAPIKeyArn ?? '',
        //   });
        const plan = restApi.addUsagePlan('marketing-cost-APi-address-usage-plan', {
            name: `${stackName}-api-usage-plan`,
            apiStages: [{ stage: restApi.deploymentStage }],
        });
        const customResourceProvider = new customeSecret_1.CustomResourceProvider(this, 'MarketingApiResourceProvider', aws_cdk_lib_1.Stack.of(this), secrateNameApi);
        const customResource = new cdk.CustomResource(this, 'marketingProviderForCustomerApi', {
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
    addApiResponses(restApi) {
        const commonResponse = new api_common_response_1.ApiCommonResponse();
        // ***************** Error 400
        restApi.addGatewayResponse('BAD_REQUEST_BODY', {
            type: aws_apigateway_1.ResponseType.BAD_REQUEST_BODY,
            responseHeaders: {
                'Access-Control-Allow-Origin': "'*'",
            },
            templates: {
                'application/json': commonResponse.setResponseWithOutReason(400, 'Bad Request', '$context.requestId').body,
            },
        });
        // *****************Error 403
        restApi.addGatewayResponse('WAF_FILTERED', {
            type: aws_apigateway_1.ResponseType.WAF_FILTERED,
            responseHeaders: {
                'Access-Control-Allow-Origin': "'*'",
            },
            templates: {
                'application/json': commonResponse.setResponseWithOutReason(403, 'Forbidden', '$context.requestId').body,
            },
        });
        restApi.addGatewayResponse('EXPIRED_TOKEN', {
            type: aws_apigateway_1.ResponseType.EXPIRED_TOKEN,
            responseHeaders: {
                'Access-Control-Allow-Origin': "'*'",
            },
            templates: {
                'application/json': commonResponse.setResponseWithOutReason(403, 'Forbidden', '$context.requestId').body,
            },
        });
        restApi.addGatewayResponse('INVALID_API_KEY', {
            type: aws_apigateway_1.ResponseType.INVALID_API_KEY,
            responseHeaders: {
                'Access-Control-Allow-Origin': "'*'",
            },
            templates: {
                'application/json': commonResponse.setResponseWithOutReason(403, 'Forbidden', '$context.requestId').body,
            },
        });
        restApi.addGatewayResponse('ACCESS_DENIED', {
            type: aws_apigateway_1.ResponseType.ACCESS_DENIED,
            responseHeaders: {
                'Access-Control-Allow-Origin': "'*'",
            },
            templates: {
                'application/json': commonResponse.setResponseWithOutReason(403, 'Forbidden', '$context.requestId').body,
            },
        });
        restApi.addGatewayResponse('INVALID_SIGNATURE', {
            type: aws_apigateway_1.ResponseType.INVALID_SIGNATURE,
            responseHeaders: {
                'Access-Control-Allow-Origin': "'*'",
            },
            templates: {
                'application/json': commonResponse.setResponseWithOutReason(403, 'Forbidden', '$context.requestId').body,
            },
        });
        restApi.addGatewayResponse('MISSING_AUTHENTICATION_TOKEN', {
            type: aws_apigateway_1.ResponseType.MISSING_AUTHENTICATION_TOKEN,
            responseHeaders: {
                'Access-Control-Allow-Origin': "'*'",
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
            type: aws_apigateway_1.ResponseType.DEFAULT_5XX,
            responseHeaders: {
                'Access-Control-Allow-Origin': "'*'",
            },
            templates: {
                'application/json': commonResponse.setResponseWithOutReason(500, 'Internal Server Error', '$context.requestId').body,
            },
        });
        // ***************** Error 401
        restApi.addGatewayResponse('UNAUTHORIZED', {
            type: aws_apigateway_1.ResponseType.UNAUTHORIZED,
            responseHeaders: {
                'Access-Control-Allow-Origin': "'*'", // Corrected syntax
            },
            templates: {
                'application/json': commonResponse.setResponseWithOutReason(401, 'Unauthorized', '$context.requestId').body,
            },
        });
        // ***************** Error for 429
        restApi.addGatewayResponse('QUOTA_EXCEEDED', {
            type: aws_apigateway_1.ResponseType.QUOTA_EXCEEDED,
            responseHeaders: {
                'Access-Control-Allow-Origin': "'*'",
            },
            templates: {
                'application/json': commonResponse.setResponseWithOutReason(429, 'Limit Exceeded', '$context.requestId').body,
            },
        });
        restApi.addGatewayResponse('THROTTLED', {
            type: aws_apigateway_1.ResponseType.THROTTLED,
            responseHeaders: {
                'Access-Control-Allow-Origin': "'*'",
            },
            templates: {
                'application/json': commonResponse.setResponseWithOutReason(429, 'Limit Exceeded', '$context.requestId').body,
            },
        });
    }
}
exports.MarketingandSalesCostConstruct = MarketingandSalesCostConstruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdC1hcGktbWFya2V0aW5nYW5kc2FsZXNjb3N0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnN0cnVjdC9yZXN0LWFwaS1tYXJrZXRpbmdhbmRzYWxlc2Nvc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQTJDO0FBQzNDLDJDQUF1QztBQUN2QywyREFBZ0U7QUFDaEUsdURBQWlFO0FBQ2pFLG1DQUFtQztBQUNuQywrREFBNEk7QUFDNUksa0RBQWtEO0FBQ2xELDZDQUFvQztBQUNwQywyQ0FBMkM7QUFDM0MsK0VBQTBFO0FBQzFFLDZCQUE4QjtBQUM5QiwrQkFBK0I7QUFDL0IsaURBQXNEO0FBQ3RELHVGQUErRTtBQUMvRSwyREFBMkQ7QUFDM0QsMERBQWdFO0FBR2hFLE1BQWEsOEJBQStCLFNBQVEsc0JBQVM7SUFHM0QsMENBQTBDO0lBQzFDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBYTtRQUNyRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pCLE1BQU0sU0FBUyxHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUUzQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFFdEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxvQkFBSyxDQUFDLEtBQUssRUFBRSx1QkFBdUIsRUFBRTtZQUM1RCxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLDRCQUFhLENBQUMsTUFBTSxFQUFFO1lBQ3hFLFNBQVMsRUFBRSxxQkFBcUI7U0FDakMsQ0FBQyxDQUFDO1FBQ0gsV0FBVyxDQUFDLHVCQUF1QixDQUFDO1lBQ2xDLFNBQVMsRUFBRSx5QkFBeUI7WUFDcEMsWUFBWSxFQUFFLEVBQUUsSUFBSSxF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LENBQUMsa0JBQWtCLENBQUMsY0FBYyxFQUFFO1lBQzFDLElBQUksRUFBRSw2QkFBWSxDQUFDLFlBQVk7WUFDL0IsZUFBZSxFQUFFO2dCQUNiLDZCQUE2QixFQUFFLEtBQUssRUFBRSxtQkFBbUI7YUFDNUQ7WUFDRCxTQUFTLEVBQUU7Z0JBQ1Asa0JBQWtCLEVBQUUsY0FBYyxDQUFDLHdCQUF3QixDQUFDLEdBQUcsRUFBRSxjQUFjLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyxJQUFJO2FBQzlHO1NBQ0osQ0FBQyxDQUFDO1FBRUMsa0NBQWtDO1FBQ2xDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsRUFBRTtZQUMzQyxJQUFJLEVBQUUsNkJBQVksQ0FBQyxjQUFjO1lBQ2pDLGVBQWUsRUFBRTtnQkFDZiw2QkFBNkIsRUFBRSxLQUFLO2FBQ3JDO1lBQ0QsU0FBUyxFQUFFO2dCQUNULGtCQUFrQixFQUFFLGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyxJQUFJO2FBQzlHO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRTtZQUN0QyxJQUFJLEVBQUUsNkJBQVksQ0FBQyxTQUFTO1lBQzVCLGVBQWUsRUFBRTtnQkFDZiw2QkFBNkIsRUFBRSxLQUFLO2FBQ3JDO1lBQ0QsU0FBUyxFQUFFO2dCQUNULGtCQUFrQixFQUFFLGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyxJQUFJO2FBQzlHO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBalFELHdFQWlRQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IENmbk91dHB1dCB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0IHsgQXR0cmlidXRlVHlwZSwgVGFibGUgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZHluYW1vZGInO1xuaW1wb3J0IHsgUnVudGltZSwgQ29kZSwgRnVuY3Rpb24gfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhJztcbmltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBSZXN0QXBpLCBMYW1iZGFJbnRlZ3JhdGlvbiwgUmVzcG9uc2VUeXBlLCBDZm5NZXRob2QsIENvcnMsIFJlcXVlc3RWYWxpZGF0b3IsIEF1dGhvcml6YXRpb25UeXBlIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5XCI7XG4vLyBpbXBvcnQgeyBDZm5PdXRwdXQsIFN0YWNrIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgU3RhY2sgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBpYW0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XG5pbXBvcnQgeyBBcGlDb21tb25SZXNwb25zZSB9IGZyb20gJy4uL21vZHVsZXMvQ29tbW9uL2FwaS1jb21tb24tcmVzcG9uc2UnO1xuaW1wb3J0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5pbXBvcnQgKiBhcyBBV1MgZnJvbSAnYXdzLXNkayc7XG5pbXBvcnQgeyBQb2xpY3lTdGF0ZW1lbnQgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtaWFtJztcbmltcG9ydCBNYXJrZXRpbmdhbmRTYWxlc0Nvc3RTY2hlbWEgZnJvbSAnLi4vc2NoZW1hL21hcmtldGluZ2FuZFNhbGVzQ29zdFNjaGVtYSdcbi8vIGltcG9ydCB7IFNlY3JldCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1zZWNyZXRzbWFuYWdlcic7XG5pbXBvcnQgeyBDdXN0b21SZXNvdXJjZVByb3ZpZGVyIH0gZnJvbSAnLi9jb21tb24vY3VzdG9tZVNlY3JldCc7XG5cblxuZXhwb3J0IGNsYXNzIE1hcmtldGluZ2FuZFNhbGVzQ29zdENvbnN0cnVjdCBleHRlbmRzIENvbnN0cnVjdCB7XG4gIHB1YmxpYyByZXN0QXBpOiBSZXN0QXBpO1xuICBwdWJsaWMgcmVzdEFQSUtleUFybjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAvL3ByaXZhdGUgX2FwaUtleU5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgc3RhY2sgOiBTdGFjaykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG4gICAgY29uc3Qgc3RhY2tOYW1lID0gU3RhY2sub2YodGhpcykuc3RhY2tOYW1lO1xuXG4gICAgQVdTLmNvbmZpZy51cGRhdGUoeyByZWdpb246IHByb2Nlc3MuZW52LkFXU19SRUdJT04gfSk7XG5cbiAgICBjb25zdCBzYXZlQWRkcmVzcyA9IG5ldyBUYWJsZShzdGFjaywgXCJtYXJrZXRpbmdhbmRTYWxlc0Nvc3RcIiwge1xuICAgICAgcGFydGl0aW9uS2V5OiB7IG5hbWU6IFwiTWFya2V0aW5nSW52b2ljZUlkXCIsIHR5cGU6IEF0dHJpYnV0ZVR5cGUuU1RSSU5HIH0sXG4gICAgICB0YWJsZU5hbWU6IFwibWFya2V0aW5nYW5kU2FsZXNEQlwiLFxuICAgIH0pO1xuICAgIHNhdmVBZGRyZXNzLmFkZEdsb2JhbFNlY29uZGFyeUluZGV4KHtcbiAgICAgIGluZGV4TmFtZTogJ01hcmtldGluZ0ludm9pY2VJZEluZGV4JyxcbiAgICAgIHBhcnRpdGlvbktleTogeyBuYW1lOiAnTWFya2V0aW5nSW52b2ljZUlkJywgdHlwZTogQXR0cmlidXRlVHlwZS5TVFJJTkcgfSxcbiAgICB9KTtcbiAgICBjb25zdCBoYW5kbGVyRGlyID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL2xpYicpO1xuICAgIGNvbnN0IGdldE1hcmtldGluZ2RhdGFMYW1iZGEgPSBuZXcgRnVuY3Rpb24oc3RhY2ssIFwiR2V0TWFya2V0aW5nRGV0aWFsc0xhbWJkYVwiLCB7XG4gICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18yMF9YLFxuICAgICAgY29kZTogQ29kZS5mcm9tQXNzZXQoaGFuZGxlckRpciksIFxuICAgICAgaGFuZGxlcjogJ2hhbmRsZXIvTWFya2V0aW5nYW5kU2FsZXNDb3N0L2dldE1hcmtldGluZ0lkSGFuZGxlci5oYW5kbGVyJyxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIFRBQkxFX05BTUU6IHNhdmVBZGRyZXNzLnRhYmxlTmFtZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgZ2V0TWFya2V0aW5nZGF0YUxhbWJkYS5ncmFudFByaW5jaXBhbC5hZGRUb1ByaW5jaXBhbFBvbGljeShcbiAgICAgIG5ldyBQb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICByZXNvdXJjZXM6IFsnKiddLFxuICAgICAgICBhY3Rpb25zOiBbJ2R5bmFtb2RiOmdldEl0ZW0nLCAnc2VjcmV0c21hbmFnZXI6R2V0U2VjcmV0VmFsdWUnXSxcbiAgICAgIH0pLFxuICAgICk7XG4gICAgXG5cbiAgICBjb25zdCBzYXZlTWFya2V0aW5nZGF0YUxhbWJkYSA9IG5ldyBGdW5jdGlvbihzdGFjaywgXCJTYXZlTWFya2V0aW5nRGV0YWlsc0xhbWJkYVwiLCB7XG4gICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18yMF9YLCAvLyBBZGp1c3QgcnVudGltZSBpZiBuZWNlc3NhcnlcbiAgICAgIGNvZGU6IENvZGUuZnJvbUFzc2V0KGhhbmRsZXJEaXIpLFxuICAgICAgaGFuZGxlcjogJ2hhbmRsZXIvTWFya2V0aW5nYW5kU2FsZXNDb3N0L3NhdmVNYXJrZXRpbmdJZEhhbmRsZXIuaGFuZGxlcicsXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBUQUJMRV9OQU1FOiBzYXZlQWRkcmVzcy50YWJsZU5hbWUsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgc2F2ZU1hcmtldGluZ2RhdGFMYW1iZGEuZ3JhbnRQcmluY2lwYWwuYWRkVG9QcmluY2lwYWxQb2xpY3koXG4gICAgICBuZXcgUG9saWN5U3RhdGVtZW50KHtcbiAgICAgICAgcmVzb3VyY2VzOiBbJyonXSxcbiAgICAgICAgYWN0aW9uczogWydkeW5hbW9kYjpQdXRJdGVtJywgJ3NlY3JldHNtYW5hZ2VyOkdldFNlY3JldFZhbHVlJ10sXG4gICAgICB9KSxcbiAgICApO1xuICAgIGdldE1hcmtldGluZ2RhdGFMYW1iZGEucm9sZT8uYWRkTWFuYWdlZFBvbGljeShpYW0uTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoJ0FtYXpvbkR5bmFtb0RCRnVsbEFjY2VzcycpKTtcbiAgICBzYXZlQWRkcmVzcy5ncmFudFdyaXRlRGF0YShzYXZlTWFya2V0aW5nZGF0YUxhbWJkYSk7XG5cbiAgICBjb25zdCBNYXJrZXRpbmdhbmRTYWxlc3Jlc3RBcGkgPSBuZXcgUmVzdEFwaSh0aGlzLCBcIk1hcmtldGluZ2FuZFNhbGVzQ29zdFwiLCB7XG4gICAgICBkZXBsb3lPcHRpb25zOntcbiAgICAgICAgICBkYXRhVHJhY2VFbmFibGVkOiB0cnVlLFxuICAgICAgICAgIHRyYWNpbmdFbmFibGVkOiB0cnVlLFxuICAgICAgICAgIHN0YWdlTmFtZTogJ3YxJyxcbiAgICAgICAgICAvLyBsb2dnaW5nTGV2ZWw6IE1ldGhvZExvZ2dpbmdMZXZlbC5JTkZPLFxuICAgICAgfSxcbiAgICBkZWZhdWx0TWV0aG9kT3B0aW9uczoge1xuICAgICAgYXBpS2V5UmVxdWlyZWQ6IHRydWUsXG4gICAgfSxcbiAgICBkZWZhdWx0Q29yc1ByZWZsaWdodE9wdGlvbnM6IHtcbiAgICAgIGFsbG93T3JpZ2luczogW1xuICAgICAgICAnKicsXG4gICAgICAgIC8vIHN1cHBvcnQgbG9jYWxob3N0IGFzIGFuIG9yaWdpbiBvbmx5IGluIG5vbi1wcm9kIGVudmlyb25tZW50c1xuICAgICAgXSxcbiAgICAgIGFsbG93SGVhZGVyczogQ29ycy5ERUZBVUxUX0hFQURFUlMuY29uY2F0KFsneC1hcGkta2V5J10pLFxuICAgIH0sXG4gIH0pO1xuICBcbiAgICB0aGlzLnJlc3RBcGkgPSBNYXJrZXRpbmdhbmRTYWxlc3Jlc3RBcGk7XG4gICAgY29uc3QgbWFya2V0aW5nQ29zdElkQ29zdEFwaSA9IHRoaXMucmVzdEFwaS5yb290LnJlc291cmNlRm9yUGF0aCgnbWFya2V0aW5nQ29zdCcpOyAvLyBoZXJlIHdlIGNhbiBtYWtlIG1hbnkgZW5kcG9pbnRzIGJhc2VkIG9uIG91ciBmdXR1cmUgbmVlZFxuICAgIFxuICAgIGNvbnN0IHJlcXVlc3RWYWxpZGF0b3IgPSBuZXcgUmVxdWVzdFZhbGlkYXRvcih0aGlzLCAnbWFya2V0aW5nLWNvc3QtcmVxdWVzdC12YWxpZGF0b3InLCB7XG4gICAgICByZXN0QXBpOiB0aGlzLnJlc3RBcGksXG4gICAgICB2YWxpZGF0ZVJlcXVlc3RCb2R5OiB0cnVlLFxuICAgICAgdmFsaWRhdGVSZXF1ZXN0UGFyYW1ldGVyczogdHJ1ZSxcbiAgICB9KTtcblxuICAgIGNvbnN0IG1hcmtldGluZ0Nvc3RDb3N0TW9kZWwgPSB0aGlzLnJlc3RBcGkuYWRkTW9kZWwoXG4gICAgICAnbWFya2V0aW5nLUNvc3QtZGF0YS1tb2RlbCcsXG4gICAgICB7XG4gICAgICAgIHNjaGVtYTogTWFya2V0aW5nYW5kU2FsZXNDb3N0U2NoZW1hLCAvLyBjaGFuZ2VcbiAgICAgICAgZGVzY3JpcHRpb246ICdSZXF1ZXN0IG1vZGVsIGZvciBtYXJrZXRpbmdDb3N0IGRhdGEgJyxcbiAgICAgICAgbW9kZWxOYW1lOiAnbWFya2V0aW5nQ29zdERhdGFJbnB1dERCJyxcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIH0sXG4gICAgKTtcbiAgICBcbiAgICBtYXJrZXRpbmdDb3N0SWRDb3N0QXBpLmFkZE1ldGhvZCgnR0VUJywgbmV3IExhbWJkYUludGVncmF0aW9uKGdldE1hcmtldGluZ2RhdGFMYW1iZGEpKTtcbiAgICBtYXJrZXRpbmdDb3N0SWRDb3N0QXBpLmFkZE1ldGhvZCgnUE9TVCcsIG5ldyBMYW1iZGFJbnRlZ3JhdGlvbihzYXZlTWFya2V0aW5nZGF0YUxhbWJkYSkse1xuICAgICAgYXV0aG9yaXphdGlvblR5cGU6IEF1dGhvcml6YXRpb25UeXBlLk5PTkUsXG4gICAgICByZXF1ZXN0TW9kZWxzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogbWFya2V0aW5nQ29zdENvc3RNb2RlbCxcbiAgICAgIH0sXG4gICAgICByZXF1ZXN0VmFsaWRhdG9yLFxuICAgIH0pO1xuICAgIFxuICAgIHRoaXMuYWRkQXBpS2V5KHN0YWNrTmFtZSwgdGhpcy5yZXN0QXBpKTtcbiAgICB0aGlzLmFkZEFwaVJlc3BvbnNlcyh0aGlzLnJlc3RBcGkpO1xuXG4gICAgdGhpcy5yZXN0QXBpLm1ldGhvZHNcbiAgICAgIC5maWx0ZXIobWV0aG9kID0+IG1ldGhvZC5odHRwTWV0aG9kID09PSAnT1BUSU9OUycpXG4gICAgICAuZm9yRWFjaChtZXRob2QgPT4ge1xuICAgICAgICBjb25zdCBjZm5NZXRob2QgPSBtZXRob2Qubm9kZS5kZWZhdWx0Q2hpbGQgYXMgQ2ZuTWV0aG9kO1xuICAgICAgICBjZm5NZXRob2QuYXBpS2V5UmVxdWlyZWQgPSBmYWxzZTtcbiAgICAgIH0pO1xuICB9O1xuXG4gIGFkZEFwaUtleShzdGFja05hbWU6IHN0cmluZywgcmVzdEFwaTogUmVzdEFwaSkge1xuICAgIGNvbnN0IHNlY3JhdGVOYW1lQXBpID0gYCR7c3RhY2tOYW1lfS8ke3Jlc3RBcGl9L2FwaS1rZXlgXG4gICAgLy8gY29uc3Qgc2VjcmV0ID0gbmV3IFNlY3JldCh0aGlzLCAnQXBpU2VjcmV0TWFya2V0aW5nQ29zdCcsIHtcbiAgICAvLyAgIHNlY3JldE5hbWU6IHNlY3JhdGVOYW1lQXBpLFxuICAgIC8vICAgZGVzY3JpcHRpb246ICdNYXJrZXRpbmcgQ29zdCBBUEkgR2F0ZXdheSBBUEkgS2V5JyxcbiAgICAvLyAgIGdlbmVyYXRlU2VjcmV0U3RyaW5nOiB7XG4gICAgLy8gICAgIGdlbmVyYXRlU3RyaW5nS2V5OiAna2V5JyxcbiAgICAvLyAgICAgc2VjcmV0U3RyaW5nVGVtcGxhdGU6IEpTT04uc3RyaW5naWZ5KHt9KSxcbiAgICAvLyAgICAgZXhjbHVkZUNoYXJhY3RlcnM6ICcgJSt+YCMkJiooKXxbXXt9Ojs8Pj8hXFwnL0BcIlxcXFwnLFxuICAgIC8vICAgfSxcbiAgICAvLyB9KTtcbiAgICAvLyB0aGlzLnJlc3RBUElLZXlBcm4gPSBzZWNyZXQuc2VjcmV0QXJuO1xuICAgIC8vICAgbmV3IENmbk91dHB1dCh0aGlzLCAnbWFya2V0aW5nQVBJS2V5QXJuQXRTb3VyY2UnLCB7XG4gICAgLy8gICAgIHZhbHVlOiB0aGlzLnJlc3RBUElLZXlBcm4gPz8gJycsXG4gICAgLy8gICB9KTtcbiAgICAgIGNvbnN0IHBsYW4gPSByZXN0QXBpLmFkZFVzYWdlUGxhbignbWFya2V0aW5nLWNvc3QtQVBpLWFkZHJlc3MtdXNhZ2UtcGxhbicsIHtcbiAgICAgICAgbmFtZTogYCR7c3RhY2tOYW1lfS1hcGktdXNhZ2UtcGxhbmAsXG4gICAgICAgIGFwaVN0YWdlczogW3sgc3RhZ2U6IHJlc3RBcGkuZGVwbG95bWVudFN0YWdlIH1dLFxuICAgICAgfSk7XG4gICAgY29uc3QgY3VzdG9tUmVzb3VyY2VQcm92aWRlciA9IG5ldyBDdXN0b21SZXNvdXJjZVByb3ZpZGVyKHRoaXMsICdNYXJrZXRpbmdBcGlSZXNvdXJjZVByb3ZpZGVyJywgU3RhY2sub2YodGhpcyksIHNlY3JhdGVOYW1lQXBpKTtcbiAgICBjb25zdCBjdXN0b21SZXNvdXJjZSA9IG5ldyBjZGsuQ3VzdG9tUmVzb3VyY2UodGhpcywgJ21hcmtldGluZ1Byb3ZpZGVyRm9yQ3VzdG9tZXJBcGknLCB7XG4gICAgICBzZXJ2aWNlVG9rZW46IGN1c3RvbVJlc291cmNlUHJvdmlkZXIuc2VydmljZVRva2VuLFxuICAgICAgLy8gcHJvcGVydGllczoge1xuICAgICAgLy8gICBTRUNSRVRfTkFNRTogc2VjcmV0LnNlY3JldE5hbWUsXG4gICAgICAvLyB9LFxuICAgIH0pO1xuICAgICAgY29uc3QgYXBpS2V5ID0gcmVzdEFwaS5hZGRBcGlLZXkoJ0FwaUtleScsIHtcbiAgICAgICAgYXBpS2V5TmFtZTogc2VjcmF0ZU5hbWVBcGksXG4gICAgICAgIHZhbHVlOiBjdXN0b21SZXNvdXJjZS5nZXRBdHRTdHJpbmcoJ1NlY3JldFZhbHVlJyksXG4gICAgICB9KTtcbiAgICAgIHBsYW4uYWRkQXBpS2V5KGFwaUtleSk7XG4gICAgfVxuXG4gIGFkZEFwaVJlc3BvbnNlcyhyZXN0QXBpOiBSZXN0QXBpKSB7XG4gICAgY29uc3QgY29tbW9uUmVzcG9uc2UgPSBuZXcgQXBpQ29tbW9uUmVzcG9uc2UoKTtcbiAgICAvLyAqKioqKioqKioqKioqKioqKiBFcnJvciA0MDBcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnQkFEX1JFUVVFU1RfQk9EWScsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5CQURfUkVRVUVTVF9CT0RZLFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDAsICdCYWQgUmVxdWVzdCcsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICAvLyAqKioqKioqKioqKioqKioqKkVycm9yIDQwM1xuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdXQUZfRklMVEVSRUQnLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuV0FGX0ZJTFRFUkVELFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMywgJ0ZvcmJpZGRlbicsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnRVhQSVJFRF9UT0tFTicsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5FWFBJUkVEX1RPS0VOLFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDMsICdGb3JiaWRkZW4nLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ0lOVkFMSURfQVBJX0tFWScsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5JTlZBTElEX0FQSV9LRVksXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMywgJ0ZvcmJpZGRlbicsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnQUNDRVNTX0RFTklFRCcsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5BQ0NFU1NfREVOSUVELFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDMsICdGb3JiaWRkZW4nLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ0lOVkFMSURfU0lHTkFUVVJFJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLklOVkFMSURfU0lHTkFUVVJFLFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDMsICdGb3JiaWRkZW4nLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ01JU1NJTkdfQVVUSEVOVElDQVRJT05fVE9LRU4nLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuTUlTU0lOR19BVVRIRU5USUNBVElPTl9UT0tFTixcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLCAvLyBDb3JyZWN0ZWQgc3ludGF4XG4gICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnOiBcIidPUFRJT05TLCBHRVQnXCIsXG4gICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnOiBcIidDb250ZW50LVR5cGUsIEF1dGhvcml6YXRpb24nXCIsXG4gICAgICAgICAgJ1ZhcnknOiBcIidPcmlnaW4nXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDAzLCAnRm9yYmlkZGVuJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICB9KTtcbiAgXG4gICAgLy8gKioqKioqKioqKioqKioqKipFcnJvciA1eHhcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnREVGQVVMVF81WFgnLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuREVGQVVMVF81WFgsXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDUwMCwgJ0ludGVybmFsIFNlcnZlciBFcnJvcicsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICAvLyAqKioqKioqKioqKioqKioqKiBFcnJvciA0MDFcbiAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdVTkFVVEhPUklaRUQnLCB7XG4gICAgdHlwZTogUmVzcG9uc2VUeXBlLlVOQVVUSE9SSVpFRCxcbiAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsIC8vIENvcnJlY3RlZCBzeW50YXhcbiAgICB9LFxuICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDEsICdVbmF1dGhvcml6ZWQnLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICB9LFxufSk7XG5cbiAgICAvLyAqKioqKioqKioqKioqKioqKiBFcnJvciBmb3IgNDI5XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ1FVT1RBX0VYQ0VFREVEJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLlFVT1RBX0VYQ0VFREVELFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MjksICdMaW1pdCBFeGNlZWRlZCcsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnVEhST1RUTEVEJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLlRIUk9UVExFRCxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDI5LCAnTGltaXQgRXhjZWVkZWQnLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==