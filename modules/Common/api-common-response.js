"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiCommonResponse = void 0;
class ApiCommonResponse {
    /**
     * @param statusCode type Number
     * @param message type string
     * @param requestID type string
     * @param data type any
     * @param reason type string
     */
    setResponseWithData(statusCode, message, requestID, data) {
        var responseData = {
            statusCode: statusCode,
            body: JSON.stringify({
                MessageBody: {
                    Message: message,
                    RequestID: requestID,
                    Data: data,
                },
            }),
        };
        return responseData;
    }
    setResponseWithReason(statusCode, message, requestID, reason) {
        var responseReason = {
            statusCode: statusCode,
            body: JSON.stringify({
                MessageBody: {
                    Message: message,
                    RequestID: requestID,
                    Reason: reason,
                },
            }),
        };
        return responseReason;
    }
    setResponseWithOutReason(statusCode, message, requestID) {
        var responseReason = {
            statusCode: statusCode,
            body: JSON.stringify({
                MessageBody: {
                    Message: message,
                    RequestID: requestID,
                },
            }),
            headers: { 'content-type': 'application/json' },
        };
        return responseReason;
    }
}
exports.ApiCommonResponse = ApiCommonResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLWNvbW1vbi1yZXNwb25zZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwaS1jb21tb24tcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBYSxpQkFBaUI7SUFDMUI7Ozs7OztPQU1HO0lBRUksbUJBQW1CLENBQUMsVUFBa0IsRUFBRSxPQUFlLEVBQUUsU0FBaUIsRUFBRSxJQUFTO1FBQzFGLElBQUksWUFBWSxHQUFHO1lBQ2pCLFVBQVUsRUFBRSxVQUFVO1lBQ3RCLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUNsQjtnQkFDRSxXQUFXLEVBQ1Q7b0JBQ0UsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLFNBQVMsRUFBRSxTQUFTO29CQUNwQixJQUFJLEVBQUUsSUFBSTtpQkFDWDthQUNKLENBQUM7U0FDTCxDQUFDO1FBQ0YsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQztJQUVNLHFCQUFxQixDQUFDLFVBQWtCLEVBQUUsT0FBZSxFQUFFLFNBQWlCLEVBQUUsTUFBYztRQUNqRyxJQUFJLGNBQWMsR0FBRztZQUNuQixVQUFVLEVBQUUsVUFBVTtZQUN0QixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FDbEI7Z0JBQ0UsV0FBVyxFQUNUO29CQUNFLE9BQU8sRUFBRSxPQUFPO29CQUNoQixTQUFTLEVBQUUsU0FBUztvQkFDcEIsTUFBTSxFQUFFLE1BQU07aUJBQ2Y7YUFDSixDQUFDO1NBQ0wsQ0FBQztRQUNGLE9BQU8sY0FBYyxDQUFDO0lBQ3hCLENBQUM7SUFFTSx3QkFBd0IsQ0FBQyxVQUFrQixFQUFFLE9BQWUsRUFBRSxTQUFrQjtRQUNyRixJQUFJLGNBQWMsR0FBRztZQUNuQixVQUFVLEVBQUUsVUFBVTtZQUN0QixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FDbEI7Z0JBQ0UsV0FBVyxFQUNUO29CQUNFLE9BQU8sRUFBRSxPQUFPO29CQUNoQixTQUFTLEVBQUUsU0FBUztpQkFDckI7YUFDSixDQUFDO1lBQ0osT0FBTyxFQUFFLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFO1NBQ2hELENBQUM7UUFDRixPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDO0NBQ0Y7QUF4REgsOENBd0RHIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEFwaUNvbW1vblJlc3BvbnNlIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc3RhdHVzQ29kZSB0eXBlIE51bWJlclxuICAgICAqIEBwYXJhbSBtZXNzYWdlIHR5cGUgc3RyaW5nXG4gICAgICogQHBhcmFtIHJlcXVlc3RJRCB0eXBlIHN0cmluZ1xuICAgICAqIEBwYXJhbSBkYXRhIHR5cGUgYW55XG4gICAgICogQHBhcmFtIHJlYXNvbiB0eXBlIHN0cmluZ1xuICAgICAqL1xuICBcbiAgICBwdWJsaWMgc2V0UmVzcG9uc2VXaXRoRGF0YShzdGF0dXNDb2RlOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZywgcmVxdWVzdElEOiBzdHJpbmcsIGRhdGE6IGFueSkge1xuICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9IHtcbiAgICAgICAgc3RhdHVzQ29kZTogc3RhdHVzQ29kZSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAge1xuICAgICAgICAgICAgTWVzc2FnZUJvZHk6XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBNZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICAgICAgICAgIFJlcXVlc3RJRDogcmVxdWVzdElELFxuICAgICAgICAgICAgICAgIERhdGE6IGRhdGEsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSksXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHJlc3BvbnNlRGF0YTtcbiAgICB9XG4gIFxuICAgIHB1YmxpYyBzZXRSZXNwb25zZVdpdGhSZWFzb24oc3RhdHVzQ29kZTogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcsIHJlcXVlc3RJRDogc3RyaW5nLCByZWFzb246IHN0cmluZykge1xuICAgICAgdmFyIHJlc3BvbnNlUmVhc29uID0ge1xuICAgICAgICBzdGF0dXNDb2RlOiBzdGF0dXNDb2RlLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICB7XG4gICAgICAgICAgICBNZXNzYWdlQm9keTpcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIE1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgUmVxdWVzdElEOiByZXF1ZXN0SUQsXG4gICAgICAgICAgICAgICAgUmVhc29uOiByZWFzb24sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSksXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHJlc3BvbnNlUmVhc29uO1xuICAgIH1cbiAgXG4gICAgcHVibGljIHNldFJlc3BvbnNlV2l0aE91dFJlYXNvbihzdGF0dXNDb2RlOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZywgcmVxdWVzdElEPzogc3RyaW5nKSB7XG4gICAgICB2YXIgcmVzcG9uc2VSZWFzb24gPSB7XG4gICAgICAgIHN0YXR1c0NvZGU6IHN0YXR1c0NvZGUsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIE1lc3NhZ2VCb2R5OlxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgTWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgICAgICAgICBSZXF1ZXN0SUQ6IHJlcXVlc3RJRCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgaGVhZGVyczogeyAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHJlc3BvbnNlUmVhc29uO1xuICAgIH1cbiAgfVxuICAiXX0=