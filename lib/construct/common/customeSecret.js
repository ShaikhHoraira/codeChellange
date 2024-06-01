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
        const provider = new cr.Provider(this, 'ResourceProviderHandler', {
            onEventHandler: getSecretValueFunction,
        });
        this.serviceToken = provider.serviceToken;
    }
}
exports.CustomResourceProvider = CustomResourceProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZVNlY3JldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb25zdHJ1Y3QvY29tbW9uL2N1c3RvbWVTZWNyZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdURBQWlFO0FBQ2pFLG1EQUFtRDtBQUNuRCw2QkFBNkI7QUFDN0IsMkNBQXVDO0FBRXZDLGlEQUFzRDtBQUV0RCxNQUFhLHNCQUF1QixTQUFRLHNCQUFTO0lBR25ELFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUcsS0FBWSxFQUFFLFVBQW1CO1FBQzFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDM0QsNkJBQTZCO1FBQzdCLE1BQU0sc0JBQXNCLEdBQUcsSUFBSSxxQkFBUSxDQUFDLEtBQUssRUFBRSx3QkFBd0IsRUFBRTtZQUMzRSxPQUFPLEVBQUUsb0JBQU8sQ0FBQyxXQUFXO1lBQzVCLE9BQU8sRUFBRSxzQ0FBc0M7WUFDL0MsSUFBSSxFQUFFLGlCQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztZQUNoQyxXQUFXLEVBQUM7Z0JBQ1YsV0FBVyxFQUFFLFVBQVU7YUFDeEI7U0FDRixDQUFDLENBQUM7UUFDSCxzQkFBc0IsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQ3hELElBQUkseUJBQWUsQ0FBQztZQUNsQixTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUM7WUFDaEIsT0FBTyxFQUFFO2dCQUNQLHVCQUF1QjtnQkFDdkIsK0JBQStCO2FBQ2hDO1NBQ0YsQ0FBQyxDQUNILENBQUM7UUFDRixNQUFNLFFBQVEsR0FBRyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLHlCQUF5QixFQUFFO1lBQ2hFLGNBQWMsRUFBRSxzQkFBc0I7U0FDdkMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDO0lBQzVDLENBQUM7Q0FDRjtBQTlCRCx3REE4QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSdW50aW1lLCBDb2RlLCBGdW5jdGlvbiB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEnO1xuaW1wb3J0ICogYXMgY3IgZnJvbSAnYXdzLWNkay1saWIvY3VzdG9tLXJlc291cmNlcyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBTdGFjayB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IFBvbGljeVN0YXRlbWVudCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1pYW0nO1xuXG5leHBvcnQgY2xhc3MgQ3VzdG9tUmVzb3VyY2VQcm92aWRlciBleHRlbmRzIENvbnN0cnVjdCB7XG4gIHB1YmxpYyByZWFkb25seSBzZXJ2aWNlVG9rZW46IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nICwgc3RhY2s6IFN0YWNrLCBzZWNyZXROYW1lIDogc3RyaW5nKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcbiAgICBjb25zdCBoYW5kbGVyRGlyID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uLy4uL2xpYicpO1xuICAgIC8vIERlZmluZSB0aGUgTGFtYmRhIGZ1bmN0aW9uXG4gICAgY29uc3QgZ2V0U2VjcmV0VmFsdWVGdW5jdGlvbiA9IG5ldyBGdW5jdGlvbihzdGFjaywgJ0dldFNlY3JldFZhbHVlRnVuY3Rpb24nLCB7XG4gICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18yMF9YLFxuICAgICAgaGFuZGxlcjogJ2hhbmRsZXIvY29tbW9uL3NlY3JldEhhbmRsZXIuaGFuZGxlcicsXG4gICAgICBjb2RlOiBDb2RlLmZyb21Bc3NldChoYW5kbGVyRGlyKSxcbiAgICAgIGVudmlyb25tZW50OntcbiAgICAgICAgU0VDUkVUX05BTUU6IHNlY3JldE5hbWUsXG4gICAgICB9XG4gICAgfSk7XG4gICAgZ2V0U2VjcmV0VmFsdWVGdW5jdGlvbi5ncmFudFByaW5jaXBhbC5hZGRUb1ByaW5jaXBhbFBvbGljeShcbiAgICAgIG5ldyBQb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICByZXNvdXJjZXM6IFsnKiddLFxuICAgICAgICBhY3Rpb25zOiBbXG4gICAgICAgICAgJ2xhbWJkYTpJbnZva2VGdW5jdGlvbicsXG4gICAgICAgICAgJ3NlY3JldHNtYW5hZ2VyOkdldFNlY3JldFZhbHVlJyxcbiAgICAgICAgXSxcbiAgICAgIH0pLFxuICAgICk7XG4gICAgY29uc3QgcHJvdmlkZXIgPSBuZXcgY3IuUHJvdmlkZXIodGhpcywgJ1Jlc291cmNlUHJvdmlkZXJIYW5kbGVyJywge1xuICAgICAgb25FdmVudEhhbmRsZXI6IGdldFNlY3JldFZhbHVlRnVuY3Rpb24sXG4gICAgfSk7XG5cbiAgICB0aGlzLnNlcnZpY2VUb2tlbiA9IHByb3ZpZGVyLnNlcnZpY2VUb2tlbjtcbiAgfVxufVxuIl19