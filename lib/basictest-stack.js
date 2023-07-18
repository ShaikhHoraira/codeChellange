"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasictestStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_dynamodb_1 = require("aws-cdk-lib/aws-dynamodb");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
const cdk = require("aws-cdk-lib");
class BasictestStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const saveAddress = new aws_dynamodb_1.Table(this, "Address", {
            partitionKey: { name: "postcode", type: aws_dynamodb_1.AttributeType.STRING },
        });
        const getUserdataLambda = new aws_lambda_1.Function(this, "GetAllTodosLambdaHandler", {
            runtime: aws_lambda_1.Runtime.NODEJS_14_X,
            code: aws_lambda_1.Code.fromAsset('handler'),
            handler: 'getHandler.handler',
            environment: {
                TODO_TABLE_NAME: saveAddress.tableName,
            },
        });
        const saveUserdataLambda = new aws_lambda_1.Function(this, "PutTodoLambdaHandler", {
            runtime: aws_lambda_1.Runtime.NODEJS_14_X,
            code: aws_lambda_1.Code.fromAsset("handler"),
            handler: "saveHandler.handler",
            environment: {
                TODO_TABLE_NAME: saveAddress.tableName,
            },
        });
        saveAddress.grantReadWriteData(getUserdataLambda);
        saveAddress.grantReadWriteData(saveUserdataLambda);
        const api = new aws_apigateway_1.RestApi(this, "Tu_testApi");
        const userAddressApi = api.root.resourceForPath('userAddress');
        userAddressApi.addMethod('GET', new aws_apigateway_1.LambdaIntegration(getUserdataLambda));
        userAddressApi.addMethod('POST', new aws_apigateway_1.LambdaIntegration(saveUserdataLambda));
        // const _apiKey = api.addApiKey('ApiKey',{
        //   apiKeyName: 'tuApiKey',
        //   value: 'thisIsJustSampleAPi',
        // })
        new aws_cdk_lib_1.CfnOutput(this, "API URL", {
            value: api.url ?? "Something went wrong"
        });
    }
}
exports.BasictestStack = BasictestStack;
// lambda function 2 PutTodoLambdaHandler
// const putTodoLambda = new Function(this, "PutTodoLambdaHandler", {
//   runtime: Runtime.NODEJS_14_X,
//   code: Code.fromAsset("functions"),
//   handler: "put-todo.putTodoHandler",
//   environment: {
//     TODO_TABLE_NAME: todoTable.tableName,
//   },
// });
//  // permissions to lambda to dynamo table    
//  todoTable.grantReadWriteData(putTodoLambda);
// create the API Gateway method and path
//I could do one one lambda with two handler 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWN0ZXN0LXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFzaWN0ZXN0LXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUEyRDtBQUUzRCwyREFBZ0U7QUFDaEUsdURBQWlFO0FBQ2pFLCtEQUEwRjtBQUMxRixtQ0FBbUM7QUFFbkMsTUFBYSxjQUFlLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDM0MsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM5RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUd4QixNQUFNLFdBQVcsR0FBRyxJQUFJLG9CQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUM3QyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSw0QkFBYSxDQUFDLE1BQU0sRUFBRTtTQUMvRCxDQUFDLENBQUM7UUFHSCxNQUFNLGlCQUFpQixHQUFHLElBQUkscUJBQVEsQ0FBQyxJQUFJLEVBQUUsMEJBQTBCLEVBQUU7WUFDdkUsT0FBTyxFQUFFLG9CQUFPLENBQUMsV0FBVztZQUM1QixJQUFJLEVBQUUsaUJBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1lBQy9CLE9BQU8sRUFBRSxvQkFBb0I7WUFDN0IsV0FBVyxFQUFFO2dCQUNYLGVBQWUsRUFBRSxXQUFXLENBQUMsU0FBUzthQUN2QztTQUNGLENBQUMsQ0FBQztRQUVGLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxxQkFBUSxDQUFDLElBQUksRUFBRSxzQkFBc0IsRUFBRTtZQUNyRSxPQUFPLEVBQUUsb0JBQU8sQ0FBQyxXQUFXO1lBQzVCLElBQUksRUFBRSxpQkFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7WUFDL0IsT0FBTyxFQUFFLHFCQUFxQjtZQUM5QixXQUFXLEVBQUU7Z0JBQ1gsZUFBZSxFQUFFLFdBQVcsQ0FBQyxTQUFTO2FBQ3ZDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsV0FBVyxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDbEQsV0FBVyxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFFbkQsTUFBTSxHQUFHLEdBQUcsSUFBSSx3QkFBTyxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztRQUU1QyxNQUFNLGNBQWMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUUvRCxjQUFjLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLGtDQUFpQixDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztRQUMxRSxjQUFjLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLGtDQUFpQixDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQTtRQUUzRSwyQ0FBMkM7UUFDM0MsNEJBQTRCO1FBQzVCLGtDQUFrQztRQUNsQyxLQUFLO1FBRUwsSUFBSSx1QkFBUyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDN0IsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUksc0JBQXNCO1NBQ3pDLENBQUMsQ0FBQztJQUVMLENBQUM7Q0FDRjtBQWhERCx3Q0FnREM7QUFJRyx5Q0FBeUM7QUFDekMscUVBQXFFO0FBQ3JFLGtDQUFrQztBQUNsQyx1Q0FBdUM7QUFDdkMsd0NBQXdDO0FBQ3hDLG1CQUFtQjtBQUNuQiw0Q0FBNEM7QUFDNUMsT0FBTztBQUNQLE1BQU07QUFFTixnREFBZ0Q7QUFDaEQsZ0RBQWdEO0FBRWhELHlDQUF5QztBQUN6Qyw2Q0FBNkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdGFjaywgU3RhY2tQcm9wcywgQ2ZuT3V0cHV0IH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBBdHRyaWJ1dGVUeXBlLCBUYWJsZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1keW5hbW9kYic7XG5pbXBvcnQgeyBGdW5jdGlvbiwgUnVudGltZSwgQ29kZSB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XG5pbXBvcnQgeyBSZXN0QXBpLCBMYW1iZGFJbnRlZ3JhdGlvbiwgQXBpS2V5U291cmNlVHlwZSB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtYXBpZ2F0ZXdheVwiO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcblxuZXhwb3J0IGNsYXNzIEJhc2ljdGVzdFN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG5cbiAgICBjb25zdCBzYXZlQWRkcmVzcyA9IG5ldyBUYWJsZSh0aGlzLCBcIkFkZHJlc3NcIiwge1xuICAgICAgcGFydGl0aW9uS2V5OiB7IG5hbWU6IFwicG9zdGNvZGVcIiwgdHlwZTogQXR0cmlidXRlVHlwZS5TVFJJTkcgfSxcbiAgICB9KTtcblxuXG4gICAgY29uc3QgZ2V0VXNlcmRhdGFMYW1iZGEgPSBuZXcgRnVuY3Rpb24odGhpcywgXCJHZXRBbGxUb2Rvc0xhbWJkYUhhbmRsZXJcIiwge1xuICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMTRfWCxcbiAgICAgIGNvZGU6IENvZGUuZnJvbUFzc2V0KCdoYW5kbGVyJyksXG4gICAgICBoYW5kbGVyOiAnZ2V0SGFuZGxlci5oYW5kbGVyJyxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIFRPRE9fVEFCTEVfTkFNRTogc2F2ZUFkZHJlc3MudGFibGVOYW1lLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgICBjb25zdCBzYXZlVXNlcmRhdGFMYW1iZGEgPSBuZXcgRnVuY3Rpb24odGhpcywgXCJQdXRUb2RvTGFtYmRhSGFuZGxlclwiLCB7XG4gICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18xNF9YLFxuICAgICAgY29kZTogQ29kZS5mcm9tQXNzZXQoXCJoYW5kbGVyXCIpLFxuICAgICAgaGFuZGxlcjogXCJzYXZlSGFuZGxlci5oYW5kbGVyXCIsXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBUT0RPX1RBQkxFX05BTUU6IHNhdmVBZGRyZXNzLnRhYmxlTmFtZSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBzYXZlQWRkcmVzcy5ncmFudFJlYWRXcml0ZURhdGEoZ2V0VXNlcmRhdGFMYW1iZGEpO1xuICAgIHNhdmVBZGRyZXNzLmdyYW50UmVhZFdyaXRlRGF0YShzYXZlVXNlcmRhdGFMYW1iZGEpO1xuXG4gICAgY29uc3QgYXBpID0gbmV3IFJlc3RBcGkodGhpcywgXCJUdV90ZXN0QXBpXCIpO1xuXG4gICAgY29uc3QgdXNlckFkZHJlc3NBcGkgPSBhcGkucm9vdC5yZXNvdXJjZUZvclBhdGgoJ3VzZXJBZGRyZXNzJyk7XG5cbiAgICB1c2VyQWRkcmVzc0FwaS5hZGRNZXRob2QoJ0dFVCcsIG5ldyBMYW1iZGFJbnRlZ3JhdGlvbihnZXRVc2VyZGF0YUxhbWJkYSkpO1xuICAgIHVzZXJBZGRyZXNzQXBpLmFkZE1ldGhvZCgnUE9TVCcsIG5ldyBMYW1iZGFJbnRlZ3JhdGlvbihzYXZlVXNlcmRhdGFMYW1iZGEpKVxuICAgIFxuICAgIC8vIGNvbnN0IF9hcGlLZXkgPSBhcGkuYWRkQXBpS2V5KCdBcGlLZXknLHtcbiAgICAvLyAgIGFwaUtleU5hbWU6ICd0dUFwaUtleScsXG4gICAgLy8gICB2YWx1ZTogJ3RoaXNJc0p1c3RTYW1wbGVBUGknLFxuICAgIC8vIH0pXG5cbiAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsIFwiQVBJIFVSTFwiLCB7XG4gICAgICB2YWx1ZTogYXBpLnVybCA/PyBcIlNvbWV0aGluZyB3ZW50IHdyb25nXCJcbiAgICB9KTtcblxuICB9XG59XG5cblxuXG4gICAgLy8gbGFtYmRhIGZ1bmN0aW9uIDIgUHV0VG9kb0xhbWJkYUhhbmRsZXJcbiAgICAvLyBjb25zdCBwdXRUb2RvTGFtYmRhID0gbmV3IEZ1bmN0aW9uKHRoaXMsIFwiUHV0VG9kb0xhbWJkYUhhbmRsZXJcIiwge1xuICAgIC8vICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMTRfWCxcbiAgICAvLyAgIGNvZGU6IENvZGUuZnJvbUFzc2V0KFwiZnVuY3Rpb25zXCIpLFxuICAgIC8vICAgaGFuZGxlcjogXCJwdXQtdG9kby5wdXRUb2RvSGFuZGxlclwiLFxuICAgIC8vICAgZW52aXJvbm1lbnQ6IHtcbiAgICAvLyAgICAgVE9ET19UQUJMRV9OQU1FOiB0b2RvVGFibGUudGFibGVOYW1lLFxuICAgIC8vICAgfSxcbiAgICAvLyB9KTtcblxuICAgIC8vICAvLyBwZXJtaXNzaW9ucyB0byBsYW1iZGEgdG8gZHluYW1vIHRhYmxlICAgIFxuICAgIC8vICB0b2RvVGFibGUuZ3JhbnRSZWFkV3JpdGVEYXRhKHB1dFRvZG9MYW1iZGEpO1xuXG4gICAgLy8gY3JlYXRlIHRoZSBBUEkgR2F0ZXdheSBtZXRob2QgYW5kIHBhdGhcbiAgICAvL0kgY291bGQgZG8gb25lIG9uZSBsYW1iZGEgd2l0aCB0d28gaGFuZGxlciAiXX0=