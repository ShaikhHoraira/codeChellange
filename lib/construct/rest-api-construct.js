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
        //this.addApiResponses(restApi);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdC1hcGktY29uc3RydWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnN0cnVjdC9yZXN0LWFwaS1jb25zdHJ1Y3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQTJDO0FBQzNDLDJDQUF1QztBQUN2QywyREFBZ0U7QUFDaEUsdURBQWlFO0FBQ2pFLCtEQUFpRztBQUNqRyw2Q0FBb0M7QUFDcEMsMkNBQTJDO0FBQzNDLCtFQUEwRTtBQUMxRSw2QkFBOEI7QUFDOUIsNEJBQTRCO0FBQzVCLCtCQUErQjtBQUMvQixpREFBc0Q7QUFDdEQsMERBQTBEO0FBRTFELE1BQWEsZ0JBQWlCLFNBQVEsc0JBQVM7SUFHN0MsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBQyxLQUFhO1FBQ3BELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakIsTUFBTSxTQUFTLEdBQUcsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQzNDLG9DQUFvQztRQUNwQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFFdEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxvQkFBSyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUU7WUFDOUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsNEJBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDNUQsU0FBUyxFQUFFLFlBQVk7U0FDeEIsQ0FBQyxDQUFDO1FBQ0gsV0FBVyxDQUFDLHVCQUF1QixDQUFDO1lBQ2xDLFNBQVMsRUFBRSxhQUFhO1lBQ3hCLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLDRCQUFhLENBQUMsTUFBTSxFQUFFO1NBQzdELENBQUMsQ0FBQztRQUNILE1BQU0s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cm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCB7IEF0dHJpYnV0ZVR5cGUsIFRhYmxlIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWR5bmFtb2RiJztcbmltcG9ydCB7IFJ1bnRpbWUsIENvZGUsIEZ1bmN0aW9uIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYSc7XG5pbXBvcnQgeyBSZXN0QXBpLCBMYW1iZGFJbnRlZ3JhdGlvbiwgUmVzcG9uc2VUeXBlLCBDZm5NZXRob2QgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXlcIjtcbmltcG9ydCB7IFN0YWNrIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgaWFtIGZyb20gJ2F3cy1jZGstbGliL2F3cy1pYW0nO1xuaW1wb3J0IHsgQXBpQ29tbW9uUmVzcG9uc2UgfSBmcm9tICcuLi9tb2R1bGVzL0NvbW1vbi9hcGktY29tbW9uLXJlc3BvbnNlJztcbmltcG9ydCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuLy8gSW1wb3J0IHRoZSBBV1MgU0RLIG1vZHVsZVxuaW1wb3J0ICogYXMgQVdTIGZyb20gJ2F3cy1zZGsnO1xuaW1wb3J0IHsgUG9saWN5U3RhdGVtZW50IH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XG4vL2ltcG9ydCB7IFNlY3JldCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1zZWNyZXRzbWFuYWdlcic7XG5cbmV4cG9ydCBjbGFzcyBSZXN0QXBpQ29uc3RydWN0IGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgcHVibGljIHJlc3RBcGk6IFJlc3RBcGk7XG5cbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZyxzdGFjayA6IFN0YWNrKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcbiAgICBjb25zdCBzdGFja05hbWUgPSBTdGFjay5vZih0aGlzKS5zdGFja05hbWU7XG4gICAgLy8gQ29uZmlndXJlIHRoZSBBV1MgU0RLIHdpdGggcmVnaW9uXG4gICAgQVdTLmNvbmZpZy51cGRhdGUoeyByZWdpb246IHByb2Nlc3MuZW52LkFXU19SRUdJT04gfSk7XG5cbiAgICBjb25zdCBzYXZlQWRkcmVzcyA9IG5ldyBUYWJsZShzdGFjaywgXCJEZXRhaWxzXCIsIHtcbiAgICAgIHBhcnRpdGlvbktleTogeyBuYW1lOiBcIlVzZXJJZFwiLCB0eXBlOiBBdHRyaWJ1dGVUeXBlLlNUUklORyB9LFxuICAgICAgdGFibGVOYW1lOiBcIkN1c3RvbWVyREJcIixcbiAgICB9KTtcbiAgICBzYXZlQWRkcmVzcy5hZGRHbG9iYWxTZWNvbmRhcnlJbmRleCh7XG4gICAgICBpbmRleE5hbWU6ICdVc2VySWRJbmRleCcsXG4gICAgICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogJ1VzZXJJZCcsIHR5cGU6IEF0dHJpYnV0ZVR5cGUuU1RSSU5HIH0sXG4gICAgfSk7XG4gICAgY29uc3QgaGFuZGxlckRpciA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi9saWInKTtcbiAgICBjb25zdCBnZXRVc2VyZGF0YUxhbWJkYSA9IG5ldyBGdW5jdGlvbihzdGFjaywgXCJHZXRDdXN0b21lckFkZHJlc3NMYW1iZGFIYW5kbGVyXCIsIHtcbiAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzIwX1gsXG4gICAgICBjb2RlOiBDb2RlLmZyb21Bc3NldChoYW5kbGVyRGlyKSwgXG4gICAgICBoYW5kbGVyOiAnaGFuZGxlci9nZXRIYW5kbGVyLmhhbmRsZXInLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgVEFCTEVfTkFNRTogc2F2ZUFkZHJlc3MudGFibGVOYW1lLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBnZXRVc2VyZGF0YUxhbWJkYS5ncmFudFByaW5jaXBhbC5hZGRUb1ByaW5jaXBhbFBvbGljeShcbiAgICAgIG5ldyBQb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICByZXNvdXJjZXM6IFsnKiddLFxuICAgICAgICBhY3Rpb25zOiBbJ2R5bmFtb2RiOmdldEl0ZW0nLCAnc2VjcmV0c21hbmFnZXI6R2V0U2VjcmV0VmFsdWUnXSxcbiAgICAgIH0pLFxuICAgICk7XG4gICAgXG5cbiAgICBjb25zdCBzYXZlVXNlcmRhdGFMYW1iZGEgPSBuZXcgRnVuY3Rpb24oc3RhY2ssIFwiUHV0Q3VzdG9tZXJBZGRyZXNzTGFtYmRhSGFuZGxlclwiLCB7XG4gICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18yMF9YLCAvLyBBZGp1c3QgcnVudGltZSBpZiBuZWNlc3NhcnlcbiAgICAgIGNvZGU6IENvZGUuZnJvbUFzc2V0KGhhbmRsZXJEaXIpLFxuICAgICAgaGFuZGxlcjogJ2hhbmRsZXIvc2F2ZUhhbmRsZXIuaGFuZGxlcicsXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBUQUJMRV9OQU1FOiBzYXZlQWRkcmVzcy50YWJsZU5hbWUsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgc2F2ZVVzZXJkYXRhTGFtYmRhLmdyYW50UHJpbmNpcGFsLmFkZFRvUHJpbmNpcGFsUG9saWN5KFxuICAgICAgbmV3IFBvbGljeVN0YXRlbWVudCh7XG4gICAgICAgIHJlc291cmNlczogWycqJ10sXG4gICAgICAgIGFjdGlvbnM6IFsnZHluYW1vZGI6UHV0SXRlbScsICdzZWNyZXRzbWFuYWdlcjpHZXRTZWNyZXRWYWx1ZSddLFxuICAgICAgfSksXG4gICAgKTtcbiAgICBnZXRVc2VyZGF0YUxhbWJkYS5yb2xlPy5hZGRNYW5hZ2VkUG9saWN5KGlhbS5NYW5hZ2VkUG9saWN5LmZyb21Bd3NNYW5hZ2VkUG9saWN5TmFtZSgnQW1hem9uRHluYW1vREJGdWxsQWNjZXNzJykpO1xuICAgIHNhdmVBZGRyZXNzLmdyYW50V3JpdGVEYXRhKHNhdmVVc2VyZGF0YUxhbWJkYSk7XG5cbiAgICBjb25zdCByZXN0QXBpID0gbmV3IFJlc3RBcGkodGhpcywgXCJVc2VyQ29udGFjdHNcIiwge1xuICAgICAgZGVmYXVsdE1ldGhvZE9wdGlvbnM6IHtcbiAgICAgICAgYXBpS2V5UmVxdWlyZWQ6IHRydWUsXG4gICAgICB9LFxuICAgICAgZGVmYXVsdENvcnNQcmVmbGlnaHRPcHRpb25zOntcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBhbGxvd09yaWdpbnM6IFsnKiddLFxuICAgICAgICBhbGxvd0hlYWRlcnM6IFsnQ29udGVudC1UeXBlJywnQXV0aG9yaXphdGlvbicsJ1gtQXBpLUtleSddLFxuICAgICAgICBhbGxvd01ldGhvZHM6IFsnUE9TVCcsICdHRVQnXVxuICAgICAgfVxuICAgICAgXG4gICAgfSk7XG4gICAgdGhpcy5yZXN0QXBpID0gcmVzdEFwaTtcbiAgICBjb25zdCB1c2VyQWRkcmVzc0FwaSA9IHJlc3RBcGkucm9vdC5yZXNvdXJjZUZvclBhdGgoJ3VzZXJEZXRhaWxzJyk7XG4gICAgdXNlckFkZHJlc3NBcGkuYWRkTWV0aG9kKCdHRVQnLCBuZXcgTGFtYmRhSW50ZWdyYXRpb24oZ2V0VXNlcmRhdGFMYW1iZGEpKTtcbiAgICB1c2VyQWRkcmVzc0FwaS5hZGRNZXRob2QoJ1BPU1QnLCBuZXcgTGFtYmRhSW50ZWdyYXRpb24oc2F2ZVVzZXJkYXRhTGFtYmRhKSk7XG4gICAgXG4gICAgLy8gY29uc3QgYXBpS2V5ID0gYXBpLmFkZEFwaUtleSgnQXBpS2V5Jyx7XG4gICAgY29uc29sZS5sb2coXCLwn5qAIH4gUmVzdEFwaUNvbnN0cnVjdCB+IGNvbnN0cnVjdG9yIH4gcmVzdEFwaTpcIiwgcmVzdEFwaSlcbiAgICAvLyAgIGFwaUtleU5hbWU6ICd0dUFwaUtleScsXG4gICAgLy8gICB2YWx1ZTogJ3RoaXNJc0p1c3RTYW1wbGVBUGkxMjMnIC8vIHdlIGNhbiBnZXQgdGhlIGFwaXMgdXNpbmcgYXdzIHNlY3JldCBhbmQgZ2V0IHRoZSBrZXkgdG8gZmV0Y2ggaGVyZSBcbiAgICAvLyB9KTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIvCfmoAgfiBSZXN0QXBpQ29uc3RydWN0IH4gY29uc3RydWN0b3IgfiBhcGlLZXk6XCIsIGFwaUtleSlcbiAgICAvLyBjb25zdCBwbGFuID0gYXBpLmFkZFVzYWdlUGxhbignVHVfYXBpLXVzYWdlLXBsYW4nLCB7IC8vIHdlIGNhbiB1c2UgcmF0ZSBsaW1pdCBhbmQgb3RoZXIgdXNhZ2UgcGxhbnMgXG4gICAgLy8gICBuYW1lOiBgYXBpLXVzYWdlLXBsYW5gLFxuICAgIC8vICAgYXBpU3RhZ2VzOiBbeyBzdGFnZTogYXBpLmRlcGxveW1lbnRTdGFnZSB9XSxcbiAgICAvLyB9KTtcblxuICBcbiAgICAvLyBwbGFuLmFkZEFwaUtleShhcGlLZXkpO1xuICBcbiAgICAvLyBuZXcgQ2ZuT3V0cHV0KHRoaXMsIFwiQVBJIFVSTFwiLCB7XG4gICAgLy8gICB2YWx1ZTogYXBpLnVybCA/PyBcIlNvbWV0aGluZyB3ZW50IHdyb25nXCJcbiAgICAvLyB9KTtcbiAgICB0aGlzLmFkZEFwaUtleShzdGFja05hbWUsIHJlc3RBcGkpO1xuICAgIC8vdGhpcy5hZGRBcGlSZXNwb25zZXMocmVzdEFwaSk7XG5cbiAgICByZXN0QXBpLm1ldGhvZHNcbiAgICAgIC5maWx0ZXIobWV0aG9kID0+IG1ldGhvZC5odHRwTWV0aG9kID09PSAnT1BUSU9OUycpXG4gICAgICAuZm9yRWFjaChtZXRob2QgPT4ge1xuICAgICAgICBjb25zdCBjZm5NZXRob2QgPSBtZXRob2Qubm9kZS5kZWZhdWx0Q2hpbGQgYXMgQ2ZuTWV0aG9kO1xuICAgICAgICBjZm5NZXRob2QuYXBpS2V5UmVxdWlyZWQgPSBmYWxzZTtcbiAgICAgIH0pO1xuICB9O1xuXG5hZGRBcGlLZXkoc3RhY2tOYW1lOiBzdHJpbmcsIHJlc3RBcGk6IFJlc3RBcGkpIHtcbiAgICAvLyBBUEkgR2F0ZXdheSBBUEkgS2V5XG4gICAgLy8gY29uc3Qgc2VjcmV0ID0gbmV3IFNlY3JldCh0aGlzLCAnVXNlckNvbnRhY3RzLXVzZXJBZGRyZXNzLWFwaS1zZWNyZXQnLCB7XG4gICAgLy8gICBzZWNyZXROYW1lOiBgJHtzdGFja05hbWV9L2FwaS1rZXlgLFxuICAgIC8vICAgZGVzY3JpcHRpb246ICdNb2JpbGUgcHVzaCBub3RpZmljYXRpb24gQVBJIEdhdGV3YXkgQVBJIEtleScsXG4gICAgLy8gICBnZW5lcmF0ZVNlY3JldFN0cmluZzoge1xuICAgIC8vICAgICBnZW5lcmF0ZVN0cmluZ0tleTogJ2tleScsXG4gICAgLy8gICAgIHNlY3JldFN0cmluZ1RlbXBsYXRlOiBKU09OLnN0cmluZ2lmeSh7fSksXG4gICAgLy8gICAgIGV4Y2x1ZGVDaGFyYWN0ZXJzOiAnICUrfmAjJCYqKCl8W117fTo7PD4/IVxcJy9AXCJcXFxcJyxcbiAgICAvLyAgIH0sXG4gICAgLy8gfSk7XG5cbiAgICBjb25zdCBhcGlLZXkgPSByZXN0QXBpLmFkZEFwaUtleSgnQXBpS2V5Jywge1xuICAgICAgYXBpS2V5TmFtZTogJ3RoaXMuX2FwaUtleU5hbWUnLFxuICAgICAgdmFsdWU6ICdzZWNyZXQuc2VjcmV0VmFsdWVGcm9tSnNvbicsXG4gICAgfSk7XG5cbiAgICAvLyB0aGlzLnJlc3RBUElLZXlBcm4gPSBzZWNyZXQuc2VjcmV0QXJuO1xuXG4gICAgLy8gbmV3IENmbk91dHB1dCh0aGlzLCAncmVzdEFQSUtleUFybkF0U291cmNlJywge1xuICAgIC8vICAgdmFsdWU6IHRoaXMucmVzdEFQSUtleUFybiA/PyAnJyxcbiAgICAvLyB9KTtcblxuICAgIGNvbnN0IHBsYW4gPSByZXN0QXBpLmFkZFVzYWdlUGxhbigndXNlckFQaS1hZGRyZXNzLXVzYWdlLXBsYW4nLCB7XG4gICAgICBuYW1lOiBgJHtzdGFja05hbWV9LWFwaS11c2FnZS1wbGFuYCxcbiAgICAgIGFwaVN0YWdlczogW3sgc3RhZ2U6IHJlc3RBcGkuZGVwbG95bWVudFN0YWdlIH1dLFxuICAgIH0pO1xuXG4gICAgcGxhbi5hZGRBcGlLZXkoYXBpS2V5KTtcbiAgfVxuXG4gIGFkZEFwaVJlc3BvbnNlcyhyZXN0QXBpOiBSZXN0QXBpKSB7XG4gICAgY29uc3QgY29tbW9uUmVzcG9uc2UgPSBuZXcgQXBpQ29tbW9uUmVzcG9uc2UoKTtcbiAgICAvLyAqKioqKioqKioqKioqKioqKiBFcnJvciA0MDBcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnQkFEX1JFUVVFU1RfQk9EWScsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5CQURfUkVRVUVTVF9CT0RZLFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMCwgJ0JhZCBSZXF1ZXN0JywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIC8vICoqKioqKioqKioqKioqKioqRXJyb3IgNDAzXG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ1dBRl9GSUxURVJFRCcsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5XQUZfRklMVEVSRUQsXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcblxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDMsICdGb3JiaWRkZW4nLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ0VYUElSRURfVE9LRU4nLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuRVhQSVJFRF9UT0tFTixcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDMsICdGb3JiaWRkZW4nLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ0lOVkFMSURfQVBJX0tFWScsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5JTlZBTElEX0FQSV9LRVksXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDAzLCAnRm9yYmlkZGVuJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdBQ0NFU1NfREVOSUVEJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLkFDQ0VTU19ERU5JRUQsXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDAzLCAnRm9yYmlkZGVuJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdJTlZBTElEX1NJR05BVFVSRScsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5JTlZBTElEX1NJR05BVFVSRSxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDMsICdGb3JiaWRkZW4nLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ01JU1NJTkdfQVVUSEVOVElDQVRJT05fVE9LRU4nLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuTUlTU0lOR19BVVRIRU5USUNBVElPTl9UT0tFTixcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcyc6ICdPUFRJT05TLCBHRVQnLFxuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycyc6ICdDb250ZW50LVR5cGUsIEF1dGhvcml6YXRpb24nLFxuICAgICAgICAnVmFyeSc6ICdPcmlnaW4nLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDMsICdGb3JiaWRkZW4nLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgLy8gKioqKioqKioqKioqKioqKipFcnJvciA1eHhcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnREVGQVVMVF81WFgnLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuREVGQVVMVF81WFgsXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNTAwLCAnSW50ZXJuYWwgU2VydmVyIEVycm9yJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIC8vICoqKioqKioqKioqKioqKioqIEVycm9yIDQwMVxuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdVTkFVVEhPUklaRUQnLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuVU5BVVRIT1JJWkVELFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMSwgJ1VuYXV0aG9yaXplZCcsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICAvLyAqKioqKioqKioqKioqKioqKiBFcnJvciBmb3IgNDI5XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ1FVT1RBX0VYQ0VFREVEJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLlFVT1RBX0VYQ0VFREVELFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQyOSwgJ0xpbWl0IEV4Y2VlZGVkJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdUSFJPVFRMRUQnLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuVEhST1RUTEVELFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQyOSwgJ0xpbWl0IEV4Y2VlZGVkJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG59XG4iXX0=