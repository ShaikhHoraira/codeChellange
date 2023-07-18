"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.handler = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const client = new client_dynamodb_1.DynamoDBClient({});
const docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
const tableName = process.env.TODO_TABLE_NAME;
// var AWS = require('aws-sdk');
// // Set the region 
// AWS.config.update({region: 'ap-southeast-2'});
// // Create the DynamoDB service object
// var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const command = new lib_dynamodb_1.PutCommand({
    TableName: tableName,
    Item: {
        CommonName: "Shiba Inu",
    },
});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw4REFBMEQ7QUFDMUQsd0RBQTJFO0FBRTNFLE1BQU0sTUFBTSxHQUFHLElBQUksZ0NBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN0QyxNQUFNLFNBQVMsR0FBRyxxQ0FBc0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFdEQsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUE7QUFDN0MsZ0NBQWdDO0FBQ2hDLHFCQUFxQjtBQUNyQixpREFBaUQ7QUFFakQsd0NBQXdDO0FBQ3hDLDBEQUEwRDtBQUUxRCxNQUFNLE9BQU8sR0FBRyxJQUFJLHlCQUFVLENBQUM7SUFDN0IsU0FBUyxFQUFFLFNBQVM7SUFDcEIsSUFBSSxFQUFFO1FBQ0osVUFBVSxFQUFFLFdBQVc7S0FDeEI7Q0FDRixDQUFDLENBQUM7QUFFSSxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVyxFQUFFLEVBQUU7SUFDdEQsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUE7SUFFbkMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkMsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUN2QyxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFBO0lBQzFDLElBQUksTUFBTSxHQUFHO1FBQ1gsU0FBUyxFQUFFLFNBQVM7UUFDcEIsSUFBSSxFQUFFO1lBQ0osV0FBVyxFQUFHLFVBQVU7WUFDeEIsYUFBYSxFQUFHLFlBQVk7U0FDN0I7S0FDRixDQUFDO0lBQ0EsSUFBSTtRQUNGLGdCQUFnQjtRQUVoQixNQUFNLFFBQVEsR0FBRyxNQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakQsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2QixPQUFPLFFBQVEsQ0FBQztRQUNkLHFDQUFxQztRQUVuQyw4Q0FBOEM7UUFDOUMsbUJBQW1CO1FBRW5CLDJDQUEyQztRQUMzQyx3QkFBd0I7UUFDeEIsNERBQTREO1FBQzVELHdHQUF3RztRQUN4RyxpQkFBaUI7UUFDakIsV0FBVztRQUNYLGtCQUFrQjtRQUNsQixJQUFJO1FBQ04sS0FBSztRQUNMLFdBQVc7UUFDWCx1QkFBdUI7UUFDdkIsc0NBQXNDO1FBQ3RDLE9BQU87S0FDUjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTztZQUNILFVBQVUsRUFBRyxHQUFHO1lBQ2hCLElBQUksRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsc0JBQXNCO1NBQ2xFLENBQUM7S0FDTDtBQUVILENBQUMsQ0FBQztBQTVDVyxRQUFBLE9BQU8sV0E0Q2xCO0FBU0ssTUFBTSxJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7QUFJL0IsQ0FBQyxDQUFDO0FBSlcsUUFBQSxJQUFJLFFBSWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcbmltcG9ydCB7IER5bmFtb0RCQ2xpZW50IH0gZnJvbSBcIkBhd3Mtc2RrL2NsaWVudC1keW5hbW9kYlwiO1xuaW1wb3J0IHsgUHV0Q29tbWFuZCwgRHluYW1vREJEb2N1bWVudENsaWVudCB9IGZyb20gXCJAYXdzLXNkay9saWItZHluYW1vZGJcIjtcblxuY29uc3QgY2xpZW50ID0gbmV3IER5bmFtb0RCQ2xpZW50KHt9KTtcbmNvbnN0IGRvY0NsaWVudCA9IER5bmFtb0RCRG9jdW1lbnRDbGllbnQuZnJvbShjbGllbnQpO1xuXG5jb25zdCB0YWJsZU5hbWUgPSBwcm9jZXNzLmVudi5UT0RPX1RBQkxFX05BTUVcbi8vIHZhciBBV1MgPSByZXF1aXJlKCdhd3Mtc2RrJyk7XG4vLyAvLyBTZXQgdGhlIHJlZ2lvbiBcbi8vIEFXUy5jb25maWcudXBkYXRlKHtyZWdpb246ICdhcC1zb3V0aGVhc3QtMid9KTtcblxuLy8gLy8gQ3JlYXRlIHRoZSBEeW5hbW9EQiBzZXJ2aWNlIG9iamVjdFxuLy8gdmFyIGRkYiA9IG5ldyBBV1MuRHluYW1vREIoe2FwaVZlcnNpb246ICcyMDEyLTA4LTEwJ30pO1xuXG5jb25zdCBjb21tYW5kID0gbmV3IFB1dENvbW1hbmQoe1xuICBUYWJsZU5hbWU6IHRhYmxlTmFtZSxcbiAgSXRlbToge1xuICAgIENvbW1vbk5hbWU6IFwiU2hpYmEgSW51XCIsXG4gIH0sXG59KTtcblxuZXhwb3J0IGNvbnN0IGhhbmRsZXI6IEhhbmRsZXIgPSBhc3luYyAoZXZlbnQgOiBhbnkpID0+IHtcbmNvbnNvbGUuaW5mbyhcIkVWRU5UXFxuXCIgKyB0YWJsZU5hbWUpXG5cbmNvbnN0IGJvZHlwcmFtID0gSlNPTi5wYXJzZShldmVudC5ib2R5KVxuY29uc3QgY3VzdG9tZXJJZCA9IGJvZHlwcmFtLmN1c3RvbWV0SWQ7XG5jb25zdCBjdXN0b21lck5hbWUgPSBib2R5cHJhbS5jdXN0b21ldE5hbWVcbnZhciBwYXJhbXMgPSB7XG4gIFRhYmxlTmFtZTogdGFibGVOYW1lLFxuICBJdGVtOiB7XG4gICAgQ1VTVE9NRVJfSUQgOiBjdXN0b21lcklkLFxuICAgIENVU1RPTUVSX05BTUUgOiBjdXN0b21lck5hbWVcbiAgfVxufTtcbiAgdHJ5IHtcbiAgICAvLyBsZXQgcmVzcG9uc2U7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRvY0NsaWVudC5zZW5kKGNvbW1hbmQpO1xuICBjb25zb2xlLmluZm8ocmVzcG9uc2UpO1xuICByZXR1cm4gcmVzcG9uc2U7XG4gICAgLy8gaWYgKGV2ZW50Lmh0dHBNZXRob2QgPT09ICdQT1NUJykge1xuICAgICAgXG4gICAgICAvLyByZXNwb25zZSA9IGF3YWl0IGRkYi5wdXQocGFyYW1zKS5wcm9taXNlKCk7XG4gICAgICAvLyByZXR1cm4gcmVzcG9uc2U7XG5cbiAgICAgIC8vIGNvbnN0IHRyeVRoaXMgPSBhd2FpdCBzYXZlRGV2aWNlKGV2ZW50KTtcbiAgICAgIC8vIGNvbnNvbGUuaW5mbyh0cnlUaGlzKVxuICAgICAgLy8gY29uc3QgcmVzdWx0ID0gYXdhaXQgY2xpZW50LnNlbmQobmV3IFB1dENvbW1hbmQocGFyYW1zKSk7XG4gICAgICAvLyBpZiAocmVzdWx0LiRtZXRhZGF0YSAmJiByZXN1bHQuJG1ldGFkYXRhLmh0dHBTdGF0dXNDb2RlICYmIHJlc3VsdC4kbWV0YWRhdGEuaHR0cFN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgLy8gICByZXR1cm4gdHJ1ZTtcbiAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAvLyAgIHJldHVybiBmYWxzZTtcbiAgICAgIC8vIH1cbiAgICAvLyB9IFxuICAgIC8vIHJldHVybiB7XG4gICAgLy8gICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAvLyAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UgKVxuICAgIC8vICAgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6ICA1MDAsXG4gICAgICAgIGJvZHk6IGUgPT09IDUwMCA/ICdJbnZhbGlkIFJlcXVlc3QgQm9keScgOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnLFxuICAgICAgfTtcbiAgfVxuICBcbn07XG5cblxuXG5cblxuXG5cblxuZXhwb3J0IGNvbnN0IG1haW4gPSBhc3luYyAoKSA9PiB7XG4gIFxuXG4gIFxufTtcblxuIl19