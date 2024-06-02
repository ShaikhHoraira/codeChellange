import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const tableName = process.env.TABLE_NAME || "";
const region = process.env.REGION;

export class SaveInsuranceCostData {
  private ddbClient: DynamoDBClient;
  public payload: any;

  constructor(payload: any) {
    console.log("🚀 ~ SaveInsuranceCostData ~ constructor ~ payload:", payload)
    this.ddbClient = new DynamoDBClient({ region });
    this.payload = payload;
  }


  public async saveRentData(): Promise<any> {
    try {
      const bodyParams = JSON.parse(this.payload.body);
      const params: PutItemCommandInput = {
        TableName: tableName,
        Item: {
          InsuranceId: { S: bodyParams.insuranceId },  // Specifying string type for UserId
          CustomerName: { S: bodyParams.customerName },
          AppartmentNo: { S: bodyParams.appartmentNo },
          Address: { S: bodyParams.address },
          Suburb: { S: bodyParams.suburb },
          PostCode: { S: bodyParams.postCode },
          State: { S: bodyParams.state },
          Country: { S: bodyParams.country },
        },
      };

      const result = await this.ddbClient.send(new PutItemCommand(params)); // Use this.ddbClient here
      return result;
    } catch (error) {
      console.error("Error saving data to DynamoDB:", error);
      return false;
    }
  }
}

interface PutItemCommandInput {
  TableName: string;
  Item: { [key: string]: DynamoDBAttributeValue };
}

interface DynamoDBAttributeValue {
  S: string;
}
