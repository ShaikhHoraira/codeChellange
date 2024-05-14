"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// import { SaveCustomerAddress } from '../modules/saveData';
const handler = async (event) => {
    try {
        // if (event.httpMethod === "POST"){
        //   const manageDevice = new SaveCustomerAddress(event);
        //   await manageDevice.saveData();
        // }
        // // Construct the response
        // const response = {
        //   statusCode: 200,
        //   body: JSON.stringify('Success')
        // };
        // return response;
        console.log("lambda called", event.path);
        return {
            statusCode: 200,
            body: event
        };
    }
    catch (e) {
        // Construct the error response
        const errorResponse = {
            statusCode: 500,
            body: (typeof e === 'string') ? e : 'Invalid Request Body'
        };
        return errorResponse;
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUVtcGxveWVlSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVyL3NhdmVFbXBsb3llZUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNkRBQTZEO0FBRXRELE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFVLEVBQUUsRUFBRTtJQUNuRCxJQUFJO1FBQ0Ysb0NBQW9DO1FBQ3BDLHlEQUF5RDtRQUN6RCxtQ0FBbUM7UUFDbkMsSUFBSTtRQUNKLDRCQUE0QjtRQUM1QixxQkFBcUI7UUFDckIscUJBQXFCO1FBQ3JCLG9DQUFvQztRQUNwQyxLQUFLO1FBQ0wsbUJBQW1CO1FBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN4QyxPQUFPO1lBQ0gsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsS0FBSztTQUNkLENBQUE7S0FDRjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsK0JBQStCO1FBQy9CLE1BQU0sYUFBYSxHQUFHO1lBQ3BCLFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsc0JBQXNCO1NBQzNELENBQUM7UUFDRixPQUFPLGFBQWEsQ0FBQztLQUN0QjtBQUNILENBQUMsQ0FBQTtBQXpCWSxRQUFBLE9BQU8sV0F5Qm5CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gXCJhd3MtbGFtYmRhXCI7XG4vLyBpbXBvcnQgeyBTYXZlQ3VzdG9tZXJBZGRyZXNzIH0gZnJvbSAnLi4vbW9kdWxlcy9zYXZlRGF0YSc7XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBIYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBhbnkpID0+IHtcbiAgdHJ5IHsgXG4gICAgLy8gaWYgKGV2ZW50Lmh0dHBNZXRob2QgPT09IFwiUE9TVFwiKXtcbiAgICAvLyAgIGNvbnN0IG1hbmFnZURldmljZSA9IG5ldyBTYXZlQ3VzdG9tZXJBZGRyZXNzKGV2ZW50KTtcbiAgICAvLyAgIGF3YWl0IG1hbmFnZURldmljZS5zYXZlRGF0YSgpO1xuICAgIC8vIH1cbiAgICAvLyAvLyBDb25zdHJ1Y3QgdGhlIHJlc3BvbnNlXG4gICAgLy8gY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgLy8gICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgLy8gICBib2R5OiBKU09OLnN0cmluZ2lmeSgnU3VjY2VzcycpXG4gICAgLy8gfTtcbiAgICAvLyByZXR1cm4gcmVzcG9uc2U7XG4gICAgY29uc29sZS5sb2coXCJsYW1iZGEgY2FsbGVkXCIsIGV2ZW50LnBhdGgpXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiBldmVudFxuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIENvbnN0cnVjdCB0aGUgZXJyb3IgcmVzcG9uc2VcbiAgICBjb25zdCBlcnJvclJlc3BvbnNlID0ge1xuICAgICAgc3RhdHVzQ29kZTogNTAwLFxuICAgICAgYm9keTogKHR5cGVvZiBlID09PSAnc3RyaW5nJykgPyBlIDogJ0ludmFsaWQgUmVxdWVzdCBCb2R5J1xuICAgIH07XG4gICAgcmV0dXJuIGVycm9yUmVzcG9uc2U7XG4gIH1cbn1cbiJdfQ==