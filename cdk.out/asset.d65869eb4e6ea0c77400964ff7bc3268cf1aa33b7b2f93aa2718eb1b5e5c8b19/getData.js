"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCustomerAddress = void 0;
const AWS = require("aws-sdk");
const tableName = process.env.TABLE_NAME;
const documentClient = new AWS.DynamoDB.DocumentClient({
    region: process.env.region,
});
class GetCustomerAddress {
    constructor(userId) {
        this.userId = userId;
    }
    async getData() {
        console.info('getData function', this.userId);
        let item;
        const params = {
            IndexName: 'UserIdIndex',
            KeyConditionExpression: 'UserId = :userId',
            ExpressionAttributeValues: {
                ':userId': this.userId,
            },
            TableName: tableName,
        };
        console.info('before try', this.userId);
        try {
            console.info('inside try', this.userId);
            const data = await documentClient.query(params).promise();
            item = data.Items;
            console.info('after db query', item);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldERhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQThCO0FBRTlCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFBO0FBQ3hDLE1BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7SUFDckQsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTTtDQUMzQixDQUFDLENBQUM7QUFHSCxNQUFhLGtCQUFrQjtJQUcvQixZQUFZLE1BQVc7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBQ0UsS0FBSyxDQUFDLE9BQU87UUFDaEIsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDN0MsSUFBSSxJQUFJLENBQUM7UUFDVCxNQUFNLE1BQU0sR0FBRztZQUNYLFNBQVMsRUFBRSxhQUFhO1lBQ3hCLHNCQUFzQixFQUFFLGtCQUFrQjtZQUMxQyx5QkFBeUIsRUFBRTtnQkFDdkIsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNO2FBQ3pCO1lBQ0QsU0FBUyxFQUFFLFNBQVU7U0FDbkIsQ0FBQztRQUNGLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUN4QyxJQUFHO1lBQ0MsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3ZDLE1BQU0sSUFBSSxHQUFHLE1BQU0sY0FBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMxRCxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFBO1lBQ3BDLE9BQU8sSUFBSSxDQUFDO1NBQ2Q7UUFBQSxPQUFNLENBQUMsRUFBQztZQUNOLE9BQU87Z0JBQ0gsVUFBVSxFQUFHLEdBQUc7Z0JBQ2hCLElBQUksRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLGdJQUFnSTthQUMvSyxDQUFDO1NBQ047SUFFTixDQUFDO0NBQ0o7QUFoQ0QsZ0RBZ0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgQVdTIGZyb20gXCJhd3Mtc2RrXCJcblxuY29uc3QgdGFibGVOYW1lID0gcHJvY2Vzcy5lbnYuVEFCTEVfTkFNRVxuY29uc3QgZG9jdW1lbnRDbGllbnQgPSBuZXcgQVdTLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50KHtcbiAgcmVnaW9uOiBwcm9jZXNzLmVudi5yZWdpb24sXG59KTtcblxuXG5leHBvcnQgY2xhc3MgR2V0Q3VzdG9tZXJBZGRyZXNzIHtcbnB1YmxpYyB1c2VySWQgOiBhbnk7XG4gICAgXG5jb25zdHJ1Y3Rvcih1c2VySWQ6IGFueSl7XG4gICAgICAgIHRoaXMudXNlcklkID0gdXNlcklkO1xuICAgIH1cbnB1YmxpYyBhc3luYyBnZXREYXRhKCl7XG4gICAgY29uc29sZS5pbmZvKCdnZXREYXRhIGZ1bmN0aW9uJywgdGhpcy51c2VySWQpXG4gICAgbGV0IGl0ZW07XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICBJbmRleE5hbWU6ICdVc2VySWRJbmRleCcsXG4gICAgICAgIEtleUNvbmRpdGlvbkV4cHJlc3Npb246ICdVc2VySWQgPSA6dXNlcklkJyxcbiAgICAgICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xuICAgICAgICAgICAgJzp1c2VySWQnOiB0aGlzLnVzZXJJZCxcbiAgICAgICAgfSxcbiAgICAgICAgVGFibGVOYW1lOiB0YWJsZU5hbWUhLFxuICAgICAgICAgfTtcbiAgICAgICAgIGNvbnNvbGUuaW5mbygnYmVmb3JlIHRyeScsIHRoaXMudXNlcklkKVxuICAgICAgICB0cnl7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oJ2luc2lkZSB0cnknLCB0aGlzLnVzZXJJZClcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBkb2N1bWVudENsaWVudC5xdWVyeShwYXJhbXMpLnByb21pc2UoKTtcbiAgICAgICAgICAgIGl0ZW0gPSBkYXRhLkl0ZW1zO1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKCdhZnRlciBkYiBxdWVyeScsIGl0ZW0pXG4gICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgIH1jYXRjaChlKXtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogIDUwMCxcbiAgICAgICAgICAgICAgICBib2R5OiBlID09PSA1MDAgPyAnSW52YWxpZCBSZXF1ZXN0IEJvZHknIDogZSwgLy8gaGVyZSB3ZSBjYW4gY3JlYXRlIGFuZCBpbXBvcnQgYSBjb21tb21uIGVycm9yIGZ1bmN0aW9uIG9yIHNwZWNpZmljIGVycm9yIGhhbmRsaW5nIGZ1bmN0aW9uIHdoZXJlIHRoZSBvdXQgcHV0IGNhbiBiZSBvcmdhbmlzZSBcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxufVxuXG5cblxuICAgICJdfQ==