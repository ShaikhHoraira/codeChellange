// import { handler } from '../../src/handler/InfrastructureCost/saveRentIdHandler';
// import { SaveInfrastructureCostData } from '../../src/modules//InfrastructureCost/saveInfrastructureCostData';

// jest.mock('../../modules/InfrastructureCost/saveInfrastructureCostData');

// describe('handler', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should return 200 and success message for valid POST request', async () => {
//     (SaveInfrastructureCostData as jest.Mock).mockImplementation(() => {
//       return {
//         saveRentData: jest.fn().mockResolvedValue('mocked response')
//       };
//     });

//     const event = { httpMethod: 'POST', body: '{}' };

//     const response = await handler(event);

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toBe(JSON.stringify('Success'));
//   });

//   it('should return 200 for non-POST request', async () => {
//     const event = { httpMethod: 'GET' };

//     const response = await handler(event);

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toBe(JSON.stringify('Success'));
//   });

//   it('should return 500 and error message when exception is thrown', async () => {
//     (SaveInfrastructureCostData as jest.Mock).mockImplementation(() => {
//       return {
//         saveRentData: jest.fn().mockRejectedValue(new Error('mocked error'))
//       };
//     });

//     const event = { httpMethod: 'POST', body: '{}' };

//     const response = await handler(event);

//     expect(response.statusCode).toBe(500);
//     expect(response.body).toBe('Invalid Request Body');
//   });
// });
