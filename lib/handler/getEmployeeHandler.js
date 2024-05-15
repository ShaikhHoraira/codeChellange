"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const getData_1 = require("../modules/getData");
const handler = async (event) => {
    try {
        const { userId, suburb, postcode } = event.queryStringParameters;
        if (!userId) {
            throw new Error("Missing parameter: userId");
        }
        const manageDevice = new getData_1.GetCustomerAddress(userId, suburb, postcode);
        const result = await manageDevice.getData();
        console.log(result);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RW1wbG95ZWVIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hhbmRsZXIvZ2V0RW1wbG95ZWVIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLGdEQUF3RDtBQUVqRCxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVSxFQUFFLEVBQUU7SUFDbkQsSUFBSTtRQUNGLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQztRQUNqRSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1NBQzlDO1FBQ0QsTUFBTSxZQUFZLEdBQUcsSUFBSSw0QkFBa0IsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3RFLE1BQU0sTUFBTSxHQUFHLE1BQU0sWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRTVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDbkIsT0FBTztZQUNMLFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1NBQzVCLENBQUM7S0FDSDtJQUFDLE9BQU8sQ0FBTSxFQUFFO1FBQ2YsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDbkYsT0FBTztnQkFDTCxVQUFVLEVBQUUsR0FBRztnQkFDZixJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU87YUFDaEIsQ0FBQztTQUNIO2FBQU07WUFDTCxPQUFPO2dCQUNMLFVBQVUsRUFBRSxHQUFHO2dCQUNmLElBQUksRUFBRSxrQkFBa0I7YUFDekIsQ0FBQztTQUNIO0tBQ0Y7QUFDSCxDQUFDLENBQUM7QUEzQlcsUUFBQSxPQUFPLFdBMkJsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWxhbWJkYVwiO1xuaW1wb3J0IHsgR2V0Q3VzdG9tZXJBZGRyZXNzIH0gZnJvbSAnLi4vbW9kdWxlcy9nZXREYXRhJztcblxuZXhwb3J0IGNvbnN0IGhhbmRsZXI6IEhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IGFueSkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHsgdXNlcklkLCBzdWJ1cmIsIHBvc3Rjb2RlIH0gPSBldmVudC5xdWVyeVN0cmluZ1BhcmFtZXRlcnM7XG4gICAgaWYgKCF1c2VySWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgcGFyYW1ldGVyOiB1c2VySWRcIik7XG4gICAgfVxuICAgIGNvbnN0IG1hbmFnZURldmljZSA9IG5ldyBHZXRDdXN0b21lckFkZHJlc3ModXNlcklkLCBzdWJ1cmIsIHBvc3Rjb2RlKTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBtYW5hZ2VEZXZpY2UuZ2V0RGF0YSgpO1xuXG4gICAgY29uc29sZS5sb2cocmVzdWx0KVxuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShldmVudCksXG4gICAgfTtcbiAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgaWYgKGUubWVzc2FnZS5pbmNsdWRlcygnTWlzc2luZyBwYXJhbWV0ZXInKSB8fCBlLm1lc3NhZ2UuaW5jbHVkZXMoJ0ludmFsaWQgZm9ybWF0JykpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDQwMCxcbiAgICAgICAgYm9keTogZS5tZXNzYWdlLFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogNDAzLFxuICAgICAgICBib2R5OiAnRm9yYmlkZGVuIGFjY2VzcycsXG4gICAgICB9O1xuICAgIH1cbiAgfVxufTtcbiJdfQ==