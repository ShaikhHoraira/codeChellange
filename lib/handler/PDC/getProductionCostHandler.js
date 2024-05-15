"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const getProductionCostData_1 = require("../../modules/PDC/getProductionCostData");
const handler = async (event) => {
    try {
        const { productionCostId } = event.queryStringParameters;
        if (!productionCostId) {
            throw new Error("Missing parameter: productionCostId");
        }
        const manageDevice = new getProductionCostData_1.GetCustomerAddress(productionCostId);
        const result = await manageDevice.getData();
        console.log();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UHJvZHVjdGlvbkNvc3RIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2hhbmRsZXIvUERDL2dldFByb2R1Y3Rpb25Db3N0SGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxtRkFBNkU7QUFFdEUsTUFBTSxPQUFPLEdBQVksS0FBSyxFQUFFLEtBQVUsRUFBRSxFQUFFO0lBQ25ELElBQUk7UUFDRixNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsR0FBRyxLQUFLLENBQUMscUJBQXFCLENBQUM7UUFDekQsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQztTQUN4RDtRQUNELE1BQU0sWUFBWSxHQUFHLElBQUksMENBQWtCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM5RCxNQUFNLE1BQU0sR0FBRyxNQUFNLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM1QyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUE7UUFDYixPQUFPO1lBQ0wsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7U0FDN0IsQ0FBQztLQUNIO0lBQUMsT0FBTyxDQUFNLEVBQUU7UUFDZixJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtZQUNuRixPQUFPO2dCQUNMLFVBQVUsRUFBRSxHQUFHO2dCQUNmLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTzthQUNoQixDQUFDO1NBQ0g7YUFBTTtZQUNMLE9BQU87Z0JBQ0wsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsSUFBSSxFQUFFLGtCQUFrQjthQUN6QixDQUFDO1NBQ0g7S0FDRjtBQUNILENBQUMsQ0FBQztBQTFCVyxRQUFBLE9BQU8sV0EwQmxCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gXCJhd3MtbGFtYmRhXCI7XG5pbXBvcnQgeyBHZXRDdXN0b21lckFkZHJlc3MgfSBmcm9tICcuLi8uLi9tb2R1bGVzL1BEQy9nZXRQcm9kdWN0aW9uQ29zdERhdGEnO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudDogYW55KSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBwcm9kdWN0aW9uQ29zdElkIH0gPSBldmVudC5xdWVyeVN0cmluZ1BhcmFtZXRlcnM7XG4gICAgaWYgKCFwcm9kdWN0aW9uQ29zdElkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIHBhcmFtZXRlcjogcHJvZHVjdGlvbkNvc3RJZFwiKTtcbiAgICB9XG4gICAgY29uc3QgbWFuYWdlRGV2aWNlID0gbmV3IEdldEN1c3RvbWVyQWRkcmVzcyhwcm9kdWN0aW9uQ29zdElkKTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBtYW5hZ2VEZXZpY2UuZ2V0RGF0YSgpO1xuICAgIGNvbnNvbGUubG9nKClcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVzdWx0KSxcbiAgICB9O1xuICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICBpZiAoZS5tZXNzYWdlLmluY2x1ZGVzKCdNaXNzaW5nIHBhcmFtZXRlcicpIHx8IGUubWVzc2FnZS5pbmNsdWRlcygnSW52YWxpZCBmb3JtYXQnKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogNDAwLFxuICAgICAgICBib2R5OiBlLm1lc3NhZ2UsXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiA0MDMsXG4gICAgICAgIGJvZHk6ICdGb3JiaWRkZW4gYWNjZXNzJyxcbiAgICAgIH07XG4gICAgfVxuICB9XG59O1xuIl19