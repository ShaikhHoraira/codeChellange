"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
const OperationCostSchema = {
    schema: aws_apigateway_1.JsonSchemaVersion.DRAFT7,
    title: 'Mobile push notification Device Manager Request',
    type: aws_apigateway_1.JsonSchemaType.OBJECT,
    properties: {
        employeeId: {
            type: aws_apigateway_1.JsonSchemaType.STRING,
            description: 'Unique identifier for the user',
            maxLength: 100,
            minLength: 1,
        },
        customerName: {
            type: aws_apigateway_1.JsonSchemaType.STRING,
            description: 'customerName',
            maxLength: 50,
            minLength: 1,
        },
        appartmentNo: {
            type: aws_apigateway_1.JsonSchemaType.STRING,
            description: 'appartmentNo',
            maxLength: 10,
            minLength: 1,
        },
        address: {
            type: aws_apigateway_1.JsonSchemaType.STRING,
            description: 'address',
            maxLength: 150,
            minLength: 1,
        },
        suburb: {
            type: aws_apigateway_1.JsonSchemaType.STRING,
            description: 'suburb',
            maxLength: 50,
            minLength: 1,
        },
        postCode: {
            type: aws_apigateway_1.JsonSchemaType.STRING,
            description: 'postCode',
            maxLength: 10,
            minLength: 1,
        },
        state: {
            type: aws_apigateway_1.JsonSchemaType.STRING,
            description: 'state',
            maxLength: 20,
            minLength: 1,
        },
        country: {
            type: aws_apigateway_1.JsonSchemaType.STRING,
            description: 'country',
            maxLength: 60,
            minLength: 1,
        },
    },
    required: ['employeeId', 'customerName', 'address',],
    additionalProperties: false,
};
exports.default = OperationCostSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlcmF0aW9uQ29zdFNjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY2hlbWEvb3BlcmF0aW9uQ29zdFNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtEQUEyRjtBQUUzRixNQUFNLG1CQUFtQixHQUFlO0lBQ3RDLE1BQU0sRUFBRSxrQ0FBaUIsQ0FBQyxNQUFNO0lBQ2hDLEtBQUssRUFBRSxpREFBaUQ7SUFDeEQsSUFBSSxFQUFFLCtCQUFjLENBQUMsTUFBTTtJQUMzQixVQUFVLEVBQUU7UUFDVixVQUFVLEVBQUU7WUFDVixJQUFJLEVBQUUsK0JBQWMsQ0FBQyxNQUFNO1lBQzNCLFdBQVcsRUFBRSxnQ0FBZ0M7WUFDN0MsU0FBUyxFQUFFLEdBQUc7WUFDZCxTQUFTLEVBQUUsQ0FBQztTQUNiO1FBQ0QsWUFBWSxFQUFFO1lBQ1osSUFBSSxFQUFFLCtCQUFjLENBQUMsTUFBTTtZQUMzQixXQUFXLEVBQUUsY0FBYztZQUMzQixTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxDQUFDO1NBQ2I7UUFDRCxZQUFZLEVBQUU7WUFDWixJQUFJLEVBQUUsK0JBQWMsQ0FBQyxNQUFNO1lBQzNCLFdBQVcsRUFBRSxjQUFjO1lBQzNCLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLENBQUM7U0FDYjtRQUNELE9BQU8sRUFBRTtZQUNMLElBQUksRUFBRSwrQkFBYyxDQUFDLE1BQU07WUFDM0IsV0FBVyxFQUFFLFNBQVM7WUFDdEIsU0FBUyxFQUFFLEdBQUc7WUFDZCxTQUFTLEVBQUUsQ0FBQztTQUNiO1FBQ0QsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLCtCQUFjLENBQUMsTUFBTTtZQUMzQixXQUFXLEVBQUUsUUFBUTtZQUNyQixTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxDQUFDO1NBQ2I7UUFDRCxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsK0JBQWMsQ0FBQyxNQUFNO1lBQzNCLFdBQVcsRUFBRSxVQUFVO1lBQ3ZCLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLENBQUM7U0FDYjtRQUNELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSwrQkFBYyxDQUFDLE1BQU07WUFDM0IsV0FBVyxFQUFFLE9BQU87WUFDcEIsU0FBUyxFQUFFLEVBQUU7WUFDYixTQUFTLEVBQUUsQ0FBQztTQUNiO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLCtCQUFjLENBQUMsTUFBTTtZQUMzQixXQUFXLEVBQUUsU0FBUztZQUN0QixTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxDQUFDO1NBQ2I7S0FDSjtJQUNELFFBQVEsRUFBRSxDQUFDLFlBQVksRUFBRSxjQUFjLEVBQUMsU0FBUyxFQUFFO0lBQ25ELG9CQUFvQixFQUFFLEtBQUs7Q0FDNUIsQ0FBQztBQUNGLGtCQUFlLG1CQUFtQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSnNvblNjaGVtYSwgSnNvblNjaGVtYVR5cGUsIEpzb25TY2hlbWFWZXJzaW9uIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXknO1xuXG5jb25zdCBPcGVyYXRpb25Db3N0U2NoZW1hOiBKc29uU2NoZW1hID0ge1xuICBzY2hlbWE6IEpzb25TY2hlbWFWZXJzaW9uLkRSQUZUNyxcbiAgdGl0bGU6ICdNb2JpbGUgcHVzaCBub3RpZmljYXRpb24gRGV2aWNlIE1hbmFnZXIgUmVxdWVzdCcsXG4gIHR5cGU6IEpzb25TY2hlbWFUeXBlLk9CSkVDVCxcbiAgcHJvcGVydGllczoge1xuICAgIGVtcGxveWVlSWQ6IHtcbiAgICAgIHR5cGU6IEpzb25TY2hlbWFUeXBlLlNUUklORyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnVW5pcXVlIGlkZW50aWZpZXIgZm9yIHRoZSB1c2VyJyxcbiAgICAgIG1heExlbmd0aDogMTAwLFxuICAgICAgbWluTGVuZ3RoOiAxLFxuICAgIH0sXG4gICAgY3VzdG9tZXJOYW1lOiB7XG4gICAgICB0eXBlOiBKc29uU2NoZW1hVHlwZS5TVFJJTkcsXG4gICAgICBkZXNjcmlwdGlvbjogJ2N1c3RvbWVyTmFtZScsXG4gICAgICBtYXhMZW5ndGg6IDUwLFxuICAgICAgbWluTGVuZ3RoOiAxLFxuICAgIH0sXG4gICAgYXBwYXJ0bWVudE5vOiB7XG4gICAgICB0eXBlOiBKc29uU2NoZW1hVHlwZS5TVFJJTkcsXG4gICAgICBkZXNjcmlwdGlvbjogJ2FwcGFydG1lbnRObycsXG4gICAgICBtYXhMZW5ndGg6IDEwLFxuICAgICAgbWluTGVuZ3RoOiAxLFxuICAgIH0sXG4gICAgYWRkcmVzczoge1xuICAgICAgICB0eXBlOiBKc29uU2NoZW1hVHlwZS5TVFJJTkcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnYWRkcmVzcycsXG4gICAgICAgIG1heExlbmd0aDogMTUwLFxuICAgICAgICBtaW5MZW5ndGg6IDEsXG4gICAgICB9LFxuICAgICAgc3VidXJiOiB7XG4gICAgICAgIHR5cGU6IEpzb25TY2hlbWFUeXBlLlNUUklORyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdzdWJ1cmInLFxuICAgICAgICBtYXhMZW5ndGg6IDUwLFxuICAgICAgICBtaW5MZW5ndGg6IDEsXG4gICAgICB9LFxuICAgICAgcG9zdENvZGU6IHtcbiAgICAgICAgdHlwZTogSnNvblNjaGVtYVR5cGUuU1RSSU5HLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ3Bvc3RDb2RlJyxcbiAgICAgICAgbWF4TGVuZ3RoOiAxMCxcbiAgICAgICAgbWluTGVuZ3RoOiAxLFxuICAgICAgfSxcbiAgICAgIHN0YXRlOiB7XG4gICAgICAgIHR5cGU6IEpzb25TY2hlbWFUeXBlLlNUUklORyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdzdGF0ZScsXG4gICAgICAgIG1heExlbmd0aDogMjAsXG4gICAgICAgIG1pbkxlbmd0aDogMSxcbiAgICAgIH0sXG4gICAgICBjb3VudHJ5OiB7XG4gICAgICAgIHR5cGU6IEpzb25TY2hlbWFUeXBlLlNUUklORyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdjb3VudHJ5JyxcbiAgICAgICAgbWF4TGVuZ3RoOiA2MCxcbiAgICAgICAgbWluTGVuZ3RoOiAxLFxuICAgICAgfSxcbiAgfSxcbiAgcmVxdWlyZWQ6IFsnZW1wbG95ZWVJZCcsICdjdXN0b21lck5hbWUnLCdhZGRyZXNzJyxdLFxuICBhZGRpdGlvbmFsUHJvcGVydGllczogZmFsc2UsXG59O1xuZXhwb3J0IGRlZmF1bHQgT3BlcmF0aW9uQ29zdFNjaGVtYTsiXX0=