"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.handler = void 0;
const AWS = require("aws-sdk");
const tableName = process.env.TODO_TABLE_NAME;
const documentClient = new AWS.DynamoDB.DocumentClient({
    region: process.env.region,
});
const handler = async (event) => {
    console.info("EVENT\n" + tableName + event.body);
    const bodypram = JSON.parse(event.body);
    var params = {
        TableName: tableName,
        Item: {
            UserId: bodypram.userId,
            CustomerName: bodypram.customerName,
            AppartmentNo: bodypram.appartmentNo,
            Address: bodypram.address,
            Suburb: bodypram.suburb,
            PostCode: bodypram.postCode,
            State: bodypram.state,
            Country: bodypram.country
        }
    };
    try {
        await documentClient.put(params).promise();
        return {
            statusCode: 200,
            body: 'Success'
        };
    }
    catch (e) {
        console.info(e + "this is line 55");
        return {
            statusCode: 500,
            body: e === 500 ? 'Invalid Request Body' : 'Something went wrong', // here we can create and import a commomn error function or specific error handling function where the out put can be organise 
        };
    }
};
exports.handler = handler;
const main = async () => {
};
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwrQkFBOEI7QUFFOUIsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUE7QUFFN0MsTUFBTSxjQUFjLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQztJQUNyRCxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNO0NBQzNCLENBQUMsQ0FBQztBQUVJLE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFXLEVBQUUsRUFBRTtJQUN0RCxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBRWhELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZDLElBQUksTUFBTSxHQUFHO1FBQ1gsU0FBUyxFQUFFLFNBQVU7UUFDckIsSUFBSSxFQUFFO1lBQ0osTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNO1lBQ3ZCLFlBQVksRUFBRyxRQUFRLENBQUMsWUFBWTtZQUNwQyxZQUFZLEVBQUcsUUFBUSxDQUFDLFlBQVk7WUFDcEMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPO1lBQ3pCLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTTtZQUN2QixRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7WUFDM0IsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLO1lBQ3JCLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTztTQUMxQjtLQUNGLENBQUM7SUFFQSxJQUFJO1FBRUEsTUFBTSxjQUFjLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzdDLE9BQU87WUFDSCxVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxTQUFTO1NBQ2hCLENBQUM7S0FDTDtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsaUJBQWlCLENBQUMsQ0FBQTtRQUNuQyxPQUFPO1lBQ0gsVUFBVSxFQUFHLEdBQUc7WUFDaEIsSUFBSSxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxzQkFBc0IsRUFBRSxnSUFBZ0k7U0FDcE0sQ0FBQztLQUNMO0FBQ0gsQ0FBQyxDQUFDO0FBaENXLFFBQUEsT0FBTyxXQWdDbEI7QUFTSyxNQUFNLElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtBQUkvQixDQUFDLENBQUM7QUFKVyxRQUFBLElBQUksUUFJZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuaW1wb3J0ICogYXMgQVdTIGZyb20gXCJhd3Mtc2RrXCJcblxuY29uc3QgdGFibGVOYW1lID0gcHJvY2Vzcy5lbnYuVE9ET19UQUJMRV9OQU1FXG5cbmNvbnN0IGRvY3VtZW50Q2xpZW50ID0gbmV3IEFXUy5EeW5hbW9EQi5Eb2N1bWVudENsaWVudCh7XG4gIHJlZ2lvbjogcHJvY2Vzcy5lbnYucmVnaW9uLFxufSk7XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBIYW5kbGVyID0gYXN5bmMgKGV2ZW50IDogYW55KSA9PiB7XG5jb25zb2xlLmluZm8oXCJFVkVOVFxcblwiICsgdGFibGVOYW1lICsgZXZlbnQuYm9keSlcblxuY29uc3QgYm9keXByYW0gPSBKU09OLnBhcnNlKGV2ZW50LmJvZHkpXG52YXIgcGFyYW1zID0ge1xuICBUYWJsZU5hbWU6IHRhYmxlTmFtZSEsXG4gIEl0ZW06IHtcbiAgICBVc2VySWQ6IGJvZHlwcmFtLnVzZXJJZCwgLy8gbmVlZCB0byBjaGFuZ2UgaXQgdG8gdXNlcklkIGFzIGEgcHJpb3JpdHkga2V5IFxuICAgIEN1c3RvbWVyTmFtZSA6IGJvZHlwcmFtLmN1c3RvbWVyTmFtZSxcbiAgICBBcHBhcnRtZW50Tm8gOiBib2R5cHJhbS5hcHBhcnRtZW50Tm8sXG4gICAgQWRkcmVzczogYm9keXByYW0uYWRkcmVzcyxcbiAgICBTdWJ1cmI6IGJvZHlwcmFtLnN1YnVyYixcbiAgICBQb3N0Q29kZTogYm9keXByYW0ucG9zdENvZGUsXG4gICAgU3RhdGU6IGJvZHlwcmFtLnN0YXRlLFxuICAgIENvdW50cnk6IGJvZHlwcmFtLmNvdW50cnlcbiAgfVxufTtcblxuICB0cnkge1xuICAgICBcbiAgICAgIGF3YWl0IGRvY3VtZW50Q2xpZW50LnB1dChwYXJhbXMpLnByb21pc2UoKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6ICdTdWNjZXNzJ1xuICAgICAgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuaW5mbyhlICsgXCJ0aGlzIGlzIGxpbmUgNTVcIilcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAgNTAwLFxuICAgICAgICBib2R5OiBlID09PSA1MDAgPyAnSW52YWxpZCBSZXF1ZXN0IEJvZHknIDogJ1NvbWV0aGluZyB3ZW50IHdyb25nJywgLy8gaGVyZSB3ZSBjYW4gY3JlYXRlIGFuZCBpbXBvcnQgYSBjb21tb21uIGVycm9yIGZ1bmN0aW9uIG9yIHNwZWNpZmljIGVycm9yIGhhbmRsaW5nIGZ1bmN0aW9uIHdoZXJlIHRoZSBvdXQgcHV0IGNhbiBiZSBvcmdhbmlzZSBcbiAgICAgIH07XG4gIH1cbn07XG5cblxuXG5cblxuXG5cblxuZXhwb3J0IGNvbnN0IG1haW4gPSBhc3luYyAoKSA9PiB7XG4gIFxuXG4gIFxufTtcblxuIl19