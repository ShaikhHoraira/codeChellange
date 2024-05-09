"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const saveData = require('../modules/saveData');
const handler = async (event) => {
    try {
        if (event.httpMethod === "POST") {
            //const manageDevice = new SaveCustomerAddress(event);
            const response = await saveData();
            console.log(response);
        }
        return {
            statusCode: 200,
            body: 'Success'
        };
    }
    catch (e) {
        return {
            statusCode: 500,
            body: e === 500 ? 'Invalid Request Body' : e, // here we can create and import a commomn error function or specific error handling function where the out put can be organise 
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUV6QyxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVSxFQUFFLEVBQUU7SUFDbkQsSUFBSTtRQUNGLElBQUksS0FBSyxDQUFDLFVBQVUsS0FBSyxNQUFNLEVBQUM7WUFDaEMsc0RBQXNEO1lBQ3RELE1BQU0sUUFBUSxHQUFHLE1BQU0sUUFBUSxFQUFFLENBQUM7WUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtTQUNwQjtRQUNELE9BQU87WUFDSCxVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxTQUFTO1NBQ2hCLENBQUM7S0FDTDtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTztZQUNILFVBQVUsRUFBRyxHQUFHO1lBQ2hCLElBQUksRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLGdJQUFnSTtTQUMvSyxDQUFDO0tBQ0w7QUFDSCxDQUFDLENBQUE7QUFqQlksUUFBQSxPQUFPLFdBaUJuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuY29uc3Qgc2F2ZURhdGEgPSByZXF1aXJlKCcuLi9tb2R1bGVzL3NhdmVEYXRhJyk7XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBIYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBhbnkpID0+IHtcbiAgdHJ5IHsgXG4gICAgaWYgKGV2ZW50Lmh0dHBNZXRob2QgPT09IFwiUE9TVFwiKXtcbiAgICAvL2NvbnN0IG1hbmFnZURldmljZSA9IG5ldyBTYXZlQ3VzdG9tZXJBZGRyZXNzKGV2ZW50KTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHNhdmVEYXRhKCk7XG4gICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keTogJ1N1Y2Nlc3MnXG4gICAgICB9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogIDUwMCxcbiAgICAgICAgYm9keTogZSA9PT0gNTAwID8gJ0ludmFsaWQgUmVxdWVzdCBCb2R5JyA6IGUsIC8vIGhlcmUgd2UgY2FuIGNyZWF0ZSBhbmQgaW1wb3J0IGEgY29tbW9tbiBlcnJvciBmdW5jdGlvbiBvciBzcGVjaWZpYyBlcnJvciBoYW5kbGluZyBmdW5jdGlvbiB3aGVyZSB0aGUgb3V0IHB1dCBjYW4gYmUgb3JnYW5pc2UgXG4gICAgICB9O1xuICB9XG59XG4iXX0=