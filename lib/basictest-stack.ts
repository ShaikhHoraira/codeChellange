import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Function, Runtime, Code } from "aws-cdk-lib/aws-lambda";
import { RestApi, LambdaIntegration, ApiKeySourceType } from "aws-cdk-lib/aws-apigateway";
import * as cdk from 'aws-cdk-lib';

export class BasictestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const saveAddress = new Table(this, "Address", {
      partitionKey: { name: "postcode", type: AttributeType.STRING },
    });


    const getUserdataLambda = new Function(this, "GetAllTodosLambdaHandler", {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset('handler'),
      handler: 'getHandler.handler',
      environment: {
        TODO_TABLE_NAME: saveAddress.tableName,
      },
    });

     const saveUserdataLambda = new Function(this, "PutTodoLambdaHandler", {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset("handler"),
      handler: "saveHandler.handler",
      environment: {
        TODO_TABLE_NAME: saveAddress.tableName,
      },
    });

    saveAddress.grantReadWriteData(getUserdataLambda);
    saveAddress.grantReadWriteData(saveUserdataLambda);

    const api = new RestApi(this, "Tu_testApi");

    const userAddressApi = api.root.resourceForPath('userAddress');

    userAddressApi.addMethod('GET', new LambdaIntegration(getUserdataLambda));
    userAddressApi.addMethod('POST', new LambdaIntegration(saveUserdataLambda))
    
    // const _apiKey = api.addApiKey('ApiKey',{
    //   apiKeyName: 'tuApiKey',
    //   value: 'thisIsJustSampleAPi',
    // })

    new CfnOutput(this, "API URL", {
      value: api.url ?? "Something went wrong"
    });

  }
}



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