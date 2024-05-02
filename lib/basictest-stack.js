"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasictestStack = void 0;
// import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
// import { Function, Runtime, Code } from "aws-cdk-lib/aws-lambda";
// import { RestApi,  } from "aws-cdk-lib/aws-apigateway";
const cdk = require("aws-cdk-lib");
// import * as iam from 'aws-cdk-lib/aws-iam';
class BasictestStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // const saveAddress = new Table(this, "Address", {
        //   partitionKey: { name: "UserId", type: AttributeType.STRING },
        //   tableName: "Tu_Test_TableName",
        // });
        // saveAddress.addGlobalSecondaryIndex({
        //   indexName: 'UserIdIndex',
        //   partitionKey: { name: 'UserId', type: AttributeType.STRING },
        // });
        // const getUserdataLambda = new Function(this, "GetCustomerAddressLambdaHandler", {
        //   runtime: Runtime.NODEJS_20_X,
        //   code: Code.fromAsset('handler'), // Adjusted path
        //   handler: 'getHandler.handler',
        //   environment: {
        //     TABLE_NAME: saveAddress.tableName,
        //   },
        // });
        // const saveUserdataLambda = new Function(this, "PutCustomerAddressLambdaHandler", {
        //   runtime: Runtime.NODEJS_20_X,
        //   code: Code.fromAsset("handler"), // Adjusted path
        //   handler: 'saveHandler.handler',
        //   environment: {
        //     TABLE_NAME: saveAddress.tableName,
        //   },
        // });
        // getUserdataLambda.role?.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'));
        // saveAddress.grantWriteData(saveUserdataLambda);
        // const api = new RestApi(this, "Tu_testApi", {
        //   defaultMethodOptions: {
        //     apiKeyRequired: true,
        //   },
        //   // defaultCorsPreflightOptions:{
        //   //   statusCode: 204,
        //   //   allowOrigins: ['*'],
        //   //   allowHeaders: ['Content-Type','Authorization','X-Api-Key'],
        //   //   allowMethods: ['POST', 'GET']
        //   // }
        // });
        // // const userAddressApi = api.root.resourceForPath('userAddress');
        // // userAddressApi.addMethod('GET', new LambdaIntegration(getUserdataLambda));
        // // userAddressApi.addMethod('POST', new LambdaIntegration(saveUserdataLambda));
        // const apiKey = api.addApiKey('ApiKey',{
        //   apiKeyName: 'tuApiKey',
        //   value: 'thisIsJustSampleAPi123' // we can get the apis using aws secret and get the key to fetch here 
        // });
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
}
exports.BasictestStack = BasictestStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWN0ZXN0LXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFzaWN0ZXN0LXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLG1FQUFtRTtBQUNuRSxvRUFBb0U7QUFDcEUsMERBQTBEO0FBQzFELG1DQUFtQztBQUNuQyw4Q0FBOEM7QUFFOUMsTUFBYSxjQUFlLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDM0MsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM5RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixtREFBbUQ7UUFDbkQsa0VBQWtFO1FBQ2xFLG9DQUFvQztRQUNwQyxNQUFNO1FBQ04sd0NBQXdDO1FBQ3hDLDhCQUE4QjtRQUM5QixrRUFBa0U7UUFDbEUsTUFBTTtRQUVOLG9GQUFvRjtRQUNwRixrQ0FBa0M7UUFDbEMsc0RBQXNEO1FBQ3RELG1DQUFtQztRQUNuQyxtQkFBbUI7UUFDbkIseUNBQXlDO1FBQ3pDLE9BQU87UUFDUCxNQUFNO1FBRU4scUZBQXFGO1FBQ3JGLGtDQUFrQztRQUNsQyxzREFBc0Q7UUFDdEQsb0NBQW9DO1FBQ3BDLG1CQUFtQjtRQUNuQix5Q0FBeUM7UUFDekMsT0FBTztRQUNQLE1BQU07UUFDTixvSEFBb0g7UUFDcEgsa0RBQWtEO1FBRWxELGdEQUFnRDtRQUNoRCw0QkFBNEI7UUFDNUIsNEJBQTRCO1FBQzVCLE9BQU87UUFDUCxxQ0FBcUM7UUFDckMsMEJBQTBCO1FBQzFCLDhCQUE4QjtRQUM5QixxRUFBcUU7UUFDckUsdUNBQXVDO1FBQ3ZDLFNBQVM7UUFFVCxNQUFNO1FBQ04scUVBQXFFO1FBQ3JFLGdGQUFnRjtRQUNoRixrRkFBa0Y7UUFFbEYsMENBQTBDO1FBQzFDLDRCQUE0QjtRQUM1QiwyR0FBMkc7UUFDM0csTUFBTTtRQUNOLHVHQUF1RztRQUN2Ryw0QkFBNEI7UUFDNUIsaURBQWlEO1FBQ2pELE1BQU07UUFFTiwwQkFBMEI7UUFFMUIsbUNBQW1DO1FBQ25DLDZDQUE2QztRQUM3QyxNQUFNO0lBRVIsQ0FBQztJQUFBLENBQUM7Q0FDSDtBQWpFRCx3Q0FpRUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyBDZm5PdXRwdXQgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbi8vIGltcG9ydCB7IEF0dHJpYnV0ZVR5cGUsIFRhYmxlIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWR5bmFtb2RiJztcbi8vIGltcG9ydCB7IEZ1bmN0aW9uLCBSdW50aW1lLCBDb2RlIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcbi8vIGltcG9ydCB7IFJlc3RBcGksICB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtYXBpZ2F0ZXdheVwiO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbi8vIGltcG9ydCAqIGFzIGlhbSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtaWFtJztcblxuZXhwb3J0IGNsYXNzIEJhc2ljdGVzdFN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgLy8gY29uc3Qgc2F2ZUFkZHJlc3MgPSBuZXcgVGFibGUodGhpcywgXCJBZGRyZXNzXCIsIHtcbiAgICAvLyAgIHBhcnRpdGlvbktleTogeyBuYW1lOiBcIlVzZXJJZFwiLCB0eXBlOiBBdHRyaWJ1dGVUeXBlLlNUUklORyB9LFxuICAgIC8vICAgdGFibGVOYW1lOiBcIlR1X1Rlc3RfVGFibGVOYW1lXCIsXG4gICAgLy8gfSk7XG4gICAgLy8gc2F2ZUFkZHJlc3MuYWRkR2xvYmFsU2Vjb25kYXJ5SW5kZXgoe1xuICAgIC8vICAgaW5kZXhOYW1lOiAnVXNlcklkSW5kZXgnLFxuICAgIC8vICAgcGFydGl0aW9uS2V5OiB7IG5hbWU6ICdVc2VySWQnLCB0eXBlOiBBdHRyaWJ1dGVUeXBlLlNUUklORyB9LFxuICAgIC8vIH0pO1xuXG4gICAgLy8gY29uc3QgZ2V0VXNlcmRhdGFMYW1iZGEgPSBuZXcgRnVuY3Rpb24odGhpcywgXCJHZXRDdXN0b21lckFkZHJlc3NMYW1iZGFIYW5kbGVyXCIsIHtcbiAgICAvLyAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzIwX1gsXG4gICAgLy8gICBjb2RlOiBDb2RlLmZyb21Bc3NldCgnaGFuZGxlcicpLCAvLyBBZGp1c3RlZCBwYXRoXG4gICAgLy8gICBoYW5kbGVyOiAnZ2V0SGFuZGxlci5oYW5kbGVyJyxcbiAgICAvLyAgIGVudmlyb25tZW50OiB7XG4gICAgLy8gICAgIFRBQkxFX05BTUU6IHNhdmVBZGRyZXNzLnRhYmxlTmFtZSxcbiAgICAvLyAgIH0sXG4gICAgLy8gfSk7XG5cbiAgICAvLyBjb25zdCBzYXZlVXNlcmRhdGFMYW1iZGEgPSBuZXcgRnVuY3Rpb24odGhpcywgXCJQdXRDdXN0b21lckFkZHJlc3NMYW1iZGFIYW5kbGVyXCIsIHtcbiAgICAvLyAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzIwX1gsXG4gICAgLy8gICBjb2RlOiBDb2RlLmZyb21Bc3NldChcImhhbmRsZXJcIiksIC8vIEFkanVzdGVkIHBhdGhcbiAgICAvLyAgIGhhbmRsZXI6ICdzYXZlSGFuZGxlci5oYW5kbGVyJyxcbiAgICAvLyAgIGVudmlyb25tZW50OiB7XG4gICAgLy8gICAgIFRBQkxFX05BTUU6IHNhdmVBZGRyZXNzLnRhYmxlTmFtZSxcbiAgICAvLyAgIH0sXG4gICAgLy8gfSk7XG4gICAgLy8gZ2V0VXNlcmRhdGFMYW1iZGEucm9sZT8uYWRkTWFuYWdlZFBvbGljeShpYW0uTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoJ0FtYXpvbkR5bmFtb0RCRnVsbEFjY2VzcycpKTtcbiAgICAvLyBzYXZlQWRkcmVzcy5ncmFudFdyaXRlRGF0YShzYXZlVXNlcmRhdGFMYW1iZGEpO1xuXG4gICAgLy8gY29uc3QgYXBpID0gbmV3IFJlc3RBcGkodGhpcywgXCJUdV90ZXN0QXBpXCIsIHtcbiAgICAvLyAgIGRlZmF1bHRNZXRob2RPcHRpb25zOiB7XG4gICAgLy8gICAgIGFwaUtleVJlcXVpcmVkOiB0cnVlLFxuICAgIC8vICAgfSxcbiAgICAvLyAgIC8vIGRlZmF1bHRDb3JzUHJlZmxpZ2h0T3B0aW9uczp7XG4gICAgLy8gICAvLyAgIHN0YXR1c0NvZGU6IDIwNCxcbiAgICAvLyAgIC8vICAgYWxsb3dPcmlnaW5zOiBbJyonXSxcbiAgICAvLyAgIC8vICAgYWxsb3dIZWFkZXJzOiBbJ0NvbnRlbnQtVHlwZScsJ0F1dGhvcml6YXRpb24nLCdYLUFwaS1LZXknXSxcbiAgICAvLyAgIC8vICAgYWxsb3dNZXRob2RzOiBbJ1BPU1QnLCAnR0VUJ11cbiAgICAvLyAgIC8vIH1cbiAgICAgIFxuICAgIC8vIH0pO1xuICAgIC8vIC8vIGNvbnN0IHVzZXJBZGRyZXNzQXBpID0gYXBpLnJvb3QucmVzb3VyY2VGb3JQYXRoKCd1c2VyQWRkcmVzcycpO1xuICAgIC8vIC8vIHVzZXJBZGRyZXNzQXBpLmFkZE1ldGhvZCgnR0VUJywgbmV3IExhbWJkYUludGVncmF0aW9uKGdldFVzZXJkYXRhTGFtYmRhKSk7XG4gICAgLy8gLy8gdXNlckFkZHJlc3NBcGkuYWRkTWV0aG9kKCdQT1NUJywgbmV3IExhbWJkYUludGVncmF0aW9uKHNhdmVVc2VyZGF0YUxhbWJkYSkpO1xuICAgIFxuICAgIC8vIGNvbnN0IGFwaUtleSA9IGFwaS5hZGRBcGlLZXkoJ0FwaUtleScse1xuICAgIC8vICAgYXBpS2V5TmFtZTogJ3R1QXBpS2V5JyxcbiAgICAvLyAgIHZhbHVlOiAndGhpc0lzSnVzdFNhbXBsZUFQaTEyMycgLy8gd2UgY2FuIGdldCB0aGUgYXBpcyB1c2luZyBhd3Mgc2VjcmV0IGFuZCBnZXQgdGhlIGtleSB0byBmZXRjaCBoZXJlIFxuICAgIC8vIH0pO1xuICAgIC8vIGNvbnN0IHBsYW4gPSBhcGkuYWRkVXNhZ2VQbGFuKCdUdV9hcGktdXNhZ2UtcGxhbicsIHsgLy8gd2UgY2FuIHVzZSByYXRlIGxpbWl0IGFuZCBvdGhlciB1c2FnZSBwbGFucyBcbiAgICAvLyAgIG5hbWU6IGBhcGktdXNhZ2UtcGxhbmAsXG4gICAgLy8gICBhcGlTdGFnZXM6IFt7IHN0YWdlOiBhcGkuZGVwbG95bWVudFN0YWdlIH1dLFxuICAgIC8vIH0pO1xuICBcbiAgICAvLyBwbGFuLmFkZEFwaUtleShhcGlLZXkpO1xuICBcbiAgICAvLyBuZXcgQ2ZuT3V0cHV0KHRoaXMsIFwiQVBJIFVSTFwiLCB7XG4gICAgLy8gICB2YWx1ZTogYXBpLnVybCA/PyBcIlNvbWV0aGluZyB3ZW50IHdyb25nXCJcbiAgICAvLyB9KTtcblxuICB9O1xufVxuIl19