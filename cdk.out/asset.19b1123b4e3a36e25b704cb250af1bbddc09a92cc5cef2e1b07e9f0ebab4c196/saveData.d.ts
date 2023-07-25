export declare class ManageDevice {
    payload: any;
    constructor(payLooad: any);
    saveData(): Promise<true | {
        statusCode: number;
        body: unknown;
    }>;
}
