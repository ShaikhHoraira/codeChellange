"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomResourceProvider = void 0;
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const cr = require("aws-cdk-lib/custom-resources");
const path = require("path");
const constructs_1 = require("constructs");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
class CustomResourceProvider extends constructs_1.Construct {
    constructor(scope, id, stack, secretName) {
        super(scope, id);
        const handlerDir = path.resolve(__dirname, '../../../lib');
        // Define the Lambda function
        const getSecretValueFunction = new aws_lambda_1.Function(stack, 'GetSecretValueFunction', {
            runtime: aws_lambda_1.Runtime.NODEJS_20_X,
            handler: 'handler/common/secretHandler.handler',
            code: aws_lambda_1.Code.fromAsset(handlerDir),
            environment: {
                SECRET_NAME: secretName,
            }
        });
        getSecretValueFunction.grantPrincipal.addToPrincipalPolicy(new aws_iam_1.PolicyStatement({
            resources: ['*'],
            actions: [
                'lambda:InvokeFunction',
                'secretsmanager:GetSecretValue',
            ],
        }));
        // Create the custom resource provider
        const provider = new cr.Provider(this, 'ResourceProviderHandler', {
            onEventHandler: getSecretValueFunction,
        });
        this.serviceToken = provider.serviceToken;
    }
}
exports.CustomResourceProvider = CustomResourceProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZVNlY3JldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb25zdHJ1Y3QvY29tbW9uL2N1c3RvbWVTZWNyZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdURBQWlFO0FBQ2pFLG1EQUFtRDtBQUNuRCw2QkFBNkI7QUFDN0IsMkNBQXVDO0FBRXZDLGlEQUFzRDtBQUV0RCxNQUFhLHNCQUF1QixTQUFRLHNCQUFTO0lBR25ELFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUcsS0FBWSxFQUFFLFVBQW1CO1FBQzFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDM0QsNkJBQTZCO1FBQzdCLE1BQU0sc0JBQXNCLEdBQUcsSUFBSSxxQkFBUSxDQUFDLEtBQUssRUFBRSx3QkFBd0IsRUFBRTtZQUMzRSxPQUFPLEVBQUUsb0JBQU8sQ0FBQyxXQUFXO1lBQzVCLE9BQU8sRUFBRSxzQ0FBc0M7WUFDL0MsSUFBSSxFQUFFLGlCQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztZQUNoQyxXQUFXLEVBQUM7Z0JBQ1YsV0FBVyxFQUFFLFVBQVU7YUFDeEI7U0FDRixDQUFDLENBQUM7UUFDSCxzQkFBc0IsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQ3hELElBQUkseUJBQWUsQ0FBQztZQUNsQixTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUM7WUFDaEIsT0FBTyxFQUFFO2dCQUNQLHVCQUF1QjtnQkFDdkIsK0JBQStCO2FBQ2hDO1NBQ0YsQ0FBQyxDQUNILENBQUM7UUFDRixzQ0FBc0M7UUFDdEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSx5QkFBeUIsRUFBRTtZQUNoRSxjQUFjLEVBQUUsc0JBQXNCO1NBQ3ZDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQztJQUM1QyxDQUFDO0NBQ0Y7QUEvQkQsd0RBK0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUnVudGltZSwgQ29kZSwgRnVuY3Rpb24gfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhJztcbmltcG9ydCAqIGFzIGNyIGZyb20gJ2F3cy1jZGstbGliL2N1c3RvbS1yZXNvdXJjZXMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0IHsgU3RhY2sgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBQb2xpY3lTdGF0ZW1lbnQgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtaWFtJztcblxuZXhwb3J0IGNsYXNzIEN1c3RvbVJlc291cmNlUHJvdmlkZXIgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICBwdWJsaWMgcmVhZG9ubHkgc2VydmljZVRva2VuOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZyAsIHN0YWNrOiBTdGFjaywgc2VjcmV0TmFtZSA6IHN0cmluZykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG4gICAgY29uc3QgaGFuZGxlckRpciA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi8uLi9saWInKTtcbiAgICAvLyBEZWZpbmUgdGhlIExhbWJkYSBmdW5jdGlvblxuICAgIGNvbnN0IGdldFNlY3JldFZhbHVlRnVuY3Rpb24gPSBuZXcgRnVuY3Rpb24oc3RhY2ssICdHZXRTZWNyZXRWYWx1ZUZ1bmN0aW9uJywge1xuICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMjBfWCxcbiAgICAgIGhhbmRsZXI6ICdoYW5kbGVyL2NvbW1vbi9zZWNyZXRIYW5kbGVyLmhhbmRsZXInLFxuICAgICAgY29kZTogQ29kZS5mcm9tQXNzZXQoaGFuZGxlckRpciksXG4gICAgICBlbnZpcm9ubWVudDp7XG4gICAgICAgIFNFQ1JFVF9OQU1FOiBzZWNyZXROYW1lLFxuICAgICAgfVxuICAgIH0pO1xuICAgIGdldFNlY3JldFZhbHVlRnVuY3Rpb24uZ3JhbnRQcmluY2lwYWwuYWRkVG9QcmluY2lwYWxQb2xpY3koXG4gICAgICBuZXcgUG9saWN5U3RhdGVtZW50KHtcbiAgICAgICAgcmVzb3VyY2VzOiBbJyonXSxcbiAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgICdsYW1iZGE6SW52b2tlRnVuY3Rpb24nLFxuICAgICAgICAgICdzZWNyZXRzbWFuYWdlcjpHZXRTZWNyZXRWYWx1ZScsXG4gICAgICAgIF0sXG4gICAgICB9KSxcbiAgICApO1xuICAgIC8vIENyZWF0ZSB0aGUgY3VzdG9tIHJlc291cmNlIHByb3ZpZGVyXG4gICAgY29uc3QgcHJvdmlkZXIgPSBuZXcgY3IuUHJvdmlkZXIodGhpcywgJ1Jlc291cmNlUHJvdmlkZXJIYW5kbGVyJywge1xuICAgICAgb25FdmVudEhhbmRsZXI6IGdldFNlY3JldFZhbHVlRnVuY3Rpb24sXG4gICAgfSk7XG5cbiAgICB0aGlzLnNlcnZpY2VUb2tlbiA9IHByb3ZpZGVyLnNlcnZpY2VUb2tlbjtcbiAgfVxufVxuIl19