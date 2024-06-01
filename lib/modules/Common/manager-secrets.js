"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManageSecrets = void 0;
const client_secrets_manager_1 = require("@aws-sdk/client-secrets-manager");
class ManageSecrets {
    constructor(props) {
        this.client = new client_secrets_manager_1.SecretsManagerClient({ region: 'ap-southeast-2' });
        this.secretDetails = props;
    }
    async getSecretValue() {
        try {
            const response = await this.client.send(new client_secrets_manager_1.GetSecretValueCommand({ SecretId: this.secretDetails.secretName }));
            if (response.SecretString) {
                const secret = JSON.parse(response.SecretString);
                return {
                    PhysicalResourceId: this.secretDetails.secretName,
                    Data: {
                        SecretValue: secret.key // Adjust 'key' to the actual key in your secret
                    }
                };
            }
            else {
                throw new Error('Secret value not found');
            }
        }
        catch (error) {
            console.error("Error retrieving secret:", error);
            throw error;
        }
    }
}
exports.ManageSecrets = ManageSecrets;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlci1zZWNyZXRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvQ29tbW9uL21hbmFnZXItc2VjcmV0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0RUFBOEY7QUFPOUYsTUFBYSxhQUFhO0lBSXRCLFlBQVksS0FBcUI7UUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLDZDQUFvQixDQUFDLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztJQUMvQixDQUFDO0lBQ00sS0FBSyxDQUFDLGNBQWM7UUFDdkIsSUFBSTtZQUNGLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSw4Q0FBcUIsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUVoSCxJQUFJLFFBQVEsQ0FBQyxZQUFZLEVBQUU7Z0JBQ3pCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNqRCxPQUFPO29CQUNMLGtCQUFrQixFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVTtvQkFDakQsSUFBSSxFQUFFO3dCQUNKLFdBQVcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLGdEQUFnRDtxQkFDekU7aUJBQ0YsQ0FBQzthQUNIO2lCQUFNO2dCQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQzthQUMzQztTQUNGO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLDBCQUEwQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2pELE1BQU0sS0FBSyxDQUFDO1NBQ2I7SUFDSCxDQUFDO0NBQ047QUE1QkQsc0NBNEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2V0U2VjcmV0VmFsdWVDb21tYW5kLCBTZWNyZXRzTWFuYWdlckNsaWVudCB9IGZyb20gJ0Bhd3Mtc2RrL2NsaWVudC1zZWNyZXRzLW1hbmFnZXInO1xuXG5cbmludGVyZmFjZSBzZWNyZXREZXRhaWxzIHtcbiAgICBzZWNyZXROYW1lOiBzdHJpbmdcbiAgfSAgXG5cbmV4cG9ydCBjbGFzcyBNYW5hZ2VTZWNyZXRzIHtcbiAgICBwdWJsaWMgY2xpZW50IDogU2VjcmV0c01hbmFnZXJDbGllbnQ7XG4gICAgcHJpdmF0ZSBzZWNyZXREZXRhaWxzOiBzZWNyZXREZXRhaWxzO1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMgOiBzZWNyZXREZXRhaWxzKXtcbiAgICAgICAgdGhpcy5jbGllbnQgPSBuZXcgU2VjcmV0c01hbmFnZXJDbGllbnQoeyByZWdpb246ICdhcC1zb3V0aGVhc3QtMicgfSk7XG4gICAgICAgIHRoaXMuc2VjcmV0RGV0YWlscyA9IHByb3BzO1xuICAgIH1cbiAgICBwdWJsaWMgYXN5bmMgZ2V0U2VjcmV0VmFsdWUoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNsaWVudC5zZW5kKG5ldyBHZXRTZWNyZXRWYWx1ZUNvbW1hbmQoeyBTZWNyZXRJZDogdGhpcy5zZWNyZXREZXRhaWxzLnNlY3JldE5hbWUgfSkpO1xuICAgICAgXG4gICAgICAgICAgaWYgKHJlc3BvbnNlLlNlY3JldFN0cmluZykge1xuICAgICAgICAgICAgY29uc3Qgc2VjcmV0ID0gSlNPTi5wYXJzZShyZXNwb25zZS5TZWNyZXRTdHJpbmcpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgUGh5c2ljYWxSZXNvdXJjZUlkOiB0aGlzLnNlY3JldERldGFpbHMuc2VjcmV0TmFtZSxcbiAgICAgICAgICAgICAgRGF0YToge1xuICAgICAgICAgICAgICAgIFNlY3JldFZhbHVlOiBzZWNyZXQua2V5IC8vIEFkanVzdCAna2V5JyB0byB0aGUgYWN0dWFsIGtleSBpbiB5b3VyIHNlY3JldFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NlY3JldCB2YWx1ZSBub3QgZm91bmQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHJldHJpZXZpbmcgc2VjcmV0OlwiLCBlcnJvcik7XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbn0iXX0=