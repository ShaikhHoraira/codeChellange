import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const tableName = process.env.TABLE_NAME || "";
const region = process.env.REGION;

const ddbClient = new DynamoDBClient({ region });

export class SaveCustomerAddress {
  public payload: any;

  constructor(payload: any) {
    this.payload = payload;
  }

  public async saveData(): Promise<boolean> {
    try {
      const bodyParams = JSON.parse(this.payload.body);

      const params: PutItemCommandInput = {
        TableName: tableName,
        Item: {
          EmployeeId: { S: bodyParams.employeeId },  // Specifying string type for UserId
          CustomerName: { S: bodyParams.customerName },
          AppartmentNo: { S: bodyParams.appartmentNo },
          Address: { S: bodyParams.address },
          Suburb: { S: bodyParams.suburb },
          PostCode: { S: bodyParams.postCode },
          State: { S: bodyParams.state },
          Country: { S: bodyParams.country },
        },
      };

      await ddbClient.send(new PutItemCommand(params));
      return true;
    } catch (error) {
      console.error("Error saving data to DynamoDB:", error);
      // Implement your specific error handling logic here
      return false; // Indicate failure
    }
  }
}

interface PutItemCommandInput {
  TableName: string;
  Item: { [key: string]: DynamoDBAttributeValue }; // Interface for type safety
}

interface DynamoDBAttributeValue {
  S: string; // Example: String data type
  // Add other data types as needed (e.g., N for number)
}
