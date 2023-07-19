# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

## Before deployment and preparing your machine
- Install Node.js.
- Install AWS CLI.
- Install AWS CDK.
Configure AWS credentials. You can do this through IAM by creating a credential with a key and password. To configure credentials, run the command 'aws configure' and provide the key and password.
## Deploying to AWS
After cloning the project from GitHub, please run the following command:
Configure your machine with the command 'cdk config'.
Run 'npm run build && cdk synth && cdk bootstrap aws://ACCOUNT_NUMBER/REGION && cdk deploy'.
This command will build, synthesize, and deploy the application to AWS.
Please change the ACCOUNT_NUMBER and REGION to match your AWS account details.
## Testing
Once the project is deployed to AWS, you can save a customer's address in the database by sending a POST request to the following endpoint of your REST API:

POST: https://YOUR_REST_API/userAddress (use the API endpoint from API Gateway)
Payload:
{
  "userId": "4",
  "customerName": "Sam",
  "appartmentNo": "503",
  "address": "7 Thomas Holmes Street",
  "suburb": "Maribyrnong",
  "postCode": "3032",
  "state": "VIC",
  "country": "Australia"
}
To retrieve a customer's address, send a GET request to the following endpoint of your REST API:

GET: https://YOUR_REST_API/userAddress?userId=4 (use the API endpoint from API Gateway)
It will return the address specific to the given userId.
Please note that you need to replace "YOUR_REST_API" with the actual endpoint provided by API Gateway.