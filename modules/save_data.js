"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManageSaveData = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
class ManageSaveData {
    constructor(tableName = '') {
        this.tableName = tableName;
    }
    async saveDevice(DeviceToken, Key, ForgeId) {
        const client = lib_dynamodb_1.DynamoDBDocumentClient.from(new client_dynamodb_1.DynamoDBClient({ region: process.env.AWS_REGION }));
        const params = {
            TableName: this.tableName,
            Item: {
                DeviceToken: DeviceToken,
                Key: Key,
                ForgeId: ForgeId || 'anonymous',
            },
        };
        try {
            const result = await client.send(new lib_dynamodb_1.PutCommand(params));
            if (result.$metadata && result.$metadata.httpStatusCode && result.$metadata.httpStatusCode == 200) {
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
}
exports.ManageSaveData = ManageSaveData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZV9kYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2F2ZV9kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhEQUEwRDtBQUUxRCx3REFJK0I7QUFHL0IsTUFBYSxjQUFjO0lBR3pCLFlBQVksWUFBb0IsRUFBRTtRQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDO0lBRVEsS0FBSyxDQUFDLFVBQVUsQ0FBQyxXQUFtQixFQUFFLEdBQVcsRUFBRSxPQUFnQjtRQUN4RSxNQUFNLE1BQU0sR0FBRyxxQ0FBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxnQ0FBYyxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25HLE1BQU0sTUFBTSxHQUFvQjtZQUM5QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVU7WUFDMUIsSUFBSSxFQUFFO2dCQUNKLFdBQVcsRUFBRSxXQUFXO2dCQUN4QixHQUFHLEVBQUUsR0FBRztnQkFDUixPQUFPLEVBQUUsT0FBTyxJQUFJLFdBQVc7YUFDaEM7U0FDRixDQUFDO1FBRUYsSUFBSTtZQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLHlCQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN6RCxJQUFJLE1BQU0sQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLElBQUksR0FBRyxFQUFFO2dCQUNqRyxPQUFPLElBQUksQ0FBQzthQUNiO2lCQUFNO2dCQUNMLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7U0FDRjtRQUFDLE9BQU8sR0FBUSxFQUFFO1lBQ2pCLE1BQU0sR0FBRyxDQUFDO1NBQ1g7SUFDSCxDQUFDO0NBQ0o7QUE3QkQsd0NBNkJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRHluYW1vREJDbGllbnQgfSBmcm9tICdAYXdzLXNkay9jbGllbnQtZHluYW1vZGInO1xuXG5pbXBvcnQge1xuICBEeW5hbW9EQkRvY3VtZW50Q2xpZW50LFxuICBQdXRDb21tYW5kLFxuICBQdXRDb21tYW5kSW5wdXQsXG59IGZyb20gJ0Bhd3Mtc2RrL2xpYi1keW5hbW9kYic7XG5cblxuZXhwb3J0IGNsYXNzIE1hbmFnZVNhdmVEYXRhIHtcblxuICBwdWJsaWMgdGFibGVOYW1lOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKHRhYmxlTmFtZTogc3RyaW5nID0gJycpIHtcbiAgICB0aGlzLnRhYmxlTmFtZSA9IHRhYmxlTmFtZTtcbiAgfVxuXG4gICAgcHVibGljIGFzeW5jIHNhdmVEZXZpY2UoRGV2aWNlVG9rZW46IHN0cmluZywgS2V5OiBzdHJpbmcsIEZvcmdlSWQ/OiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgIGNvbnN0IGNsaWVudCA9IER5bmFtb0RCRG9jdW1lbnRDbGllbnQuZnJvbShuZXcgRHluYW1vREJDbGllbnQoeyByZWdpb246IHByb2Nlc3MuZW52LkFXU19SRUdJT04gfSkpO1xuICAgICAgY29uc3QgcGFyYW1zOiBQdXRDb21tYW5kSW5wdXQgPSB7XG4gICAgICAgIFRhYmxlTmFtZTogdGhpcy50YWJsZU5hbWUhLFxuICAgICAgICBJdGVtOiB7XG4gICAgICAgICAgRGV2aWNlVG9rZW46IERldmljZVRva2VuLFxuICAgICAgICAgIEtleTogS2V5LFxuICAgICAgICAgIEZvcmdlSWQ6IEZvcmdlSWQgfHwgJ2Fub255bW91cycsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICBcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNsaWVudC5zZW5kKG5ldyBQdXRDb21tYW5kKHBhcmFtcykpO1xuICAgICAgICBpZiAocmVzdWx0LiRtZXRhZGF0YSAmJiByZXN1bHQuJG1ldGFkYXRhLmh0dHBTdGF0dXNDb2RlICYmIHJlc3VsdC4kbWV0YWRhdGEuaHR0cFN0YXR1c0NvZGUgPT0gMjAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfVxufSJdfQ==