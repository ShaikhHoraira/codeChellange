export declare class GetCustomerAddress {
    userId: string;
    suburb?: string;
    postcode?: string;
    constructor(userId: string, suburb?: string, postcode?: string);
    getData(): Promise<any[]>;
}
