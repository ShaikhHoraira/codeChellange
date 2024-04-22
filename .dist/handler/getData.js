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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2hhbmRsZXIvZ2V0RGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBOEI7QUFFOUIsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7QUFDekMsTUFBTSxjQUFjLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQztJQUNyRCxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNO0NBQzNCLENBQUMsQ0FBQztBQUVILE1BQWEsa0JBQWtCO0lBSy9CLFlBQVksTUFBVyxFQUFFLE1BQVksRUFBRSxRQUFhO1FBQzVDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzdCLENBQUM7SUFBQSxDQUFDO0lBQ0MsS0FBSyxDQUFDLE9BQU87UUFDaEIsSUFBSSxJQUFJLENBQUM7UUFDVCxNQUFNLE1BQU0sR0FBdUM7WUFDM0MsU0FBUyxFQUFFLGFBQWE7WUFDeEIsc0JBQXNCLEVBQUUsa0JBQWtCO1lBQzFDLHlCQUF5QixFQUFFO2dCQUMzQixTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU07YUFDcEI7WUFDRixTQUFTLEVBQUUsU0FBVTtTQUN2QixDQUFDO1FBQ0YsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQztZQUM3QyxNQUFNLENBQUMseUJBQTBCLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUM1RDtRQUVELGtFQUFrRTtRQUNsRSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxNQUFNLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQzNCLE1BQU0sQ0FBQyxnQkFBZ0IsSUFBSSwyQkFBMkIsQ0FBQzthQUN4RDtpQkFBTTtnQkFDTCxNQUFNLENBQUMsZ0JBQWdCLEdBQUcsc0JBQXNCLENBQUM7YUFDbEQ7WUFDRCxNQUFNLENBQUMseUJBQTBCLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUNoRTtRQUNELElBQUc7WUFDQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEMsTUFBTSxJQUFJLEdBQUcsTUFBTSxjQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzFELElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ2xCLE9BQU8sSUFBSSxDQUFDO1NBQ2Q7UUFBQSxPQUFNLENBQUMsRUFBQztZQUNOLE9BQU87Z0JBQ0gsVUFBVSxFQUFHLEdBQUc7Z0JBQ2hCLElBQUksRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLGdJQUFnSTthQUMvSyxDQUFDO1NBQ047SUFDTixDQUFDO0NBQ0o7QUE5Q0QsZ0RBOENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgQVdTIGZyb20gXCJhd3Mtc2RrXCJcbmltcG9ydCB7IER5bmFtb0RCIH0gZnJvbSBcImF3cy1zZGtcIjtcbmNvbnN0IHRhYmxlTmFtZSA9IHByb2Nlc3MuZW52LlRBQkxFX05BTUU7XG5jb25zdCBkb2N1bWVudENsaWVudCA9IG5ldyBBV1MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQoe1xuICByZWdpb246IHByb2Nlc3MuZW52LnJlZ2lvbixcbn0pO1xuXG5leHBvcnQgY2xhc3MgR2V0Q3VzdG9tZXJBZGRyZXNzIHtcbnB1YmxpYyB1c2VySWQgOiBhbnk7XG5wdWJsaWMgc3VidXJiIDogYW55O1xucHVibGljIHBvc3Rjb2RlIDogYW55O1xuICAgIFxuY29uc3RydWN0b3IodXNlcklkOiBhbnksIHN1YnVyYiA6IGFueSwgcG9zdGNvZGU6IGFueSl7XG4gICAgICAgIHRoaXMudXNlcklkID0gdXNlcklkO1xuICAgICAgICB0aGlzLnN1YnVyYiA9IHN1YnVyYjtcbiAgICAgICAgdGhpcy5wb3N0Y29kZSA9IHBvc3Rjb2RlO1xuICAgIH07XG5wdWJsaWMgYXN5bmMgZ2V0RGF0YSgpe1xuICAgIGxldCBpdGVtO1xuICAgIGNvbnN0IHBhcmFtczogRHluYW1vREIuRG9jdW1lbnRDbGllbnQuUXVlcnlJbnB1dCA9IHtcbiAgICAgICAgICAgIEluZGV4TmFtZTogJ1VzZXJJZEluZGV4JyxcbiAgICAgICAgICAgIEtleUNvbmRpdGlvbkV4cHJlc3Npb246ICdVc2VySWQgPSA6dXNlcklkJyxcbiAgICAgICAgICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXM6IHtcbiAgICAgICAgICAgICc6dXNlcklkJzogdGhpcy51c2VySWQsXG4gICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFRhYmxlTmFtZTogdGFibGVOYW1lISxcbiAgICAgICAgIH07XG4gICAgICAgICBpZiAodGhpcy5zdWJ1cmIpIHtcbiAgICAgICAgICBwYXJhbXMuRmlsdGVyRXhwcmVzc2lvbiA9ICdTdWJ1cmIgPSA6c3VidXJiJztcbiAgICAgICAgICBwYXJhbXMuRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlcyFbJzpzdWJ1cmInXSA9IHRoaXMuc3VidXJiO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIC8vIENoZWNrIGlmIHBvc3Rjb2RlIHBhcmFtZXRlciBpcyBwcm92aWRlZCBhbmQgYWRkIGl0IHRvIHRoZSBxdWVyeVxuICAgICAgICBpZiAodGhpcy5wb3N0Y29kZSkge1xuICAgICAgICAgIGlmIChwYXJhbXMuRmlsdGVyRXhwcmVzc2lvbikge1xuICAgICAgICAgICAgcGFyYW1zLkZpbHRlckV4cHJlc3Npb24gKz0gJyBBTkQgUG9zdENvZGUgPSA6cG9zdGNvZGUnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJhbXMuRmlsdGVyRXhwcmVzc2lvbiA9ICdQb3N0Q29kZSA9IDpwb3N0Y29kZSc7XG4gICAgICAgICAgfVxuICAgICAgICAgIHBhcmFtcy5FeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzIVsnOnBvc3Rjb2RlJ10gPSB0aGlzLnBvc3Rjb2RlO1xuICAgICAgICB9XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnaW5zaWRlIHRyeScsIHRoaXMudXNlcklkKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBkb2N1bWVudENsaWVudC5xdWVyeShwYXJhbXMpLnByb21pc2UoKTtcbiAgICAgICAgICAgIGl0ZW0gPSBkYXRhLkl0ZW1zO1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICB9Y2F0Y2goZSl7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6ICA1MDAsXG4gICAgICAgICAgICAgICAgYm9keTogZSA9PT0gNTAwID8gJ0ludmFsaWQgUmVxdWVzdCBCb2R5JyA6IGUsIC8vIGhlcmUgd2UgY2FuIGNyZWF0ZSBhbmQgaW1wb3J0IGEgY29tbW9tbiBlcnJvciBmdW5jdGlvbiBvciBzcGVjaWZpYyBlcnJvciBoYW5kbGluZyBmdW5jdGlvbiB3aGVyZSB0aGUgb3V0IHB1dCBjYW4gYmUgb3JnYW5pc2UgXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuICAgICJdfQ==