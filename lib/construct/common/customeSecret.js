"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomResourceProvider = void 0;
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const cr = require("aws-cdk-lib/custom-resources");
const path = require("path");
const constructs_1 = require("constructs");
class CustomResourceProvider extends constructs_1.Construct {
    constructor(scope, id, stack) {
        super(scope, id);
        const handlerDir = path.resolve(__dirname, '../../../lib');
        // Define the Lambda function
        const getSecretValueFunction = new aws_lambda_1.Function(stack, 'GetSecretValueFunction', {
            runtime: aws_lambda_1.Runtime.NODEJS_20_X,
            handler: 'handler/common/secretHandler.handler',
            code: aws_lambda_1.Code.fromAsset(handlerDir),
        });
        // Create the custom resource provider
        const provider = new cr.Provider(this, 'ResourceProviderHandler', {
            onEventHandler: getSecretValueFunction,
        });
        this.serviceToken = provider.serviceToken;
    }
}
exports.CustomResourceProvider = CustomResourceProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZVNlY3JldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb25zdHJ1Y3QvY29tbW9uL2N1c3RvbWVTZWNyZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdURBQWlFO0FBQ2pFLG1EQUFtRDtBQUNuRCw2QkFBNkI7QUFDN0IsMkNBQXVDO0FBR3ZDLE1BQWEsc0JBQXVCLFNBQVEsc0JBQVM7SUFHbkQsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRyxLQUFZO1FBQ3JELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDM0QsNkJBQTZCO1FBQzdCLE1BQU0sc0JBQXNCLEdBQUcsSUFBSSxxQkFBUSxDQUFDLEtBQUssRUFBRSx3QkFBd0IsRUFBRTtZQUMzRSxPQUFPLEVBQUUsb0JBQU8sQ0FBQyxXQUFXO1lBQzVCLE9BQU8sRUFBRSxzQ0FBc0M7WUFDL0MsSUFBSSxFQUFFLGlCQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztTQUNqQyxDQUFDLENBQUM7UUFFSCxzQ0FBc0M7UUFDdEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSx5QkFBeUIsRUFBRTtZQUNoRSxjQUFjLEVBQUUsc0JBQXNCO1NBQ3ZDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQztJQUM1QyxDQUFDO0NBQ0Y7QUFwQkQsd0RBb0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUnVudGltZSwgQ29kZSwgRnVuY3Rpb24gfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhJztcbmltcG9ydCAqIGFzIGNyIGZyb20gJ2F3cy1jZGstbGliL2N1c3RvbS1yZXNvdXJjZXMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0IHsgU3RhY2sgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5cbmV4cG9ydCBjbGFzcyBDdXN0b21SZXNvdXJjZVByb3ZpZGVyIGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgcHVibGljIHJlYWRvbmx5IHNlcnZpY2VUb2tlbjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcgLCBzdGFjazogU3RhY2spIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuICAgIGNvbnN0IGhhbmRsZXJEaXIgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vLi4vbGliJyk7XG4gICAgLy8gRGVmaW5lIHRoZSBMYW1iZGEgZnVuY3Rpb25cbiAgICBjb25zdCBnZXRTZWNyZXRWYWx1ZUZ1bmN0aW9uID0gbmV3IEZ1bmN0aW9uKHN0YWNrLCAnR2V0U2VjcmV0VmFsdWVGdW5jdGlvbicsIHtcbiAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzIwX1gsXG4gICAgICBoYW5kbGVyOiAnaGFuZGxlci9jb21tb24vc2VjcmV0SGFuZGxlci5oYW5kbGVyJyxcbiAgICAgIGNvZGU6IENvZGUuZnJvbUFzc2V0KGhhbmRsZXJEaXIpLFxuICAgIH0pO1xuXG4gICAgLy8gQ3JlYXRlIHRoZSBjdXN0b20gcmVzb3VyY2UgcHJvdmlkZXJcbiAgICBjb25zdCBwcm92aWRlciA9IG5ldyBjci5Qcm92aWRlcih0aGlzLCAnUmVzb3VyY2VQcm92aWRlckhhbmRsZXInLCB7XG4gICAgICBvbkV2ZW50SGFuZGxlcjogZ2V0U2VjcmV0VmFsdWVGdW5jdGlvbixcbiAgICB9KTtcblxuICAgIHRoaXMuc2VydmljZVRva2VuID0gcHJvdmlkZXIuc2VydmljZVRva2VuO1xuICB9XG59XG4iXX0=