"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasictestStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_dynamodb_1 = require("aws-cdk-lib/aws-dynamodb");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
const cdk = require("aws-cdk-lib");
const iam = require("aws-cdk-lib/aws-iam");
class BasictestStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const saveAddress = new aws_dynamodb_1.Table(this, "Address", {
            partitionKey: { name: "UserId", type: aws_dynamodb_1.AttributeType.STRING },
            tableName: "Tu_Test_TableName",
        });
        saveAddress.addGlobalSecondaryIndex({
            indexName: 'UserIdIndex',
            partitionKey: { name: 'UserId', type: aws_dynamodb_1.AttributeType.STRING },
        });
        const getUserdataLambda = new aws_lambda_1.Function(this, "GetCustomerAddressLambdaHandler", {
            runtime: aws_lambda_1.Runtime.NODEJS_14_X,
            code: aws_lambda_1.Code.fromAsset('handler'),
            handler: 'getHandler.handler',
            environment: {
                TABLE_NAME: saveAddress.tableName,
            },
        });
        const saveUserdataLambda = new aws_lambda_1.Function(this, "PutCustomerAddressLambdaHandler", {
            runtime: aws_lambda_1.Runtime.NODEJS_14_X,
            code: aws_lambda_1.Code.fromAsset("handler"),
            handler: 'saveHandler.handler',
            environment: {
                TABLE_NAME: saveAddress.tableName,
            },
        });
        getUserdataLambda.role?.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'));
        saveAddress.grantWriteData(saveUserdataLambda);
        const api = new aws_apigateway_1.RestApi(this, "Tu_testApi", {
            defaultMethodOptions: {
                apiKeyRequired: true,
            },
            defaultCorsPreflightOptions: {
                allowOrigins: ['https://master.df0uziwirgry6.amplifyapp.com'],
                allowMethods: ['POST', 'GET'],
                allowHeaders: ['Content-Type', 'Authorization', 'X-Api-Key'],
            }
        });
        const userAddressApi = api.root.resourceForPath('userAddress');
        userAddressApi.addMethod('GET', new aws_apigateway_1.LambdaIntegration(getUserdataLambda), {
            methodResponses: [{
                    statusCode: '204',
                    responseParameters: {
                        'method.response.header.Access-Control-Allow-Origin': true,
                        'method.response.header.Access-Control-Allow-Methods': true,
                        'method.response.header.Access-Control-Allow-Headers': true,
                        'method.response.header.Vary': true,
                    },
                }],
        });
        userAddressApi.addMethod('POST', new aws_apigateway_1.LambdaIntegration(saveUserdataLambda), {
            methodResponses: [{
                    statusCode: '204',
                    responseParameters: {
                        'method.response.header.Access-Control-Allow-Origin': true,
                        'method.response.header.Access-Control-Allow-Methods': true,
                        'method.response.header.Access-Control-Allow-Headers': true,
                        'method.response.header.Vary': true,
                    },
                }],
        });
        const apiKey = api.addApiKey('ApiKey', {
            apiKeyName: 'tuApiKey',
            value: 'thisIsJustSampleAPi123'
        });
        const plan = api.addUsagePlan('Tu_api-usage-plan', {
            name: `api-usage-plan`,
            apiStages: [{ stage: api.deploymentStage }],
        });
        plan.addApiKey(apiKey);
        new aws_cdk_lib_1.CfnOutput(this, "API URL", {
            value: api.url ?? "Something went wrong"
        });
    }
}
exports.BasictestStack = BasictestStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWN0ZXN0LXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFzaWN0ZXN0LXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUF3QztBQUV4QywyREFBZ0U7QUFDaEUsdURBQWlFO0FBQ2pFLCtEQUF3RTtBQUN4RSxtQ0FBbUM7QUFDbkMsMkNBQTJDO0FBRTNDLE1BQWEsY0FBZSxTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQzNDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDOUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxXQUFXLEdBQUcsSUFBSSxvQkFBSyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDN0MsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsNEJBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDNUQsU0FBUyxFQUFFLG1CQUFtQjtTQUMvQixDQUFDLENBQUM7UUFDSCxXQUFXLENBQUMsdUJBQXVCLENBQUM7WUFDbEMsU0FBUyxFQUFFLGFBQWE7WUFDeEIsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsNEJBQWEsQ0FBQyxNQUFNLEVBQUU7U0FDN0QsQ0FBQyxDQUFDO1FBRUgsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLHFCQUFRLENBQUMsSUFBSSxFQUFFLGlDQUFpQyxFQUFFO1lBQzlFLE9BQU8sRUFBRSxvQkFBTyxDQUFDLFdBQVc7WUFDNUIsSUFBSSxFQUFFLGlCQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztZQUMvQixPQUFPLEVBQUUsb0JBQW9CO1lBQzdCLFdBQVcsRUFBRTtnQkFDWCxVQUFVLEVBQUUsV0FBVyxDQUFDLFNBQVM7YUFDbEM7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLGtCQUFrQixHQUFHLElBQUkscUJBQVEsQ0FBQyxJQUFJLEVBQUUsaUNBQWlDLEVBQUU7WUFDL0UsT0FBTyxFQUFFLG9CQUFPLENBQUMsV0FBVztZQUM1QixJQUFJLEVBQUUsaUJBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1lBQy9CLE9BQU8sRUFBRSxxQkFBcUI7WUFDOUIsV0FBVyxFQUFFO2dCQUNYLFVBQVUsRUFBRSxXQUFXLENBQUMsU0FBUzthQUNsQztTQUNGLENBQUMsQ0FBQztRQUNILGlCQUFpQixDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQztRQUNqSCxXQUFXLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFFL0MsTUFBTSxHQUFHLEdBQUcsSUFBSSx3QkFBTyxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDMUMsb0JBQW9CLEVBQUU7Z0JBQ3BCLGNBQWMsRUFBRSxJQUFJO2FBQ3JCO1lBQ0QsMkJBQTJCLEVBQUU7Z0JBQzNCLFlBQVksRUFBRSxDQUFDLDZDQUE2QyxDQUFDO2dCQUM3RCxZQUFZLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2dCQUM3QixZQUFZLEVBQUUsQ0FBQyxjQUFjLEVBQUUsZUFBZSxFQUFFLFdBQVcsQ0FBQzthQUM3RDtTQUNGLENBQUMsQ0FBQztRQUVILE1BQU0sY0FBYyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQy9ELGNBQWMsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksa0NBQWlCLENBQUMsaUJBQWlCLENBQUMsRUFBRTtZQUN4RSxlQUFlLEVBQUUsQ0FBQztvQkFDaEIsVUFBVSxFQUFFLEtBQUs7b0JBQ2pCLGtCQUFrQixFQUFFO3dCQUNsQixvREFBb0QsRUFBRSxJQUFJO3dCQUMxRCxxREFBcUQsRUFBRSxJQUFJO3dCQUMzRCxxREFBcUQsRUFBRSxJQUFJO3dCQUMzRCw2QkFBNkIsRUFBRSxJQUFJO3FCQUNwQztpQkFDRixDQUFDO1NBQUUsQ0FBQyxDQUFDO1FBQ1IsY0FBYyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxrQ0FBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQzFFLGVBQWUsRUFBRSxDQUFDO29CQUNoQixVQUFVLEVBQUUsS0FBSztvQkFDakIsa0JBQWtCLEVBQUU7d0JBQ2xCLG9EQUFvRCxFQUFFLElBQUk7d0JBQzFELHFEQUFxRCxFQUFFLElBQUk7d0JBQzNELHFEQUFxRCxFQUFFLElBQUk7d0JBQzNELDZCQUE2QixFQUFFLElBQUk7cUJBQ3BDO2lCQUNGLENBQUM7U0FBRSxDQUFDLENBQUM7UUFFUixNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBQztZQUNwQyxVQUFVLEVBQUUsVUFBVTtZQUN0QixLQUFLLEVBQUUsd0JBQXdCO1NBQ2hDLENBQUMsQ0FBQztRQUNILE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUU7WUFDakQsSUFBSSxFQUFFLGdCQUFnQjtZQUN0QixTQUFTLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDNUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV2QixJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUM3QixLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxzQkFBc0I7U0FDekMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBakZELHdDQWlGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENmbk91dHB1dCB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0IHsgQXR0cmlidXRlVHlwZSwgVGFibGUgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZHluYW1vZGInO1xuaW1wb3J0IHsgRnVuY3Rpb24sIFJ1bnRpbWUsIENvZGUgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuaW1wb3J0IHsgUmVzdEFwaSwgTGFtYmRhSW50ZWdyYXRpb24gfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXlcIjtcbmltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBpYW0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XG5cbmV4cG9ydCBjbGFzcyBCYXNpY3Rlc3RTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IHNhdmVBZGRyZXNzID0gbmV3IFRhYmxlKHRoaXMsIFwiQWRkcmVzc1wiLCB7XG4gICAgICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogXCJVc2VySWRcIiwgdHlwZTogQXR0cmlidXRlVHlwZS5TVFJJTkcgfSxcbiAgICAgIHRhYmxlTmFtZTogXCJUdV9UZXN0X1RhYmxlTmFtZVwiLFxuICAgIH0pO1xuICAgIHNhdmVBZGRyZXNzLmFkZEdsb2JhbFNlY29uZGFyeUluZGV4KHtcbiAgICAgIGluZGV4TmFtZTogJ1VzZXJJZEluZGV4JyxcbiAgICAgIHBhcnRpdGlvbktleTogeyBuYW1lOiAnVXNlcklkJywgdHlwZTogQXR0cmlidXRlVHlwZS5TVFJJTkcgfSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGdldFVzZXJkYXRhTGFtYmRhID0gbmV3IEZ1bmN0aW9uKHRoaXMsIFwiR2V0Q3VzdG9tZXJBZGRyZXNzTGFtYmRhSGFuZGxlclwiLCB7XG4gICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18xNF9YLFxuICAgICAgY29kZTogQ29kZS5mcm9tQXNzZXQoJ2hhbmRsZXInKSxcbiAgICAgIGhhbmRsZXI6ICdnZXRIYW5kbGVyLmhhbmRsZXInLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgVEFCTEVfTkFNRTogc2F2ZUFkZHJlc3MudGFibGVOYW1lLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHNhdmVVc2VyZGF0YUxhbWJkYSA9IG5ldyBGdW5jdGlvbih0aGlzLCBcIlB1dEN1c3RvbWVyQWRkcmVzc0xhbWJkYUhhbmRsZXJcIiwge1xuICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMTRfWCxcbiAgICAgIGNvZGU6IENvZGUuZnJvbUFzc2V0KFwiaGFuZGxlclwiKSxcbiAgICAgIGhhbmRsZXI6ICdzYXZlSGFuZGxlci5oYW5kbGVyJyxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIFRBQkxFX05BTUU6IHNhdmVBZGRyZXNzLnRhYmxlTmFtZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgZ2V0VXNlcmRhdGFMYW1iZGEucm9sZT8uYWRkTWFuYWdlZFBvbGljeShpYW0uTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoJ0FtYXpvbkR5bmFtb0RCRnVsbEFjY2VzcycpKTtcbiAgICBzYXZlQWRkcmVzcy5ncmFudFdyaXRlRGF0YShzYXZlVXNlcmRhdGFMYW1iZGEpO1xuXG4gICAgY29uc3QgYXBpID0gbmV3IFJlc3RBcGkodGhpcywgXCJUdV90ZXN0QXBpXCIsIHtcbiAgICAgIGRlZmF1bHRNZXRob2RPcHRpb25zOiB7XG4gICAgICAgIGFwaUtleVJlcXVpcmVkOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIGRlZmF1bHRDb3JzUHJlZmxpZ2h0T3B0aW9uczoge1xuICAgICAgICBhbGxvd09yaWdpbnM6IFsnaHR0cHM6Ly9tYXN0ZXIuZGYwdXppd2lyZ3J5Ni5hbXBsaWZ5YXBwLmNvbSddLCAvLyBBZGp1c3RlZCBvcmlnaW5cbiAgICAgICAgYWxsb3dNZXRob2RzOiBbJ1BPU1QnLCAnR0VUJ10sXG4gICAgICAgIGFsbG93SGVhZGVyczogWydDb250ZW50LVR5cGUnLCAnQXV0aG9yaXphdGlvbicsICdYLUFwaS1LZXknXSxcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHVzZXJBZGRyZXNzQXBpID0gYXBpLnJvb3QucmVzb3VyY2VGb3JQYXRoKCd1c2VyQWRkcmVzcycpO1xuICAgIHVzZXJBZGRyZXNzQXBpLmFkZE1ldGhvZCgnR0VUJywgbmV3IExhbWJkYUludGVncmF0aW9uKGdldFVzZXJkYXRhTGFtYmRhKSwge1xuICAgICAgbWV0aG9kUmVzcG9uc2VzOiBbe1xuICAgICAgICBzdGF0dXNDb2RlOiAnMjA0JyxcbiAgICAgICAgcmVzcG9uc2VQYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgJ21ldGhvZC5yZXNwb25zZS5oZWFkZXIuQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogdHJ1ZSxcbiAgICAgICAgICAnbWV0aG9kLnJlc3BvbnNlLmhlYWRlci5BY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJzogdHJ1ZSxcbiAgICAgICAgICAnbWV0aG9kLnJlc3BvbnNlLmhlYWRlci5BY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJzogdHJ1ZSxcbiAgICAgICAgICAnbWV0aG9kLnJlc3BvbnNlLmhlYWRlci5WYXJ5JzogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH1dLH0pO1xuICAgIHVzZXJBZGRyZXNzQXBpLmFkZE1ldGhvZCgnUE9TVCcsIG5ldyBMYW1iZGFJbnRlZ3JhdGlvbihzYXZlVXNlcmRhdGFMYW1iZGEpLCB7XG4gICAgICBtZXRob2RSZXNwb25zZXM6IFt7XG4gICAgICAgIHN0YXR1c0NvZGU6ICcyMDQnLFxuICAgICAgICByZXNwb25zZVBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAnbWV0aG9kLnJlc3BvbnNlLmhlYWRlci5BY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiB0cnVlLFxuICAgICAgICAgICdtZXRob2QucmVzcG9uc2UuaGVhZGVyLkFjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnOiB0cnVlLFxuICAgICAgICAgICdtZXRob2QucmVzcG9uc2UuaGVhZGVyLkFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnOiB0cnVlLFxuICAgICAgICAgICdtZXRob2QucmVzcG9uc2UuaGVhZGVyLlZhcnknOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfV0sfSk7XG4gICAgXG4gICAgY29uc3QgYXBpS2V5ID0gYXBpLmFkZEFwaUtleSgnQXBpS2V5Jyx7XG4gICAgICBhcGlLZXlOYW1lOiAndHVBcGlLZXknLFxuICAgICAgdmFsdWU6ICd0aGlzSXNKdXN0U2FtcGxlQVBpMTIzJ1xuICAgIH0pO1xuICAgIGNvbnN0IHBsYW4gPSBhcGkuYWRkVXNhZ2VQbGFuKCdUdV9hcGktdXNhZ2UtcGxhbicsIHtcbiAgICAgIG5hbWU6IGBhcGktdXNhZ2UtcGxhbmAsXG4gICAgICBhcGlTdGFnZXM6IFt7IHN0YWdlOiBhcGkuZGVwbG95bWVudFN0YWdlIH1dLFxuICAgIH0pO1xuICBcbiAgICBwbGFuLmFkZEFwaUtleShhcGlLZXkpO1xuICBcbiAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsIFwiQVBJIFVSTFwiLCB7XG4gICAgICB2YWx1ZTogYXBpLnVybCA/PyBcIlNvbWV0aGluZyB3ZW50IHdyb25nXCJcbiAgICB9KTtcbiAgfVxufVxuIl19