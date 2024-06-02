"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const getInsuranceCostData_1 = require("../../modules/FinancialCost/getInsuranceCostData");
const handler = async (event) => {
    console.log("We are in getInsuranceId");
    try {
        const { insuranceId } = event.queryStringParameters;
        console.log(event.queryStringParameters);
        if (!insuranceId) {
            throw new Error("Missing parameter: insuranceId");
        }
        const manageDevice = new getInsuranceCostData_1.GetInsuranceCostData(insuranceId);
        const result = await manageDevice.getRentData();
        console.log(result);
        return {
            statusCode: 200,
            body: JSON.stringify(result),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SW5zdXJhbmNlSWRIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2hhbmRsZXIvRmluYW5jaWFsQ29zdC9nZXRJbnN1cmFuY2VJZEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsMkZBQXdGO0FBRWpGLE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFVLEVBQUUsRUFBRTtJQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUE7SUFDdkMsSUFBSTtRQUNGLE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRyxLQUFLLENBQUMscUJBQXFCLENBQUM7UUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQTtRQUN4QyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztTQUNuRDtRQUNELE1BQU0sWUFBWSxHQUFHLElBQUksMkNBQW9CLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDM0QsTUFBTSxNQUFNLEdBQUcsTUFBTSxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNuQixPQUFPO1lBQ0wsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7U0FDN0IsQ0FBQztLQUNIO0lBQUMsT0FBTyxDQUFNLEVBQUU7UUFDZixJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtZQUNuRixPQUFPO2dCQUNMLFVBQVUsRUFBRSxHQUFHO2dCQUNmLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTzthQUNoQixDQUFDO1NBQ0g7YUFBTTtZQUNMLE9BQU87Z0JBQ0wsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsSUFBSSxFQUFFLGtCQUFrQjthQUN6QixDQUFDO1NBQ0g7S0FDRjtBQUNILENBQUMsQ0FBQztBQTdCVyxRQUFBLE9BQU8sV0E2QmxCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gXCJhd3MtbGFtYmRhXCI7XG5pbXBvcnQgeyBHZXRJbnN1cmFuY2VDb3N0RGF0YSB9IGZyb20gJy4uLy4uL21vZHVsZXMvRmluYW5jaWFsQ29zdC9nZXRJbnN1cmFuY2VDb3N0RGF0YSc7XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBIYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBhbnkpID0+IHtcbiAgY29uc29sZS5sb2coXCJXZSBhcmUgaW4gZ2V0SW5zdXJhbmNlSWRcIilcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGluc3VyYW5jZUlkIH0gPSBldmVudC5xdWVyeVN0cmluZ1BhcmFtZXRlcnM7XG4gICAgY29uc29sZS5sb2coZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzKVxuICAgIGlmICghaW5zdXJhbmNlSWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgcGFyYW1ldGVyOiBpbnN1cmFuY2VJZFwiKTtcbiAgICB9XG4gICAgY29uc3QgbWFuYWdlRGV2aWNlID0gbmV3IEdldEluc3VyYW5jZUNvc3REYXRhKGluc3VyYW5jZUlkKTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBtYW5hZ2VEZXZpY2UuZ2V0UmVudERhdGEoKTtcblxuICAgIGNvbnNvbGUubG9nKHJlc3VsdClcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVzdWx0KSxcbiAgICB9O1xuICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICBpZiAoZS5tZXNzYWdlLmluY2x1ZGVzKCdNaXNzaW5nIHBhcmFtZXRlcicpIHx8IGUubWVzc2FnZS5pbmNsdWRlcygnSW52YWxpZCBmb3JtYXQnKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogNDAwLFxuICAgICAgICBib2R5OiBlLm1lc3NhZ2UsXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiA0MDMsXG4gICAgICAgIGJvZHk6ICdGb3JiaWRkZW4gYWNjZXNzJyxcbiAgICAgIH07XG4gICAgfVxuICB9XG59O1xuIl19