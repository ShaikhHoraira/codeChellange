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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UHJvZHVjdGlvbkNvc3RIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hhbmRsZXIvZ2V0UHJvZHVjdGlvbkNvc3RIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDJEQUEyRDtBQUVwRCxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVSxFQUFFLEVBQUU7SUFDbkQsSUFBSTtRQUNGLG9FQUFvRTtRQUNwRSxpQkFBaUI7UUFDakIsa0RBQWtEO1FBQ2xELElBQUk7UUFDSix5RUFBeUU7UUFDekUsK0NBQStDO1FBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDbEIsT0FBTztZQUNMLFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1NBQzVCLENBQUM7S0FDSDtJQUFDLE9BQU8sQ0FBTSxFQUFFO1FBQ2YsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDbkYsT0FBTztnQkFDTCxVQUFVLEVBQUUsR0FBRztnQkFDZixJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU87YUFDaEIsQ0FBQztTQUNIO2FBQU07WUFDTCxPQUFPO2dCQUNMLFVBQVUsRUFBRSxHQUFHO2dCQUNmLElBQUksRUFBRSxrQkFBa0I7YUFDekIsQ0FBQztTQUNIO0tBQ0Y7QUFDSCxDQUFDLENBQUM7QUExQlcsUUFBQSxPQUFPLFdBMEJsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWxhbWJkYVwiO1xuLy8gaW1wb3J0IHsgR2V0Q3VzdG9tZXJBZGRyZXNzIH0gZnJvbSAnLi4vbW9kdWxlcy9nZXREYXRhJztcblxuZXhwb3J0IGNvbnN0IGhhbmRsZXI6IEhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IGFueSkgPT4ge1xuICB0cnkge1xuICAgIC8vIGNvbnN0IHsgdXNlcklkLCBzdWJ1cmIsIHBvc3Rjb2RlIH0gPSBldmVudC5xdWVyeVN0cmluZ1BhcmFtZXRlcnM7XG4gICAgLy8gaWYgKCF1c2VySWQpIHtcbiAgICAvLyAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgcGFyYW1ldGVyOiB1c2VySWRcIik7XG4gICAgLy8gfVxuICAgIC8vIGNvbnN0IG1hbmFnZURldmljZSA9IG5ldyBHZXRDdXN0b21lckFkZHJlc3ModXNlcklkLCBzdWJ1cmIsIHBvc3Rjb2RlKTtcbiAgICAvLyBjb25zdCByZXN1bHQgPSBhd2FpdCBtYW5hZ2VEZXZpY2UuZ2V0RGF0YSgpO1xuICAgIGNvbnNvbGUubG9nKGV2ZW50KVxuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShldmVudCksXG4gICAgfTtcbiAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgaWYgKGUubWVzc2FnZS5pbmNsdWRlcygnTWlzc2luZyBwYXJhbWV0ZXInKSB8fCBlLm1lc3NhZ2UuaW5jbHVkZXMoJ0ludmFsaWQgZm9ybWF0JykpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDQwMCxcbiAgICAgICAgYm9keTogZS5tZXNzYWdlLFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogNDAzLFxuICAgICAgICBib2R5OiAnRm9yYmlkZGVuIGFjY2VzcycsXG4gICAgICB9O1xuICAgIH1cbiAgfVxufTtcbiJdfQ==