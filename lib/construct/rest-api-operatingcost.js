"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperatingcostConstruct = void 0;
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
// Import the AWS SDK module
const AWS = require("aws-sdk");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
const operationCostSchema_1 = require("../schema/operationCostSchema");
const aws_secretsmanager_1 = require("aws-cdk-lib/aws-secretsmanager");
const customeSecret_1 = require("./common/customeSecret");
class OperatingcostConstruct extends constructs_1.Construct {
    constructor(scope, id, stack) {
        super(scope, id);
        const stackName = aws_cdk_lib_1.Stack.of(this).stackName;
        // Configure the AWS SDK with region
        AWS.config.update({ region: process.env.AWS_REGION });
        const saveAddress = new aws_dynamodb_1.Table(stack, "EmployeeDetails", {
            partitionKey: { name: "EmployeeId", type: aws_dynamodb_1.AttributeType.STRING },
            tableName: "EmployeeDB",
        });
        saveAddress.addGlobalSecondaryIndex({
            indexName: 'EmployeeIdIndex',
            partitionKey: { name: 'EmployeeId', type: aws_dynamodb_1.AttributeType.STRING },
        });
        const handlerDir = path.resolve(__dirname, '../../lib');
        const getEmployeedataLambda = new aws_lambda_1.Function(stack, "GetEmployeeLambda", {
            runtime: aws_lambda_1.Runtime.NODEJS_20_X,
            code: aws_lambda_1.Code.fromAsset(handlerDir),
            handler: 'handler/OPC/getEmployeeHandler.handler',
            environment: {
                TABLE_NAME: saveAddress.tableName,
            },
        });
        getEmployeedataLambda.grantPrincipal.addToPrincipalPolicy(new aws_iam_1.PolicyStatement({
            resources: ['*'],
            actions: ['dynamodb:getItem', 'secretsmanager:GetSecretValue'],
        }));
        const saveEmployeedataLambda = new aws_lambda_1.Function(stack, "PutEmployeeLambda", {
            runtime: aws_lambda_1.Runtime.NODEJS_20_X,
            code: aws_lambda_1.Code.fromAsset(handlerDir),
            handler: 'handler/OPC/saveEmployeeHandler.handler',
            environment: {
                TABLE_NAME: saveAddress.tableName,
            },
        });
        saveEmployeedataLambda.grantPrincipal.addToPrincipalPolicy(new aws_iam_1.PolicyStatement({
            resources: ['*'],
            actions: ['dynamodb:PutItem', 'secretsmanager:GetSecretValue'],
        }));
        getEmployeedataLambda.role?.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'));
        saveAddress.grantWriteData(saveEmployeedataLambda);
        const restApi = new aws_apigateway_1.RestApi(this, "OperationCost", {
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
        const requestValidator = new aws_apigateway_1.RequestValidator(this, 'operation-cost-request-validator', {
            restApi: this.restApi,
            validateRequestBody: true,
            validateRequestParameters: true,
        });
        const operationCostModel = restApi.addModel('operation-cost-data-model', {
            schema: operationCostSchema_1.default,
            description: 'Request model for operationCost data ',
            modelName: 'OperationCostcostSchemaInput',
            contentType: 'application/json',
        });
        const EmployeeCostApi = restApi.root.resourceForPath('Employee'); // here we can make more endpoint based on out future need
        // const RentCostApi = restApi.root.resourceForPath('Rent');
        // const UtilitiesCostApi = restApi.root.resourceForPath('Utilities');
        // const MaintenanceCostApi = restApi.root.resourceForPath('Maintenance');
        // const RepairsCosteApi = restApi.root.resourceForPath('Repairs');
        EmployeeCostApi.addMethod('GET', new aws_apigateway_1.LambdaIntegration(getEmployeedataLambda));
        EmployeeCostApi.addMethod('POST', new aws_apigateway_1.LambdaIntegration(saveEmployeedataLambda), {
            authorizationType: aws_apigateway_1.AuthorizationType.NONE,
            requestModels: {
                'application/json': operationCostModel,
            },
            requestValidator,
        });
        // RentCostApi.addMethod('POST', new LambdaIntegration(saveEmployeedataLambda));
        // UtilitiesCostApi.addMethod('POST', new LambdaIntegration(saveEmployeedataLambda));
        // MaintenanceCostApi.addMethod('POST', new LambdaIntegration(saveEmployeedataLambda));
        // RepairsCosteApi.addMethod('POST', new LambdaIntegration(saveEmployeedataLambda));
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
            const cfnMethod = method.node.defaultChild;
            cfnMethod.apiKeyRequired = false;
        });
    }
    ;
    addApiKey(stackName, restApi) {
        const secrateNameApi = `${stackName}/${restApi}/api-key`;
        const secret = new aws_secretsmanager_1.Secret(this, 'OperationCostApiSecret', {
            secretName: secrateNameApi,
            description: 'Operation Cost API Gateway API Key',
            generateSecretString: {
                generateStringKey: 'key',
                secretStringTemplate: JSON.stringify({}),
                excludeCharacters: ' %+~`#$&*()|[]{}:;<>?!\'/@"\\',
            },
        });
        this.restAPIKeyArn = secret.secretArn;
        new aws_cdk_lib_1.CfnOutput(this, 'operationAPIKeyArnAtSource', {
            value: this.restAPIKeyArn ?? '',
        });
        const plan = restApi.addUsagePlan('Operation-Cost-APi--usage-plan', {
            name: `${stackName}-api-usage-plan`,
            apiStages: [{ stage: restApi.deploymentStage }],
        });
        const customResourceProvider = new customeSecret_1.CustomResourceProvider(this, 'OperationCostApiResourceProvider', aws_cdk_lib_1.Stack.of(this), secrateNameApi);
        const customResource = new cdk.CustomResource(this, 'customResourceProviderForOperationCostApi', {
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
exports.OperatingcostConstruct = OperatingcostConstruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdC1hcGktb3BlcmF0aW5nY29zdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25zdHJ1Y3QvcmVzdC1hcGktb3BlcmF0aW5nY29zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FBMkM7QUFDM0MsMkNBQXVDO0FBQ3ZDLDJEQUFnRTtBQUNoRSx1REFBaUU7QUFDakUsbUNBQW1DO0FBQ25DLCtEQUE0STtBQUM1SSw2Q0FBK0M7QUFDL0MsMkNBQTJDO0FBQzNDLCtFQUEwRTtBQUMxRSw2QkFBOEI7QUFDOUIsNEJBQTRCO0FBQzVCLCtCQUErQjtBQUMvQixpREFBc0Q7QUFDdEQsdUVBQStEO0FBQy9ELHVFQUF3RDtBQUN4RCwwREFBZ0U7QUFFaEUsTUFBYSxzQkFBdUIsU0FBUSxzQkFBUztJQUduRCxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFDLEtBQWE7UUFDcEQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqQixNQUFNLFNBQVMsR0FBRyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDM0Msb0NBQW9DO1FBQ3BDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUV0RCxNQUFNLFdBQVcsR0FBRyxJQUFJLG9CQUFLLENBQUMsS0FBSyxFQUFFLGlCQUFpQixFQUFFO1lBQ3RELFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLDRCQUFhLENBQUMsTUFBTSxFQUFFO1lBQ2hFLFNBQVMsRUFBRSxZQUFZO1NBQ3hCLENBQUMsQ0FBQztRQUNILFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQztZQUNsQyxTQUFTLEVBQUUsaUJBQWlCO1lBQzVCLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxF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QUMsV0FBVyxFQUFFO1lBQ3RDLElBQUksRUFBRSw2QkFBWSxDQUFDLFNBQVM7WUFDNUIsZUFBZSxFQUFFO2dCQUNmLDZCQUE2QixFQUFFLEtBQUs7YUFDckM7WUFDRCxTQUFTLEVBQUU7Z0JBQ1Qsa0JBQWtCLEVBQUUsY0FBYyxDQUFDLHdCQUF3QixDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLElBQUk7YUFDOUc7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUF2UkQsd0RBdVJDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHsgQ2ZuT3V0cHV0IH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBBdHRyaWJ1dGVUeXBlLCBUYWJsZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1keW5hbW9kYic7XG5pbXBvcnQgeyBSdW50aW1lLCBDb2RlLCBGdW5jdGlvbiB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEnO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IFJlc3RBcGksIExhbWJkYUludGVncmF0aW9uLCBSZXNwb25zZVR5cGUsIENmbk1ldGhvZCwgQ29ycywgQXV0aG9yaXphdGlvblR5cGUsIFJlcXVlc3RWYWxpZGF0b3IgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXlcIjtcbmltcG9ydCB7IFN0YWNrLCBDZm5PdXRwdXQgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBpYW0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XG5pbXBvcnQgeyBBcGlDb21tb25SZXNwb25zZSB9IGZyb20gJy4uL21vZHVsZXMvQ29tbW9uL2FwaS1jb21tb24tcmVzcG9uc2UnO1xuaW1wb3J0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG4vLyBJbXBvcnQgdGhlIEFXUyBTREsgbW9kdWxlXG5pbXBvcnQgKiBhcyBBV1MgZnJvbSAnYXdzLXNkayc7XG5pbXBvcnQgeyBQb2xpY3lTdGF0ZW1lbnQgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtaWFtJztcbmltcG9ydCBPcGVyYXRpb25Db3N0U2NoZW1hIGZyb20gJy4uL3NjaGVtYS9vcGVyYXRpb25Db3N0U2NoZW1hJ1xuaW1wb3J0IHsgU2VjcmV0IH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLXNlY3JldHNtYW5hZ2VyJztcbmltcG9ydCB7IEN1c3RvbVJlc291cmNlUHJvdmlkZXIgfSBmcm9tICcuL2NvbW1vbi9jdXN0b21lU2VjcmV0JztcblxuZXhwb3J0IGNsYXNzIE9wZXJhdGluZ2Nvc3RDb25zdHJ1Y3QgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICBwdWJsaWMgcmVzdEFwaTogUmVzdEFwaTtcbiAgcHVibGljIHJlc3RBUElLZXlBcm46IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZyxzdGFjayA6IFN0YWNrKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcbiAgICBjb25zdCBzdGFja05hbWUgPSBTdGFjay5vZih0aGlzKS5zdGFja05hbWU7XG4gICAgLy8gQ29uZmlndXJlIHRoZSBBV1MgU0RLIHdpdGggcmVnaW9uXG4gICAgQVdTLmNvbmZpZy51cGRhdGUoeyByZWdpb246IHByb2Nlc3MuZW52LkFXU19SRUdJT04gfSk7XG5cbiAgICBjb25zdCBzYXZlQWRkcmVzcyA9IG5ldyBUYWJsZShzdGFjaywgXCJFbXBsb3llZURldGFpbHNcIiwge1xuICAgICAgcGFydGl0aW9uS2V5OiB7IG5hbWU6IFwiRW1wbG95ZWVJZFwiLCB0eXBlOiBBdHRyaWJ1dGVUeXBlLlNUUklORyB9LFxuICAgICAgdGFibGVOYW1lOiBcIkVtcGxveWVlREJcIixcbiAgICB9KTtcbiAgICBzYXZlQWRkcmVzcy5hZGRHbG9iYWxTZWNvbmRhcnlJbmRleCh7XG4gICAgICBpbmRleE5hbWU6ICdFbXBsb3llZUlkSW5kZXgnLFxuICAgICAgcGFydGl0aW9uS2V5OiB7IG5hbWU6ICdFbXBsb3llZUlkJywgdHlwZTogQXR0cmlidXRlVHlwZS5TVFJJTkcgfSxcbiAgICB9KTtcbiAgICBjb25zdCBoYW5kbGVyRGlyID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL2xpYicpO1xuICAgIGNvbnN0IGdldEVtcGxveWVlZGF0YUxhbWJkYSA9IG5ldyBGdW5jdGlvbihzdGFjaywgXCJHZXRFbXBsb3llZUxhbWJkYVwiLCB7XG4gICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18yMF9YLFxuICAgICAgY29kZTogQ29kZS5mcm9tQXNzZXQoaGFuZGxlckRpciksIFxuICAgICAgaGFuZGxlcjogJ2hhbmRsZXIvT1BDL2dldEVtcGxveWVlSGFuZGxlci5oYW5kbGVyJyxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIFRBQkxFX05BTUU6IHNhdmVBZGRyZXNzLnRhYmxlTmFtZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgZ2V0RW1wbG95ZWVkYXRhTGFtYmRhLmdyYW50UHJpbmNpcGFsLmFkZFRvUHJpbmNpcGFsUG9saWN5KFxuICAgICAgbmV3IFBvbGljeVN0YXRlbWVudCh7XG4gICAgICAgIHJlc291cmNlczogWycqJ10sXG4gICAgICAgIGFjdGlvbnM6IFsnZHluYW1vZGI6Z2V0SXRlbScsICdzZWNyZXRzbWFuYWdlcjpHZXRTZWNyZXRWYWx1ZSddLFxuICAgICAgfSksXG4gICAgKTtcbiAgICBcblxuICAgIGNvbnN0IHNhdmVFbXBsb3llZWRhdGFMYW1iZGEgPSBuZXcgRnVuY3Rpb24oc3RhY2ssIFwiUHV0RW1wbG95ZWVMYW1iZGFcIiwge1xuICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMjBfWCwgLy8gQWRqdXN0IHJ1bnRpbWUgaWYgbmVjZXNzYXJ5XG4gICAgICBjb2RlOiBDb2RlLmZyb21Bc3NldChoYW5kbGVyRGlyKSxcbiAgICAgIGhhbmRsZXI6ICdoYW5kbGVyL09QQy9zYXZlRW1wbG95ZWVIYW5kbGVyLmhhbmRsZXInLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgVEFCTEVfTkFNRTogc2F2ZUFkZHJlc3MudGFibGVOYW1lLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHNhdmVFbXBsb3llZWRhdGFMYW1iZGEuZ3JhbnRQcmluY2lwYWwuYWRkVG9QcmluY2lwYWxQb2xpY3koXG4gICAgICBuZXcgUG9saWN5U3RhdGVtZW50KHtcbiAgICAgICAgcmVzb3VyY2VzOiBbJyonXSxcbiAgICAgICAgYWN0aW9uczogWydkeW5hbW9kYjpQdXRJdGVtJywgJ3NlY3JldHNtYW5hZ2VyOkdldFNlY3JldFZhbHVlJ10sXG4gICAgICB9KSxcbiAgICApO1xuICAgIGdldEVtcGxveWVlZGF0YUxhbWJkYS5yb2xlPy5hZGRNYW5hZ2VkUG9saWN5KGlhbS5NYW5hZ2VkUG9saWN5LmZyb21Bd3NNYW5hZ2VkUG9saWN5TmFtZSgnQW1hem9uRHluYW1vREJGdWxsQWNjZXNzJykpO1xuICAgIHNhdmVBZGRyZXNzLmdyYW50V3JpdGVEYXRhKHNhdmVFbXBsb3llZWRhdGFMYW1iZGEpO1xuXG4gICAgY29uc3QgcmVzdEFwaSA9IG5ldyBSZXN0QXBpKHRoaXMsIFwiT3BlcmF0aW9uQ29zdFwiLCB7XG4gICAgICAgIGRlcGxveU9wdGlvbnM6e1xuICAgICAgICAgICAgZGF0YVRyYWNlRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIHRyYWNpbmdFbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgc3RhZ2VOYW1lOiAndjEnLFxuICAgICAgICAgICAgLy8gbG9nZ2luZ0xldmVsOiBNZXRob2RMb2dnaW5nTGV2ZWwuSU5GTyxcbiAgICAgICAgfSxcbiAgICAgIGRlZmF1bHRNZXRob2RPcHRpb25zOiB7XG4gICAgICAgIGFwaUtleVJlcXVpcmVkOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIGRlZmF1bHRDb3JzUHJlZmxpZ2h0T3B0aW9uczoge1xuICAgICAgICBhbGxvd09yaWdpbnM6IFtcbiAgICAgICAgICAnKicsXG4gICAgICAgICAgLy8gc3VwcG9ydCBsb2NhbGhvc3QgYXMgYW4gb3JpZ2luIG9ubHkgaW4gbm9uLXByb2QgZW52aXJvbm1lbnRzXG4gICAgICAgIF0sXG4gICAgICAgIGFsbG93SGVhZGVyczogQ29ycy5ERUZBVUxUX0hFQURFUlMuY29uY2F0KFsneC1hcGkta2V5J10pLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICB0aGlzLnJlc3RBcGkgPSByZXN0QXBpO1xuICAgIGNvbnN0IHJlcXVlc3RWYWxpZGF0b3IgPSBuZXcgUmVxdWVzdFZhbGlkYXRvcih0aGlzLCAnb3BlcmF0aW9uLWNvc3QtcmVxdWVzdC12YWxpZGF0b3InLCB7XG4gICAgICByZXN0QXBpOiB0aGlzLnJlc3RBcGksXG4gICAgICB2YWxpZGF0ZVJlcXVlc3RCb2R5OiB0cnVlLFxuICAgICAgdmFsaWRhdGVSZXF1ZXN0UGFyYW1ldGVyczogdHJ1ZSxcbiAgICB9KTtcbiAgICBjb25zdCBvcGVyYXRpb25Db3N0TW9kZWwgPSByZXN0QXBpLmFkZE1vZGVsKFxuICAgICAgJ29wZXJhdGlvbi1jb3N0LWRhdGEtbW9kZWwnLFxuICAgICAge1xuICAgICAgICBzY2hlbWE6IE9wZXJhdGlvbkNvc3RTY2hlbWEsIC8vIGNoYW5nZVxuICAgICAgICBkZXNjcmlwdGlvbjogJ1JlcXVlc3QgbW9kZWwgZm9yIG9wZXJhdGlvbkNvc3QgZGF0YSAnLFxuICAgICAgICBtb2RlbE5hbWU6ICdPcGVyYXRpb25Db3N0Y29zdFNjaGVtYUlucHV0JyxcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIH0sXG4gICAgKTtcbiAgICBjb25zdCBFbXBsb3llZUNvc3RBcGkgPSByZXN0QXBpLnJvb3QucmVzb3VyY2VGb3JQYXRoKCdFbXBsb3llZScpOyAvLyBoZXJlIHdlIGNhbiBtYWtlIG1vcmUgZW5kcG9pbnQgYmFzZWQgb24gb3V0IGZ1dHVyZSBuZWVkXG4gICAgLy8gY29uc3QgUmVudENvc3RBcGkgPSByZXN0QXBpLnJvb3QucmVzb3VyY2VGb3JQYXRoKCdSZW50Jyk7XG4gICAgLy8gY29uc3QgVXRpbGl0aWVzQ29zdEFwaSA9IHJlc3RBcGkucm9vdC5yZXNvdXJjZUZvclBhdGgoJ1V0aWxpdGllcycpO1xuICAgIC8vIGNvbnN0IE1haW50ZW5hbmNlQ29zdEFwaSA9IHJlc3RBcGkucm9vdC5yZXNvdXJjZUZvclBhdGgoJ01haW50ZW5hbmNlJyk7XG4gICAgLy8gY29uc3QgUmVwYWlyc0Nvc3RlQXBpID0gcmVzdEFwaS5yb290LnJlc291cmNlRm9yUGF0aCgnUmVwYWlycycpO1xuICAgIEVtcGxveWVlQ29zdEFwaS5hZGRNZXRob2QoJ0dFVCcsIG5ldyBMYW1iZGFJbnRlZ3JhdGlvbihnZXRFbXBsb3llZWRhdGFMYW1iZGEpKTtcbiAgICBFbXBsb3llZUNvc3RBcGkuYWRkTWV0aG9kKCdQT1NUJywgbmV3IExhbWJkYUludGVncmF0aW9uKHNhdmVFbXBsb3llZWRhdGFMYW1iZGEpLHtcbiAgICAgIGF1dGhvcml6YXRpb25UeXBlOiBBdXRob3JpemF0aW9uVHlwZS5OT05FLFxuICAgICAgcmVxdWVzdE1vZGVsczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IG9wZXJhdGlvbkNvc3RNb2RlbCxcbiAgICAgIH0sXG4gICAgICByZXF1ZXN0VmFsaWRhdG9yLFxuICAgIH1cbiAgXG4gICk7XG4gICAgLy8gUmVudENvc3RBcGkuYWRkTWV0aG9kKCdQT1NUJywgbmV3IExhbWJkYUludGVncmF0aW9uKHNhdmVFbXBsb3llZWRhdGFMYW1iZGEpKTtcbiAgICAvLyBVdGlsaXRpZXNDb3N0QXBpLmFkZE1ldGhvZCgnUE9TVCcsIG5ldyBMYW1iZGFJbnRlZ3JhdGlvbihzYXZlRW1wbG95ZWVkYXRhTGFtYmRhKSk7XG4gICAgLy8gTWFpbnRlbmFuY2VDb3N0QXBpLmFkZE1ldGhvZCgnUE9TVCcsIG5ldyBMYW1iZGFJbnRlZ3JhdGlvbihzYXZlRW1wbG95ZWVkYXRhTGFtYmRhKSk7XG4gICAgLy8gUmVwYWlyc0Nvc3RlQXBpLmFkZE1ldGhvZCgnUE9TVCcsIG5ldyBMYW1iZGFJbnRlZ3JhdGlvbihzYXZlRW1wbG95ZWVkYXRhTGFtYmRhKSk7XG4gICAgXG4gICAgLy8gY29uc3QgYXBpS2V5ID0gYXBpLmFkZEFwaUtleSgnQXBpS2V5Jyx7XG5cbiAgICAvLyAgIGFwaUtleU5hbWU6ICd0dUFwaUtleScsXG4gICAgLy8gICB2YWx1ZTogJ3RoaXNJc0p1c3RTYW1wbGVBUGkxMjMnIC8vIHdlIGNhbiBnZXQgdGhlIGFwaXMgdXNpbmcgYXdzIHNlY3JldCBhbmQgZ2V0IHRoZSBrZXkgdG8gZmV0Y2ggaGVyZSBcbiAgICAvLyB9KTtcbiAgXG4gICAgLy8gY29uc3QgcGxhbiA9IGFwaS5hZGRVc2FnZVBsYW4oJ1R1X2FwaS11c2FnZS1wbGFuJywgeyAvLyB3ZSBjYW4gdXNlIHJhdGUgbGltaXQgYW5kIG90aGVyIHVzYWdlIHBsYW5zIFxuICAgIC8vICAgbmFtZTogYGFwaS11c2FnZS1wbGFuYCxcbiAgICAvLyAgIGFwaVN0YWdlczogW3sgc3RhZ2U6IGFwaS5kZXBsb3ltZW50U3RhZ2UgfV0sXG4gICAgLy8gfSk7XG5cbiAgXG4gICAgLy8gcGxhbi5hZGRBcGlLZXkoYXBpS2V5KTtcbiAgXG4gICAgLy8gbmV3IENmbk91dHB1dCh0aGlzLCBcIkFQSSBVUkxcIiwge1xuICAgIC8vICAgdmFsdWU6IGFwaS51cmwgPz8gXCJTb21ldGhpbmcgd2VudCB3cm9uZ1wiXG4gICAgLy8gfSk7XG4gICAgdGhpcy5hZGRBcGlLZXkoc3RhY2tOYW1lLCByZXN0QXBpKTtcbiAgICB0aGlzLmFkZEFwaVJlc3BvbnNlcyhyZXN0QXBpKTtcblxuICAgIHJlc3RBcGkubWV0aG9kc1xuICAgICAgLmZpbHRlcihtZXRob2QgPT4gbWV0aG9kLmh0dHBNZXRob2QgPT09ICdPUFRJT05TJylcbiAgICAgIC5mb3JFYWNoKG1ldGhvZCA9PiB7XG4gICAgICAgIGNvbnN0IGNmbk1ldGhvZCA9IG1ldGhvZC5ub2RlLmRlZmF1bHRDaGlsZCBhcyBDZm5NZXRob2Q7XG4gICAgICAgIGNmbk1ldGhvZC5hcGlLZXlSZXF1aXJlZCA9IGZhbHNlO1xuICAgICAgfSk7XG4gIH07XG5cbiAgYWRkQXBpS2V5KHN0YWNrTmFtZTogc3RyaW5nLCByZXN0QXBpOiBSZXN0QXBpKSB7XG4gICAgY29uc3Qgc2VjcmF0ZU5hbWVBcGkgPSBgJHtzdGFja05hbWV9LyR7cmVzdEFwaX0vYXBpLWtleWBcbiAgICBjb25zdCBzZWNyZXQgPSBuZXcgU2VjcmV0KHRoaXMsICdPcGVyYXRpb25Db3N0QXBpU2VjcmV0Jywge1xuICAgICAgc2VjcmV0TmFtZTogc2VjcmF0ZU5hbWVBcGksXG4gICAgICBkZXNjcmlwdGlvbjogJ09wZXJhdGlvbiBDb3N0IEFQSSBHYXRld2F5IEFQSSBLZXknLFxuICAgICAgZ2VuZXJhdGVTZWNyZXRTdHJpbmc6IHtcbiAgICAgICAgZ2VuZXJhdGVTdHJpbmdLZXk6ICdrZXknLFxuICAgICAgICBzZWNyZXRTdHJpbmdUZW1wbGF0ZTogSlNPTi5zdHJpbmdpZnkoe30pLFxuICAgICAgICBleGNsdWRlQ2hhcmFjdGVyczogJyAlK35gIyQmKigpfFtde306Ozw+PyFcXCcvQFwiXFxcXCcsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHRoaXMucmVzdEFQSUtleUFybiA9IHNlY3JldC5zZWNyZXRBcm47XG4gICAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdvcGVyYXRpb25BUElLZXlBcm5BdFNvdXJjZScsIHtcbiAgICAgICAgdmFsdWU6IHRoaXMucmVzdEFQSUtleUFybiA/PyAnJyxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgcGxhbiA9IHJlc3RBcGkuYWRkVXNhZ2VQbGFuKCdPcGVyYXRpb24tQ29zdC1BUGktLXVzYWdlLXBsYW4nLCB7XG4gICAgICAgIG5hbWU6IGAke3N0YWNrTmFtZX0tYXBpLXVzYWdlLXBsYW5gLFxuICAgICAgICBhcGlTdGFnZXM6IFt7IHN0YWdlOiByZXN0QXBpLmRlcGxveW1lbnRTdGFnZSB9XSxcbiAgICAgIH0pO1xuICAgIGNvbnN0IGN1c3RvbVJlc291cmNlUHJvdmlkZXIgPSBuZXcgQ3VzdG9tUmVzb3VyY2VQcm92aWRlcih0aGlzLCAnT3BlcmF0aW9uQ29zdEFwaVJlc291cmNlUHJvdmlkZXInLCBTdGFjay5vZih0aGlzKSwgc2VjcmF0ZU5hbWVBcGkpO1xuICAgIGNvbnN0IGN1c3RvbVJlc291cmNlID0gbmV3IGNkay5DdXN0b21SZXNvdXJjZSh0aGlzLCAnY3VzdG9tUmVzb3VyY2VQcm92aWRlckZvck9wZXJhdGlvbkNvc3RBcGknLCB7XG4gICAgICBzZXJ2aWNlVG9rZW46IGN1c3RvbVJlc291cmNlUHJvdmlkZXIuc2VydmljZVRva2VuLFxuICAgICAgLy8gcHJvcGVydGllczoge1xuICAgICAgLy8gICBTRUNSRVRfTkFNRTogc2VjcmV0LnNlY3JldE5hbWUsXG4gICAgICAvLyB9LFxuICAgIH0pO1xuICAgICAgY29uc3QgYXBpS2V5ID0gcmVzdEFwaS5hZGRBcGlLZXkoJ0FwaUtleScsIHtcbiAgICAgICAgYXBpS2V5TmFtZTogc2VjcmF0ZU5hbWVBcGksXG4gICAgICAgIHZhbHVlOiBjdXN0b21SZXNvdXJjZS5nZXRBdHRTdHJpbmcoJ1NlY3JldFZhbHVlJyksXG4gICAgICB9KTtcbiAgICAgIHBsYW4uYWRkQXBpS2V5KGFwaUtleSk7XG4gICAgfVxuXG4gIGFkZEFwaVJlc3BvbnNlcyhyZXN0QXBpOiBSZXN0QXBpKSB7XG4gICAgY29uc3QgY29tbW9uUmVzcG9uc2UgPSBuZXcgQXBpQ29tbW9uUmVzcG9uc2UoKTtcbiAgICAvLyAqKioqKioqKioqKioqKioqKiBFcnJvciA0MDBcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnQkFEX1JFUVVFU1RfQk9EWScsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5CQURfUkVRVUVTVF9CT0RZLFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDAsICdCYWQgUmVxdWVzdCcsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICAvLyAqKioqKioqKioqKioqKioqKkVycm9yIDQwM1xuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdXQUZfRklMVEVSRUQnLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuV0FGX0ZJTFRFUkVELFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMywgJ0ZvcmJpZGRlbicsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnRVhQSVJFRF9UT0tFTicsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5FWFBJUkVEX1RPS0VOLFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDMsICdGb3JiaWRkZW4nLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ0lOVkFMSURfQVBJX0tFWScsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5JTlZBTElEX0FQSV9LRVksXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMywgJ0ZvcmJpZGRlbicsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnQUNDRVNTX0RFTklFRCcsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5BQ0NFU1NfREVOSUVELFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDMsICdGb3JiaWRkZW4nLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ0lOVkFMSURfU0lHTkFUVVJFJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLklOVkFMSURfU0lHTkFUVVJFLFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDMsICdGb3JiaWRkZW4nLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ01JU1NJTkdfQVVUSEVOVElDQVRJT05fVE9LRU4nLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuTUlTU0lOR19BVVRIRU5USUNBVElPTl9UT0tFTixcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLCAvLyBDb3JyZWN0ZWQgc3ludGF4XG4gICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnOiBcIidPUFRJT05TLCBHRVQnXCIsXG4gICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnOiBcIidDb250ZW50LVR5cGUsIEF1dGhvcml6YXRpb24nXCIsXG4gICAgICAgICAgJ1ZhcnknOiBcIidPcmlnaW4nXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDAzLCAnRm9yYmlkZGVuJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICB9KTtcbiAgXG4gICAgLy8gKioqKioqKioqKioqKioqKipFcnJvciA1eHhcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnREVGQVVMVF81WFgnLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuREVGQVVMVF81WFgsXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDUwMCwgJ0ludGVybmFsIFNlcnZlciBFcnJvcicsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICAvLyAqKioqKioqKioqKioqKioqKiBFcnJvciA0MDFcbiAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdVTkFVVEhPUklaRUQnLCB7XG4gICAgdHlwZTogUmVzcG9uc2VUeXBlLlVOQVVUSE9SSVpFRCxcbiAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsIC8vIENvcnJlY3RlZCBzeW50YXhcbiAgICB9LFxuICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDEsICdVbmF1dGhvcml6ZWQnLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICB9LFxufSk7XG5cbiAgICAvLyAqKioqKioqKioqKioqKioqKiBFcnJvciBmb3IgNDI5XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ1FVT1RBX0VYQ0VFREVEJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLlFVT1RBX0VYQ0VFREVELFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MjksICdMaW1pdCBFeGNlZWRlZCcsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnVEhST1RUTEVEJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLlRIUk9UVExFRCxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDI5LCAnTGltaXQgRXhjZWVkZWQnLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==