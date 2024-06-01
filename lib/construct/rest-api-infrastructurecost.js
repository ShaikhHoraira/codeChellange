"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfrastructureCostConstruct = void 0;
// import { CfnOutput } from 'aws-cdk-lib';
const constructs_1 = require("constructs");
const aws_dynamodb_1 = require("aws-cdk-lib/aws-dynamodb");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
const cdk = require("aws-cdk-lib");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const iam = require("aws-cdk-lib/aws-iam");
const api_common_response_1 = require("../modules/Common/api-common-response");
const path = require("path");
const AWS = require("aws-sdk");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
const infrastructureCost_1 = require("../schema/infrastructureCost");
const aws_secretsmanager_1 = require("aws-cdk-lib/aws-secretsmanager");
const customeSecret_1 = require("./common/customeSecret");
class InfrastructureCostConstruct extends constructs_1.Construct {
    constructor(scope, id, stack) {
        super(scope, id);
        const stackName = aws_cdk_lib_1.Stack.of(this).stackName;
        // Configure the AWS SDK with region
        AWS.config.update({ region: process.env.AWS_REGION });
        const saveAddress = new aws_dynamodb_1.Table(stack, "RentCost", {
            partitionKey: { name: "RentId", type: aws_dynamodb_1.AttributeType.STRING },
            tableName: "RentInfrastructureCost",
        });
        saveAddress.addGlobalSecondaryIndex({
            indexName: 'RentIndex',
            partitionKey: { name: 'RentId', type: aws_dynamodb_1.AttributeType.STRING },
        });
        const handlerDir = path.resolve(__dirname, '../../lib');
        const getRentCostdataLambda = new aws_lambda_1.Function(stack, "GetRentIdDetailsLambda", {
            runtime: aws_lambda_1.Runtime.NODEJS_20_X,
            code: aws_lambda_1.Code.fromAsset(handlerDir),
            handler: 'handler/InfrastructureCost/getRentIdHandler.handler',
            environment: {
                TABLE_NAME: saveAddress.tableName,
            },
        });
        getRentCostdataLambda.grantPrincipal.addToPrincipalPolicy(new aws_iam_1.PolicyStatement({
            resources: ['*'],
            actions: ['dynamodb:getItem', 'secretsmanager:GetSecretValue'],
        }));
        const saveRentCostdataLambda = new aws_lambda_1.Function(stack, "SaveRentIdDetailsLambda", {
            runtime: aws_lambda_1.Runtime.NODEJS_20_X,
            code: aws_lambda_1.Code.fromAsset(handlerDir),
            handler: 'handler/InfrastructureCost/saveRentIdHandler.handler',
            environment: {
                TABLE_NAME: saveAddress.tableName,
            },
        });
        saveRentCostdataLambda.grantPrincipal.addToPrincipalPolicy(new aws_iam_1.PolicyStatement({
            resources: ['*'],
            actions: ['dynamodb:PutItem', 'secretsmanager:GetSecretValue'],
        }));
        getRentCostdataLambda.role?.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'));
        saveAddress.grantWriteData(saveRentCostdataLambda);
        const restApi = new aws_apigateway_1.RestApi(this, "InfrastructureCost", {
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
        const rentCostIdCostApi = restApi.root.resourceForPath('rentCostId'); // here we can make many endpoints based on our future need
        const requestValidator = new aws_apigateway_1.RequestValidator(this, 'rent-cost-request-validator', {
            restApi: this.restApi,
            validateRequestBody: true,
            validateRequestParameters: true,
        });
        const infrastructureCostModel = restApi.addModel('rent-Cost-data-model', {
            schema: infrastructureCost_1.default,
            description: 'Request model for rentCost data ',
            modelName: 'rentCostDataInputDB',
            contentType: 'application/json',
        });
        rentCostIdCostApi.addMethod('GET', new aws_apigateway_1.LambdaIntegration(getRentCostdataLambda));
        rentCostIdCostApi.addMethod('POST', new aws_apigateway_1.LambdaIntegration(saveRentCostdataLambda), {
            authorizationType: aws_apigateway_1.AuthorizationType.NONE,
            requestModels: {
                'application/json': infrastructureCostModel,
            },
            requestValidator,
        });
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
        const secret = new aws_secretsmanager_1.Secret(this, 'ApiSecretInfrastructureCost', {
            secretName: secrateNameApi,
            description: 'Infrastructure Cost API Gateway API Key',
            generateSecretString: {
                generateStringKey: 'key',
                secretStringTemplate: JSON.stringify({}),
                excludeCharacters: ' %+~`#$&*()|[]{}:;<>?!\'/@"\\',
            },
        });
        this.restAPIKeyArn = secret.secretArn;
        new aws_cdk_lib_1.CfnOutput(this, 'infrastructureAPIKeyArnAtSource', {
            value: this.restAPIKeyArn ?? '',
        });
        const plan = restApi.addUsagePlan('infrastructure-cost-APi-address-usage-plan', {
            name: `${stackName}-api-usage-plan`,
            apiStages: [{ stage: restApi.deploymentStage }],
        });
        const customResourceProvider = new customeSecret_1.CustomResourceProvider(this, 'InfrastractureApiResourceProvider', aws_cdk_lib_1.Stack.of(this), secrateNameApi);
        const customResource = new cdk.CustomResource(this, 'infrastractureProviderForCustomerApi', {
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
exports.InfrastructureCostConstruct = InfrastructureCostConstruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdC1hcGktaW5mcmFzdHJ1Y3R1cmVjb3N0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnN0cnVjdC9yZXN0LWFwaS1pbmZyYXN0cnVjdHVyZWNvc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQTJDO0FBQzNDLDJDQUF1QztBQUN2QywyREFBZ0U7QUFDaEUsdURBQWlFO0FBQ2pFLCtEQUE0STtBQUM1SSxtQ0FBbUM7QUFDbkMsNkNBQStDO0FBQy9DLDJDQUEyQztBQUMzQywrRUFBMEU7QUFDMUUsNkJBQThCO0FBQzlCLCtCQUErQjtBQUMvQixpREFBc0Q7QUFDdEQscUVBQW1FO0FBQ25FLHVFQUF3RDtBQUN4RCwwREFBZ0U7QUFFaEUsTUFBYSwyQkFBNEIsU0FBUSxzQkFBUztJQUd4RCxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFDLEtBQWE7UUFDcEQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqQixNQUFNLFNBQVMsR0FBRyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDM0Msb0NBQW9DO1FBQ3BDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUV0RCxNQUFNLFdBQVcsR0FBRyxJQUFJLG9CQUFLLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRTtZQUMvQyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSw0QkFBYSxDQUFDLE1BQU0sRUFBRTtZQUM1RCxTQUFTLEVBQUUsd0JBQXdCO1NBQ3BDLENBQUMsQ0FBQztRQUNILFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQztZQUNsQyxTQUFTLEVBQUUsV0FBVztZQUN0QixZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSw0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b250ZW50IjpbIi8vIGltcG9ydCB7IENmbk91dHB1dCB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0IHsgQXR0cmlidXRlVHlwZSwgVGFibGUgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZHluYW1vZGInO1xuaW1wb3J0IHsgUnVudGltZSwgQ29kZSwgRnVuY3Rpb24gfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhJztcbmltcG9ydCB7IFJlc3RBcGksIExhbWJkYUludGVncmF0aW9uLCBSZXNwb25zZVR5cGUsIENmbk1ldGhvZCwgQ29ycywgUmVxdWVzdFZhbGlkYXRvciwgQXV0aG9yaXphdGlvblR5cGUgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXlcIjtcbmltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBTdGFjaywgQ2ZuT3V0cHV0IH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgaWFtIGZyb20gJ2F3cy1jZGstbGliL2F3cy1pYW0nO1xuaW1wb3J0IHsgQXBpQ29tbW9uUmVzcG9uc2UgfSBmcm9tICcuLi9tb2R1bGVzL0NvbW1vbi9hcGktY29tbW9uLXJlc3BvbnNlJztcbmltcG9ydCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuaW1wb3J0ICogYXMgQVdTIGZyb20gJ2F3cy1zZGsnO1xuaW1wb3J0IHsgUG9saWN5U3RhdGVtZW50IH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XG5pbXBvcnQgSW5mcmFzdHJ1Y3R1cmVDb3N0U2NoZW1hIGZyb20gJy4uL3NjaGVtYS9pbmZyYXN0cnVjdHVyZUNvc3QnXG5pbXBvcnQgeyBTZWNyZXQgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtc2VjcmV0c21hbmFnZXInO1xuaW1wb3J0IHsgQ3VzdG9tUmVzb3VyY2VQcm92aWRlciB9IGZyb20gJy4vY29tbW9uL2N1c3RvbWVTZWNyZXQnO1xuXG5leHBvcnQgY2xhc3MgSW5mcmFzdHJ1Y3R1cmVDb3N0Q29uc3RydWN0IGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgcHVibGljIHJlc3RBcGk6IFJlc3RBcGk7XG4gIHB1YmxpYyByZXN0QVBJS2V5QXJuOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsc3RhY2sgOiBTdGFjaykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG4gICAgY29uc3Qgc3RhY2tOYW1lID0gU3RhY2sub2YodGhpcykuc3RhY2tOYW1lO1xuICAgIC8vIENvbmZpZ3VyZSB0aGUgQVdTIFNESyB3aXRoIHJlZ2lvblxuICAgIEFXUy5jb25maWcudXBkYXRlKHsgcmVnaW9uOiBwcm9jZXNzLmVudi5BV1NfUkVHSU9OIH0pO1xuXG4gICAgY29uc3Qgc2F2ZUFkZHJlc3MgPSBuZXcgVGFibGUoc3RhY2ssIFwiUmVudENvc3RcIiwge1xuICAgICAgcGFydGl0aW9uS2V5OiB7IG5hbWU6IFwiUmVudElkXCIsIHR5cGU6IEF0dHJpYnV0ZVR5cGUuU1RSSU5HIH0sXG4gICAgICB0YWJsZU5hbWU6IFwiUmVudEluZnJhc3RydWN0dXJlQ29zdFwiLFxuICAgIH0pO1xuICAgIHNhdmVBZGRyZXNzLmFkZEdsb2JhbFNlY29uZGFyeUluZGV4KHtcbiAgICAgIGluZGV4TmFtZTogJ1JlbnRJbmRleCcsXG4gICAgICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogJ1JlbnRJZCcsIHR5cGU6IEF0dHJpYnV0ZVR5cGUuU1RSSU5HIH0sXG4gICAgfSk7XG4gICAgY29uc3QgaGFuZGxlckRpciA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi9saWInKTtcbiAgICBjb25zdCBnZXRSZW50Q29zdGRhdGFMYW1iZGEgPSBuZXcgRnVuY3Rpb24oc3RhY2ssIFwiR2V0UmVudElkRGV0YWlsc0xhbWJkYVwiLCB7XG4gICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18yMF9YLFxuICAgICAgY29kZTogQ29kZS5mcm9tQXNzZXQoaGFuZGxlckRpciksIFxuICAgICAgaGFuZGxlcjogJ2hhbmRsZXIvSW5mcmFzdHJ1Y3R1cmVDb3N0L2dldFJlbnRJZEhhbmRsZXIuaGFuZGxlcicsXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBUQUJMRV9OQU1FOiBzYXZlQWRkcmVzcy50YWJsZU5hbWUsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGdldFJlbnRDb3N0ZGF0YUxhbWJkYS5ncmFudFByaW5jaXBhbC5hZGRUb1ByaW5jaXBhbFBvbGljeShcbiAgICAgIG5ldyBQb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICByZXNvdXJjZXM6IFsnKiddLFxuICAgICAgICBhY3Rpb25zOiBbJ2R5bmFtb2RiOmdldEl0ZW0nLCAnc2VjcmV0c21hbmFnZXI6R2V0U2VjcmV0VmFsdWUnXSxcbiAgICAgIH0pLFxuICAgICk7XG4gICAgXG5cbiAgICBjb25zdCBzYXZlUmVudENvc3RkYXRhTGFtYmRhID0gbmV3IEZ1bmN0aW9uKHN0YWNrLCBcIlNhdmVSZW50SWREZXRhaWxzTGFtYmRhXCIsIHtcbiAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzIwX1gsIC8vIEFkanVzdCBydW50aW1lIGlmIG5lY2Vzc2FyeVxuICAgICAgY29kZTogQ29kZS5mcm9tQXNzZXQoaGFuZGxlckRpciksXG4gICAgICBoYW5kbGVyOiAnaGFuZGxlci9JbmZyYXN0cnVjdHVyZUNvc3Qvc2F2ZVJlbnRJZEhhbmRsZXIuaGFuZGxlcicsXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBUQUJMRV9OQU1FOiBzYXZlQWRkcmVzcy50YWJsZU5hbWUsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgc2F2ZVJlbnRDb3N0ZGF0YUxhbWJkYS5ncmFudFByaW5jaXBhbC5hZGRUb1ByaW5jaXBhbFBvbGljeShcbiAgICAgIG5ldyBQb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICByZXNvdXJjZXM6IFsnKiddLFxuICAgICAgICBhY3Rpb25zOiBbJ2R5bmFtb2RiOlB1dEl0ZW0nLCAnc2VjcmV0c21hbmFnZXI6R2V0U2VjcmV0VmFsdWUnXSxcbiAgICAgIH0pLFxuICAgICk7XG4gICAgZ2V0UmVudENvc3RkYXRhTGFtYmRhLnJvbGU/LmFkZE1hbmFnZWRQb2xpY3koaWFtLk1hbmFnZWRQb2xpY3kuZnJvbUF3c01hbmFnZWRQb2xpY3lOYW1lKCdBbWF6b25EeW5hbW9EQkZ1bGxBY2Nlc3MnKSk7XG4gICAgc2F2ZUFkZHJlc3MuZ3JhbnRXcml0ZURhdGEoc2F2ZVJlbnRDb3N0ZGF0YUxhbWJkYSk7XG5cbiAgICBjb25zdCByZXN0QXBpID0gbmV3IFJlc3RBcGkodGhpcywgXCJJbmZyYXN0cnVjdHVyZUNvc3RcIiwge1xuICAgICAgZGVwbG95T3B0aW9uczp7XG4gICAgICAgICAgZGF0YVRyYWNlRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICB0cmFjaW5nRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICBzdGFnZU5hbWU6ICd2MScsXG4gICAgICAgICAgLy8gbG9nZ2luZ0xldmVsOiBNZXRob2RMb2dnaW5nTGV2ZWwuSU5GTyxcbiAgICAgIH0sXG4gICAgZGVmYXVsdE1ldGhvZE9wdGlvbnM6IHtcbiAgICAgIGFwaUtleVJlcXVpcmVkOiB0cnVlLFxuICAgIH0sXG4gICAgZGVmYXVsdENvcnNQcmVmbGlnaHRPcHRpb25zOiB7XG4gICAgICBhbGxvd09yaWdpbnM6IFtcbiAgICAgICAgJyonLFxuICAgICAgICAvLyBzdXBwb3J0IGxvY2FsaG9zdCBhcyBhbiBvcmlnaW4gb25seSBpbiBub24tcHJvZCBlbnZpcm9ubWVudHNcbiAgICAgIF0sXG4gICAgICBhbGxvd0hlYWRlcnM6IENvcnMuREVGQVVMVF9IRUFERVJTLmNvbmNhdChbJ3gtYXBpLWtleSddKSxcbiAgICB9LFxuICB9KTtcbiAgXG4gICAgdGhpcy5yZXN0QXBpID0gcmVzdEFwaTtcbiAgICBjb25zdCByZW50Q29zdElkQ29zdEFwaSA9IHJlc3RBcGkucm9vdC5yZXNvdXJjZUZvclBhdGgoJ3JlbnRDb3N0SWQnKTsgLy8gaGVyZSB3ZSBjYW4gbWFrZSBtYW55IGVuZHBvaW50cyBiYXNlZCBvbiBvdXIgZnV0dXJlIG5lZWRcbiAgICBcbiAgICBjb25zdCByZXF1ZXN0VmFsaWRhdG9yID0gbmV3IFJlcXVlc3RWYWxpZGF0b3IodGhpcywgJ3JlbnQtY29zdC1yZXF1ZXN0LXZhbGlkYXRvcicsIHtcbiAgICAgIHJlc3RBcGk6IHRoaXMucmVzdEFwaSxcbiAgICAgIHZhbGlkYXRlUmVxdWVzdEJvZHk6IHRydWUsXG4gICAgICB2YWxpZGF0ZVJlcXVlc3RQYXJhbWV0ZXJzOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgY29uc3QgaW5mcmFzdHJ1Y3R1cmVDb3N0TW9kZWwgPSByZXN0QXBpLmFkZE1vZGVsKFxuICAgICAgJ3JlbnQtQ29zdC1kYXRhLW1vZGVsJyxcbiAgICAgIHtcbiAgICAgICAgc2NoZW1hOiBJbmZyYXN0cnVjdHVyZUNvc3RTY2hlbWEsIC8vIGNoYW5nZVxuICAgICAgICBkZXNjcmlwdGlvbjogJ1JlcXVlc3QgbW9kZWwgZm9yIHJlbnRDb3N0IGRhdGEgJyxcbiAgICAgICAgbW9kZWxOYW1lOiAncmVudENvc3REYXRhSW5wdXREQicsXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9LFxuICAgICk7XG4gICAgXG4gICAgcmVudENvc3RJZENvc3RBcGkuYWRkTWV0aG9kKCdHRVQnLCBuZXcgTGFtYmRhSW50ZWdyYXRpb24oZ2V0UmVudENvc3RkYXRhTGFtYmRhKSk7XG4gICAgcmVudENvc3RJZENvc3RBcGkuYWRkTWV0aG9kKCdQT1NUJywgbmV3IExhbWJkYUludGVncmF0aW9uKHNhdmVSZW50Q29zdGRhdGFMYW1iZGEpLHtcbiAgICAgIGF1dGhvcml6YXRpb25UeXBlOiBBdXRob3JpemF0aW9uVHlwZS5OT05FLFxuICAgICAgcmVxdWVzdE1vZGVsczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGluZnJhc3RydWN0dXJlQ29zdE1vZGVsLFxuICAgICAgfSxcbiAgICAgIHJlcXVlc3RWYWxpZGF0b3IsXG4gICAgfSk7XG4gICAgXG4gICAgdGhpcy5hZGRBcGlLZXkoc3RhY2tOYW1lLCByZXN0QXBpKTtcbiAgICB0aGlzLmFkZEFwaVJlc3BvbnNlcyhyZXN0QXBpKTtcblxuICAgIHJlc3RBcGkubWV0aG9kc1xuICAgICAgLmZpbHRlcihtZXRob2QgPT4gbWV0aG9kLmh0dHBNZXRob2QgPT09ICdPUFRJT05TJylcbiAgICAgIC5mb3JFYWNoKG1ldGhvZCA9PiB7XG4gICAgICAgIGNvbnN0IGNmbk1ldGhvZCA9IG1ldGhvZC5ub2RlLmRlZmF1bHRDaGlsZCBhcyBDZm5NZXRob2Q7XG4gICAgICAgIGNmbk1ldGhvZC5hcGlLZXlSZXF1aXJlZCA9IGZhbHNlO1xuICAgICAgfSk7XG4gIH07XG5cbiAgYWRkQXBpS2V5KHN0YWNrTmFtZTogc3RyaW5nLCByZXN0QXBpOiBSZXN0QXBpKSB7XG4gICAgY29uc3Qgc2VjcmF0ZU5hbWVBcGkgPSBgJHtzdGFja05hbWV9LyR7cmVzdEFwaX0vYXBpLWtleWBcbiAgICBjb25zdCBzZWNyZXQgPSBuZXcgU2VjcmV0KHRoaXMsICdBcGlTZWNyZXRJbmZyYXN0cnVjdHVyZUNvc3QnLCB7XG4gICAgICBzZWNyZXROYW1lOiBzZWNyYXRlTmFtZUFwaSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnSW5mcmFzdHJ1Y3R1cmUgQ29zdCBBUEkgR2F0ZXdheSBBUEkgS2V5JyxcbiAgICAgIGdlbmVyYXRlU2VjcmV0U3RyaW5nOiB7XG4gICAgICAgIGdlbmVyYXRlU3RyaW5nS2V5OiAna2V5JyxcbiAgICAgICAgc2VjcmV0U3RyaW5nVGVtcGxhdGU6IEpTT04uc3RyaW5naWZ5KHt9KSxcbiAgICAgICAgZXhjbHVkZUNoYXJhY3RlcnM6ICcgJSt+YCMkJiooKXxbXXt9Ojs8Pj8hXFwnL0BcIlxcXFwnLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICB0aGlzLnJlc3RBUElLZXlBcm4gPSBzZWNyZXQuc2VjcmV0QXJuO1xuICAgICAgbmV3IENmbk91dHB1dCh0aGlzLCAnaW5mcmFzdHJ1Y3R1cmVBUElLZXlBcm5BdFNvdXJjZScsIHtcbiAgICAgICAgdmFsdWU6IHRoaXMucmVzdEFQSUtleUFybiA/PyAnJyxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgcGxhbiA9IHJlc3RBcGkuYWRkVXNhZ2VQbGFuKCdpbmZyYXN0cnVjdHVyZS1jb3N0LUFQaS1hZGRyZXNzLXVzYWdlLXBsYW4nLCB7XG4gICAgICAgIG5hbWU6IGAke3N0YWNrTmFtZX0tYXBpLXVzYWdlLXBsYW5gLFxuICAgICAgICBhcGlTdGFnZXM6IFt7IHN0YWdlOiByZXN0QXBpLmRlcGxveW1lbnRTdGFnZSB9XSxcbiAgICAgIH0pO1xuICAgIGNvbnN0IGN1c3RvbVJlc291cmNlUHJvdmlkZXIgPSBuZXcgQ3VzdG9tUmVzb3VyY2VQcm92aWRlcih0aGlzLCAnSW5mcmFzdHJhY3R1cmVBcGlSZXNvdXJjZVByb3ZpZGVyJywgU3RhY2sub2YodGhpcyksIHNlY3JhdGVOYW1lQXBpKTtcbiAgICBjb25zdCBjdXN0b21SZXNvdXJjZSA9IG5ldyBjZGsuQ3VzdG9tUmVzb3VyY2UodGhpcywgJ2luZnJhc3RyYWN0dXJlUHJvdmlkZXJGb3JDdXN0b21lckFwaScsIHtcbiAgICAgIHNlcnZpY2VUb2tlbjogY3VzdG9tUmVzb3VyY2VQcm92aWRlci5zZXJ2aWNlVG9rZW4sXG4gICAgICAvLyBwcm9wZXJ0aWVzOiB7XG4gICAgICAvLyAgIFNFQ1JFVF9OQU1FOiBzZWNyZXQuc2VjcmV0TmFtZSxcbiAgICAgIC8vIH0sXG4gICAgfSk7XG4gICAgICBjb25zdCBhcGlLZXkgPSByZXN0QXBpLmFkZEFwaUtleSgnQXBpS2V5Jywge1xuICAgICAgICBhcGlLZXlOYW1lOiBzZWNyYXRlTmFtZUFwaSxcbiAgICAgICAgdmFsdWU6IGN1c3RvbVJlc291cmNlLmdldEF0dFN0cmluZygnU2VjcmV0VmFsdWUnKSxcbiAgICAgIH0pO1xuICAgICAgcGxhbi5hZGRBcGlLZXkoYXBpS2V5KTtcbiAgICB9XG5cbiAgYWRkQXBpUmVzcG9uc2VzKHJlc3RBcGk6IFJlc3RBcGkpIHtcbiAgICBjb25zdCBjb21tb25SZXNwb25zZSA9IG5ldyBBcGlDb21tb25SZXNwb25zZSgpO1xuICAgIC8vICoqKioqKioqKioqKioqKioqIEVycm9yIDQwMFxuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdCQURfUkVRVUVTVF9CT0RZJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLkJBRF9SRVFVRVNUX0JPRFksXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMCwgJ0JhZCBSZXF1ZXN0JywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIC8vICoqKioqKioqKioqKioqKioqRXJyb3IgNDAzXG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ1dBRl9GSUxURVJFRCcsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5XQUZfRklMVEVSRUQsXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG5cbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDAzLCAnRm9yYmlkZGVuJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdFWFBJUkVEX1RPS0VOJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLkVYUElSRURfVE9LRU4sXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMywgJ0ZvcmJpZGRlbicsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnSU5WQUxJRF9BUElfS0VZJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLklOVkFMSURfQVBJX0tFWSxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDAzLCAnRm9yYmlkZGVuJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdBQ0NFU1NfREVOSUVEJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLkFDQ0VTU19ERU5JRUQsXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMywgJ0ZvcmJpZGRlbicsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnSU5WQUxJRF9TSUdOQVRVUkUnLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuSU5WQUxJRF9TSUdOQVRVUkUsXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMywgJ0ZvcmJpZGRlbicsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnTUlTU0lOR19BVVRIRU5USUNBVElPTl9UT0tFTicsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5NSVNTSU5HX0FVVEhFTlRJQ0FUSU9OX1RPS0VOLFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsIC8vIENvcnJlY3RlZCBzeW50YXhcbiAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcyc6IFwiJ09QVElPTlMsIEdFVCdcIixcbiAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycyc6IFwiJ0NvbnRlbnQtVHlwZSwgQXV0aG9yaXphdGlvbidcIixcbiAgICAgICAgICAnVmFyeSc6IFwiJ09yaWdpbidcIixcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDMsICdGb3JiaWRkZW4nLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gIH0pO1xuICBcbiAgICAvLyAqKioqKioqKioqKioqKioqKkVycm9yIDV4eFxuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdERUZBVUxUXzVYWCcsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5ERUZBVUxUXzVYWCxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNTAwLCAnSW50ZXJuYWwgU2VydmVyIEVycm9yJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIC8vICoqKioqKioqKioqKioqKioqIEVycm9yIDQwMVxuICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ1VOQVVUSE9SSVpFRCcsIHtcbiAgICB0eXBlOiBSZXNwb25zZVR5cGUuVU5BVVRIT1JJWkVELFxuICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIiwgLy8gQ29ycmVjdGVkIHN5bnRheFxuICAgIH0sXG4gICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMSwgJ1VuYXV0aG9yaXplZCcsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgIH0sXG59KTtcblxuICAgIC8vICoqKioqKioqKioqKioqKioqIEVycm9yIGZvciA0MjlcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnUVVPVEFfRVhDRUVERUQnLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuUVVPVEFfRVhDRUVERUQsXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQyOSwgJ0xpbWl0IEV4Y2VlZGVkJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdUSFJPVFRMRUQnLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuVEhST1RUTEVELFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MjksICdMaW1pdCBFeGNlZWRlZCcsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxufVxuIl19