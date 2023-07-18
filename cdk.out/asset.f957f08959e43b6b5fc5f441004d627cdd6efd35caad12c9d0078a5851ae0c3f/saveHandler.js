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
// import AWS from 'aws-sdk';
// const documentClient = new AWS.DynamoDB.DocumentClient({
//   region: 'ap-southeast-2',
// });
// const data = {
//   Id: 'Address',
//   notificationType: 'payload.notificationType',
//   notificationSubType: 'payload.notificationSubType',
//   images: 'payload.images',
//   localNotification: 'payload.localNotification',
//   pushNotification: 'payload.pushNotification',
//   isPrivate: 'payload.isPrivate',
// };
// var params = {
//   TableName: process.env.TODO_TABLE_NAME,
//   Item: data,
// };
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const client = new client_dynamodb_1.DynamoDBClient({ region: "ap-southeast-2" });
const params = {
    TableName: process.env.TODO_TABLE_NAME,
    Item: {
        id: { S: "12345" },
        name: { S: "John Doe" },
        age: { N: "30" },
        isEmployed: { BOOL: true } // AttributeValue for boolean
    }
};
const handler = async (event) => {
    console.info("EVENT\n" + event.body.data);
    try {
        let response;
        if (event.httpMethod === 'POST') {
            // response = await manageSaveData.saveDevice(event.dynamodb.tableName,'');
            // console.log("🚀 ~ file: save_retrive_address.ts:12 ~ constTuHandler:Handler= ~ response:", response)
            // const tryThis = await documentClient.put(params).promise();
            // console.info(tryThis)
            const command = new client_dynamodb_1.PutItemCommand(params);
            client.send(command)
                .then((response) => {
                console.log("Item saved successfully:", response);
            })
                .catch((error) => {
                console.error("Error saving item:", error);
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSx1REFBdUQ7QUFDdkQscURBQXFEO0FBQ3JELDZEQUE2RDtBQUU3RCxXQUFXO0FBQ1gsNEJBQTRCO0FBQzVCLGdCQUFnQjtBQUNoQixxQkFBcUI7QUFDckIsa0NBQWtDO0FBS2xDLDZCQUE2QjtBQUM3QiwyREFBMkQ7QUFDM0QsOEJBQThCO0FBQzlCLE1BQU07QUFDTixpQkFBaUI7QUFDakIsbUJBQW1CO0FBQ25CLGtEQUFrRDtBQUNsRCx3REFBd0Q7QUFDeEQsOEJBQThCO0FBQzlCLG9EQUFvRDtBQUNwRCxrREFBa0Q7QUFDbEQsb0NBQW9DO0FBQ3BDLEtBQUs7QUFDTCxpQkFBaUI7QUFDakIsNENBQTRDO0FBQzVDLGdCQUFnQjtBQUNoQixLQUFLO0FBSUwsOERBQStGO0FBRS9GLE1BQU0sTUFBTSxHQUFHLElBQUksZ0NBQWMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7QUFDaEUsTUFBTSxNQUFNLEdBQXdCO0lBQ2xDLFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWdCO0lBQ3ZDLElBQUksRUFBRTtRQUNKLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUU7UUFDbEIsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRTtRQUN2QixHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFO1FBQ2hCLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyw2QkFBNkI7S0FDekQ7Q0FDRixDQUFDO0FBR0ssTUFBTSxPQUFPLEdBQVksS0FBSyxFQUFFLEtBQVcsRUFBRSxFQUFFO0lBQ3RELE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkMsSUFBSTtRQUNGLElBQUksUUFBUSxDQUFDO1FBQ2IsSUFBSSxLQUFLLENBQUMsVUFBVSxLQUFLLE1BQU0sRUFBRTtZQUMvQiwyRUFBMkU7WUFDM0UsdUdBQXVHO1lBSXZHLDhEQUE4RDtZQUM5RCx3QkFBd0I7WUFHeEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxnQ0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRTNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2lCQUNqQixJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUNwRCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM3QyxDQUFDLENBQUMsQ0FBQztTQUVOO1FBQ0QsT0FBTztZQUNILFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLElBQUksVUFBVTtTQUM5QixDQUFDO0tBQ0w7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU87WUFDSCxVQUFVLEVBQUcsR0FBRztZQUNoQixJQUFJLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtTQUNsRSxDQUFDO0tBQ0w7QUFFSCxDQUFDLENBQUM7QUFwQ1csUUFBQSxPQUFPLFdBb0NsQjtBQU9GLHVFQUF1RTtBQUN2RSxrR0FBa0c7QUFDbEcsc0NBQXNDO0FBQ3RDLCtDQUErQztBQUMvQyxjQUFjO0FBQ2QsNEJBQTRCO0FBQzVCLG9CQUFvQjtBQUNwQix1Q0FBdUM7QUFDdkMsU0FBUztBQUNULE9BQU87QUFFUCxVQUFVO0FBQ1YsZ0VBQWdFO0FBQ2hFLDRHQUE0RztBQUM1RyxxQkFBcUI7QUFDckIsZUFBZTtBQUNmLHNCQUFzQjtBQUN0QixRQUFRO0FBQ1IseUJBQXlCO0FBQ3pCLGlCQUFpQjtBQUNqQixNQUFNO0FBQ04sSUFBSSIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XG4vLyBpbXBvcnQge01hbmFnZVNhdmVEYXRhfSBmcm9tICcuLi9tb2R1bGVzL3NhdmVfZGF0YSc7XG4vLyBpbXBvcnQge01hbmFnZUdldERhdGF9IGZyb20gJy4uL21vZHVsZXMvZ2V0X2RhdGEnO1xuLy8gaW1wb3J0IHsgRHluYW1vREJDbGllbnQgfSBmcm9tICdAYXdzLXNkay9jbGllbnQtZHluYW1vZGInO1xuXG4vLyBpbXBvcnQge1xuLy8gICBEeW5hbW9EQkRvY3VtZW50Q2xpZW50LFxuLy8gICBQdXRDb21tYW5kLFxuLy8gICBQdXRDb21tYW5kSW5wdXQsXG4vLyB9IGZyb20gJ0Bhd3Mtc2RrL2xpYi1keW5hbW9kYic7XG5cblxuXG5cbi8vIGltcG9ydCBBV1MgZnJvbSAnYXdzLXNkayc7XG4vLyBjb25zdCBkb2N1bWVudENsaWVudCA9IG5ldyBBV1MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQoe1xuLy8gICByZWdpb246ICdhcC1zb3V0aGVhc3QtMicsXG4vLyB9KTtcbi8vIGNvbnN0IGRhdGEgPSB7XG4vLyAgIElkOiAnQWRkcmVzcycsXG4vLyAgIG5vdGlmaWNhdGlvblR5cGU6ICdwYXlsb2FkLm5vdGlmaWNhdGlvblR5cGUnLFxuLy8gICBub3RpZmljYXRpb25TdWJUeXBlOiAncGF5bG9hZC5ub3RpZmljYXRpb25TdWJUeXBlJyxcbi8vICAgaW1hZ2VzOiAncGF5bG9hZC5pbWFnZXMnLFxuLy8gICBsb2NhbE5vdGlmaWNhdGlvbjogJ3BheWxvYWQubG9jYWxOb3RpZmljYXRpb24nLFxuLy8gICBwdXNoTm90aWZpY2F0aW9uOiAncGF5bG9hZC5wdXNoTm90aWZpY2F0aW9uJyxcbi8vICAgaXNQcml2YXRlOiAncGF5bG9hZC5pc1ByaXZhdGUnLFxuLy8gfTtcbi8vIHZhciBwYXJhbXMgPSB7XG4vLyAgIFRhYmxlTmFtZTogcHJvY2Vzcy5lbnYuVE9ET19UQUJMRV9OQU1FLFxuLy8gICBJdGVtOiBkYXRhLFxuLy8gfTtcblxuXG5cbmltcG9ydCB7IER5bmFtb0RCQ2xpZW50LCBQdXRJdGVtQ29tbWFuZCwgUHV0SXRlbUNvbW1hbmRJbnB1dCB9IGZyb20gXCJAYXdzLXNkay9jbGllbnQtZHluYW1vZGJcIjtcblxuY29uc3QgY2xpZW50ID0gbmV3IER5bmFtb0RCQ2xpZW50KHsgcmVnaW9uOiBcImFwLXNvdXRoZWFzdC0yXCIgfSk7XG5jb25zdCBwYXJhbXM6IFB1dEl0ZW1Db21tYW5kSW5wdXQgPSB7XG4gIFRhYmxlTmFtZTogcHJvY2Vzcy5lbnYuVE9ET19UQUJMRV9OQU1FISxcbiAgSXRlbToge1xuICAgIGlkOiB7IFM6IFwiMTIzNDVcIiB9LCAvLyBBdHRyaWJ1dGVWYWx1ZSBmb3Igc3RyaW5nXG4gICAgbmFtZTogeyBTOiBcIkpvaG4gRG9lXCIgfSxcbiAgICBhZ2U6IHsgTjogXCIzMFwiIH0sIC8vIEF0dHJpYnV0ZVZhbHVlIGZvciBudW1iZXJcbiAgICBpc0VtcGxveWVkOiB7IEJPT0w6IHRydWUgfSAvLyBBdHRyaWJ1dGVWYWx1ZSBmb3IgYm9vbGVhblxuICB9XG59O1xuXG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBIYW5kbGVyID0gYXN5bmMgKGV2ZW50IDogYW55KSA9PiB7XG5jb25zb2xlLmluZm8oXCJFVkVOVFxcblwiICsgZXZlbnQuYm9keS5kYXRhKVxuICB0cnkge1xuICAgIGxldCByZXNwb25zZTtcbiAgICBpZiAoZXZlbnQuaHR0cE1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgICAvLyByZXNwb25zZSA9IGF3YWl0IG1hbmFnZVNhdmVEYXRhLnNhdmVEZXZpY2UoZXZlbnQuZHluYW1vZGIudGFibGVOYW1lLCcnKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwi8J+agCB+IGZpbGU6IHNhdmVfcmV0cml2ZV9hZGRyZXNzLnRzOjEyIH4gY29uc3RUdUhhbmRsZXI6SGFuZGxlcj0gfiByZXNwb25zZTpcIiwgcmVzcG9uc2UpXG5cblxuXG4gICAgICAvLyBjb25zdCB0cnlUaGlzID0gYXdhaXQgZG9jdW1lbnRDbGllbnQucHV0KHBhcmFtcykucHJvbWlzZSgpO1xuICAgICAgLy8gY29uc29sZS5pbmZvKHRyeVRoaXMpXG5cblxuICAgICAgY29uc3QgY29tbWFuZCA9IG5ldyBQdXRJdGVtQ29tbWFuZChwYXJhbXMpO1xuXG4gICAgICBjbGllbnQuc2VuZChjb21tYW5kKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkl0ZW0gc2F2ZWQgc3VjY2Vzc2Z1bGx5OlwiLCByZXNwb25zZSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igc2F2aW5nIGl0ZW06XCIsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgICBcbiAgICB9IFxuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keTogYCR7ZXZlbnQuYm9keX0gU3VjY2Vzc2AsXG4gICAgICB9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogIDUwMCxcbiAgICAgICAgYm9keTogZSA9PT0gNTAwID8gJ0ludmFsaWQgUmVxdWVzdCBCb2R5JyA6ICdTb21ldGhpbmcgd2VudCB3cm9uZycsXG4gICAgICB9O1xuICB9XG4gIFxufTtcblxuXG5cblxuXG5cbi8vIGV4cG9ydCBhc3luYyBmdW5jdGlvbiBzYXZlRGV2aWNlKGV2ZW50IDogb2JqZWN0KTogUHJvbWlzZTxib29sZWFuPiB7XG4vLyAgIGNvbnN0IGNsaWVudCA9IER5bmFtb0RCRG9jdW1lbnRDbGllbnQuZnJvbShuZXcgRHluYW1vREJDbGllbnQoeyByZWdpb246ICdhcC1zb3V0aGVhc3QtMicgfSkpO1xuLy8gICBjb25zdCBwYXJhbXM6IFB1dENvbW1hbmRJbnB1dCA9IHtcbi8vICAgICBUYWJsZU5hbWU6IHByb2Nlc3MuZW52LlRPRE9fVEFCTEVfTkFNRSEsXG4vLyAgICAgSXRlbToge1xuLy8gICAgICAgRGV2aWNlVG9rZW46IGV2ZW50LFxuLy8gICAgICAgS2V5OiBldmVudCxcbi8vICAgICAgIEZvcmdlSWQ6IGV2ZW50IHx8ICdhbm9ueW1vdXMnLFxuLy8gICAgIH0sXG4vLyAgIH07XG5cbi8vICAgdHJ5IHtcbi8vICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjbGllbnQuc2VuZChuZXcgUHV0Q29tbWFuZChwYXJhbXMpKTtcbi8vICAgICBpZiAocmVzdWx0LiRtZXRhZGF0YSAmJiByZXN1bHQuJG1ldGFkYXRhLmh0dHBTdGF0dXNDb2RlICYmIHJlc3VsdC4kbWV0YWRhdGEuaHR0cFN0YXR1c0NvZGUgPT09IDIwMCkge1xuLy8gICAgICAgcmV0dXJuIHRydWU7XG4vLyAgICAgfSBlbHNlIHtcbi8vICAgICAgIHJldHVybiBmYWxzZTtcbi8vICAgICB9XG4vLyAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4vLyAgICAgdGhyb3cgZXJyO1xuLy8gICB9XG4vLyB9XG4iXX0=