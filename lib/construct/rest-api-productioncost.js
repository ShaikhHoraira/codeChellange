"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionCostcost = void 0;
// import { CfnOutput } from 'aws-cdk-lib';
const constructs_1 = require("constructs");
const aws_dynamodb_1 = require("aws-cdk-lib/aws-dynamodb");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const iam = require("aws-cdk-lib/aws-iam");
const api_common_response_1 = require("../modules/Common/api-common-response");
const path = require("path");
// Import the AWS SDK module
const AWS = require("aws-sdk");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
//import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
class ProductionCostcost extends constructs_1.Construct {
    constructor(scope, id, stack) {
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
            handler: 'handler/getProductionCostHandler.handler',
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
            handler: 'handler/saveProductionCostHandler.handler',
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
        const ProductionCostApi = restApi.root.resourceForPath('ProductionCost');
        // const RentCostApi = restApi.root.resourceForPath('Rent');
        // const UtilitiesCostApi = restApi.root.resourceForPath('Utilities');
        // const MaintenanceCostApi = restApi.root.resourceForPath('Maintenance');
        // const RepairsCosteApi = restApi.root.resourceForPath('Repairs');
        ProductionCostApi.addMethod('GET', new aws_apigateway_1.LambdaIntegration(getProductionCostdataLambda));
        ProductionCostApi.addMethod('POST', new aws_apigateway_1.LambdaIntegration(saveProductionCostdataLambda));
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
            const cfnMethod = method.node.defaultChild;
            cfnMethod.apiKeyRequired = false;
        });
    }
    ;
    addApiKey(stackName, restApi) {
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
exports.ProductionCostcost = ProductionCostcost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdC1hcGktcHJvZHVjdGlvbmNvc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uc3RydWN0L3Jlc3QtYXBpLXByb2R1Y3Rpb25jb3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUEyQztBQUMzQywyQ0FBdUM7QUFDdkMsMkRBQWdFO0FBQ2hFLHVEQUFpRTtBQUNqRSwrREFBdUc7QUFDdkcsNkNBQW9DO0FBQ3BDLDJDQUEyQztBQUMzQywrRUFBMEU7QUFDMUUsNkJBQThCO0FBQzlCLDRCQUE0QjtBQUM1QiwrQkFBK0I7QUFDL0IsaURBQXNEO0FBQ3RELDBEQUEwRDtBQUUxRCxNQUFhLGtCQUFtQixTQUFRLHNCQUFTO0lBRy9DLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUMsS0FBYTtRQUNwRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pCLE1BQU0sU0FBUyxHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUMzQyxvQ0FBb0M7UUFDcEMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBRXRELE1BQU0sV0FBVyxHQUFHLElBQUksb0JBQUssQ0FBQyxLQUFLLEVBQUUsdUJBQXVCLEVBQUU7WUFDNUQsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSw0QkFBYSxDQUFDLE1BQU0sRUFBRTtZQUN0RSxTQUFTLEVBQUUsa0JBQWtCO1NBQzlCLENBQUMsQ0FBQztRQUNILFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQztZQUNsQyxTQUFTLEVBQUUsdUJBQXVCO1lBQ2xDLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsNEJBQWEsQ0FBQyxNQUFNLEVBQUU7U0FDdkUs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QkFDVCxrQkFBa0IsRUFBRSxjQUFjLENBQUMsd0JBQXdCLENBQUMsR0FBRyxFQUFFLGdCQUFnQixFQUFFLG9CQUFvQixDQUFDLENBQUMsSUFBSTthQUM5RztTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQWhRRCxnREFnUUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyBDZm5PdXRwdXQgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCB7IEF0dHJpYnV0ZVR5cGUsIFRhYmxlIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWR5bmFtb2RiJztcbmltcG9ydCB7IFJ1bnRpbWUsIENvZGUsIEZ1bmN0aW9uIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYSc7XG5pbXBvcnQgeyBSZXN0QXBpLCBMYW1iZGFJbnRlZ3JhdGlvbiwgUmVzcG9uc2VUeXBlLCBDZm5NZXRob2QsIENvcnMgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXlcIjtcbmltcG9ydCB7IFN0YWNrIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgaWFtIGZyb20gJ2F3cy1jZGstbGliL2F3cy1pYW0nO1xuaW1wb3J0IHsgQXBpQ29tbW9uUmVzcG9uc2UgfSBmcm9tICcuLi9tb2R1bGVzL0NvbW1vbi9hcGktY29tbW9uLXJlc3BvbnNlJztcbmltcG9ydCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuLy8gSW1wb3J0IHRoZSBBV1MgU0RLIG1vZHVsZVxuaW1wb3J0ICogYXMgQVdTIGZyb20gJ2F3cy1zZGsnO1xuaW1wb3J0IHsgUG9saWN5U3RhdGVtZW50IH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XG4vL2ltcG9ydCB7IFNlY3JldCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1zZWNyZXRzbWFuYWdlcic7XG5cbmV4cG9ydCBjbGFzcyBQcm9kdWN0aW9uQ29zdGNvc3QgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICBwdWJsaWMgcmVzdEFwaTogUmVzdEFwaTtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLHN0YWNrIDogU3RhY2spIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuICAgIGNvbnN0IHN0YWNrTmFtZSA9IFN0YWNrLm9mKHRoaXMpLnN0YWNrTmFtZTtcbiAgICAvLyBDb25maWd1cmUgdGhlIEFXUyBTREsgd2l0aCByZWdpb25cbiAgICBBV1MuY29uZmlnLnVwZGF0ZSh7IHJlZ2lvbjogcHJvY2Vzcy5lbnYuQVdTX1JFR0lPTiB9KTtcblxuICAgIGNvbnN0IHNhdmVBZGRyZXNzID0gbmV3IFRhYmxlKHN0YWNrLCBcIlByb2R1Y3Rpb25Db3N0RGV0YWlsc1wiLCB7XG4gICAgICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogXCJQcm9kdWN0aW9uQ29zdElkXCIsIHR5cGU6IEF0dHJpYnV0ZVR5cGUuU1RSSU5HIH0sXG4gICAgICB0YWJsZU5hbWU6IFwiUHJvZHVjdGlvbkNvc3REQlwiLFxuICAgIH0pO1xuICAgIHNhdmVBZGRyZXNzLmFkZEdsb2JhbFNlY29uZGFyeUluZGV4KHtcbiAgICAgIGluZGV4TmFtZTogJ1Byb2R1Y3Rpb25Db3N0SWRJbmRleCcsXG4gICAgICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogJ1Byb2R1Y3Rpb25Db3N0SWQnLCB0eXBlOiBBdHRyaWJ1dGVUeXBlLlNUUklORyB9LFxuICAgIH0pO1xuICAgIGNvbnN0IGhhbmRsZXJEaXIgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vbGliJyk7XG4gICAgY29uc3QgZ2V0UHJvZHVjdGlvbkNvc3RkYXRhTGFtYmRhID0gbmV3IEZ1bmN0aW9uKHN0YWNrLCBcIkdldFByb2R1Y3Rpb25Db3N0TGFtYmRhXCIsIHtcbiAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzIwX1gsXG4gICAgICBjb2RlOiBDb2RlLmZyb21Bc3NldChoYW5kbGVyRGlyKSwgXG4gICAgICBoYW5kbGVyOiAnaGFuZGxlci9nZXRQcm9kdWN0aW9uQ29zdEhhbmRsZXIuaGFuZGxlcicsXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBUQUJMRV9OQU1FOiBzYXZlQWRkcmVzcy50YWJsZU5hbWUsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGdldFByb2R1Y3Rpb25Db3N0ZGF0YUxhbWJkYS5ncmFudFByaW5jaXBhbC5hZGRUb1ByaW5jaXBhbFBvbGljeShcbiAgICAgIG5ldyBQb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICByZXNvdXJjZXM6IFsnKiddLFxuICAgICAgICBhY3Rpb25zOiBbJ2R5bmFtb2RiOmdldEl0ZW0nLCAnc2VjcmV0c21hbmFnZXI6R2V0U2VjcmV0VmFsdWUnXSxcbiAgICAgIH0pLFxuICAgICk7XG4gICAgXG5cbiAgICBjb25zdCBzYXZlUHJvZHVjdGlvbkNvc3RkYXRhTGFtYmRhID0gbmV3IEZ1bmN0aW9uKHN0YWNrLCBcIlB1dFByb2R1Y3Rpb25Db3N0TGFtYmRhXCIsIHtcbiAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzIwX1gsIC8vIEFkanVzdCBydW50aW1lIGlmIG5lY2Vzc2FyeVxuICAgICAgY29kZTogQ29kZS5mcm9tQXNzZXQoaGFuZGxlckRpciksXG4gICAgICBoYW5kbGVyOiAnaGFuZGxlci9zYXZlUHJvZHVjdGlvbkNvc3RIYW5kbGVyLmhhbmRsZXInLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgVEFCTEVfTkFNRTogc2F2ZUFkZHJlc3MudGFibGVOYW1lLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHNhdmVQcm9kdWN0aW9uQ29zdGRhdGFMYW1iZGEuZ3JhbnRQcmluY2lwYWwuYWRkVG9QcmluY2lwYWxQb2xpY3koXG4gICAgICBuZXcgUG9saWN5U3RhdGVtZW50KHtcbiAgICAgICAgcmVzb3VyY2VzOiBbJyonXSxcbiAgICAgICAgYWN0aW9uczogWydkeW5hbW9kYjpQdXRJdGVtJywgJ3NlY3JldHNtYW5hZ2VyOkdldFNlY3JldFZhbHVlJ10sXG4gICAgICB9KSxcbiAgICApO1xuICAgIGdldFByb2R1Y3Rpb25Db3N0ZGF0YUxhbWJkYS5yb2xlPy5hZGRNYW5hZ2VkUG9saWN5KGlhbS5NYW5hZ2VkUG9saWN5LmZyb21Bd3NNYW5hZ2VkUG9saWN5TmFtZSgnQW1hem9uRHluYW1vREJGdWxsQWNjZXNzJykpO1xuICAgIHNhdmVBZGRyZXNzLmdyYW50V3JpdGVEYXRhKHNhdmVQcm9kdWN0aW9uQ29zdGRhdGFMYW1iZGEpO1xuXG4gICAgY29uc3QgcmVzdEFwaSA9IG5ldyBSZXN0QXBpKHRoaXMsIFwiT3BlcmF0aW9uQ29zdFwiLCB7XG4gICAgICAgIGRlcGxveU9wdGlvbnM6e1xuICAgICAgICAgICAgZGF0YVRyYWNlRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIHRyYWNpbmdFbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgc3RhZ2VOYW1lOiAndjEnLFxuICAgICAgICAgICAgLy8gbG9nZ2luZ0xldmVsOiBNZXRob2RMb2dnaW5nTGV2ZWwuSU5GTyxcbiAgICAgICAgfSxcbiAgICAgIGRlZmF1bHRNZXRob2RPcHRpb25zOiB7XG4gICAgICAgIGFwaUtleVJlcXVpcmVkOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIGRlZmF1bHRDb3JzUHJlZmxpZ2h0T3B0aW9uczoge1xuICAgICAgICBhbGxvd09yaWdpbnM6IFtcbiAgICAgICAgICAnKicsXG4gICAgICAgICAgLy8gc3VwcG9ydCBsb2NhbGhvc3QgYXMgYW4gb3JpZ2luIG9ubHkgaW4gbm9uLXByb2QgZW52aXJvbm1lbnRzXG4gICAgICAgIF0sXG4gICAgICAgIGFsbG93SGVhZGVyczogQ29ycy5ERUZBVUxUX0hFQURFUlMuY29uY2F0KFsneC1hcGkta2V5J10pLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICB0aGlzLnJlc3RBcGkgPSByZXN0QXBpO1xuICAgIFxuICAgIGNvbnN0IFByb2R1Y3Rpb25Db3N0QXBpID0gcmVzdEFwaS5yb290LnJlc291cmNlRm9yUGF0aCgnUHJvZHVjdGlvbkNvc3QnKTtcbiAgICAvLyBjb25zdCBSZW50Q29zdEFwaSA9IHJlc3RBcGkucm9vdC5yZXNvdXJjZUZvclBhdGgoJ1JlbnQnKTtcbiAgICAvLyBjb25zdCBVdGlsaXRpZXNDb3N0QXBpID0gcmVzdEFwaS5yb290LnJlc291cmNlRm9yUGF0aCgnVXRpbGl0aWVzJyk7XG4gICAgLy8gY29uc3QgTWFpbnRlbmFuY2VDb3N0QXBpID0gcmVzdEFwaS5yb290LnJlc291cmNlRm9yUGF0aCgnTWFpbnRlbmFuY2UnKTtcbiAgICAvLyBjb25zdCBSZXBhaXJzQ29zdGVBcGkgPSByZXN0QXBpLnJvb3QucmVzb3VyY2VGb3JQYXRoKCdSZXBhaXJzJyk7XG4gICAgUHJvZHVjdGlvbkNvc3RBcGkuYWRkTWV0aG9kKCdHRVQnLCBuZXcgTGFtYmRhSW50ZWdyYXRpb24oZ2V0UHJvZHVjdGlvbkNvc3RkYXRhTGFtYmRhKSk7XG4gICAgUHJvZHVjdGlvbkNvc3RBcGkuYWRkTWV0aG9kKCdQT1NUJywgbmV3IExhbWJkYUludGVncmF0aW9uKHNhdmVQcm9kdWN0aW9uQ29zdGRhdGFMYW1iZGEpKTtcbiAgICAvLyBSZW50Q29zdEFwaS5hZGRNZXRob2QoJ1BPU1QnLCBuZXcgTGFtYmRhSW50ZWdyYXRpb24oc2F2ZVByb2R1Y3Rpb25Db3N0ZGF0YUxhbWJkYSkpO1xuICAgIC8vIFV0aWxpdGllc0Nvc3RBcGkuYWRkTWV0aG9kKCdQT1NUJywgbmV3IExhbWJkYUludGVncmF0aW9uKHNhdmVQcm9kdWN0aW9uQ29zdGRhdGFMYW1iZGEpKTtcbiAgICAvLyBNYWludGVuYW5jZUNvc3RBcGkuYWRkTWV0aG9kKCdQT1NUJywgbmV3IExhbWJkYUludGVncmF0aW9uKHNhdmVQcm9kdWN0aW9uQ29zdGRhdGFMYW1iZGEpKTtcbiAgICAvLyBSZXBhaXJzQ29zdGVBcGkuYWRkTWV0aG9kKCdQT1NUJywgbmV3IExhbWJkYUludGVncmF0aW9uKHNhdmVQcm9kdWN0aW9uQ29zdGRhdGFMYW1iZGEpKTtcbiAgICBcbiAgICAvLyBjb25zdCBhcGlLZXkgPSBhcGkuYWRkQXBpS2V5KCdBcGlLZXknLHtcblxuICAgIC8vICAgYXBpS2V5TmFtZTogJ3R1QXBpS2V5JyxcbiAgICAvLyAgIHZhbHVlOiAndGhpc0lzSnVzdFNhbXBsZUFQaTEyMycgLy8gd2UgY2FuIGdldCB0aGUgYXBpcyB1c2luZyBhd3Mgc2VjcmV0IGFuZCBnZXQgdGhlIGtleSB0byBmZXRjaCBoZXJlIFxuICAgIC8vIH0pO1xuICBcbiAgICAvLyBjb25zdCBwbGFuID0gYXBpLmFkZFVzYWdlUGxhbignVHVfYXBpLXVzYWdlLXBsYW4nLCB7IC8vIHdlIGNhbiB1c2UgcmF0ZSBsaW1pdCBhbmQgb3RoZXIgdXNhZ2UgcGxhbnMgXG4gICAgLy8gICBuYW1lOiBgYXBpLXVzYWdlLXBsYW5gLFxuICAgIC8vICAgYXBpU3RhZ2VzOiBbeyBzdGFnZTogYXBpLmRlcGxveW1lbnRTdGFnZSB9XSxcbiAgICAvLyB9KTtcblxuICBcbiAgICAvLyBwbGFuLmFkZEFwaUtleShhcGlLZXkpO1xuICBcbiAgICAvLyBuZXcgQ2ZuT3V0cHV0KHRoaXMsIFwiQVBJIFVSTFwiLCB7XG4gICAgLy8gICB2YWx1ZTogYXBpLnVybCA/PyBcIlNvbWV0aGluZyB3ZW50IHdyb25nXCJcbiAgICAvLyB9KTtcbiAgICB0aGlzLmFkZEFwaUtleShzdGFja05hbWUsIHJlc3RBcGkpO1xuICAgIHRoaXMuYWRkQXBpUmVzcG9uc2VzKHJlc3RBcGkpO1xuXG4gICAgcmVzdEFwaS5tZXRob2RzXG4gICAgICAuZmlsdGVyKG1ldGhvZCA9PiBtZXRob2QuaHR0cE1ldGhvZCA9PT0gJ09QVElPTlMnKVxuICAgICAgLmZvckVhY2gobWV0aG9kID0+IHtcbiAgICAgICAgY29uc3QgY2ZuTWV0aG9kID0gbWV0aG9kLm5vZGUuZGVmYXVsdENoaWxkIGFzIENmbk1ldGhvZDtcbiAgICAgICAgY2ZuTWV0aG9kLmFwaUtleVJlcXVpcmVkID0gZmFsc2U7XG4gICAgICB9KTtcbiAgfTtcblxuYWRkQXBpS2V5KHN0YWNrTmFtZTogc3RyaW5nLCByZXN0QXBpOiBSZXN0QXBpKSB7XG4gICAgLy8gQVBJIEdhdGV3YXkgQVBJIEtleVxuICAgIC8vIGNvbnN0IHNlY3JldCA9IG5ldyBTZWNyZXQodGhpcywgJ1VzZXJDb250YWN0cy11c2VyQWRkcmVzcy1hcGktc2VjcmV0Jywge1xuICAgIC8vICAgc2VjcmV0TmFtZTogYCR7c3RhY2tOYW1lfS9hcGkta2V5YCxcbiAgICAvLyAgIGRlc2NyaXB0aW9uOiAnQVBJIEdhdGV3YXkgQVBJIEtleScsXG4gICAgLy8gICBnZW5lcmF0ZVNlY3JldFN0cmluZzoge1xuICAgIC8vICAgICBnZW5lcmF0ZVN0cmluZ0tleTogJ2tleScsXG4gICAgLy8gICAgIHNlY3JldFN0cmluZ1RlbXBsYXRlOiBKU09OLnN0cmluZ2lmeSh7fSksXG4gICAgLy8gICAgIGV4Y2x1ZGVDaGFyYWN0ZXJzOiAnICUrfmAjJCYqKCl8W117fTo7PD4/IVxcJy9AXCJcXFxcJyxcbiAgICAvLyAgIH0sXG4gICAgLy8gfSk7XG5cbiAgICBjb25zdCBhcGlLZXkgPSByZXN0QXBpLmFkZEFwaUtleSgnQXBpS2V5Jywge1xuICAgICAgYXBpS2V5TmFtZTogJ3RoaXMuX2FwaUtleU5hbWVfUHJvZHVjdGlvbicsXG4gICAgICB2YWx1ZTogJ3NlY3JldC5zZWNyZXRWYWx1ZUZyb21Kc29uRm9yUHJvZHVjdGlvbmNvc3QnLFxuICAgIH0pO1xuXG4gICAgLy8gdGhpcy5yZXN0QVBJS2V5QXJuID0gc2VjcmV0LnNlY3JldEFybjtcblxuICAgIC8vIG5ldyBDZm5PdXRwdXQodGhpcywgJ3Jlc3RBUElLZXlBcm5BdFNvdXJjZScsIHtcbiAgICAvLyAgIHZhbHVlOiB0aGlzLnJlc3RBUElLZXlBcm4gPz8gJycsXG4gICAgLy8gfSk7XG5cbiAgICBjb25zdCBwbGFuID0gcmVzdEFwaS5hZGRVc2FnZVBsYW4oJ1Byb2R1Y3Rpb25Db3N0QVBpLWFkZHJlc3MtdXNhZ2UtcGxhbicsIHtcbiAgICAgIG5hbWU6IGAke3N0YWNrTmFtZX0tYXBpLXVzYWdlLXBsYW5gLFxuICAgICAgYXBpU3RhZ2VzOiBbeyBzdGFnZTogcmVzdEFwaS5kZXBsb3ltZW50U3RhZ2UgfV0sXG4gICAgfSk7XG5cbiAgICBwbGFuLmFkZEFwaUtleShhcGlLZXkpO1xuICB9XG5cbiAgYWRkQXBpUmVzcG9uc2VzKHJlc3RBcGk6IFJlc3RBcGkpIHtcbiAgICBjb25zdCBjb21tb25SZXNwb25zZSA9IG5ldyBBcGlDb21tb25SZXNwb25zZSgpO1xuICAgIC8vICoqKioqKioqKioqKioqKioqIEVycm9yIDQwMFxuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdCQURfUkVRVUVTVF9CT0RZJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLkJBRF9SRVFVRVNUX0JPRFksXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMCwgJ0JhZCBSZXF1ZXN0JywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIC8vICoqKioqKioqKioqKioqKioqRXJyb3IgNDAzXG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ1dBRl9GSUxURVJFRCcsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5XQUZfRklMVEVSRUQsXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG5cbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDAzLCAnRm9yYmlkZGVuJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdFWFBJUkVEX1RPS0VOJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLkVYUElSRURfVE9LRU4sXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMywgJ0ZvcmJpZGRlbicsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnSU5WQUxJRF9BUElfS0VZJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLklOVkFMSURfQVBJX0tFWSxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDAzLCAnRm9yYmlkZGVuJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdBQ0NFU1NfREVOSUVEJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLkFDQ0VTU19ERU5JRUQsXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMywgJ0ZvcmJpZGRlbicsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnSU5WQUxJRF9TSUdOQVRVUkUnLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuSU5WQUxJRF9TSUdOQVRVUkUsXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMywgJ0ZvcmJpZGRlbicsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnTUlTU0lOR19BVVRIRU5USUNBVElPTl9UT0tFTicsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5NSVNTSU5HX0FVVEhFTlRJQ0FUSU9OX1RPS0VOLFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsIC8vIENvcnJlY3RlZCBzeW50YXhcbiAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcyc6IFwiJ09QVElPTlMsIEdFVCdcIixcbiAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycyc6IFwiJ0NvbnRlbnQtVHlwZSwgQXV0aG9yaXphdGlvbidcIixcbiAgICAgICAgICAnVmFyeSc6IFwiJ09yaWdpbidcIixcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDMsICdGb3JiaWRkZW4nLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gIH0pO1xuICBcbiAgICAvLyAqKioqKioqKioqKioqKioqKkVycm9yIDV4eFxuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdERUZBVUxUXzVYWCcsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5ERUZBVUxUXzVYWCxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNTAwLCAnSW50ZXJuYWwgU2VydmVyIEVycm9yJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIC8vICoqKioqKioqKioqKioqKioqIEVycm9yIDQwMVxuICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ1VOQVVUSE9SSVpFRCcsIHtcbiAgICB0eXBlOiBSZXNwb25zZVR5cGUuVU5BVVRIT1JJWkVELFxuICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIiwgLy8gQ29ycmVjdGVkIHN5bnRheFxuICAgIH0sXG4gICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMSwgJ1VuYXV0aG9yaXplZCcsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgIH0sXG59KTtcblxuICAgIC8vICoqKioqKioqKioqKioqKioqIEVycm9yIGZvciA0MjlcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnUVVPVEFfRVhDRUVERUQnLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuUVVPVEFfRVhDRUVERUQsXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQyOSwgJ0xpbWl0IEV4Y2VlZGVkJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdUSFJPVFRMRUQnLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuVEhST1RUTEVELFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MjksICdMaW1pdCBFeGNlZWRlZCcsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxufVxuIl19