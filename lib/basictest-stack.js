"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasictestStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
// import { RestApiConstruct } from './construct/rest-api-construct';
// import { OperatingcostConstruct } from './construct/rest-api-operatingcost';
// import { ProductionCostConstruct } from './construct/rest-api-productioncost';
// import { InfrastructureCostConstruct } from './construct/rest-api-infrastructurecost'
class BasictestStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        //new RestApiConstruct(this, 'rest-api-construct', this);
        // new OperatingcostConstruct(this, 'rest-api-operationcost', this);
        // new ProductionCostConstruct(this, 'rest-api-productioncost', this);
        // new InfrastructureCostConstruct(this, 'rest-api-infrastructureCost', this);
    }
}
exports.BasictestStack = BasictestStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWN0ZXN0LXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Jhc2ljdGVzdC1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw2Q0FBbUM7QUFDbkMscUVBQXFFO0FBQ3JFLCtFQUErRTtBQUMvRSxpRkFBaUY7QUFDakYsd0ZBQXdGO0FBRXhGLE1BQWEsY0FBZSxTQUFRLG1CQUFLO0lBQ3ZDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBVztRQUNuRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4Qix5REFBeUQ7UUFDekQsb0VBQW9FO1FBQ3BFLHNFQUFzRTtRQUN0RSw4RUFBOEU7SUFDaEYsQ0FBQztDQUNGO0FBVEQsd0NBU0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCB7IFN0YWNrfSBmcm9tICdhd3MtY2RrLWxpYic7XG4vLyBpbXBvcnQgeyBSZXN0QXBpQ29uc3RydWN0IH0gZnJvbSAnLi9jb25zdHJ1Y3QvcmVzdC1hcGktY29uc3RydWN0Jztcbi8vIGltcG9ydCB7IE9wZXJhdGluZ2Nvc3RDb25zdHJ1Y3QgfSBmcm9tICcuL2NvbnN0cnVjdC9yZXN0LWFwaS1vcGVyYXRpbmdjb3N0Jztcbi8vIGltcG9ydCB7IFByb2R1Y3Rpb25Db3N0Q29uc3RydWN0IH0gZnJvbSAnLi9jb25zdHJ1Y3QvcmVzdC1hcGktcHJvZHVjdGlvbmNvc3QnO1xuLy8gaW1wb3J0IHsgSW5mcmFzdHJ1Y3R1cmVDb3N0Q29uc3RydWN0IH0gZnJvbSAnLi9jb25zdHJ1Y3QvcmVzdC1hcGktaW5mcmFzdHJ1Y3R1cmVjb3N0J1xuXG5leHBvcnQgY2xhc3MgQmFzaWN0ZXN0U3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogYW55KSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG4gICAgXG4gICAgLy9uZXcgUmVzdEFwaUNvbnN0cnVjdCh0aGlzLCAncmVzdC1hcGktY29uc3RydWN0JywgdGhpcyk7XG4gICAgLy8gbmV3IE9wZXJhdGluZ2Nvc3RDb25zdHJ1Y3QodGhpcywgJ3Jlc3QtYXBpLW9wZXJhdGlvbmNvc3QnLCB0aGlzKTtcbiAgICAvLyBuZXcgUHJvZHVjdGlvbkNvc3RDb25zdHJ1Y3QodGhpcywgJ3Jlc3QtYXBpLXByb2R1Y3Rpb25jb3N0JywgdGhpcyk7XG4gICAgLy8gbmV3IEluZnJhc3RydWN0dXJlQ29zdENvbnN0cnVjdCh0aGlzLCAncmVzdC1hcGktaW5mcmFzdHJ1Y3R1cmVDb3N0JywgdGhpcyk7XG4gIH1cbn1cbiJdfQ==