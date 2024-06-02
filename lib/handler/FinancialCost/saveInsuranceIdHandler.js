"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const saveInsuranceCostData_1 = require("../../modules/FinancialCost/saveInsuranceCostData");
const handler = async (event) => {
    console.log("We are in saveRentId");
    try {
        if (event.httpMethod === "POST") {
            const manageDevice = new saveInsuranceCostData_1.SaveInsuranceCostData(event);
            const responseData = await manageDevice.saveRentData();
            console.log("🚀 ~ consthandler:Handler= ~ responseData:", responseData);
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify('Success')
        };
        return response;
        // }
    }
    catch (e) {
        const errorResponse = {
            statusCode: 500,
            body: (typeof e === 'string') ? e : 'Invalid Request Body'
        };
        return errorResponse;
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUluc3VyYW5jZUlkSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVyL0ZpbmFuY2lhbENvc3Qvc2F2ZUluc3VyYW5jZUlkSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw2RkFBMEY7QUFFbkYsTUFBTSxPQUFPLEdBQVksS0FBSyxFQUFFLEtBQVUsRUFBRSxFQUFFO0lBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtJQUNuQyxJQUFJO1FBQ0YsSUFBSSxLQUFLLENBQUMsVUFBVSxLQUFLLE1BQU0sRUFBQztZQUM5QixNQUFNLFlBQVksR0FBRyxJQUFJLDZDQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RELE1BQU0sWUFBWSxHQUFHLE1BQU0sWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsNENBQTRDLEVBQUUsWUFBWSxDQUFDLENBQUE7U0FDeEU7UUFDRCxNQUFNLFFBQVEsR0FBRztZQUNmLFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1NBQ2hDLENBQUM7UUFDRixPQUFPLFFBQVEsQ0FBQztRQUNoQixJQUFJO0tBQ0w7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE1BQU0sYUFBYSxHQUFHO1lBQ3BCLFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsc0JBQXNCO1NBQzNELENBQUM7UUFDRixPQUFPLGFBQWEsQ0FBQztLQUN0QjtBQUNILENBQUMsQ0FBQTtBQXJCWSxRQUFBLE9BQU8sV0FxQm5CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gXCJhd3MtbGFtYmRhXCI7XG5pbXBvcnQgeyBTYXZlSW5zdXJhbmNlQ29zdERhdGEgfSBmcm9tICcuLi8uLi9tb2R1bGVzL0ZpbmFuY2lhbENvc3Qvc2F2ZUluc3VyYW5jZUNvc3REYXRhJztcblxuZXhwb3J0IGNvbnN0IGhhbmRsZXI6IEhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IGFueSkgPT4ge1xuICBjb25zb2xlLmxvZyhcIldlIGFyZSBpbiBzYXZlUmVudElkXCIpXG4gIHRyeSB7IFxuICAgIGlmIChldmVudC5odHRwTWV0aG9kID09PSBcIlBPU1RcIil7XG4gICAgICBjb25zdCBtYW5hZ2VEZXZpY2UgPSBuZXcgU2F2ZUluc3VyYW5jZUNvc3REYXRhKGV2ZW50KTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9IGF3YWl0IG1hbmFnZURldmljZS5zYXZlUmVudERhdGEoKTtcbiAgICAgIGNvbnNvbGUubG9nKFwi8J+agCB+IGNvbnN0aGFuZGxlcjpIYW5kbGVyPSB+IHJlc3BvbnNlRGF0YTpcIiwgcmVzcG9uc2VEYXRhKVxuICAgIH1cbiAgICBjb25zdCByZXNwb25zZSA9IHtcbiAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KCdTdWNjZXNzJylcbiAgICB9O1xuICAgIHJldHVybiByZXNwb25zZTtcbiAgICAvLyB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zdCBlcnJvclJlc3BvbnNlID0ge1xuICAgICAgc3RhdHVzQ29kZTogNTAwLFxuICAgICAgYm9keTogKHR5cGVvZiBlID09PSAnc3RyaW5nJykgPyBlIDogJ0ludmFsaWQgUmVxdWVzdCBCb2R5J1xuICAgIH07XG4gICAgcmV0dXJuIGVycm9yUmVzcG9uc2U7XG4gIH1cbn1cbiJdfQ==