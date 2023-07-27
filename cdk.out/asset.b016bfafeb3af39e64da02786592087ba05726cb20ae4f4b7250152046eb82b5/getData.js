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
                params.FilterExpression += ' AND Postcode = :postcode';
            }
            else {
                params.FilterExpression = 'Postcode = :postcode';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldERhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQThCO0FBRTlCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO0FBQ3pDLE1BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7SUFDckQsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTTtDQUMzQixDQUFDLENBQUM7QUFFSCxNQUFhLGtCQUFrQjtJQUsvQixZQUFZLE1BQVcsRUFBRSxNQUFZLEVBQUUsUUFBYTtRQUM1QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUM3QixDQUFDO0lBQUEsQ0FBQztJQUNDLEtBQUssQ0FBQyxPQUFPO1FBQ2hCLElBQUksSUFBSSxDQUFDO1FBQ1QsTUFBTSxNQUFNLEdBQXVDO1lBQzNDLFNBQVMsRUFBRSxhQUFhO1lBQ3hCLHNCQUFzQixFQUFFLGtCQUFrQjtZQUMxQyx5QkFBeUIsRUFBRTtnQkFDM0IsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNO2FBQ3BCO1lBQ0YsU0FBUyxFQUFFLFNBQVU7U0FDdkIsQ0FBQztRQUNGLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixNQUFNLENBQUMsZ0JBQWdCLEdBQUcsa0JBQWtCLENBQUM7WUFDN0MsTUFBTSxDQUFDLHlCQUEwQixDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDNUQ7UUFFRCxrRUFBa0U7UUFDbEUsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksTUFBTSxDQUFDLGdCQUFnQixFQUFFO2dCQUMzQixNQUFNLENBQUMsZ0JBQWdCLElBQUksMkJBQTJCLENBQUM7YUFDeEQ7aUJBQU07Z0JBQ0wsTUFBTSxDQUFDLGdCQUFnQixHQUFHLHNCQUFzQixDQUFDO2FBQ2xEO1lBQ0QsTUFBTSxDQUFDLHlCQUEwQixDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDaEU7UUFDRCxJQUFHO1lBQ0MsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sSUFBSSxHQUFHLE1BQU0sY0FBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMxRCxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNsQixPQUFPLElBQUksQ0FBQztTQUNkO1FBQUEsT0FBTSxDQUFDLEVBQUM7WUFDTixPQUFPO2dCQUNILFVBQVUsRUFBRyxHQUFHO2dCQUNoQixJQUFJLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxnSUFBZ0k7YUFDL0ssQ0FBQztTQUNOO0lBQ04sQ0FBQztDQUNKO0FBOUNELGdEQThDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEFXUyBmcm9tIFwiYXdzLXNka1wiXG5pbXBvcnQgeyBEeW5hbW9EQiB9IGZyb20gXCJhd3Mtc2RrXCI7XG5jb25zdCB0YWJsZU5hbWUgPSBwcm9jZXNzLmVudi5UQUJMRV9OQU1FO1xuY29uc3QgZG9jdW1lbnRDbGllbnQgPSBuZXcgQVdTLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50KHtcbiAgcmVnaW9uOiBwcm9jZXNzLmVudi5yZWdpb24sXG59KTtcblxuZXhwb3J0IGNsYXNzIEdldEN1c3RvbWVyQWRkcmVzcyB7XG5wdWJsaWMgdXNlcklkIDogYW55O1xucHVibGljIHN1YnVyYiA6IGFueTtcbnB1YmxpYyBwb3N0Y29kZSA6IGFueTtcbiAgICBcbmNvbnN0cnVjdG9yKHVzZXJJZDogYW55LCBzdWJ1cmIgOiBhbnksIHBvc3Rjb2RlOiBhbnkpe1xuICAgICAgICB0aGlzLnVzZXJJZCA9IHVzZXJJZDtcbiAgICAgICAgdGhpcy5zdWJ1cmIgPSBzdWJ1cmI7XG4gICAgICAgIHRoaXMucG9zdGNvZGUgPSBwb3N0Y29kZTtcbiAgICB9O1xucHVibGljIGFzeW5jIGdldERhdGEoKXtcbiAgICBsZXQgaXRlbTtcbiAgICBjb25zdCBwYXJhbXM6IER5bmFtb0RCLkRvY3VtZW50Q2xpZW50LlF1ZXJ5SW5wdXQgPSB7XG4gICAgICAgICAgICBJbmRleE5hbWU6ICdVc2VySWRJbmRleCcsXG4gICAgICAgICAgICBLZXlDb25kaXRpb25FeHByZXNzaW9uOiAnVXNlcklkID0gOnVzZXJJZCcsXG4gICAgICAgICAgICBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzOiB7XG4gICAgICAgICAgICAnOnVzZXJJZCc6IHRoaXMudXNlcklkLFxuICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBUYWJsZU5hbWU6IHRhYmxlTmFtZSEsXG4gICAgICAgICB9O1xuICAgICAgICAgaWYgKHRoaXMuc3VidXJiKSB7XG4gICAgICAgICAgcGFyYW1zLkZpbHRlckV4cHJlc3Npb24gPSAnU3VidXJiID0gOnN1YnVyYic7XG4gICAgICAgICAgcGFyYW1zLkV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXMhWyc6c3VidXJiJ10gPSB0aGlzLnN1YnVyYjtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICAvLyBDaGVjayBpZiBwb3N0Y29kZSBwYXJhbWV0ZXIgaXMgcHJvdmlkZWQgYW5kIGFkZCBpdCB0byB0aGUgcXVlcnlcbiAgICAgICAgaWYgKHRoaXMucG9zdGNvZGUpIHtcbiAgICAgICAgICBpZiAocGFyYW1zLkZpbHRlckV4cHJlc3Npb24pIHtcbiAgICAgICAgICAgIHBhcmFtcy5GaWx0ZXJFeHByZXNzaW9uICs9ICcgQU5EIFBvc3Rjb2RlID0gOnBvc3Rjb2RlJztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGFyYW1zLkZpbHRlckV4cHJlc3Npb24gPSAnUG9zdGNvZGUgPSA6cG9zdGNvZGUnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwYXJhbXMuRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlcyFbJzpwb3N0Y29kZSddID0gdGhpcy5wb3N0Y29kZTtcbiAgICAgICAgfVxuICAgICAgICB0cnl7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oJ2luc2lkZSB0cnknLCB0aGlzLnVzZXJJZCk7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgZG9jdW1lbnRDbGllbnQucXVlcnkocGFyYW1zKS5wcm9taXNlKCk7XG4gICAgICAgICAgICBpdGVtID0gZGF0YS5JdGVtcztcbiAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiAgNTAwLFxuICAgICAgICAgICAgICAgIGJvZHk6IGUgPT09IDUwMCA/ICdJbnZhbGlkIFJlcXVlc3QgQm9keScgOiBlLCAvLyBoZXJlIHdlIGNhbiBjcmVhdGUgYW5kIGltcG9ydCBhIGNvbW1vbW4gZXJyb3IgZnVuY3Rpb24gb3Igc3BlY2lmaWMgZXJyb3IgaGFuZGxpbmcgZnVuY3Rpb24gd2hlcmUgdGhlIG91dCBwdXQgY2FuIGJlIG9yZ2FuaXNlIFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbiAgICAiXX0=