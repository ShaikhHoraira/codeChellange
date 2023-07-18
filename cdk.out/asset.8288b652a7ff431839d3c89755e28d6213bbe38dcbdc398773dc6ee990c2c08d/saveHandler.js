"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.handler = void 0;
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const client = new DynamoDBClient({});
const docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
const tableName = process.env.TODO_TABLE_NAME;
// var AWS = require('aws-sdk');
// // Set the region 
// AWS.config.update({region: 'ap-southeast-2'});
// // Create the DynamoDB service object
// var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const handler = async (event) => {
    console.info("EVENT\n" + tableName);
    const bodypram = JSON.parse(event.body);
    const customerId = bodypram.custometId;
    const customerName = bodypram.custometName;
    // var params = {
    //   TableName: tableName,
    //   Item: {
    //     CUSTOMER_ID : customerId,
    //     CUSTOMER_NAME : customerName
    //   }
    // };
    const command = new lib_dynamodb_1.PutCommand({
        TableName: tableName,
        Item: {
            CUSTOMER_ID: customerId,
            CUSTOMER_NAME: customerName
        },
    });
    try {
        // let response;
        const response = await docClient.send(command);
        console.info(response);
        return response;
        // if (event.httpMethod === 'POST') {
        // response = await ddb.put(params).promise();
        // return response;
        // const tryThis = await saveDevice(event);
        // console.info(tryThis)
        // const result = await client.send(new PutCommand(params));
        // if (result.$metadata && result.$metadata.httpStatusCode && result.$metadata.httpStatusCode === 200) {
        //   return true;
        // } else {
        //   return false;
        // }
        // } 
        // return {
        //     statusCode: 200,
        //     body: JSON.stringify(response )
        //   };
    }
    catch (e) {
        return {
            statusCode: 500,
            body: e === 500 ? 'Invalid Request Body' : 'Something went wrong',
        };
    }
};
exports.handler = handler;
const main = async () => {
};
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxNQUFNLEVBQUUsY0FBYyxFQUFFLEdBQUcsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFFL0Qsd0RBQTJFO0FBRTNFLE1BQU0sTUFBTSxHQUFHLElBQUksY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3RDLE1BQU0sU0FBUyxHQUFHLHFDQUFzQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUV0RCxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQTtBQUM3QyxnQ0FBZ0M7QUFDaEMscUJBQXFCO0FBQ3JCLGlEQUFpRDtBQUVqRCx3Q0FBd0M7QUFDeEMsMERBQTBEO0FBSW5ELE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFXLEVBQUUsRUFBRTtJQUN0RCxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQTtJQUVuQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QyxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQ3ZDLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUE7SUFDMUMsaUJBQWlCO0lBQ2pCLDBCQUEwQjtJQUMxQixZQUFZO0lBQ1osZ0NBQWdDO0lBQ2hDLG1DQUFtQztJQUNuQyxNQUFNO0lBQ04sS0FBSztJQUNMLE1BQU0sT0FBTyxHQUFHLElBQUkseUJBQVUsQ0FBQztRQUM3QixTQUFTLEVBQUUsU0FBUztRQUNwQixJQUFJLEVBQUU7WUFDSixXQUFXLEVBQUcsVUFBVTtZQUN4QixhQUFhLEVBQUcsWUFBWTtTQUM3QjtLQUNGLENBQUMsQ0FBQztJQUNELElBQUk7UUFDRixnQkFBZ0I7UUFFbEIsTUFBTSxRQUFRLEdBQUcsTUFBTSxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9DLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkIsT0FBTyxRQUFRLENBQUM7UUFDZCxxQ0FBcUM7UUFFbkMsOENBQThDO1FBQzlDLG1CQUFtQjtRQUVuQiwyQ0FBMkM7UUFDM0Msd0JBQXdCO1FBQ3hCLDREQUE0RDtRQUM1RCx3R0FBd0c7UUFDeEcsaUJBQWlCO1FBQ2pCLFdBQVc7UUFDWCxrQkFBa0I7UUFDbEIsSUFBSTtRQUNOLEtBQUs7UUFDTCxXQUFXO1FBQ1gsdUJBQXVCO1FBQ3ZCLHNDQUFzQztRQUN0QyxPQUFPO0tBQ1I7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU87WUFDSCxVQUFVLEVBQUcsR0FBRztZQUNoQixJQUFJLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtTQUNsRSxDQUFDO0tBQ0w7QUFFSCxDQUFDLENBQUM7QUFuRFcsUUFBQSxPQUFPLFdBbURsQjtBQVNLLE1BQU0sSUFBSSxHQUFHLEtBQUssSUFBSSxFQUFFO0FBSS9CLENBQUMsQ0FBQztBQUpXLFFBQUEsSUFBSSxRQUlmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XG5jb25zdCB7IER5bmFtb0RCQ2xpZW50IH0gPSByZXF1aXJlKCdAYXdzLXNkay9jbGllbnQtZHluYW1vZGInKTtcblxuaW1wb3J0IHsgUHV0Q29tbWFuZCwgRHluYW1vREJEb2N1bWVudENsaWVudCB9IGZyb20gXCJAYXdzLXNkay9saWItZHluYW1vZGJcIjtcblxuY29uc3QgY2xpZW50ID0gbmV3IER5bmFtb0RCQ2xpZW50KHt9KTtcbmNvbnN0IGRvY0NsaWVudCA9IER5bmFtb0RCRG9jdW1lbnRDbGllbnQuZnJvbShjbGllbnQpO1xuXG5jb25zdCB0YWJsZU5hbWUgPSBwcm9jZXNzLmVudi5UT0RPX1RBQkxFX05BTUVcbi8vIHZhciBBV1MgPSByZXF1aXJlKCdhd3Mtc2RrJyk7XG4vLyAvLyBTZXQgdGhlIHJlZ2lvbiBcbi8vIEFXUy5jb25maWcudXBkYXRlKHtyZWdpb246ICdhcC1zb3V0aGVhc3QtMid9KTtcblxuLy8gLy8gQ3JlYXRlIHRoZSBEeW5hbW9EQiBzZXJ2aWNlIG9iamVjdFxuLy8gdmFyIGRkYiA9IG5ldyBBV1MuRHluYW1vREIoe2FwaVZlcnNpb246ICcyMDEyLTA4LTEwJ30pO1xuXG5cblxuZXhwb3J0IGNvbnN0IGhhbmRsZXI6IEhhbmRsZXIgPSBhc3luYyAoZXZlbnQgOiBhbnkpID0+IHtcbmNvbnNvbGUuaW5mbyhcIkVWRU5UXFxuXCIgKyB0YWJsZU5hbWUpXG5cbmNvbnN0IGJvZHlwcmFtID0gSlNPTi5wYXJzZShldmVudC5ib2R5KVxuY29uc3QgY3VzdG9tZXJJZCA9IGJvZHlwcmFtLmN1c3RvbWV0SWQ7XG5jb25zdCBjdXN0b21lck5hbWUgPSBib2R5cHJhbS5jdXN0b21ldE5hbWVcbi8vIHZhciBwYXJhbXMgPSB7XG4vLyAgIFRhYmxlTmFtZTogdGFibGVOYW1lLFxuLy8gICBJdGVtOiB7XG4vLyAgICAgQ1VTVE9NRVJfSUQgOiBjdXN0b21lcklkLFxuLy8gICAgIENVU1RPTUVSX05BTUUgOiBjdXN0b21lck5hbWVcbi8vICAgfVxuLy8gfTtcbmNvbnN0IGNvbW1hbmQgPSBuZXcgUHV0Q29tbWFuZCh7XG4gIFRhYmxlTmFtZTogdGFibGVOYW1lLFxuICBJdGVtOiB7XG4gICAgQ1VTVE9NRVJfSUQgOiBjdXN0b21lcklkLFxuICAgIENVU1RPTUVSX05BTUUgOiBjdXN0b21lck5hbWVcbiAgfSxcbn0pO1xuICB0cnkge1xuICAgIC8vIGxldCByZXNwb25zZTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRvY0NsaWVudC5zZW5kKGNvbW1hbmQpO1xuICBjb25zb2xlLmluZm8ocmVzcG9uc2UpO1xuICByZXR1cm4gcmVzcG9uc2U7XG4gICAgLy8gaWYgKGV2ZW50Lmh0dHBNZXRob2QgPT09ICdQT1NUJykge1xuICAgICAgXG4gICAgICAvLyByZXNwb25zZSA9IGF3YWl0IGRkYi5wdXQocGFyYW1zKS5wcm9taXNlKCk7XG4gICAgICAvLyByZXR1cm4gcmVzcG9uc2U7XG5cbiAgICAgIC8vIGNvbnN0IHRyeVRoaXMgPSBhd2FpdCBzYXZlRGV2aWNlKGV2ZW50KTtcbiAgICAgIC8vIGNvbnNvbGUuaW5mbyh0cnlUaGlzKVxuICAgICAgLy8gY29uc3QgcmVzdWx0ID0gYXdhaXQgY2xpZW50LnNlbmQobmV3IFB1dENvbW1hbmQocGFyYW1zKSk7XG4gICAgICAvLyBpZiAocmVzdWx0LiRtZXRhZGF0YSAmJiByZXN1bHQuJG1ldGFkYXRhLmh0dHBTdGF0dXNDb2RlICYmIHJlc3VsdC4kbWV0YWRhdGEuaHR0cFN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgLy8gICByZXR1cm4gdHJ1ZTtcbiAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAvLyAgIHJldHVybiBmYWxzZTtcbiAgICAgIC8vIH1cbiAgICAvLyB9IFxuICAgIC8vIHJldHVybiB7XG4gICAgLy8gICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAvLyAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UgKVxuICAgIC8vICAgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6ICA1MDAsXG4gICAgICAgIGJvZHk6IGUgPT09IDUwMCA/ICdJbnZhbGlkIFJlcXVlc3QgQm9keScgOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnLFxuICAgICAgfTtcbiAgfVxuICBcbn07XG5cblxuXG5cblxuXG5cblxuZXhwb3J0IGNvbnN0IG1haW4gPSBhc3luYyAoKSA9PiB7XG4gIFxuXG4gIFxufTtcblxuIl19