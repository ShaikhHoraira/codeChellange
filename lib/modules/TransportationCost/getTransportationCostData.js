"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTransportationAddress = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const TABLE_NAME = process.env.TABLE_NAME || '';
const region = process.env.REGION;
const ddbClient = new client_dynamodb_1.DynamoDBClient({ region });
class GetTransportationAddress {
    // public suburb?: string; // Optional parameter
    // public postcode?: string; // Optional parameter
    constructor(transportId) {
        this.transportId = transportId;
        // this.suburb = suburb;
        // this.postcode = postcode;
    }
    async getData() {
        const params = {
            TableName: TABLE_NAME,
            IndexName: "TransportationIndex",
            KeyConditionExpression: "TransportationId = :transportId",
            ExpressionAttributeValues: {
                ":transportId": { S: this.transportId }, // Specifying string type for transportId
            },
        };
        try {
            const data = await ddbClient.send(new client_dynamodb_1.QueryCommand(params));
            return data.Items ?? []; // Return empty array if no items found
        }
        catch (error) {
            console.error("Error querying DynamoDB:", error);
            // Implement your specific error handling logic here
            return []; // Return empty array to avoid potential downstream errors
        }
    }
}
exports.GetTransportationAddress = GetTransportationAddress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VHJhbnNwb3J0YXRpb25Db3N0RGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL1RyYW5zcG9ydGF0aW9uQ29zdC9nZXRUcmFuc3BvcnRhdGlvbkNvc3REYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhEQUF3RTtBQUV4RSxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7QUFDaEQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFFbEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxnQ0FBYyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUVqRCxNQUFhLHdCQUF3QjtJQUVuQyxnREFBZ0Q7SUFDaEQsa0RBQWtEO0lBRWxELFlBQVksV0FBbUI7UUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0Isd0JBQXdCO1FBQ3hCLDRCQUE0QjtJQUM5QixDQUFDO0lBRU0sS0FBSyxDQUFDLE9BQU87UUFDbEIsTUFBTSxNQUFNLEdBQXNCO1lBQ2hDLFNBQVMsRUFBRSxVQUFVO1lBQ3JCLFNBQVMsRUFBRSxxQkFBcUI7WUFDaEMsc0JBQXNCLEVBQUUsaUNBQWlDO1lBQ3pELHlCQUF5QixFQUFFO2dCQUN6QixjQUFjLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLHlDQUF5QzthQUNuRjtTQUNGLENBQUM7UUFHRixJQUFJO1lBQ0YsTUFBTSxJQUFJLEdBQUcsTUFBTSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksOEJBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzVELE9BQU8sSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQyx1Q0FBdUM7U0FDakU7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsMEJBQTBCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDakQsb0RBQW9EO1lBQ3BELE9BQU8sRUFBRSxDQUFDLENBQUMsMERBQTBEO1NBQ3RFO0lBQ0gsQ0FBQztDQUNGO0FBL0JELDREQStCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IER5bmFtb0RCQ2xpZW50LCBRdWVyeUNvbW1hbmQgfSBmcm9tIFwiQGF3cy1zZGsvY2xpZW50LWR5bmFtb2RiXCI7XG5cbmNvbnN0IFRBQkxFX05BTUUgPSBwcm9jZXNzLmVudi5UQUJMRV9OQU1FIHx8ICcnO1xuY29uc3QgcmVnaW9uID0gcHJvY2Vzcy5lbnYuUkVHSU9OO1xuXG5jb25zdCBkZGJDbGllbnQgPSBuZXcgRHluYW1vREJDbGllbnQoeyByZWdpb24gfSk7XG5cbmV4cG9ydCBjbGFzcyBHZXRUcmFuc3BvcnRhdGlvbkFkZHJlc3Mge1xuICBwdWJsaWMgdHJhbnNwb3J0SWQ6IHN0cmluZztcbiAgLy8gcHVibGljIHN1YnVyYj86IHN0cmluZzsgLy8gT3B0aW9uYWwgcGFyYW1ldGVyXG4gIC8vIHB1YmxpYyBwb3N0Y29kZT86IHN0cmluZzsgLy8gT3B0aW9uYWwgcGFyYW1ldGVyXG5cbiAgY29uc3RydWN0b3IodHJhbnNwb3J0SWQ6IHN0cmluZykge1xuICAgIHRoaXMudHJhbnNwb3J0SWQgPSB0cmFuc3BvcnRJZDtcbiAgICAvLyB0aGlzLnN1YnVyYiA9IHN1YnVyYjtcbiAgICAvLyB0aGlzLnBvc3Rjb2RlID0gcG9zdGNvZGU7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0RGF0YSgpOiBQcm9taXNlPGFueVtdPiB7XG4gICAgY29uc3QgcGFyYW1zOiBRdWVyeUNvbW1hbmRJbnB1dCA9IHtcbiAgICAgIFRhYmxlTmFtZTogVEFCTEVfTkFNRSxcbiAgICAgIEluZGV4TmFtZTogXCJUcmFuc3BvcnRhdGlvbkluZGV4XCIsIC8vIEFzc3VtaW5nIHlvdXIgc2Vjb25kYXJ5IGluZGV4IG5hbWVcbiAgICAgIEtleUNvbmRpdGlvbkV4cHJlc3Npb246IFwiVHJhbnNwb3J0YXRpb25JZCA9IDp0cmFuc3BvcnRJZFwiLFxuICAgICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xuICAgICAgICBcIjp0cmFuc3BvcnRJZFwiOiB7IFM6IHRoaXMudHJhbnNwb3J0SWQgfSwgLy8gU3BlY2lmeWluZyBzdHJpbmcgdHlwZSBmb3IgdHJhbnNwb3J0SWRcbiAgICAgIH0sXG4gICAgfTtcblxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBkZGJDbGllbnQuc2VuZChuZXcgUXVlcnlDb21tYW5kKHBhcmFtcykpO1xuICAgICAgcmV0dXJuIGRhdGEuSXRlbXMgPz8gW107IC8vIFJldHVybiBlbXB0eSBhcnJheSBpZiBubyBpdGVtcyBmb3VuZFxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcXVlcnlpbmcgRHluYW1vREI6XCIsIGVycm9yKTtcbiAgICAgIC8vIEltcGxlbWVudCB5b3VyIHNwZWNpZmljIGVycm9yIGhhbmRsaW5nIGxvZ2ljIGhlcmVcbiAgICAgIHJldHVybiBbXTsgLy8gUmV0dXJuIGVtcHR5IGFycmF5IHRvIGF2b2lkIHBvdGVudGlhbCBkb3duc3RyZWFtIGVycm9yc1xuICAgIH1cbiAgfVxufVxuXG5pbnRlcmZhY2UgUXVlcnlDb21tYW5kSW5wdXQge1xuICBUYWJsZU5hbWU6IHN0cmluZztcbiAgSW5kZXhOYW1lPzogc3RyaW5nO1xuICBLZXlDb25kaXRpb25FeHByZXNzaW9uOiBzdHJpbmc7XG4gIEV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXM6IHsgW2tleTogc3RyaW5nXTogRHluYW1vREJBdHRyaWJ1dGVWYWx1ZSB9OyAvLyBJbnRlcmZhY2UgZm9yIHR5cGUgc2FmZXR5XG4gIEZpbHRlckV4cHJlc3Npb24/OiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBEeW5hbW9EQkF0dHJpYnV0ZVZhbHVlIHtcbiAgUzogc3RyaW5nOyAvLyBFeGFtcGxlOiBTdHJpbmcgZGF0YSB0eXBlXG4gIC8vIEFkZCBvdGhlciBkYXRhIHR5cGVzIGFzIG5lZWRlZCAoZS5nLiwgTiBmb3IgbnVtYmVyKVxufVxuIl19