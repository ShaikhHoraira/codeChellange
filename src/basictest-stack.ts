import { Construct } from 'constructs';
import { Stack} from 'aws-cdk-lib';
import { RestApiConstruct } from './construct/rest-api-construct';
//import { Operatingcost } from './construct/rest-api-operatingcost';
import { ProductionCostcost } from './construct/rest-api-productioncost';

export class BasictestStack extends Stack {
  constructor(scope: Construct, id: string, props?: any) {
    super(scope, id, props);
    
    new RestApiConstruct(this, 'rest-api-construct', this);
    //new Operatingcost(this, 'rest-api-operationcost', this);
    new ProductionCostcost(this, 'rest-api-productioncost', this);

  }
}
