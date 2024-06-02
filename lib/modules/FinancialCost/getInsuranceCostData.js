"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInsuranceCostData = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const TABLE_NAME = process.env.TABLE_NAME || '';
const region = process.env.REGION;
const ddbClient = new client_dynamodb_1.DynamoDBClient({ region });
class GetInsuranceCostData {
    // public suburb?: string; // Optional parameter
    // public postcode?: string; // Optional parameter
    constructor(insuranceId) {
        this.insuranceId = insuranceId;
        // this.suburb = suburb;
        // this.postcode = postcode;
    }
    async getRentData() {
        const params = {
            TableName: TABLE_NAME,
            IndexName: "FinanceInsuranceIndex",
            KeyConditionExpression: "insuranceId = :insuranceId",
            ExpressionAttributeValues: {
                ":insuranceId": { S: this.insuranceId }, // Specifying string type for userId
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
exports.GetInsuranceCostData = GetInsuranceCostData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SW5zdXJhbmNlQ29zdERhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9GaW5hbmNpYWxDb3N0L2dldEluc3VyYW5jZUNvc3REYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhEQUF3RTtBQUV4RSxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7QUFDaEQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFFbEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxnQ0FBYyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUVqRCxNQUFhLG9CQUFvQjtJQUUvQixnREFBZ0Q7SUFDaEQsa0RBQWtEO0lBRWxELFlBQVksV0FBbUI7UUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0Isd0JBQXdCO1FBQ3hCLDRCQUE0QjtJQUM5QixDQUFDO0lBRU0sS0FBSyxDQUFDLFdBQVc7UUFDdEIsTUFBTSxNQUFNLEdBQXNCO1lBQ2hDLFNBQVMsRUFBRSxVQUFVO1lBQ3JCLFNBQVMsRUFBRSx1QkFBdUI7WUFDbEMsc0JBQXNCLEVBQUUsNEJBQTRCO1lBQ3BELHlCQUF5QixFQUFFO2dCQUN6QixjQUFjLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLG9DQUFvQzthQUM5RTtTQUNGLENBQUM7UUFHRixJQUFJO1lBQ0YsTUFBTSxJQUFJLEdBQUcsTUFBTSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksOEJBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzVELE9BQU8sSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQyx1Q0FBdUM7U0FDakU7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsMEJBQTBCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDakQsb0RBQW9EO1lBQ3BELE9BQU8sRUFBRSxDQUFDLENBQUMsMERBQTBEO1NBQ3RFO0lBQ0gsQ0FBQztDQUNGO0FBL0JELG9EQStCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IER5bmFtb0RCQ2xpZW50LCBRdWVyeUNvbW1hbmQgfSBmcm9tIFwiQGF3cy1zZGsvY2xpZW50LWR5bmFtb2RiXCI7XG5cbmNvbnN0IFRBQkxFX05BTUUgPSBwcm9jZXNzLmVudi5UQUJMRV9OQU1FIHx8ICcnO1xuY29uc3QgcmVnaW9uID0gcHJvY2Vzcy5lbnYuUkVHSU9OO1xuXG5jb25zdCBkZGJDbGllbnQgPSBuZXcgRHluYW1vREJDbGllbnQoeyByZWdpb24gfSk7XG5cbmV4cG9ydCBjbGFzcyBHZXRJbnN1cmFuY2VDb3N0RGF0YSB7XG4gIHB1YmxpYyBpbnN1cmFuY2VJZDogc3RyaW5nO1xuICAvLyBwdWJsaWMgc3VidXJiPzogc3RyaW5nOyAvLyBPcHRpb25hbCBwYXJhbWV0ZXJcbiAgLy8gcHVibGljIHBvc3Rjb2RlPzogc3RyaW5nOyAvLyBPcHRpb25hbCBwYXJhbWV0ZXJcblxuICBjb25zdHJ1Y3RvcihpbnN1cmFuY2VJZDogc3RyaW5nKSB7XG4gICAgdGhpcy5pbnN1cmFuY2VJZCA9IGluc3VyYW5jZUlkO1xuICAgIC8vIHRoaXMuc3VidXJiID0gc3VidXJiO1xuICAgIC8vIHRoaXMucG9zdGNvZGUgPSBwb3N0Y29kZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRSZW50RGF0YSgpOiBQcm9taXNlPGFueVtdPiB7XG4gICAgY29uc3QgcGFyYW1zOiBRdWVyeUNvbW1hbmRJbnB1dCA9IHtcbiAgICAgIFRhYmxlTmFtZTogVEFCTEVfTkFNRSxcbiAgICAgIEluZGV4TmFtZTogXCJGaW5hbmNlSW5zdXJhbmNlSW5kZXhcIiwgLy8gQXNzdW1pbmcgeW91ciBzZWNvbmRhcnkgaW5kZXggbmFtZVxuICAgICAgS2V5Q29uZGl0aW9uRXhwcmVzc2lvbjogXCJpbnN1cmFuY2VJZCA9IDppbnN1cmFuY2VJZFwiLFxuICAgICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xuICAgICAgICBcIjppbnN1cmFuY2VJZFwiOiB7IFM6IHRoaXMuaW5zdXJhbmNlSWQgfSwgLy8gU3BlY2lmeWluZyBzdHJpbmcgdHlwZSBmb3IgdXNlcklkXG4gICAgICB9LFxuICAgIH07XG5cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgZGRiQ2xpZW50LnNlbmQobmV3IFF1ZXJ5Q29tbWFuZChwYXJhbXMpKTtcbiAgICAgIHJldHVybiBkYXRhLkl0ZW1zID8/IFtdOyAvLyBSZXR1cm4gZW1wdHkgYXJyYXkgaWYgbm8gaXRlbXMgZm91bmRcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHF1ZXJ5aW5nIER5bmFtb0RCOlwiLCBlcnJvcik7XG4gICAgICAvLyBJbXBsZW1lbnQgeW91ciBzcGVjaWZpYyBlcnJvciBoYW5kbGluZyBsb2dpYyBoZXJlXG4gICAgICByZXR1cm4gW107IC8vIFJldHVybiBlbXB0eSBhcnJheSB0byBhdm9pZCBwb3RlbnRpYWwgZG93bnN0cmVhbSBlcnJvcnNcbiAgICB9XG4gIH1cbn1cblxuaW50ZXJmYWNlIFF1ZXJ5Q29tbWFuZElucHV0IHtcbiAgVGFibGVOYW1lOiBzdHJpbmc7XG4gIEluZGV4TmFtZT86IHN0cmluZztcbiAgS2V5Q29uZGl0aW9uRXhwcmVzc2lvbjogc3RyaW5nO1xuICBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzOiB7IFtrZXk6IHN0cmluZ106IER5bmFtb0RCQXR0cmlidXRlVmFsdWUgfTsgLy8gSW50ZXJmYWNlIGZvciB0eXBlIHNhZmV0eVxuICBGaWx0ZXJFeHByZXNzaW9uPzogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgRHluYW1vREJBdHRyaWJ1dGVWYWx1ZSB7XG4gIFM6IHN0cmluZzsgLy8gRXhhbXBsZTogU3RyaW5nIGRhdGEgdHlwZVxuICAvLyBBZGQgb3RoZXIgZGF0YSB0eXBlcyBhcyBuZWVkZWQgKGUuZy4sIE4gZm9yIG51bWJlcilcbn1cbiJdfQ==