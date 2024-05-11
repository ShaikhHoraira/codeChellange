"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasictestStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
// import { RestApiConstruct } from './construct/rest-api-construct';
class BasictestStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // const restApiConstruct = new RestApiConstruct(this, 'rest-api-construct', this);
        console.log("🚀 ~ BasictestStack ~ constructor ~ restApiConstruct:");
        // console.log(restApiConstruct);
    }
}
exports.BasictestStack = BasictestStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWN0ZXN0LXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Jhc2ljdGVzdC1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw2Q0FBbUM7QUFDbkMscUVBQXFFO0FBRXJFLE1BQWEsY0FBZSxTQUFRLG1CQUFLO0lBQ3ZDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBVztRQUNuRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixtRkFBbUY7UUFDbkYsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1REFBdUQsQ0FBQyxDQUFBO1FBQ3BFLGlDQUFpQztJQUNuQyxDQUFDO0NBQ0Y7QUFSRCx3Q0FRQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0IHsgU3RhY2t9IGZyb20gJ2F3cy1jZGstbGliJztcbi8vIGltcG9ydCB7IFJlc3RBcGlDb25zdHJ1Y3QgfSBmcm9tICcuL2NvbnN0cnVjdC9yZXN0LWFwaS1jb25zdHJ1Y3QnO1xuXG5leHBvcnQgY2xhc3MgQmFzaWN0ZXN0U3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogYW55KSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG4gICAgXG4gICAgLy8gY29uc3QgcmVzdEFwaUNvbnN0cnVjdCA9IG5ldyBSZXN0QXBpQ29uc3RydWN0KHRoaXMsICdyZXN0LWFwaS1jb25zdHJ1Y3QnLCB0aGlzKTtcbiAgICBjb25zb2xlLmxvZyhcIvCfmoAgfiBCYXNpY3Rlc3RTdGFjayB+IGNvbnN0cnVjdG9yIH4gcmVzdEFwaUNvbnN0cnVjdDpcIilcbiAgICAvLyBjb25zb2xlLmxvZyhyZXN0QXBpQ29uc3RydWN0KTtcbiAgfVxufVxuIl19