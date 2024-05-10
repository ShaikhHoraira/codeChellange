import { Construct } from 'constructs';
import { Stack} from 'aws-cdk-lib';
//import { RestApiConstruct } from '../construct/rest-api-construct';

export class BasictestStack extends Stack {
  constructor(scope: Construct, id: string, props?: any) {
    super(scope, id, props);
    
    //const restApiConstruct = new RestApiConstruct(this, 'rest-api-construct', this);
    console.log('restApiConstruct');
  }
}
