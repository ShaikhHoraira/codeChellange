"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestApiConstruct = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const constructs_1 = require("constructs");
const aws_dynamodb_1 = require("aws-cdk-lib/aws-dynamodb");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
const iam = require("aws-cdk-lib/aws-iam");
// Import the AWS SDK module
const AWS = require("aws-sdk");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
class RestApiConstruct extends constructs_1.Construct {
    constructor(scope, id, stack) {
        super(scope, id);
        // Configure the AWS SDK with region
        AWS.config.update({ region: process.env.AWS_REGION });
        const saveAddress = new aws_dynamodb_1.Table(stack, "Address", {
            partitionKey: { name: "UserId", type: aws_dynamodb_1.AttributeType.STRING },
            tableName: "Tu_Test_TableName",
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
        const api = new aws_apigateway_1.RestApi(this, "Tu_testApi", {
            defaultMethodOptions: {
                apiKeyRequired: true,
            },
            defaultCorsPreflightOptions: {
                statusCode: 204,
                allowOrigins: ['*'],
                allowHeaders: ['Content-Type', 'Authorization', 'X-Api-Key'],
                allowMethods: ['POST', 'GET']
            }
        });
        const userAddressApi = api.root.resourceForPath('userAddress');
        userAddressApi.addMethod('GET', new aws_apigateway_1.LambdaIntegration(getUserdataLambda));
        userAddressApi.addMethod('POST', new aws_apigateway_1.LambdaIntegration(saveUserdataLambda));
        const apiKey = api.addApiKey('ApiKey', {
            apiKeyName: 'tuApiKey',
            value: 'thisIsJustSampleAPi123' // we can get the apis using aws secret and get the key to fetch here 
        });
        console.log("🚀 ~ RestApiConstruct ~ constructor ~ apiKey:", apiKey);
        const plan = api.addUsagePlan('Tu_api-usage-plan', {
            name: `api-usage-plan`,
            apiStages: [{ stage: api.deploymentStage }],
        });
        plan.addApiKey(apiKey);
        new aws_cdk_lib_1.CfnOutput(this, "API URL", {
            value: api.url ?? "Something went wrong"
        });
    }
    ;
}
exports.RestApiConstruct = RestApiConstruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdC1hcGktY29uc3RydWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVzdC1hcGktY29uc3RydWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUF3QztBQUN4QywyQ0FBdUM7QUFDdkMsMkRBQWdFO0FBQ2hFLHVEQUFpRTtBQUNqRSwrREFBd0U7QUFFeEUsMkNBQTJDO0FBRTNDLDRCQUE0QjtBQUM1QiwrQkFBK0I7QUFDL0IsaURBQXNEO0FBRXRELE1BQWEsZ0JBQWlCLFNBQVEsc0JBQVM7SUFDN0MsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBQyxLQUFhO1FBQ3BELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsb0NBQW9DO1FBQ3BDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUV0RCxNQUFNLFdBQVcsR0FBRyxJQUFJLG9CQUFLLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRTtZQUM5QyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSw0QkFBYSxDQUFDLE1BQU0sRUFBRTtZQUM1RCxTQUFTLEVBQUUsbUJBQW1CO1NBQy9CLENBQUMsQ0FBQztRQUNILFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQztZQUNsQyxTQUFTLEVBQUUsYUFBYTtZQUN4QixZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSw0QkFBYSxDQUFDLE1BQU0sRUFBRTtTQUM3RCxDQUFDLENBQUM7UUFFSCxNQUFNLGlCQUFpQixHQUFHLElBQUkscUJBQVEsQ0FBQyxLQUFLLEVBQUUsaUNBQWlDLEVBQUU7WUFDL0UsT0FBTyxFQUFFLG9CQUFPLENBQUMsV0FBVztZQUM1QixJQUFJLEVBQUUsaUJBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1lBQy9CLE9B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cHV0IH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBBdHRyaWJ1dGVUeXBlLCBUYWJsZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1keW5hbW9kYic7XG5pbXBvcnQgeyBGdW5jdGlvbiwgUnVudGltZSwgQ29kZSB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XG5pbXBvcnQgeyBSZXN0QXBpLCBMYW1iZGFJbnRlZ3JhdGlvbiB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtYXBpZ2F0ZXdheVwiO1xuaW1wb3J0IHsgU3RhY2sgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBpYW0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XG5cbi8vIEltcG9ydCB0aGUgQVdTIFNESyBtb2R1bGVcbmltcG9ydCAqIGFzIEFXUyBmcm9tICdhd3Mtc2RrJztcbmltcG9ydCB7IFBvbGljeVN0YXRlbWVudCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1pYW0nO1xuXG5leHBvcnQgY2xhc3MgUmVzdEFwaUNvbnN0cnVjdCBleHRlbmRzIENvbnN0cnVjdCB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsc3RhY2sgOiBTdGFjaykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG5cbiAgICAvLyBDb25maWd1cmUgdGhlIEFXUyBTREsgd2l0aCByZWdpb25cbiAgICBBV1MuY29uZmlnLnVwZGF0ZSh7IHJlZ2lvbjogcHJvY2Vzcy5lbnYuQVdTX1JFR0lPTiB9KTtcblxuICAgIGNvbnN0IHNhdmVBZGRyZXNzID0gbmV3IFRhYmxlKHN0YWNrLCBcIkFkZHJlc3NcIiwge1xuICAgICAgcGFydGl0aW9uS2V5OiB7IG5hbWU6IFwiVXNlcklkXCIsIHR5cGU6IEF0dHJpYnV0ZVR5cGUuU1RSSU5HIH0sXG4gICAgICB0YWJsZU5hbWU6IFwiVHVfVGVzdF9UYWJsZU5hbWVcIixcbiAgICB9KTtcbiAgICBzYXZlQWRkcmVzcy5hZGRHbG9iYWxTZWNvbmRhcnlJbmRleCh7XG4gICAgICBpbmRleE5hbWU6ICdVc2VySWRJbmRleCcsXG4gICAgICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogJ1VzZXJJZCcsIHR5cGU6IEF0dHJpYnV0ZVR5cGUuU1RSSU5HIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBnZXRVc2VyZGF0YUxhbWJkYSA9IG5ldyBGdW5jdGlvbihzdGFjaywgXCJHZXRDdXN0b21lckFkZHJlc3NMYW1iZGFIYW5kbGVyXCIsIHtcbiAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzIwX1gsXG4gICAgICBjb2RlOiBDb2RlLmZyb21Bc3NldCgnaGFuZGxlcicpLCBcbiAgICAgIGhhbmRsZXI6ICdnZXRIYW5kbGVyLmhhbmRsZXInLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgVEFCTEVfTkFNRTogc2F2ZUFkZHJlc3MudGFibGVOYW1lLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBnZXRVc2VyZGF0YUxhbWJkYS5ncmFudFByaW5jaXBhbC5hZGRUb1ByaW5jaXBhbFBvbGljeShcbiAgICAgIG5ldyBQb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICByZXNvdXJjZXM6IFsnKiddLFxuICAgICAgICBhY3Rpb25zOiBbJ2R5bmFtb2RiOmdldEl0ZW0nLCAnc2VjcmV0c21hbmFnZXI6R2V0U2VjcmV0VmFsdWUnXSxcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICBjb25zdCBzYXZlVXNlcmRhdGFMYW1iZGEgPSBuZXcgRnVuY3Rpb24oc3RhY2ssIFwiUHV0Q3VzdG9tZXJBZGRyZXNzTGFtYmRhSGFuZGxlclwiLCB7XG4gICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18yMF9YLFxuICAgICAgY29kZTogQ29kZS5mcm9tQXNzZXQoXCJoYW5kbGVyXCIpLFxuICAgICAgaGFuZGxlcjogJ3NhdmVIYW5kbGVyLmhhbmRsZXInLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgVEFCTEVfTkFNRTogc2F2ZUFkZHJlc3MudGFibGVOYW1lLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBzYXZlVXNlcmRhdGFMYW1iZGEuZ3JhbnRQcmluY2lwYWwuYWRkVG9QcmluY2lwYWxQb2xpY3koXG4gICAgICBuZXcgUG9saWN5U3RhdGVtZW50KHtcbiAgICAgICAgcmVzb3VyY2VzOiBbJyonXSxcbiAgICAgICAgYWN0aW9uczogWydkeW5hbW9kYjpQdXRJdGVtJywgJ3NlY3JldHNtYW5hZ2VyOkdldFNlY3JldFZhbHVlJ10sXG4gICAgICB9KSxcbiAgICApO1xuICAgIGdldFVzZXJkYXRhTGFtYmRhLnJvbGU/LmFkZE1hbmFnZWRQb2xpY3koaWFtLk1hbmFnZWRQb2xpY3kuZnJvbUF3c01hbmFnZWRQb2xpY3lOYW1lKCdBbWF6b25EeW5hbW9EQkZ1bGxBY2Nlc3MnKSk7XG4gICAgc2F2ZUFkZHJlc3MuZ3JhbnRXcml0ZURhdGEoc2F2ZVVzZXJkYXRhTGFtYmRhKTtcblxuICAgIGNvbnN0IGFwaSA9IG5ldyBSZXN0QXBpKHRoaXMsIFwiVHVfdGVzdEFwaVwiLCB7XG4gICAgICBkZWZhdWx0TWV0aG9kT3B0aW9uczoge1xuICAgICAgICBhcGlLZXlSZXF1aXJlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBkZWZhdWx0Q29yc1ByZWZsaWdodE9wdGlvbnM6e1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDQsXG4gICAgICAgIGFsbG93T3JpZ2luczogWycqJ10sXG4gICAgICAgIGFsbG93SGVhZGVyczogWydDb250ZW50LVR5cGUnLCdBdXRob3JpemF0aW9uJywnWC1BcGktS2V5J10sXG4gICAgICAgIGFsbG93TWV0aG9kczogWydQT1NUJywgJ0dFVCddXG4gICAgICB9XG4gICAgICBcbiAgICB9KTtcbiAgICBjb25zdCB1c2VyQWRkcmVzc0FwaSA9IGFwaS5yb290LnJlc291cmNlRm9yUGF0aCgndXNlckFkZHJlc3MnKTtcbiAgICB1c2VyQWRkcmVzc0FwaS5hZGRNZXRob2QoJ0dFVCcsIG5ldyBMYW1iZGFJbnRlZ3JhdGlvbihnZXRVc2VyZGF0YUxhbWJkYSkpO1xuICAgIHVzZXJBZGRyZXNzQXBpLmFkZE1ldGhvZCgnUE9TVCcsIG5ldyBMYW1iZGFJbnRlZ3JhdGlvbihzYXZlVXNlcmRhdGFMYW1iZGEpKTtcbiAgICBcbiAgICBjb25zdCBhcGlLZXkgPSBhcGkuYWRkQXBpS2V5KCdBcGlLZXknLHtcbiAgICAgIGFwaUtleU5hbWU6ICd0dUFwaUtleScsXG4gICAgICB2YWx1ZTogJ3RoaXNJc0p1c3RTYW1wbGVBUGkxMjMnIC8vIHdlIGNhbiBnZXQgdGhlIGFwaXMgdXNpbmcgYXdzIHNlY3JldCBhbmQgZ2V0IHRoZSBrZXkgdG8gZmV0Y2ggaGVyZSBcbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhcIvCfmoAgfiBSZXN0QXBpQ29uc3RydWN0IH4gY29uc3RydWN0b3IgfiBhcGlLZXk6XCIsIGFwaUtleSlcbiAgICBjb25zdCBwbGFuID0gYXBpLmFkZFVzYWdlUGxhbignVHVfYXBpLXVzYWdlLXBsYW4nLCB7IC8vIHdlIGNhbiB1c2UgcmF0ZSBsaW1pdCBhbmQgb3RoZXIgdXNhZ2UgcGxhbnMgXG4gICAgICBuYW1lOiBgYXBpLXVzYWdlLXBsYW5gLFxuICAgICAgYXBpU3RhZ2VzOiBbeyBzdGFnZTogYXBpLmRlcGxveW1lbnRTdGFnZSB9XSxcbiAgICB9KTtcblxuICBcbiAgICBwbGFuLmFkZEFwaUtleShhcGlLZXkpO1xuICBcbiAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsIFwiQVBJIFVSTFwiLCB7XG4gICAgICB2YWx1ZTogYXBpLnVybCA/PyBcIlNvbWV0aGluZyB3ZW50IHdyb25nXCJcbiAgICB9KTtcblxuICB9O1xufVxuIl19