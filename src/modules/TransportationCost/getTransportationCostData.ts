import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";

const TABLE_NAME = process.env.TABLE_NAME || '';
const region = process.env.REGION;

const ddbClient = new DynamoDBClient({ region });

export class GetTransportationAddress {
  public transportId: string;
  // public suburb?: string; // Optional parameter
  // public postcode?: string; // Optional parameter

  constructor(transportId: string) {
    this.transportId = transportId;
    // this.suburb = suburb;
    // this.postcode = postcode;
  }

  public async getData(): Promise<any[]> {
    const params: QueryCommandInput = {
      TableName: TABLE_NAME,
      IndexName: "TransportationIndex", // Assuming your secondary index name
      KeyConditionExpression: "TransportationId = :transportId",
      ExpressionAttributeValues: {
        ":transportId": { S: this.transportId }, // Specifying string type for transportId
      },
    };


    try {
      const data = await ddbClient.send(new QueryCommand(params));
      return data.Items ?? []; // Return empty array if no items found
    } catch (error) {
      console.error("Error querying DynamoDB:", error);
      // Implement your specific error handling logic here
      return []; // Return empty array to avoid potential downstream errors
    }
  }
}

interface QueryCommandInput {
  TableName: string;
  IndexName?: string;
  KeyConditionExpression: string;
  ExpressionAttributeValues: { [key: string]: DynamoDBAttributeValue }; // Interface for type safety
  FilterExpression?: string;
}

interface DynamoDBAttributeValue {
  S: string; // Example: String data type
  // Add other data types as needed (e.g., N for number)
}