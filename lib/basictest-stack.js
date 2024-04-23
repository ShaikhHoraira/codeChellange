"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasictestStack = void 0;
const cdk = require("aws-cdk-lib");
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
        //   runtime: Runtime.NODEJS_14_X,
        //   code: Code.fromAsset('handler'),
        //   handler: 'getHandler.handler',
        //   environment: {
        //     TABLE_NAME: saveAddress.tableName,
        //   },
        // });
        //  const saveUserdataLambda = new Function(this, "PutCustomerAddressLambdaHandler", {
        //   runtime: Runtime.NODEJS_14_X,
        //   code: Code.fromAsset("handler"),
        //   handler: "saveHandler.handler",
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
        // });
        // const userAddressApi = api.root.resourceForPath('userAddress');
        // userAddressApi.addMethod('GET', new LambdaIntegration(getUserdataLambda));
        // userAddressApi.addMethod('POST', new LambdaIntegration(saveUserdataLambda));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWN0ZXN0LXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFzaWN0ZXN0LXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtBLG1DQUFtQztBQUduQyxNQUFhLGNBQWUsU0FBUSxHQUFHLENBQUMsS0FBSztJQUMzQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQzlELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLG1EQUFtRDtRQUNuRCxrRUFBa0U7UUFDbEUsb0NBQW9DO1FBQ3BDLE1BQU07UUFDTix3Q0FBd0M7UUFDeEMsOEJBQThCO1FBQzlCLGtFQUFrRTtRQUNsRSxNQUFNO1FBRU4sb0ZBQW9GO1FBQ3BGLGtDQUFrQztRQUNsQyxxQ0FBcUM7UUFDckMsbUNBQW1DO1FBQ25DLG1CQUFtQjtRQUNuQix5Q0FBeUM7UUFDekMsT0FBTztRQUNQLE1BQU07UUFFTixzRkFBc0Y7UUFDdEYsa0NBQWtDO1FBQ2xDLHFDQUFxQztRQUNyQyxvQ0FBb0M7UUFDcEMsbUJBQW1CO1FBQ25CLHlDQUF5QztRQUN6QyxPQUFPO1FBQ1AsTUFBTTtRQUVOLG9IQUFvSDtRQUNwSCxrREFBa0Q7UUFFbEQsZ0RBQWdEO1FBQ2hELDRCQUE0QjtRQUM1Qiw0QkFBNEI7UUFDNUIsT0FBTztRQUNQLE1BQU07UUFDTixrRUFBa0U7UUFFbEUsNkVBQTZFO1FBQzdFLCtFQUErRTtRQUUvRSwwQ0FBMEM7UUFDMUMsNEJBQTRCO1FBQzVCLDJHQUEyRztRQUMzRyxNQUFNO1FBQ04sdUdBQXVHO1FBQ3ZHLDRCQUE0QjtRQUM1QixpREFBaUQ7UUFDakQsTUFBTTtRQUVOLDBCQUEwQjtRQUUxQixtQ0FBbUM7UUFDbkMsNkNBQTZDO1FBQzdDLE1BQU07SUFFUixDQUFDO0lBQUEsQ0FBQztDQUNIO0FBNURELHdDQTREQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENmbk91dHB1dCB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0IHsgQXR0cmlidXRlVHlwZSwgVGFibGUgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZHluYW1vZGInO1xuaW1wb3J0IHsgRnVuY3Rpb24sIFJ1bnRpbWUsIENvZGUgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuaW1wb3J0IHsgUmVzdEFwaSwgTGFtYmRhSW50ZWdyYXRpb24gfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXlcIjtcbmltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBpYW0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XG5cbmV4cG9ydCBjbGFzcyBCYXNpY3Rlc3RTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIC8vIGNvbnN0IHNhdmVBZGRyZXNzID0gbmV3IFRhYmxlKHRoaXMsIFwiQWRkcmVzc1wiLCB7XG4gICAgLy8gICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogXCJVc2VySWRcIiwgdHlwZTogQXR0cmlidXRlVHlwZS5TVFJJTkcgfSxcbiAgICAvLyAgIHRhYmxlTmFtZTogXCJUdV9UZXN0X1RhYmxlTmFtZVwiLFxuICAgIC8vIH0pO1xuICAgIC8vIHNhdmVBZGRyZXNzLmFkZEdsb2JhbFNlY29uZGFyeUluZGV4KHtcbiAgICAvLyAgIGluZGV4TmFtZTogJ1VzZXJJZEluZGV4JyxcbiAgICAvLyAgIHBhcnRpdGlvbktleTogeyBuYW1lOiAnVXNlcklkJywgdHlwZTogQXR0cmlidXRlVHlwZS5TVFJJTkcgfSxcbiAgICAvLyB9KTtcblxuICAgIC8vIGNvbnN0IGdldFVzZXJkYXRhTGFtYmRhID0gbmV3IEZ1bmN0aW9uKHRoaXMsIFwiR2V0Q3VzdG9tZXJBZGRyZXNzTGFtYmRhSGFuZGxlclwiLCB7XG4gICAgLy8gICBydW50aW1lOiBSdW50aW1lLk5PREVKU18xNF9YLFxuICAgIC8vICAgY29kZTogQ29kZS5mcm9tQXNzZXQoJ2hhbmRsZXInKSxcbiAgICAvLyAgIGhhbmRsZXI6ICdnZXRIYW5kbGVyLmhhbmRsZXInLFxuICAgIC8vICAgZW52aXJvbm1lbnQ6IHtcbiAgICAvLyAgICAgVEFCTEVfTkFNRTogc2F2ZUFkZHJlc3MudGFibGVOYW1lLFxuICAgIC8vICAgfSxcbiAgICAvLyB9KTtcblxuICAgIC8vICBjb25zdCBzYXZlVXNlcmRhdGFMYW1iZGEgPSBuZXcgRnVuY3Rpb24odGhpcywgXCJQdXRDdXN0b21lckFkZHJlc3NMYW1iZGFIYW5kbGVyXCIsIHtcbiAgICAvLyAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzE0X1gsXG4gICAgLy8gICBjb2RlOiBDb2RlLmZyb21Bc3NldChcImhhbmRsZXJcIiksXG4gICAgLy8gICBoYW5kbGVyOiBcInNhdmVIYW5kbGVyLmhhbmRsZXJcIixcbiAgICAvLyAgIGVudmlyb25tZW50OiB7XG4gICAgLy8gICAgIFRBQkxFX05BTUU6IHNhdmVBZGRyZXNzLnRhYmxlTmFtZSxcbiAgICAvLyAgIH0sXG4gICAgLy8gfSk7XG4gICAgXG4gICAgLy8gZ2V0VXNlcmRhdGFMYW1iZGEucm9sZT8uYWRkTWFuYWdlZFBvbGljeShpYW0uTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoJ0FtYXpvbkR5bmFtb0RCRnVsbEFjY2VzcycpKTtcbiAgICAvLyBzYXZlQWRkcmVzcy5ncmFudFdyaXRlRGF0YShzYXZlVXNlcmRhdGFMYW1iZGEpO1xuXG4gICAgLy8gY29uc3QgYXBpID0gbmV3IFJlc3RBcGkodGhpcywgXCJUdV90ZXN0QXBpXCIsIHtcbiAgICAvLyAgIGRlZmF1bHRNZXRob2RPcHRpb25zOiB7XG4gICAgLy8gICAgIGFwaUtleVJlcXVpcmVkOiB0cnVlLFxuICAgIC8vICAgfSxcbiAgICAvLyB9KTtcbiAgICAvLyBjb25zdCB1c2VyQWRkcmVzc0FwaSA9IGFwaS5yb290LnJlc291cmNlRm9yUGF0aCgndXNlckFkZHJlc3MnKTtcbiAgICBcbiAgICAvLyB1c2VyQWRkcmVzc0FwaS5hZGRNZXRob2QoJ0dFVCcsIG5ldyBMYW1iZGFJbnRlZ3JhdGlvbihnZXRVc2VyZGF0YUxhbWJkYSkpO1xuICAgIC8vIHVzZXJBZGRyZXNzQXBpLmFkZE1ldGhvZCgnUE9TVCcsIG5ldyBMYW1iZGFJbnRlZ3JhdGlvbihzYXZlVXNlcmRhdGFMYW1iZGEpKTtcbiAgICBcbiAgICAvLyBjb25zdCBhcGlLZXkgPSBhcGkuYWRkQXBpS2V5KCdBcGlLZXknLHtcbiAgICAvLyAgIGFwaUtleU5hbWU6ICd0dUFwaUtleScsXG4gICAgLy8gICB2YWx1ZTogJ3RoaXNJc0p1c3RTYW1wbGVBUGkxMjMnIC8vIHdlIGNhbiBnZXQgdGhlIGFwaXMgdXNpbmcgYXdzIHNlY3JldCBhbmQgZ2V0IHRoZSBrZXkgdG8gZmV0Y2ggaGVyZSBcbiAgICAvLyB9KTtcbiAgICAvLyBjb25zdCBwbGFuID0gYXBpLmFkZFVzYWdlUGxhbignVHVfYXBpLXVzYWdlLXBsYW4nLCB7IC8vIHdlIGNhbiB1c2UgcmF0ZSBsaW1pdCBhbmQgb3RoZXIgdXNhZ2UgcGxhbnMgXG4gICAgLy8gICBuYW1lOiBgYXBpLXVzYWdlLXBsYW5gLFxuICAgIC8vICAgYXBpU3RhZ2VzOiBbeyBzdGFnZTogYXBpLmRlcGxveW1lbnRTdGFnZSB9XSxcbiAgICAvLyB9KTtcbiAgXG4gICAgLy8gcGxhbi5hZGRBcGlLZXkoYXBpS2V5KTtcbiAgXG4gICAgLy8gbmV3IENmbk91dHB1dCh0aGlzLCBcIkFQSSBVUkxcIiwge1xuICAgIC8vICAgdmFsdWU6IGFwaS51cmwgPz8gXCJTb21ldGhpbmcgd2VudCB3cm9uZ1wiXG4gICAgLy8gfSk7XG5cbiAgfTtcbn1cbiJdfQ==