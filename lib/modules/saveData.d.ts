export declare class SaveCustomerAddress {
    private ddbClient;
    payload: any;
    constructor(payload: any);
    saveData(): Promise<any>;
}
