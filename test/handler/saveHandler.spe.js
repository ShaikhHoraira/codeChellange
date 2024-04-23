"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
//import { Stack } from 'aws-cdk-lib';
const AWS = require("aws-sdk");
const aws_sdk_client_mock_1 = require("aws-sdk-client-mock");
const AWSMock = require("aws-sdk-mock");
const saveData_1 = require("../../handler/saveData");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuc3BlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2F2ZUhhbmRsZXIuc3BlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0RBQStEO0FBQy9ELHNDQUFzQztBQUN0QywrQkFBOEI7QUFDOUIsNkRBQWlEO0FBQ2pELHdDQUF5QztBQUN6QyxxREFBNkQ7QUFDN0QsTUFBTSxPQUFPLEdBQUcsSUFBQSxnQ0FBVSxFQUFDLHFDQUFzQixDQUFDLENBQUM7QUFDbkQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztBQUV2QyxNQUFNLG1CQUFtQixHQUFHLElBQUksOEJBQW1CLENBQUMsRUFBRSxDQUFDLENBQUE7QUFDdkQsUUFBUSxDQUFDLGtCQUFrQixFQUFFLEdBQUcsRUFBRTtJQUM5QixVQUFVLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDcEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsdUNBQXVDO1FBQzVELE9BQU8sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsT0FBTyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDMUQsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2xCLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLEdBQUcsRUFBRTtRQUNaLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNwQixDQUFDLENBQUMsQ0FBQztJQUNQLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxLQUFLLElBQUksRUFBRTtRQUN4QyxNQUFNLE1BQU0sR0FBRyxNQUFNLG1CQUFtQixDQUFDLFFBQVEsRUFDaEQsQ0FBQztRQUNGLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IER5bmFtb0RCRG9jdW1lbnRDbGllbnQgfSBmcm9tICdAYXdzLXNkay9saWItZHluYW1vZGInO1xuLy9pbXBvcnQgeyBTdGFjayB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCAqIGFzIEFXUyBmcm9tIFwiYXdzLXNka1wiXG5pbXBvcnQgeyBtb2NrQ2xpZW50IH0gZnJvbSAnYXdzLXNkay1jbGllbnQtbW9jayc7XG5pbXBvcnQgICogYXMgQVdTTW9jayBmcm9tICdhd3Mtc2RrLW1vY2snO1xuaW1wb3J0IHsgU2F2ZUN1c3RvbWVyQWRkcmVzcyB9IGZyb20gJy4uLy4uL2hhbmRsZXIvc2F2ZURhdGEnO1xuY29uc3QgZGRiTW9jayA9IG1vY2tDbGllbnQoRHluYW1vREJEb2N1bWVudENsaWVudCk7XG5BV1MuY29uZmlnLnVwZGF0ZSh7IHJlZ2lvbjogJ2xvY2FsJyB9KTtcblxuY29uc3Qgc2F2ZUN1c3RvbWVyQWRkcmVzcyA9IG5ldyBTYXZlQ3VzdG9tZXJBZGRyZXNzKCcnKVxuZGVzY3JpYmUoJ1R1IERiIGlucHV0IGNhc2UnLCAoKSA9PiB7XG4gICAgYmVmb3JlRWFjaChhc3luYyAoKSA9PiB7XG4gICAgICBqZXN0LnJlc2V0TW9kdWxlcygpOyAvLyBNb3N0IGltcG9ydGFudCAtIGl0IGNsZWFycyB0aGUgY2FjaGVcbiAgICAgIEFXU01vY2suc2V0U0RLSW5zdGFuY2UoQVdTKTtcbiAgICAgIEFXU01vY2subW9jaygnRHluYW1vREIuRG9jdW1lbnRDbGllbnQnLCAncHV0JywgJ3N1Y2Nlc3MnKTtcbiAgICAgIGRkYk1vY2sucmVzZXQoKTtcbiAgICB9KTtcbiAgXG4gICAgYWZ0ZXJBbGwoKCkgPT4ge1xuICAgICAgQVdTTW9jay5yZXN0b3JlKCk7XG4gICAgfSk7XG5pdCgnU2hvdWxkIHJldHVybiAyMDAgcmVzcG9uc2UnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgc2F2ZUN1c3RvbWVyQWRkcmVzcy5zYXZlRGF0YShcbiAgICApO1xuICAgIGV4cGVjdChyZXN1bHQpLnRvTWF0Y2goJ3N1Y2Nlc3MnKTtcbiAgfSk7XG4gXG59KTsiXX0=