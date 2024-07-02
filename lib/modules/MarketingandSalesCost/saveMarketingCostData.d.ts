export declare class SaveMarketingCostData {
    private ddbClient;
    payload: any;
    constructor(payload: any);
    saveMarketingData(): Promise<any>;
}
