"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasictestStack = void 0;
const constructs_1 = require("constructs");
//import {Stack} from 'aws-cdk-lib';
const rest_api_construct_1 = require("../construct/rest-api-construct");
class BasictestStack extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        //const stackName = Stack.of(this).stackName;
        const restApiConstruct = new rest_api_construct_1.RestApiConstruct(this, 'rest-api-construct');
        console.log(restApiConstruct);
    }
    ;
}
exports.BasictestStack = BasictestStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWN0ZXN0LXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFzaWN0ZXN0LXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUF1QztBQUN2QyxvQ0FBb0M7QUFDcEMsd0VBQW1FO0FBRW5FLE1BQWEsY0FBZSxTQUFRLHNCQUFTO0lBQzNDLFlBQVksS0FBZ0IsRUFBRSxFQUFVO1FBQ3RDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakIsNkNBQTZDO1FBQzdDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxxQ0FBZ0IsQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUMxRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFHaEMsQ0FBQztJQUFBLENBQUM7Q0FDSDtBQVRELHdDQVNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG4vL2ltcG9ydCB7U3RhY2t9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IFJlc3RBcGlDb25zdHJ1Y3QgfSBmcm9tICcuLi9jb25zdHJ1Y3QvcmVzdC1hcGktY29uc3RydWN0JztcblxuZXhwb3J0IGNsYXNzIEJhc2ljdGVzdFN0YWNrIGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywpIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuICAgIC8vY29uc3Qgc3RhY2tOYW1lID0gU3RhY2sub2YodGhpcykuc3RhY2tOYW1lO1xuICAgIGNvbnN0IHJlc3RBcGlDb25zdHJ1Y3QgPSBuZXcgUmVzdEFwaUNvbnN0cnVjdCh0aGlzLCAncmVzdC1hcGktY29uc3RydWN0Jyk7XG4gICAgY29uc29sZS5sb2cocmVzdEFwaUNvbnN0cnVjdCk7XG4gICAgXG5cbiAgfTtcbn1cbiJdfQ==