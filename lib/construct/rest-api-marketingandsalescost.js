"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketingandSalesCost = void 0;
// import { CfnOutput } from 'aws-cdk-lib';
const constructs_1 = require("constructs");
const aws_dynamodb_1 = require("aws-cdk-lib/aws-dynamodb");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const cdk = require("aws-cdk-lib");
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const iam = require("aws-cdk-lib/aws-iam");
const api_common_response_1 = require("../modules/Common/api-common-response");
const path = require("path");
const AWS = require("aws-sdk");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
const marketingandSalesCostSchema_1 = require("../schema/marketingandSalesCostSchema");
const aws_secretsmanager_1 = require("aws-cdk-lib/aws-secretsmanager");
const customeSecret_1 = require("./common/customeSecret");
class MarketingandSalesCost extends constructs_1.Construct {
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
        const secret = new aws_secretsmanager_1.Secret(this, 'ApiSecretMarketingCost', {
            secretName: secrateNameApi,
            description: 'Marketing Cost API Gateway API Key',
            generateSecretString: {
                generateStringKey: 'key',
                secretStringTemplate: JSON.stringify({}),
                excludeCharacters: ' %+~`#$&*()|[]{}:;<>?!\'/@"\\',
            },
        });
        this.restAPIKeyArn = secret.secretArn;
        new aws_cdk_lib_1.CfnOutput(this, 'marketingAPIKeyArnAtSource', {
            value: this.restAPIKeyArn ?? '',
        });
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
exports.MarketingandSalesCost = MarketingandSalesCost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdC1hcGktbWFya2V0aW5nYW5kc2FsZXNjb3N0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnN0cnVjdC9yZXN0LWFwaS1tYXJrZXRpbmdhbmRzYWxlc2Nvc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQTJDO0FBQzNDLDJDQUF1QztBQUN2QywyREFBZ0U7QUFDaEUsdURBQWlFO0FBQ2pFLG1DQUFtQztBQUNuQywrREFBNEk7QUFDNUksNkNBQStDO0FBQy9DLDJDQUEyQztBQUMzQywrRUFBMEU7QUFDMUUsNkJBQThCO0FBQzlCLCtCQUErQjtBQUMvQixpREFBc0Q7QUFDdEQsdUZBQStFO0FBQy9FLHVFQUF3RDtBQUN4RCwwREFBZ0U7QUFHaEUsTUFBYSxxQkFBc0IsU0FBUSxzQkFBUztJQUdsRCwwQ0FBMEM7SUFDMUMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFhO1FBQ3JELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakIsTUFBTSxTQUFTLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDO1FBRTNDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUV0RCxNQUFNLFdBQVcsR0FBRyxJQUFJLG9CQUFLLENBQUMsS0FBSyxFQUFFLHVCQUF1QixFQUFFO1lBQzVELFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsNEJBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDeEUsU0FBUyxFQUFFLHFCQUFxQjtTQUNqQyxDQUFDLENBQUM7UUFDSCxXQUFXLENBQUMsdUJBQXVCLENBQUM7WUFDbEMsU0FBUyxFQUFFLHlCQUF5QjtZQUNwQyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVB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Q0FBQyxJQUFJO2FBQzlHO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBalFELHNEQWlRQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IENmbk91dHB1dCB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0IHsgQXR0cmlidXRlVHlwZSwgVGFibGUgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZHluYW1vZGInO1xuaW1wb3J0IHsgUnVudGltZSwgQ29kZSwgRnVuY3Rpb24gfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhJztcbmltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBSZXN0QXBpLCBMYW1iZGFJbnRlZ3JhdGlvbiwgUmVzcG9uc2VUeXBlLCBDZm5NZXRob2QsIENvcnMsIFJlcXVlc3RWYWxpZGF0b3IsIEF1dGhvcml6YXRpb25UeXBlIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5XCI7XG5pbXBvcnQgeyBDZm5PdXRwdXQsIFN0YWNrIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgaWFtIGZyb20gJ2F3cy1jZGstbGliL2F3cy1pYW0nO1xuaW1wb3J0IHsgQXBpQ29tbW9uUmVzcG9uc2UgfSBmcm9tICcuLi9tb2R1bGVzL0NvbW1vbi9hcGktY29tbW9uLXJlc3BvbnNlJztcbmltcG9ydCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuaW1wb3J0ICogYXMgQVdTIGZyb20gJ2F3cy1zZGsnO1xuaW1wb3J0IHsgUG9saWN5U3RhdGVtZW50IH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XG5pbXBvcnQgTWFya2V0aW5nYW5kU2FsZXNDb3N0U2NoZW1hIGZyb20gJy4uL3NjaGVtYS9tYXJrZXRpbmdhbmRTYWxlc0Nvc3RTY2hlbWEnXG5pbXBvcnQgeyBTZWNyZXQgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtc2VjcmV0c21hbmFnZXInO1xuaW1wb3J0IHsgQ3VzdG9tUmVzb3VyY2VQcm92aWRlciB9IGZyb20gJy4vY29tbW9uL2N1c3RvbWVTZWNyZXQnO1xuXG5cbmV4cG9ydCBjbGFzcyBNYXJrZXRpbmdhbmRTYWxlc0Nvc3QgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICBwdWJsaWMgcmVzdEFwaTogUmVzdEFwaTtcbiAgcHVibGljIHJlc3RBUElLZXlBcm46IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgLy9wcml2YXRlIF9hcGlLZXlOYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHN0YWNrIDogU3RhY2spIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuICAgIGNvbnN0IHN0YWNrTmFtZSA9IFN0YWNrLm9mKHRoaXMpLnN0YWNrTmFtZTtcblxuICAgIEFXUy5jb25maWcudXBkYXRlKHsgcmVnaW9uOiBwcm9jZXNzLmVudi5BV1NfUkVHSU9OIH0pO1xuXG4gICAgY29uc3Qgc2F2ZUFkZHJlc3MgPSBuZXcgVGFibGUoc3RhY2ssIFwibWFya2V0aW5nYW5kU2FsZXNDb3N0XCIsIHtcbiAgICAgIHBhcnRpdGlvbktleTogeyBuYW1lOiBcIk1hcmtldGluZ0ludm9pY2VJZFwiLCB0eXBlOiBBdHRyaWJ1dGVUeXBlLlNUUklORyB9LFxuICAgICAgdGFibGVOYW1lOiBcIm1hcmtldGluZ2FuZFNhbGVzREJcIixcbiAgICB9KTtcbiAgICBzYXZlQWRkcmVzcy5hZGRHbG9iYWxTZWNvbmRhcnlJbmRleCh7XG4gICAgICBpbmRleE5hbWU6ICdNYXJrZXRpbmdJbnZvaWNlSWRJbmRleCcsXG4gICAgICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogJ01hcmtldGluZ0ludm9pY2VJZCcsIHR5cGU6IEF0dHJpYnV0ZVR5cGUuU1RSSU5HIH0sXG4gICAgfSk7XG4gICAgY29uc3QgaGFuZGxlckRpciA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi9saWInKTtcbiAgICBjb25zdCBnZXRNYXJrZXRpbmdkYXRhTGFtYmRhID0gbmV3IEZ1bmN0aW9uKHN0YWNrLCBcIkdldE1hcmtldGluZ0RldGlhbHNMYW1iZGFcIiwge1xuICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMjBfWCxcbiAgICAgIGNvZGU6IENvZGUuZnJvbUFzc2V0KGhhbmRsZXJEaXIpLCBcbiAgICAgIGhhbmRsZXI6ICdoYW5kbGVyL01hcmtldGluZ2FuZFNhbGVzQ29zdC9nZXRNYXJrZXRpbmdJZEhhbmRsZXIuaGFuZGxlcicsXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBUQUJMRV9OQU1FOiBzYXZlQWRkcmVzcy50YWJsZU5hbWUsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGdldE1hcmtldGluZ2RhdGFMYW1iZGEuZ3JhbnRQcmluY2lwYWwuYWRkVG9QcmluY2lwYWxQb2xpY3koXG4gICAgICBuZXcgUG9saWN5U3RhdGVtZW50KHtcbiAgICAgICAgcmVzb3VyY2VzOiBbJyonXSxcbiAgICAgICAgYWN0aW9uczogWydkeW5hbW9kYjpnZXRJdGVtJywgJ3NlY3JldHNtYW5hZ2VyOkdldFNlY3JldFZhbHVlJ10sXG4gICAgICB9KSxcbiAgICApO1xuICAgIFxuXG4gICAgY29uc3Qgc2F2ZU1hcmtldGluZ2RhdGFMYW1iZGEgPSBuZXcgRnVuY3Rpb24oc3RhY2ssIFwiU2F2ZU1hcmtldGluZ0RldGFpbHNMYW1iZGFcIiwge1xuICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMjBfWCwgLy8gQWRqdXN0IHJ1bnRpbWUgaWYgbmVjZXNzYXJ5XG4gICAgICBjb2RlOiBDb2RlLmZyb21Bc3NldChoYW5kbGVyRGlyKSxcbiAgICAgIGhhbmRsZXI6ICdoYW5kbGVyL01hcmtldGluZ2FuZFNhbGVzQ29zdC9zYXZlTWFya2V0aW5nSWRIYW5kbGVyLmhhbmRsZXInLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgVEFCTEVfTkFNRTogc2F2ZUFkZHJlc3MudGFibGVOYW1lLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHNhdmVNYXJrZXRpbmdkYXRhTGFtYmRhLmdyYW50UHJpbmNpcGFsLmFkZFRvUHJpbmNpcGFsUG9saWN5KFxuICAgICAgbmV3IFBvbGljeVN0YXRlbWVudCh7XG4gICAgICAgIHJlc291cmNlczogWycqJ10sXG4gICAgICAgIGFjdGlvbnM6IFsnZHluYW1vZGI6UHV0SXRlbScsICdzZWNyZXRzbWFuYWdlcjpHZXRTZWNyZXRWYWx1ZSddLFxuICAgICAgfSksXG4gICAgKTtcbiAgICBnZXRNYXJrZXRpbmdkYXRhTGFtYmRhLnJvbGU/LmFkZE1hbmFnZWRQb2xpY3koaWFtLk1hbmFnZWRQb2xpY3kuZnJvbUF3c01hbmFnZWRQb2xpY3lOYW1lKCdBbWF6b25EeW5hbW9EQkZ1bGxBY2Nlc3MnKSk7XG4gICAgc2F2ZUFkZHJlc3MuZ3JhbnRXcml0ZURhdGEoc2F2ZU1hcmtldGluZ2RhdGFMYW1iZGEpO1xuXG4gICAgY29uc3QgTWFya2V0aW5nYW5kU2FsZXNyZXN0QXBpID0gbmV3IFJlc3RBcGkodGhpcywgXCJNYXJrZXRpbmdhbmRTYWxlc0Nvc3RcIiwge1xuICAgICAgZGVwbG95T3B0aW9uczp7XG4gICAgICAgICAgZGF0YVRyYWNlRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICB0cmFjaW5nRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICBzdGFnZU5hbWU6ICd2MScsXG4gICAgICAgICAgLy8gbG9nZ2luZ0xldmVsOiBNZXRob2RMb2dnaW5nTGV2ZWwuSU5GTyxcbiAgICAgIH0sXG4gICAgZGVmYXVsdE1ldGhvZE9wdGlvbnM6IHtcbiAgICAgIGFwaUtleVJlcXVpcmVkOiB0cnVlLFxuICAgIH0sXG4gICAgZGVmYXVsdENvcnNQcmVmbGlnaHRPcHRpb25zOiB7XG4gICAgICBhbGxvd09yaWdpbnM6IFtcbiAgICAgICAgJyonLFxuICAgICAgICAvLyBzdXBwb3J0IGxvY2FsaG9zdCBhcyBhbiBvcmlnaW4gb25seSBpbiBub24tcHJvZCBlbnZpcm9ubWVudHNcbiAgICAgIF0sXG4gICAgICBhbGxvd0hlYWRlcnM6IENvcnMuREVGQVVMVF9IRUFERVJTLmNvbmNhdChbJ3gtYXBpLWtleSddKSxcbiAgICB9LFxuICB9KTtcbiAgXG4gICAgdGhpcy5yZXN0QXBpID0gTWFya2V0aW5nYW5kU2FsZXNyZXN0QXBpO1xuICAgIGNvbnN0IG1hcmtldGluZ0Nvc3RJZENvc3RBcGkgPSB0aGlzLnJlc3RBcGkucm9vdC5yZXNvdXJjZUZvclBhdGgoJ21hcmtldGluZ0Nvc3QnKTsgLy8gaGVyZSB3ZSBjYW4gbWFrZSBtYW55IGVuZHBvaW50cyBiYXNlZCBvbiBvdXIgZnV0dXJlIG5lZWRcbiAgICBcbiAgICBjb25zdCByZXF1ZXN0VmFsaWRhdG9yID0gbmV3IFJlcXVlc3RWYWxpZGF0b3IodGhpcywgJ21hcmtldGluZy1jb3N0LXJlcXVlc3QtdmFsaWRhdG9yJywge1xuICAgICAgcmVzdEFwaTogdGhpcy5yZXN0QXBpLFxuICAgICAgdmFsaWRhdGVSZXF1ZXN0Qm9keTogdHJ1ZSxcbiAgICAgIHZhbGlkYXRlUmVxdWVzdFBhcmFtZXRlcnM6IHRydWUsXG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXJrZXRpbmdDb3N0Q29zdE1vZGVsID0gdGhpcy5yZXN0QXBpLmFkZE1vZGVsKFxuICAgICAgJ21hcmtldGluZy1Db3N0LWRhdGEtbW9kZWwnLFxuICAgICAge1xuICAgICAgICBzY2hlbWE6IE1hcmtldGluZ2FuZFNhbGVzQ29zdFNjaGVtYSwgLy8gY2hhbmdlXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnUmVxdWVzdCBtb2RlbCBmb3IgbWFya2V0aW5nQ29zdCBkYXRhICcsXG4gICAgICAgIG1vZGVsTmFtZTogJ21hcmtldGluZ0Nvc3REYXRhSW5wdXREQicsXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9LFxuICAgICk7XG4gICAgXG4gICAgbWFya2V0aW5nQ29zdElkQ29zdEFwaS5hZGRNZXRob2QoJ0dFVCcsIG5ldyBMYW1iZGFJbnRlZ3JhdGlvbihnZXRNYXJrZXRpbmdkYXRhTGFtYmRhKSk7XG4gICAgbWFya2V0aW5nQ29zdElkQ29zdEFwaS5hZGRNZXRob2QoJ1BPU1QnLCBuZXcgTGFtYmRhSW50ZWdyYXRpb24oc2F2ZU1hcmtldGluZ2RhdGFMYW1iZGEpLHtcbiAgICAgIGF1dGhvcml6YXRpb25UeXBlOiBBdXRob3JpemF0aW9uVHlwZS5OT05FLFxuICAgICAgcmVxdWVzdE1vZGVsczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IG1hcmtldGluZ0Nvc3RDb3N0TW9kZWwsXG4gICAgICB9LFxuICAgICAgcmVxdWVzdFZhbGlkYXRvcixcbiAgICB9KTtcbiAgICBcbiAgICB0aGlzLmFkZEFwaUtleShzdGFja05hbWUsIHRoaXMucmVzdEFwaSk7XG4gICAgdGhpcy5hZGRBcGlSZXNwb25zZXModGhpcy5yZXN0QXBpKTtcblxuICAgIHRoaXMucmVzdEFwaS5tZXRob2RzXG4gICAgICAuZmlsdGVyKG1ldGhvZCA9PiBtZXRob2QuaHR0cE1ldGhvZCA9PT0gJ09QVElPTlMnKVxuICAgICAgLmZvckVhY2gobWV0aG9kID0+IHtcbiAgICAgICAgY29uc3QgY2ZuTWV0aG9kID0gbWV0aG9kLm5vZGUuZGVmYXVsdENoaWxkIGFzIENmbk1ldGhvZDtcbiAgICAgICAgY2ZuTWV0aG9kLmFwaUtleVJlcXVpcmVkID0gZmFsc2U7XG4gICAgICB9KTtcbiAgfTtcblxuICBhZGRBcGlLZXkoc3RhY2tOYW1lOiBzdHJpbmcsIHJlc3RBcGk6IFJlc3RBcGkpIHtcbiAgICBjb25zdCBzZWNyYXRlTmFtZUFwaSA9IGAke3N0YWNrTmFtZX0vJHtyZXN0QXBpfS9hcGkta2V5YFxuICAgIGNvbnN0IHNlY3JldCA9IG5ldyBTZWNyZXQodGhpcywgJ0FwaVNlY3JldE1hcmtldGluZ0Nvc3QnLCB7XG4gICAgICBzZWNyZXROYW1lOiBzZWNyYXRlTmFtZUFwaSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnTWFya2V0aW5nIENvc3QgQVBJIEdhdGV3YXkgQVBJIEtleScsXG4gICAgICBnZW5lcmF0ZVNlY3JldFN0cmluZzoge1xuICAgICAgICBnZW5lcmF0ZVN0cmluZ0tleTogJ2tleScsXG4gICAgICAgIHNlY3JldFN0cmluZ1RlbXBsYXRlOiBKU09OLnN0cmluZ2lmeSh7fSksXG4gICAgICAgIGV4Y2x1ZGVDaGFyYWN0ZXJzOiAnICUrfmAjJCYqKCl8W117fTo7PD4/IVxcJy9AXCJcXFxcJyxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgdGhpcy5yZXN0QVBJS2V5QXJuID0gc2VjcmV0LnNlY3JldEFybjtcbiAgICAgIG5ldyBDZm5PdXRwdXQodGhpcywgJ21hcmtldGluZ0FQSUtleUFybkF0U291cmNlJywge1xuICAgICAgICB2YWx1ZTogdGhpcy5yZXN0QVBJS2V5QXJuID8/ICcnLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBwbGFuID0gcmVzdEFwaS5hZGRVc2FnZVBsYW4oJ21hcmtldGluZy1jb3N0LUFQaS1hZGRyZXNzLXVzYWdlLXBsYW4nLCB7XG4gICAgICAgIG5hbWU6IGAke3N0YWNrTmFtZX0tYXBpLXVzYWdlLXBsYW5gLFxuICAgICAgICBhcGlTdGFnZXM6IFt7IHN0YWdlOiByZXN0QXBpLmRlcGxveW1lbnRTdGFnZSB9XSxcbiAgICAgIH0pO1xuICAgIGNvbnN0IGN1c3RvbVJlc291cmNlUHJvdmlkZXIgPSBuZXcgQ3VzdG9tUmVzb3VyY2VQcm92aWRlcih0aGlzLCAnTWFya2V0aW5nQXBpUmVzb3VyY2VQcm92aWRlcicsIFN0YWNrLm9mKHRoaXMpLCBzZWNyYXRlTmFtZUFwaSk7XG4gICAgY29uc3QgY3VzdG9tUmVzb3VyY2UgPSBuZXcgY2RrLkN1c3RvbVJlc291cmNlKHRoaXMsICdtYXJrZXRpbmdQcm92aWRlckZvckN1c3RvbWVyQXBpJywge1xuICAgICAgc2VydmljZVRva2VuOiBjdXN0b21SZXNvdXJjZVByb3ZpZGVyLnNlcnZpY2VUb2tlbixcbiAgICAgIC8vIHByb3BlcnRpZXM6IHtcbiAgICAgIC8vICAgU0VDUkVUX05BTUU6IHNlY3JldC5zZWNyZXROYW1lLFxuICAgICAgLy8gfSxcbiAgICB9KTtcbiAgICAgIGNvbnN0IGFwaUtleSA9IHJlc3RBcGkuYWRkQXBpS2V5KCdBcGlLZXknLCB7XG4gICAgICAgIGFwaUtleU5hbWU6IHNlY3JhdGVOYW1lQXBpLFxuICAgICAgICB2YWx1ZTogY3VzdG9tUmVzb3VyY2UuZ2V0QXR0U3RyaW5nKCdTZWNyZXRWYWx1ZScpLFxuICAgICAgfSk7XG4gICAgICBwbGFuLmFkZEFwaUtleShhcGlLZXkpO1xuICAgIH1cblxuICBhZGRBcGlSZXNwb25zZXMocmVzdEFwaTogUmVzdEFwaSkge1xuICAgIGNvbnN0IGNvbW1vblJlc3BvbnNlID0gbmV3IEFwaUNvbW1vblJlc3BvbnNlKCk7XG4gICAgLy8gKioqKioqKioqKioqKioqKiogRXJyb3IgNDAwXG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ0JBRF9SRVFVRVNUX0JPRFknLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuQkFEX1JFUVVFU1RfQk9EWSxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDAwLCAnQmFkIFJlcXVlc3QnLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgLy8gKioqKioqKioqKioqKioqKipFcnJvciA0MDNcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnV0FGX0ZJTFRFUkVEJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLldBRl9GSUxURVJFRCxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcblxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDMsICdGb3JiaWRkZW4nLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ0VYUElSRURfVE9LRU4nLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuRVhQSVJFRF9UT0tFTixcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDAzLCAnRm9yYmlkZGVuJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdJTlZBTElEX0FQSV9LRVknLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuSU5WQUxJRF9BUElfS0VZLFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDMsICdGb3JiaWRkZW4nLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ0FDQ0VTU19ERU5JRUQnLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuQUNDRVNTX0RFTklFRCxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDAzLCAnRm9yYmlkZGVuJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdJTlZBTElEX1NJR05BVFVSRScsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5JTlZBTElEX1NJR05BVFVSRSxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDAzLCAnRm9yYmlkZGVuJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdNSVNTSU5HX0FVVEhFTlRJQ0FUSU9OX1RPS0VOJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLk1JU1NJTkdfQVVUSEVOVElDQVRJT05fVE9LRU4sXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIiwgLy8gQ29ycmVjdGVkIHN5bnRheFxuICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJzogXCInT1BUSU9OUywgR0VUJ1wiLFxuICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJzogXCInQ29udGVudC1UeXBlLCBBdXRob3JpemF0aW9uJ1wiLFxuICAgICAgICAgICdWYXJ5JzogXCInT3JpZ2luJ1wiLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMywgJ0ZvcmJpZGRlbicsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgfSk7XG4gIFxuICAgIC8vICoqKioqKioqKioqKioqKioqRXJyb3IgNXh4XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ0RFRkFVTFRfNVhYJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLkRFRkFVTFRfNVhYLFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig1MDAsICdJbnRlcm5hbCBTZXJ2ZXIgRXJyb3InLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgLy8gKioqKioqKioqKioqKioqKiogRXJyb3IgNDAxXG4gICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnVU5BVVRIT1JJWkVEJywge1xuICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5VTkFVVEhPUklaRUQsXG4gICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLCAvLyBDb3JyZWN0ZWQgc3ludGF4XG4gICAgfSxcbiAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDAxLCAnVW5hdXRob3JpemVkJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgfSxcbn0pO1xuXG4gICAgLy8gKioqKioqKioqKioqKioqKiogRXJyb3IgZm9yIDQyOVxuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdRVU9UQV9FWENFRURFRCcsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5RVU9UQV9FWENFRURFRCxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDI5LCAnTGltaXQgRXhjZWVkZWQnLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ1RIUk9UVExFRCcsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5USFJPVFRMRUQsXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQyOSwgJ0xpbWl0IEV4Y2VlZGVkJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG59XG4iXX0=