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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUVtcGxveWVlSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVyL3NhdmVFbXBsb3llZUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNkRBQTZEO0FBRXRELE1BQU0sT0FBTyxHQUFZLEtBQUssRUFBRSxLQUFVLEVBQUUsRUFBRTtJQUNuRCxJQUFJO1FBQ0Ysb0NBQW9DO1FBQ3BDLHlEQUF5RDtRQUN6RCxtQ0FBbUM7UUFDbkMsSUFBSTtRQUNKLDRCQUE0QjtRQUM1QixxQkFBcUI7UUFDckIscUJBQXFCO1FBQ3JCLG9DQUFvQztRQUNwQyxLQUFLO1FBQ0wsbUJBQW1CO1FBQ25CLE9BQU87WUFDSCxVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxLQUFLO1NBQ2QsQ0FBQTtLQUNGO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDViwrQkFBK0I7UUFDL0IsTUFBTSxhQUFhLEdBQUc7WUFDcEIsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxzQkFBc0I7U0FDM0QsQ0FBQztRQUNGLE9BQU8sYUFBYSxDQUFDO0tBQ3RCO0FBQ0gsQ0FBQyxDQUFBO0FBeEJZLFFBQUEsT0FBTyxXQXdCbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSBcImF3cy1sYW1iZGFcIjtcbi8vIGltcG9ydCB7IFNhdmVDdXN0b21lckFkZHJlc3MgfSBmcm9tICcuLi9tb2R1bGVzL3NhdmVEYXRhJztcblxuZXhwb3J0IGNvbnN0IGhhbmRsZXI6IEhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IGFueSkgPT4ge1xuICB0cnkgeyBcbiAgICAvLyBpZiAoZXZlbnQuaHR0cE1ldGhvZCA9PT0gXCJQT1NUXCIpe1xuICAgIC8vICAgY29uc3QgbWFuYWdlRGV2aWNlID0gbmV3IFNhdmVDdXN0b21lckFkZHJlc3MoZXZlbnQpO1xuICAgIC8vICAgYXdhaXQgbWFuYWdlRGV2aWNlLnNhdmVEYXRhKCk7XG4gICAgLy8gfVxuICAgIC8vIC8vIENvbnN0cnVjdCB0aGUgcmVzcG9uc2VcbiAgICAvLyBjb25zdCByZXNwb25zZSA9IHtcbiAgICAvLyAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAvLyAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KCdTdWNjZXNzJylcbiAgICAvLyB9O1xuICAgIC8vIHJldHVybiByZXNwb25zZTtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IGV2ZW50XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gQ29uc3RydWN0IHRoZSBlcnJvciByZXNwb25zZVxuICAgIGNvbnN0IGVycm9yUmVzcG9uc2UgPSB7XG4gICAgICBzdGF0dXNDb2RlOiA1MDAsXG4gICAgICBib2R5OiAodHlwZW9mIGUgPT09ICdzdHJpbmcnKSA/IGUgOiAnSW52YWxpZCBSZXF1ZXN0IEJvZHknXG4gICAgfTtcbiAgICByZXR1cm4gZXJyb3JSZXNwb25zZTtcbiAgfVxufVxuIl19