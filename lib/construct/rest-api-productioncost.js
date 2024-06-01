"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionCostConstruct = void 0;
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
const productionCostSchema_1 = require("../schema/productionCostSchema");
const aws_secretsmanager_1 = require("aws-cdk-lib/aws-secretsmanager");
const customeSecret_1 = require("./common/customeSecret");
class ProductionCostConstruct extends constructs_1.Construct {
    constructor(scope, id, stack, _getSecretValueFn, _customResource) {
        super(scope, id);
        const stackName = aws_cdk_lib_1.Stack.of(this).stackName;
        // Configure the AWS SDK with region
        AWS.config.update({ region: process.env.AWS_REGION });
        const saveAddress = new aws_dynamodb_1.Table(stack, "ProductionCostDetails", {
            partitionKey: { name: "ProductionCostId", type: aws_dynamodb_1.AttributeType.STRING },
            tableName: "ProductionCostDB",
        });
        saveAddress.addGlobalSecondaryIndex({
            indexName: 'ProductionCostIdIndex',
            partitionKey: { name: 'ProductionCostId', type: aws_dynamodb_1.AttributeType.STRING },
        });
        const handlerDir = path.resolve(__dirname, '../../lib');
        const getProductionCostdataLambda = new aws_lambda_1.Function(stack, "GetProductionCostLambda", {
            runtime: aws_lambda_1.Runtime.NODEJS_20_X,
            code: aws_lambda_1.Code.fromAsset(handlerDir),
            handler: 'handler/PDC/getProductionCostHandler.handler',
            environment: {
                TABLE_NAME: saveAddress.tableName,
            },
        });
        getProductionCostdataLambda.grantPrincipal.addToPrincipalPolicy(new aws_iam_1.PolicyStatement({
            resources: ['*'],
            actions: ['dynamodb:getItem', 'secretsmanager:GetSecretValue'],
        }));
        const saveProductionCostdataLambda = new aws_lambda_1.Function(stack, "PutProductionCostLambda", {
            runtime: aws_lambda_1.Runtime.NODEJS_20_X,
            code: aws_lambda_1.Code.fromAsset(handlerDir),
            handler: 'handler/PDC/saveProductionCostHandler.handler',
            environment: {
                TABLE_NAME: saveAddress.tableName,
            },
        });
        saveProductionCostdataLambda.grantPrincipal.addToPrincipalPolicy(new aws_iam_1.PolicyStatement({
            resources: ['*'],
            actions: ['dynamodb:PutItem', 'secretsmanager:GetSecretValue'],
        }));
        getProductionCostdataLambda.role?.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'));
        saveAddress.grantWriteData(saveProductionCostdataLambda);
        const restApi = new aws_apigateway_1.RestApi(this, "ProductionCost", {
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
        this.restApi = restApi;
        const requestValidator = new aws_apigateway_1.RequestValidator(this, 'production-cost-request-validator', {
            restApi: this.restApi,
            validateRequestBody: true,
            validateRequestParameters: true,
        });
        const productionCostModel = restApi.addModel('production-cost-data-model', {
            schema: productionCostSchema_1.default,
            description: 'Request model for productionCost data ',
            modelName: 'ProductionCostcostSchemaInput',
            contentType: 'application/json',
        });
        const ProductionCostApi = restApi.root.resourceForPath('Materials'); // here we can make more endpoint based on out future need
        //restApi.root.resourceForPath('Technology');
        // const RentCostApi = restApi.root.resourceForPath('Technology');
        // const UtilitiesCostApi = restApi.root.resourceForPath('Utilities');
        // const MaintenanceCostApi = restApi.root.resourceForPath('Maintenance');
        // const RepairsCosteApi = restApi.root.resourceForPath('Repairs');
        ProductionCostApi.addMethod('GET', new aws_apigateway_1.LambdaIntegration(getProductionCostdataLambda));
        ProductionCostApi.addMethod('POST', new aws_apigateway_1.LambdaIntegration(saveProductionCostdataLambda), {
            authorizationType: aws_apigateway_1.AuthorizationType.NONE,
            requestModels: {
                'application/json': productionCostModel,
            },
            requestValidator,
        });
        // RentCostApi.addMethod('POST', new LambdaIntegration(saveProductionCostdataLambda));
        // UtilitiesCostApi.addMethod('POST', new LambdaIntegration(saveProductionCostdataLambda));
        // MaintenanceCostApi.addMethod('POST', new LambdaIntegration(saveProductionCostdataLambda));
        // RepairsCosteApi.addMethod('POST', new LambdaIntegration(saveProductionCostdataLambda));
        this.addApiKey(stackName, restApi);
        this.addApiResponses(restApi);
        restApi.methods
            .filter(method => method.httpMethod === 'OPTIONS')
            .forEach(method => {
            const cfnMethod = method.node.defaultChild;
            cfnMethod.apiKeyRequired = false;
        });
    }
    ;
    addApiKey(stackName, restApi) {
        const secrateNameApi = `${stackName}/${restApi}/api-key`;
        const secret = new aws_secretsmanager_1.Secret(this, 'ApiSecretProduction', {
            secretName: secrateNameApi,
            description: 'Production cost API Gateway API Key',
            generateSecretString: {
                generateStringKey: 'key',
                secretStringTemplate: JSON.stringify({}),
                excludeCharacters: ' %+~`#$&*()|[]{}:;<>?!\'/@"\\',
            },
        });
        this.restAPIKeyArn = secret.secretArn;
        new aws_cdk_lib_1.CfnOutput(this, 'restAPIKeyArnAtSource', {
            value: this.restAPIKeyArn ?? '',
        });
        const plan = restApi.addUsagePlan('productionCostAPi-address-usage-plan', {
            name: `${stackName}-api-usage-plan`,
            apiStages: [{ stage: restApi.deploymentStage }],
        });
        const customResourceProvider = new customeSecret_1.CustomResourceProvider(this, 'ProductionApiResourceProvider', aws_cdk_lib_1.Stack.of(this), secrateNameApi);
        const customResource = new cdk.CustomResource(this, 'ProductionCostProviderForCustomerApi', {
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
exports.ProductionCostConstruct = ProductionCostConstruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdC1hcGktcHJvZHVjdGlvbmNvc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uc3RydWN0L3Jlc3QtYXBpLXByb2R1Y3Rpb25jb3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUEyQztBQUMzQywyQ0FBdUM7QUFDdkMsMkRBQWdFO0FBQ2hFLHVEQUFpRTtBQUNqRSxtQ0FBbUM7QUFDbkMsK0RBQTRJO0FBQzVJLDZDQUErQztBQUMvQywyQ0FBMkM7QUFDM0MsK0VBQTBFO0FBQzFFLDZCQUE4QjtBQUM5QiwrQkFBK0I7QUFDL0IsaURBQXNEO0FBQ3RELHlFQUFxRTtBQUNyRSx1RUFBd0Q7QUFDeEQsMERBQWdFO0FBRWhFLE1BQWEsdUJBQXdCLFNBQVEsc0JBQVM7SUFHcEQsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBQyxLQUFhLEVBQUUsaUJBQXNCLEVBQUUsZUFBb0I7UUFDbEcsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqQixNQUFNLFNBQVMsR0FBRyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDM0Msb0NBQW9DO1FBQ3BDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUV0RCxNQUFNLFdBQVcsR0FBRyxJQUFJLG9CQUFLLENBQUMsS0FBSyxFQUFFLHVCQUF1QixFQUFFO1lBQzVELFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsNEJBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDdEUsU0FBUyxFQUFFLGtCQUFrQjtTQUM5QixDQUFDLENBQUM7UUFDSCxXQUFXLENBQUMsdUJBQXVCLENBQUM7WUFDbEMsU0FBUyxFQUFFLHVCQUF1QjtZQUNsQyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUs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Q1Qsa0JBQWtCLEVBQUUsY0FBYyxDQUFDLHdCQUF3QixDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLElBQUk7YUFDOUc7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUF0UUQsMERBc1FDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHsgQ2ZuT3V0cHV0IH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBBdHRyaWJ1dGVUeXBlLCBUYWJsZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1keW5hbW9kYic7XG5pbXBvcnQgeyBSdW50aW1lLCBDb2RlLCBGdW5jdGlvbiB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEnO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IFJlc3RBcGksIExhbWJkYUludGVncmF0aW9uLCBSZXNwb25zZVR5cGUsIENmbk1ldGhvZCwgQ29ycywgQXV0aG9yaXphdGlvblR5cGUsIFJlcXVlc3RWYWxpZGF0b3IgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXlcIjtcbmltcG9ydCB7IENmbk91dHB1dCwgU3RhY2sgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBpYW0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XG5pbXBvcnQgeyBBcGlDb21tb25SZXNwb25zZSB9IGZyb20gJy4uL21vZHVsZXMvQ29tbW9uL2FwaS1jb21tb24tcmVzcG9uc2UnO1xuaW1wb3J0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5pbXBvcnQgKiBhcyBBV1MgZnJvbSAnYXdzLXNkayc7XG5pbXBvcnQgeyBQb2xpY3lTdGF0ZW1lbnQgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtaWFtJztcbmltcG9ydCBQcm9kdWN0aW9uQ29zdGNvc3RTY2hlbWEgZnJvbSAnLi4vc2NoZW1hL3Byb2R1Y3Rpb25Db3N0U2NoZW1hJ1xuaW1wb3J0IHsgU2VjcmV0IH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLXNlY3JldHNtYW5hZ2VyJztcbmltcG9ydCB7IEN1c3RvbVJlc291cmNlUHJvdmlkZXIgfSBmcm9tICcuL2NvbW1vbi9jdXN0b21lU2VjcmV0JztcblxuZXhwb3J0IGNsYXNzIFByb2R1Y3Rpb25Db3N0Q29uc3RydWN0IGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgcHVibGljIHJlc3RBcGk6IFJlc3RBcGk7XG4gIHB1YmxpYyByZXN0QVBJS2V5QXJuOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsc3RhY2sgOiBTdGFjaywgX2dldFNlY3JldFZhbHVlRm46IGFueSwgX2N1c3RvbVJlc291cmNlOiBhbnkpIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuICAgIGNvbnN0IHN0YWNrTmFtZSA9IFN0YWNrLm9mKHRoaXMpLnN0YWNrTmFtZTtcbiAgICAvLyBDb25maWd1cmUgdGhlIEFXUyBTREsgd2l0aCByZWdpb25cbiAgICBBV1MuY29uZmlnLnVwZGF0ZSh7IHJlZ2lvbjogcHJvY2Vzcy5lbnYuQVdTX1JFR0lPTiB9KTtcblxuICAgIGNvbnN0IHNhdmVBZGRyZXNzID0gbmV3IFRhYmxlKHN0YWNrLCBcIlByb2R1Y3Rpb25Db3N0RGV0YWlsc1wiLCB7XG4gICAgICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogXCJQcm9kdWN0aW9uQ29zdElkXCIsIHR5cGU6IEF0dHJpYnV0ZVR5cGUuU1RSSU5HIH0sXG4gICAgICB0YWJsZU5hbWU6IFwiUHJvZHVjdGlvbkNvc3REQlwiLFxuICAgIH0pO1xuICAgIHNhdmVBZGRyZXNzLmFkZEdsb2JhbFNlY29uZGFyeUluZGV4KHtcbiAgICAgIGluZGV4TmFtZTogJ1Byb2R1Y3Rpb25Db3N0SWRJbmRleCcsXG4gICAgICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogJ1Byb2R1Y3Rpb25Db3N0SWQnLCB0eXBlOiBBdHRyaWJ1dGVUeXBlLlNUUklORyB9LFxuICAgIH0pO1xuICAgIGNvbnN0IGhhbmRsZXJEaXIgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vbGliJyk7XG4gICAgY29uc3QgZ2V0UHJvZHVjdGlvbkNvc3RkYXRhTGFtYmRhID0gbmV3IEZ1bmN0aW9uKHN0YWNrLCBcIkdldFByb2R1Y3Rpb25Db3N0TGFtYmRhXCIsIHtcbiAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzIwX1gsXG4gICAgICBjb2RlOiBDb2RlLmZyb21Bc3NldChoYW5kbGVyRGlyKSwgXG4gICAgICBoYW5kbGVyOiAnaGFuZGxlci9QREMvZ2V0UHJvZHVjdGlvbkNvc3RIYW5kbGVyLmhhbmRsZXInLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgVEFCTEVfTkFNRTogc2F2ZUFkZHJlc3MudGFibGVOYW1lLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBnZXRQcm9kdWN0aW9uQ29zdGRhdGFMYW1iZGEuZ3JhbnRQcmluY2lwYWwuYWRkVG9QcmluY2lwYWxQb2xpY3koXG4gICAgICBuZXcgUG9saWN5U3RhdGVtZW50KHtcbiAgICAgICAgcmVzb3VyY2VzOiBbJyonXSxcbiAgICAgICAgYWN0aW9uczogWydkeW5hbW9kYjpnZXRJdGVtJywgJ3NlY3JldHNtYW5hZ2VyOkdldFNlY3JldFZhbHVlJ10sXG4gICAgICB9KSxcbiAgICApO1xuICAgIFxuXG4gICAgY29uc3Qgc2F2ZVByb2R1Y3Rpb25Db3N0ZGF0YUxhbWJkYSA9IG5ldyBGdW5jdGlvbihzdGFjaywgXCJQdXRQcm9kdWN0aW9uQ29zdExhbWJkYVwiLCB7XG4gICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18yMF9YLCAvLyBBZGp1c3QgcnVudGltZSBpZiBuZWNlc3NhcnlcbiAgICAgIGNvZGU6IENvZGUuZnJvbUFzc2V0KGhhbmRsZXJEaXIpLFxuICAgICAgaGFuZGxlcjogJ2hhbmRsZXIvUERDL3NhdmVQcm9kdWN0aW9uQ29zdEhhbmRsZXIuaGFuZGxlcicsXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBUQUJMRV9OQU1FOiBzYXZlQWRkcmVzcy50YWJsZU5hbWUsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgc2F2ZVByb2R1Y3Rpb25Db3N0ZGF0YUxhbWJkYS5ncmFudFByaW5jaXBhbC5hZGRUb1ByaW5jaXBhbFBvbGljeShcbiAgICAgIG5ldyBQb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICByZXNvdXJjZXM6IFsnKiddLFxuICAgICAgICBhY3Rpb25zOiBbJ2R5bmFtb2RiOlB1dEl0ZW0nLCAnc2VjcmV0c21hbmFnZXI6R2V0U2VjcmV0VmFsdWUnXSxcbiAgICAgIH0pLFxuICAgICk7XG4gICAgZ2V0UHJvZHVjdGlvbkNvc3RkYXRhTGFtYmRhLnJvbGU/LmFkZE1hbmFnZWRQb2xpY3koaWFtLk1hbmFnZWRQb2xpY3kuZnJvbUF3c01hbmFnZWRQb2xpY3lOYW1lKCdBbWF6b25EeW5hbW9EQkZ1bGxBY2Nlc3MnKSk7XG4gICAgc2F2ZUFkZHJlc3MuZ3JhbnRXcml0ZURhdGEoc2F2ZVByb2R1Y3Rpb25Db3N0ZGF0YUxhbWJkYSk7XG4gICAgXG4gICAgY29uc3QgcmVzdEFwaSA9IG5ldyBSZXN0QXBpKHRoaXMsIFwiUHJvZHVjdGlvbkNvc3RcIiwge1xuICAgICAgICBkZXBsb3lPcHRpb25zOntcbiAgICAgICAgICAgIGRhdGFUcmFjZUVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB0cmFjaW5nRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIHN0YWdlTmFtZTogJ3YxJyxcbiAgICAgICAgICAgIC8vIGxvZ2dpbmdMZXZlbDogTWV0aG9kTG9nZ2luZ0xldmVsLklORk8sXG4gICAgICAgIH0sXG4gICAgICBkZWZhdWx0TWV0aG9kT3B0aW9uczoge1xuICAgICAgICBhcGlLZXlSZXF1aXJlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBkZWZhdWx0Q29yc1ByZWZsaWdodE9wdGlvbnM6IHtcbiAgICAgICAgYWxsb3dPcmlnaW5zOiBbXG4gICAgICAgICAgJyonLFxuICAgICAgICAgIC8vIHN1cHBvcnQgbG9jYWxob3N0IGFzIGFuIG9yaWdpbiBvbmx5IGluIG5vbi1wcm9kIGVudmlyb25tZW50c1xuICAgICAgICBdLFxuICAgICAgICBhbGxvd0hlYWRlcnM6IENvcnMuREVGQVVMVF9IRUFERVJTLmNvbmNhdChbJ3gtYXBpLWtleSddKSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgdGhpcy5yZXN0QXBpID0gcmVzdEFwaTtcbiAgICBjb25zdCByZXF1ZXN0VmFsaWRhdG9yID0gbmV3IFJlcXVlc3RWYWxpZGF0b3IodGhpcywgJ3Byb2R1Y3Rpb24tY29zdC1yZXF1ZXN0LXZhbGlkYXRvcicsIHtcbiAgICAgIHJlc3RBcGk6IHRoaXMucmVzdEFwaSxcbiAgICAgIHZhbGlkYXRlUmVxdWVzdEJvZHk6IHRydWUsXG4gICAgICB2YWxpZGF0ZVJlcXVlc3RQYXJhbWV0ZXJzOiB0cnVlLFxuICAgIH0pO1xuICAgIGNvbnN0IHByb2R1Y3Rpb25Db3N0TW9kZWwgPSByZXN0QXBpLmFkZE1vZGVsKFxuICAgICAgJ3Byb2R1Y3Rpb24tY29zdC1kYXRhLW1vZGVsJyxcbiAgICAgIHtcbiAgICAgICAgc2NoZW1hOiBQcm9kdWN0aW9uQ29zdGNvc3RTY2hlbWEsIC8vIGNoYW5nZVxuICAgICAgICBkZXNjcmlwdGlvbjogJ1JlcXVlc3QgbW9kZWwgZm9yIHByb2R1Y3Rpb25Db3N0IGRhdGEgJyxcbiAgICAgICAgbW9kZWxOYW1lOiAnUHJvZHVjdGlvbkNvc3Rjb3N0U2NoZW1hSW5wdXQnLFxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSxcbiAgICApO1xuICAgIGNvbnN0IFByb2R1Y3Rpb25Db3N0QXBpID0gcmVzdEFwaS5yb290LnJlc291cmNlRm9yUGF0aCgnTWF0ZXJpYWxzJyk7IC8vIGhlcmUgd2UgY2FuIG1ha2UgbW9yZSBlbmRwb2ludCBiYXNlZCBvbiBvdXQgZnV0dXJlIG5lZWRcbiAgICAvL3Jlc3RBcGkucm9vdC5yZXNvdXJjZUZvclBhdGgoJ1RlY2hub2xvZ3knKTtcbiAgICAvLyBjb25zdCBSZW50Q29zdEFwaSA9IHJlc3RBcGkucm9vdC5yZXNvdXJjZUZvclBhdGgoJ1RlY2hub2xvZ3knKTtcbiAgICAvLyBjb25zdCBVdGlsaXRpZXNDb3N0QXBpID0gcmVzdEFwaS5yb290LnJlc291cmNlRm9yUGF0aCgnVXRpbGl0aWVzJyk7XG4gICAgLy8gY29uc3QgTWFpbnRlbmFuY2VDb3N0QXBpID0gcmVzdEFwaS5yb290LnJlc291cmNlRm9yUGF0aCgnTWFpbnRlbmFuY2UnKTtcbiAgICAvLyBjb25zdCBSZXBhaXJzQ29zdGVBcGkgPSByZXN0QXBpLnJvb3QucmVzb3VyY2VGb3JQYXRoKCdSZXBhaXJzJyk7XG4gICAgUHJvZHVjdGlvbkNvc3RBcGkuYWRkTWV0aG9kKCdHRVQnLCBuZXcgTGFtYmRhSW50ZWdyYXRpb24oZ2V0UHJvZHVjdGlvbkNvc3RkYXRhTGFtYmRhKSk7XG4gICAgXG4gICAgUHJvZHVjdGlvbkNvc3RBcGkuYWRkTWV0aG9kKCdQT1NUJywgbmV3IExhbWJkYUludGVncmF0aW9uKHNhdmVQcm9kdWN0aW9uQ29zdGRhdGFMYW1iZGEpLHtcbiAgICAgIGF1dGhvcml6YXRpb25UeXBlOiBBdXRob3JpemF0aW9uVHlwZS5OT05FLFxuICAgICAgcmVxdWVzdE1vZGVsczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IHByb2R1Y3Rpb25Db3N0TW9kZWwsXG4gICAgICB9LFxuICAgICAgcmVxdWVzdFZhbGlkYXRvcixcbiAgICB9KTtcbiAgICAvLyBSZW50Q29zdEFwaS5hZGRNZXRob2QoJ1BPU1QnLCBuZXcgTGFtYmRhSW50ZWdyYXRpb24oc2F2ZVByb2R1Y3Rpb25Db3N0ZGF0YUxhbWJkYSkpO1xuICAgIC8vIFV0aWxpdGllc0Nvc3RBcGkuYWRkTWV0aG9kKCdQT1NUJywgbmV3IExhbWJkYUludGVncmF0aW9uKHNhdmVQcm9kdWN0aW9uQ29zdGRhdGFMYW1iZGEpKTtcbiAgICAvLyBNYWludGVuYW5jZUNvc3RBcGkuYWRkTWV0aG9kKCdQT1NUJywgbmV3IExhbWJkYUludGVncmF0aW9uKHNhdmVQcm9kdWN0aW9uQ29zdGRhdGFMYW1iZGEpKTtcbiAgICAvLyBSZXBhaXJzQ29zdGVBcGkuYWRkTWV0aG9kKCdQT1NUJywgbmV3IExhbWJkYUludGVncmF0aW9uKHNhdmVQcm9kdWN0aW9uQ29zdGRhdGFMYW1iZGEpKTtcbiAgICBcbiAgICB0aGlzLmFkZEFwaUtleShzdGFja05hbWUsIHJlc3RBcGkpO1xuICAgIHRoaXMuYWRkQXBpUmVzcG9uc2VzKHJlc3RBcGkpO1xuXG4gICAgcmVzdEFwaS5tZXRob2RzXG4gICAgICAuZmlsdGVyKG1ldGhvZCA9PiBtZXRob2QuaHR0cE1ldGhvZCA9PT0gJ09QVElPTlMnKVxuICAgICAgLmZvckVhY2gobWV0aG9kID0+IHtcbiAgICAgICAgY29uc3QgY2ZuTWV0aG9kID0gbWV0aG9kLm5vZGUuZGVmYXVsdENoaWxkIGFzIENmbk1ldGhvZDtcbiAgICAgICAgY2ZuTWV0aG9kLmFwaUtleVJlcXVpcmVkID0gZmFsc2U7XG4gICAgICB9KTtcbiAgfTtcblxuICBhZGRBcGlLZXkoc3RhY2tOYW1lOiBzdHJpbmcsIHJlc3RBcGk6IFJlc3RBcGkpIHtcbiAgICBjb25zdCBzZWNyYXRlTmFtZUFwaSA9IGAke3N0YWNrTmFtZX0vJHtyZXN0QXBpfS9hcGkta2V5YFxuICAgIGNvbnN0IHNlY3JldCA9IG5ldyBTZWNyZXQodGhpcywgJ0FwaVNlY3JldFByb2R1Y3Rpb24nLCB7XG4gICAgICBzZWNyZXROYW1lOiBzZWNyYXRlTmFtZUFwaSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnUHJvZHVjdGlvbiBjb3N0IEFQSSBHYXRld2F5IEFQSSBLZXknLFxuICAgICAgZ2VuZXJhdGVTZWNyZXRTdHJpbmc6IHtcbiAgICAgICAgZ2VuZXJhdGVTdHJpbmdLZXk6ICdrZXknLFxuICAgICAgICBzZWNyZXRTdHJpbmdUZW1wbGF0ZTogSlNPTi5zdHJpbmdpZnkoe30pLFxuICAgICAgICBleGNsdWRlQ2hhcmFjdGVyczogJyAlK35gIyQmKigpfFtde306Ozw+PyFcXCcvQFwiXFxcXCcsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHRoaXMucmVzdEFQSUtleUFybiA9IHNlY3JldC5zZWNyZXRBcm47XG4gICAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdyZXN0QVBJS2V5QXJuQXRTb3VyY2UnLCB7XG4gICAgICAgIHZhbHVlOiB0aGlzLnJlc3RBUElLZXlBcm4gPz8gJycsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHBsYW4gPSByZXN0QXBpLmFkZFVzYWdlUGxhbigncHJvZHVjdGlvbkNvc3RBUGktYWRkcmVzcy11c2FnZS1wbGFuJywge1xuICAgICAgICBuYW1lOiBgJHtzdGFja05hbWV9LWFwaS11c2FnZS1wbGFuYCxcbiAgICAgICAgYXBpU3RhZ2VzOiBbeyBzdGFnZTogcmVzdEFwaS5kZXBsb3ltZW50U3RhZ2UgfV0sXG4gICAgICB9KTtcbiAgICBjb25zdCBjdXN0b21SZXNvdXJjZVByb3ZpZGVyID0gbmV3IEN1c3RvbVJlc291cmNlUHJvdmlkZXIodGhpcywgJ1Byb2R1Y3Rpb25BcGlSZXNvdXJjZVByb3ZpZGVyJywgU3RhY2sub2YodGhpcyksIHNlY3JhdGVOYW1lQXBpKTtcbiAgICBjb25zdCBjdXN0b21SZXNvdXJjZSA9IG5ldyBjZGsuQ3VzdG9tUmVzb3VyY2UodGhpcywgJ1Byb2R1Y3Rpb25Db3N0UHJvdmlkZXJGb3JDdXN0b21lckFwaScsIHtcbiAgICAgIHNlcnZpY2VUb2tlbjogY3VzdG9tUmVzb3VyY2VQcm92aWRlci5zZXJ2aWNlVG9rZW4sXG4gICAgICAvLyBwcm9wZXJ0aWVzOiB7XG4gICAgICAvLyAgIFNFQ1JFVF9OQU1FOiBzZWNyZXQuc2VjcmV0TmFtZSxcbiAgICAgIC8vIH0sXG4gICAgfSk7XG4gICAgICBjb25zdCBhcGlLZXkgPSByZXN0QXBpLmFkZEFwaUtleSgnQXBpS2V5Jywge1xuICAgICAgICBhcGlLZXlOYW1lOiBzZWNyYXRlTmFtZUFwaSxcbiAgICAgICAgdmFsdWU6IGN1c3RvbVJlc291cmNlLmdldEF0dFN0cmluZygnU2VjcmV0VmFsdWUnKSxcbiAgICAgIH0pO1xuICAgICAgcGxhbi5hZGRBcGlLZXkoYXBpS2V5KTtcbiAgICB9XG5cbiAgYWRkQXBpUmVzcG9uc2VzKHJlc3RBcGk6IFJlc3RBcGkpIHtcbiAgICBjb25zdCBjb21tb25SZXNwb25zZSA9IG5ldyBBcGlDb21tb25SZXNwb25zZSgpO1xuICAgIC8vICoqKioqKioqKioqKioqKioqIEVycm9yIDQwMFxuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdCQURfUkVRVUVTVF9CT0RZJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLkJBRF9SRVFVRVNUX0JPRFksXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMCwgJ0JhZCBSZXF1ZXN0JywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIC8vICoqKioqKioqKioqKioqKioqRXJyb3IgNDAzXG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ1dBRl9GSUxURVJFRCcsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5XQUZfRklMVEVSRUQsXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG5cbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDAzLCAnRm9yYmlkZGVuJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdFWFBJUkVEX1RPS0VOJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLkVYUElSRURfVE9LRU4sXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMywgJ0ZvcmJpZGRlbicsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnSU5WQUxJRF9BUElfS0VZJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLklOVkFMSURfQVBJX0tFWSxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDAzLCAnRm9yYmlkZGVuJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdBQ0NFU1NfREVOSUVEJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLkFDQ0VTU19ERU5JRUQsXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMywgJ0ZvcmJpZGRlbicsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnSU5WQUxJRF9TSUdOQVRVUkUnLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuSU5WQUxJRF9TSUdOQVRVUkUsXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMywgJ0ZvcmJpZGRlbicsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnTUlTU0lOR19BVVRIRU5USUNBVElPTl9UT0tFTicsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5NSVNTSU5HX0FVVEhFTlRJQ0FUSU9OX1RPS0VOLFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsIC8vIENvcnJlY3RlZCBzeW50YXhcbiAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcyc6IFwiJ09QVElPTlMsIEdFVCdcIixcbiAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycyc6IFwiJ0NvbnRlbnQtVHlwZSwgQXV0aG9yaXphdGlvbidcIixcbiAgICAgICAgICAnVmFyeSc6IFwiJ09yaWdpbidcIixcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDMsICdGb3JiaWRkZW4nLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gIH0pO1xuICBcbiAgICAvLyAqKioqKioqKioqKioqKioqKkVycm9yIDV4eFxuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdERUZBVUxUXzVYWCcsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5ERUZBVUxUXzVYWCxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNTAwLCAnSW50ZXJuYWwgU2VydmVyIEVycm9yJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIC8vICoqKioqKioqKioqKioqKioqIEVycm9yIDQwMVxuICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ1VOQVVUSE9SSVpFRCcsIHtcbiAgICB0eXBlOiBSZXNwb25zZVR5cGUuVU5BVVRIT1JJWkVELFxuICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIiwgLy8gQ29ycmVjdGVkIHN5bnRheFxuICAgIH0sXG4gICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMSwgJ1VuYXV0aG9yaXplZCcsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgIH0sXG59KTtcblxuICAgIC8vICoqKioqKioqKioqKioqKioqIEVycm9yIGZvciA0MjlcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnUVVPVEFfRVhDRUVERUQnLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuUVVPVEFfRVhDRUVERUQsXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQyOSwgJ0xpbWl0IEV4Y2VlZGVkJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdUSFJPVFRMRUQnLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuVEhST1RUTEVELFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MjksICdMaW1pdCBFeGNlZWRlZCcsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxufVxuIl19