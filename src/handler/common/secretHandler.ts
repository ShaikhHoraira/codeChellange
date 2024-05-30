import * as AWS from 'aws-sdk';
const secretsManager = new AWS.SecretsManager();
import { Handler } from "aws-lambda";

export const handler: Handler = async function(_event : any) {
  const secretName = process.env.SECRET_NAME;
  if (!secretName) {
    throw new Error('Environment variable SECRET_NAME is not defined');
  }
  try {
    const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
    const secret = JSON.parse(data.SecretString!);
    return {
      PhysicalResourceId: secretName,
      Data: {
        SecretValue: secret.key
      }
    };
  } catch (error: any) {
    console.error(error);
    throw new Error(`Error retrieving secret: ${error.message}`);
  }
};
