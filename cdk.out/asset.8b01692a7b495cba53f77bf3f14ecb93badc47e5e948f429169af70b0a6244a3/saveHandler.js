"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveDevice = exports.handler = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const client = lib_dynamodb_1.DynamoDBDocumentClient.from(new client_dynamodb_1.DynamoDBClient({ region: 'ap-southeast-2' }));
const tableName = process.env.TODO_TABLE_NAME;
const params = {
    TableName: tableName,
    Item: {
        DeviceToken: 'event',
        Key: 'event',
        ForgeId: 'event' || 'anonymous',
    },
};
const handler = async (event) => {
    console.info("EVENT\n" + event.body.data);
    try {
        let response;
        if (event.httpMethod === 'POST') {
            // const tryThis = await saveDevice(event);
            // console.info(tryThis)
            const result = await client.send(new lib_dynamodb_1.PutCommand(params));
            if (result.$metadata && result.$metadata.httpStatusCode && result.$metadata.httpStatusCode === 200) {
                return true;
            }
            else {
                return false;
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw4REFBMEQ7QUFFMUQsd0RBSStCO0FBQy9CLE1BQU0sTUFBTSxHQUFHLHFDQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLGdDQUFjLENBQUMsRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDN0YsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUE7QUFDN0MsTUFBTSxNQUFNLEdBQW9CO0lBQzlCLFNBQVMsRUFBRSxTQUFTO0lBQ3BCLElBQUksRUFBRTtRQUNKLFdBQVcsRUFBRSxPQUFPO1FBQ3BCLEdBQUcsRUFBRSxPQUFPO1FBQ1osT0FBTyxFQUFFLE9BQU8sSUFBSSxXQUFXO0tBQ2hDO0NBQ0YsQ0FBQztBQUNLLE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFXLEVBQUUsRUFBRTtJQUN0RCxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBRXZDLElBQUk7UUFDRixJQUFJLFFBQVEsQ0FBQztRQUNiLElBQUksS0FBSyxDQUFDLFVBQVUsS0FBSyxNQUFNLEVBQUU7WUFDL0IsMkNBQTJDO1lBQzNDLHdCQUF3QjtZQUd4QixNQUFNLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSx5QkFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDekQsSUFBSSxNQUFNLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxLQUFLLEdBQUcsRUFBRTtnQkFDbEcsT0FBTyxJQUFJLENBQUM7YUFDYjtpQkFBTTtnQkFDTCxPQUFPLEtBQUssQ0FBQzthQUNkO1NBQ0Y7UUFDRCxPQUFPO1lBQ0gsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsSUFBSSxVQUFVO1NBQzlCLENBQUM7S0FDTDtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTztZQUNILFVBQVUsRUFBRyxHQUFHO1lBQ2hCLElBQUksRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsc0JBQXNCO1NBQ2xFLENBQUM7S0FDTDtBQUVILENBQUMsQ0FBQztBQTVCVyxRQUFBLE9BQU8sV0E0QmxCO0FBT0ssS0FBSyxVQUFVLFVBQVUsQ0FBQyxLQUFjO0lBSTdDLElBQUk7UUFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSx5QkFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDekQsSUFBSSxNQUFNLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxLQUFLLEdBQUcsRUFBRTtZQUNsRyxPQUFPLElBQUksQ0FBQztTQUNiO2FBQU07WUFDTCxPQUFPLEtBQUssQ0FBQztTQUNkO0tBQ0Y7SUFBQyxPQUFPLEdBQVEsRUFBRTtRQUNqQixNQUFNLEdBQUcsQ0FBQztLQUNYO0FBQ0gsQ0FBQztBQWRELGdDQWNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XG5pbXBvcnQgeyBEeW5hbW9EQkNsaWVudCB9IGZyb20gJ0Bhd3Mtc2RrL2NsaWVudC1keW5hbW9kYic7XG5cbmltcG9ydCB7XG4gIER5bmFtb0RCRG9jdW1lbnRDbGllbnQsXG4gIFB1dENvbW1hbmQsXG4gIFB1dENvbW1hbmRJbnB1dCxcbn0gZnJvbSAnQGF3cy1zZGsvbGliLWR5bmFtb2RiJztcbmNvbnN0IGNsaWVudCA9IER5bmFtb0RCRG9jdW1lbnRDbGllbnQuZnJvbShuZXcgRHluYW1vREJDbGllbnQoeyByZWdpb246ICdhcC1zb3V0aGVhc3QtMicgfSkpO1xuY29uc3QgdGFibGVOYW1lID0gcHJvY2Vzcy5lbnYuVE9ET19UQUJMRV9OQU1FXG5jb25zdCBwYXJhbXM6IFB1dENvbW1hbmRJbnB1dCA9IHtcbiAgVGFibGVOYW1lOiB0YWJsZU5hbWUsXG4gIEl0ZW06IHtcbiAgICBEZXZpY2VUb2tlbjogJ2V2ZW50JyxcbiAgICBLZXk6ICdldmVudCcsXG4gICAgRm9yZ2VJZDogJ2V2ZW50JyB8fCAnYW5vbnltb3VzJyxcbiAgfSxcbn07XG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudCA6IGFueSkgPT4ge1xuY29uc29sZS5pbmZvKFwiRVZFTlRcXG5cIiArIGV2ZW50LmJvZHkuZGF0YSlcblxuICB0cnkge1xuICAgIGxldCByZXNwb25zZTtcbiAgICBpZiAoZXZlbnQuaHR0cE1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgICAvLyBjb25zdCB0cnlUaGlzID0gYXdhaXQgc2F2ZURldmljZShldmVudCk7XG4gICAgICAvLyBjb25zb2xlLmluZm8odHJ5VGhpcylcblxuXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjbGllbnQuc2VuZChuZXcgUHV0Q29tbWFuZChwYXJhbXMpKTtcbiAgICAgIGlmIChyZXN1bHQuJG1ldGFkYXRhICYmIHJlc3VsdC4kbWV0YWRhdGEuaHR0cFN0YXR1c0NvZGUgJiYgcmVzdWx0LiRtZXRhZGF0YS5odHRwU3RhdHVzQ29kZSA9PT0gMjAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiBgJHtldmVudC5ib2R5fSBTdWNjZXNzYCxcbiAgICAgIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAgNTAwLFxuICAgICAgICBib2R5OiBlID09PSA1MDAgPyAnSW52YWxpZCBSZXF1ZXN0IEJvZHknIDogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyxcbiAgICAgIH07XG4gIH1cbiAgXG59O1xuXG5cblxuXG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVEZXZpY2UoZXZlbnQgOiBvYmplY3QpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgXG5cblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNsaWVudC5zZW5kKG5ldyBQdXRDb21tYW5kKHBhcmFtcykpO1xuICAgIGlmIChyZXN1bHQuJG1ldGFkYXRhICYmIHJlc3VsdC4kbWV0YWRhdGEuaHR0cFN0YXR1c0NvZGUgJiYgcmVzdWx0LiRtZXRhZGF0YS5odHRwU3RhdHVzQ29kZSA9PT0gMjAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICB0aHJvdyBlcnI7XG4gIH1cbn1cbiJdfQ==