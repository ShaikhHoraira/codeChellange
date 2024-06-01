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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlci1zZWNyZXRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvQ29tbW9uL21hbmFnZXItc2VjcmV0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0RUFBOEY7QUFPOUYsTUFBYSxhQUFhO0lBSXRCLFlBQVksS0FBcUI7UUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLDZDQUFvQixDQUFDLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztJQUMvQixDQUFDO0lBRU0sS0FBSyxDQUFDLGNBQWM7UUFDdkIsSUFBSTtZQUNGLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSw4Q0FBcUIsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUVoSCxJQUFJLFFBQVEsQ0FBQyxZQUFZLEVBQUU7Z0JBQ3pCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNqRCxPQUFPO29CQUNMLGtCQUFrQixFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVTtvQkFDakQsSUFBSSxFQUFFO3dCQUNKLFdBQVcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLGdEQUFnRDtxQkFDekU7aUJBQ0YsQ0FBQzthQUNIO2lCQUFNO2dCQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQzthQUMzQztTQUNGO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLDBCQUEwQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2pELE1BQU0sS0FBSyxDQUFDO1NBQ2I7SUFDSCxDQUFDO0NBQ047QUE3QkQsc0NBNkJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2V0U2VjcmV0VmFsdWVDb21tYW5kLCBTZWNyZXRzTWFuYWdlckNsaWVudCB9IGZyb20gJ0Bhd3Mtc2RrL2NsaWVudC1zZWNyZXRzLW1hbmFnZXInO1xuXG5cbmludGVyZmFjZSBzZWNyZXREZXRhaWxzIHtcbiAgICBzZWNyZXROYW1lOiBzdHJpbmdcbiAgfSAgXG5cbmV4cG9ydCBjbGFzcyBNYW5hZ2VTZWNyZXRzIHtcbiAgICBwdWJsaWMgY2xpZW50IDogU2VjcmV0c01hbmFnZXJDbGllbnQ7XG4gICAgcHJpdmF0ZSBzZWNyZXREZXRhaWxzOiBzZWNyZXREZXRhaWxzO1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMgOiBzZWNyZXREZXRhaWxzKXtcbiAgICAgICAgdGhpcy5jbGllbnQgPSBuZXcgU2VjcmV0c01hbmFnZXJDbGllbnQoeyByZWdpb246ICdhcC1zb3V0aGVhc3QtMicgfSk7XG4gICAgICAgIHRoaXMuc2VjcmV0RGV0YWlscyA9IHByb3BzO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBnZXRTZWNyZXRWYWx1ZSgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuY2xpZW50LnNlbmQobmV3IEdldFNlY3JldFZhbHVlQ29tbWFuZCh7IFNlY3JldElkOiB0aGlzLnNlY3JldERldGFpbHMuc2VjcmV0TmFtZSB9KSk7XG4gICAgICBcbiAgICAgICAgICBpZiAocmVzcG9uc2UuU2VjcmV0U3RyaW5nKSB7XG4gICAgICAgICAgICBjb25zdCBzZWNyZXQgPSBKU09OLnBhcnNlKHJlc3BvbnNlLlNlY3JldFN0cmluZyk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBQaHlzaWNhbFJlc291cmNlSWQ6IHRoaXMuc2VjcmV0RGV0YWlscy5zZWNyZXROYW1lLFxuICAgICAgICAgICAgICBEYXRhOiB7XG4gICAgICAgICAgICAgICAgU2VjcmV0VmFsdWU6IHNlY3JldC5rZXkgLy8gQWRqdXN0ICdrZXknIHRvIHRoZSBhY3R1YWwga2V5IGluIHlvdXIgc2VjcmV0XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU2VjcmV0IHZhbHVlIG5vdCBmb3VuZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcmV0cmlldmluZyBzZWNyZXQ6XCIsIGVycm9yKTtcbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxufSJdfQ==