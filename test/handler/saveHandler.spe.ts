import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
//import { Stack } from 'aws-cdk-lib';
import * as AWS from "aws-sdk"
import { mockClient } from 'aws-sdk-client-mock';
import  * as AWSMock from 'aws-sdk-mock';
import { SaveCustomerAddress } from '../../src/handler/saveData';
const ddbMock = mockClient(DynamoDBDocumentClient);
AWS.config.update({ region: 'local' });

const saveCustomerAddress = new SaveCustomerAddress('')
describe('Tu Db input case', () => {
    beforeEach(async () => {
      jest.resetModules(); // Most important - it clears the cache
      AWSMock.setSDKInstance(AWS);
      AWSMock.mock('DynamoDB.DocumentClient', 'put', 'success');
      ddbMock.reset();
    });
  
    afterAll(() => {
      AWSMock.restore();
    });
it('Should return 200 response', async () => {
    const result = await saveCustomerAddress.saveData(
    );
    expect(result).toMatch('success');
  });
 
});