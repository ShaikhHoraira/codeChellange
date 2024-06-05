import { Construct } from 'constructs';
import { Stack} from 'aws-cdk-lib';
import { RestApiConstruct } from './construct/rest-api-construct';
import { OperatingCostConstruct } from './construct/rest-api-operatingcost';
import { ProductionCostConstruct } from './construct/rest-api-productioncost';
import { InfrastructureCostConstruct } from './construct/rest-api-infrastructurecost'
import { FinancialCostConstruct } from './construct/rest-api-financialcost';
import { LogisticCostConstruct } from './construct/rest-api-logisticscost';
import { MarketingandSalesCost } from './construct/rest-api-marketingandsalescost';

export class BasictestStack extends Stack {
  constructor(scope: Construct, id: string, props?: any) {
    super(scope, id, props);
    
    new RestApiConstruct(this, 'rest-api-construct', this);
    new OperatingCostConstruct(this, 'rest-api-operationcost', this);
    new ProductionCostConstruct(this, 'rest-api-productioncost', this);
    new InfrastructureCostConstruct(this, 'rest-api-infrastructureCost', this);
    new FinancialCostConstruct(this, 'rest-api-financialCostConstruct', this);
    new LogisticCostConstruct(this, 'rest-api-logisticCostConstruct', this);
    new MarketingandSalesCost(this, 'rest-api-logisticCostConstruct', this);
  }
}
