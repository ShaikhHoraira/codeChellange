"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCustomerAddress = void 0;
const AWS = require("aws-sdk");
const tableName = process.env.TABLE_NAME;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldERhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQThCO0FBRTlCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO0FBQ3pDLE1BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7SUFDckQsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTTtDQUMzQixDQUFDLENBQUM7QUFFSCxNQUFhLGtCQUFrQjtJQUsvQixZQUFZLE1BQWMsRUFBRSxNQUFlLEVBQUUsUUFBZ0I7UUFDckQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQUFBLENBQUM7SUFDQyxLQUFLLENBQUMsT0FBTztRQUNoQixJQUFJLElBQUksQ0FBQztRQUNULE1BQU0sTUFBTSxHQUF1QztZQUMzQyxTQUFTLEVBQUUsYUFBYTtZQUN4QixzQkFBc0IsRUFBRSxrQkFBa0I7WUFDMUMseUJBQXlCLEVBQUU7Z0JBQzNCLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTTthQUNwQjtZQUNGLFNBQVMsRUFBRSxTQUFVO1NBQ3ZCLENBQUM7UUFDRixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEIsTUFBTSxDQUFDLGdCQUFnQixHQUFHLGtCQUFrQixDQUFDO1lBQzdDLE1BQU0sQ0FBQyx5QkFBMEIsQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQzVEO1FBRUQsa0VBQWtFO1FBQ2xFLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDM0IsTUFBTSxDQUFDLGdCQUFnQixJQUFJLDJCQUEyQixDQUFDO2FBQ3hEO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxzQkFBc0IsQ0FBQzthQUNsRDtZQUNELE1BQU0sQ0FBQyx5QkFBMEIsQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ2hFO1FBQ0QsSUFBRztZQUNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4QyxNQUFNLElBQUksR0FBRyxNQUFNLGNBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDMUQsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDbEIsT0FBTyxJQUFJLENBQUM7U0FDZDtRQUFBLE9BQU0sQ0FBQyxFQUFDO1lBQ04sT0FBTztnQkFDSCxVQUFVLEVBQUcsR0FBRztnQkFDaEIsSUFBSSxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsZ0lBQWdJO2FBQy9LLENBQUM7U0FDTjtJQUNOLENBQUM7Q0FDSjtBQTlDRCxnREE4Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBBV1MgZnJvbSBcImF3cy1zZGtcIlxuaW1wb3J0IHsgRHluYW1vREIgfSBmcm9tIFwiYXdzLXNka1wiO1xuY29uc3QgdGFibGVOYW1lID0gcHJvY2Vzcy5lbnYuVEFCTEVfTkFNRTtcbmNvbnN0IGRvY3VtZW50Q2xpZW50ID0gbmV3IEFXUy5EeW5hbW9EQi5Eb2N1bWVudENsaWVudCh7XG4gIHJlZ2lvbjogcHJvY2Vzcy5lbnYucmVnaW9uLFxufSk7XG5cbmV4cG9ydCBjbGFzcyBHZXRDdXN0b21lckFkZHJlc3Mge1xucHVibGljIHVzZXJJZCA6IHN0cmluZztcbnB1YmxpYyBzdWJ1cmIgOiBzdHJpbmc7XG5wdWJsaWMgcG9zdGNvZGUgOiBzdHJpbmc7XG4gICAgXG5jb25zdHJ1Y3Rvcih1c2VySWQ6IHN0cmluZywgc3VidXJiIDogc3RyaW5nLCBwb3N0Y29kZTogc3RyaW5nKXtcbiAgICAgICAgdGhpcy51c2VySWQgPSB1c2VySWQ7XG4gICAgICAgIHRoaXMuc3VidXJiID0gc3VidXJiO1xuICAgICAgICB0aGlzLnBvc3Rjb2RlID0gcG9zdGNvZGU7XG4gICAgfTtcbnB1YmxpYyBhc3luYyBnZXREYXRhKCl7XG4gICAgbGV0IGl0ZW07XG4gICAgY29uc3QgcGFyYW1zOiBEeW5hbW9EQi5Eb2N1bWVudENsaWVudC5RdWVyeUlucHV0ID0ge1xuICAgICAgICAgICAgSW5kZXhOYW1lOiAnVXNlcklkSW5kZXgnLFxuICAgICAgICAgICAgS2V5Q29uZGl0aW9uRXhwcmVzc2lvbjogJ1VzZXJJZCA9IDp1c2VySWQnLFxuICAgICAgICAgICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xuICAgICAgICAgICAgJzp1c2VySWQnOiB0aGlzLnVzZXJJZCxcbiAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgVGFibGVOYW1lOiB0YWJsZU5hbWUhLFxuICAgICAgICAgfTtcbiAgICAgICAgIGlmICh0aGlzLnN1YnVyYikge1xuICAgICAgICAgIHBhcmFtcy5GaWx0ZXJFeHByZXNzaW9uID0gJ1N1YnVyYiA9IDpzdWJ1cmInO1xuICAgICAgICAgIHBhcmFtcy5FeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzIVsnOnN1YnVyYiddID0gdGhpcy5zdWJ1cmI7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgLy8gQ2hlY2sgaWYgcG9zdGNvZGUgcGFyYW1ldGVyIGlzIHByb3ZpZGVkIGFuZCBhZGQgaXQgdG8gdGhlIHF1ZXJ5XG4gICAgICAgIGlmICh0aGlzLnBvc3Rjb2RlKSB7XG4gICAgICAgICAgaWYgKHBhcmFtcy5GaWx0ZXJFeHByZXNzaW9uKSB7XG4gICAgICAgICAgICBwYXJhbXMuRmlsdGVyRXhwcmVzc2lvbiArPSAnIEFORCBQb3N0Q29kZSA9IDpwb3N0Y29kZSc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcmFtcy5GaWx0ZXJFeHByZXNzaW9uID0gJ1Bvc3RDb2RlID0gOnBvc3Rjb2RlJztcbiAgICAgICAgICB9XG4gICAgICAgICAgcGFyYW1zLkV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXMhWyc6cG9zdGNvZGUnXSA9IHRoaXMucG9zdGNvZGU7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKCdpbnNpZGUgdHJ5JywgdGhpcy51c2VySWQpO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGRvY3VtZW50Q2xpZW50LnF1ZXJ5KHBhcmFtcykucHJvbWlzZSgpO1xuICAgICAgICAgICAgaXRlbSA9IGRhdGEuSXRlbXM7XG4gICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgIH1jYXRjaChlKXtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogIDUwMCxcbiAgICAgICAgICAgICAgICBib2R5OiBlID09PSA1MDAgPyAnSW52YWxpZCBSZXF1ZXN0IEJvZHknIDogZSwgLy8gaGVyZSB3ZSBjYW4gY3JlYXRlIGFuZCBpbXBvcnQgYSBjb21tb21uIGVycm9yIGZ1bmN0aW9uIG9yIHNwZWNpZmljIGVycm9yIGhhbmRsaW5nIGZ1bmN0aW9uIHdoZXJlIHRoZSBvdXQgcHV0IGNhbiBiZSBvcmdhbmlzZSBcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4gICAgIl19