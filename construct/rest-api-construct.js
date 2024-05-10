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
//import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
class RestApiConstruct extends constructs_1.Construct {
    constructor(scope, id, stack) {
        super(scope, id);
        //const stackName = Stack.of(this).stackName;
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
        const apiKey = restApi.addApiKey('ApiKey', {
            apiKeyName: 'tuApiKey',
            value: 'thisIsJustSampleAPi123' // we can get the apis using aws secret and get the key to fetch here 
        });
        console.log("🚀 ~ RestApiConstruct ~ constructor ~ apiKey:", apiKey);
        const plan = restApi.addUsagePlan('Tu_api-usage-plan', {
            name: `api-usage-plan`,
            apiStages: [{ stage: restApi.deploymentStage }],
        });
        plan.addApiKey(apiKey);
        // new CfnOutput(this, "API URL", {
        //   value: api.url ?? "Something went wrong"
        // });
        // this.addApiKey(stackName, restApi);
        this.addApiResponses(restApi);
        restApi.methods
            .filter(method => method.httpMethod === 'OPTIONS')
            .forEach(method => {
            const cfnMethod = method.node.defaultChild;
            cfnMethod.apiKeyRequired = false;
        });
    }
    ;
    // addApiKey(stackName: string, restApi: RestApi) {
    //     // API Gateway API Key
    //     // const secret = new Secret(this, 'UserContacts-userAddress-api-secret', {
    //     //   secretName: `${stackName}/api-key`,
    //     //   description: 'Mobile push notification API Gateway API Key',
    //     //   generateSecretString: {
    //     //     generateStringKey: 'key',
    //     //     secretStringTemplate: JSON.stringify({}),
    //     //     excludeCharacters: ' %+~`#$&*()|[]{}:;<>?!\'/@"\\',
    //     //   },
    //     // });
    //     const apiKey = restApi.addApiKey('ApiKey', {
    //       apiKeyName: 'this._apiKeyName',
    //       value: 'secret.secretValueFromJson',
    //     });
    //     // this.restAPIKeyArn = secret.secretArn;
    //     // new CfnOutput(this, 'restAPIKeyArnAtSource', {
    //     //   value: this.restAPIKeyArn ?? '',
    //     // });
    //     const plan = restApi.addUsagePlan('userAPi-address-usage-plan', {
    //       name: `${stackName}-api-usage-plan`,
    //       apiStages: [{ stage: restApi.deploymentStage }],
    //     });
    //     plan.addApiKey(apiKey);
    //   }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdC1hcGktY29uc3RydWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVzdC1hcGktY29uc3RydWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUEyQztBQUMzQywyQ0FBdUM7QUFDdkMsMkRBQWdFO0FBQ2hFLHVEQUFpRTtBQUNqRSwrREFBaUc7QUFFakcsMkNBQTJDO0FBQzNDLCtFQUEwRTtBQUUxRSw0QkFBNEI7QUFDNUIsK0JBQStCO0FBQy9CLGlEQUFzRDtBQUN0RCwwREFBMEQ7QUFFMUQsTUFBYSxnQkFBaUIsU0FBUSxzQkFBUztJQUc3QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFDLEtBQWE7UUFDcEQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqQiw2Q0FBNkM7UUFDN0Msb0NBQW9DO1FBQ3BDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUV0RCxNQUFNLFdBQVcsR0FBRyxJQUFJLG9CQUFLLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRTtZQUM5QyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSw0QkFBYSxDQUFDLE1BQU0sRUFBRTtZQUM1RCxTQUFTLEVBQUUsWUFBWTtTQUN4QixDQUFDLENBQUM7UUFDSCxXQUFXLENBQUMsdUJBQXVCLENBQUM7WUFDbEMsU0FBUyxFQUFFLGFBQWE7WUFDeEIsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsNEJBQWEsQ0FBQyxNQUFNLEVBQUU7U0FDN0QsQ0FBQyxDQUFDO1FBRUgsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLHFCQUFRLENBQUMsS0FBSyxFQUFFLGlDQUFpQyxFQUFFO1lBQy9FLE9BQU8sRUFBRSxvQkFBTyxDQUFDLFdBQVc7WUFDNUIsSUFBSSxFQUFFLGlC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LEVBQUUsS0FBSzthQUNyQztZQUNELFNBQVMsRUFBRTtnQkFDVCxrQkFBa0IsRUFBRSxjQUFjLENBQUMsd0JBQXdCLENBQUMsR0FBRyxFQUFFLGNBQWMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLElBQUk7YUFDNUc7U0FDRixDQUFDLENBQUM7UUFDSCxrQ0FBa0M7UUFDbEMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixFQUFFO1lBQzNDLElBQUksRUFBRSw2QkFBWSxDQUFDLGNBQWM7WUFDakMsZUFBZSxFQUFFO2dCQUNmLDZCQUE2QixFQUFFLEtBQUs7YUFDckM7WUFDRCxTQUFTLEVBQUU7Z0JBQ1Qsa0JBQWtCLEVBQUUsY0FBYyxDQUFDLHdCQUF3QixDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLElBQUk7YUFDOUc7U0FDRixDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFO1lBQ3RDLElBQUksRUFBRSw2QkFBWSxDQUFDLFNBQVM7WUFDNUIsZUFBZSxFQUFFO2dCQUNmLDZCQUE2QixFQUFFLEtBQUs7YUFDckM7WUFDRCxTQUFTLEVBQUU7Z0JBQ1Qsa0JBQWtCLEVBQUUsY0FBYyxDQUFDLHdCQUF3QixDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLElBQUk7YUFDOUc7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUE5T0QsNENBOE9DIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHsgQ2ZuT3V0cHV0IH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBBdHRyaWJ1dGVUeXBlLCBUYWJsZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1keW5hbW9kYic7XG5pbXBvcnQgeyBGdW5jdGlvbiwgUnVudGltZSwgQ29kZSB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XG5pbXBvcnQgeyBSZXN0QXBpLCBMYW1iZGFJbnRlZ3JhdGlvbiwgUmVzcG9uc2VUeXBlLCBDZm5NZXRob2QgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXlcIjtcbmltcG9ydCB7IFN0YWNrIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgaWFtIGZyb20gJ2F3cy1jZGstbGliL2F3cy1pYW0nO1xuaW1wb3J0IHsgQXBpQ29tbW9uUmVzcG9uc2UgfSBmcm9tICcuLi9tb2R1bGVzL0NvbW1vbi9hcGktY29tbW9uLXJlc3BvbnNlJztcblxuLy8gSW1wb3J0IHRoZSBBV1MgU0RLIG1vZHVsZVxuaW1wb3J0ICogYXMgQVdTIGZyb20gJ2F3cy1zZGsnO1xuaW1wb3J0IHsgUG9saWN5U3RhdGVtZW50IH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XG4vL2ltcG9ydCB7IFNlY3JldCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1zZWNyZXRzbWFuYWdlcic7XG5cbmV4cG9ydCBjbGFzcyBSZXN0QXBpQ29uc3RydWN0IGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgcHVibGljIHJlc3RBcGk6IFJlc3RBcGk7XG5cbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZyxzdGFjayA6IFN0YWNrKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcbiAgICAvL2NvbnN0IHN0YWNrTmFtZSA9IFN0YWNrLm9mKHRoaXMpLnN0YWNrTmFtZTtcbiAgICAvLyBDb25maWd1cmUgdGhlIEFXUyBTREsgd2l0aCByZWdpb25cbiAgICBBV1MuY29uZmlnLnVwZGF0ZSh7IHJlZ2lvbjogcHJvY2Vzcy5lbnYuQVdTX1JFR0lPTiB9KTtcblxuICAgIGNvbnN0IHNhdmVBZGRyZXNzID0gbmV3IFRhYmxlKHN0YWNrLCBcIkRldGFpbHNcIiwge1xuICAgICAgcGFydGl0aW9uS2V5OiB7IG5hbWU6IFwiVXNlcklkXCIsIHR5cGU6IEF0dHJpYnV0ZVR5cGUuU1RSSU5HIH0sXG4gICAgICB0YWJsZU5hbWU6IFwiQ3VzdG9tZXJEQlwiLFxuICAgIH0pO1xuICAgIHNhdmVBZGRyZXNzLmFkZEdsb2JhbFNlY29uZGFyeUluZGV4KHtcbiAgICAgIGluZGV4TmFtZTogJ1VzZXJJZEluZGV4JyxcbiAgICAgIHBhcnRpdGlvbktleTogeyBuYW1lOiAnVXNlcklkJywgdHlwZTogQXR0cmlidXRlVHlwZS5TVFJJTkcgfSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGdldFVzZXJkYXRhTGFtYmRhID0gbmV3IEZ1bmN0aW9uKHN0YWNrLCBcIkdldEN1c3RvbWVyQWRkcmVzc0xhbWJkYUhhbmRsZXJcIiwge1xuICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMjBfWCxcbiAgICAgIGNvZGU6IENvZGUuZnJvbUFzc2V0KCdoYW5kbGVyJyksIFxuICAgICAgaGFuZGxlcjogJ2dldEhhbmRsZXIuaGFuZGxlcicsXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBUQUJMRV9OQU1FOiBzYXZlQWRkcmVzcy50YWJsZU5hbWUsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGdldFVzZXJkYXRhTGFtYmRhLmdyYW50UHJpbmNpcGFsLmFkZFRvUHJpbmNpcGFsUG9saWN5KFxuICAgICAgbmV3IFBvbGljeVN0YXRlbWVudCh7XG4gICAgICAgIHJlc291cmNlczogWycqJ10sXG4gICAgICAgIGFjdGlvbnM6IFsnZHluYW1vZGI6Z2V0SXRlbScsICdzZWNyZXRzbWFuYWdlcjpHZXRTZWNyZXRWYWx1ZSddLFxuICAgICAgfSksXG4gICAgKTtcblxuICAgIGNvbnN0IHNhdmVVc2VyZGF0YUxhbWJkYSA9IG5ldyBGdW5jdGlvbihzdGFjaywgXCJQdXRDdXN0b21lckFkZHJlc3NMYW1iZGFIYW5kbGVyXCIsIHtcbiAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzIwX1gsXG4gICAgICBjb2RlOiBDb2RlLmZyb21Bc3NldChcImhhbmRsZXJcIiksXG4gICAgICBoYW5kbGVyOiAnc2F2ZUhhbmRsZXIuaGFuZGxlcicsXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBUQUJMRV9OQU1FOiBzYXZlQWRkcmVzcy50YWJsZU5hbWUsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHNhdmVVc2VyZGF0YUxhbWJkYS5ncmFudFByaW5jaXBhbC5hZGRUb1ByaW5jaXBhbFBvbGljeShcbiAgICAgIG5ldyBQb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICByZXNvdXJjZXM6IFsnKiddLFxuICAgICAgICBhY3Rpb25zOiBbJ2R5bmFtb2RiOlB1dEl0ZW0nLCAnc2VjcmV0c21hbmFnZXI6R2V0U2VjcmV0VmFsdWUnXSxcbiAgICAgIH0pLFxuICAgICk7XG4gICAgZ2V0VXNlcmRhdGFMYW1iZGEucm9sZT8uYWRkTWFuYWdlZFBvbGljeShpYW0uTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoJ0FtYXpvbkR5bmFtb0RCRnVsbEFjY2VzcycpKTtcbiAgICBzYXZlQWRkcmVzcy5ncmFudFdyaXRlRGF0YShzYXZlVXNlcmRhdGFMYW1iZGEpO1xuXG5cblxuICAgIGNvbnN0IHJlc3RBcGkgPSBuZXcgUmVzdEFwaSh0aGlzLCBcIlVzZXJDb250YWN0c1wiLCB7XG4gICAgICBkZWZhdWx0TWV0aG9kT3B0aW9uczoge1xuICAgICAgICBhcGlLZXlSZXF1aXJlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBkZWZhdWx0Q29yc1ByZWZsaWdodE9wdGlvbnM6e1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDQsXG4gICAgICAgIGFsbG93T3JpZ2luczogW1wiJyonXCJdLFxuICAgICAgICBhbGxvd0hlYWRlcnM6IFsnQ29udGVudC1UeXBlJywnQXV0aG9yaXphdGlvbicsJ1gtQXBpLUtleSddLFxuICAgICAgICBhbGxvd01ldGhvZHM6IFsnUE9TVCcsICdHRVQnXVxuICAgICAgfVxuICAgICAgXG4gICAgfSk7XG4gICAgdGhpcy5yZXN0QXBpID0gcmVzdEFwaTtcbiAgICBjb25zdCB1c2VyQWRkcmVzc0FwaSA9IHJlc3RBcGkucm9vdC5yZXNvdXJjZUZvclBhdGgoJ3VzZXJEZXRhaWxzJyk7XG4gICAgdXNlckFkZHJlc3NBcGkuYWRkTWV0aG9kKCdHRVQnLCBuZXcgTGFtYmRhSW50ZWdyYXRpb24oZ2V0VXNlcmRhdGFMYW1iZGEpKTtcbiAgICB1c2VyQWRkcmVzc0FwaS5hZGRNZXRob2QoJ1BPU1QnLCBuZXcgTGFtYmRhSW50ZWdyYXRpb24oc2F2ZVVzZXJkYXRhTGFtYmRhKSk7XG4gICAgXG4gICAgY29uc3QgYXBpS2V5ID0gcmVzdEFwaS5hZGRBcGlLZXkoJ0FwaUtleScse1xuICAgICAgYXBpS2V5TmFtZTogJ3R1QXBpS2V5JyxcbiAgICAgIHZhbHVlOiAndGhpc0lzSnVzdFNhbXBsZUFQaTEyMycgLy8gd2UgY2FuIGdldCB0aGUgYXBpcyB1c2luZyBhd3Mgc2VjcmV0IGFuZCBnZXQgdGhlIGtleSB0byBmZXRjaCBoZXJlIFxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKFwi8J+agCB+IFJlc3RBcGlDb25zdHJ1Y3QgfiBjb25zdHJ1Y3RvciB+IGFwaUtleTpcIiwgYXBpS2V5KVxuICAgIGNvbnN0IHBsYW4gPSByZXN0QXBpLmFkZFVzYWdlUGxhbignVHVfYXBpLXVzYWdlLXBsYW4nLCB7IC8vIHdlIGNhbiB1c2UgcmF0ZSBsaW1pdCBhbmQgb3RoZXIgdXNhZ2UgcGxhbnMgXG4gICAgICBuYW1lOiBgYXBpLXVzYWdlLXBsYW5gLFxuICAgICAgYXBpU3RhZ2VzOiBbeyBzdGFnZTogcmVzdEFwaS5kZXBsb3ltZW50U3RhZ2UgfV0sXG4gICAgfSk7XG5cbiAgXG4gICAgcGxhbi5hZGRBcGlLZXkoYXBpS2V5KTtcbiAgXG4gICAgLy8gbmV3IENmbk91dHB1dCh0aGlzLCBcIkFQSSBVUkxcIiwge1xuICAgIC8vICAgdmFsdWU6IGFwaS51cmwgPz8gXCJTb21ldGhpbmcgd2VudCB3cm9uZ1wiXG4gICAgLy8gfSk7XG4gICAgLy8gdGhpcy5hZGRBcGlLZXkoc3RhY2tOYW1lLCByZXN0QXBpKTtcbiAgICB0aGlzLmFkZEFwaVJlc3BvbnNlcyhyZXN0QXBpKTtcblxuICAgIHJlc3RBcGkubWV0aG9kc1xuICAgICAgLmZpbHRlcihtZXRob2QgPT4gbWV0aG9kLmh0dHBNZXRob2QgPT09ICdPUFRJT05TJylcbiAgICAgIC5mb3JFYWNoKG1ldGhvZCA9PiB7XG4gICAgICAgIGNvbnN0IGNmbk1ldGhvZCA9IG1ldGhvZC5ub2RlLmRlZmF1bHRDaGlsZCBhcyBDZm5NZXRob2Q7XG4gICAgICAgIGNmbk1ldGhvZC5hcGlLZXlSZXF1aXJlZCA9IGZhbHNlO1xuICAgICAgfSk7XG4gIH07XG5cbi8vIGFkZEFwaUtleShzdGFja05hbWU6IHN0cmluZywgcmVzdEFwaTogUmVzdEFwaSkge1xuLy8gICAgIC8vIEFQSSBHYXRld2F5IEFQSSBLZXlcbi8vICAgICAvLyBjb25zdCBzZWNyZXQgPSBuZXcgU2VjcmV0KHRoaXMsICdVc2VyQ29udGFjdHMtdXNlckFkZHJlc3MtYXBpLXNlY3JldCcsIHtcbi8vICAgICAvLyAgIHNlY3JldE5hbWU6IGAke3N0YWNrTmFtZX0vYXBpLWtleWAsXG4vLyAgICAgLy8gICBkZXNjcmlwdGlvbjogJ01vYmlsZSBwdXNoIG5vdGlmaWNhdGlvbiBBUEkgR2F0ZXdheSBBUEkgS2V5Jyxcbi8vICAgICAvLyAgIGdlbmVyYXRlU2VjcmV0U3RyaW5nOiB7XG4vLyAgICAgLy8gICAgIGdlbmVyYXRlU3RyaW5nS2V5OiAna2V5Jyxcbi8vICAgICAvLyAgICAgc2VjcmV0U3RyaW5nVGVtcGxhdGU6IEpTT04uc3RyaW5naWZ5KHt9KSxcbi8vICAgICAvLyAgICAgZXhjbHVkZUNoYXJhY3RlcnM6ICcgJSt+YCMkJiooKXxbXXt9Ojs8Pj8hXFwnL0BcIlxcXFwnLFxuLy8gICAgIC8vICAgfSxcbi8vICAgICAvLyB9KTtcblxuLy8gICAgIGNvbnN0IGFwaUtleSA9IHJlc3RBcGkuYWRkQXBpS2V5KCdBcGlLZXknLCB7XG4vLyAgICAgICBhcGlLZXlOYW1lOiAndGhpcy5fYXBpS2V5TmFtZScsXG4vLyAgICAgICB2YWx1ZTogJ3NlY3JldC5zZWNyZXRWYWx1ZUZyb21Kc29uJyxcbi8vICAgICB9KTtcblxuLy8gICAgIC8vIHRoaXMucmVzdEFQSUtleUFybiA9IHNlY3JldC5zZWNyZXRBcm47XG5cbi8vICAgICAvLyBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdyZXN0QVBJS2V5QXJuQXRTb3VyY2UnLCB7XG4vLyAgICAgLy8gICB2YWx1ZTogdGhpcy5yZXN0QVBJS2V5QXJuID8/ICcnLFxuLy8gICAgIC8vIH0pO1xuXG4vLyAgICAgY29uc3QgcGxhbiA9IHJlc3RBcGkuYWRkVXNhZ2VQbGFuKCd1c2VyQVBpLWFkZHJlc3MtdXNhZ2UtcGxhbicsIHtcbi8vICAgICAgIG5hbWU6IGAke3N0YWNrTmFtZX0tYXBpLXVzYWdlLXBsYW5gLFxuLy8gICAgICAgYXBpU3RhZ2VzOiBbeyBzdGFnZTogcmVzdEFwaS5kZXBsb3ltZW50U3RhZ2UgfV0sXG4vLyAgICAgfSk7XG5cbi8vICAgICBwbGFuLmFkZEFwaUtleShhcGlLZXkpO1xuLy8gICB9XG5cbiAgYWRkQXBpUmVzcG9uc2VzKHJlc3RBcGk6IFJlc3RBcGkpIHtcbiAgICBjb25zdCBjb21tb25SZXNwb25zZSA9IG5ldyBBcGlDb21tb25SZXNwb25zZSgpO1xuICAgIC8vICoqKioqKioqKioqKioqKioqIEVycm9yIDQwMFxuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdCQURfUkVRVUVTVF9CT0RZJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLkJBRF9SRVFVRVNUX0JPRFksXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICdcXCcqXFwnJyxcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDAwLCAnQmFkIFJlcXVlc3QnLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgLy8gKioqKioqKioqKioqKioqKipFcnJvciA0MDNcbiAgICByZXN0QXBpLmFkZEdhdGV3YXlSZXNwb25zZSgnV0FGX0ZJTFRFUkVEJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLldBRl9GSUxURVJFRCxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcblxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDMsICdGb3JiaWRkZW4nLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ0VYUElSRURfVE9LRU4nLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuRVhQSVJFRF9UT0tFTixcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDAzLCAnRm9yYmlkZGVuJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdJTlZBTElEX0FQSV9LRVknLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuSU5WQUxJRF9BUElfS0VZLFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDMsICdGb3JiaWRkZW4nLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ0FDQ0VTU19ERU5JRUQnLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuQUNDRVNTX0RFTklFRCxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDAzLCAnRm9yYmlkZGVuJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdJTlZBTElEX1NJR05BVFVSRScsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5JTlZBTElEX1NJR05BVFVSRSxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDAzLCAnRm9yYmlkZGVuJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdNSVNTSU5HX0FVVEhFTlRJQ0FUSU9OX1RPS0VOJywge1xuICAgICAgdHlwZTogUmVzcG9uc2VUeXBlLk1JU1NJTkdfQVVUSEVOVElDQVRJT05fVE9LRU4sXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJzogJ09QVElPTlMsIEdFVCcsXG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJzogJ0NvbnRlbnQtVHlwZSwgQXV0aG9yaXphdGlvbicsXG4gICAgICAgICdWYXJ5JzogJ09yaWdpbicsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQwMywgJ0ZvcmJpZGRlbicsICckY29udGV4dC5yZXF1ZXN0SWQnKS5ib2R5LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICAvLyAqKioqKioqKioqKioqKioqKkVycm9yIDV4eFxuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdERUZBVUxUXzVYWCcsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5ERUZBVUxUXzVYWCxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNTAwLCAnSW50ZXJuYWwgU2VydmVyIEVycm9yJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIC8vICoqKioqKioqKioqKioqKioqIEVycm9yIDQwMVxuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdVTkFVVEhPUklaRUQnLCB7XG4gICAgICB0eXBlOiBSZXNwb25zZVR5cGUuVU5BVVRIT1JJWkVELFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7XG4gICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcIicqJ1wiLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IGNvbW1vblJlc3BvbnNlLnNldFJlc3BvbnNlV2l0aE91dFJlYXNvbig0MDEsICdVbmF1dGhvcml6ZWQnLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgLy8gKioqKioqKioqKioqKioqKiogRXJyb3IgZm9yIDQyOVxuICAgIHJlc3RBcGkuYWRkR2F0ZXdheVJlc3BvbnNlKCdRVU9UQV9FWENFRURFRCcsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5RVU9UQV9FWENFRURFRCxcbiAgICAgIHJlc3BvbnNlSGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogXCInKidcIixcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBjb21tb25SZXNwb25zZS5zZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oNDI5LCAnTGltaXQgRXhjZWVkZWQnLCAnJGNvbnRleHQucmVxdWVzdElkJykuYm9keSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmVzdEFwaS5hZGRHYXRld2F5UmVzcG9uc2UoJ1RIUk9UVExFRCcsIHtcbiAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5USFJPVFRMRUQsXG4gICAgICByZXNwb25zZUhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogY29tbW9uUmVzcG9uc2Uuc2V0UmVzcG9uc2VXaXRoT3V0UmVhc29uKDQyOSwgJ0xpbWl0IEV4Y2VlZGVkJywgJyRjb250ZXh0LnJlcXVlc3RJZCcpLmJvZHksXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG59XG4iXX0=