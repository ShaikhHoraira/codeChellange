"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const getData_1 = require("./getData");
const handler = async (event) => {
    try {
        if (!event.queryStringParameters.userId || !event.queryStringParameters) {
            return {
                statusCode: 400,
                body: "Missing userId, Please provide userId just to see how that would react",
            };
        }
        ;
        const manageDevice = new getData_1.GetCustomerAddress(event.queryStringParameters.userId, event.queryStringParameters.suburb, event.queryStringParameters.postcode);
        const result = await manageDevice.getData();
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        };
    }
    catch (e) {
        return {
            statusCode: 500,
            body: e === 500 ? 'Invalid Request Body' : e,
        };
    }
    ;
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2hhbmRsZXIvZ2V0SGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1Q0FBK0M7QUFHeEMsTUFBTSxPQUFPLEdBQVksS0FBSyxFQUFFLEtBQVcsRUFBRSxFQUFFO0lBQ3BELElBQUk7UUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsRUFBRztZQUN4RSxPQUFPO2dCQUNMLFVBQVUsRUFBRSxHQUFHO2dCQUNmLElBQUksRUFBRSx3RUFBd0U7YUFDL0UsQ0FBQztTQUNIO1FBQUEsQ0FBQztRQUNGLE1BQU0sWUFBWSxHQUFHLElBQUksNEJBQWtCLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLE1BQU0sRUFBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6SixNQUFNLE1BQU0sR0FBRyxNQUFNLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM1QyxPQUFPO1lBQ0wsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7U0FDN0IsQ0FBQztLQUNIO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPO1lBQ0gsVUFBVSxFQUFHLEdBQUc7WUFDaEIsSUFBSSxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzdDLENBQUM7S0FDTDtJQUFBLENBQUM7QUFDSixDQUFDLENBQUM7QUFwQlcsUUFBQSxPQUFPLFdBb0JsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuaW1wb3J0IHsgR2V0Q3VzdG9tZXJBZGRyZXNzIH0gZnJvbSAnLi9nZXREYXRhJztcblxuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudCA6IGFueSkgPT4ge1xuICB0cnkge1xuICAgIGlmICghZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzLnVzZXJJZCB8fCAhZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzICkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogNDAwLFxuICAgICAgICBib2R5OiBcIk1pc3NpbmcgdXNlcklkLCBQbGVhc2UgcHJvdmlkZSB1c2VySWQganVzdCB0byBzZWUgaG93IHRoYXQgd291bGQgcmVhY3RcIixcbiAgICAgIH07XG4gICAgfTtcbiAgICBjb25zdCBtYW5hZ2VEZXZpY2UgPSBuZXcgR2V0Q3VzdG9tZXJBZGRyZXNzKGV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycy51c2VySWQsZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzLnN1YnVyYiwgZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzLnBvc3Rjb2RlKTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBtYW5hZ2VEZXZpY2UuZ2V0RGF0YSgpO1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShyZXN1bHQpXG4gICAgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6ICA1MDAsXG4gICAgICAgIGJvZHk6IGUgPT09IDUwMCA/ICdJbnZhbGlkIFJlcXVlc3QgQm9keScgOiBlLFxuICAgICAgfTtcbiAgfTtcbn07Il19