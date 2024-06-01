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
        const getSecretValueFunction = new aws_lambda_1.Function(stack, `${secretName}`, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZVNlY3JldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb25zdHJ1Y3QvY29tbW9uL2N1c3RvbWVTZWNyZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdURBQWlFO0FBQ2pFLG1EQUFtRDtBQUNuRCw2QkFBNkI7QUFDN0IsMkNBQXVDO0FBRXZDLGlEQUFzRDtBQUV0RCxNQUFhLHNCQUF1QixTQUFRLHNCQUFTO0lBR25ELFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUcsS0FBWSxFQUFFLFVBQW1CO1FBQzFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDM0QsNkJBQTZCO1FBQzdCLE1BQU0sc0JBQXNCLEdBQUcsSUFBSSxxQkFBUSxDQUFDLEtBQUssRUFBRSxHQUFHLFVBQVUsRUFBRSxFQUFFO1lBQ2xFLE9BQU8sRUFBRSxvQkFBTyxDQUFDLFdBQVc7WUFDNUIsT0FBTyxFQUFFLHNDQUFzQztZQUMvQyxJQUFJLEVBQUUsaUJBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO1lBQ2hDLFdBQVcsRUFBQztnQkFDVixXQUFXLEVBQUUsVUFBVTthQUN4QjtTQUNGLENBQUMsQ0FBQztRQUNILHNCQUFzQixDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FDeEQsSUFBSSx5QkFBZSxDQUFDO1lBQ2xCLFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQztZQUNoQixPQUFPLEVBQUU7Z0JBQ1AsdUJBQXVCO2dCQUN2QiwrQkFBK0I7YUFDaEM7U0FDRixDQUFDLENBQ0gsQ0FBQztRQUNGLE1BQU0sUUFBUSxHQUFHLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUseUJBQXlCLEVBQUU7WUFDaEUsY0FBYyxFQUFFLHNCQUFzQjtTQUN2QyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUM7SUFDNUMsQ0FBQztDQUNGO0FBOUJELHdEQThCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJ1bnRpbWUsIENvZGUsIEZ1bmN0aW9uIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYSc7XG5pbXBvcnQgKiBhcyBjciBmcm9tICdhd3MtY2RrLWxpYi9jdXN0b20tcmVzb3VyY2VzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCB7IFN0YWNrIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgUG9saWN5U3RhdGVtZW50IH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XG5cbmV4cG9ydCBjbGFzcyBDdXN0b21SZXNvdXJjZVByb3ZpZGVyIGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgcHVibGljIHJlYWRvbmx5IHNlcnZpY2VUb2tlbjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcgLCBzdGFjazogU3RhY2ssIHNlY3JldE5hbWUgOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuICAgIGNvbnN0IGhhbmRsZXJEaXIgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vLi4vbGliJyk7XG4gICAgLy8gRGVmaW5lIHRoZSBMYW1iZGEgZnVuY3Rpb25cbiAgICBjb25zdCBnZXRTZWNyZXRWYWx1ZUZ1bmN0aW9uID0gbmV3IEZ1bmN0aW9uKHN0YWNrLCBgJHtzZWNyZXROYW1lfWAsIHtcbiAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzIwX1gsXG4gICAgICBoYW5kbGVyOiAnaGFuZGxlci9jb21tb24vc2VjcmV0SGFuZGxlci5oYW5kbGVyJyxcbiAgICAgIGNvZGU6IENvZGUuZnJvbUFzc2V0KGhhbmRsZXJEaXIpLFxuICAgICAgZW52aXJvbm1lbnQ6e1xuICAgICAgICBTRUNSRVRfTkFNRTogc2VjcmV0TmFtZSxcbiAgICAgIH1cbiAgICB9KTtcbiAgICBnZXRTZWNyZXRWYWx1ZUZ1bmN0aW9uLmdyYW50UHJpbmNpcGFsLmFkZFRvUHJpbmNpcGFsUG9saWN5KFxuICAgICAgbmV3IFBvbGljeVN0YXRlbWVudCh7XG4gICAgICAgIHJlc291cmNlczogWycqJ10sXG4gICAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgICAnbGFtYmRhOkludm9rZUZ1bmN0aW9uJyxcbiAgICAgICAgICAnc2VjcmV0c21hbmFnZXI6R2V0U2VjcmV0VmFsdWUnLFxuICAgICAgICBdLFxuICAgICAgfSksXG4gICAgKTtcbiAgICBjb25zdCBwcm92aWRlciA9IG5ldyBjci5Qcm92aWRlcih0aGlzLCAnUmVzb3VyY2VQcm92aWRlckhhbmRsZXInLCB7XG4gICAgICBvbkV2ZW50SGFuZGxlcjogZ2V0U2VjcmV0VmFsdWVGdW5jdGlvbixcbiAgICB9KTtcblxuICAgIHRoaXMuc2VydmljZVRva2VuID0gcHJvdmlkZXIuc2VydmljZVRva2VuO1xuICB9XG59XG4iXX0=