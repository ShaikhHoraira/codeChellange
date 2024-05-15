"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// import { GetCustomerAddress } from '../modules/getData';
const handler = async (event) => {
    try {
        // const { userId, suburb, postcode } = event.queryStringParameters;
        // if (!userId) {
        //   throw new Error("Missing parameter: userId");
        // }
        // const manageDevice = new GetCustomerAddress(userId, suburb, postcode);
        // const result = await manageDevice.getData();
        console.log(event);
        return {
            statusCode: 200,
            body: JSON.stringify(event),
        };
    }
    catch (e) {
        if (e.message.includes('Missing parameter') || e.message.includes('Invalid format')) {
            return {
                statusCode: 400,
                body: e.message,
            };
        }
        else {
            return {
                statusCode: 403,
                body: 'Forbidden access',
            };
        }
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UHJvZHVjdGlvbkNvc3RIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2hhbmRsZXIvUERDL2dldFByb2R1Y3Rpb25Db3N0SGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwyREFBMkQ7QUFFcEQsTUFBTSxPQUFPLEdBQVksS0FBSyxFQUFFLEtBQVUsRUFBRSxFQUFFO0lBQ25ELElBQUk7UUFDRixvRUFBb0U7UUFDcEUsaUJBQWlCO1FBQ2pCLGtEQUFrRDtRQUNsRCxJQUFJO1FBQ0oseUVBQXlFO1FBQ3pFLCtDQUErQztRQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ2xCLE9BQU87WUFDTCxVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztTQUM1QixDQUFDO0tBQ0g7SUFBQyxPQUFPLENBQU0sRUFBRTtRQUNmLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQ25GLE9BQU87Z0JBQ0wsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPO2FBQ2hCLENBQUM7U0FDSDthQUFNO1lBQ0wsT0FBTztnQkFDTCxVQUFVLEVBQUUsR0FBRztnQkFDZixJQUFJLEVBQUUsa0JBQWtCO2FBQ3pCLENBQUM7U0FDSDtLQUNGO0FBQ0gsQ0FBQyxDQUFDO0FBMUJXLFFBQUEsT0FBTyxXQTBCbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSBcImF3cy1sYW1iZGFcIjtcbi8vIGltcG9ydCB7IEdldEN1c3RvbWVyQWRkcmVzcyB9IGZyb20gJy4uL21vZHVsZXMvZ2V0RGF0YSc7XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBIYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBhbnkpID0+IHtcbiAgdHJ5IHtcbiAgICAvLyBjb25zdCB7IHVzZXJJZCwgc3VidXJiLCBwb3N0Y29kZSB9ID0gZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzO1xuICAgIC8vIGlmICghdXNlcklkKSB7XG4gICAgLy8gICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIHBhcmFtZXRlcjogdXNlcklkXCIpO1xuICAgIC8vIH1cbiAgICAvLyBjb25zdCBtYW5hZ2VEZXZpY2UgPSBuZXcgR2V0Q3VzdG9tZXJBZGRyZXNzKHVzZXJJZCwgc3VidXJiLCBwb3N0Y29kZSk7XG4gICAgLy8gY29uc3QgcmVzdWx0ID0gYXdhaXQgbWFuYWdlRGV2aWNlLmdldERhdGEoKTtcbiAgICBjb25zb2xlLmxvZyhldmVudClcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZXZlbnQpLFxuICAgIH07XG4gIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgIGlmIChlLm1lc3NhZ2UuaW5jbHVkZXMoJ01pc3NpbmcgcGFyYW1ldGVyJykgfHwgZS5tZXNzYWdlLmluY2x1ZGVzKCdJbnZhbGlkIGZvcm1hdCcpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiA0MDAsXG4gICAgICAgIGJvZHk6IGUubWVzc2FnZSxcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDQwMyxcbiAgICAgICAgYm9keTogJ0ZvcmJpZGRlbiBhY2Nlc3MnLFxuICAgICAgfTtcbiAgICB9XG4gIH1cbn07XG4iXX0=