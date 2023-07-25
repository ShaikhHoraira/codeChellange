"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const saveData_1 = require("./saveData");
// const tableName = process.env.TABLE_NAME
// const documentClient = new AWS.DynamoDB.DocumentClient({
//   region: process.env.region,
// });
const handler = async (event) => {
    //const bodypram = JSON.parse(event.body);
    try {
        const manageDevice = new saveData_1.ManageDevice(event);
        const returnResult = await manageDevice.saveData();
        console.info('returning from module', returnResult);
        return {
            statusCode: 200,
            body: returnResult
        };
    }
    catch (e) {
        ;
        return {
            statusCode: 500,
            body: e === 500 ? 'Invalid Request Body' : e, // here we can create and import a commomn error function or specific error handling function where the out put can be organise 
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSx5Q0FBeUM7QUFFekMsMkNBQTJDO0FBRTNDLDJEQUEyRDtBQUMzRCxnQ0FBZ0M7QUFDaEMsTUFBTTtBQUdDLE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFVLEVBQUUsRUFBRTtJQUNuRCwwQ0FBMEM7SUFDMUMsSUFBSTtRQUNGLE1BQU0sWUFBWSxHQUFHLElBQUksdUJBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QyxNQUFNLFlBQVksR0FBRyxNQUFNLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNuRCxPQUFPLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLFlBQVksQ0FBQyxDQUFBO1FBQ25ELE9BQU87WUFDSCxVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxZQUFZO1NBQ25CLENBQUM7S0FDTDtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQUMsQ0FBQztRQUNaLE9BQU87WUFDSCxVQUFVLEVBQUcsR0FBRztZQUNoQixJQUFJLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxnSUFBZ0k7U0FDL0ssQ0FBQztLQUNMO0FBQ0gsQ0FBQyxDQUFBO0FBaEJZLFFBQUEsT0FBTyxXQWdCbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcbmltcG9ydCAqIGFzIEFXUyBmcm9tIFwiYXdzLXNka1wiXG5pbXBvcnQgeyBNYW5hZ2VEZXZpY2UgfSBmcm9tICcuL3NhdmVEYXRhJ1xuXG4vLyBjb25zdCB0YWJsZU5hbWUgPSBwcm9jZXNzLmVudi5UQUJMRV9OQU1FXG5cbi8vIGNvbnN0IGRvY3VtZW50Q2xpZW50ID0gbmV3IEFXUy5EeW5hbW9EQi5Eb2N1bWVudENsaWVudCh7XG4vLyAgIHJlZ2lvbjogcHJvY2Vzcy5lbnYucmVnaW9uLFxuLy8gfSk7XG5cblxuZXhwb3J0IGNvbnN0IGhhbmRsZXI6IEhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IGFueSkgPT4ge1xuICAvL2NvbnN0IGJvZHlwcmFtID0gSlNPTi5wYXJzZShldmVudC5ib2R5KTtcbiAgdHJ5IHsgXG4gICAgY29uc3QgbWFuYWdlRGV2aWNlID0gbmV3IE1hbmFnZURldmljZShldmVudCk7XG4gICAgY29uc3QgcmV0dXJuUmVzdWx0ID0gYXdhaXQgbWFuYWdlRGV2aWNlLnNhdmVEYXRhKCk7XG4gICAgY29uc29sZS5pbmZvKCdyZXR1cm5pbmcgZnJvbSBtb2R1bGUnLCByZXR1cm5SZXN1bHQpXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiByZXR1cm5SZXN1bHRcbiAgICAgIH07XG4gIH0gY2F0Y2ggKGUpIHs7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogIDUwMCxcbiAgICAgICAgYm9keTogZSA9PT0gNTAwID8gJ0ludmFsaWQgUmVxdWVzdCBCb2R5JyA6IGUsIC8vIGhlcmUgd2UgY2FuIGNyZWF0ZSBhbmQgaW1wb3J0IGEgY29tbW9tbiBlcnJvciBmdW5jdGlvbiBvciBzcGVjaWZpYyBlcnJvciBoYW5kbGluZyBmdW5jdGlvbiB3aGVyZSB0aGUgb3V0IHB1dCBjYW4gYmUgb3JnYW5pc2UgXG4gICAgICB9O1xuICB9XG59XG4iXX0=