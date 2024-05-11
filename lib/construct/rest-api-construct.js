"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestApiConstruct = void 0;
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
class RestApiConstruct extends constructs_1.Construct {
    constructor(scope, id, stack) {
        super(scope, id);
        const stackName = aws_cdk_lib_1.Stack.of(this).stackName;
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
        const handlerDir = path.resolve(__dirname, '../../lib');
        const getUserdataLambda = new aws_lambda_1.Function(stack, "GetCustomerAddressLambdaHandler", {
            runtime: aws_lambda_1.Runtime.NODEJS_20_X,
            code: aws_lambda_1.Code.fromAsset(handlerDir),
            handler: 'handler/getHandler.handler',
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
            code: aws_lambda_1.Code.fromAsset(handlerDir),
            handler: 'handler/saveHandler.handler',
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
        const restApi = new aws_apigateway_1.RestApi(this, "UserContacts", {
            defaultMethodOptions: {
                apiKeyRequired: true,
            },
            defaultCorsPreflightOptions: {
                statusCode: 200,
                allowOrigins: ['*'],
                allowHeaders: ['Content-Type', 'Authorization', 'X-Api-Key'],
                allowMethods: ['POST', 'GET']
            }
        });
        this.restApi = restApi;
        const userAddressApi = restApi.root.resourceForPath('userDetails');
        userAddressApi.addMethod('GET', new aws_apigateway_1.LambdaIntegration(getUserdataLambda));
        userAddressApi.addMethod('POST', new aws_apigateway_1.LambdaIntegration(saveUserdataLambda));
        // const apiKey = api.addApiKey('ApiKey',{
        console.log("🚀 ~ RestApiConstruct ~ constructor ~ restApi:", restApi);
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
        //   description: 'Mobile push notification API Gateway API Key',
        //   generateSecretString: {
        //     generateStringKey: 'key',
        //     secretStringTemplate: JSON.stringify({}),
        //     excludeCharacters: ' %+~`#$&*()|[]{}:;<>?!\'/@"\\',
        //   },
        // });
        const apiKey = restApi.addApiKey('ApiKey', {
            apiKeyName: 'this._apiKeyName',
            value: 'secret.secretValueFromJson',
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
                'Access-Control-Allow-Origin': '*',
            },
            templates: {
                'application/json': commonResponse.setResponseWithOutReason(400, 'Bad Request', '$context.requestId').body,
            },
        });
        // *****************Error 403
        restApi.addGatewayResponse('WAF_FILTERED', {
            type: aws_apigateway_1.ResponseType.WAF_FILTERED,
            responseHeaders: {
                'Access-Control-Allow-Origin': '*',
            },
            templates: {
                'application/json': commonResponse.setResponseWithOutReason(403, 'Forbidden', '$context.requestId').body,
            },
        });
        restApi.addGatewayResponse('EXPIRED_TOKEN', {
            type: aws_apigateway_1.ResponseType.EXPIRED_TOKEN,
            responseHeaders: {
                'Access-Control-Allow-Origin': '*',
            },
            templates: {
                'application/json': commonResponse.setResponseWithOutReason(403, 'Forbidden', '$context.requestId').body,
            },
        });
        restApi.addGatewayResponse('INVALID_API_KEY', {
            type: aws_apigateway_1.ResponseType.INVALID_API_KEY,
            responseHeaders: {
                'Access-Control-Allow-Origin': '*',
            },
            templates: {
                'application/json': commonResponse.setResponseWithOutReason(403, 'Forbidden', '$context.requestId').body,
            },
        });
        restApi.addGatewayResponse('ACCESS_DENIED', {
            type: aws_apigateway_1.ResponseType.ACCESS_DENIED,
            responseHeaders: {
                'Access-Control-Allow-Origin': '*',
            },
            templates: {
                'application/json': commonResponse.setResponseWithOutReason(403, 'Forbidden', '$context.requestId').body,
            },
        });
        restApi.addGatewayResponse('INVALID_SIGNATURE', {
            type: aws_apigateway_1.ResponseType.INVALID_SIGNATURE,
            responseHeaders: {
                'Access-Control-Allow-Origin': '*',
            },
            templates: {
                'application/json': commonResponse.setResponseWithOutReason(403, 'Forbidden', '$context.requestId').body,
            },
        });
        restApi.addGatewayResponse('MISSING_AUTHENTICATION_TOKEN', {
            type: aws_apigateway_1.ResponseType.MISSING_AUTHENTICATION_TOKEN,
            responseHeaders: {
                'Access-Control-Allow-Origin': '*',
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
                'Access-Control-Allow-Origin': '*',
            },
            templates: {
                'application/json': commonResponse.setResponseWithOutReason(500, 'Internal Server Error', '$context.requestId').body,
            },
        });
        // ***************** Error 401
        restApi.addGatewayResponse('UNAUTHORIZED', {
            type: aws_apigateway_1.ResponseType.UNAUTHORIZED,
            responseHeaders: {
                'Access-Control-Allow-Origin': '*',
            },
            templates: {
                'application/json': commonResponse.setResponseWithOutReason(401, 'Unauthorized', '$context.requestId').body,
            },
        });
        // ***************** Error for 429
        restApi.addGatewayResponse('QUOTA_EXCEEDED', {
            type: aws_apigateway_1.ResponseType.QUOTA_EXCEEDED,
            responseHeaders: {
                'Access-Control-Allow-Origin': '*',
            },
            templates: {
                'application/json': commonResponse.setResponseWithOutReason(429, 'Limit Exceeded', '$context.requestId').body,
            },
        });
        restApi.addGatewayResponse('THROTTLED', {
            type: aws_apigateway_1.ResponseType.THROTTLED,
            responseHeaders: {
                'Access-Control-Allow-Origin': '*',
            },
            templates: {
                'application/json': commonResponse.setResponseWithOutReason(429, 'Limit Exceeded', '$context.requestId').body,
            },
        });
    }
}
exports.RestApiConstruct = RestApiConstruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdC1hcGktY29uc3RydWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnN0cnVjdC9yZXN0LWFwaS1jb25zdHJ1Y3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQTJDO0FBQzNDLDJDQUF1QztBQUN2QywyREFBZ0U7QUFDaEUsdURBQWlFO0FBQ2pFLCtEQUFpRztBQUNqRyw2Q0FBb0M7QUFDcEMsMkNBQTJDO0FBQzNDLCtFQUEwRTtBQUMxRSw2QkFBOEI7QUFDOUIsNEJBQTRCO0FBQzVCLCtCQUErQjtBQUMvQixpREFBc0Q7QUFDdEQsMERBQTBEO0FBRTFELE1BQWEsZ0JBQWlCLFNBQVEsc0JBQVM7SUFHN0MsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBQyxLQUFhO1FBQ3BELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakIsTUFBTSxTQUFTLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQzNDLG9DQUFvQztRQUNwQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFFdEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxvQkFBSyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUU7WUFDOUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsNEJBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDNUQsU0FBUyxFQUFFLFlBQVk7U0FDeEIsQ0FBQyxDQUFDO1FBQ0gsV0FBVyxDQUFDLHVCQUF1QixDQUFDO1lBQ2xDLFNBQVMsRUFBRSxhQUFhO1lBQ3hCLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLDRCQUFhLENBQUMsTUFBTSxFQUFFO1NBQzdELENBQUMsQ0FBQztRQUNILE1BQU0s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OlsiLy8gaW1wb3J0IHsgQ2ZuT3V0cHV0IH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBBdHRyaWJ1dGVUeXBlLCBUYWJsZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1keW5hbW9kYic7XG5pbXBvcnQgeyBSdW50aW1lLCBDb2RlLCBGdW5jdGlvbiB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEnO1xuaW1wb3J0IHsgUmVzdEFwaSwgTGFtYmRhSW50ZWdyYXRpb24sIFJlc3BvbnNlVHlwZSwgQ2ZuTWV0aG9kIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5XCI7XG5pbXBvcnQgeyBTdGFjayB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCAqIGFzIGlhbSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtaWFtJztcbmltcG9ydCB7IEFwaUNvbW1vblJlc3BvbnNlIH0gZnJvbSAnLi4vbW9kdWxlcy9Db21tb24vYXBpLWNvbW1vbi1yZXNwb25zZSc7XG5pbXBvcnQgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbi8vIEltcG9ydCB0aGUgQVdTIFNESyBtb2R1bGVcbmltcG9ydCAqIGFzIEFXUyBmcm9tICdhd3Mtc2RrJztcbmltcG9ydCB7IFBvbGljeVN0YXRlbWVudCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1pYW0nO1xuLy9pbXBvcnQgeyBTZWNyZXQgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtc2VjcmV0c21hbmFnZXInO1xuXG5leHBvcnQgY2xhc3MgUmVzdEFwaUNvbnN0cnVjdCBleHRlbmRzIENvbnN0cnVjdCB7XG4gIHB1YmxpYyByZXN0QXBpOiBSZXN0QXBpO1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsc3RhY2sgOiBTdGFjaykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG4gICAgY29uc3Qgc3RhY2tOYW1lID0gU3RhY2sub2YodGhpcykuc3RhY2tOYW1lO1xuICAgIC8vIENvbmZpZ3VyZSB0aGUgQVdTIFNESyB3aXRoIHJlZ2lvblxuICAgIEFXUy5jb25maWcudXBkYXRlKHsgcmVnaW9uOiBwcm9jZXNzLmVudi5BV1NfUkVHSU9OIH0pO1xuXG4gICAgY29uc3Qgc2F2ZUFkZHJlc3MgPSBuZXcgVGFibGUoc3RhY2ssIFwiRGV0YWlsc1wiLCB7XG4gICAgICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogXCJVc2VySWRcIiwgdHlwZTogQXR0cmlidXRlVHlwZS5TVFJJTkcgfSxcbiAgICAgIHRhYmxlTmFtZTogXCJDdXN0b21lckRCXCIsXG4gICAgfSk7XG4gICAgc2F2ZUFkZHJlc3MuYWRkR2xvYmFsU2Vjb25kYXJ5SW5kZXgoe1xuICAgICAgaW5kZXhOYW1lOiAnVXNlcklkSW5kZXgnLFxuICAgICAgcGFydGl0aW9uS2V5OiB7IG5hbWU6ICdVc2VySWQnLCB0eXBlOiBBdHRyaWJ1dGVUeXBlLlNUUklORyB9LFxuICAgIH0pO1xuICAgIGNvbnN0IGhhbmRsZXJEaXIgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vbGliJyk7XG4gICAgY29uc3QgZ2V0VXNlcmRhdGFMYW1iZGEgPSBuZXcgRnVuY3Rpb24oc3RhY2ssIFwiR2V0Q3VzdG9tZXJBZGRyZXNzTGFtYmRhSGFuZGxlclwiLCB7XG4gICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18yMF9YLFxuICAgICAgY29kZTogQ29kZS5mcm9tQXNzZXQoaGFuZGxlckRpciksIFxuICAgICAgaGFuZGxlcjogJ2hhbmRsZXIvZ2V0SGFuZGxlci5oYW5kbGVyJyxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIFRBQkxFX05BTUU6IHNhdmVBZGRyZXNzLnRhYmxlTmFtZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgZ2V0VXNlcmRhdGFMYW1iZGEuZ3JhbnRQcmluY2lwYWwuYWRkVG9QcmluY2lwYWxQb2xpY3koXG4gICAgICBuZXcgUG9saWN5U3RhdGVtZW50KHtcbiAgICAgICAgcmVzb3VyY2VzOiBbJyonXSxcbiAgICAgICAgYWN0aW9uczogWydkeW5hbW9kYjpnZXRJdGVtJywgJ3NlY3JldHNtYW5hZ2VyOkdldFNlY3JldFZhbHVlJ10sXG4gICAgICB9KSxcbiAgICApO1xuICAgIFxuXG4gICAgY29uc3Qgc2F2ZVVzZXJkYXRhTGFtYmRhID0gbmV3IEZ1bmN0aW9uKHN0YWNrLCBcIlB1dEN1c3RvbWVyQWRkcmVzc0xhbWJkYUhhbmRsZXJcIiwge1xuICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMjBfWCwgLy8gQWRqdXN0IHJ1bnRpbWUgaWYgbmVjZXNzYXJ5XG4gICAgICBjb2RlOiBDb2RlLmZyb21Bc3NldChoYW5kbGVyRGlyKSxcbiAgICAgIGhhbmRsZXI6ICdoYW5kbGVyL3NhdmVIYW5kbGVyLmhhbmRsZXInLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgVEFCTEVfTkFNRTogc2F2ZUFkZHJlc3MudGFibGVOYW1lLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHNhdmVVc2VyZGF0YUxhbWJkYS5ncmFudFByaW5jaXBhbC5hZGRUb1ByaW5jaXBhbFBvbGljeShcbiAgICAgIG5ldyBQb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICByZXNvdXJjZXM6IFsnKiddLFxuICAgICAgICBhY3Rpb25zOiBbJ2R5bmFtb2RiOlB1dEl0ZW0nLCAnc2VjcmV0c21hbmFnZXI6R2V0U2VjcmV0VmFsdWUnXSxcbiAgICAgIH0pLFxuICAgICk7XG4gICAgZ2V0VXNlcmRhdGFMYW1iZGEucm9sZT8uYWRkTWFuYWdlZFBvbGljeShpYW0uTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoJ0FtYXpvbkR5bmFtb0RCRnVsbEFjY2VzcycpKTtcbiAgICBzYXZlQWRkcmVzcy5ncmFudFdyaXRlRGF0YShzYXZlVXNlcmRhdGFMYW1iZGEpO1xuXG4gICAgY29uc3QgcmVzdEFwaSA9IG5ldyBSZXN0QXBpKHRoaXMsIFwiVXNlckNvbnRhY3RzXCIsIHtcbiAgICAgIGRlZmF1bHRNZXRob2RPcHRpb25zOiB7XG4gICAgICAgIGFwaUtleVJlcXVpcmVkOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIGRlZmF1bHRDb3JzUHJlZmxpZ2h0T3B0aW9uczp7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYWxsb3dPcmlnaW5zOiBbJyonXSxcbiAgICAgICAgYWxsb3dIZWFkZXJzOiBbJ0NvbnRlbnQtVHlwZScsJ0F1dGhvcml6YXRpb24nLCdYLUFwaS1LZXknXSxcbiAgICAgICAgYWxsb3dNZXRob2RzOiBbJ1BPU1QnLCAnR0VUJ11cbiAgICAgIH1cbiAgICAgIFxuICAgIH0pO1xuICAgIHRoaXMucmVzdEFwaSA9IHJlc3RBcGk7XG4gICAgY29uc3QgdXNlckFkZHJlc3NBcGkgPSByZXN0QXBpLnJvb3QucmVzb3VyY2VGb3JQYXRoKCd1c2VyRGV0YWlscycpO1xuICAgIHVzZXJBZGRyZXNzQXBpLmFkZE1ldGhvZCgnR0VUJywgbmV3IExhbWJkYUludGVncmF0aW9uKGdldFVzZXJkYXRhTGFtYmRhKSk7XG4gICAgdXNlckFkZHJlc3NBcGkuYWRkTWV0aG9kKCdQT1NUJywgbmV3IExhbWJkYUludGVncmF0aW9uKHNhdmVVc2VyZGF0YUxhbWJkYSkpO1xuICAgIFxuICAgIC8vIGNvbnN0IGFwaUtleSA9IGFwaS5hZGRBcGlLZXkoJ0FwaUtleScse1xuICAgIGNvbnNvbGUubG9nKFwi8J+agCB+IFJlc3RBcGlDb25zdHJ1Y3QgfiBjb25zdHJ1Y3RvciB+IHJlc3RBcGk6XCIsIHJlc3RBcGkpXG4gICAgLy8gICBhcGlLZXlOYW1lOiAndHVBcGlLZXknLFxuICAgIC8vICAgdmFsdWU6ICd0aGlzSXNKdXN0U2FtcGxlQVBpMTIzJyAvLyB3ZSBjYW4gZ2V0IHRoZSBhcGlzIHVzaW5nIGF3cyBzZWNyZXQgYW5kIGdldCB0aGUga2V5IHRvIGZldGNoIGhlcmUgXG4gICAgLy8gfSk7XG4gICAgLy8gY29uc29sZS5sb2coXCLwn5qAIH4gUmVzdEFwaUNvbnN0cnVjdCB+IGNvbnN0cnVjdG9yIH4gYXBpS2V5OlwiLCBhcGlLZXkpXG4gICAgLy8gY29uc3QgcGxhbiA9IGFwaS5hZGRVc2FnZVBsYW4oJ1R1X2FwaS11c2FnZS1wbGFuJywgeyAvLyB3ZSBjYW4gdXNlIHJhdGUgbGltaXQgYW5kIG90aGVyIHVzYWdlIHBsYW5zIFxuICAgIC8vICAgbmFtZTogYGFwaS11c2FnZS1wbGFuYCxcbiAgICAvLyAgIGFwaVN0YWdlczogW3sgc3RhZ2U6IGFwaS5kZXBsb3ltZW50U3RhZ2UgfV0sXG4gICAgLy8gfSk7XG5cbiAgXG4gICAgLy8gcGxhbi5hZGRBcGlLZXkoYXBpS2V5KTtcbiAgXG4gICAgLy8gbmV3IENmbk91dHB1dCh0aGlzLCBcIkFQSSBVUkxcIiwge1xuICAgIC8vICAgdmFsdWU6IGFwaS51cmwgPz8gXCJTb21ldGhpbmcgd2VudCB3cm9uZ1wiXG4gICAgLy8gfSk7XG4gICAgdGhpcy5hZGRBcGlLZXkoc3RhY2tOYW1lLCByZXN0QXBpKTtcbiAgICB0aGlzLmFkZEFwaVJlc3BvbnNlcyhyZXN0QXBpKTtcblxuICAgIHJlc3RBcGkubWV0aG9kc1xuICAgICAgLmZpbHRlcihtZXRob2QgPT4gbWV0aG9kLmh0dHBNZXRob2QgPT09ICdPUFRJT05TJylcbiAgICAgIC5mb3JFYWNoKG1ldGhvZCA9PiB7XG4gICAgICAgIGNvbnN0IGNmbk1ldGhvZCA9IG1ldGhvZC5ub2RlLmRlZmF1bHRDaGlsZCBhcyBDZm5NZXRob2Q7XG4gICAgICAgIGNmbk1ldGhvZC5hcGlLZXlSZXF1aXJlZCA9IGZhbHNlO1xuICAgICAgfSk7XG4gIH07XG5cbmFkZEFwaUtleShzdGFja05hbWU6IHN0cmluZywgcmVzdEFwaTogUmVzdEFwaSkge1xuICAgIC8vIEFQSSBHYXRld2F5IEFQSSBLZXlcbiAgICAvLyBjb25zdCBzZWNyZXQgPSBuZXcgU2VjcmV0KHRoaXMsICdVc2VyQ29udGFjdHMtdXNlckFkZHJlc3MtYXBpLXNlY3JldCcsIHtcbiAgICAvLyAgIHNlY3JldE5hbWU6IGAke3N0YWNrTmFtZX0vYXBpLWtleWAsXG4gICAgLy8gICBkZXNjcmlwdGlvbjogJ01vYmlsZSBwdXNoIG5vdGlmaWNhdGlvbiBBUEkgR2F0ZXdheSBBUEkgS2V5JyxcbiAgICAvLyAgIGdlbmVyYXRlU2VjcmV0U3RyaW5nOiB7XG4gICAgLy8gICAgIGdlbmVyYXRlU3RyaW5nS2V5OiAna2V5JyxcbiAgICAvLyAgICAgc2VjcmV0U3RyaW5nVGVtcGxhdGU6IEpTT04uc3RyaW5naWZ5KHt9KSxcbiAgICAvLyAgICAgZXhjbHVkZUNoYXJhY3RlcnM6ICcgJSt+YCMkJiooKXxbXXt9Ojs8Pj8hXFwnL0BcIlxcXFwnLFxuICAgIC8vICAgfSxcbiAgICAvLyB9KTtcblxuICAgIGNvbnN0IGFwaUtleSA9IHJlc3RBcGkuYWRkQXBpS2V5KCdBcGlLZXknLCB7XG4gICAgICBhcGlLZXlOYW1lOiAndGhpcy5fYXBpS2V5TmFtZScsXG4gICAgICB2YWx1ZTogJ3NlY3JldC5zZWNyZXRWYWx1ZUZyb21Kc29uJyxcbiAgICB9KTtcblxuICAgIC8vIHRoaXMucmVzdEFQSUtleUFybiA9IHNlY3JldC5zZWNyZXRBcm47XG5cbiAgICAvLyBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdyZXN0QVBJS2V5QXJuQXRTb3VyY2UnLCB7XG4gICAgLy8gICB2YWx1ZTogdGhpcy5yZXN0QVBJS2V5QXJuID8/ICcnLFxuICAgIC8vIH0pO1xuXG4gICAgY29uc3QgcGxhbiA9IHJlc3RBcGkuYWRkVXNhZ2VQbGFuKCd1c2VyQVBpLWFkZHJlc3MtdXNhZ2UtcGxhbicsIHtcbiAgICAgIG5hbWU6IGAke3N0YWNrTmFtZX0tYXBpLXVzYWdlLXBsYW5gLFxuICAgICAgYXBpU3RhZ2VzOiBbeyBzdGFnZTogcmVzdEFwaS5kZXBsb3ltZW50U3RhZ2UgfV0sXG4gICAgfSk7XG5cbiAgICBwbGFuLmFkZEFwaUtleShhcGlLZXkpO1xuICB9XG5cbiAgYWRkQXBpUmVzcG9uc2VzKHJlc3RBcGk6IFJlc3RBcGkpIHtcbiAgICBjb25zdCBjb21tb25SZXNwb25zZSA9IG5ldyBBcGlDb21tb25SZXNwb25zZSgpO1xuICAgIC8vICoqKioqKioqKioqKioqKioqIEVycm9yIDQwMFxuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdCQURfUkVRVUVTVF9CT0RZJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLkJBRF9SRVFVRVNUX0JPRFksXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDAwLCAnQmFkIFJlcXVlc3QnLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgLy8gKioqKioqKioqKioqKioqKipFcnJvciA0MDNcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnV0FGX0ZJTFRFUkVEJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLldBRl9GSUxURVJFRCxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxuXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMywgJ0ZvcmJpZGRlbicsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnRVhQSVJFRF9UT0tFTicsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5FWFBJUkVEX1RPS0VOLFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMywgJ0ZvcmJpZGRlbicsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnSU5WQUxJRF9BUElfS0VZJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLklOVkFMSURfQVBJX0tFWSxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDMsICdGb3JiaWRkZW4nLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ0FDQ0VTU19ERU5JRUQnLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuQUNDRVNTX0RFTklFRCxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDMsICdGb3JiaWRkZW4nLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ0lOVkFMSURfU0lHTkFUVVJFJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLklOVkFMSURfU0lHTkFUVVJFLFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMywgJ0ZvcmJpZGRlbicsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnTUlTU0lOR19BVVRIRU5USUNBVElPTl9UT0tFTicsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5NSVNTSU5HX0FVVEhFTlRJQ0FUSU9OX1RPS0VOLFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsXG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJzogJ09QVElPTlMsIEdFVCcsXG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJzogJ0NvbnRlbnQtVHlwZSwgQXV0aG9yaXphdGlvbicsXG4gICAgICAgICdWYXJ5JzogJ09yaWdpbicsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMywgJ0ZvcmJpZGRlbicsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICAvLyAqKioqKioqKioqKioqKioqKkVycm9yIDV4eFxuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdERUZBVUxUXzVYWCcsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5ERUZBVUxUXzVYWCxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig1MDAsICdJbnRlcm5hbCBTZXJ2ZXIgRXJyb3InLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgLy8gKioqKioqKioqKioqKioqKiogRXJyb3IgNDAxXG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ1VOQVVUSE9SSVpFRCcsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5VTkFVVEhPUklaRUQsXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDAxLCAnVW5hdXRob3JpemVkJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIC8vICoqKioqKioqKioqKioqKioqIEVycm9yIGZvciA0MjlcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnUVVPVEFfRVhDRUVERUQnLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuUVVPVEFfRVhDRUVERUQsXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDI5LCAnTGltaXQgRXhjZWVkZWQnLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ1RIUk9UVExFRCcsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5USFJPVFRMRUQsXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDI5LCAnTGltaXQgRXhjZWVkZWQnLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==