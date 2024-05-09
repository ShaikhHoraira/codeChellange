export declare class SaveCustomerAddress {
    payload: any;
    constructor(payLoad: any);
    saveData(): Promise<true | {
        statusCode: number;
        body: unknown;
    }>;
}
