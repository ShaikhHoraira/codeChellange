import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Function, Runtime, Code } from "aws-cdk-lib/aws-lambda";
import { RestApi, LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import * as cdk from 'aws-cdk-lib';

export class BasictestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const saveAddress = new Table(this, "Address", {
      partitionKey: { name: "postcode", type: AttributeType.STRING },
    });


    const getAllTodosLambda = new Function(this, "GetAllTodosLambdaHandler", {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset('handler'),
      handler: 'save_retrive_address.TuHandler',
      environment: {
        TODO_TABLE_NAME: saveAddress.tableName,
      },
    });

    saveAddress.grantReadWriteData(getAllTodosLambda);

    const api = new RestApi(this, "todo-api");
    api.root
      .resourceForPath("userAddress")
      .addMethod("GET", new LambdaIntegration(getAllTodosLambda));

    api.root
    .resourceForPath("userAddress")
    .addMethod("POST", new LambdaIntegration(getAllTodosLambda));

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