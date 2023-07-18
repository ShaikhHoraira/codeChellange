"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (event) => {
    // const manageSaveData = new ManageSaveData(process.env.TODO_TABLE_NAME);
    // const manageGetData = new ManageGetData();
    console.info("EVENT\n" + JSON.stringify(event, null, 2));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFXTyxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsS0FBVyxFQUFFLEVBQUU7SUFDdEQsMEVBQTBFO0lBQzFFLDZDQUE2QztJQUM3QyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUV0RCxJQUFJO1FBQ0YsSUFBSSxRQUFRLENBQUM7UUFDYixJQUFJLEtBQUssQ0FBQyxVQUFVLEtBQUssTUFBTSxFQUFFO1lBRS9CLDJFQUEyRTtZQUMzRSx1R0FBdUc7U0FDeEc7UUFDRCxPQUFPO1lBQ0gsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsU0FBUztTQUNoQixDQUFDO0tBQ0w7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU87WUFDSCxVQUFVLEVBQUcsR0FBRztZQUNoQixJQUFJLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtTQUNsRSxDQUFDO0tBQ0w7QUFFSCxDQUFDLENBQUM7QUF2QlcsUUFBQSxPQUFPLFdBdUJsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuLy8gaW1wb3J0IHtNYW5hZ2VTYXZlRGF0YX0gZnJvbSAnLi4vbW9kdWxlcy9zYXZlX2RhdGEnO1xuLy8gaW1wb3J0IHtNYW5hZ2VHZXREYXRhfSBmcm9tICcuLi9tb2R1bGVzL2dldF9kYXRhJztcbmltcG9ydCB7IER5bmFtb0RCQ2xpZW50IH0gZnJvbSAnQGF3cy1zZGsvY2xpZW50LWR5bmFtb2RiJztcblxuaW1wb3J0IHtcbiAgRHluYW1vREJEb2N1bWVudENsaWVudCxcbiAgUHV0Q29tbWFuZCxcbiAgUHV0Q29tbWFuZElucHV0LFxufSBmcm9tICdAYXdzLXNkay9saWItZHluYW1vZGInO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudCA6IGFueSkgPT4ge1xuLy8gY29uc3QgbWFuYWdlU2F2ZURhdGEgPSBuZXcgTWFuYWdlU2F2ZURhdGEocHJvY2Vzcy5lbnYuVE9ET19UQUJMRV9OQU1FKTtcbi8vIGNvbnN0IG1hbmFnZUdldERhdGEgPSBuZXcgTWFuYWdlR2V0RGF0YSgpO1xuY29uc29sZS5pbmZvKFwiRVZFTlRcXG5cIiArIEpTT04uc3RyaW5naWZ5KGV2ZW50LCBudWxsLCAyKSlcblxuICB0cnkge1xuICAgIGxldCByZXNwb25zZTtcbiAgICBpZiAoZXZlbnQuaHR0cE1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgICBcbiAgICAgIC8vIHJlc3BvbnNlID0gYXdhaXQgbWFuYWdlU2F2ZURhdGEuc2F2ZURldmljZShldmVudC5keW5hbW9kYi50YWJsZU5hbWUsJycpO1xuICAgICAgLy8gY29uc29sZS5sb2coXCLwn5qAIH4gZmlsZTogc2F2ZV9yZXRyaXZlX2FkZHJlc3MudHM6MTIgfiBjb25zdFR1SGFuZGxlcjpIYW5kbGVyPSB+IHJlc3BvbnNlOlwiLCByZXNwb25zZSlcbiAgICB9IFxuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keTogJ1N1Y2Nlc3MnLFxuICAgICAgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6ICA1MDAsXG4gICAgICAgIGJvZHk6IGUgPT09IDUwMCA/ICdJbnZhbGlkIFJlcXVlc3QgQm9keScgOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnLFxuICAgICAgfTtcbiAgfVxuICBcbn07XG4iXX0=