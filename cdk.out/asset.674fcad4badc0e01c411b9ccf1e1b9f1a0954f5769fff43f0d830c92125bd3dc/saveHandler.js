"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const tableName = process.env.TODO_TABLE_NAME;
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: 'ap-southeast-2' });
// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
const handler = async (event) => {
    console.info("EVENT\n" + tableName);
    const bodypram = JSON.parse(event.body);
    const customerId = bodypram.custometId;
    const customerName = bodypram.custometName;
    var params = {
        TableName: tableName,
        Item: {
            CUSTOMER_ID: customerId,
            CUSTOMER_NAME: customerName
        }
    };
    try {
        let response;
        if (event.httpMethod === 'POST') {
            response = await ddb.put(params);
            // const tryThis = await saveDevice(event);
            // console.info(tryThis)
            // const result = await client.send(new PutCommand(params));
            // if (result.$metadata && result.$metadata.httpStatusCode && result.$metadata.httpStatusCode === 200) {
            //   return true;
            // } else {
            //   return false;
            // }
        }
        return {
            statusCode: 200,
            body: `${tableName} Success`,
        };
    }
    catch (e) {
        return {
            statusCode: 500,
            body: e === 500 ? 'Invalid Request Body' : 'Something went wrong',
        };
    }
};
exports.handler = handler;
// export async function saveDevice(event : object): Promise<boolean> {
//   try {
//     const result = await client.send(new PutCommand(params));
//     if (result.$metadata && result.$metadata.httpStatusCode && result.$metadata.httpStatusCode === 200) {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (err: any) {
//     throw err;
//   }
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQTtBQUM3QyxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDN0Isa0JBQWtCO0FBQ2xCLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUMsTUFBTSxFQUFFLGdCQUFnQixFQUFDLENBQUMsQ0FBQztBQUU5QyxxQ0FBcUM7QUFDckMsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUMsVUFBVSxFQUFFLFlBQVksRUFBQyxDQUFDLENBQUM7QUFJaEQsTUFBTSxPQUFPLEdBQVksS0FBSyxFQUFFLEtBQVcsRUFBRSxFQUFFO0lBQ3RELE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxDQUFBO0lBRW5DLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZDLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDdkMsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQTtJQUMxQyxJQUFJLE1BQU0sR0FBRztRQUNYLFNBQVMsRUFBRSxTQUFTO1FBQ3BCLElBQUksRUFBRTtZQUNKLFdBQVcsRUFBRyxVQUFVO1lBQ3hCLGFBQWEsRUFBRyxZQUFZO1NBQzdCO0tBQ0YsQ0FBQztJQUNBLElBQUk7UUFDRixJQUFJLFFBQVEsQ0FBQztRQUNiLElBQUksS0FBSyxDQUFDLFVBQVUsS0FBSyxNQUFNLEVBQUU7WUFDL0IsUUFBUSxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUdqQywyQ0FBMkM7WUFDM0Msd0JBQXdCO1lBQ3hCLDREQUE0RDtZQUM1RCx3R0FBd0c7WUFDeEcsaUJBQWlCO1lBQ2pCLFdBQVc7WUFDWCxrQkFBa0I7WUFDbEIsSUFBSTtTQUNMO1FBQ0QsT0FBTztZQUNILFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLEdBQUcsU0FBUyxVQUFVO1NBQzdCLENBQUM7S0FDTDtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTztZQUNILFVBQVUsRUFBRyxHQUFHO1lBQ2hCLElBQUksRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsc0JBQXNCO1NBQ2xFLENBQUM7S0FDTDtBQUVILENBQUMsQ0FBQztBQXZDVyxRQUFBLE9BQU8sV0F1Q2xCO0FBT0YsdUVBQXVFO0FBSXZFLFVBQVU7QUFDVixnRUFBZ0U7QUFDaEUsNEdBQTRHO0FBQzVHLHFCQUFxQjtBQUNyQixlQUFlO0FBQ2Ysc0JBQXNCO0FBQ3RCLFFBQVE7QUFDUix5QkFBeUI7QUFDekIsaUJBQWlCO0FBQ2pCLE1BQU07QUFDTixJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XG5cblxuY29uc3QgdGFibGVOYW1lID0gcHJvY2Vzcy5lbnYuVE9ET19UQUJMRV9OQU1FXG52YXIgQVdTID0gcmVxdWlyZSgnYXdzLXNkaycpO1xuLy8gU2V0IHRoZSByZWdpb24gXG5BV1MuY29uZmlnLnVwZGF0ZSh7cmVnaW9uOiAnYXAtc291dGhlYXN0LTInfSk7XG5cbi8vIENyZWF0ZSB0aGUgRHluYW1vREIgc2VydmljZSBvYmplY3RcbnZhciBkZGIgPSBuZXcgQVdTLkR5bmFtb0RCKHthcGlWZXJzaW9uOiAnMjAxMi0wOC0xMCd9KTtcblxuXG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBIYW5kbGVyID0gYXN5bmMgKGV2ZW50IDogYW55KSA9PiB7XG5jb25zb2xlLmluZm8oXCJFVkVOVFxcblwiICsgdGFibGVOYW1lKVxuXG5jb25zdCBib2R5cHJhbSA9IEpTT04ucGFyc2UoZXZlbnQuYm9keSlcbmNvbnN0IGN1c3RvbWVySWQgPSBib2R5cHJhbS5jdXN0b21ldElkO1xuY29uc3QgY3VzdG9tZXJOYW1lID0gYm9keXByYW0uY3VzdG9tZXROYW1lXG52YXIgcGFyYW1zID0ge1xuICBUYWJsZU5hbWU6IHRhYmxlTmFtZSxcbiAgSXRlbToge1xuICAgIENVU1RPTUVSX0lEIDogY3VzdG9tZXJJZCxcbiAgICBDVVNUT01FUl9OQU1FIDogY3VzdG9tZXJOYW1lXG4gIH1cbn07XG4gIHRyeSB7XG4gICAgbGV0IHJlc3BvbnNlO1xuICAgIGlmIChldmVudC5odHRwTWV0aG9kID09PSAnUE9TVCcpIHtcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgZGRiLnB1dChwYXJhbXMpO1xuXG5cbiAgICAgIC8vIGNvbnN0IHRyeVRoaXMgPSBhd2FpdCBzYXZlRGV2aWNlKGV2ZW50KTtcbiAgICAgIC8vIGNvbnNvbGUuaW5mbyh0cnlUaGlzKVxuICAgICAgLy8gY29uc3QgcmVzdWx0ID0gYXdhaXQgY2xpZW50LnNlbmQobmV3IFB1dENvbW1hbmQocGFyYW1zKSk7XG4gICAgICAvLyBpZiAocmVzdWx0LiRtZXRhZGF0YSAmJiByZXN1bHQuJG1ldGFkYXRhLmh0dHBTdGF0dXNDb2RlICYmIHJlc3VsdC4kbWV0YWRhdGEuaHR0cFN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgLy8gICByZXR1cm4gdHJ1ZTtcbiAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAvLyAgIHJldHVybiBmYWxzZTtcbiAgICAgIC8vIH1cbiAgICB9IFxuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keTogYCR7dGFibGVOYW1lfSBTdWNjZXNzYCxcbiAgICAgIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAgNTAwLFxuICAgICAgICBib2R5OiBlID09PSA1MDAgPyAnSW52YWxpZCBSZXF1ZXN0IEJvZHknIDogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyxcbiAgICAgIH07XG4gIH1cbiAgXG59O1xuXG5cblxuXG5cblxuLy8gZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVEZXZpY2UoZXZlbnQgOiBvYmplY3QpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgXG5cblxuLy8gICB0cnkge1xuLy8gICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNsaWVudC5zZW5kKG5ldyBQdXRDb21tYW5kKHBhcmFtcykpO1xuLy8gICAgIGlmIChyZXN1bHQuJG1ldGFkYXRhICYmIHJlc3VsdC4kbWV0YWRhdGEuaHR0cFN0YXR1c0NvZGUgJiYgcmVzdWx0LiRtZXRhZGF0YS5odHRwU3RhdHVzQ29kZSA9PT0gMjAwKSB7XG4vLyAgICAgICByZXR1cm4gdHJ1ZTtcbi8vICAgICB9IGVsc2Uge1xuLy8gICAgICAgcmV0dXJuIGZhbHNlO1xuLy8gICAgIH1cbi8vICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbi8vICAgICB0aHJvdyBlcnI7XG4vLyAgIH1cbi8vIH1cbiJdfQ==