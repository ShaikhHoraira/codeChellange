"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const AWS = require("aws-sdk");
const tableName = process.env.TODO_TABLE_NAME;
const documentClient = new AWS.DynamoDB.DocumentClient({
    region: process.env.region,
});
const handler = async (event) => {
    console.info(event);
    // const bodypram = JSON.parse(event.body)
    const params = {
        // Key: {
        //   UserId: bodypram.userId,
        // },
        //AttributesToGet: ['pushNotification', 'notificationType', 'notificationSubType'],
        TableName: tableName,
    };
    try {
        let response;
        if (event.httpMethod === "GET") {
            // response = await documentClient.get(params).promise();
            // console.info(response)
            // return response.Item;
            const data = await documentClient.scan(params).promise();
            const items = data.Items;
            const response = {
                statusCode: 200,
                body: JSON.stringify(items)
            };
            console.info(`body: ${response.body}`);
            return response;
        }
        return {
            statusCode: 200,
            body: response,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsK0JBQThCO0FBRzlCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFBO0FBRTdDLE1BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7SUFDckQsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTTtDQUMzQixDQUFDLENBQUM7QUFDSSxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVyxFQUFFLEVBQUU7SUFDcEQsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNuQiwwQ0FBMEM7SUFDMUMsTUFBTSxNQUFNLEdBQUc7UUFDYixTQUFTO1FBQ1QsNkJBQTZCO1FBQzdCLEtBQUs7UUFDTCxtRkFBbUY7UUFDbkYsU0FBUyxFQUFFLFNBQVU7S0FDdEIsQ0FBQztJQUdGLElBQUk7UUFDRixJQUFJLFFBQVEsQ0FBQztRQUNaLElBQUksS0FBSyxDQUFDLFVBQVUsS0FBSyxLQUFLLEVBQUM7WUFDOUIseURBQXlEO1lBQ3pELHlCQUF5QjtZQUN6Qix3QkFBd0I7WUFDeEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3pELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDekIsTUFBTSxRQUFRLEdBQUc7Z0JBQ2YsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO2FBQzVCLENBQUE7WUFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDdEMsT0FBTyxRQUFRLENBQUE7U0FFaEI7UUFDRCxPQUFPO1lBQ0gsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsUUFBUTtTQUNmLENBQUM7S0FDTDtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTztZQUNILFVBQVUsRUFBRyxHQUFHO1lBQ2hCLElBQUksRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsc0JBQXNCO1NBQ2xFLENBQUM7S0FDTDtBQUNILENBQUMsQ0FBQztBQXRDVyxRQUFBLE9BQU8sV0FzQ2xCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XG5pbXBvcnQgKiBhcyBBV1MgZnJvbSBcImF3cy1zZGtcIlxuXG5cbmNvbnN0IHRhYmxlTmFtZSA9IHByb2Nlc3MuZW52LlRPRE9fVEFCTEVfTkFNRVxuXG5jb25zdCBkb2N1bWVudENsaWVudCA9IG5ldyBBV1MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQoe1xuICByZWdpb246IHByb2Nlc3MuZW52LnJlZ2lvbixcbn0pO1xuZXhwb3J0IGNvbnN0IGhhbmRsZXI6IEhhbmRsZXIgPSBhc3luYyAoZXZlbnQgOiBhbnkpID0+IHtcbiAgY29uc29sZS5pbmZvKGV2ZW50KVxuICAvLyBjb25zdCBib2R5cHJhbSA9IEpTT04ucGFyc2UoZXZlbnQuYm9keSlcbiAgY29uc3QgcGFyYW1zID0ge1xuICAgIC8vIEtleToge1xuICAgIC8vICAgVXNlcklkOiBib2R5cHJhbS51c2VySWQsXG4gICAgLy8gfSxcbiAgICAvL0F0dHJpYnV0ZXNUb0dldDogWydwdXNoTm90aWZpY2F0aW9uJywgJ25vdGlmaWNhdGlvblR5cGUnLCAnbm90aWZpY2F0aW9uU3ViVHlwZSddLFxuICAgIFRhYmxlTmFtZTogdGFibGVOYW1lISxcbiAgfTtcblxuXG4gIHRyeSB7XG4gICAgbGV0IHJlc3BvbnNlO1xuICAgICBpZiAoZXZlbnQuaHR0cE1ldGhvZCA9PT0gXCJHRVRcIil7XG4gICAgICAvLyByZXNwb25zZSA9IGF3YWl0IGRvY3VtZW50Q2xpZW50LmdldChwYXJhbXMpLnByb21pc2UoKTtcbiAgICAgIC8vIGNvbnNvbGUuaW5mbyhyZXNwb25zZSlcbiAgICAgIC8vIHJldHVybiByZXNwb25zZS5JdGVtO1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGRvY3VtZW50Q2xpZW50LnNjYW4ocGFyYW1zKS5wcm9taXNlKCk7XG4gICAgICBjb25zdCBpdGVtcyA9IGRhdGEuSXRlbXM7XG4gICAgICBjb25zdCByZXNwb25zZSA9IHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtcylcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUuaW5mbyhgYm9keTogJHtyZXNwb25zZS5ib2R5fWApXG4gICAgICByZXR1cm4gcmVzcG9uc2VcblxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHJlc3BvbnNlLFxuICAgICAgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6ICA1MDAsXG4gICAgICAgIGJvZHk6IGUgPT09IDUwMCA/ICdJbnZhbGlkIFJlcXVlc3QgQm9keScgOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnLFxuICAgICAgfTtcbiAgfVxufTsiXX0=