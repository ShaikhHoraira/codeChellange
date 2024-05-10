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
// Import the AWS SDK module
const AWS = require("aws-sdk");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
const aws_secretsmanager_1 = require("aws-cdk-lib/aws-secretsmanager");
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
        const restApi = new aws_apigateway_1.RestApi(this, "UserContacts", {
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
        this.restApi = restApi;
        const userAddressApi = restApi.root.resourceForPath('userDetails');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdC1hcGktY29uc3RydWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVzdC1hcGktY29uc3RydWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUEyQztBQUMzQywyQ0FBdUM7QUFDdkMsMkRBQWdFO0FBQ2hFLHVEQUFpRTtBQUNqRSwrREFBaUc7QUFDakcsNkNBQW9DO0FBQ3BDLDJDQUEyQztBQUMzQywrRUFBMEU7QUFFMUUsNEJBQTRCO0FBQzVCLCtCQUErQjtBQUMvQixpREFBc0Q7QUFDdEQsdUVBQXdEO0FBRXhELE1BQWEsZ0JBQWlCLFNBQVEsc0JBQVM7SUFHN0MsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBQyxLQUFhO1FBQ3BELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakIsTUFBTSxTQUFTLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQzNDLG9DQUFvQztRQUNwQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFFdEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxvQkFBSyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUU7WUFDOUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsNEJBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDNUQsU0FBUyxFQUFFLFlBQVk7U0FDeEIsQ0FBQyxDQUFDO1FBQ0gsV0FBVyxDQUFDLHVCQUF1QixDQUFDO1lBQ2xDLFNBQVMsRUFBRSxhQUFhO1lBQ3hCLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLDRCQUFhLENBQUMsTUFBTSxFQUFFO1NBQzdELENBQUMsQ0FBQztRQUVILE1BQU0saUJBQWlCLEdBQUcsSUFBSSxxQkFBUSxDQUFDLEtBQUss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T0QsNENBNE9DIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHsgQ2ZuT3V0cHV0IH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBBdHRyaWJ1dGVUeXBlLCBUYWJsZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1keW5hbW9kYic7XG5pbXBvcnQgeyBGdW5jdGlvbiwgUnVudGltZSwgQ29kZSB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XG5pbXBvcnQgeyBSZXN0QXBpLCBMYW1iZGFJbnRlZ3JhdGlvbiwgUmVzcG9uc2VUeXBlLCBDZm5NZXRob2QgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXlcIjtcbmltcG9ydCB7IFN0YWNrIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgaWFtIGZyb20gJ2F3cy1jZGstbGliL2F3cy1pYW0nO1xuaW1wb3J0IHsgQXBpQ29tbW9uUmVzcG9uc2UgfSBmcm9tICcuLi9tb2R1bGVzL0NvbW1vbi9hcGktY29tbW9uLXJlc3BvbnNlJztcblxuLy8gSW1wb3J0IHRoZSBBV1MgU0RLIG1vZHVsZVxuaW1wb3J0ICogYXMgQVdTIGZyb20gJ2F3cy1zZGsnO1xuaW1wb3J0IHsgUG9saWN5U3RhdGVtZW50IH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XG5pbXBvcnQgeyBTZWNyZXQgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtc2VjcmV0c21hbmFnZXInO1xuXG5leHBvcnQgY2xhc3MgUmVzdEFwaUNvbnN0cnVjdCBleHRlbmRzIENvbnN0cnVjdCB7XG4gIHB1YmxpYyByZXN0QXBpOiBSZXN0QXBpO1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsc3RhY2sgOiBTdGFjaykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG4gICAgY29uc3Qgc3RhY2tOYW1lID0gU3RhY2sub2YodGhpcykuc3RhY2tOYW1lO1xuICAgIC8vIENvbmZpZ3VyZSB0aGUgQVdTIFNESyB3aXRoIHJlZ2lvblxuICAgIEFXUy5jb25maWcudXBkYXRlKHsgcmVnaW9uOiBwcm9jZXNzLmVudi5BV1NfUkVHSU9OIH0pO1xuXG4gICAgY29uc3Qgc2F2ZUFkZHJlc3MgPSBuZXcgVGFibGUoc3RhY2ssIFwiRGV0YWlsc1wiLCB7XG4gICAgICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogXCJVc2VySWRcIiwgdHlwZTogQXR0cmlidXRlVHlwZS5TVFJJTkcgfSxcbiAgICAgIHRhYmxlTmFtZTogXCJDdXN0b21lckRCXCIsXG4gICAgfSk7XG4gICAgc2F2ZUFkZHJlc3MuYWRkR2xvYmFsU2Vjb25kYXJ5SW5kZXgoe1xuICAgICAgaW5kZXhOYW1lOiAnVXNlcklkSW5kZXgnLFxuICAgICAgcGFydGl0aW9uS2V5OiB7IG5hbWU6ICdVc2VySWQnLCB0eXBlOiBBdHRyaWJ1dGVUeXBlLlNUUklORyB9LFxuICAgIH0pO1xuXG4gICAgY29uc3QgZ2V0VXNlcmRhdGFMYW1iZGEgPSBuZXcgRnVuY3Rpb24oc3RhY2ssIFwiR2V0Q3VzdG9tZXJBZGRyZXNzTGFtYmRhSGFuZGxlclwiLCB7XG4gICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18yMF9YLFxuICAgICAgY29kZTogQ29kZS5mcm9tQXNzZXQoJ2hhbmRsZXInKSwgXG4gICAgICBoYW5kbGVyOiAnZ2V0SGFuZGxlci5oYW5kbGVyJyxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIFRBQkxFX05BTUU6IHNhdmVBZGRyZXNzLnRhYmxlTmFtZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgZ2V0VXNlcmRhdGFMYW1iZGEuZ3JhbnRQcmluY2lwYWwuYWRkVG9QcmluY2lwYWxQb2xpY3koXG4gICAgICBuZXcgUG9saWN5U3RhdGVtZW50KHtcbiAgICAgICAgcmVzb3VyY2VzOiBbJyonXSxcbiAgICAgICAgYWN0aW9uczogWydkeW5hbW9kYjpnZXRJdGVtJywgJ3NlY3JldHNtYW5hZ2VyOkdldFNlY3JldFZhbHVlJ10sXG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgY29uc3Qgc2F2ZVVzZXJkYXRhTGFtYmRhID0gbmV3IEZ1bmN0aW9uKHN0YWNrLCBcIlB1dEN1c3RvbWVyQWRkcmVzc0xhbWJkYUhhbmRsZXJcIiwge1xuICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMjBfWCxcbiAgICAgIGNvZGU6IENvZGUuZnJvbUFzc2V0KFwiaGFuZGxlclwiKSxcbiAgICAgIGhhbmRsZXI6ICdzYXZlSGFuZGxlci5oYW5kbGVyJyxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIFRBQkxFX05BTUU6IHNhdmVBZGRyZXNzLnRhYmxlTmFtZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgc2F2ZVVzZXJkYXRhTGFtYmRhLmdyYW50UHJpbmNpcGFsLmFkZFRvUHJpbmNpcGFsUG9saWN5KFxuICAgICAgbmV3IFBvbGljeVN0YXRlbWVudCh7XG4gICAgICAgIHJlc291cmNlczogWycqJ10sXG4gICAgICAgIGFjdGlvbnM6IFsnZHluYW1vZGI6UHV0SXRlbScsICdzZWNyZXRzbWFuYWdlcjpHZXRTZWNyZXRWYWx1ZSddLFxuICAgICAgfSksXG4gICAgKTtcbiAgICBnZXRVc2VyZGF0YUxhbWJkYS5yb2xlPy5hZGRNYW5hZ2VkUG9saWN5KGlhbS5NYW5hZ2VkUG9saWN5LmZyb21Bd3NNYW5hZ2VkUG9saWN5TmFtZSgnQW1hem9uRHluYW1vREJGdWxsQWNjZXNzJykpO1xuICAgIHNhdmVBZGRyZXNzLmdyYW50V3JpdGVEYXRhKHNhdmVVc2VyZGF0YUxhbWJkYSk7XG5cbiAgICBjb25zdCByZXN0QXBpID0gbmV3IFJlc3RBcGkodGhpcywgXCJVc2VyQ29udGFjdHNcIiwge1xuICAgICAgZGVmYXVsdE1ldGhvZE9wdGlvbnM6IHtcbiAgICAgICAgYXBpS2V5UmVxdWlyZWQ6IHRydWUsXG4gICAgICB9LFxuICAgICAgZGVmYXVsdENvcnNQcmVmbGlnaHRPcHRpb25zOntcbiAgICAgICAgc3RhdHVzQ29kZTogMjA0LFxuICAgICAgICBhbGxvd09yaWdpbnM6IFtcIicqJ1wiXSxcbiAgICAgICAgYWxsb3dIZWFkZXJzOiBbJ0NvbnRlbnQtVHlwZScsJ0F1dGhvcml6YXRpb24nLCdYLUFwaS1LZXknXSxcbiAgICAgICAgYWxsb3dNZXRob2RzOiBbJ1BPU1QnLCAnR0VUJ11cbiAgICAgIH1cbiAgICAgIFxuICAgIH0pO1xuICAgIHRoaXMucmVzdEFwaSA9IHJlc3RBcGk7XG4gICAgY29uc3QgdXNlckFkZHJlc3NBcGkgPSByZXN0QXBpLnJvb3QucmVzb3VyY2VGb3JQYXRoKCd1c2VyRGV0YWlscycpO1xuICAgIHVzZXJBZGRyZXNzQXBpLmFkZE1ldGhvZCgnR0VUJywgbmV3IExhbWJkYUludGVncmF0aW9uKGdldFVzZXJkYXRhTGFtYmRhKSk7XG4gICAgdXNlckFkZHJlc3NBcGkuYWRkTWV0aG9kKCdQT1NUJywgbmV3IExhbWJkYUludGVncmF0aW9uKHNhdmVVc2VyZGF0YUxhbWJkYSkpO1xuICAgIFxuICAgIC8vIGNvbnN0IGFwaUtleSA9IGFwaS5hZGRBcGlLZXkoJ0FwaUtleScse1xuICAgIC8vICAgYXBpS2V5TmFtZTogJ3R1QXBpS2V5JyxcbiAgICAvLyAgIHZhbHVlOiAndGhpc0lzSnVzdFNhbXBsZUFQaTEyMycgLy8gd2UgY2FuIGdldCB0aGUgYXBpcyB1c2luZyBhd3Mgc2VjcmV0IGFuZCBnZXQgdGhlIGtleSB0byBmZXRjaCBoZXJlIFxuICAgIC8vIH0pO1xuICAgIC8vIGNvbnNvbGUubG9nKFwi8J+agCB+IFJlc3RBcGlDb25zdHJ1Y3QgfiBjb25zdHJ1Y3RvciB+IGFwaUtleTpcIiwgYXBpS2V5KVxuICAgIC8vIGNvbnN0IHBsYW4gPSBhcGkuYWRkVXNhZ2VQbGFuKCdUdV9hcGktdXNhZ2UtcGxhbicsIHsgLy8gd2UgY2FuIHVzZSByYXRlIGxpbWl0IGFuZCBvdGhlciB1c2FnZSBwbGFucyBcbiAgICAvLyAgIG5hbWU6IGBhcGktdXNhZ2UtcGxhbmAsXG4gICAgLy8gICBhcGlTdGFnZXM6IFt7IHN0YWdlOiBhcGkuZGVwbG95bWVudFN0YWdlIH1dLFxuICAgIC8vIH0pO1xuXG4gIFxuICAgIC8vIHBsYW4uYWRkQXBpS2V5KGFwaUtleSk7XG4gIFxuICAgIC8vIG5ldyBDZm5PdXRwdXQodGhpcywgXCJBUEkgVVJMXCIsIHtcbiAgICAvLyAgIHZhbHVlOiBhcGkudXJsID8/IFwiU29tZXRoaW5nIHdlbnQgd3JvbmdcIlxuICAgIC8vIH0pO1xuICAgIHRoaXMuYWRkQXBpS2V5KHN0YWNrTmFtZSwgcmVzdEFwaSk7XG4gICAgdGhpcy5hZGRBcGlSZXNwb25zZXMocmVzdEFwaSk7XG5cbiAgICByZXN0QXBpLm1ldGhvZHNcbiAgICAgIC5maWx0ZXIobWV0aG9kID0+IG1ldGhvZC5odHRwTWV0aG9kID09PSAnT1BUSU9OUycpXG4gICAgICAuZm9yRWFjaChtZXRob2QgPT4ge1xuICAgICAgICBjb25zdCBjZm5NZXRob2QgPSBtZXRob2Qubm9kZS5kZWZhdWx0Q2hpbGQgYXMgQ2ZuTWV0aG9kO1xuICAgICAgICBjZm5NZXRob2QuYXBpS2V5UmVxdWlyZWQgPSBmYWxzZTtcbiAgICAgIH0pO1xuICB9O1xuXG5hZGRBcGlLZXkoc3RhY2tOYW1lOiBzdHJpbmcsIHJlc3RBcGk6IFJlc3RBcGkpIHtcbiAgICAvLyBBUEkgR2F0ZXdheSBBUEkgS2V5XG4gICAgY29uc3Qgc2VjcmV0ID0gbmV3IFNlY3JldCh0aGlzLCAnVXNlckNvbnRhY3RzLXVzZXJBZGRyZXNzLWFwaS1zZWNyZXQnLCB7XG4gICAgICBzZWNyZXROYW1lOiBgJHtzdGFja05hbWV9L2FwaS1rZXlgLFxuICAgICAgZGVzY3JpcHRpb246ICdNb2JpbGUgcHVzaCBub3RpZmljYXRpb24gQVBJIEdhdGV3YXkgQVBJIEtleScsXG4gICAgICBnZW5lcmF0ZVNlY3JldFN0cmluZzoge1xuICAgICAgICBnZW5lcmF0ZVN0cmluZ0tleTogJ2tleScsXG4gICAgICAgIHNlY3JldFN0cmluZ1RlbXBsYXRlOiBKU09OLnN0cmluZ2lmeSh7fSksXG4gICAgICAgIGV4Y2x1ZGVDaGFyYWN0ZXJzOiAnICUrfmAjJCYqKCl8W117fTo7PD4/IVxcJy9AXCJcXFxcJyxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBhcGlLZXkgPSByZXN0QXBpLmFkZEFwaUtleSgnQXBpS2V5Jywge1xuICAgICAgYXBpS2V5TmFtZTogJ3RoaXMuX2FwaUtleU5hbWUnLFxuICAgICAgdmFsdWU6IHNlY3JldC5zZWNyZXRWYWx1ZUZyb21Kc29uKCdrZXknKS50b1N0cmluZygpLFxuICAgIH0pO1xuXG4gICAgLy8gdGhpcy5yZXN0QVBJS2V5QXJuID0gc2VjcmV0LnNlY3JldEFybjtcblxuICAgIC8vIG5ldyBDZm5PdXRwdXQodGhpcywgJ3Jlc3RBUElLZXlBcm5BdFNvdXJjZScsIHtcbiAgICAvLyAgIHZhbHVlOiB0aGlzLnJlc3RBUElLZXlBcm4gPz8gJycsXG4gICAgLy8gfSk7XG5cbiAgICBjb25zdCBwbGFuID0gcmVzdEFwaS5hZGRVc2FnZVBsYW4oJ3VzZXJBUGktYWRkcmVzcy11c2FnZS1wbGFuJywge1xuICAgICAgbmFtZTogYCR7c3RhY2tOYW1lfS1hcGktdXNhZ2UtcGxhbmAsXG4gICAgICBhcGlTdGFnZXM6IFt7IHN0YWdlOiByZXN0QXBpLmRlcGxveW1lbnRTdGFnZSB9XSxcbiAgICB9KTtcblxuICAgIHBsYW4uYWRkQXBpS2V5KGFwaUtleSk7XG4gIH1cblxuICBhZGRBcGlSZXNwb25zZXMocmVzdEFwaTogUmVzdEFwaSkge1xuICAgIGNvbnN0IGNvbW1vblJlc3BvbnNlID0gbmV3IEFwaUNvbW1vblJlc3BvbnNlKCk7XG4gICAgLy8gKioqKioqKioqKioqKioqKiogRXJyb3IgNDAwXG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ0JBRF9SRVFVRVNUX0JPRFknLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuQkFEX1JFUVVFU1RfQk9EWSxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJ1xcJypcXCcnLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDAsICdCYWQgUmVxdWVzdCcsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICAvLyAqKioqKioqKioqKioqKioqKkVycm9yIDQwM1xuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdXQUZfRklMVEVSRUQnLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuV0FGX0ZJTFRFUkVELFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMywgJ0ZvcmJpZGRlbicsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnRVhQSVJFRF9UT0tFTicsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5FWFBJUkVEX1RPS0VOLFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDMsICdGb3JiaWRkZW4nLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ0lOVkFMSURfQVBJX0tFWScsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5JTlZBTElEX0FQSV9LRVksXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMywgJ0ZvcmJpZGRlbicsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnQUNDRVNTX0RFTklFRCcsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5BQ0NFU1NfREVOSUVELFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDMsICdGb3JiaWRkZW4nLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ0lOVkFMSURfU0lHTkFUVVJFJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLklOVkFMSURfU0lHTkFUVVJFLFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDMsICdGb3JiaWRkZW4nLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ01JU1NJTkdfQVVUSEVOVElDQVRJT05fVE9LRU4nLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuTUlTU0lOR19BVVRIRU5USUNBVElPTl9UT0tFTixcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnOiAnT1BUSU9OUywgR0VUJyxcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnOiAnQ29udGVudC1UeXBlLCBBdXRob3JpemF0aW9uJyxcbiAgICAgICAgJ1ZhcnknOiAnT3JpZ2luJyxcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDAzLCAnRm9yYmlkZGVuJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIC8vICoqKioqKioqKioqKioqKioqRXJyb3IgNXh4XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ0RFRkFVTFRfNVhYJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLkRFRkFVTFRfNVhYLFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig1MDAsICdJbnRlcm5hbCBTZXJ2ZXIgRXJyb3InLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgLy8gKioqKioqKioqKioqKioqKiogRXJyb3IgNDAxXG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ1VOQVVUSE9SSVpFRCcsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5VTkFVVEhPUklaRUQsXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMSwgJ1VuYXV0aG9yaXplZCcsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICAvLyAqKioqKioqKioqKioqKioqKiBFcnJvciBmb3IgNDI5XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ1FVT1RBX0VYQ0VFREVEJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLlFVT1RBX0VYQ0VFREVELFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MjksICdMaW1pdCBFeGNlZWRlZCcsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnVEhST1RUTEVEJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLlRIUk9UVExFRCxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDI5LCAnTGltaXQgRXhjZWVkZWQnLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==