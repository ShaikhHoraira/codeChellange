import { Construct } from 'constructs';
import { Stack} from 'aws-cdk-lib';
//import { RestApiConstruct } from './construct/rest-api-construct';
import { OperatingcostConstruct } from './construct/rest-api-operatingcost';
import { ProductionCostConstruct } from './construct/rest-api-productioncost';
import { InfrastructureCostConstruct } from './construct/rest-api-infrastructurecost'

export class BasictestStack extends Stack {
  constructor(scope: Construct, id: string, props?: any) {
    super(scope, id, props);
    
    //new RestApiConstruct(this, 'rest-api-construct', this);
    new OperatingcostConstruct(this, 'rest-api-operationcost', this);
    new ProductionCostConstruct(this, 'rest-api-productioncost', this);
    new InfrastructureCostConstruct(this, 'rest-api-infrastructureCost', this);
  }
}
