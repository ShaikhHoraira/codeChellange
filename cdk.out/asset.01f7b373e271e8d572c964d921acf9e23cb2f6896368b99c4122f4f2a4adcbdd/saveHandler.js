"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// import {ManageSaveData} from '../modules/save_data';
// import {ManageGetData} from '../modules/get_data';
// import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
// import {
//   DynamoDBDocumentClient,
//   PutCommand,
//   PutCommandInput,
// } from '@aws-sdk/lib-dynamodb';
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const handler = async (event) => {
    // const manageSaveData = new ManageSaveData(process.env.TODO_TABLE_NAME);
    // const manageGetData = new ManageGetData();
    console.info("EVENT\n" + event.body.data);
    const dynamoDBClient = new client_dynamodb_1.DynamoDBClient({ region: 'ap-southeast-2' });
    const documentClient = lib_dynamodb_1.DynamoDBDocumentClient.from(dynamoDBClient);
    const params = {
        TableName: process.env.TODO_TABLE_NAME,
        Item: {
            DeviceToken: 'DEVICE_TOKEN',
            Key: 'KEY',
            ForgeId: 'FORGE_ID',
        },
    };
    try {
        const result = await documentClient.send(new lib_dynamodb_1.PutCommand(params));
        console.log('Item saved successfully:', result);
    }
    catch (error) {
        console.error('Error saving item:', error);
    }
};
exports.handler = handler;
// export async function saveDevice(event : object): Promise<boolean> {
//   const client = DynamoDBDocumentClient.from(new DynamoDBClient({ region: 'ap-southeast-2' }));
//   const params: PutCommandInput = {
//     TableName: process.env.TODO_TABLE_NAME!,
//     Item: {
//       DeviceToken: event,
//       Key: event,
//       ForgeId: event || 'anonymous',
//     },
//   };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1REFBdUQ7QUFDdkQscURBQXFEO0FBQ3JELDZEQUE2RDtBQUU3RCxXQUFXO0FBQ1gsNEJBQTRCO0FBQzVCLGdCQUFnQjtBQUNoQixxQkFBcUI7QUFDckIsa0NBQWtDO0FBQ2xDLDhEQUEwRDtBQUMxRCx3REFBNEY7QUFDckYsTUFBTSxPQUFPLEdBQVksS0FBSyxFQUFFLEtBQVcsRUFBRSxFQUFFO0lBQ3RELDBFQUEwRTtJQUMxRSw2Q0FBNkM7SUFDN0MsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUV6QyxNQUFNLGNBQWMsR0FBRyxJQUFJLGdDQUFjLENBQUMsRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO0lBQ3hFLE1BQU0sY0FBYyxHQUFHLHFDQUFzQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNuRSxNQUFNLE1BQU0sR0FBb0I7UUFDOUIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZTtRQUN0QyxJQUFJLEVBQUU7WUFDSixXQUFXLEVBQUUsY0FBYztZQUMzQixHQUFHLEVBQUUsS0FBSztZQUNWLE9BQU8sRUFBRSxVQUFVO1NBQ3BCO0tBQ0YsQ0FBQztJQUNGLElBQUk7UUFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSx5QkFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDakUsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSxNQUFNLENBQUMsQ0FBQztLQUNqRDtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUM1QztBQUVELENBQUMsQ0FBQztBQXRCVyxRQUFBLE9BQU8sV0FzQmxCO0FBU0YsdUVBQXVFO0FBQ3ZFLGtHQUFrRztBQUNsRyxzQ0FBc0M7QUFDdEMsK0NBQStDO0FBQy9DLGNBQWM7QUFDZCw0QkFBNEI7QUFDNUIsb0JBQW9CO0FBQ3BCLHVDQUF1QztBQUN2QyxTQUFTO0FBQ1QsT0FBTztBQUVQLFVBQVU7QUFDVixnRUFBZ0U7QUFDaEUsNEdBQTRHO0FBQzVHLHFCQUFxQjtBQUNyQixlQUFlO0FBQ2Ysc0JBQXNCO0FBQ3RCLFFBQVE7QUFDUix5QkFBeUI7QUFDekIsaUJBQWlCO0FBQ2pCLE1BQU07QUFDTixJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XG4vLyBpbXBvcnQge01hbmFnZVNhdmVEYXRhfSBmcm9tICcuLi9tb2R1bGVzL3NhdmVfZGF0YSc7XG4vLyBpbXBvcnQge01hbmFnZUdldERhdGF9IGZyb20gJy4uL21vZHVsZXMvZ2V0X2RhdGEnO1xuLy8gaW1wb3J0IHsgRHluYW1vREJDbGllbnQgfSBmcm9tICdAYXdzLXNkay9jbGllbnQtZHluYW1vZGInO1xuXG4vLyBpbXBvcnQge1xuLy8gICBEeW5hbW9EQkRvY3VtZW50Q2xpZW50LFxuLy8gICBQdXRDb21tYW5kLFxuLy8gICBQdXRDb21tYW5kSW5wdXQsXG4vLyB9IGZyb20gJ0Bhd3Mtc2RrL2xpYi1keW5hbW9kYic7XG5pbXBvcnQgeyBEeW5hbW9EQkNsaWVudCB9IGZyb20gJ0Bhd3Mtc2RrL2NsaWVudC1keW5hbW9kYic7XG5pbXBvcnQgeyBEeW5hbW9EQkRvY3VtZW50Q2xpZW50LCBQdXRDb21tYW5kLCBQdXRDb21tYW5kSW5wdXQgfSBmcm9tICdAYXdzLXNkay9saWItZHluYW1vZGInO1xuZXhwb3J0IGNvbnN0IGhhbmRsZXI6IEhhbmRsZXIgPSBhc3luYyAoZXZlbnQgOiBhbnkpID0+IHtcbi8vIGNvbnN0IG1hbmFnZVNhdmVEYXRhID0gbmV3IE1hbmFnZVNhdmVEYXRhKHByb2Nlc3MuZW52LlRPRE9fVEFCTEVfTkFNRSk7XG4vLyBjb25zdCBtYW5hZ2VHZXREYXRhID0gbmV3IE1hbmFnZUdldERhdGEoKTtcbmNvbnNvbGUuaW5mbyhcIkVWRU5UXFxuXCIgKyBldmVudC5ib2R5LmRhdGEpXG5cbmNvbnN0IGR5bmFtb0RCQ2xpZW50ID0gbmV3IER5bmFtb0RCQ2xpZW50KHsgcmVnaW9uOiAnYXAtc291dGhlYXN0LTInIH0pO1xuY29uc3QgZG9jdW1lbnRDbGllbnQgPSBEeW5hbW9EQkRvY3VtZW50Q2xpZW50LmZyb20oZHluYW1vREJDbGllbnQpO1xuY29uc3QgcGFyYW1zOiBQdXRDb21tYW5kSW5wdXQgPSB7XG4gIFRhYmxlTmFtZTogcHJvY2Vzcy5lbnYuVE9ET19UQUJMRV9OQU1FLFxuICBJdGVtOiB7XG4gICAgRGV2aWNlVG9rZW46ICdERVZJQ0VfVE9LRU4nLFxuICAgIEtleTogJ0tFWScsXG4gICAgRm9yZ2VJZDogJ0ZPUkdFX0lEJyxcbiAgfSxcbn07XG50cnkge1xuICBjb25zdCByZXN1bHQgPSBhd2FpdCBkb2N1bWVudENsaWVudC5zZW5kKG5ldyBQdXRDb21tYW5kKHBhcmFtcykpO1xuICBjb25zb2xlLmxvZygnSXRlbSBzYXZlZCBzdWNjZXNzZnVsbHk6JywgcmVzdWx0KTtcbn0gY2F0Y2ggKGVycm9yKSB7XG4gIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHNhdmluZyBpdGVtOicsIGVycm9yKTtcbn1cbiAgXG59O1xuXG5cblxuXG5cblxuXG5cbi8vIGV4cG9ydCBhc3luYyBmdW5jdGlvbiBzYXZlRGV2aWNlKGV2ZW50IDogb2JqZWN0KTogUHJvbWlzZTxib29sZWFuPiB7XG4vLyAgIGNvbnN0IGNsaWVudCA9IER5bmFtb0RCRG9jdW1lbnRDbGllbnQuZnJvbShuZXcgRHluYW1vREJDbGllbnQoeyByZWdpb246ICdhcC1zb3V0aGVhc3QtMicgfSkpO1xuLy8gICBjb25zdCBwYXJhbXM6IFB1dENvbW1hbmRJbnB1dCA9IHtcbi8vICAgICBUYWJsZU5hbWU6IHByb2Nlc3MuZW52LlRPRE9fVEFCTEVfTkFNRSEsXG4vLyAgICAgSXRlbToge1xuLy8gICAgICAgRGV2aWNlVG9rZW46IGV2ZW50LFxuLy8gICAgICAgS2V5OiBldmVudCxcbi8vICAgICAgIEZvcmdlSWQ6IGV2ZW50IHx8ICdhbm9ueW1vdXMnLFxuLy8gICAgIH0sXG4vLyAgIH07XG5cbi8vICAgdHJ5IHtcbi8vICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjbGllbnQuc2VuZChuZXcgUHV0Q29tbWFuZChwYXJhbXMpKTtcbi8vICAgICBpZiAocmVzdWx0LiRtZXRhZGF0YSAmJiByZXN1bHQuJG1ldGFkYXRhLmh0dHBTdGF0dXNDb2RlICYmIHJlc3VsdC4kbWV0YWRhdGEuaHR0cFN0YXR1c0NvZGUgPT09IDIwMCkge1xuLy8gICAgICAgcmV0dXJuIHRydWU7XG4vLyAgICAgfSBlbHNlIHtcbi8vICAgICAgIHJldHVybiBmYWxzZTtcbi8vICAgICB9XG4vLyAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4vLyAgICAgdGhyb3cgZXJyO1xuLy8gICB9XG4vLyB9XG4iXX0=