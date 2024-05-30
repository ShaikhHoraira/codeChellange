"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_secrets_manager_1 = require("@aws-sdk/client-secrets-manager");
const handler = async (_event) => {
    const secretName = process.env.SECRET_NAME;
    if (!secretName) {
        throw new Error('Environment variable SECRET_NAME is not defined');
    }
    // Create an instance of SecretsManagerClient
    const client = new client_secrets_manager_1.SecretsManagerClient({ region: 'ap-southeast-2' });
    try {
        // Execute GetSecretValueCommand to retrieve the secret value
        const response = await client.send(new client_secrets_manager_1.GetSecretValueCommand({ SecretId: secretName }));
        // Handle the response and access the secret value
        if (response.SecretString) {
            const secret = JSON.parse(response.SecretString);
            return {
                PhysicalResourceId: secretName,
                Data: {
                    SecretValue: secret.key
                }
            };
        }
        else {
            throw new Error('Secret value not found');
        }
    }
    catch (error) {
        console.error(error);
        throw new Error(`Error retrieving secret: ${error.message}`);
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjcmV0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVyL2NvbW1vbi9zZWNyZXRIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDRFQUE4RjtBQUV2RixNQUFNLE9BQU8sR0FBRyxLQUFLLEVBQUUsTUFBVyxFQUFFLEVBQUU7SUFDM0MsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7SUFDM0MsSUFBSSxDQUFDLFVBQVUsRUFBRTtRQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQztLQUNwRTtJQUVELDZDQUE2QztJQUM3QyxNQUFNLE1BQU0sR0FBRyxJQUFJLDZDQUFvQixDQUFDLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQztJQUV0RSxJQUFJO1FBQ0YsNkRBQTZEO1FBQzdELE1BQU0sUUFBUSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLDhDQUFxQixDQUFDLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUV4RixrREFBa0Q7UUFDbEQsSUFBSSxRQUFRLENBQUMsWUFBWSxFQUFFO1lBQ3pCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2pELE9BQU87Z0JBQ0wsa0JBQWtCLEVBQUUsVUFBVTtnQkFDOUIsSUFBSSxFQUFFO29CQUNKLFdBQVcsRUFBRSxNQUFNLENBQUMsR0FBRztpQkFDeEI7YUFDRixDQUFDO1NBQ0g7YUFBTTtZQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztTQUMzQztLQUNGO0lBQUMsT0FBTyxLQUFXLEVBQUU7UUFDcEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztLQUM5RDtBQUNILENBQUMsQ0FBQztBQTdCVyxRQUFBLE9BQU8sV0E2QmxCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2V0U2VjcmV0VmFsdWVDb21tYW5kLCBTZWNyZXRzTWFuYWdlckNsaWVudCB9IGZyb20gJ0Bhd3Mtc2RrL2NsaWVudC1zZWNyZXRzLW1hbmFnZXInO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlciA9IGFzeW5jIChfZXZlbnQ6IGFueSkgPT4ge1xuICBjb25zdCBzZWNyZXROYW1lID0gcHJvY2Vzcy5lbnYuU0VDUkVUX05BTUU7XG4gIGlmICghc2VjcmV0TmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignRW52aXJvbm1lbnQgdmFyaWFibGUgU0VDUkVUX05BTUUgaXMgbm90IGRlZmluZWQnKTtcbiAgfVxuXG4gIC8vIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBTZWNyZXRzTWFuYWdlckNsaWVudFxuICBjb25zdCBjbGllbnQgPSBuZXcgU2VjcmV0c01hbmFnZXJDbGllbnQoeyByZWdpb246ICdhcC1zb3V0aGVhc3QtMicgfSk7XG5cbiAgdHJ5IHtcbiAgICAvLyBFeGVjdXRlIEdldFNlY3JldFZhbHVlQ29tbWFuZCB0byByZXRyaWV2ZSB0aGUgc2VjcmV0IHZhbHVlXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjbGllbnQuc2VuZChuZXcgR2V0U2VjcmV0VmFsdWVDb21tYW5kKHsgU2VjcmV0SWQ6IHNlY3JldE5hbWUgfSkpO1xuXG4gICAgLy8gSGFuZGxlIHRoZSByZXNwb25zZSBhbmQgYWNjZXNzIHRoZSBzZWNyZXQgdmFsdWVcbiAgICBpZiAocmVzcG9uc2UuU2VjcmV0U3RyaW5nKSB7XG4gICAgICBjb25zdCBzZWNyZXQgPSBKU09OLnBhcnNlKHJlc3BvbnNlLlNlY3JldFN0cmluZyk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBQaHlzaWNhbFJlc291cmNlSWQ6IHNlY3JldE5hbWUsXG4gICAgICAgIERhdGE6IHtcbiAgICAgICAgICBTZWNyZXRWYWx1ZTogc2VjcmV0LmtleVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NlY3JldCB2YWx1ZSBub3QgZm91bmQnKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yIDogYW55KSB7XG4gICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvciByZXRyaWV2aW5nIHNlY3JldDogJHtlcnJvci5tZXNzYWdlfWApO1xuICB9XG59O1xuIl19