export declare class ApiCommonResponse {
    /**
     * @param statusCode type Number
     * @param message type string
     * @param requestID type string
     * @param data type any
     * @param reason type string
     */
    setResponseWithData(statusCode: number, message: string, requestID: string, data: any): {
        statusCode: number;
        body: string;
    };
    setResponseWithReason(statusCode: number, message: string, requestID: string, reason: string): {
        statusCode: number;
        body: string;
    };
    setResponseWithOutReason(statusCode: number, message: string, requestID?: string): {
        statusCode: number;
        body: string;
        headers: {
            'content-type': string;
        };
    };
}
