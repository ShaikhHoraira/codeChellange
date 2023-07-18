import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

import {
  DynamoDBDocumentClient,
  PutCommand,
  PutCommandInput,
} from '@aws-sdk/lib-dynamodb';


export class ManageSaveData {

  public tableName: string;
  constructor(tableName: string = '') {
    this.tableName = tableName;
  }

    public async saveDevice(DeviceToken: string, Key: string, ForgeId?: string): Promise<boolean> {
      const client = DynamoDBDocumentClient.from(new DynamoDBClient({ region: process.env.AWS_REGION }));
      const params: PutCommandInput = {
        TableName: this.tableName!,
        Item: {
          DeviceToken: DeviceToken,
          Key: Key,
          ForgeId: ForgeId || 'anonymous',
        },
      };
  
      try {
        const result = await client.send(new PutCommand(params));
        if (result.$metadata && result.$metadata.httpStatusCode && result.$metadata.httpStatusCode == 200) {
          return true;
        } else {
          return false;
        }
      } catch (err: any) {
        throw err;
      }
    }
}