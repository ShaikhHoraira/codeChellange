export declare class GetMarketingCostData {
    marketingInvoiceId: string;
    constructor(marketingInvoiceId: string);
    getMarketingData(): Promise<any[]>;
}
