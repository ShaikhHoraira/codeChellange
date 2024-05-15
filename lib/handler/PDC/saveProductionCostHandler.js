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
        console.log("");
        console.log(" THis is poroductionCostLambda", event);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZVByb2R1Y3Rpb25Db3N0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVyL1BEQy9zYXZlUHJvZHVjdGlvbkNvc3RIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDZEQUE2RDtBQUV0RCxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVSxFQUFFLEVBQUU7SUFDbkQsSUFBSTtRQUNGLG9DQUFvQztRQUNwQyx5REFBeUQ7UUFDekQsbUNBQW1DO1FBQ25DLElBQUk7UUFDSiw0QkFBNEI7UUFDNUIscUJBQXFCO1FBQ3JCLHFCQUFxQjtRQUNyQixvQ0FBb0M7UUFDcEMsS0FBSztRQUNMLG1CQUFtQjtRQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsRUFBQyxLQUFLLENBQUMsQ0FBQTtRQUNuRCxPQUFPO1lBQ0gsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsS0FBSztTQUNkLENBQUE7S0FDRjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsK0JBQStCO1FBQy9CLE1BQU0sYUFBYSxHQUFHO1lBQ3BCLFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsc0JBQXNCO1NBQzNELENBQUM7UUFDRixPQUFPLGFBQWEsQ0FBQztLQUN0QjtBQUNILENBQUMsQ0FBQTtBQTFCWSxRQUFBLE9BQU8sV0EwQm5CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gXCJhd3MtbGFtYmRhXCI7XG4vLyBpbXBvcnQgeyBTYXZlQ3VzdG9tZXJBZGRyZXNzIH0gZnJvbSAnLi4vbW9kdWxlcy9zYXZlRGF0YSc7XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyOiBIYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBhbnkpID0+IHtcbiAgdHJ5IHsgXG4gICAgLy8gaWYgKGV2ZW50Lmh0dHBNZXRob2QgPT09IFwiUE9TVFwiKXtcbiAgICAvLyAgIGNvbnN0IG1hbmFnZURldmljZSA9IG5ldyBTYXZlQ3VzdG9tZXJBZGRyZXNzKGV2ZW50KTtcbiAgICAvLyAgIGF3YWl0IG1hbmFnZURldmljZS5zYXZlRGF0YSgpO1xuICAgIC8vIH1cbiAgICAvLyAvLyBDb25zdHJ1Y3QgdGhlIHJlc3BvbnNlXG4gICAgLy8gY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgLy8gICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgLy8gICBib2R5OiBKU09OLnN0cmluZ2lmeSgnU3VjY2VzcycpXG4gICAgLy8gfTtcbiAgICAvLyByZXR1cm4gcmVzcG9uc2U7XG4gICAgY29uc29sZS5sb2coXCJcIilcbiAgICBjb25zb2xlLmxvZyhcIiBUSGlzIGlzIHBvcm9kdWN0aW9uQ29zdExhbWJkYVwiLGV2ZW50KVxuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keTogZXZlbnRcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBDb25zdHJ1Y3QgdGhlIGVycm9yIHJlc3BvbnNlXG4gICAgY29uc3QgZXJyb3JSZXNwb25zZSA9IHtcbiAgICAgIHN0YXR1c0NvZGU6IDUwMCxcbiAgICAgIGJvZHk6ICh0eXBlb2YgZSA9PT0gJ3N0cmluZycpID8gZSA6ICdJbnZhbGlkIFJlcXVlc3QgQm9keSdcbiAgICB9O1xuICAgIHJldHVybiBlcnJvclJlc3BvbnNlO1xuICB9XG59XG4iXX0=