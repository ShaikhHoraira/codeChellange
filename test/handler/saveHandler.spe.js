"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
//import { Stack } from 'aws-cdk-lib';
const AWS = require("aws-sdk");
const aws_sdk_client_mock_1 = require("aws-sdk-client-mock");
const AWSMock = require("aws-sdk-mock");
const saveData_1 = require("../../src/handler/saveData");
const ddbMock = (0, aws_sdk_client_mock_1.mockClient)(lib_dynamodb_1.DynamoDBDocumentClient);
AWS.config.update({ region: 'local' });
const saveCustomerAddress = new saveData_1.SaveCustomerAddress('');
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
        const result = await saveCustomerAddress.saveData();
        expect(result).toMatch('success');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuc3BlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2F2ZUhhbmRsZXIuc3BlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0RBQStEO0FBQy9ELHNDQUFzQztBQUN0QywrQkFBOEI7QUFDOUIsNkRBQWlEO0FBQ2pELHdDQUF5QztBQUN6Qyx5REFBaUU7QUFDakUsTUFBTSxPQUFPLEdBQUcsSUFBQSxnQ0FBVSxFQUFDLHFDQUFzQixDQUFDLENBQUM7QUFDbkQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztBQUV2QyxNQUFNLG1CQUFtQixHQUFHLElBQUksOEJBQW1CLENBQUMsRUFBRSxDQUFDLENBQUE7QUFDdkQsUUFBUSxDQUFDLGtCQUFrQixFQUFFLEdBQUcsRUFBRTtJQUM5QixVQUFVLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDcEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsdUNBQXVDO1FBQzVELE9BQU8sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsT0FBTyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDMUQsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2xCLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLEdBQUcsRUFBRTtRQUNaLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNwQixDQUFDLENBQUMsQ0FBQztJQUNQLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxLQUFLLElBQUksRUFBRTtRQUN4QyxNQUFNLE1BQU0sR0FBRyxNQUFNLG1CQUFtQixDQUFDLFFBQVEsRUFDaEQsQ0FBQztRQUNGLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IER5bmFtb0RCRG9jdW1lbnRDbGllbnQgfSBmcm9tICdAYXdzLXNkay9saWItZHluYW1vZGInO1xuLy9pbXBvcnQgeyBTdGFjayB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCAqIGFzIEFXUyBmcm9tIFwiYXdzLXNka1wiXG5pbXBvcnQgeyBtb2NrQ2xpZW50IH0gZnJvbSAnYXdzLXNkay1jbGllbnQtbW9jayc7XG5pbXBvcnQgICogYXMgQVdTTW9jayBmcm9tICdhd3Mtc2RrLW1vY2snO1xuaW1wb3J0IHsgU2F2ZUN1c3RvbWVyQWRkcmVzcyB9IGZyb20gJy4uLy4uL3NyYy9oYW5kbGVyL3NhdmVEYXRhJztcbmNvbnN0IGRkYk1vY2sgPSBtb2NrQ2xpZW50KER5bmFtb0RCRG9jdW1lbnRDbGllbnQpO1xuQVdTLmNvbmZpZy51cGRhdGUoeyByZWdpb246ICdsb2NhbCcgfSk7XG5cbmNvbnN0IHNhdmVDdXN0b21lckFkZHJlc3MgPSBuZXcgU2F2ZUN1c3RvbWVyQWRkcmVzcygnJylcbmRlc2NyaWJlKCdUdSBEYiBpbnB1dCBjYXNlJywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goYXN5bmMgKCkgPT4ge1xuICAgICAgamVzdC5yZXNldE1vZHVsZXMoKTsgLy8gTW9zdCBpbXBvcnRhbnQgLSBpdCBjbGVhcnMgdGhlIGNhY2hlXG4gICAgICBBV1NNb2NrLnNldFNES0luc3RhbmNlKEFXUyk7XG4gICAgICBBV1NNb2NrLm1vY2soJ0R5bmFtb0RCLkRvY3VtZW50Q2xpZW50JywgJ3B1dCcsICdzdWNjZXNzJyk7XG4gICAgICBkZGJNb2NrLnJlc2V0KCk7XG4gICAgfSk7XG4gIFxuICAgIGFmdGVyQWxsKCgpID0+IHtcbiAgICAgIEFXU01vY2sucmVzdG9yZSgpO1xuICAgIH0pO1xuaXQoJ1Nob3VsZCByZXR1cm4gMjAwIHJlc3BvbnNlJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHNhdmVDdXN0b21lckFkZHJlc3Muc2F2ZURhdGEoXG4gICAgKTtcbiAgICBleHBlY3QocmVzdWx0KS50b01hdGNoKCdzdWNjZXNzJyk7XG4gIH0pO1xuIFxufSk7Il19