"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestApiConstruct = void 0;
// import { CfnOutput } from 'aws-cdk-lib';
const constructs_1 = require("constructs");
const aws_dynamodb_1 = require("aws-cdk-lib/aws-dynamodb");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
const iam = require("aws-cdk-lib/aws-iam");
const api_common_response_1 = require("../modules/Common/api-common-response");
// Import the AWS SDK module
const AWS = require("aws-sdk");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
const aws_secretsmanager_1 = require("aws-cdk-lib/aws-secretsmanager");
class RestApiConstruct extends constructs_1.Construct {
    constructor(scope, id, stack) {
        super(scope, id);
        // Configure the AWS SDK with region
        AWS.config.update({ region: process.env.AWS_REGION });
        const saveAddress = new aws_dynamodb_1.Table(stack, "Details", {
            partitionKey: { name: "UserId", type: aws_dynamodb_1.AttributeType.STRING },
            tableName: "CustomerDB",
        });
        saveAddress.addGlobalSecondaryIndex({
            indexName: 'UserIdIndex',
            partitionKey: { name: 'UserId', type: aws_dynamodb_1.AttributeType.STRING },
        });
        const getUserdataLambda = new aws_lambda_1.Function(stack, "GetCustomerAddressLambdaHandler", {
            runtime: aws_lambda_1.Runtime.NODEJS_20_X,
            code: aws_lambda_1.Code.fromAsset('handler'),
            handler: 'getHandler.handler',
            environment: {
                TABLE_NAME: saveAddress.tableName,
            },
        });
        getUserdataLambda.grantPrincipal.addToPrincipalPolicy(new aws_iam_1.PolicyStatement({
            resources: ['*'],
            actions: ['dynamodb:getItem', 'secretsmanager:GetSecretValue'],
        }));
        const saveUserdataLambda = new aws_lambda_1.Function(stack, "PutCustomerAddressLambdaHandler", {
            runtime: aws_lambda_1.Runtime.NODEJS_20_X,
            code: aws_lambda_1.Code.fromAsset("handler"),
            handler: 'saveHandler.handler',
            environment: {
                TABLE_NAME: saveAddress.tableName,
            },
        });
        saveUserdataLambda.grantPrincipal.addToPrincipalPolicy(new aws_iam_1.PolicyStatement({
            resources: ['*'],
            actions: ['dynamodb:PutItem', 'secretsmanager:GetSecretValue'],
        }));
        getUserdataLambda.role?.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'));
        saveAddress.grantWriteData(saveUserdataLambda);
        const api = new aws_apigateway_1.RestApi(this, "UserContacts", {
            defaultMethodOptions: {
                apiKeyRequired: true,
            },
            defaultCorsPreflightOptions: {
                statusCode: 204,
                allowOrigins: ["'*'"],
                allowHeaders: ['Content-Type', 'Authorization', 'X-Api-Key'],
                allowMethods: ['POST', 'GET']
            }
        });
        const userAddressApi = api.root.resourceForPath('userDetails');
        userAddressApi.addMethod('GET', new aws_apigateway_1.LambdaIntegration(getUserdataLambda));
        userAddressApi.addMethod('POST', new aws_apigateway_1.LambdaIntegration(saveUserdataLambda));
        // const apiKey = api.addApiKey('ApiKey',{
        //   apiKeyName: 'tuApiKey',
        //   value: 'thisIsJustSampleAPi123' // we can get the apis using aws secret and get the key to fetch here 
        // });
        // console.log("🚀 ~ RestApiConstruct ~ constructor ~ apiKey:", apiKey)
        // const plan = api.addUsagePlan('Tu_api-usage-plan', { // we can use rate limit and other usage plans 
        //   name: `api-usage-plan`,
        //   apiStages: [{ stage: api.deploymentStage }],
        // });
        // plan.addApiKey(apiKey);
        // new CfnOutput(this, "API URL", {
        //   value: api.url ?? "Something went wrong"
        // });
    }
    ;
    addApiKey(stackName, restApi) {
        // API Gateway API Key
        const secret = new aws_secretsmanager_1.Secret(this, 'UserContacts-userAddress-api-secret', {
            secretName: `${stackName}/api-key`,
            description: 'Mobile push notification API Gateway API Key',
            generateSecretString: {
                generateStringKey: 'key',
                secretStringTemplate: JSON.stringify({}),
                excludeCharacters: ' %+~`#$&*()|[]{}:;<>?!\'/@"\\',
            },
        });
        const apiKey = restApi.addApiKey('ApiKey', {
            apiKeyName: 'this._apiKeyName',
            value: secret.secretValueFromJson('key').toString(),
        });
        // this.restAPIKeyArn = secret.secretArn;
        // new CfnOutput(this, 'restAPIKeyArnAtSource', {
        //   value: this.restAPIKeyArn ?? '',
        // });
        const plan = restApi.addUsagePlan('userAPi-address-usage-plan', {
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
                'Access-Control-Allow-Origin': '\'*\'',
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
                'Access-Control-Allow-Methods': 'OPTIONS, GET',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Vary': 'Origin',
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
                'Access-Control-Allow-Origin': "'*'",
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
exports.RestApiConstruct = RestApiConstruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdC1hcGktY29uc3RydWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVzdC1hcGktY29uc3RydWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUEyQztBQUMzQywyQ0FBdUM7QUFDdkMsMkRBQWdFO0FBQ2hFLHVEQUFpRTtBQUNqRSwrREFBc0Y7QUFFdEYsMkNBQTJDO0FBQzNDLCtFQUEwRTtBQUUxRSw0QkFBNEI7QUFDNUIsK0JBQStCO0FBQy9CLGlEQUFzRDtBQUN0RCx1RUFBd0Q7QUFFeEQsTUFBYSxnQkFBaUIsU0FBUSxzQkFBUztJQUc3QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFDLEtBQWE7UUFDcEQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQixvQ0FBb0M7UUFDcEMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBRXRELE1BQU0sV0FBVyxHQUFHLElBQUksb0JBQUssQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFO1lBQzlDLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLDRCQUFhLENBQUMsTUFBTSxFQUFFO1lBQzVELFNBQVMsRUFBRSxZQUFZO1NBQ3hCLENBQUMsQ0FBQztRQUNILFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQztZQUNsQyxTQUFTLEVBQUUsYUFBYTtZQUN4QixZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSw0QkFBYSxDQUFDLE1BQU0sRUFBRTtTQUM3RCxDQUFDLENBQUM7UUFFSCxNQUFNLGlCQUFpQixHQUFHLElBQUkscUJBQVEsQ0FBQyxLQUFLLEVBQUUsaUNBQWlDLEVBQUU7WUFDL0UsT0FBTyxFQUFFLG9CQUFPLENBQUMsV0FBVztZQUM1QixJQUFJLEVBQUUsaUJBQUksQ0FBQyxTQUFT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LENBQUMsZ0JBQWdCLEVBQUU7WUFDM0MsSUFBSSxFQUFFLDZCQUFZLENBQUMsY0FBYztZQUNqQyxlQUFlLEVBQUU7Z0JBQ2YsNkJBQTZCLEVBQUUsS0FBSzthQUNyQztZQUNELFNBQVMsRUFBRTtnQkFDVCxrQkFBa0IsRUFBRSxjQUFjLENBQUMsd0JBQXdCLENBQUMsR0FBRyxFQUFFLGdCQUFnQixFQUFFLG9CQUFvQixDQUFDLENBQUMsSUFBSTthQUM5RztTQUNGLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUU7WUFDdEMsSUFBSSxFQUFFLDZCQUFZLENBQUMsU0FBUztZQUM1QixlQUFlLEVBQUU7Z0JBQ2YsNkJBQTZCLEVBQUUsS0FBSzthQUNyQztZQUNELFNBQVMsRUFBRTtnQkFDVCxrQkFBa0IsRUFBRSxjQUFjLENBQUMsd0JBQXdCLENBQUMsR0FBRyxFQUFFLGdCQUFnQixFQUFFLG9CQUFvQixDQUFDLENBQUMsSUFBSTthQUM5RztTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQW5PRCw0Q0FtT0MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyBDZm5PdXRwdXQgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCB7IEF0dHJpYnV0ZVR5cGUsIFRhYmxlIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWR5bmFtb2RiJztcbmltcG9ydCB7IEZ1bmN0aW9uLCBSdW50aW1lLCBDb2RlIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcbmltcG9ydCB7IFJlc3RBcGksIExhbWJkYUludGVncmF0aW9uLCBSZXNwb25zZVR5cGUgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXlcIjtcbmltcG9ydCB7IFN0YWNrIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgaWFtIGZyb20gJ2F3cy1jZGstbGliL2F3cy1pYW0nO1xuaW1wb3J0IHsgQXBpQ29tbW9uUmVzcG9uc2UgfSBmcm9tICcuLi9tb2R1bGVzL0NvbW1vbi9hcGktY29tbW9uLXJlc3BvbnNlJztcblxuLy8gSW1wb3J0IHRoZSBBV1MgU0RLIG1vZHVsZVxuaW1wb3J0ICogYXMgQVdTIGZyb20gJ2F3cy1zZGsnO1xuaW1wb3J0IHsgUG9saWN5U3RhdGVtZW50IH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XG5pbXBvcnQgeyBTZWNyZXQgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtc2VjcmV0c21hbmFnZXInO1xuXG5leHBvcnQgY2xhc3MgUmVzdEFwaUNvbnN0cnVjdCBleHRlbmRzIENvbnN0cnVjdCB7XG5cblxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLHN0YWNrIDogU3RhY2spIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4gICAgLy8gQ29uZmlndXJlIHRoZSBBV1MgU0RLIHdpdGggcmVnaW9uXG4gICAgQVdTLmNvbmZpZy51cGRhdGUoeyByZWdpb246IHByb2Nlc3MuZW52LkFXU19SRUdJT04gfSk7XG5cbiAgICBjb25zdCBzYXZlQWRkcmVzcyA9IG5ldyBUYWJsZShzdGFjaywgXCJEZXRhaWxzXCIsIHtcbiAgICAgIHBhcnRpdGlvbktleTogeyBuYW1lOiBcIlVzZXJJZFwiLCB0eXBlOiBBdHRyaWJ1dGVUeXBlLlNUUklORyB9LFxuICAgICAgdGFibGVOYW1lOiBcIkN1c3RvbWVyREJcIixcbiAgICB9KTtcbiAgICBzYXZlQWRkcmVzcy5hZGRHbG9iYWxTZWNvbmRhcnlJbmRleCh7XG4gICAgICBpbmRleE5hbWU6ICdVc2VySWRJbmRleCcsXG4gICAgICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogJ1VzZXJJZCcsIHR5cGU6IEF0dHJpYnV0ZVR5cGUuU1RSSU5HIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBnZXRVc2VyZGF0YUxhbWJkYSA9IG5ldyBGdW5jdGlvbihzdGFjaywgXCJHZXRDdXN0b21lckFkZHJlc3NMYW1iZGFIYW5kbGVyXCIsIHtcbiAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzIwX1gsXG4gICAgICBjb2RlOiBDb2RlLmZyb21Bc3NldCgnaGFuZGxlcicpLCBcbiAgICAgIGhhbmRsZXI6ICdnZXRIYW5kbGVyLmhhbmRsZXInLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgVEFCTEVfTkFNRTogc2F2ZUFkZHJlc3MudGFibGVOYW1lLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBnZXRVc2VyZGF0YUxhbWJkYS5ncmFudFByaW5jaXBhbC5hZGRUb1ByaW5jaXBhbFBvbGljeShcbiAgICAgIG5ldyBQb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICByZXNvdXJjZXM6IFsnKiddLFxuICAgICAgICBhY3Rpb25zOiBbJ2R5bmFtb2RiOmdldEl0ZW0nLCAnc2VjcmV0c21hbmFnZXI6R2V0U2VjcmV0VmFsdWUnXSxcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICBjb25zdCBzYXZlVXNlcmRhdGFMYW1iZGEgPSBuZXcgRnVuY3Rpb24oc3RhY2ssIFwiUHV0Q3VzdG9tZXJBZGRyZXNzTGFtYmRhSGFuZGxlclwiLCB7XG4gICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18yMF9YLFxuICAgICAgY29kZTogQ29kZS5mcm9tQXNzZXQoXCJoYW5kbGVyXCIpLFxuICAgICAgaGFuZGxlcjogJ3NhdmVIYW5kbGVyLmhhbmRsZXInLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgVEFCTEVfTkFNRTogc2F2ZUFkZHJlc3MudGFibGVOYW1lLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBzYXZlVXNlcmRhdGFMYW1iZGEuZ3JhbnRQcmluY2lwYWwuYWRkVG9QcmluY2lwYWxQb2xpY3koXG4gICAgICBuZXcgUG9saWN5U3RhdGVtZW50KHtcbiAgICAgICAgcmVzb3VyY2VzOiBbJyonXSxcbiAgICAgICAgYWN0aW9uczogWydkeW5hbW9kYjpQdXRJdGVtJywgJ3NlY3JldHNtYW5hZ2VyOkdldFNlY3JldFZhbHVlJ10sXG4gICAgICB9KSxcbiAgICApO1xuICAgIGdldFVzZXJkYXRhTGFtYmRhLnJvbGU/LmFkZE1hbmFnZWRQb2xpY3koaWFtLk1hbmFnZWRQb2xpY3kuZnJvbUF3c01hbmFnZWRQb2xpY3lOYW1lKCdBbWF6b25EeW5hbW9EQkZ1bGxBY2Nlc3MnKSk7XG4gICAgc2F2ZUFkZHJlc3MuZ3JhbnRXcml0ZURhdGEoc2F2ZVVzZXJkYXRhTGFtYmRhKTtcblxuICAgIGNvbnN0IGFwaSA9IG5ldyBSZXN0QXBpKHRoaXMsIFwiVXNlckNvbnRhY3RzXCIsIHtcbiAgICAgIGRlZmF1bHRNZXRob2RPcHRpb25zOiB7XG4gICAgICAgIGFwaUtleVJlcXVpcmVkOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIGRlZmF1bHRDb3JzUHJlZmxpZ2h0T3B0aW9uczp7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwNCxcbiAgICAgICAgYWxsb3dPcmlnaW5zOiBbXCInKidcIl0sXG4gICAgICAgIGFsbG93SGVhZGVyczogWydDb250ZW50LVR5cGUnLCdBdXRob3JpemF0aW9uJywnWC1BcGktS2V5J10sXG4gICAgICAgIGFsbG93TWV0aG9kczogWydQT1NUJywgJ0dFVCddXG4gICAgICB9XG4gICAgICBcbiAgICB9KTtcbiAgICBjb25zdCB1c2VyQWRkcmVzc0FwaSA9IGFwaS5yb290LnJlc291cmNlRm9yUGF0aCgndXNlckRldGFpbHMnKTtcbiAgICB1c2VyQWRkcmVzc0FwaS5hZGRNZXRob2QoJ0dFVCcsIG5ldyBMYW1iZGFJbnRlZ3JhdGlvbihnZXRVc2VyZGF0YUxhbWJkYSkpO1xuICAgIHVzZXJBZGRyZXNzQXBpLmFkZE1ldGhvZCgnUE9TVCcsIG5ldyBMYW1iZGFJbnRlZ3JhdGlvbihzYXZlVXNlcmRhdGFMYW1iZGEpKTtcbiAgICBcbiAgICAvLyBjb25zdCBhcGlLZXkgPSBhcGkuYWRkQXBpS2V5KCdBcGlLZXknLHtcbiAgICAvLyAgIGFwaUtleU5hbWU6ICd0dUFwaUtleScsXG4gICAgLy8gICB2YWx1ZTogJ3RoaXNJc0p1c3RTYW1wbGVBUGkxMjMnIC8vIHdlIGNhbiBnZXQgdGhlIGFwaXMgdXNpbmcgYXdzIHNlY3JldCBhbmQgZ2V0IHRoZSBrZXkgdG8gZmV0Y2ggaGVyZSBcbiAgICAvLyB9KTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIvCfmoAgfiBSZXN0QXBpQ29uc3RydWN0IH4gY29uc3RydWN0b3IgfiBhcGlLZXk6XCIsIGFwaUtleSlcbiAgICAvLyBjb25zdCBwbGFuID0gYXBpLmFkZFVzYWdlUGxhbignVHVfYXBpLXVzYWdlLXBsYW4nLCB7IC8vIHdlIGNhbiB1c2UgcmF0ZSBsaW1pdCBhbmQgb3RoZXIgdXNhZ2UgcGxhbnMgXG4gICAgLy8gICBuYW1lOiBgYXBpLXVzYWdlLXBsYW5gLFxuICAgIC8vICAgYXBpU3RhZ2VzOiBbeyBzdGFnZTogYXBpLmRlcGxveW1lbnRTdGFnZSB9XSxcbiAgICAvLyB9KTtcblxuICBcbiAgICAvLyBwbGFuLmFkZEFwaUtleShhcGlLZXkpO1xuICBcbiAgICAvLyBuZXcgQ2ZuT3V0cHV0KHRoaXMsIFwiQVBJIFVSTFwiLCB7XG4gICAgLy8gICB2YWx1ZTogYXBpLnVybCA/PyBcIlNvbWV0aGluZyB3ZW50IHdyb25nXCJcbiAgICAvLyB9KTtcblxuICB9O1xuXG5hZGRBcGlLZXkoc3RhY2tOYW1lOiBzdHJpbmcsIHJlc3RBcGk6IFJlc3RBcGkpIHtcbiAgICAvLyBBUEkgR2F0ZXdheSBBUEkgS2V5XG4gICAgY29uc3Qgc2VjcmV0ID0gbmV3IFNlY3JldCh0aGlzLCAnVXNlckNvbnRhY3RzLXVzZXJBZGRyZXNzLWFwaS1zZWNyZXQnLCB7XG4gICAgICBzZWNyZXROYW1lOiBgJHtzdGFja05hbWV9L2FwaS1rZXlgLFxuICAgICAgZGVzY3JpcHRpb246ICdNb2JpbGUgcHVzaCBub3RpZmljYXRpb24gQVBJIEdhdGV3YXkgQVBJIEtleScsXG4gICAgICBnZW5lcmF0ZVNlY3JldFN0cmluZzoge1xuICAgICAgICBnZW5lcmF0ZVN0cmluZ0tleTogJ2tleScsXG4gICAgICAgIHNlY3JldFN0cmluZ1RlbXBsYXRlOiBKU09OLnN0cmluZ2lmeSh7fSksXG4gICAgICAgIGV4Y2x1ZGVDaGFyYWN0ZXJzOiAnICUrfmAjJCYqKCl8W117fTo7PD4/IVxcJy9AXCJcXFxcJyxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBhcGlLZXkgPSByZXN0QXBpLmFkZEFwaUtleSgnQXBpS2V5Jywge1xuICAgICAgYXBpS2V5TmFtZTogJ3RoaXMuX2FwaUtleU5hbWUnLFxuICAgICAgdmFsdWU6IHNlY3JldC5zZWNyZXRWYWx1ZUZyb21Kc29uKCdrZXknKS50b1N0cmluZygpLFxuICAgIH0pO1xuXG4gICAgLy8gdGhpcy5yZXN0QVBJS2V5QXJuID0gc2VjcmV0LnNlY3JldEFybjtcblxuICAgIC8vIG5ldyBDZm5PdXRwdXQodGhpcywgJ3Jlc3RBUElLZXlBcm5BdFNvdXJjZScsIHtcbiAgICAvLyAgIHZhbHVlOiB0aGlzLnJlc3RBUElLZXlBcm4gPz8gJycsXG4gICAgLy8gfSk7XG5cbiAgICBjb25zdCBwbGFuID0gcmVzdEFwaS5hZGRVc2FnZVBsYW4oJ3VzZXJBUGktYWRkcmVzcy11c2FnZS1wbGFuJywge1xuICAgICAgbmFtZTogYCR7c3RhY2tOYW1lfS1hcGktdXNhZ2UtcGxhbmAsXG4gICAgICBhcGlTdGFnZXM6IFt7IHN0YWdlOiByZXN0QXBpLmRlcGxveW1lbnRTdGFnZSB9XSxcbiAgICB9KTtcblxuICAgIHBsYW4uYWRkQXBpS2V5KGFwaUtleSk7XG4gIH1cblxuICBhZGRBcGlSZXNwb25zZXMocmVzdEFwaTogUmVzdEFwaSkge1xuICAgIGNvbnN0IGNvbW1vblJlc3BvbnNlID0gbmV3IEFwaUNvbW1vblJlc3BvbnNlKCk7XG4gICAgLy8gKioqKioqKioqKioqKioqKiogRXJyb3IgNDAwXG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ0JBRF9SRVFVRVNUX0JPRFknLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuQkFEX1JFUVVFU1RfQk9EWSxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJ1xcJypcXCcnLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDAsICdCYWQgUmVxdWVzdCcsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICAvLyAqKioqKioqKioqKioqKioqKkVycm9yIDQwM1xuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdXQUZfRklMVEVSRUQnLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuV0FGX0ZJTFRFUkVELFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMywgJ0ZvcmJpZGRlbicsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnRVhQSVJFRF9UT0tFTicsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5FWFBJUkVEX1RPS0VOLFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDMsICdGb3JiaWRkZW4nLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ0lOVkFMSURfQVBJX0tFWScsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5JTlZBTElEX0FQSV9LRVksXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMywgJ0ZvcmJpZGRlbicsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnQUNDRVNTX0RFTklFRCcsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5BQ0NFU1NfREVOSUVELFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDMsICdGb3JiaWRkZW4nLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ0lOVkFMSURfU0lHTkFUVVJFJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLklOVkFMSURfU0lHTkFUVVJFLFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDMsICdGb3JiaWRkZW4nLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ01JU1NJTkdfQVVUSEVOVElDQVRJT05fVE9LRU4nLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuTUlTU0lOR19BVVRIRU5USUNBVElPTl9UT0tFTixcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnOiAnT1BUSU9OUywgR0VUJyxcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnOiAnQ29udGVudC1UeXBlLCBBdXRob3JpemF0aW9uJyxcbiAgICAgICAgJ1ZhcnknOiAnT3JpZ2luJyxcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDAzLCAnRm9yYmlkZGVuJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIC8vICoqKioqKioqKioqKioqKioqRXJyb3IgNXh4XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ0RFRkFVTFRfNVhYJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLkRFRkFVTFRfNVhYLFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig1MDAsICdJbnRlcm5hbCBTZXJ2ZXIgRXJyb3InLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgLy8gKioqKioqKioqKioqKioqKiogRXJyb3IgNDAxXG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ1VOQVVUSE9SSVpFRCcsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5VTkFVVEhPUklaRUQsXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMSwgJ1VuYXV0aG9yaXplZCcsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICAvLyAqKioqKioqKioqKioqKioqKiBFcnJvciBmb3IgNDI5XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ1FVT1RBX0VYQ0VFREVEJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLlFVT1RBX0VYQ0VFREVELFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MjksICdMaW1pdCBFeGNlZWRlZCcsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnVEhST1RUTEVEJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLlRIUk9UVExFRCxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDI5LCAnTGltaXQgRXhjZWVkZWQnLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==