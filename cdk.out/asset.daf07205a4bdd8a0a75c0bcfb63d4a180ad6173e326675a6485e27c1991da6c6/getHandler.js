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
    const suburb = queryParams.suburb;
    const postCode = queryParams.postcode;
    let params = {
        TableName: tableName,
    };
    if (suburb || postCode) {
        let KeyConditionExpression = '';
        let ExpressionAttributeValues = {};
        if (suburb) {
            KeyConditionExpression += '#Suburb = :Suburb';
            ExpressionAttributeValues[':Suburb'] = suburb;
        }
        if (postCode) {
            if (KeyConditionExpression) {
                KeyConditionExpression += ' AND ';
            }
            KeyConditionExpression += '#PostCode = :PostCode';
            ExpressionAttributeValues[':PostCode'] = postCode;
        }
        params = {
            ...params,
            KeyConditionExpression,
            ExpressionAttributeNames: {
                '#Suburb': 'Suburb',
                '#PostCode': 'PostCode',
            },
            ExpressionAttributeValues,
        };
    }
    else {
        // No filtering conditions specified, return empty result
        return {
            statusCode: 200,
            body: JSON.stringify([]),
        };
    }
    try {
        const data = await documentClient.query(params).promise();
        const items = data.Items;
        const response = {
            statusCode: 200,
            body: JSON.stringify(items),
        };
        console.info(`body: ${response.body}`);
        return response;
    }
    catch (e) {
        console.info(e);
        return {
            statusCode: 500,
            body: e === 500 ? 'Invalid Request Parameters' : e,
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGtDQUFrQzs7O0FBeURsQywrQkFBK0I7QUFFL0IsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7QUFDOUMsTUFBTSxjQUFjLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQztJQUNyRCxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNO0NBQzNCLENBQUMsQ0FBQztBQUVJLE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFVLEVBQUUsUUFBYSxFQUFFLEVBQUU7SUFDbEUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVwQixNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMscUJBQXFCLENBQUM7SUFDaEQsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztJQUNsQyxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDO0lBRXRDLElBQUksTUFBTSxHQUEyQztRQUNuRCxTQUFTLEVBQUUsU0FBVTtLQUN0QixDQUFDO0lBRUYsSUFBSSxNQUFNLElBQUksUUFBUSxFQUFFO1FBQ3RCLElBQUksc0JBQXNCLEdBQUcsRUFBRSxDQUFDO1FBQ2hDLElBQUkseUJBQXlCLEdBQTRELEVBQUUsQ0FBQztRQUU1RixJQUFJLE1BQU0sRUFBRTtZQUNWLHNCQUFzQixJQUFJLG1CQUFtQixDQUFDO1lBQzlDLHlCQUF5QixDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztTQUMvQztRQUVELElBQUksUUFBUSxFQUFFO1lBQ1osSUFBSSxzQkFBc0IsRUFBRTtnQkFDMUIsc0JBQXNCLElBQUksT0FBTyxDQUFDO2FBQ25DO1lBQ0Qsc0JBQXNCLElBQUksdUJBQXVCLENBQUM7WUFDbEQseUJBQXlCLENBQUMsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFDO1NBQ25EO1FBRUQsTUFBTSxHQUFHO1lBQ1AsR0FBRyxNQUFNO1lBQ1Qsc0JBQXNCO1lBQ3RCLHdCQUF3QixFQUFFO2dCQUN4QixTQUFTLEVBQUUsUUFBUTtnQkFDbkIsV0FBVyxFQUFFLFVBQVU7YUFDeEI7WUFDRCx5QkFBeUI7U0FDMUIsQ0FBQztLQUNIO1NBQU07UUFDTCx5REFBeUQ7UUFDekQsT0FBTztZQUNMLFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO1NBQ3pCLENBQUM7S0FDSDtJQUVELElBQUk7UUFDRixNQUFNLElBQUksR0FBRyxNQUFNLGNBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDMUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN6QixNQUFNLFFBQVEsR0FBRztZQUNmLFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1NBQzVCLENBQUM7UUFDRixPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDdkMsT0FBTyxRQUFRLENBQUM7S0FDakI7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEIsT0FBTztZQUNMLFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25ELENBQUM7S0FDSDtBQUNILENBQUMsQ0FBQztBQTdEVyxRQUFBLE9BQU8sV0E2RGxCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0ICogYXMgQVdTIGZyb20gJ2F3cy1zZGsnO1xuXG4vLyBjb25zdCB0YWJsZU5hbWUgPSBwcm9jZXNzLmVudi5UT0RPX1RBQkxFX05BTUU7XG4vLyBjb25zdCBkb2N1bWVudENsaWVudCA9IG5ldyBBV1MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQoe1xuLy8gICByZWdpb246IHByb2Nlc3MuZW52LnJlZ2lvbixcbi8vIH0pO1xuXG4vLyBleHBvcnQgY29uc3QgaGFuZGxlciA9IGFzeW5jIChldmVudCA6IGFueSwgX2NvbnRleHQ6IGFueSkgPT4ge1xuLy8gICBjb25zb2xlLmluZm8oZXZlbnQpO1xuXG4vLyAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzO1xuLy8gICBjb25zdCBzdWJ1cmIgPSBxdWVyeVBhcmFtcy5zdWJ1cmI7XG4vLyAgIGNvbnN0IHBvc3Rjb2RlID0gcXVlcnlQYXJhbXMucG9zdGNvZGU7XG5cbi8vICAgY29uc3QgcGFyYW1zOiBBV1MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQuU2NhbklucHV0ID0ge1xuLy8gICAgIFRhYmxlTmFtZTogdGFibGVOYW1lISxcbi8vICAgfTtcblxuLy8gICBpZiAoc3VidXJiKSB7XG4vLyAgICAgcGFyYW1zLkZpbHRlckV4cHJlc3Npb24gPSAnI3N1YnVyYiA9IDpzdWJ1cmInO1xuLy8gICAgIHBhcmFtcy5FeHByZXNzaW9uQXR0cmlidXRlTmFtZXMgPSB7XG4vLyAgICAgICAnI3N1YnVyYic6ICdTdWJ1cmInLFxuLy8gICAgIH07XG4vLyAgICAgcGFyYW1zLkV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXMgPSB7XG4vLyAgICAgICAnOnN1YnVyYic6IHN1YnVyYixcbi8vICAgICB9O1xuLy8gICB9XG5cbi8vICAgaWYgKHBvc3Rjb2RlKSB7XG4vLyAgICAgcGFyYW1zLkZpbHRlckV4cHJlc3Npb24gPSAnI3Bvc3RDb2RlID0gOnBvc3RDb2RlJztcbi8vICAgICBwYXJhbXMuRXhwcmVzc2lvbkF0dHJpYnV0ZU5hbWVzID0ge1xuLy8gICAgICAgJyNwb3N0Q29kZSc6ICdQb3N0Q29kZScsXG4vLyAgICAgfTtcbi8vICAgICBwYXJhbXMuRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlcyA9IHtcbi8vICAgICAgICc6cG9zdENvZGUnOiBwb3N0Y29kZSxcbi8vICAgICB9O1xuLy8gICB9XG5cbi8vICAgdHJ5IHtcbi8vICAgICBjb25zdCBkYXRhID0gYXdhaXQgZG9jdW1lbnRDbGllbnQuc2NhbihwYXJhbXMpLnByb21pc2UoKTtcbi8vICAgICBjb25zdCBpdGVtcyA9IGRhdGEuSXRlbXM7XG4vLyAgICAgY29uc3QgcmVzcG9uc2UgPSB7XG4vLyAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4vLyAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtcyksXG4vLyAgICAgfTtcbi8vICAgICBjb25zb2xlLmluZm8oYGJvZHk6ICR7cmVzcG9uc2UuYm9keX1gKTtcbi8vICAgICByZXR1cm4gcmVzcG9uc2U7XG4vLyAgIH0gY2F0Y2ggKGUpIHtcbi8vICAgICByZXR1cm4ge1xuLy8gICAgICAgc3RhdHVzQ29kZTogNTAwLFxuLy8gICAgICAgYm9keTogZSA9PT0gNTAwID8gJ0ludmFsaWQgUmVxdWVzdCBQYXJhbWV0ZXJzJyA6ICdTb21ldGhpbmcgd2VudCB3cm9uZycsXG4vLyAgICAgfTtcbi8vICAgfVxuLy8gfTtcblxuXG5pbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcbmltcG9ydCAqIGFzIEFXUyBmcm9tICdhd3Mtc2RrJztcblxuY29uc3QgdGFibGVOYW1lID0gcHJvY2Vzcy5lbnYuVE9ET19UQUJMRV9OQU1FO1xuY29uc3QgZG9jdW1lbnRDbGllbnQgPSBuZXcgQVdTLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50KHtcbiAgcmVnaW9uOiBwcm9jZXNzLmVudi5yZWdpb24sXG59KTtcblxuZXhwb3J0IGNvbnN0IGhhbmRsZXI6IEhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IGFueSwgX2NvbnRleHQ6IGFueSkgPT4ge1xuICBjb25zb2xlLmluZm8oZXZlbnQpO1xuXG4gIGNvbnN0IHF1ZXJ5UGFyYW1zID0gZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzO1xuICBjb25zdCBzdWJ1cmIgPSBxdWVyeVBhcmFtcy5zdWJ1cmI7XG4gIGNvbnN0IHBvc3RDb2RlID0gcXVlcnlQYXJhbXMucG9zdGNvZGU7XG5cbiAgbGV0IHBhcmFtczogQVdTLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50LlF1ZXJ5SW5wdXQgPSB7XG4gICAgVGFibGVOYW1lOiB0YWJsZU5hbWUhLFxuICB9O1xuXG4gIGlmIChzdWJ1cmIgfHwgcG9zdENvZGUpIHtcbiAgICBsZXQgS2V5Q29uZGl0aW9uRXhwcmVzc2lvbiA9ICcnO1xuICAgIGxldCBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzOiBBV1MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQuRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlTWFwID0ge307XG5cbiAgICBpZiAoc3VidXJiKSB7XG4gICAgICBLZXlDb25kaXRpb25FeHByZXNzaW9uICs9ICcjU3VidXJiID0gOlN1YnVyYic7XG4gICAgICBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzWyc6U3VidXJiJ10gPSBzdWJ1cmI7XG4gICAgfVxuXG4gICAgaWYgKHBvc3RDb2RlKSB7XG4gICAgICBpZiAoS2V5Q29uZGl0aW9uRXhwcmVzc2lvbikge1xuICAgICAgICBLZXlDb25kaXRpb25FeHByZXNzaW9uICs9ICcgQU5EICc7XG4gICAgICB9XG4gICAgICBLZXlDb25kaXRpb25FeHByZXNzaW9uICs9ICcjUG9zdENvZGUgPSA6UG9zdENvZGUnO1xuICAgICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlc1snOlBvc3RDb2RlJ10gPSBwb3N0Q29kZTtcbiAgICB9XG5cbiAgICBwYXJhbXMgPSB7XG4gICAgICAuLi5wYXJhbXMsXG4gICAgICBLZXlDb25kaXRpb25FeHByZXNzaW9uLFxuICAgICAgRXhwcmVzc2lvbkF0dHJpYnV0ZU5hbWVzOiB7XG4gICAgICAgICcjU3VidXJiJzogJ1N1YnVyYicsXG4gICAgICAgICcjUG9zdENvZGUnOiAnUG9zdENvZGUnLFxuICAgICAgfSxcbiAgICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXMsXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICAvLyBObyBmaWx0ZXJpbmcgY29uZGl0aW9ucyBzcGVjaWZpZWQsIHJldHVybiBlbXB0eSByZXN1bHRcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoW10pLFxuICAgIH07XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBkb2N1bWVudENsaWVudC5xdWVyeShwYXJhbXMpLnByb21pc2UoKTtcbiAgICBjb25zdCBpdGVtcyA9IGRhdGEuSXRlbXM7XG4gICAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtcyksXG4gICAgfTtcbiAgICBjb25zb2xlLmluZm8oYGJvZHk6ICR7cmVzcG9uc2UuYm9keX1gKTtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmluZm8oZSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1c0NvZGU6IDUwMCxcbiAgICAgIGJvZHk6IGUgPT09IDUwMCA/ICdJbnZhbGlkIFJlcXVlc3QgUGFyYW1ldGVycycgOiBlLFxuICAgIH07XG4gIH1cbn07XG5cblxuXG5cbiJdfQ==