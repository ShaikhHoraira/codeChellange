import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

import {
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
} from '@aws-sdk/lib-dynamodb';


export class ManageGetData {
      /**
   * Return the device information given the deviceToken
   * @param deviceToken
   */
  public async getDeviceByDeviceToken(deviceToken: string): Promise<any> {
    const client = DynamoDBDocumentClient.from(new DynamoDBClient({ region: process.env.AWS_REGION }));

    const params: GetCommandInput = {
      TableName: process.env.DbTableName!,
      Key: { DeviceToken: deviceToken },
    };

    try {
      const result = await client.send(new GetCommand(params));
      if (result.Item) {
        return result.Item;
      } else {
        return {};
      }
    } catch (err: any) {
      throw err;
    }
  }
}