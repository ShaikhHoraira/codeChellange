"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogisticCostConstruct = void 0;
// import { CfnOutput } from 'aws-cdk-lib';
const constructs_1 = require("constructs");
const aws_dynamodb_1 = require("aws-cdk-lib/aws-dynamodb");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const cdk = require("aws-cdk-lib");
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
// import { Stack, CfnOutput } from 'aws-cdk-lib';
const aws_cdk_lib_1 = require("aws-cdk-lib");
const iam = require("aws-cdk-lib/aws-iam");
const api_common_response_1 = require("../modules/Common/api-common-response");
const path = require("path");
const AWS = require("aws-sdk");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
const logisticCostSchema_1 = require("../schema/logisticCostSchema");
// import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
const customeSecret_1 = require("./common/customeSecret");
class LogisticCostConstruct extends constructs_1.Construct {
    constructor(scope, id, stack) {
        super(scope, id);
        const stackName = aws_cdk_lib_1.Stack.of(this).stackName;
        AWS.config.update({ region: process.env.AWS_REGION });
        const saveAddress = new aws_dynamodb_1.Table(stack, "TransportationDetails", {
            partitionKey: { name: "TransportationId", type: aws_dynamodb_1.AttributeType.STRING },
            tableName: "LogisticTransportationDB",
        });
        saveAddress.addGlobalSecondaryIndex({
            indexName: 'TransportationIndex',
            partitionKey: { name: 'TransportationId', type: aws_dynamodb_1.AttributeType.STRING },
        });
        //Lambda GET
        const handlerDir = path.resolve(__dirname, '../../lib');
        const getTransportationLambda = new aws_lambda_1.Function(stack, "GetTransportationLambda", {
            runtime: aws_lambda_1.Runtime.NODEJS_20_X,
            code: aws_lambda_1.Code.fromAsset(handlerDir),
            handler: 'handler/TransportationCost/getTransportationCostHandler.handler',
            environment: {
                TABLE_NAME: saveAddress.tableName,
            },
        });
        getTransportationLambda.grantPrincipal.addToPrincipalPolicy(new aws_iam_1.PolicyStatement({
            resources: ['*'],
            actions: ['dynamodb:getItem', 'secretsmanager:GetSecretValue'],
        }));
        // Lambda POST
        const saveTransportationLambda = new aws_lambda_1.Function(stack, "PutTransportationLambda", {
            runtime: aws_lambda_1.Runtime.NODEJS_20_X,
            code: aws_lambda_1.Code.fromAsset(handlerDir),
            handler: 'handler/TransportationCost/saveTransportationCostHandler.handler',
            environment: {
                TABLE_NAME: saveAddress.tableName,
            },
        });
        saveTransportationLambda.grantPrincipal.addToPrincipalPolicy(new aws_iam_1.PolicyStatement({
            resources: ['*'],
            actions: ['dynamodb:PutItem', 'secretsmanager:GetSecretValue'],
        }));
        getTransportationLambda.role?.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'));
        saveAddress.grantWriteData(saveTransportationLambda);
        const LogisticCostrestApi = new aws_apigateway_1.RestApi(this, "LogisticCost", {
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
        this.LogisticRestApi = LogisticCostrestApi;
        const requestValidator = new aws_apigateway_1.RequestValidator(this, 'logistic-cost-request-validator', {
            restApi: this.LogisticRestApi,
            validateRequestBody: true,
            validateRequestParameters: true,
        });
        const logisticCostModel = LogisticCostrestApi.addModel('logistic-cost-data-model', {
            schema: logisticCostSchema_1.default,
            description: 'Request model for logisticCost data ',
            modelName: 'LogisticCostcostSchemaInput',
            contentType: 'application/json',
        });
        const EmployeeCostApi = LogisticCostrestApi.root.resourceForPath('transportationCost'); // here we can make more endpoint based on out future need
        // const RentCostApi = restApi.root.resourceForPath('Rent');
        // const UtilitiesCostApi = restApi.root.resourceForPath('Utilities');
        // const MaintenanceCostApi = restApi.root.resourceForPath('Maintenance');
        // const RepairsCosteApi = restApi.root.resourceForPath('Repairs');
        EmployeeCostApi.addMethod('GET', new aws_apigateway_1.LambdaIntegration(getTransportationLambda));
        EmployeeCostApi.addMethod('POST', new aws_apigateway_1.LambdaIntegration(saveTransportationLambda), {
            authorizationType: aws_apigateway_1.AuthorizationType.NONE,
            requestModels: {
                'application/json': logisticCostModel,
            },
            requestValidator,
        });
        // RentCostApi.addMethod('POST', new LambdaIntegration(saveEmployeedataLambda));
        // UtilitiesCostApi.addMethod('POST', new LambdaIntegration(saveEmployeedataLambda));
        // MaintenanceCostApi.addMethod('POST', new LambdaIntegration(saveEmployeedataLambda));
        // RepairsCosteApi.addMethod('POST', new LambdaIntegration(saveEmployeedataLambda));
        this.addApiKey(stackName, LogisticCostrestApi);
        this.addApiResponses(LogisticCostrestApi);
        LogisticCostrestApi.methods
            .filter(method => method.httpMethod === 'OPTIONS')
            .forEach(method => {
            const cfnMethod = method.node.defaultChild;
            cfnMethod.apiKeyRequired = false;
        });
    }
    ;
    addApiKey(stackName, LogisticCostrestApi) {
        const secrateNameApi = `${stackName}/${this.LogisticRestApi}/api-key`;
        // const secret = new Secret(this, 'LogisticCostApiSecret', {
        //   secretName: secrateNameApi,
        //   description: 'Logistic Cost API Gateway API Key',
        //   generateSecretString: {
        //     generateStringKey: 'key',
        //     secretStringTemplate: JSON.stringify({}),
        //     excludeCharacters: ' %+~`#$&*()|[]{}:;<>?!\'/@"\\',
        //   },
        // });
        // this.restAPIKeyArn = secret.secretArn;
        //   new CfnOutput(this, 'logisticAPIKeyArnAtSource', {
        //     value: this.restAPIKeyArn ?? '',
        //   });
        const plan = LogisticCostrestApi.addUsagePlan('Logistic-Cost-APi--usage-plan', {
            name: `${stackName}-logistic-api-usage-plan`,
            apiStages: [{ stage: LogisticCostrestApi.deploymentStage }],
        });
        const customResourceProvider = new customeSecret_1.CustomResourceProvider(this, 'LogisticCostApiResourceProvider', aws_cdk_lib_1.Stack.of(this), secrateNameApi);
        const customResource = new cdk.CustomResource(this, 'customResourceProviderForLogisticCostApi', {
            serviceToken: customResourceProvider.serviceToken,
            // properties: {
            //   SECRET_NAME: secret.secretName,
            // },
        });
        const apiKey = LogisticCostrestApi.addApiKey('ApiKey', {
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
exports.LogisticCostConstruct = LogisticCostConstruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdC1hcGktbG9naXN0aWNzY29zdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25zdHJ1Y3QvcmVzdC1hcGktbG9naXN0aWNzY29zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FBMkM7QUFDM0MsMkNBQXVDO0FBQ3ZDLDJEQUFnRTtBQUNoRSx1REFBaUU7QUFDakUsbUNBQW1DO0FBQ25DLCtEQUE0STtBQUM1SSxrREFBa0Q7QUFDbEQsNkNBQW9DO0FBQ3BDLDJDQUEyQztBQUMzQywrRUFBMEU7QUFDMUUsNkJBQThCO0FBQzlCLCtCQUErQjtBQUMvQixpREFBc0Q7QUFDdEQscUVBQTZEO0FBQzdELDJEQUEyRDtBQUMzRCwwREFBZ0U7QUFFaEUsTUFBYSxxQkFBc0IsU0FBUSxzQkFBUztJQUdsRCxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFDLEtBQWE7UUFDcEQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqQixNQUFNLFNBQVMsR0FBRyxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFFM0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBRXRELE1BQU0sV0FBVyxHQUFHLElBQUksb0JBQUssQ0FBQyxLQUFLLEVBQUUsdUJBQXVCLEVBQUU7WUFDNUQsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSw0QkFBYSxDQUFDLE1BQU0sRUFBRTtZQUN0RSxTQUFTLEVBQUUsMEJBQTBCO1NBQ3RDLENBQUMsQ0FBQztRQUNILFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQztZQUNsQyxTQUFTLEVBQUUscUJBQXFCO1lBQ2hDLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsNEJB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LG9CQUFvQixDQUFDLENBQUMsSUFBSTthQUNySDtTQUNGLENBQUMsQ0FBQztRQUNILDhCQUE4QjtRQUMvQixPQUFPLENBQUMsa0JBQWtCLENBQUMsY0FBYyxFQUFFO1lBQzFDLElBQUksRUFBRSw2QkFBWSxDQUFDLFlBQVk7WUFDL0IsZUFBZSxFQUFFO2dCQUNiLDZCQUE2QixFQUFFLEtBQUssRUFBRSxtQkFBbUI7YUFDNUQ7WUFDRCxTQUFTLEVBQUU7Z0JBQ1Asa0JBQWtCLEVBQUUsY0FBYyxDQUFDLHdCQUF3QixDQUFDLEdBQUcsRUFBRSxjQUFjLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyxJQUFJO2FBQzlHO1NBQ0osQ0FBQyxDQUFDO1FBRUMsa0NBQWtDO1FBQ2xDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsRUFBRTtZQUMzQyxJQUFJLEVBQUUsNkJBQVksQ0FBQyxjQUFjO1lBQ2pDLGVBQWUsRUFBRTtnQkFDZiw2QkFBNkIsRUFBRSxLQUFLO2FBQ3JDO1lBQ0QsU0FBUyxFQUFFO2dCQUNULGtCQUFrQixFQUFFLGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyxJQUFJO2FBQzlHO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRTtZQUN0QyxJQUFJLEVBQUUsNkJBQVksQ0FBQyxTQUFTO1lBQzVCLGVBQWUsRUFBRTtnQkFDZiw2QkFBNkIsRUFBRSxLQUFLO2FBQ3JDO1lBQ0QsU0FBUyxFQUFFO2dCQUNULGtCQUFrQixFQUFFLGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyxJQUFJO2FBQzlHO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBeFFELHNEQXdRQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IENmbk91dHB1dCB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0IHsgQXR0cmlidXRlVHlwZSwgVGFibGUgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZHluYW1vZGInO1xuaW1wb3J0IHsgUnVudGltZSwgQ29kZSwgRnVuY3Rpb24gfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhJztcbmltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBSZXN0QXBpLCBMYW1iZGFJbnRlZ3JhdGlvbiwgUmVzcG9uc2VUeXBlLCBDZm5NZXRob2QsIENvcnMsIEF1dGhvcml6YXRpb25UeXBlLCBSZXF1ZXN0VmFsaWRhdG9yIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5XCI7XG4vLyBpbXBvcnQgeyBTdGFjaywgQ2ZuT3V0cHV0IH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgU3RhY2sgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBpYW0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XG5pbXBvcnQgeyBBcGlDb21tb25SZXNwb25zZSB9IGZyb20gJy4uL21vZHVsZXMvQ29tbW9uL2FwaS1jb21tb24tcmVzcG9uc2UnO1xuaW1wb3J0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5pbXBvcnQgKiBhcyBBV1MgZnJvbSAnYXdzLXNkayc7XG5pbXBvcnQgeyBQb2xpY3lTdGF0ZW1lbnQgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtaWFtJztcbmltcG9ydCBsb2dpc3RpY0Nvc3RTY2hlbWEgZnJvbSAnLi4vc2NoZW1hL2xvZ2lzdGljQ29zdFNjaGVtYSdcbi8vIGltcG9ydCB7IFNlY3JldCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1zZWNyZXRzbWFuYWdlcic7XG5pbXBvcnQgeyBDdXN0b21SZXNvdXJjZVByb3ZpZGVyIH0gZnJvbSAnLi9jb21tb24vY3VzdG9tZVNlY3JldCc7XG5cbmV4cG9ydCBjbGFzcyBMb2dpc3RpY0Nvc3RDb25zdHJ1Y3QgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICBwdWJsaWMgTG9naXN0aWNSZXN0QXBpOiBSZXN0QXBpO1xuICBwdWJsaWMgcmVzdEFQSUtleUFybjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLHN0YWNrIDogU3RhY2spIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuICAgIGNvbnN0IHN0YWNrTmFtZSA9IFN0YWNrLm9mKHRoaXMpLnN0YWNrTmFtZTtcblxuICAgIEFXUy5jb25maWcudXBkYXRlKHsgcmVnaW9uOiBwcm9jZXNzLmVudi5BV1NfUkVHSU9OIH0pO1xuXG4gICAgY29uc3Qgc2F2ZUFkZHJlc3MgPSBuZXcgVGFibGUoc3RhY2ssIFwiVHJhbnNwb3J0YXRpb25EZXRhaWxzXCIsIHtcbiAgICAgIHBhcnRpdGlvbktleTogeyBuYW1lOiBcIlRyYW5zcG9ydGF0aW9uSWRcIiwgdHlwZTogQXR0cmlidXRlVHlwZS5TVFJJTkcgfSxcbiAgICAgIHRhYmxlTmFtZTogXCJMb2dpc3RpY1RyYW5zcG9ydGF0aW9uREJcIixcbiAgICB9KTtcbiAgICBzYXZlQWRkcmVzcy5hZGRHbG9iYWxTZWNvbmRhcnlJbmRleCh7XG4gICAgICBpbmRleE5hbWU6ICdUcmFuc3BvcnRhdGlvbkluZGV4JyxcbiAgICAgIHBhcnRpdGlvbktleTogeyBuYW1lOiAnVHJhbnNwb3J0YXRpb25JZCcsIHR5cGU6IEF0dHJpYnV0ZVR5cGUuU1RSSU5HIH0sXG4gICAgfSk7XG5cbiAgICAvL0xhbWJkYSBHRVRcbiAgICBjb25zdCBoYW5kbGVyRGlyID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL2xpYicpO1xuICAgIGNvbnN0IGdldFRyYW5zcG9ydGF0aW9uTGFtYmRhID0gbmV3IEZ1bmN0aW9uKHN0YWNrLCBcIkdldFRyYW5zcG9ydGF0aW9uTGFtYmRhXCIsIHtcbiAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzIwX1gsXG4gICAgICBjb2RlOiBDb2RlLmZyb21Bc3NldChoYW5kbGVyRGlyKSwgXG4gICAgICBoYW5kbGVyOiAnaGFuZGxlci9UcmFuc3BvcnRhdGlvbkNvc3QvZ2V0VHJhbnNwb3J0YXRpb25Db3N0SGFuZGxlci5oYW5kbGVyJywvL1xuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgVEFCTEVfTkFNRTogc2F2ZUFkZHJlc3MudGFibGVOYW1lLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBnZXRUcmFuc3BvcnRhdGlvbkxhbWJkYS5ncmFudFByaW5jaXBhbC5hZGRUb1ByaW5jaXBhbFBvbGljeShcbiAgICAgIG5ldyBQb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICByZXNvdXJjZXM6IFsnKiddLFxuICAgICAgICBhY3Rpb25zOiBbJ2R5bmFtb2RiOmdldEl0ZW0nLCAnc2VjcmV0c21hbmFnZXI6R2V0U2VjcmV0VmFsdWUnXSxcbiAgICAgIH0pLFxuICAgICk7XG4gICAgXG4gICAgLy8gTGFtYmRhIFBPU1RcbiAgICBjb25zdCBzYXZlVHJhbnNwb3J0YXRpb25MYW1iZGEgPSBuZXcgRnVuY3Rpb24oc3RhY2ssIFwiUHV0VHJhbnNwb3J0YXRpb25MYW1iZGFcIiwge1xuICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMjBfWCwgLy8gQWRqdXN0IHJ1bnRpbWUgaWYgbmVjZXNzYXJ5XG4gICAgICBjb2RlOiBDb2RlLmZyb21Bc3NldChoYW5kbGVyRGlyKSxcbiAgICAgIGhhbmRsZXI6ICdoYW5kbGVyL1RyYW5zcG9ydGF0aW9uQ29zdC9zYXZlVHJhbnNwb3J0YXRpb25Db3N0SGFuZGxlci5oYW5kbGVyJyxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIFRBQkxFX05BTUU6IHNhdmVBZGRyZXNzLnRhYmxlTmFtZSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBzYXZlVHJhbnNwb3J0YXRpb25MYW1iZGEuZ3JhbnRQcmluY2lwYWwuYWRkVG9QcmluY2lwYWxQb2xpY3koXG4gICAgICBuZXcgUG9saWN5U3RhdGVtZW50KHtcbiAgICAgICAgcmVzb3VyY2VzOiBbJyonXSxcbiAgICAgICAgYWN0aW9uczogWydkeW5hbW9kYjpQdXRJdGVtJywgJ3NlY3JldHNtYW5hZ2VyOkdldFNlY3JldFZhbHVlJ10sXG4gICAgICB9KSxcbiAgICApO1xuICAgIGdldFRyYW5zcG9ydGF0aW9uTGFtYmRhLnJvbGU/LmFkZE1hbmFnZWRQb2xpY3koaWFtLk1hbmFnZWRQb2xpY3kuZnJvbUF3c01hbmFnZWRQb2xpY3lOYW1lKCdBbWF6b25EeW5hbW9EQkZ1bGxBY2Nlc3MnKSk7XG4gICAgc2F2ZUFkZHJlc3MuZ3JhbnRXcml0ZURhdGEoc2F2ZVRyYW5zcG9ydGF0aW9uTGFtYmRhKTtcblxuICAgIGNvbnN0IExvZ2lzdGljQ29zdHJlc3RBcGkgPSBuZXcgUmVzdEFwaSh0aGlzLCBcIkxvZ2lzdGljQ29zdFwiLCB7XG4gICAgICAgIGRlcGxveU9wdGlvbnM6e1xuICAgICAgICAgICAgZGF0YVRyYWNlRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIHRyYWNpbmdFbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgc3RhZ2VOYW1lOiAndjEnLFxuICAgICAgICAgICAgLy8gbG9nZ2luZ0xldmVsOiBNZXRob2RMb2dnaW5nTGV2ZWwuSU5GTyxcbiAgICAgICAgfSxcbiAgICAgIGRlZmF1bHRNZXRob2RPcHRpb25zOiB7XG4gICAgICAgIGFwaUtleVJlcXVpcmVkOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIGRlZmF1bHRDb3JzUHJlZmxpZ2h0T3B0aW9uczoge1xuICAgICAgICBhbGxvd09yaWdpbnM6IFtcbiAgICAgICAgICAnKicsXG4gICAgICAgICAgLy8gc3VwcG9ydCBsb2NhbGhvc3QgYXMgYW4gb3JpZ2luIG9ubHkgaW4gbm9uLXByb2QgZW52aXJvbm1lbnRzXG4gICAgICAgIF0sXG4gICAgICAgIGFsbG93SGVhZGVyczogQ29ycy5ERUZBVUxUX0hFQURFUlMuY29uY2F0KFsneC1hcGkta2V5J10pLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICB0aGlzLkxvZ2lzdGljUmVzdEFwaSA9IExvZ2lzdGljQ29zdHJlc3RBcGk7XG4gICAgY29uc3QgcmVxdWVzdFZhbGlkYXRvciA9IG5ldyBSZXF1ZXN0VmFsaWRhdG9yKHRoaXMsICdsb2dpc3RpYy1jb3N0LXJlcXVlc3QtdmFsaWRhdG9yJywge1xuICAgICAgcmVzdEFwaTogdGhpcy5Mb2dpc3RpY1Jlc3RBcGksXG4gICAgICB2YWxpZGF0ZVJlcXVlc3RCb2R5OiB0cnVlLFxuICAgICAgdmFsaWRhdGVSZXF1ZXN0UGFyYW1ldGVyczogdHJ1ZSxcbiAgICB9KTtcbiAgICBjb25zdCBsb2dpc3RpY0Nvc3RNb2RlbCA9IExvZ2lzdGljQ29zdHJlc3RBcGkuYWRkTW9kZWwoXG4gICAgICAnbG9naXN0aWMtY29zdC1kYXRhLW1vZGVsJyxcbiAgICAgIHtcbiAgICAgICAgc2NoZW1hOiBsb2dpc3RpY0Nvc3RTY2hlbWEsIC8vIGNoYW5nZVxuICAgICAgICBkZXNjcmlwdGlvbjogJ1JlcXVlc3QgbW9kZWwgZm9yIGxvZ2lzdGljQ29zdCBkYXRhICcsXG4gICAgICAgIG1vZGVsTmFtZTogJ0xvZ2lzdGljQ29zdGNvc3RTY2hlbWFJbnB1dCcsXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9LFxuICAgICk7XG4gICAgY29uc3QgRW1wbG95ZWVDb3N0QXBpID0gTG9naXN0aWNDb3N0cmVzdEFwaS5yb290LnJlc291cmNlRm9yUGF0aCgndHJhbnNwb3J0YXRpb25Db3N0Jyk7IC8vIGhlcmUgd2UgY2FuIG1ha2UgbW9yZSBlbmRwb2ludCBiYXNlZCBvbiBvdXQgZnV0dXJlIG5lZWRcbiAgICAvLyBjb25zdCBSZW50Q29zdEFwaSA9IHJlc3RBcGkucm9vdC5yZXNvdXJjZUZvclBhdGgoJ1JlbnQnKTtcbiAgICAvLyBjb25zdCBVdGlsaXRpZXNDb3N0QXBpID0gcmVzdEFwaS5yb290LnJlc291cmNlRm9yUGF0aCgnVXRpbGl0aWVzJyk7XG4gICAgLy8gY29uc3QgTWFpbnRlbmFuY2VDb3N0QXBpID0gcmVzdEFwaS5yb290LnJlc291cmNlRm9yUGF0aCgnTWFpbnRlbmFuY2UnKTtcbiAgICAvLyBjb25zdCBSZXBhaXJzQ29zdGVBcGkgPSByZXN0QXBpLnJvb3QucmVzb3VyY2VGb3JQYXRoKCdSZXBhaXJzJyk7XG4gICAgRW1wbG95ZWVDb3N0QXBpLmFkZE1ldGhvZCgnR0VUJywgbmV3IExhbWJkYUludGVncmF0aW9uKGdldFRyYW5zcG9ydGF0aW9uTGFtYmRhKSk7XG4gICAgRW1wbG95ZWVDb3N0QXBpLmFkZE1ldGhvZCgnUE9TVCcsIG5ldyBMYW1iZGFJbnRlZ3JhdGlvbihzYXZlVHJhbnNwb3J0YXRpb25MYW1iZGEpLHtcbiAgICAgIGF1dGhvcml6YXRpb25UeXBlOiBBdXRob3JpemF0aW9uVHlwZS5OT05FLFxuICAgICAgcmVxdWVzdE1vZGVsczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGxvZ2lzdGljQ29zdE1vZGVsLFxuICAgICAgfSxcbiAgICAgIHJlcXVlc3RWYWxpZGF0b3IsXG4gICAgfVxuICBcbiAgKTtcbiAgICAvLyBSZW50Q29zdEFwaS5hZGRNZXRob2QoJ1BPU1QnLCBuZXcgTGFtYmRhSW50ZWdyYXRpb24oc2F2ZUVtcGxveWVlZGF0YUxhbWJkYSkpO1xuICAgIC8vIFV0aWxpdGllc0Nvc3RBcGkuYWRkTWV0aG9kKCdQT1NUJywgbmV3IExhbWJkYUludGVncmF0aW9uKHNhdmVFbXBsb3llZWRhdGFMYW1iZGEpKTtcbiAgICAvLyBNYWludGVuYW5jZUNvc3RBcGkuYWRkTWV0aG9kKCdQT1NUJywgbmV3IExhbWJkYUludGVncmF0aW9uKHNhdmVFbXBsb3llZWRhdGFMYW1iZGEpKTtcbiAgICAvLyBSZXBhaXJzQ29zdGVBcGkuYWRkTWV0aG9kKCdQT1NUJywgbmV3IExhbWJkYUludGVncmF0aW9uKHNhdmVFbXBsb3llZWRhdGFMYW1iZGEpKTtcblxuICAgIHRoaXMuYWRkQXBpS2V5KHN0YWNrTmFtZSwgTG9naXN0aWNDb3N0cmVzdEFwaSk7XG4gICAgdGhpcy5hZGRBcGlSZXNwb25zZXMoTG9naXN0aWNDb3N0cmVzdEFwaSk7XG5cbiAgICBMb2dpc3RpY0Nvc3RyZXN0QXBpLm1ldGhvZHNcbiAgICAgIC5maWx0ZXIobWV0aG9kID0+IG1ldGhvZC5odHRwTWV0aG9kID09PSAnT1BUSU9OUycpXG4gICAgICAuZm9yRWFjaChtZXRob2QgPT4ge1xuICAgICAgICBjb25zdCBjZm5NZXRob2QgPSBtZXRob2Qubm9kZS5kZWZhdWx0Q2hpbGQgYXMgQ2ZuTWV0aG9kO1xuICAgICAgICBjZm5NZXRob2QuYXBpS2V5UmVxdWlyZWQgPSBmYWxzZTtcbiAgICAgIH0pO1xuICB9O1xuXG4gIGFkZEFwaUtleShzdGFja05hbWU6IHN0cmluZywgTG9naXN0aWNDb3N0cmVzdEFwaTogUmVzdEFwaSkge1xuICAgIGNvbnN0IHNlY3JhdGVOYW1lQXBpID0gYCR7c3RhY2tOYW1lfS8ke3RoaXMuTG9naXN0aWNSZXN0QXBpfS9hcGkta2V5YFxuICAgIC8vIGNvbnN0IHNlY3JldCA9IG5ldyBTZWNyZXQodGhpcywgJ0xvZ2lzdGljQ29zdEFwaVNlY3JldCcsIHtcbiAgICAvLyAgIHNlY3JldE5hbWU6IHNlY3JhdGVOYW1lQXBpLFxuICAgIC8vICAgZGVzY3JpcHRpb246ICdMb2dpc3RpYyBDb3N0IEFQSSBHYXRld2F5IEFQSSBLZXknLFxuICAgIC8vICAgZ2VuZXJhdGVTZWNyZXRTdHJpbmc6IHtcbiAgICAvLyAgICAgZ2VuZXJhdGVTdHJpbmdLZXk6ICdrZXknLFxuICAgIC8vICAgICBzZWNyZXRTdHJpbmdUZW1wbGF0ZTogSlNPTi5zdHJpbmdpZnkoe30pLFxuICAgIC8vICAgICBleGNsdWRlQ2hhcmFjdGVyczogJyAlK35gIyQmKigpfFtde306Ozw+PyFcXCcvQFwiXFxcXCcsXG4gICAgLy8gICB9LFxuICAgIC8vIH0pO1xuICAgIC8vIHRoaXMucmVzdEFQSUtleUFybiA9IHNlY3JldC5zZWNyZXRBcm47XG4gICAgLy8gICBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdsb2dpc3RpY0FQSUtleUFybkF0U291cmNlJywge1xuICAgIC8vICAgICB2YWx1ZTogdGhpcy5yZXN0QVBJS2V5QXJuID8/ICcnLFxuICAgIC8vICAgfSk7XG4gICAgICBjb25zdCBwbGFuID0gTG9naXN0aWNDb3N0cmVzdEFwaS5hZGRVc2FnZVBsYW4oJ0xvZ2lzdGljLUNvc3QtQVBpLS11c2FnZS1wbGFuJywge1xuICAgICAgICBuYW1lOiBgJHtzdGFja05hbWV9LWxvZ2lzdGljLWFwaS11c2FnZS1wbGFuYCxcbiAgICAgICAgYXBpU3RhZ2VzOiBbeyBzdGFnZTogTG9naXN0aWNDb3N0cmVzdEFwaS5kZXBsb3ltZW50U3RhZ2UgfV0sXG4gICAgICB9KTtcbiAgICBjb25zdCBjdXN0b21SZXNvdXJjZVByb3ZpZGVyID0gbmV3IEN1c3RvbVJlc291cmNlUHJvdmlkZXIodGhpcywgJ0xvZ2lzdGljQ29zdEFwaVJlc291cmNlUHJvdmlkZXInLCBTdGFjay5vZih0aGlzKSwgc2VjcmF0ZU5hbWVBcGkpO1xuICAgIGNvbnN0IGN1c3RvbVJlc291cmNlID0gbmV3IGNkay5DdXN0b21SZXNvdXJjZSh0aGlzLCAnY3VzdG9tUmVzb3VyY2VQcm92aWRlckZvckxvZ2lzdGljQ29zdEFwaScsIHtcbiAgICAgIHNlcnZpY2VUb2tlbjogY3VzdG9tUmVzb3VyY2VQcm92aWRlci5zZXJ2aWNlVG9rZW4sXG4gICAgICAvLyBwcm9wZXJ0aWVzOiB7XG4gICAgICAvLyAgIFNFQ1JFVF9OQU1FOiBzZWNyZXQuc2VjcmV0TmFtZSxcbiAgICAgIC8vIH0sXG4gICAgfSk7XG4gICAgICBjb25zdCBhcGlLZXkgPSBMb2dpc3RpY0Nvc3RyZXN0QXBpLmFkZEFwaUtleSgnQXBpS2V5Jywge1xuICAgICAgICBhcGlLZXlOYW1lOiBzZWNyYXRlTmFtZUFwaSxcbiAgICAgICAgdmFsdWU6IGN1c3RvbVJlc291cmNlLmdldEF0dFN0cmluZygnU2VjcmV0VmFsdWUnKSxcbiAgICAgIH0pO1xuICAgICAgcGxhbi5hZGRBcGlLZXkoYXBpS2V5KTtcbiAgICB9XG5cbiAgYWRkQXBpUmVzcG9uc2VzKHJlc3RBcGk6IFJlc3RBcGkpIHtcbiAgICBjb25zdCBjb21tb25SZXNwb25zZSA9IG5ldyBBcGlDb21tb25SZXNwb25zZSgpO1xuICAgIC8vICoqKioqKioqKioqKioqKioqIEVycm9yIDQwMFxuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdCQURfUkVRVUVTVF9CT0RZJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLkJBRF9SRVFVRVNUX0JPRFksXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMCwgJ0JhZCBSZXF1ZXN0JywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIC8vICoqKioqKioqKioqKioqKioqRXJyb3IgNDAzXG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ1dBRl9GSUxURVJFRCcsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5XQUZfRklMVEVSRUQsXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG5cbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDAzLCAnRm9yYmlkZGVuJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdFWFBJUkVEX1RPS0VOJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLkVYUElSRURfVE9LRU4sXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMywgJ0ZvcmJpZGRlbicsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnSU5WQUxJRF9BUElfS0VZJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLklOVkFMSURfQVBJX0tFWSxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDAzLCAnRm9yYmlkZGVuJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdBQ0NFU1NfREVOSUVEJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLkFDQ0VTU19ERU5JRUQsXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMywgJ0ZvcmJpZGRlbicsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnSU5WQUxJRF9TSUdOQVRVUkUnLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuSU5WQUxJRF9TSUdOQVRVUkUsXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMywgJ0ZvcmJpZGRlbicsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnTUlTU0lOR19BVVRIRU5USUNBVElPTl9UT0tFTicsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5NSVNTSU5HX0FVVEhFTlRJQ0FUSU9OX1RPS0VOLFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsIC8vIENvcnJlY3RlZCBzeW50YXhcbiAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcyc6IFwiJ09QVElPTlMsIEdFVCdcIixcbiAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycyc6IFwiJ0NvbnRlbnQtVHlwZSwgQXV0aG9yaXphdGlvbidcIixcbiAgICAgICAgICAnVmFyeSc6IFwiJ09yaWdpbidcIixcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDMsICdGb3JiaWRkZW4nLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gIH0pO1xuICBcbiAgICAvLyAqKioqKioqKioqKioqKioqKkVycm9yIDV4eFxuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdERUZBVUxUXzVYWCcsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5ERUZBVUxUXzVYWCxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNTAwLCAnSW50ZXJuYWwgU2VydmVyIEVycm9yJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIC8vICoqKioqKioqKioqKioqKioqIEVycm9yIDQwMVxuICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ1VOQVVUSE9SSVpFRCcsIHtcbiAgICB0eXBlOiBSZXNwb25zZVR5cGUuVU5BVVRIT1JJWkVELFxuICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIiwgLy8gQ29ycmVjdGVkIHN5bnRheFxuICAgIH0sXG4gICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMSwgJ1VuYXV0aG9yaXplZCcsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgIH0sXG59KTtcblxuICAgIC8vICoqKioqKioqKioqKioqKioqIEVycm9yIGZvciA0MjlcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnUVVPVEFfRVhDRUVERUQnLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuUVVPVEFfRVhDRUVERUQsXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQyOSwgJ0xpbWl0IEV4Y2VlZGVkJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdUSFJPVFRMRUQnLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuVEhST1RUTEVELFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MjksICdMaW1pdCBFeGNlZWRlZCcsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxufVxuIl19