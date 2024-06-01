import { SecretsManagerClient } from '@aws-sdk/client-secrets-manager';
interface secretDetails {
    secretName: string;
}
export declare class ManageSecrets {
    client: SecretsManagerClient;
    private secretDetails;
    constructor(props: secretDetails);
    getSecretValue(): Promise<{
        PhysicalResourceId: string;
        Data: {
            SecretValue: any;
        };
    }>;
}
export {};
