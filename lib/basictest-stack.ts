import { Construct } from 'constructs';
//import {Stack} from 'aws-cdk-lib';
import { RestApiConstruct } from '../construct/rest-api-construct';

export class BasictestStack extends Construct {
  constructor(scope: Construct, id: string,) {
    super(scope, id);
    //const stackName = Stack.of(this).stackName;
    const restApiConstruct = new RestApiConstruct(this, 'rest-api-construct');
    console.log(restApiConstruct);
    

  };
}
