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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldERhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQThCO0FBRTlCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO0FBQ3pDLE1BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7SUFDckQsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTTtDQUMzQixDQUFDLENBQUM7QUFFSCxNQUFhLGtCQUFrQjtJQUcvQixZQUFZLE1BQVc7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBQUEsQ0FBQztJQUNDLEtBQUssQ0FBQyxPQUFPO1FBQ2hCLElBQUksSUFBSSxDQUFDO1FBQ1QsTUFBTSxNQUFNLEdBQUc7WUFDUCxTQUFTLEVBQUUsYUFBYTtZQUN4QixzQkFBc0IsRUFBRSxrQkFBa0I7WUFDMUMseUJBQXlCLEVBQUU7Z0JBQzNCLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTTthQUNwQjtZQUNGLFNBQVMsRUFBRSxTQUFVO1NBQ3ZCLENBQUM7UUFDSCxJQUFHO1lBQ0MsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sSUFBSSxHQUFHLE1BQU0sY0FBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMxRCxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNsQixPQUFPLElBQUksQ0FBQztTQUNkO1FBQUEsT0FBTSxDQUFDLEVBQUM7WUFDTixPQUFPO2dCQUNILFVBQVUsRUFBRyxHQUFHO2dCQUNoQixJQUFJLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxnSUFBZ0k7YUFDL0ssQ0FBQztTQUNOO0lBQ04sQ0FBQztDQUNKO0FBNUJELGdEQTRCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEFXUyBmcm9tIFwiYXdzLXNka1wiXG5cbmNvbnN0IHRhYmxlTmFtZSA9IHByb2Nlc3MuZW52LlRBQkxFX05BTUU7XG5jb25zdCBkb2N1bWVudENsaWVudCA9IG5ldyBBV1MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQoe1xuICByZWdpb246IHByb2Nlc3MuZW52LnJlZ2lvbixcbn0pO1xuXG5leHBvcnQgY2xhc3MgR2V0Q3VzdG9tZXJBZGRyZXNzIHtcbnB1YmxpYyB1c2VySWQgOiBhbnk7XG4gICAgXG5jb25zdHJ1Y3Rvcih1c2VySWQ6IGFueSl7XG4gICAgICAgIHRoaXMudXNlcklkID0gdXNlcklkO1xuICAgIH07XG5wdWJsaWMgYXN5bmMgZ2V0RGF0YSgpe1xuICAgIGxldCBpdGVtO1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgIEluZGV4TmFtZTogJ1VzZXJJZEluZGV4JyxcbiAgICAgICAgICAgIEtleUNvbmRpdGlvbkV4cHJlc3Npb246ICdVc2VySWQgPSA6dXNlcklkJyxcbiAgICAgICAgICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXM6IHtcbiAgICAgICAgICAgICc6dXNlcklkJzogdGhpcy51c2VySWQsXG4gICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFRhYmxlTmFtZTogdGFibGVOYW1lISxcbiAgICAgICAgIH07XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnaW5zaWRlIHRyeScsIHRoaXMudXNlcklkKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBkb2N1bWVudENsaWVudC5xdWVyeShwYXJhbXMpLnByb21pc2UoKTtcbiAgICAgICAgICAgIGl0ZW0gPSBkYXRhLkl0ZW1zO1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICB9Y2F0Y2goZSl7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6ICA1MDAsXG4gICAgICAgICAgICAgICAgYm9keTogZSA9PT0gNTAwID8gJ0ludmFsaWQgUmVxdWVzdCBCb2R5JyA6IGUsIC8vIGhlcmUgd2UgY2FuIGNyZWF0ZSBhbmQgaW1wb3J0IGEgY29tbW9tbiBlcnJvciBmdW5jdGlvbiBvciBzcGVjaWZpYyBlcnJvciBoYW5kbGluZyBmdW5jdGlvbiB3aGVyZSB0aGUgb3V0IHB1dCBjYW4gYmUgb3JnYW5pc2UgXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuICAgICJdfQ==