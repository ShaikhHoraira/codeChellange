"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManageGetData = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
class ManageGetData {
    /**
 * Return the device information given the deviceToken
 * @param deviceToken
 */
    async getDeviceByDeviceToken(deviceToken) {
        const client = lib_dynamodb_1.DynamoDBDocumentClient.from(new client_dynamodb_1.DynamoDBClient({ region: process.env.AWS_REGION }));
        const params = {
            TableName: process.env.DbTableName,
            Key: { DeviceToken: deviceToken },
        };
        try {
            const result = await client.send(new lib_dynamodb_1.GetCommand(params));
            if (result.Item) {
                return result.Item;
            }
            else {
                return {};
            }
        }
        catch (err) {
            throw err;
        }
    }
}
exports.ManageGetData = ManageGetData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0X2RhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRfZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4REFBMEQ7QUFFMUQsd0RBSStCO0FBRy9CLE1BQWEsYUFBYTtJQUNwQjs7O0dBR0Q7SUFDSSxLQUFLLENBQUMsc0JBQXNCLENBQUMsV0FBbUI7UUFDckQsTUFBTSxNQUFNLEdBQUcscUNBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksZ0NBQWMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVuRyxNQUFNLE1BQU0sR0FBb0I7WUFDOUIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBWTtZQUNuQyxHQUFHLEVBQUUsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFO1NBQ2xDLENBQUM7UUFFRixJQUFJO1lBQ0YsTUFBTSxNQUFNLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUkseUJBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3pELElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtnQkFDZixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDcEI7aUJBQU07Z0JBQ0wsT0FBTyxFQUFFLENBQUM7YUFDWDtTQUNGO1FBQUMsT0FBTyxHQUFRLEVBQUU7WUFDakIsTUFBTSxHQUFHLENBQUM7U0FDWDtJQUNILENBQUM7Q0FDRjtBQXhCRCxzQ0F3QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEeW5hbW9EQkNsaWVudCB9IGZyb20gJ0Bhd3Mtc2RrL2NsaWVudC1keW5hbW9kYic7XG5cbmltcG9ydCB7XG4gIER5bmFtb0RCRG9jdW1lbnRDbGllbnQsXG4gIEdldENvbW1hbmQsXG4gIEdldENvbW1hbmRJbnB1dCxcbn0gZnJvbSAnQGF3cy1zZGsvbGliLWR5bmFtb2RiJztcblxuXG5leHBvcnQgY2xhc3MgTWFuYWdlR2V0RGF0YSB7XG4gICAgICAvKipcbiAgICogUmV0dXJuIHRoZSBkZXZpY2UgaW5mb3JtYXRpb24gZ2l2ZW4gdGhlIGRldmljZVRva2VuXG4gICAqIEBwYXJhbSBkZXZpY2VUb2tlblxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldERldmljZUJ5RGV2aWNlVG9rZW4oZGV2aWNlVG9rZW46IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgY2xpZW50ID0gRHluYW1vREJEb2N1bWVudENsaWVudC5mcm9tKG5ldyBEeW5hbW9EQkNsaWVudCh7IHJlZ2lvbjogcHJvY2Vzcy5lbnYuQVdTX1JFR0lPTiB9KSk7XG5cbiAgICBjb25zdCBwYXJhbXM6IEdldENvbW1hbmRJbnB1dCA9IHtcbiAgICAgIFRhYmxlTmFtZTogcHJvY2Vzcy5lbnYuRGJUYWJsZU5hbWUhLFxuICAgICAgS2V5OiB7IERldmljZVRva2VuOiBkZXZpY2VUb2tlbiB9LFxuICAgIH07XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2xpZW50LnNlbmQobmV3IEdldENvbW1hbmQocGFyYW1zKSk7XG4gICAgICBpZiAocmVzdWx0Lkl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5JdGVtO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9XG59Il19