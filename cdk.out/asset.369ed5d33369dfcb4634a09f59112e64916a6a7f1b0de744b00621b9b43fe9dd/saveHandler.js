"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (event) => {
    // const manageSaveData = new ManageSaveData(process.env.TODO_TABLE_NAME);
    // const manageGetData = new ManageGetData();
    console.info("EVENT\n" + JSON.stringify(event.body, null, 2));
    try {
        let response;
        if (event.httpMethod === 'POST') {
            // response = await manageSaveData.saveDevice(event.dynamodb.tableName,'');
            // console.log("🚀 ~ file: save_retrive_address.ts:12 ~ constTuHandler:Handler= ~ response:", response)
        }
        return {
            statusCode: 200,
            body: 'Success',
        };
    }
    catch (e) {
        return {
            statusCode: 500,
            body: e === 500 ? 'Invalid Request Body' : 'Something went wrong',
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFXTyxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVyxFQUFFLEVBQUU7SUFDdEQsMEVBQTBFO0lBQzFFLDZDQUE2QztJQUM3QyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFFM0QsSUFBSTtRQUNGLElBQUksUUFBUSxDQUFDO1FBQ2IsSUFBSSxLQUFLLENBQUMsVUFBVSxLQUFLLE1BQU0sRUFBRTtZQUUvQiwyRUFBMkU7WUFDM0UsdUdBQXVHO1NBQ3hHO1FBQ0QsT0FBTztZQUNILFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLFNBQVM7U0FDaEIsQ0FBQztLQUNMO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPO1lBQ0gsVUFBVSxFQUFHLEdBQUc7WUFDaEIsSUFBSSxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxzQkFBc0I7U0FDbEUsQ0FBQztLQUNMO0FBRUgsQ0FBQyxDQUFDO0FBdkJXLFFBQUEsT0FBTyxXQXVCbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcbi8vIGltcG9ydCB7TWFuYWdlU2F2ZURhdGF9IGZyb20gJy4uL21vZHVsZXMvc2F2ZV9kYXRhJztcbi8vIGltcG9ydCB7TWFuYWdlR2V0RGF0YX0gZnJvbSAnLi4vbW9kdWxlcy9nZXRfZGF0YSc7XG5pbXBvcnQgeyBEeW5hbW9EQkNsaWVudCB9IGZyb20gJ0Bhd3Mtc2RrL2NsaWVudC1keW5hbW9kYic7XG5cbmltcG9ydCB7XG4gIER5bmFtb0RCRG9jdW1lbnRDbGllbnQsXG4gIFB1dENvbW1hbmQsXG4gIFB1dENvbW1hbmRJbnB1dCxcbn0gZnJvbSAnQGF3cy1zZGsvbGliLWR5bmFtb2RiJztcblxuZXhwb3J0IGNvbnN0IGhhbmRsZXI6IEhhbmRsZXIgPSBhc3luYyAoZXZlbnQgOiBhbnkpID0+IHtcbi8vIGNvbnN0IG1hbmFnZVNhdmVEYXRhID0gbmV3IE1hbmFnZVNhdmVEYXRhKHByb2Nlc3MuZW52LlRPRE9fVEFCTEVfTkFNRSk7XG4vLyBjb25zdCBtYW5hZ2VHZXREYXRhID0gbmV3IE1hbmFnZUdldERhdGEoKTtcbmNvbnNvbGUuaW5mbyhcIkVWRU5UXFxuXCIgKyBKU09OLnN0cmluZ2lmeShldmVudC5ib2R5LCBudWxsLCAyKSlcblxuICB0cnkge1xuICAgIGxldCByZXNwb25zZTtcbiAgICBpZiAoZXZlbnQuaHR0cE1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgICBcbiAgICAgIC8vIHJlc3BvbnNlID0gYXdhaXQgbWFuYWdlU2F2ZURhdGEuc2F2ZURldmljZShldmVudC5keW5hbW9kYi50YWJsZU5hbWUsJycpO1xuICAgICAgLy8gY29uc29sZS5sb2coXCLwn5qAIH4gZmlsZTogc2F2ZV9yZXRyaXZlX2FkZHJlc3MudHM6MTIgfiBjb25zdFR1SGFuZGxlcjpIYW5kbGVyPSB+IHJlc3BvbnNlOlwiLCByZXNwb25zZSlcbiAgICB9IFxuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keTogJ1N1Y2Nlc3MnLFxuICAgICAgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6ICA1MDAsXG4gICAgICAgIGJvZHk6IGUgPT09IDUwMCA/ICdJbnZhbGlkIFJlcXVlc3QgQm9keScgOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnLFxuICAgICAgfTtcbiAgfVxuICBcbn07XG4iXX0=