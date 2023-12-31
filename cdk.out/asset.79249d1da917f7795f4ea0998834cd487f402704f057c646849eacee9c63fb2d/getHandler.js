"use strict";
// import * as AWS from 'aws-sdk';
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const AWS = require("aws-sdk");
const tableName = process.env.TODO_TABLE_NAME;
const documentClient = new AWS.DynamoDB.DocumentClient({
    region: process.env.region,
});
const handler = async (event, _context) => {
    console.info(event);
    const queryParams = event.queryStringParameters;
    const suburb = queryParams.Suburb;
    const postCode = queryParams.PostCode;
    let params = {
        TableName: tableName,
    };
    if (suburb || postCode) {
        let FilterExpression = '';
        let ExpressionAttributeValues = {};
        ;
        if (suburb) {
            FilterExpression += '#suburb = :suburb';
            ExpressionAttributeValues[':suburb'] = suburb;
        }
        if (postCode) {
            if (FilterExpression) {
                FilterExpression += ' OR ';
            }
            FilterExpression += '#postCode = :postCode';
            ExpressionAttributeValues[':postCode'] = postCode;
        }
        params = {
            ...params,
            FilterExpression,
            ExpressionAttributeNames: {
                '#suburb': 'Suburb',
                '#postCode': 'PostCode',
            },
            ExpressionAttributeValues,
        };
    }
    try {
        const data = await documentClient.scan(params).promise();
        const items = data.Items;
        const response = {
            statusCode: 200,
            body: JSON.stringify(items),
        };
        console.info(`body: ${response.body}`);
        return response;
    }
    catch (e) {
        return {
            statusCode: 500,
            body: e === 500 ? 'Invalid Request Parameters' : 'Something went wrong',
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGtDQUFrQzs7O0FBeURsQywrQkFBK0I7QUFHL0IsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7QUFDOUMsTUFBTSxjQUFjLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQztJQUNyRCxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNO0NBQzNCLENBQUMsQ0FBQztBQUVJLE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFVLEVBQUUsUUFBYyxFQUFFLEVBQUU7SUFDbkUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVwQixNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMscUJBQXFCLENBQUM7SUFDaEQsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztJQUNsQyxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDO0lBRXRDLElBQUksTUFBTSxHQUEwQztRQUNsRCxTQUFTLEVBQUUsU0FBVTtLQUN0QixDQUFDO0lBRUYsSUFBSSxNQUFNLElBQUksUUFBUSxFQUFFO1FBQ3RCLElBQUksZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1FBQzFCLElBQUkseUJBQXlCLEdBQTJCLEVBQUUsQ0FBQztRQUFBLENBQUM7UUFFNUQsSUFBSSxNQUFNLEVBQUU7WUFDVixnQkFBZ0IsSUFBSSxtQkFBbUIsQ0FBQztZQUN4Qyx5QkFBeUIsQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLENBQUM7U0FDL0M7UUFFRCxJQUFJLFFBQVEsRUFBRTtZQUNaLElBQUksZ0JBQWdCLEVBQUU7Z0JBQ3BCLGdCQUFnQixJQUFJLE1BQU0sQ0FBQzthQUM1QjtZQUNELGdCQUFnQixJQUFJLHVCQUF1QixDQUFDO1lBQzVDLHlCQUF5QixDQUFDLFdBQVcsQ0FBQyxHQUFHLFFBQVEsQ0FBQztTQUNuRDtRQUVELE1BQU0sR0FBRztZQUNQLEdBQUcsTUFBTTtZQUNULGdCQUFnQjtZQUNoQix3QkFBd0IsRUFBRTtnQkFDeEIsU0FBUyxFQUFFLFFBQVE7Z0JBQ25CLFdBQVcsRUFBRSxVQUFVO2FBQ3hCO1lBQ0QseUJBQXlCO1NBQzFCLENBQUM7S0FDSDtJQUVELElBQUk7UUFDRixNQUFNLElBQUksR0FBRyxNQUFNLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDekQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN6QixNQUFNLFFBQVEsR0FBRztZQUNmLFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1NBQzVCLENBQUM7UUFDRixPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDdkMsT0FBTyxRQUFRLENBQUM7S0FDakI7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU87WUFDTCxVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUMsc0JBQXNCO1NBQ3hFLENBQUM7S0FDSDtBQUNILENBQUMsQ0FBQztBQXREVyxRQUFBLE9BQU8sV0FzRGxCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0ICogYXMgQVdTIGZyb20gJ2F3cy1zZGsnO1xuXG4vLyBjb25zdCB0YWJsZU5hbWUgPSBwcm9jZXNzLmVudi5UT0RPX1RBQkxFX05BTUU7XG4vLyBjb25zdCBkb2N1bWVudENsaWVudCA9IG5ldyBBV1MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQoe1xuLy8gICByZWdpb246IHByb2Nlc3MuZW52LnJlZ2lvbixcbi8vIH0pO1xuXG4vLyBleHBvcnQgY29uc3QgaGFuZGxlciA9IGFzeW5jIChldmVudCA6IGFueSwgX2NvbnRleHQ6IGFueSkgPT4ge1xuLy8gICBjb25zb2xlLmluZm8oZXZlbnQpO1xuXG4vLyAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzO1xuLy8gICBjb25zdCBzdWJ1cmIgPSBxdWVyeVBhcmFtcy5zdWJ1cmI7XG4vLyAgIGNvbnN0IHBvc3Rjb2RlID0gcXVlcnlQYXJhbXMucG9zdGNvZGU7XG5cbi8vICAgY29uc3QgcGFyYW1zOiBBV1MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQuU2NhbklucHV0ID0ge1xuLy8gICAgIFRhYmxlTmFtZTogdGFibGVOYW1lISxcbi8vICAgfTtcblxuLy8gICBpZiAoc3VidXJiKSB7XG4vLyAgICAgcGFyYW1zLkZpbHRlckV4cHJlc3Npb24gPSAnI3N1YnVyYiA9IDpzdWJ1cmInO1xuLy8gICAgIHBhcmFtcy5FeHByZXNzaW9uQXR0cmlidXRlTmFtZXMgPSB7XG4vLyAgICAgICAnI3N1YnVyYic6ICdTdWJ1cmInLFxuLy8gICAgIH07XG4vLyAgICAgcGFyYW1zLkV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXMgPSB7XG4vLyAgICAgICAnOnN1YnVyYic6IHN1YnVyYixcbi8vICAgICB9O1xuLy8gICB9XG5cbi8vICAgaWYgKHBvc3Rjb2RlKSB7XG4vLyAgICAgcGFyYW1zLkZpbHRlckV4cHJlc3Npb24gPSAnI3Bvc3RDb2RlID0gOnBvc3RDb2RlJztcbi8vICAgICBwYXJhbXMuRXhwcmVzc2lvbkF0dHJpYnV0ZU5hbWVzID0ge1xuLy8gICAgICAgJyNwb3N0Q29kZSc6ICdQb3N0Q29kZScsXG4vLyAgICAgfTtcbi8vICAgICBwYXJhbXMuRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlcyA9IHtcbi8vICAgICAgICc6cG9zdENvZGUnOiBwb3N0Y29kZSxcbi8vICAgICB9O1xuLy8gICB9XG5cbi8vICAgdHJ5IHtcbi8vICAgICBjb25zdCBkYXRhID0gYXdhaXQgZG9jdW1lbnRDbGllbnQuc2NhbihwYXJhbXMpLnByb21pc2UoKTtcbi8vICAgICBjb25zdCBpdGVtcyA9IGRhdGEuSXRlbXM7XG4vLyAgICAgY29uc3QgcmVzcG9uc2UgPSB7XG4vLyAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4vLyAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtcyksXG4vLyAgICAgfTtcbi8vICAgICBjb25zb2xlLmluZm8oYGJvZHk6ICR7cmVzcG9uc2UuYm9keX1gKTtcbi8vICAgICByZXR1cm4gcmVzcG9uc2U7XG4vLyAgIH0gY2F0Y2ggKGUpIHtcbi8vICAgICByZXR1cm4ge1xuLy8gICAgICAgc3RhdHVzQ29kZTogNTAwLFxuLy8gICAgICAgYm9keTogZSA9PT0gNTAwID8gJ0ludmFsaWQgUmVxdWVzdCBQYXJhbWV0ZXJzJyA6ICdTb21ldGhpbmcgd2VudCB3cm9uZycsXG4vLyAgICAgfTtcbi8vICAgfVxuLy8gfTtcblxuXG5pbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcbmltcG9ydCAqIGFzIEFXUyBmcm9tICdhd3Mtc2RrJztcblxuXG5jb25zdCB0YWJsZU5hbWUgPSBwcm9jZXNzLmVudi5UT0RPX1RBQkxFX05BTUU7XG5jb25zdCBkb2N1bWVudENsaWVudCA9IG5ldyBBV1MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQoe1xuICByZWdpb246IHByb2Nlc3MuZW52LnJlZ2lvbixcbn0pO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudDogYW55LCBfY29udGV4dCA6IGFueSkgPT4ge1xuICBjb25zb2xlLmluZm8oZXZlbnQpO1xuXG4gIGNvbnN0IHF1ZXJ5UGFyYW1zID0gZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzO1xuICBjb25zdCBzdWJ1cmIgPSBxdWVyeVBhcmFtcy5TdWJ1cmI7XG4gIGNvbnN0IHBvc3RDb2RlID0gcXVlcnlQYXJhbXMuUG9zdENvZGU7XG5cbiAgbGV0IHBhcmFtczogQVdTLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50LlNjYW5JbnB1dCA9IHtcbiAgICBUYWJsZU5hbWU6IHRhYmxlTmFtZSEsXG4gIH07XG5cbiAgaWYgKHN1YnVyYiB8fCBwb3N0Q29kZSkge1xuICAgIGxldCBGaWx0ZXJFeHByZXNzaW9uID0gJyc7XG4gICAgbGV0IEV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fTs7XG5cbiAgICBpZiAoc3VidXJiKSB7XG4gICAgICBGaWx0ZXJFeHByZXNzaW9uICs9ICcjc3VidXJiID0gOnN1YnVyYic7XG4gICAgICBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzWyc6c3VidXJiJ10gPSBzdWJ1cmI7XG4gICAgfVxuXG4gICAgaWYgKHBvc3RDb2RlKSB7XG4gICAgICBpZiAoRmlsdGVyRXhwcmVzc2lvbikge1xuICAgICAgICBGaWx0ZXJFeHByZXNzaW9uICs9ICcgT1IgJztcbiAgICAgIH1cbiAgICAgIEZpbHRlckV4cHJlc3Npb24gKz0gJyNwb3N0Q29kZSA9IDpwb3N0Q29kZSc7XG4gICAgICBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzWyc6cG9zdENvZGUnXSA9IHBvc3RDb2RlO1xuICAgIH1cblxuICAgIHBhcmFtcyA9IHtcbiAgICAgIC4uLnBhcmFtcyxcbiAgICAgIEZpbHRlckV4cHJlc3Npb24sXG4gICAgICBFeHByZXNzaW9uQXR0cmlidXRlTmFtZXM6IHtcbiAgICAgICAgJyNzdWJ1cmInOiAnU3VidXJiJyxcbiAgICAgICAgJyNwb3N0Q29kZSc6ICdQb3N0Q29kZScsXG4gICAgICB9LFxuICAgICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlcyxcbiAgICB9O1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgZG9jdW1lbnRDbGllbnQuc2NhbihwYXJhbXMpLnByb21pc2UoKTtcbiAgICBjb25zdCBpdGVtcyA9IGRhdGEuSXRlbXM7XG4gICAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtcyksXG4gICAgfTtcbiAgICBjb25zb2xlLmluZm8oYGJvZHk6ICR7cmVzcG9uc2UuYm9keX1gKTtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzQ29kZTogNTAwLFxuICAgICAgYm9keTogZSA9PT0gNTAwID8gJ0ludmFsaWQgUmVxdWVzdCBQYXJhbWV0ZXJzJyA6ICdTb21ldGhpbmcgd2VudCB3cm9uZycsXG4gICAgfTtcbiAgfVxufTtcbiJdfQ==