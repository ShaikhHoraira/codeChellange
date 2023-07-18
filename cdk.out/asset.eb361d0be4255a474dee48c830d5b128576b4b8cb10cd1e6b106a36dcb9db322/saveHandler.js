"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveDevice = exports.handler = void 0;
// import {ManageSaveData} from '../modules/save_data';
// import {ManageGetData} from '../modules/get_data';
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const handler = async (event) => {
    // const manageSaveData = new ManageSaveData(process.env.TODO_TABLE_NAME);
    // const manageGetData = new ManageGetData();
    console.info("EVENT\n" + event.body.data);
    try {
        let response;
        if (event.httpMethod === 'POST') {
            // response = await manageSaveData.saveDevice(event.dynamodb.tableName,'');
            // console.log("🚀 ~ file: save_retrive_address.ts:12 ~ constTuHandler:Handler= ~ response:", response)
            const tryThis = await saveDevice(event);
            console.info(tryThis);
        }
        return {
            statusCode: 200,
            body: `${event.body} Success`,
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
async function saveDevice(event) {
    const client = lib_dynamodb_1.DynamoDBDocumentClient.from(new client_dynamodb_1.DynamoDBClient({ region: process.env.AWS_REGION }));
    const params = {
        TableName: process.env.TODO_TABLE_NAME,
        Item: {
            DeviceToken: event,
            Key: event,
            ForgeId: event || 'anonymous',
        },
    };
    try {
        const result = await client.send(new lib_dynamodb_1.PutCommand(params));
        if (result.$metadata && result.$metadata.httpStatusCode && result.$metadata.httpStatusCode === 200) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        throw err;
    }
}
exports.saveDevice = saveDevice;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1REFBdUQ7QUFDdkQscURBQXFEO0FBQ3JELDhEQUEwRDtBQUUxRCx3REFJK0I7QUFFeEIsTUFBTSxPQUFPLEdBQVksS0FBSyxFQUFFLEtBQVcsRUFBRSxFQUFFO0lBQ3RELDBFQUEwRTtJQUMxRSw2Q0FBNkM7SUFDN0MsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUV2QyxJQUFJO1FBQ0YsSUFBSSxRQUFRLENBQUM7UUFDYixJQUFJLEtBQUssQ0FBQyxVQUFVLEtBQUssTUFBTSxFQUFFO1lBQy9CLDJFQUEyRTtZQUMzRSx1R0FBdUc7WUFDdkcsTUFBTSxPQUFPLEdBQUcsTUFBTSxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDdkMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtTQUN0QjtRQUNELE9BQU87WUFDSCxVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxJQUFJLFVBQVU7U0FDOUIsQ0FBQztLQUNMO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPO1lBQ0gsVUFBVSxFQUFHLEdBQUc7WUFDaEIsSUFBSSxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxzQkFBc0I7U0FDbEUsQ0FBQztLQUNMO0FBRUgsQ0FBQyxDQUFDO0FBeEJXLFFBQUEsT0FBTyxXQXdCbEI7QUFFSyxLQUFLLFVBQVUsVUFBVSxDQUFDLEtBQWM7SUFDN0MsTUFBTSxNQUFNLEdBQUcscUNBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksZ0NBQWMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuRyxNQUFNLE1BQU0sR0FBb0I7UUFDOUIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZ0I7UUFDdkMsSUFBSSxFQUFFO1lBQ0osV0FBVyxFQUFFLEtBQUs7WUFDbEIsR0FBRyxFQUFFLEtBQUs7WUFDVixPQUFPLEVBQUUsS0FBSyxJQUFJLFdBQVc7U0FDOUI7S0FDRixDQUFDO0lBRUYsSUFBSTtRQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLHlCQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN6RCxJQUFJLE1BQU0sQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEtBQUssR0FBRyxFQUFFO1lBQ2xHLE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTTtZQUNMLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7S0FDRjtJQUFDLE9BQU8sR0FBUSxFQUFFO1FBQ2pCLE1BQU0sR0FBRyxDQUFDO0tBQ1g7QUFDSCxDQUFDO0FBckJELGdDQXFCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuLy8gaW1wb3J0IHtNYW5hZ2VTYXZlRGF0YX0gZnJvbSAnLi4vbW9kdWxlcy9zYXZlX2RhdGEnO1xuLy8gaW1wb3J0IHtNYW5hZ2VHZXREYXRhfSBmcm9tICcuLi9tb2R1bGVzL2dldF9kYXRhJztcbmltcG9ydCB7IER5bmFtb0RCQ2xpZW50IH0gZnJvbSAnQGF3cy1zZGsvY2xpZW50LWR5bmFtb2RiJztcblxuaW1wb3J0IHtcbiAgRHluYW1vREJEb2N1bWVudENsaWVudCxcbiAgUHV0Q29tbWFuZCxcbiAgUHV0Q29tbWFuZElucHV0LFxufSBmcm9tICdAYXdzLXNkay9saWItZHluYW1vZGInO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudCA6IGFueSkgPT4ge1xuLy8gY29uc3QgbWFuYWdlU2F2ZURhdGEgPSBuZXcgTWFuYWdlU2F2ZURhdGEocHJvY2Vzcy5lbnYuVE9ET19UQUJMRV9OQU1FKTtcbi8vIGNvbnN0IG1hbmFnZUdldERhdGEgPSBuZXcgTWFuYWdlR2V0RGF0YSgpO1xuY29uc29sZS5pbmZvKFwiRVZFTlRcXG5cIiArIGV2ZW50LmJvZHkuZGF0YSlcblxuICB0cnkge1xuICAgIGxldCByZXNwb25zZTtcbiAgICBpZiAoZXZlbnQuaHR0cE1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgICAvLyByZXNwb25zZSA9IGF3YWl0IG1hbmFnZVNhdmVEYXRhLnNhdmVEZXZpY2UoZXZlbnQuZHluYW1vZGIudGFibGVOYW1lLCcnKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwi8J+agCB+IGZpbGU6IHNhdmVfcmV0cml2ZV9hZGRyZXNzLnRzOjEyIH4gY29uc3RUdUhhbmRsZXI6SGFuZGxlcj0gfiByZXNwb25zZTpcIiwgcmVzcG9uc2UpXG4gICAgICBjb25zdCB0cnlUaGlzID0gYXdhaXQgc2F2ZURldmljZShldmVudClcbiAgICAgIGNvbnNvbGUuaW5mbyh0cnlUaGlzKVxuICAgIH0gXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiBgJHtldmVudC5ib2R5fSBTdWNjZXNzYCxcbiAgICAgIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAgNTAwLFxuICAgICAgICBib2R5OiBlID09PSA1MDAgPyAnSW52YWxpZCBSZXF1ZXN0IEJvZHknIDogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyxcbiAgICAgIH07XG4gIH1cbiAgXG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZURldmljZShldmVudCA6IG9iamVjdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICBjb25zdCBjbGllbnQgPSBEeW5hbW9EQkRvY3VtZW50Q2xpZW50LmZyb20obmV3IER5bmFtb0RCQ2xpZW50KHsgcmVnaW9uOiBwcm9jZXNzLmVudi5BV1NfUkVHSU9OIH0pKTtcbiAgY29uc3QgcGFyYW1zOiBQdXRDb21tYW5kSW5wdXQgPSB7XG4gICAgVGFibGVOYW1lOiBwcm9jZXNzLmVudi5UT0RPX1RBQkxFX05BTUUhLFxuICAgIEl0ZW06IHtcbiAgICAgIERldmljZVRva2VuOiBldmVudCxcbiAgICAgIEtleTogZXZlbnQsXG4gICAgICBGb3JnZUlkOiBldmVudCB8fCAnYW5vbnltb3VzJyxcbiAgICB9LFxuICB9O1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2xpZW50LnNlbmQobmV3IFB1dENvbW1hbmQocGFyYW1zKSk7XG4gICAgaWYgKHJlc3VsdC4kbWV0YWRhdGEgJiYgcmVzdWx0LiRtZXRhZGF0YS5odHRwU3RhdHVzQ29kZSAmJiByZXN1bHQuJG1ldGFkYXRhLmh0dHBTdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgIHRocm93IGVycjtcbiAgfVxufVxuIl19