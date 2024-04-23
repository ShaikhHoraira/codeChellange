"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasictestStack = void 0;
const aws_dynamodb_1 = require("aws-cdk-lib/aws-dynamodb");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
//import { RestApi, LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
const cdk = require("aws-cdk-lib");
const iam = require("aws-cdk-lib/aws-iam");
class BasictestStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const saveAddress = new aws_dynamodb_1.Table(this, "Address", {
            partitionKey: { name: "UserId", type: aws_dynamodb_1.AttributeType.STRING },
            tableName: "Customer_Input_Table",
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
        //   const api = new RestApi(this, "Tu_testApi", {
        //     defaultMethodOptions: {
        //       apiKeyRequired: true,
        //     },
        //   });
        //   const userAddressApi = api.root.resourceForPath('userAddress');
        //   userAddressApi.addMethod('GET', new LambdaIntegration(getUserdataLambda));
        //   userAddressApi.addMethod('POST', new LambdaIntegration(saveUserdataLambda));
        //   const apiKey = api.addApiKey('ApiKey',{
        //     apiKeyName: 'tuApiKey',
        //     value: 'thisIsJustSampleAPi123' // we can get the apis using aws secret and get the key to fetch here 
        //   });
        //   const plan = api.addUsagePlan('Tu_api-usage-plan', { // we can use rate limit and other usage plans 
        //     name: `api-usage-plan`,
        //     apiStages: [{ stage: api.deploymentStage }],
        //   });
        //   plan.addApiKey(apiKey);
        //   new CfnOutput(this, "API URL", {
        //     value: api.url ?? "Something went wrong"
        //   });
    }
    ;
}
exports.BasictestStack = BasictestStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWN0ZXN0LXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFzaWN0ZXN0LXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLDJEQUFnRTtBQUNoRSx1REFBaUU7QUFDakUsMEVBQTBFO0FBQzFFLG1DQUFtQztBQUNuQywyQ0FBMkM7QUFFM0MsTUFBYSxjQUFlLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDM0MsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM5RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLFdBQVcsR0FBRyxJQUFJLG9CQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUM3QyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSw0QkFBYSxDQUFDLE1BQU0sRUFBRTtZQUM1RCxTQUFTLEVBQUUsc0JBQXNCO1NBQ2xDLENBQUMsQ0FBQztRQUNILFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQztZQUNsQyxTQUFTLEVBQUUsYUFBYTtZQUN4QixZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSw0QkFBYSxDQUFDLE1BQU0sRUFBRTtTQUM3RCxDQUFDLENBQUM7UUFFSCxNQUFNLGlCQUFpQixHQUFHLElBQUkscUJBQVEsQ0FBQyxJQUFJLEVBQUUsaUNBQWlDLEVBQUU7WUFDOUUsT0FBTyxFQUFFLG9CQUFPLENBQUMsV0FBVztZQUM1QixJQUFJLEVBQUUsaUJBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1lBQy9CLE9BQU8sRUFBRSxvQkFBb0I7WUFDN0IsV0FBVyxFQUFFO2dCQUNYLFVBQVUsRUFBRSxXQUFXLENBQUMsU0FBUzthQUNsQztTQUNGLENBQUMsQ0FBQztRQUVGLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxxQkFBUSxDQUFDLElBQUksRUFBRSxpQ0FBaUMsRUFBRTtZQUNoRixPQUFPLEVBQUUsb0JBQU8sQ0FBQyxXQUFXO1lBQzVCLElBQUksRUFBRSxpQkFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7WUFDL0IsT0FBTyxFQUFFLHFCQUFxQjtZQUM5QixXQUFXLEVBQUU7Z0JBQ1gsVUFBVSxFQUFFLFdBQVcsQ0FBQyxTQUFTO2FBQ2xDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsd0JBQXdCLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDO1FBQ2pILFdBQVcsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUVqRCxrREFBa0Q7UUFDbEQsOEJBQThCO1FBQzlCLDhCQUE4QjtRQUM5QixTQUFTO1FBQ1QsUUFBUTtRQUNSLG9FQUFvRTtRQUVwRSwrRUFBK0U7UUFDL0UsaUZBQWlGO1FBRWpGLDRDQUE0QztRQUM1Qyw4QkFBOEI7UUFDOUIsNkdBQTZHO1FBQzdHLFFBQVE7UUFDUix5R0FBeUc7UUFDekcsOEJBQThCO1FBQzlCLG1EQUFtRDtRQUNuRCxRQUFRO1FBRVIsNEJBQTRCO1FBRTVCLHFDQUFxQztRQUNyQywrQ0FBK0M7UUFDL0MsUUFBUTtJQUNSLENBQUM7SUFBQSxDQUFDO0NBQ0g7QUEzREQsd0NBMkRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2ZuT3V0cHV0IH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBBdHRyaWJ1dGVUeXBlLCBUYWJsZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1keW5hbW9kYic7XG5pbXBvcnQgeyBGdW5jdGlvbiwgUnVudGltZSwgQ29kZSB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XG4vL2ltcG9ydCB7IFJlc3RBcGksIExhbWJkYUludGVncmF0aW9uIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5XCI7XG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgaWFtIGZyb20gJ2F3cy1jZGstbGliL2F3cy1pYW0nO1xuXG5leHBvcnQgY2xhc3MgQmFzaWN0ZXN0U3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCBzYXZlQWRkcmVzcyA9IG5ldyBUYWJsZSh0aGlzLCBcIkFkZHJlc3NcIiwge1xuICAgICAgcGFydGl0aW9uS2V5OiB7IG5hbWU6IFwiVXNlcklkXCIsIHR5cGU6IEF0dHJpYnV0ZVR5cGUuU1RSSU5HIH0sXG4gICAgICB0YWJsZU5hbWU6IFwiQ3VzdG9tZXJfSW5wdXRfVGFibGVcIixcbiAgICB9KTtcbiAgICBzYXZlQWRkcmVzcy5hZGRHbG9iYWxTZWNvbmRhcnlJbmRleCh7XG4gICAgICBpbmRleE5hbWU6ICdVc2VySWRJbmRleCcsXG4gICAgICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogJ1VzZXJJZCcsIHR5cGU6IEF0dHJpYnV0ZVR5cGUuU1RSSU5HIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBnZXRVc2VyZGF0YUxhbWJkYSA9IG5ldyBGdW5jdGlvbih0aGlzLCBcIkdldEN1c3RvbWVyQWRkcmVzc0xhbWJkYUhhbmRsZXJcIiwge1xuICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMTRfWCxcbiAgICAgIGNvZGU6IENvZGUuZnJvbUFzc2V0KCdoYW5kbGVyJyksXG4gICAgICBoYW5kbGVyOiAnZ2V0SGFuZGxlci5oYW5kbGVyJyxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIFRBQkxFX05BTUU6IHNhdmVBZGRyZXNzLnRhYmxlTmFtZSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICAgY29uc3Qgc2F2ZVVzZXJkYXRhTGFtYmRhID0gbmV3IEZ1bmN0aW9uKHRoaXMsIFwiUHV0Q3VzdG9tZXJBZGRyZXNzTGFtYmRhSGFuZGxlclwiLCB7XG4gICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18xNF9YLFxuICAgICAgY29kZTogQ29kZS5mcm9tQXNzZXQoXCJoYW5kbGVyXCIpLFxuICAgICAgaGFuZGxlcjogXCJzYXZlSGFuZGxlci5oYW5kbGVyXCIsXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBUQUJMRV9OQU1FOiBzYXZlQWRkcmVzcy50YWJsZU5hbWUsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIFxuICAgIGdldFVzZXJkYXRhTGFtYmRhLnJvbGU/LmFkZE1hbmFnZWRQb2xpY3koaWFtLk1hbmFnZWRQb2xpY3kuZnJvbUF3c01hbmFnZWRQb2xpY3lOYW1lKCdBbWF6b25EeW5hbW9EQkZ1bGxBY2Nlc3MnKSk7XG4gICAgc2F2ZUFkZHJlc3MuZ3JhbnRXcml0ZURhdGEoc2F2ZVVzZXJkYXRhTGFtYmRhKTtcblxuICAvLyAgIGNvbnN0IGFwaSA9IG5ldyBSZXN0QXBpKHRoaXMsIFwiVHVfdGVzdEFwaVwiLCB7XG4gIC8vICAgICBkZWZhdWx0TWV0aG9kT3B0aW9uczoge1xuICAvLyAgICAgICBhcGlLZXlSZXF1aXJlZDogdHJ1ZSxcbiAgLy8gICAgIH0sXG4gIC8vICAgfSk7XG4gIC8vICAgY29uc3QgdXNlckFkZHJlc3NBcGkgPSBhcGkucm9vdC5yZXNvdXJjZUZvclBhdGgoJ3VzZXJBZGRyZXNzJyk7XG5cbiAgLy8gICB1c2VyQWRkcmVzc0FwaS5hZGRNZXRob2QoJ0dFVCcsIG5ldyBMYW1iZGFJbnRlZ3JhdGlvbihnZXRVc2VyZGF0YUxhbWJkYSkpO1xuICAvLyAgIHVzZXJBZGRyZXNzQXBpLmFkZE1ldGhvZCgnUE9TVCcsIG5ldyBMYW1iZGFJbnRlZ3JhdGlvbihzYXZlVXNlcmRhdGFMYW1iZGEpKTtcbiAgICBcbiAgLy8gICBjb25zdCBhcGlLZXkgPSBhcGkuYWRkQXBpS2V5KCdBcGlLZXknLHtcbiAgLy8gICAgIGFwaUtleU5hbWU6ICd0dUFwaUtleScsXG4gIC8vICAgICB2YWx1ZTogJ3RoaXNJc0p1c3RTYW1wbGVBUGkxMjMnIC8vIHdlIGNhbiBnZXQgdGhlIGFwaXMgdXNpbmcgYXdzIHNlY3JldCBhbmQgZ2V0IHRoZSBrZXkgdG8gZmV0Y2ggaGVyZSBcbiAgLy8gICB9KTtcbiAgLy8gICBjb25zdCBwbGFuID0gYXBpLmFkZFVzYWdlUGxhbignVHVfYXBpLXVzYWdlLXBsYW4nLCB7IC8vIHdlIGNhbiB1c2UgcmF0ZSBsaW1pdCBhbmQgb3RoZXIgdXNhZ2UgcGxhbnMgXG4gIC8vICAgICBuYW1lOiBgYXBpLXVzYWdlLXBsYW5gLFxuICAvLyAgICAgYXBpU3RhZ2VzOiBbeyBzdGFnZTogYXBpLmRlcGxveW1lbnRTdGFnZSB9XSxcbiAgLy8gICB9KTtcbiAgXG4gIC8vICAgcGxhbi5hZGRBcGlLZXkoYXBpS2V5KTtcbiAgXG4gIC8vICAgbmV3IENmbk91dHB1dCh0aGlzLCBcIkFQSSBVUkxcIiwge1xuICAvLyAgICAgdmFsdWU6IGFwaS51cmwgPz8gXCJTb21ldGhpbmcgd2VudCB3cm9uZ1wiXG4gIC8vICAgfSk7XG4gIH07XG59XG4iXX0=