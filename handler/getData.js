"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCustomerAddress = void 0;
const AWS = require("aws-sdk");
const tableName = process.env.TABLE_NAME;
console.log("🚀 ~ tableName:", tableName);
const documentClient = new AWS.DynamoDB.DocumentClient({
    region: process.env.region,
});
class GetCustomerAddress {
    constructor(userId, suburb, postcode) {
        this.userId = userId;
        this.suburb = suburb;
        this.postcode = postcode;
    }
    ;
    async getData() {
        let item;
        const params = {
            IndexName: 'UserIdIndex',
            KeyConditionExpression: 'UserId = :userId',
            ExpressionAttributeValues: {
                ':userId': this.userId,
            },
            TableName: tableName,
        };
        console.log("🚀 ~ GetCustomerAddress ~ getData ~ params:", params);
        if (this.suburb) {
            params.FilterExpression = 'Suburb = :suburb';
            params.ExpressionAttributeValues[':suburb'] = this.suburb;
        }
        // Check if postcode parameter is provided and add it to the query
        if (this.postcode) {
            if (params.FilterExpression) {
                params.FilterExpression += ' AND PostCode = :postcode';
            }
            else {
                params.FilterExpression = 'PostCode = :postcode';
            }
            params.ExpressionAttributeValues[':postcode'] = this.postcode;
        }
        try {
            console.info('inside try', this.userId);
            const data = await documentClient.query(params).promise();
            item = data.Items;
            return item;
        }
        catch (e) {
            return {
                statusCode: 500,
                body: e === 500 ? 'Invalid Request Body' : e, // here we can create and import a commomn error function or specific error handling function where the out put can be organise 
            };
        }
    }
}
exports.GetCustomerAddress = GetCustomerAddress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldERhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQThCO0FBRTlCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO0FBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsU0FBUyxDQUFDLENBQUE7QUFDekMsTUFBTSxjQUFjLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQztJQUNyRCxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNO0NBQzNCLENBQUMsQ0FBQztBQUVILE1BQWEsa0JBQWtCO0lBSy9CLFlBQVksTUFBVyxFQUFFLE1BQVksRUFBRSxRQUFhO1FBQzVDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzdCLENBQUM7SUFBQSxDQUFDO0lBQ0MsS0FBSyxDQUFDLE9BQU87UUFDaEIsSUFBSSxJQUFJLENBQUM7UUFDVCxNQUFNLE1BQU0sR0FBdUM7WUFDM0MsU0FBUyxFQUFFLGFBQWE7WUFDeEIsc0JBQXNCLEVBQUUsa0JBQWtCO1lBQzFDLHlCQUF5QixFQUFFO2dCQUMzQixTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU07YUFDcEI7WUFDRixTQUFTLEVBQUUsU0FBVTtTQUN2QixDQUFDO1FBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2Q0FBNkMsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUNsRSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEIsTUFBTSxDQUFDLGdCQUFnQixHQUFHLGtCQUFrQixDQUFDO1lBQzdDLE1BQU0sQ0FBQyx5QkFBMEIsQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQzVEO1FBRUQsa0VBQWtFO1FBQ2xFLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDM0IsTUFBTSxDQUFDLGdCQUFnQixJQUFJLDJCQUEyQixDQUFDO2FBQ3hEO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxzQkFBc0IsQ0FBQzthQUNsRDtZQUNELE1BQU0sQ0FBQyx5QkFBMEIsQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ2hFO1FBQ0QsSUFBRztZQUNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4QyxNQUFNLElBQUksR0FBRyxNQUFNLGNBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDMUQsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDbEIsT0FBTyxJQUFJLENBQUM7U0FDZDtRQUFBLE9BQU0sQ0FBQyxFQUFDO1lBQ04sT0FBTztnQkFDSCxVQUFVLEVBQUcsR0FBRztnQkFDaEIsSUFBSSxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsZ0lBQWdJO2FBQy9LLENBQUM7U0FDTjtJQUNOLENBQUM7Q0FDSjtBQS9DRCxnREErQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBBV1MgZnJvbSBcImF3cy1zZGtcIlxuaW1wb3J0IHsgRHluYW1vREIgfSBmcm9tIFwiYXdzLXNka1wiO1xuY29uc3QgdGFibGVOYW1lID0gcHJvY2Vzcy5lbnYuVEFCTEVfTkFNRTtcbmNvbnNvbGUubG9nKFwi8J+agCB+IHRhYmxlTmFtZTpcIiwgdGFibGVOYW1lKVxuY29uc3QgZG9jdW1lbnRDbGllbnQgPSBuZXcgQVdTLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50KHtcbiAgcmVnaW9uOiBwcm9jZXNzLmVudi5yZWdpb24sXG59KTtcblxuZXhwb3J0IGNsYXNzIEdldEN1c3RvbWVyQWRkcmVzcyB7XG5wdWJsaWMgdXNlcklkIDogYW55O1xucHVibGljIHN1YnVyYiA6IGFueTtcbnB1YmxpYyBwb3N0Y29kZSA6IGFueTtcbiAgICBcbmNvbnN0cnVjdG9yKHVzZXJJZDogYW55LCBzdWJ1cmIgOiBhbnksIHBvc3Rjb2RlOiBhbnkpe1xuICAgICAgICB0aGlzLnVzZXJJZCA9IHVzZXJJZDtcbiAgICAgICAgdGhpcy5zdWJ1cmIgPSBzdWJ1cmI7XG4gICAgICAgIHRoaXMucG9zdGNvZGUgPSBwb3N0Y29kZTtcbiAgICB9O1xucHVibGljIGFzeW5jIGdldERhdGEoKXtcbiAgICBsZXQgaXRlbTtcbiAgICBjb25zdCBwYXJhbXM6IER5bmFtb0RCLkRvY3VtZW50Q2xpZW50LlF1ZXJ5SW5wdXQgPSB7XG4gICAgICAgICAgICBJbmRleE5hbWU6ICdVc2VySWRJbmRleCcsXG4gICAgICAgICAgICBLZXlDb25kaXRpb25FeHByZXNzaW9uOiAnVXNlcklkID0gOnVzZXJJZCcsXG4gICAgICAgICAgICBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzOiB7XG4gICAgICAgICAgICAnOnVzZXJJZCc6IHRoaXMudXNlcklkLFxuICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBUYWJsZU5hbWU6IHRhYmxlTmFtZSEsXG4gICAgICAgICB9O1xuICAgICAgICAgY29uc29sZS5sb2coXCLwn5qAIH4gR2V0Q3VzdG9tZXJBZGRyZXNzIH4gZ2V0RGF0YSB+IHBhcmFtczpcIiwgcGFyYW1zKVxuICAgICAgICAgaWYgKHRoaXMuc3VidXJiKSB7XG4gICAgICAgICAgcGFyYW1zLkZpbHRlckV4cHJlc3Npb24gPSAnU3VidXJiID0gOnN1YnVyYic7XG4gICAgICAgICAgcGFyYW1zLkV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXMhWyc6c3VidXJiJ10gPSB0aGlzLnN1YnVyYjtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICAvLyBDaGVjayBpZiBwb3N0Y29kZSBwYXJhbWV0ZXIgaXMgcHJvdmlkZWQgYW5kIGFkZCBpdCB0byB0aGUgcXVlcnlcbiAgICAgICAgaWYgKHRoaXMucG9zdGNvZGUpIHtcbiAgICAgICAgICBpZiAocGFyYW1zLkZpbHRlckV4cHJlc3Npb24pIHtcbiAgICAgICAgICAgIHBhcmFtcy5GaWx0ZXJFeHByZXNzaW9uICs9ICcgQU5EIFBvc3RDb2RlID0gOnBvc3Rjb2RlJztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGFyYW1zLkZpbHRlckV4cHJlc3Npb24gPSAnUG9zdENvZGUgPSA6cG9zdGNvZGUnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwYXJhbXMuRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlcyFbJzpwb3N0Y29kZSddID0gdGhpcy5wb3N0Y29kZTtcbiAgICAgICAgfVxuICAgICAgICB0cnl7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oJ2luc2lkZSB0cnknLCB0aGlzLnVzZXJJZCk7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgZG9jdW1lbnRDbGllbnQucXVlcnkocGFyYW1zKS5wcm9taXNlKCk7XG4gICAgICAgICAgICBpdGVtID0gZGF0YS5JdGVtcztcbiAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiAgNTAwLFxuICAgICAgICAgICAgICAgIGJvZHk6IGUgPT09IDUwMCA/ICdJbnZhbGlkIFJlcXVlc3QgQm9keScgOiBlLCAvLyBoZXJlIHdlIGNhbiBjcmVhdGUgYW5kIGltcG9ydCBhIGNvbW1vbW4gZXJyb3IgZnVuY3Rpb24gb3Igc3BlY2lmaWMgZXJyb3IgaGFuZGxpbmcgZnVuY3Rpb24gd2hlcmUgdGhlIG91dCBwdXQgY2FuIGJlIG9yZ2FuaXNlIFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbiAgICAiXX0=