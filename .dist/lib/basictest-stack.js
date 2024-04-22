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
            handler: "saveHandler.handler",
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
        });
        const userAddressApi = api.root.resourceForPath('userAddress');
        userAddressApi.addMethod('GET', new aws_apigateway_1.LambdaIntegration(getUserdataLambda));
        userAddressApi.addMethod('POST', new aws_apigateway_1.LambdaIntegration(saveUserdataLambda));
        const apiKey = api.addApiKey('ApiKey', {
            apiKeyName: 'tuApiKey',
            value: 'thisIsJustSampleAPi123' // we can get the apis using aws secret and get the key to fetch here 
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
    ;
}
exports.BasictestStack = BasictestStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWN0ZXN0LXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2Jhc2ljdGVzdC1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBd0M7QUFFeEMsMkRBQWdFO0FBQ2hFLHVEQUFpRTtBQUNqRSwrREFBd0U7QUFDeEUsbUNBQW1DO0FBQ25DLDJDQUEyQztBQUUzQyxNQUFhLGNBQWUsU0FBUSxHQUFHLENBQUMsS0FBSztJQUMzQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQzlELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sV0FBVyxHQUFHLElBQUksb0JBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFO1lBQzdDLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLDRCQUFhLENBQUMsTUFBTSxFQUFFO1lBQzVELFNBQVMsRUFBRSxtQkFBbUI7U0FDL0IsQ0FBQyxDQUFDO1FBQ0gsV0FBVyxDQUFDLHVCQUF1QixDQUFDO1lBQ2xDLFNBQVMsRUFBRSxhQUFhO1lBQ3hCLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLDRCQUFhLENBQUMsTUFBTSxFQUFFO1NBQzdELENBQUMsQ0FBQztRQUVILE1BQU0saUJBQWlCLEdBQUcsSUFBSSxxQkFBUSxDQUFDLElBQUksRUFBRSxpQ0FBaUMsRUFBRTtZQUM5RSxPQUFPLEVBQUUsb0JBQU8sQ0FBQyxXQUFXO1lBQzVCLElBQUksRUFBRSxpQkFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7WUFDL0IsT0FBTyxFQUFFLG9CQUFvQjtZQUM3QixXQUFXLEVBQUU7Z0JBQ1gsVUFBVSxFQUFFLFdBQVcsQ0FBQyxTQUFTO2FBQ2xDO1NBQ0YsQ0FBQyxDQUFDO1FBRUYsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLHFCQUFRLENBQUMsSUFBSSxFQUFFLGlDQUFpQyxFQUFFO1lBQ2hGLE9BQU8sRUFBRSxvQkFBTyxDQUFDLFdBQVc7WUFDNUIsSUFBSSxFQUFFLGlCQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztZQUMvQixPQUFPLEVBQUUscUJBQXFCO1lBQzlCLFdBQVcsRUFBRTtnQkFDWCxVQUFVLEVBQUUsV0FBVyxDQUFDLFNBQVM7YUFDbEM7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUM7UUFDakgsV0FBVyxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBRS9DLE1BQU0sR0FBRyxHQUFHLElBQUksd0JBQU8sQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQzFDLG9CQUFvQixFQUFFO2dCQUNwQixjQUFjLEVBQUUsSUFBSTthQUNyQjtTQUNGLENBQUMsQ0FBQztRQUNILE1BQU0sY0FBYyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRS9ELGNBQWMsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksa0NBQWlCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1FBQzFFLGNBQWMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksa0NBQWlCLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1FBRTVFLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFDO1lBQ3BDLFVBQVUsRUFBRSxVQUFVO1lBQ3RCLEtBQUssRUFBRSx3QkFBd0IsQ0FBQyxzRUFBc0U7U0FDdkcsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRTtZQUNqRCxJQUFJLEVBQUUsZ0JBQWdCO1lBQ3RCLFNBQVMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUM1QyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXZCLElBQUksdUJBQVMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFO1lBQzdCLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxJQUFJLHNCQUFzQjtTQUN6QyxDQUFDLENBQUM7SUFFTCxDQUFDO0lBQUEsQ0FBQztDQUNIO0FBNURELHdDQTREQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENmbk91dHB1dCB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0IHsgQXR0cmlidXRlVHlwZSwgVGFibGUgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZHluYW1vZGInO1xuaW1wb3J0IHsgRnVuY3Rpb24sIFJ1bnRpbWUsIENvZGUgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuaW1wb3J0IHsgUmVzdEFwaSwgTGFtYmRhSW50ZWdyYXRpb24gfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXlcIjtcbmltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBpYW0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XG5cbmV4cG9ydCBjbGFzcyBCYXNpY3Rlc3RTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IHNhdmVBZGRyZXNzID0gbmV3IFRhYmxlKHRoaXMsIFwiQWRkcmVzc1wiLCB7XG4gICAgICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogXCJVc2VySWRcIiwgdHlwZTogQXR0cmlidXRlVHlwZS5TVFJJTkcgfSxcbiAgICAgIHRhYmxlTmFtZTogXCJUdV9UZXN0X1RhYmxlTmFtZVwiLFxuICAgIH0pO1xuICAgIHNhdmVBZGRyZXNzLmFkZEdsb2JhbFNlY29uZGFyeUluZGV4KHtcbiAgICAgIGluZGV4TmFtZTogJ1VzZXJJZEluZGV4JyxcbiAgICAgIHBhcnRpdGlvbktleTogeyBuYW1lOiAnVXNlcklkJywgdHlwZTogQXR0cmlidXRlVHlwZS5TVFJJTkcgfSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGdldFVzZXJkYXRhTGFtYmRhID0gbmV3IEZ1bmN0aW9uKHRoaXMsIFwiR2V0Q3VzdG9tZXJBZGRyZXNzTGFtYmRhSGFuZGxlclwiLCB7XG4gICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18xNF9YLFxuICAgICAgY29kZTogQ29kZS5mcm9tQXNzZXQoJ2hhbmRsZXInKSxcbiAgICAgIGhhbmRsZXI6ICdnZXRIYW5kbGVyLmhhbmRsZXInLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgVEFCTEVfTkFNRTogc2F2ZUFkZHJlc3MudGFibGVOYW1lLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgICBjb25zdCBzYXZlVXNlcmRhdGFMYW1iZGEgPSBuZXcgRnVuY3Rpb24odGhpcywgXCJQdXRDdXN0b21lckFkZHJlc3NMYW1iZGFIYW5kbGVyXCIsIHtcbiAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzE0X1gsXG4gICAgICBjb2RlOiBDb2RlLmZyb21Bc3NldChcImhhbmRsZXJcIiksXG4gICAgICBoYW5kbGVyOiBcInNhdmVIYW5kbGVyLmhhbmRsZXJcIixcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIFRBQkxFX05BTUU6IHNhdmVBZGRyZXNzLnRhYmxlTmFtZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgXG4gICAgZ2V0VXNlcmRhdGFMYW1iZGEucm9sZT8uYWRkTWFuYWdlZFBvbGljeShpYW0uTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoJ0FtYXpvbkR5bmFtb0RCRnVsbEFjY2VzcycpKTtcbiAgICBzYXZlQWRkcmVzcy5ncmFudFdyaXRlRGF0YShzYXZlVXNlcmRhdGFMYW1iZGEpO1xuXG4gICAgY29uc3QgYXBpID0gbmV3IFJlc3RBcGkodGhpcywgXCJUdV90ZXN0QXBpXCIsIHtcbiAgICAgIGRlZmF1bHRNZXRob2RPcHRpb25zOiB7XG4gICAgICAgIGFwaUtleVJlcXVpcmVkOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBjb25zdCB1c2VyQWRkcmVzc0FwaSA9IGFwaS5yb290LnJlc291cmNlRm9yUGF0aCgndXNlckFkZHJlc3MnKTtcblxuICAgIHVzZXJBZGRyZXNzQXBpLmFkZE1ldGhvZCgnR0VUJywgbmV3IExhbWJkYUludGVncmF0aW9uKGdldFVzZXJkYXRhTGFtYmRhKSk7XG4gICAgdXNlckFkZHJlc3NBcGkuYWRkTWV0aG9kKCdQT1NUJywgbmV3IExhbWJkYUludGVncmF0aW9uKHNhdmVVc2VyZGF0YUxhbWJkYSkpO1xuICAgIFxuICAgIGNvbnN0IGFwaUtleSA9IGFwaS5hZGRBcGlLZXkoJ0FwaUtleScse1xuICAgICAgYXBpS2V5TmFtZTogJ3R1QXBpS2V5JyxcbiAgICAgIHZhbHVlOiAndGhpc0lzSnVzdFNhbXBsZUFQaTEyMycgLy8gd2UgY2FuIGdldCB0aGUgYXBpcyB1c2luZyBhd3Mgc2VjcmV0IGFuZCBnZXQgdGhlIGtleSB0byBmZXRjaCBoZXJlIFxuICAgIH0pO1xuICAgIGNvbnN0IHBsYW4gPSBhcGkuYWRkVXNhZ2VQbGFuKCdUdV9hcGktdXNhZ2UtcGxhbicsIHsgLy8gd2UgY2FuIHVzZSByYXRlIGxpbWl0IGFuZCBvdGhlciB1c2FnZSBwbGFucyBcbiAgICAgIG5hbWU6IGBhcGktdXNhZ2UtcGxhbmAsXG4gICAgICBhcGlTdGFnZXM6IFt7IHN0YWdlOiBhcGkuZGVwbG95bWVudFN0YWdlIH1dLFxuICAgIH0pO1xuICBcbiAgICBwbGFuLmFkZEFwaUtleShhcGlLZXkpO1xuICBcbiAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsIFwiQVBJIFVSTFwiLCB7XG4gICAgICB2YWx1ZTogYXBpLnVybCA/PyBcIlNvbWV0aGluZyB3ZW50IHdyb25nXCJcbiAgICB9KTtcblxuICB9O1xufVxuIl19