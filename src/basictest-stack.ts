import { Construct } from 'constructs';
import { Stack} from 'aws-cdk-lib';
import { RestApiConstruct } from './construct/rest-api-construct';
import { Operatingcost } from './construct/rest-api-operatingcost';

export class BasictestStack extends Stack {
  constructor(scope: Construct, id: string, props?: any) {
    super(scope, id, props);
    
    new RestApiConstruct(this, 'rest-api-construct', this);
    new Operatingcost(this, 'rest-api-operationcost', this);

  }
}
