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
        const ProductionCostApi = restApi.root.resourceForPath('Materials');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdC1hcGktcHJvZHVjdGlvbmNvc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uc3RydWN0L3Jlc3QtYXBpLXByb2R1Y3Rpb25jb3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUEyQztBQUMzQywyQ0FBdUM7QUFDdkMsMkRBQWdFO0FBQ2hFLHVEQUFpRTtBQUNqRSwrREFBdUc7QUFDdkcsNkNBQW9DO0FBQ3BDLDJDQUEyQztBQUMzQywrRUFBMEU7QUFDMUUsNkJBQThCO0FBQzlCLDRCQUE0QjtBQUM1QiwrQkFBK0I7QUFDL0IsaURBQXNEO0FBQ3RELDBEQUEwRDtBQUUxRCxNQUFhLGtCQUFtQixTQUFRLHNCQUFTO0lBRy9DLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUMsS0FBYTtRQUNwRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pCLE1BQU0sU0FBUyxHQUFHLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUMzQyxvQ0FBb0M7UUFDcEMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBRXRELE1BQU0sV0FBVyxHQUFHLElBQUksb0JBQUssQ0FBQyxLQUFLLEVBQUUsdUJBQXVCLEVBQUU7WUFDNUQsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSw0QkFBYSxDQUFDLE1BQU0sRUFBRTtZQUN0RSxTQUFTLEVBQUUsa0JBQWtCO1NBQzlCLENBQUMsQ0FBQztRQUNILFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQztZQUNsQyxTQUFTLEVBQUUsdUJBQXVCO1lBQ2xDLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsNEJBQWEsQ0FBQyxNQUFNLEVBQUU7U0FDdkUs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QkFDVCxrQkFBa0IsRUFBRSxjQUFjLENBQUMsd0JBQXdCLENBQUMsR0FBRyxFQUFFLGdCQUFnQixFQUFFLG9CQUFvQixDQUFDLENBQUMsSUFBSTthQUM5RztTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQWhRRCxnREFnUUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyBDZm5PdXRwdXQgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCB7IEF0dHJpYnV0ZVR5cGUsIFRhYmxlIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWR5bmFtb2RiJztcbmltcG9ydCB7IFJ1bnRpbWUsIENvZGUsIEZ1bmN0aW9uIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYSc7XG5pbXBvcnQgeyBSZXN0QXBpLCBMYW1iZGFJbnRlZ3JhdGlvbiwgUmVzcG9uc2VUeXBlLCBDZm5NZXRob2QsIENvcnMgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXlcIjtcbmltcG9ydCB7IFN0YWNrIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgaWFtIGZyb20gJ2F3cy1jZGstbGliL2F3cy1pYW0nO1xuaW1wb3J0IHsgQXBpQ29tbW9uUmVzcG9uc2UgfSBmcm9tICcuLi9tb2R1bGVzL0NvbW1vbi9hcGktY29tbW9uLXJlc3BvbnNlJztcbmltcG9ydCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuLy8gSW1wb3J0IHRoZSBBV1MgU0RLIG1vZHVsZVxuaW1wb3J0ICogYXMgQVdTIGZyb20gJ2F3cy1zZGsnO1xuaW1wb3J0IHsgUG9saWN5U3RhdGVtZW50IH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XG4vL2ltcG9ydCB7IFNlY3JldCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1zZWNyZXRzbWFuYWdlcic7XG5cbmV4cG9ydCBjbGFzcyBQcm9kdWN0aW9uQ29zdGNvc3QgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICBwdWJsaWMgcmVzdEFwaTogUmVzdEFwaTtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLHN0YWNrIDogU3RhY2spIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuICAgIGNvbnN0IHN0YWNrTmFtZSA9IFN0YWNrLm9mKHRoaXMpLnN0YWNrTmFtZTtcbiAgICAvLyBDb25maWd1cmUgdGhlIEFXUyBTREsgd2l0aCByZWdpb25cbiAgICBBV1MuY29uZmlnLnVwZGF0ZSh7IHJlZ2lvbjogcHJvY2Vzcy5lbnYuQVdTX1JFR0lPTiB9KTtcblxuICAgIGNvbnN0IHNhdmVBZGRyZXNzID0gbmV3IFRhYmxlKHN0YWNrLCBcIlByb2R1Y3Rpb25Db3N0RGV0YWlsc1wiLCB7XG4gICAgICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogXCJQcm9kdWN0aW9uQ29zdElkXCIsIHR5cGU6IEF0dHJpYnV0ZVR5cGUuU1RSSU5HIH0sXG4gICAgICB0YWJsZU5hbWU6IFwiUHJvZHVjdGlvbkNvc3REQlwiLFxuICAgIH0pO1xuICAgIHNhdmVBZGRyZXNzLmFkZEdsb2JhbFNlY29uZGFyeUluZGV4KHtcbiAgICAgIGluZGV4TmFtZTogJ1Byb2R1Y3Rpb25Db3N0SWRJbmRleCcsXG4gICAgICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogJ1Byb2R1Y3Rpb25Db3N0SWQnLCB0eXBlOiBBdHRyaWJ1dGVUeXBlLlNUUklORyB9LFxuICAgIH0pO1xuICAgIGNvbnN0IGhhbmRsZXJEaXIgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vbGliJyk7XG4gICAgY29uc3QgZ2V0UHJvZHVjdGlvbkNvc3RkYXRhTGFtYmRhID0gbmV3IEZ1bmN0aW9uKHN0YWNrLCBcIkdldFByb2R1Y3Rpb25Db3N0TGFtYmRhXCIsIHtcbiAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzIwX1gsXG4gICAgICBjb2RlOiBDb2RlLmZyb21Bc3NldChoYW5kbGVyRGlyKSwgXG4gICAgICBoYW5kbGVyOiAnaGFuZGxlci9nZXRQcm9kdWN0aW9uQ29zdEhhbmRsZXIuaGFuZGxlcicsXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBUQUJMRV9OQU1FOiBzYXZlQWRkcmVzcy50YWJsZU5hbWUsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGdldFByb2R1Y3Rpb25Db3N0ZGF0YUxhbWJkYS5ncmFudFByaW5jaXBhbC5hZGRUb1ByaW5jaXBhbFBvbGljeShcbiAgICAgIG5ldyBQb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICByZXNvdXJjZXM6IFsnKiddLFxuICAgICAgICBhY3Rpb25zOiBbJ2R5bmFtb2RiOmdldEl0ZW0nLCAnc2VjcmV0c21hbmFnZXI6R2V0U2VjcmV0VmFsdWUnXSxcbiAgICAgIH0pLFxuICAgICk7XG4gICAgXG5cbiAgICBjb25zdCBzYXZlUHJvZHVjdGlvbkNvc3RkYXRhTGFtYmRhID0gbmV3IEZ1bmN0aW9uKHN0YWNrLCBcIlB1dFByb2R1Y3Rpb25Db3N0TGFtYmRhXCIsIHtcbiAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzIwX1gsIC8vIEFkanVzdCBydW50aW1lIGlmIG5lY2Vzc2FyeVxuICAgICAgY29kZTogQ29kZS5mcm9tQXNzZXQoaGFuZGxlckRpciksXG4gICAgICBoYW5kbGVyOiAnaGFuZGxlci9zYXZlUHJvZHVjdGlvbkNvc3RIYW5kbGVyLmhhbmRsZXInLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgVEFCTEVfTkFNRTogc2F2ZUFkZHJlc3MudGFibGVOYW1lLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHNhdmVQcm9kdWN0aW9uQ29zdGRhdGFMYW1iZGEuZ3JhbnRQcmluY2lwYWwuYWRkVG9QcmluY2lwYWxQb2xpY3koXG4gICAgICBuZXcgUG9saWN5U3RhdGVtZW50KHtcbiAgICAgICAgcmVzb3VyY2VzOiBbJyonXSxcbiAgICAgICAgYWN0aW9uczogWydkeW5hbW9kYjpQdXRJdGVtJywgJ3NlY3JldHNtYW5hZ2VyOkdldFNlY3JldFZhbHVlJ10sXG4gICAgICB9KSxcbiAgICApO1xuICAgIGdldFByb2R1Y3Rpb25Db3N0ZGF0YUxhbWJkYS5yb2xlPy5hZGRNYW5hZ2VkUG9saWN5KGlhbS5NYW5hZ2VkUG9saWN5LmZyb21Bd3NNYW5hZ2VkUG9saWN5TmFtZSgnQW1hem9uRHluYW1vREJGdWxsQWNjZXNzJykpO1xuICAgIHNhdmVBZGRyZXNzLmdyYW50V3JpdGVEYXRhKHNhdmVQcm9kdWN0aW9uQ29zdGRhdGFMYW1iZGEpO1xuXG4gICAgY29uc3QgcmVzdEFwaSA9IG5ldyBSZXN0QXBpKHRoaXMsIFwiUHJvZHVjdGlvbkNvc3RcIiwge1xuICAgICAgICBkZXBsb3lPcHRpb25zOntcbiAgICAgICAgICAgIGRhdGFUcmFjZUVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB0cmFjaW5nRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIHN0YWdlTmFtZTogJ3YxJyxcbiAgICAgICAgICAgIC8vIGxvZ2dpbmdMZXZlbDogTWV0aG9kTG9nZ2luZ0xldmVsLklORk8sXG4gICAgICAgIH0sXG4gICAgICBkZWZhdWx0TWV0aG9kT3B0aW9uczoge1xuICAgICAgICBhcGlLZXlSZXF1aXJlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBkZWZhdWx0Q29yc1ByZWZsaWdodE9wdGlvbnM6IHtcbiAgICAgICAgYWxsb3dPcmlnaW5zOiBbXG4gICAgICAgICAgJyonLFxuICAgICAgICAgIC8vIHN1cHBvcnQgbG9jYWxob3N0IGFzIGFuIG9yaWdpbiBvbmx5IGluIG5vbi1wcm9kIGVudmlyb25tZW50c1xuICAgICAgICBdLFxuICAgICAgICBhbGxvd0hlYWRlcnM6IENvcnMuREVGQVVMVF9IRUFERVJTLmNvbmNhdChbJ3gtYXBpLWtleSddKSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgdGhpcy5yZXN0QXBpID0gcmVzdEFwaTtcbiAgICBcbiAgICBjb25zdCBQcm9kdWN0aW9uQ29zdEFwaSA9IHJlc3RBcGkucm9vdC5yZXNvdXJjZUZvclBhdGgoJ01hdGVyaWFscycpO1xuICAgIC8vIGNvbnN0IFJlbnRDb3N0QXBpID0gcmVzdEFwaS5yb290LnJlc291cmNlRm9yUGF0aCgnUmVudCcpO1xuICAgIC8vIGNvbnN0IFV0aWxpdGllc0Nvc3RBcGkgPSByZXN0QXBpLnJvb3QucmVzb3VyY2VGb3JQYXRoKCdVdGlsaXRpZXMnKTtcbiAgICAvLyBjb25zdCBNYWludGVuYW5jZUNvc3RBcGkgPSByZXN0QXBpLnJvb3QucmVzb3VyY2VGb3JQYXRoKCdNYWludGVuYW5jZScpO1xuICAgIC8vIGNvbnN0IFJlcGFpcnNDb3N0ZUFwaSA9IHJlc3RBcGkucm9vdC5yZXNvdXJjZUZvclBhdGgoJ1JlcGFpcnMnKTtcbiAgICBQcm9kdWN0aW9uQ29zdEFwaS5hZGRNZXRob2QoJ0dFVCcsIG5ldyBMYW1iZGFJbnRlZ3JhdGlvbihnZXRQcm9kdWN0aW9uQ29zdGRhdGFMYW1iZGEpKTtcbiAgICBQcm9kdWN0aW9uQ29zdEFwaS5hZGRNZXRob2QoJ1BPU1QnLCBuZXcgTGFtYmRhSW50ZWdyYXRpb24oc2F2ZVByb2R1Y3Rpb25Db3N0ZGF0YUxhbWJkYSkpO1xuICAgIC8vIFJlbnRDb3N0QXBpLmFkZE1ldGhvZCgnUE9TVCcsIG5ldyBMYW1iZGFJbnRlZ3JhdGlvbihzYXZlUHJvZHVjdGlvbkNvc3RkYXRhTGFtYmRhKSk7XG4gICAgLy8gVXRpbGl0aWVzQ29zdEFwaS5hZGRNZXRob2QoJ1BPU1QnLCBuZXcgTGFtYmRhSW50ZWdyYXRpb24oc2F2ZVByb2R1Y3Rpb25Db3N0ZGF0YUxhbWJkYSkpO1xuICAgIC8vIE1haW50ZW5hbmNlQ29zdEFwaS5hZGRNZXRob2QoJ1BPU1QnLCBuZXcgTGFtYmRhSW50ZWdyYXRpb24oc2F2ZVByb2R1Y3Rpb25Db3N0ZGF0YUxhbWJkYSkpO1xuICAgIC8vIFJlcGFpcnNDb3N0ZUFwaS5hZGRNZXRob2QoJ1BPU1QnLCBuZXcgTGFtYmRhSW50ZWdyYXRpb24oc2F2ZVByb2R1Y3Rpb25Db3N0ZGF0YUxhbWJkYSkpO1xuICAgIFxuICAgIC8vIGNvbnN0IGFwaUtleSA9IGFwaS5hZGRBcGlLZXkoJ0FwaUtleScse1xuXG4gICAgLy8gICBhcGlLZXlOYW1lOiAndHVBcGlLZXknLFxuICAgIC8vICAgdmFsdWU6ICd0aGlzSXNKdXN0U2FtcGxlQVBpMTIzJyAvLyB3ZSBjYW4gZ2V0IHRoZSBhcGlzIHVzaW5nIGF3cyBzZWNyZXQgYW5kIGdldCB0aGUga2V5IHRvIGZldGNoIGhlcmUgXG4gICAgLy8gfSk7XG4gIFxuICAgIC8vIGNvbnN0IHBsYW4gPSBhcGkuYWRkVXNhZ2VQbGFuKCdUdV9hcGktdXNhZ2UtcGxhbicsIHsgLy8gd2UgY2FuIHVzZSByYXRlIGxpbWl0IGFuZCBvdGhlciB1c2FnZSBwbGFucyBcbiAgICAvLyAgIG5hbWU6IGBhcGktdXNhZ2UtcGxhbmAsXG4gICAgLy8gICBhcGlTdGFnZXM6IFt7IHN0YWdlOiBhcGkuZGVwbG95bWVudFN0YWdlIH1dLFxuICAgIC8vIH0pO1xuXG4gIFxuICAgIC8vIHBsYW4uYWRkQXBpS2V5KGFwaUtleSk7XG4gIFxuICAgIC8vIG5ldyBDZm5PdXRwdXQodGhpcywgXCJBUEkgVVJMXCIsIHtcbiAgICAvLyAgIHZhbHVlOiBhcGkudXJsID8/IFwiU29tZXRoaW5nIHdlbnQgd3JvbmdcIlxuICAgIC8vIH0pO1xuICAgIHRoaXMuYWRkQXBpS2V5KHN0YWNrTmFtZSwgcmVzdEFwaSk7XG4gICAgdGhpcy5hZGRBcGlSZXNwb25zZXMocmVzdEFwaSk7XG5cbiAgICByZXN0QXBpLm1ldGhvZHNcbiAgICAgIC5maWx0ZXIobWV0aG9kID0+IG1ldGhvZC5odHRwTWV0aG9kID09PSAnT1BUSU9OUycpXG4gICAgICAuZm9yRWFjaChtZXRob2QgPT4ge1xuICAgICAgICBjb25zdCBjZm5NZXRob2QgPSBtZXRob2Qubm9kZS5kZWZhdWx0Q2hpbGQgYXMgQ2ZuTWV0aG9kO1xuICAgICAgICBjZm5NZXRob2QuYXBpS2V5UmVxdWlyZWQgPSBmYWxzZTtcbiAgICAgIH0pO1xuICB9O1xuXG5hZGRBcGlLZXkoc3RhY2tOYW1lOiBzdHJpbmcsIHJlc3RBcGk6IFJlc3RBcGkpIHtcbiAgICAvLyBBUEkgR2F0ZXdheSBBUEkgS2V5XG4gICAgLy8gY29uc3Qgc2VjcmV0ID0gbmV3IFNlY3JldCh0aGlzLCAnVXNlckNvbnRhY3RzLXVzZXJBZGRyZXNzLWFwaS1zZWNyZXQnLCB7XG4gICAgLy8gICBzZWNyZXROYW1lOiBgJHtzdGFja05hbWV9L2FwaS1rZXlgLFxuICAgIC8vICAgZGVzY3JpcHRpb246ICdBUEkgR2F0ZXdheSBBUEkgS2V5JyxcbiAgICAvLyAgIGdlbmVyYXRlU2VjcmV0U3RyaW5nOiB7XG4gICAgLy8gICAgIGdlbmVyYXRlU3RyaW5nS2V5OiAna2V5JyxcbiAgICAvLyAgICAgc2VjcmV0U3RyaW5nVGVtcGxhdGU6IEpTT04uc3RyaW5naWZ5KHt9KSxcbiAgICAvLyAgICAgZXhjbHVkZUNoYXJhY3RlcnM6ICcgJSt+YCMkJiooKXxbXXt9Ojs8Pj8hXFwnL0BcIlxcXFwnLFxuICAgIC8vICAgfSxcbiAgICAvLyB9KTtcblxuICAgIGNvbnN0IGFwaUtleSA9IHJlc3RBcGkuYWRkQXBpS2V5KCdBcGlLZXknLCB7XG4gICAgICBhcGlLZXlOYW1lOiAndGhpcy5fYXBpS2V5TmFtZV9Qcm9kdWN0aW9uJyxcbiAgICAgIHZhbHVlOiAnc2VjcmV0LnNlY3JldFZhbHVlRnJvbUpzb25Gb3JQcm9kdWN0aW9uY29zdCcsXG4gICAgfSk7XG5cbiAgICAvLyB0aGlzLnJlc3RBUElLZXlBcm4gPSBzZWNyZXQuc2VjcmV0QXJuO1xuXG4gICAgLy8gbmV3IENmbk91dHB1dCh0aGlzLCAncmVzdEFQSUtleUFybkF0U291cmNlJywge1xuICAgIC8vICAgdmFsdWU6IHRoaXMucmVzdEFQSUtleUFybiA/PyAnJyxcbiAgICAvLyB9KTtcblxuICAgIGNvbnN0IHBsYW4gPSByZXN0QXBpLmFkZFVzYWdlUGxhbignUHJvZHVjdGlvbkNvc3RBUGktYWRkcmVzcy11c2FnZS1wbGFuJywge1xuICAgICAgbmFtZTogYCR7c3RhY2tOYW1lfS1hcGktdXNhZ2UtcGxhbmAsXG4gICAgICBhcGlTdGFnZXM6IFt7IHN0YWdlOiByZXN0QXBpLmRlcGxveW1lbnRTdGFnZSB9XSxcbiAgICB9KTtcblxuICAgIHBsYW4uYWRkQXBpS2V5KGFwaUtleSk7XG4gIH1cblxuICBhZGRBcGlSZXNwb25zZXMocmVzdEFwaTogUmVzdEFwaSkge1xuICAgIGNvbnN0IGNvbW1vblJlc3BvbnNlID0gbmV3IEFwaUNvbW1vblJlc3BvbnNlKCk7XG4gICAgLy8gKioqKioqKioqKioqKioqKiogRXJyb3IgNDAwXG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ0JBRF9SRVFVRVNUX0JPRFknLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuQkFEX1JFUVVFU1RfQk9EWSxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDAwLCAnQmFkIFJlcXVlc3QnLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgLy8gKioqKioqKioqKioqKioqKipFcnJvciA0MDNcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnV0FGX0ZJTFRFUkVEJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLldBRl9GSUxURVJFRCxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcblxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDMsICdGb3JiaWRkZW4nLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ0VYUElSRURfVE9LRU4nLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuRVhQSVJFRF9UT0tFTixcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDAzLCAnRm9yYmlkZGVuJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdJTlZBTElEX0FQSV9LRVknLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuSU5WQUxJRF9BUElfS0VZLFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDMsICdGb3JiaWRkZW4nLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ0FDQ0VTU19ERU5JRUQnLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuQUNDRVNTX0RFTklFRCxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDAzLCAnRm9yYmlkZGVuJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdJTlZBTElEX1NJR05BVFVSRScsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5JTlZBTElEX1NJR05BVFVSRSxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDAzLCAnRm9yYmlkZGVuJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdNSVNTSU5HX0FVVEhFTlRJQ0FUSU9OX1RPS0VOJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLk1JU1NJTkdfQVVUSEVOVElDQVRJT05fVE9LRU4sXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIiwgLy8gQ29ycmVjdGVkIHN5bnRheFxuICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJzogXCInT1BUSU9OUywgR0VUJ1wiLFxuICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJzogXCInQ29udGVudC1UeXBlLCBBdXRob3JpemF0aW9uJ1wiLFxuICAgICAgICAgICdWYXJ5JzogXCInT3JpZ2luJ1wiLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMywgJ0ZvcmJpZGRlbicsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgfSk7XG4gIFxuICAgIC8vICoqKioqKioqKioqKioqKioqRXJyb3IgNXh4XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ0RFRkFVTFRfNVhYJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLkRFRkFVTFRfNVhYLFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig1MDAsICdJbnRlcm5hbCBTZXJ2ZXIgRXJyb3InLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgLy8gKioqKioqKioqKioqKioqKiogRXJyb3IgNDAxXG4gICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnVU5BVVRIT1JJWkVEJywge1xuICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5VTkFVVEhPUklaRUQsXG4gICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLCAvLyBDb3JyZWN0ZWQgc3ludGF4XG4gICAgfSxcbiAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDAxLCAnVW5hdXRob3JpemVkJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgfSxcbn0pO1xuXG4gICAgLy8gKioqKioqKioqKioqKioqKiogRXJyb3IgZm9yIDQyOVxuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdRVU9UQV9FWENFRURFRCcsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5RVU9UQV9FWENFRURFRCxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDI5LCAnTGltaXQgRXhjZWVkZWQnLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ1RIUk9UVExFRCcsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5USFJPVFRMRUQsXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQyOSwgJ0xpbWl0IEV4Y2VlZGVkJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG59XG4iXX0=