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
        super(scope, id);
        const handlerDir = path.resolve(__dirname, '../../../lib');
        // Define the Lambda function
        const getSecretValueFunction = new aws_lambda_1.Function(stack, 'GetSecretValueFunction', {
            runtime: aws_lambda_1.Runtime.NODEJS_20_X,
            handler: 'handler/common/secretHandler.handler',
            code: aws_lambda_1.Code.fromAsset(handlerDir),
        });
        // Create the custom resource provider
        const provider = new cr.Provider(this, 'CustomResourceProvider', {
            onEventHandler: getSecretValueFunction,
        });
        this.serviceToken = provider.serviceToken;
    }
}
exports.CustomResourceProvider = CustomResourceProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZVNlY3JldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb25zdHJ1Y3QvY29tbW9uL2N1c3RvbWVTZWNyZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdURBQWlFO0FBQ2pFLG1EQUFtRDtBQUNuRCw2QkFBNkI7QUFDN0IsMkNBQXVDO0FBR3ZDLE1BQWEsc0JBQXVCLFNBQVEsc0JBQVM7SUFHbkQsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFZO1FBQ2xELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbkIsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUMzRCw2QkFBNkI7UUFDN0IsTUFBTSxzQkFBc0IsR0FBRyxJQUFJLHFCQUFRLENBQUMsS0FBSyxFQUFFLHdCQUF3QixFQUFFO1lBQzNFLE9BQU8sRUFBRSxvQkFBTyxDQUFDLFdBQVc7WUFDNUIsT0FBTyxFQUFFLHNDQUFzQztZQUMvQyxJQUFJLEVBQUUsaUJBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO1NBQ2pDLENBQUMsQ0FBQztRQUVILHNDQUFzQztRQUN0QyxNQUFNLFFBQVEsR0FBRyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLHdCQUF3QixFQUFFO1lBQy9ELGNBQWMsRUFBRSxzQkFBc0I7U0FDdkMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDO0lBQzVDLENBQUM7Q0FDRjtBQXJCRCx3REFxQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSdW50aW1lLCBDb2RlLCBGdW5jdGlvbiB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEnO1xuaW1wb3J0ICogYXMgY3IgZnJvbSAnYXdzLWNkay1saWIvY3VzdG9tLXJlc291cmNlcyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBTdGFjayB9IGZyb20gJ2F3cy1jZGstbGliJztcblxuZXhwb3J0IGNsYXNzIEN1c3RvbVJlc291cmNlUHJvdmlkZXIgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICBwdWJsaWMgcmVhZG9ubHkgc2VydmljZVRva2VuOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZyAsc3RhY2s6IFN0YWNrKSB7XG4gICAgICBzdXBlcihzY29wZSwgaWQpO1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG4gICAgY29uc3QgaGFuZGxlckRpciA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi8uLi9saWInKTtcbiAgICAvLyBEZWZpbmUgdGhlIExhbWJkYSBmdW5jdGlvblxuICAgIGNvbnN0IGdldFNlY3JldFZhbHVlRnVuY3Rpb24gPSBuZXcgRnVuY3Rpb24oc3RhY2ssICdHZXRTZWNyZXRWYWx1ZUZ1bmN0aW9uJywge1xuICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMjBfWCxcbiAgICAgIGhhbmRsZXI6ICdoYW5kbGVyL2NvbW1vbi9zZWNyZXRIYW5kbGVyLmhhbmRsZXInLFxuICAgICAgY29kZTogQ29kZS5mcm9tQXNzZXQoaGFuZGxlckRpciksXG4gICAgfSk7XG5cbiAgICAvLyBDcmVhdGUgdGhlIGN1c3RvbSByZXNvdXJjZSBwcm92aWRlclxuICAgIGNvbnN0IHByb3ZpZGVyID0gbmV3IGNyLlByb3ZpZGVyKHRoaXMsICdDdXN0b21SZXNvdXJjZVByb3ZpZGVyJywge1xuICAgICAgb25FdmVudEhhbmRsZXI6IGdldFNlY3JldFZhbHVlRnVuY3Rpb24sXG4gICAgfSk7XG5cbiAgICB0aGlzLnNlcnZpY2VUb2tlbiA9IHByb3ZpZGVyLnNlcnZpY2VUb2tlbjtcbiAgfVxufVxuIl19