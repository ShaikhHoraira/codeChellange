"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const getMarketingCostData_1 = require("../../modules/MarketingandSalesCost/getMarketingCostData");
const handler = async (event) => {
    console.log("We are in marketingInvoiceId");
    try {
        const { marketingInvoiceId } = event.queryStringParameters;
        console.log(event.queryStringParameters);
        if (!marketingInvoiceId) {
            throw new Error("Missing parameter: marketingInvoiceId");
        }
        const manageDevice = new getMarketingCostData_1.GetMarketingCostData(marketingInvoiceId);
        const result = await manageDevice.getMarketingData();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0TWFya2V0aW5nSWRIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2hhbmRsZXIvTWFya2V0aW5nYW5kU2FsZXNDb3N0L2dldE1hcmtldGluZ0lkSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxtR0FBZ0c7QUFFekYsTUFBTSxPQUFPLEdBQVksS0FBSyxFQUFFLEtBQVUsRUFBRSxFQUFFO0lBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQTtJQUMzQyxJQUFJO1FBQ0YsTUFBTSxFQUFFLGtCQUFrQixFQUFFLEdBQUcsS0FBSyxDQUFDLHFCQUFxQixDQUFDO1FBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUE7UUFDeEMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQztTQUMxRDtRQUNELE1BQU0sWUFBWSxHQUFHLElBQUksMkNBQW9CLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNsRSxNQUFNLE1BQU0sR0FBRyxNQUFNLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRXJELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDbkIsT0FBTztZQUNMLFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO1NBQzdCLENBQUM7S0FDSDtJQUFDLE9BQU8sQ0FBTSxFQUFFO1FBQ2YsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDbkYsT0FBTztnQkFDTCxVQUFVLEVBQUUsR0FBRztnQkFDZixJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU87YUFDaEIsQ0FBQztTQUNIO2FBQU07WUFDTCxPQUFPO2dCQUNMLFVBQVUsRUFBRSxHQUFHO2dCQUNmLElBQUksRUFBRSxrQkFBa0I7YUFDekIsQ0FBQztTQUNIO0tBQ0Y7QUFDSCxDQUFDLENBQUM7QUE3QlcsUUFBQSxPQUFPLFdBNkJsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWxhbWJkYVwiO1xuaW1wb3J0IHsgR2V0TWFya2V0aW5nQ29zdERhdGEgfSBmcm9tICcuLi8uLi9tb2R1bGVzL01hcmtldGluZ2FuZFNhbGVzQ29zdC9nZXRNYXJrZXRpbmdDb3N0RGF0YSc7XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBIYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBhbnkpID0+IHtcbiAgY29uc29sZS5sb2coXCJXZSBhcmUgaW4gbWFya2V0aW5nSW52b2ljZUlkXCIpXG4gIHRyeSB7XG4gICAgY29uc3QgeyBtYXJrZXRpbmdJbnZvaWNlSWQgfSA9IGV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycztcbiAgICBjb25zb2xlLmxvZyhldmVudC5xdWVyeVN0cmluZ1BhcmFtZXRlcnMpXG4gICAgaWYgKCFtYXJrZXRpbmdJbnZvaWNlSWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgcGFyYW1ldGVyOiBtYXJrZXRpbmdJbnZvaWNlSWRcIik7XG4gICAgfVxuICAgIGNvbnN0IG1hbmFnZURldmljZSA9IG5ldyBHZXRNYXJrZXRpbmdDb3N0RGF0YShtYXJrZXRpbmdJbnZvaWNlSWQpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IG1hbmFnZURldmljZS5nZXRNYXJrZXRpbmdEYXRhKCk7XG5cbiAgICBjb25zb2xlLmxvZyhyZXN1bHQpXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlc3VsdCksXG4gICAgfTtcbiAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgaWYgKGUubWVzc2FnZS5pbmNsdWRlcygnTWlzc2luZyBwYXJhbWV0ZXInKSB8fCBlLm1lc3NhZ2UuaW5jbHVkZXMoJ0ludmFsaWQgZm9ybWF0JykpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDQwMCxcbiAgICAgICAgYm9keTogZS5tZXNzYWdlLFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogNDAzLFxuICAgICAgICBib2R5OiAnRm9yYmlkZGVuIGFjY2VzcycsXG4gICAgICB9O1xuICAgIH1cbiAgfVxufTtcbiJdfQ==