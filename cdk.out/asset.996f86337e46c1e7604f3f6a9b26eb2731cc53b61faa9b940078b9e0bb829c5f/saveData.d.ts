export declare class ManageDevice {
    payload: any;
    constructor(payLoad: any);
    saveData(): Promise<true | {
        statusCode: number;
        body: unknown;
    }>;
}
