import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';


interface secretDetails {
    secretName: string
  }  

export class ManageSecrets {
    public client : SecretsManagerClient;
    private secretDetails: secretDetails;

    constructor(props : secretDetails){
        this.client = new SecretsManagerClient({ region: 'ap-southeast-2' });
        this.secretDetails = props;
    }
    public async getSecretValue() {
        try {
          const response = await this.client.send(new GetSecretValueCommand({ SecretId: this.secretDetails.secretName }));
      
          if (response.SecretString) {
            const secret = JSON.parse(response.SecretString);
            return {
              PhysicalResourceId: this.secretDetails.secretName,
              Data: {
                SecretValue: secret.key // Adjust 'key' to the actual key in your secret
              }
            };
          } else {
            throw new Error('Secret value not found');
          }
        } catch (error) {
          console.error("Error retrieving secret:", error);
          throw error;
        }
      }
}