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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldERhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQThCO0FBRTlCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO0FBQ3pDLE1BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7SUFDckQsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTTtDQUMzQixDQUFDLENBQUM7QUFFSCxNQUFhLGtCQUFrQjtJQU0vQixZQUFZLE1BQVcsRUFBRSxNQUFZLEVBQUUsUUFBYTtRQUM1QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUM3QixDQUFDO0lBQUEsQ0FBQztJQUNDLEtBQUssQ0FBQyxPQUFPO1FBQ2hCLElBQUksSUFBSSxDQUFDO1FBQ1QsTUFBTSxNQUFNLEdBQXVDO1lBQzNDLFNBQVMsRUFBRSxhQUFhO1lBQ3hCLHNCQUFzQixFQUFFLGtCQUFrQjtZQUMxQyx5QkFBeUIsRUFBRTtnQkFDM0IsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNO2FBQ3BCO1lBQ0YsU0FBUyxFQUFFLFNBQVU7U0FDdkIsQ0FBQztRQUNGLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixNQUFNLENBQUMsZ0JBQWdCLEdBQUcsa0JBQWtCLENBQUM7WUFDN0MsTUFBTSxDQUFDLHlCQUEwQixDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDNUQ7UUFFRCxrRUFBa0U7UUFDbEUsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksTUFBTSxDQUFDLGdCQUFnQixFQUFFO2dCQUMzQixNQUFNLENBQUMsZ0JBQWdCLElBQUksMkJBQTJCLENBQUM7YUFDeEQ7aUJBQU07Z0JBQ0wsTUFBTSxDQUFDLGdCQUFnQixHQUFHLHNCQUFzQixDQUFDO2FBQ2xEO1lBQ0QsTUFBTSxDQUFDLHlCQUEwQixDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDaEU7UUFDRCxJQUFHO1lBQ0MsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sSUFBSSxHQUFHLE1BQU0sY0FBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMxRCxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNsQixPQUFPLElBQUksQ0FBQztTQUNkO1FBQUEsT0FBTSxDQUFDLEVBQUM7WUFDTixPQUFPO2dCQUNILFVBQVUsRUFBRyxHQUFHO2dCQUNoQixJQUFJLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxnSUFBZ0k7YUFDL0ssQ0FBQztTQUNOO0lBQ04sQ0FBQztDQUNKO0FBL0NELGdEQStDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEFXUyBmcm9tIFwiYXdzLXNka1wiXG5pbXBvcnQgeyBEeW5hbW9EQiB9IGZyb20gXCJhd3Mtc2RrXCI7XG5jb25zdCB0YWJsZU5hbWUgPSBwcm9jZXNzLmVudi5UQUJMRV9OQU1FO1xuY29uc3QgZG9jdW1lbnRDbGllbnQgPSBuZXcgQVdTLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50KHtcbiAgcmVnaW9uOiBwcm9jZXNzLmVudi5yZWdpb24sXG59KTtcblxuZXhwb3J0IGNsYXNzIEdldEN1c3RvbWVyQWRkcmVzcyB7XG5wdWJsaWMgdXNlcklkIDogYW55O1xucHVibGljIHN1YnVyYiA6IGFueTtcbnB1YmxpYyBwb3N0Y29kZSA6IGFueTtcbiAgICBcblxuY29uc3RydWN0b3IodXNlcklkOiBhbnksIHN1YnVyYiA6IGFueSwgcG9zdGNvZGU6IGFueSl7XG4gICAgICAgIHRoaXMudXNlcklkID0gdXNlcklkO1xuICAgICAgICB0aGlzLnN1YnVyYiA9IHN1YnVyYjtcbiAgICAgICAgdGhpcy5wb3N0Y29kZSA9IHBvc3Rjb2RlO1xuICAgIH07XG5wdWJsaWMgYXN5bmMgZ2V0RGF0YSgpe1xuICAgIGxldCBpdGVtO1xuICAgIGNvbnN0IHBhcmFtczogRHluYW1vREIuRG9jdW1lbnRDbGllbnQuUXVlcnlJbnB1dCA9IHtcbiAgICAgICAgICAgIEluZGV4TmFtZTogJ1VzZXJJZEluZGV4JyxcbiAgICAgICAgICAgIEtleUNvbmRpdGlvbkV4cHJlc3Npb246ICdVc2VySWQgPSA6dXNlcklkJyxcbiAgICAgICAgICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXM6IHtcbiAgICAgICAgICAgICc6dXNlcklkJzogdGhpcy51c2VySWQsXG4gICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFRhYmxlTmFtZTogdGFibGVOYW1lISxcbiAgICAgICAgIH07XG4gICAgICAgICBpZiAodGhpcy5zdWJ1cmIpIHtcbiAgICAgICAgICBwYXJhbXMuRmlsdGVyRXhwcmVzc2lvbiA9ICdTdWJ1cmIgPSA6c3VidXJiJztcbiAgICAgICAgICBwYXJhbXMuRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlcyFbJzpzdWJ1cmInXSA9IHRoaXMuc3VidXJiO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIC8vIENoZWNrIGlmIHBvc3Rjb2RlIHBhcmFtZXRlciBpcyBwcm92aWRlZCBhbmQgYWRkIGl0IHRvIHRoZSBxdWVyeVxuICAgICAgICBpZiAodGhpcy5wb3N0Y29kZSkge1xuICAgICAgICAgIGlmIChwYXJhbXMuRmlsdGVyRXhwcmVzc2lvbikge1xuICAgICAgICAgICAgcGFyYW1zLkZpbHRlckV4cHJlc3Npb24gKz0gJyBBTkQgUG9zdENvZGUgPSA6cG9zdGNvZGUnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJhbXMuRmlsdGVyRXhwcmVzc2lvbiA9ICdQb3N0Q29kZSA9IDpwb3N0Y29kZSc7XG4gICAgICAgICAgfVxuICAgICAgICAgIHBhcmFtcy5FeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzIVsnOnBvc3Rjb2RlJ10gPSB0aGlzLnBvc3Rjb2RlO1xuICAgICAgICB9XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnaW5zaWRlIHRyeScsIHRoaXMudXNlcklkKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBkb2N1bWVudENsaWVudC5xdWVyeShwYXJhbXMpLnByb21pc2UoKTtcbiAgICAgICAgICAgIGl0ZW0gPSBkYXRhLkl0ZW1zO1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICB9Y2F0Y2goZSl7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6ICA1MDAsXG4gICAgICAgICAgICAgICAgYm9keTogZSA9PT0gNTAwID8gJ0ludmFsaWQgUmVxdWVzdCBCb2R5JyA6IGUsIC8vIGhlcmUgd2UgY2FuIGNyZWF0ZSBhbmQgaW1wb3J0IGEgY29tbW9tbiBlcnJvciBmdW5jdGlvbiBvciBzcGVjaWZpYyBlcnJvciBoYW5kbGluZyBmdW5jdGlvbiB3aGVyZSB0aGUgb3V0IHB1dCBjYW4gYmUgb3JnYW5pc2UgXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuICAgICJdfQ==