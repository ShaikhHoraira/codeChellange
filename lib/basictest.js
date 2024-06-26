#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const basictest_stack_1 = require("./basictest-stack");
const app = new aws_cdk_lib_1.App();
new basictest_stack_1.BasictestStack(app, 'BasictestStack');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWN0ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Jhc2ljdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1Q0FBcUM7QUFDckMsNkNBQWtDO0FBQ2xDLHVEQUFtRDtBQUVuRCxNQUFNLEdBQUcsR0FBRyxJQUFJLGlCQUFHLEVBQUUsQ0FBQztBQUN0QixJQUFJLGdDQUFjLENBQUMsR0FBRyxFQUFFLGdCQUFnQixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5pbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3Rlcic7XG5pbXBvcnQgeyBBcHAgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBCYXNpY3Rlc3RTdGFjayB9IGZyb20gJy4vYmFzaWN0ZXN0LXN0YWNrJztcblxuY29uc3QgYXBwID0gbmV3IEFwcCgpO1xubmV3IEJhc2ljdGVzdFN0YWNrKGFwcCwgJ0Jhc2ljdGVzdFN0YWNrJyk7Il19