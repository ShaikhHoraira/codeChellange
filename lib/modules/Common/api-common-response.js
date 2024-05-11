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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLWNvbW1vbi1yZXNwb25zZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL0NvbW1vbi9hcGktY29tbW9uLXJlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQWEsaUJBQWlCO0lBQzFCOzs7Ozs7T0FNRztJQUVJLG1CQUFtQixDQUFDLFVBQWtCLEVBQUUsT0FBZSxFQUFFLFNBQWlCLEVBQUUsSUFBUztRQUMxRixJQUFJLFlBQVksR0FBRztZQUNqQixVQUFVLEVBQUUsVUFBVTtZQUN0QixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FDbEI7Z0JBQ0UsV0FBVyxFQUNUO29CQUNFLE9BQU8sRUFBRSxPQUFPO29CQUNoQixTQUFTLEVBQUUsU0FBUztvQkFDcEIsSUFBSSxFQUFFLElBQUk7aUJBQ1g7YUFDSixDQUFDO1NBQ0wsQ0FBQztRQUNGLE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7SUFFTSxxQkFBcUIsQ0FBQyxVQUFrQixFQUFFLE9BQWUsRUFBRSxTQUFpQixFQUFFLE1BQWM7UUFDakcsSUFBSSxjQUFjLEdBQUc7WUFDbkIsVUFBVSxFQUFFLFVBQVU7WUFDdEIsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQ2xCO2dCQUNFLFdBQVcsRUFDVDtvQkFDRSxPQUFPLEVBQUUsT0FBTztvQkFDaEIsU0FBUyxFQUFFLFNBQVM7b0JBQ3BCLE1BQU0sRUFBRSxNQUFNO2lCQUNmO2FBQ0osQ0FBQztTQUNMLENBQUM7UUFDRixPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDO0lBRU0sd0JBQXdCLENBQUMsVUFBa0IsRUFBRSxPQUFlLEVBQUUsU0FBa0I7UUFDckYsSUFBSSxjQUFjLEdBQUc7WUFDbkIsVUFBVSxFQUFFLFVBQVU7WUFDdEIsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQ2xCO2dCQUNFLFdBQVcsRUFDVDtvQkFDRSxPQUFPLEVBQUUsT0FBTztvQkFDaEIsU0FBUyxFQUFFLFNBQVM7aUJBQ3JCO2FBQ0osQ0FBQztZQUNKLE9BQU8sRUFBRSxFQUFFLGNBQWMsRUFBRSxrQkFBa0IsRUFBRTtTQUNoRCxDQUFDO1FBQ0YsT0FBTyxjQUFjLENBQUM7SUFDeEIsQ0FBQztDQUNGO0FBeERILDhDQXdERyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBBcGlDb21tb25SZXNwb25zZSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHN0YXR1c0NvZGUgdHlwZSBOdW1iZXJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSB0eXBlIHN0cmluZ1xuICAgICAqIEBwYXJhbSByZXF1ZXN0SUQgdHlwZSBzdHJpbmdcbiAgICAgKiBAcGFyYW0gZGF0YSB0eXBlIGFueVxuICAgICAqIEBwYXJhbSByZWFzb24gdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgXG4gICAgcHVibGljIHNldFJlc3BvbnNlV2l0aERhdGEoc3RhdHVzQ29kZTogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcsIHJlcXVlc3RJRDogc3RyaW5nLCBkYXRhOiBhbnkpIHtcbiAgICAgIHZhciByZXNwb25zZURhdGEgPSB7XG4gICAgICAgIHN0YXR1c0NvZGU6IHN0YXR1c0NvZGUsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIE1lc3NhZ2VCb2R5OlxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgTWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgICAgICAgICBSZXF1ZXN0SUQ6IHJlcXVlc3RJRCxcbiAgICAgICAgICAgICAgICBEYXRhOiBkYXRhLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgIH0pLFxuICAgICAgfTtcbiAgICAgIHJldHVybiByZXNwb25zZURhdGE7XG4gICAgfVxuICBcbiAgICBwdWJsaWMgc2V0UmVzcG9uc2VXaXRoUmVhc29uKHN0YXR1c0NvZGU6IG51bWJlciwgbWVzc2FnZTogc3RyaW5nLCByZXF1ZXN0SUQ6IHN0cmluZywgcmVhc29uOiBzdHJpbmcpIHtcbiAgICAgIHZhciByZXNwb25zZVJlYXNvbiA9IHtcbiAgICAgICAgc3RhdHVzQ29kZTogc3RhdHVzQ29kZSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAge1xuICAgICAgICAgICAgTWVzc2FnZUJvZHk6XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBNZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICAgICAgICAgIFJlcXVlc3RJRDogcmVxdWVzdElELFxuICAgICAgICAgICAgICAgIFJlYXNvbjogcmVhc29uLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgIH0pLFxuICAgICAgfTtcbiAgICAgIHJldHVybiByZXNwb25zZVJlYXNvbjtcbiAgICB9XG4gIFxuICAgIHB1YmxpYyBzZXRSZXNwb25zZVdpdGhPdXRSZWFzb24oc3RhdHVzQ29kZTogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcsIHJlcXVlc3RJRD86IHN0cmluZykge1xuICAgICAgdmFyIHJlc3BvbnNlUmVhc29uID0ge1xuICAgICAgICBzdGF0dXNDb2RlOiBzdGF0dXNDb2RlLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICB7XG4gICAgICAgICAgICBNZXNzYWdlQm9keTpcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIE1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgUmVxdWVzdElEOiByZXF1ZXN0SUQsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSksXG4gICAgICAgIGhlYWRlcnM6IHsgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgfTtcbiAgICAgIHJldHVybiByZXNwb25zZVJlYXNvbjtcbiAgICB9XG4gIH1cbiAgIl19