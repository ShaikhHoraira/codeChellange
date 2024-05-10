import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";

const TABLE_NAME = process.env.TABLE_NAME || '';
const region = process.env.REGION;

const ddbClient = new DynamoDBClient({ region });

export class GetCustomerAddress {
  public userId: string;
  public suburb?: string; // Optional parameter
  public postcode?: string; // Optional parameter

  constructor(userId: string, suburb?: string, postcode?: string) {
    this.userId = userId;
    this.suburb = suburb;
    this.postcode = postcode;
  }

  public async getData(): Promise<any[]> {
    const params: QueryCommandInput = {
      TableName: TABLE_NAME,
      IndexName: "UserIdIndex", // Assuming your secondary index name
      KeyConditionExpression: "UserId = :userId",
      ExpressionAttributeValues: {
        ":userId": { S: this.userId }, // Specifying string type for userId
      },
    };

    // Add filter expression for suburb if provided
    if (this.suburb) {
      params.FilterExpression = "Suburb = :suburb";
      params.ExpressionAttributeValues[":suburb"] = { S: this.suburb };
    }

    // Add filter expression for postcode if provided (append AND if suburb filter exists)
    if (this.postcode) {
      if (params.FilterExpression) {
        params.FilterExpression += " AND PostCode = :postcode";
      } else {
        params.FilterExpression = "PostCode = :postcode";
      }
      params.ExpressionAttributeValues[":postcode"] = { S: this.postcode };
    }

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
