#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { BasictestStack } from './basictest-stack';

const app = new App();
new BasictestStack(app, 'BasictestStack');