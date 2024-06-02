"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
const FinancialCostSchema = {
    schema: aws_apigateway_1.JsonSchemaVersion.DRAFT7,
    title: 'Mobile push notification Device Manager Request',
    type: aws_apigateway_1.JsonSchemaType.OBJECT,
    properties: {
        rentId: {
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
    required: ['rentId', 'customerName', 'address',],
    additionalProperties: false,
};
exports.default = FinancialCostSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluYW5jaWFsQ29zdFNjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY2hlbWEvZmluYW5jaWFsQ29zdFNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtEQUEyRjtBQUUzRixNQUFNLG1CQUFtQixHQUFlO0lBQ3RDLE1BQU0sRUFBRSxrQ0FBaUIsQ0FBQyxNQUFNO0lBQ2hDLEtBQUssRUFBRSxpREFBaUQ7SUFDeEQsSUFBSSxFQUFFLCtCQUFjLENBQUMsTUFBTTtJQUMzQixVQUFVLEVBQUU7UUFDVixNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsK0JBQWMsQ0FBQyxNQUFNO1lBQzNCLFdBQVcsRUFBRSxnQ0FBZ0M7WUFDN0MsU0FBUyxFQUFFLEdBQUc7WUFDZCxTQUFTLEVBQUUsQ0FBQztTQUNiO1FBQ0QsWUFBWSxFQUFFO1lBQ1osSUFBSSxFQUFFLCtCQUFjLENBQUMsTUFBTTtZQUMzQixXQUFXLEVBQUUsY0FBYztZQUMzQixTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxDQUFDO1NBQ2I7UUFDRCxZQUFZLEVBQUU7WUFDWixJQUFJLEVBQUUsK0JBQWMsQ0FBQyxNQUFNO1lBQzNCLFdBQVcsRUFBRSxjQUFjO1lBQzNCLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLENBQUM7U0FDYjtRQUNELE9BQU8sRUFBRTtZQUNMLElBQUksRUFBRSwrQkFBYyxDQUFDLE1BQU07WUFDM0IsV0FBVyxFQUFFLFNBQVM7WUFDdEIsU0FBUyxFQUFFLEdBQUc7WUFDZCxTQUFTLEVBQUUsQ0FBQztTQUNiO1FBQ0QsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLCtCQUFjLENBQUMsTUFBTTtZQUMzQixXQUFXLEVBQUUsUUFBUTtZQUNyQixTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxDQUFDO1NBQ2I7UUFDRCxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsK0JBQWMsQ0FBQyxNQUFNO1lBQzNCLFdBQVcsRUFBRSxVQUFVO1lBQ3ZCLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLENBQUM7U0FDYjtRQUNELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSwrQkFBYyxDQUFDLE1BQU07WUFDM0IsV0FBVyxFQUFFLE9BQU87WUFDcEIsU0FBUyxFQUFFLEVBQUU7WUFDYixTQUFTLEVBQUUsQ0FBQztTQUNiO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLCtCQUFjLENBQUMsTUFBTTtZQUMzQixXQUFXLEVBQUUsU0FBUztZQUN0QixTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxDQUFDO1NBQ2I7S0FDSjtJQUNELFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxjQUFjLEVBQUMsU0FBUyxFQUFFO0lBQy9DLG9CQUFvQixFQUFFLEtBQUs7Q0FDNUIsQ0FBQztBQUNGLGtCQUFlLG1CQUFtQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSnNvblNjaGVtYSwgSnNvblNjaGVtYVR5cGUsIEpzb25TY2hlbWFWZXJzaW9uIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXknO1xuXG5jb25zdCBGaW5hbmNpYWxDb3N0U2NoZW1hOiBKc29uU2NoZW1hID0ge1xuICBzY2hlbWE6IEpzb25TY2hlbWFWZXJzaW9uLkRSQUZUNyxcbiAgdGl0bGU6ICdNb2JpbGUgcHVzaCBub3RpZmljYXRpb24gRGV2aWNlIE1hbmFnZXIgUmVxdWVzdCcsXG4gIHR5cGU6IEpzb25TY2hlbWFUeXBlLk9CSkVDVCxcbiAgcHJvcGVydGllczoge1xuICAgIHJlbnRJZDoge1xuICAgICAgdHlwZTogSnNvblNjaGVtYVR5cGUuU1RSSU5HLFxuICAgICAgZGVzY3JpcHRpb246ICdVbmlxdWUgaWRlbnRpZmllciBmb3IgdGhlIHVzZXInLFxuICAgICAgbWF4TGVuZ3RoOiAxMDAsXG4gICAgICBtaW5MZW5ndGg6IDEsXG4gICAgfSxcbiAgICBjdXN0b21lck5hbWU6IHtcbiAgICAgIHR5cGU6IEpzb25TY2hlbWFUeXBlLlNUUklORyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnY3VzdG9tZXJOYW1lJyxcbiAgICAgIG1heExlbmd0aDogNTAsXG4gICAgICBtaW5MZW5ndGg6IDEsXG4gICAgfSxcbiAgICBhcHBhcnRtZW50Tm86IHtcbiAgICAgIHR5cGU6IEpzb25TY2hlbWFUeXBlLlNUUklORyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnYXBwYXJ0bWVudE5vJyxcbiAgICAgIG1heExlbmd0aDogMTAsXG4gICAgICBtaW5MZW5ndGg6IDEsXG4gICAgfSxcbiAgICBhZGRyZXNzOiB7XG4gICAgICAgIHR5cGU6IEpzb25TY2hlbWFUeXBlLlNUUklORyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdhZGRyZXNzJyxcbiAgICAgICAgbWF4TGVuZ3RoOiAxNTAsXG4gICAgICAgIG1pbkxlbmd0aDogMSxcbiAgICAgIH0sXG4gICAgICBzdWJ1cmI6IHtcbiAgICAgICAgdHlwZTogSnNvblNjaGVtYVR5cGUuU1RSSU5HLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ3N1YnVyYicsXG4gICAgICAgIG1heExlbmd0aDogNTAsXG4gICAgICAgIG1pbkxlbmd0aDogMSxcbiAgICAgIH0sXG4gICAgICBwb3N0Q29kZToge1xuICAgICAgICB0eXBlOiBKc29uU2NoZW1hVHlwZS5TVFJJTkcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAncG9zdENvZGUnLFxuICAgICAgICBtYXhMZW5ndGg6IDEwLFxuICAgICAgICBtaW5MZW5ndGg6IDEsXG4gICAgICB9LFxuICAgICAgc3RhdGU6IHtcbiAgICAgICAgdHlwZTogSnNvblNjaGVtYVR5cGUuU1RSSU5HLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ3N0YXRlJyxcbiAgICAgICAgbWF4TGVuZ3RoOiAyMCxcbiAgICAgICAgbWluTGVuZ3RoOiAxLFxuICAgICAgfSxcbiAgICAgIGNvdW50cnk6IHtcbiAgICAgICAgdHlwZTogSnNvblNjaGVtYVR5cGUuU1RSSU5HLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ2NvdW50cnknLFxuICAgICAgICBtYXhMZW5ndGg6IDYwLFxuICAgICAgICBtaW5MZW5ndGg6IDEsXG4gICAgICB9LFxuICB9LFxuICByZXF1aXJlZDogWydyZW50SWQnLCAnY3VzdG9tZXJOYW1lJywnYWRkcmVzcycsXSxcbiAgYWRkaXRpb25hbFByb3BlcnRpZXM6IGZhbHNlLFxufTtcbmV4cG9ydCBkZWZhdWx0IEZpbmFuY2lhbENvc3RTY2hlbWE7Il19