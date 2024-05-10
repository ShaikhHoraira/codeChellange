export class ApiCommonResponse {
    /**
     * @param statusCode type Number
     * @param message type string
     * @param requestID type string
     * @param data type any
     * @param reason type string
     */
  
    public setResponseWithData(statusCode: number, message: string, requestID: string, data: any) {
      var responseData = {
        statusCode: statusCode,
        body: JSON.stringify(
          {
            MessageBody:
              {
                Message: message,
                RequestID: requestID,
                Data: data,
              },
          }),
      };
      return responseData;
    }
  
    public setResponseWithReason(statusCode: number, message: string, requestID: string, reason: string) {
      var responseReason = {
        statusCode: statusCode,
        body: JSON.stringify(
          {
            MessageBody:
              {
                Message: message,
                RequestID: requestID,
                Reason: reason,
              },
          }),
      };
      return responseReason;
    }
  
    public setResponseWithOutReason(statusCode: number, message: string, requestID?: string) {
      var responseReason = {
        statusCode: statusCode,
        body: JSON.stringify(
          {
            MessageBody:
              {
                Message: message,
                RequestID: requestID,
              },
          }),
        headers: { 'content-type': 'application/json' },
      };
      return responseReason;
    }
  }
  