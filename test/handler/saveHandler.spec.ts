import { SaveCustomerAddress } from '../../src/modules/saveData';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

// Mock DynamoDBClient and PutItemCommand
jest.mock('@aws-sdk/client-dynamodb', () => ({
  DynamoDBClient: jest.fn(() => ({
    send: jest.fn(),
  })),
  PutItemCommand: jest.fn(),
}));

describe('SaveCustomerAddress', () => {
  let saveCustomerAddress: SaveCustomerAddress;
  let mockDynamoDBClient: any;

  beforeEach(() => {
    mockDynamoDBClient = new DynamoDBClient({ region: 'dummy-region' });
    saveCustomerAddress = new SaveCustomerAddress({
      body: JSON.stringify({
        userId: 'user123',
        customerName: 'John Doe',
        appartmentNo: '123',
        address: '123 Main St',
        suburb: 'Anytown',
        postCode: '12345',
        state: 'State',
        country: 'Country',
      }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle errors', async () => {
    // Mock DynamoDBClient send method to throw an error
    mockDynamoDBClient.send = jest.fn().mockRejectedValueOnce(new Error('Test Error'));

    // Set the ddbClient in SaveCustomerAddress to the mock client
    saveCustomerAddress['ddbClient'] = mockDynamoDBClient;

    // Call the saveData method
    const result = await saveCustomerAddress.saveData();

    // Ensure that the method returns false
    expect(result).toBeFalsy();
    expect(mockDynamoDBClient.send).toHaveBeenCalledTimes(1);
  });
});
