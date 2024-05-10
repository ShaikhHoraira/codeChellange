import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import { RestApiConstruct } from '../construct/rest-api-construct';


export class BasictestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const restApiConstruct = new RestApiConstruct(this, 'rest-api-construct');
    console.log(restApiConstruct);
    

  };
}
