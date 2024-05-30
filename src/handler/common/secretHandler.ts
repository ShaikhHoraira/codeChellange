import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';

export const handler = async (event: any) => {
  const secretName = event.ResourceProperties.SECRET_NAME;
  if (!secretName) {
    throw new Error('Environment variable SECRET_NAME is not defined');
  }

  // Create an instance of SecretsManagerClient
  const client = new SecretsManagerClient({ region: 'ap-southeast-2' });

  try {
    // Execute GetSecretValueCommand to retrieve the secret value
    const response = await client.send(new GetSecretValueCommand({ SecretId: secretName }));

    // Handle the response and access the secret value
    if (response.SecretString) {
      const secret = JSON.parse(response.SecretString);
      return {
        PhysicalResourceId: secretName,
        Data: {
          SecretValue: secret.key
        }
      };
    } else {
      throw new Error('Secret value not found');
    }
  } catch (error : any) {
    console.error(error);
    throw new Error(`Error retrieving secret: ${error.message}`);
  }
};
