import { ManageSecrets } from '../../modules/Common/manager-secrets'

export const handler = async (_event: any) => {
  const secretName = process.env.SECRET_NAME;
  if (!secretName) {
    throw new Error('Environment variable SECRET_NAME is not defined');
  }
  try {
    const manageSecrets = new ManageSecrets({secretName});
    const secretRetunr  = manageSecrets.getSecretValue();
    return secretRetunr
  } catch (error : any) {
    console.error(error);
    throw new Error(`Error retrieving secret: ${error.message}`);
  }
};
