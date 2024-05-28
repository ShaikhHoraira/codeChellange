"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
const InfrastructureCostSchema = {
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
exports.default = InfrastructureCostSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mcmFzdHJ1Y3R1cmVDb3N0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NjaGVtYS9pbmZyYXN0cnVjdHVyZUNvc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrREFBMkY7QUFFM0YsTUFBTSx3QkFBd0IsR0FBZTtJQUMzQyxNQUFNLEVBQUUsa0NBQWlCLENBQUMsTUFBTTtJQUNoQyxLQUFLLEVBQUUsaURBQWlEO0lBQ3hELElBQUksRUFBRSwrQkFBYyxDQUFDLE1BQU07SUFDM0IsVUFBVSxFQUFFO1FBQ1YsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLCtCQUFjLENBQUMsTUFBTTtZQUMzQixXQUFXLEVBQUUsZ0NBQWdDO1lBQzdDLFNBQVMsRUFBRSxHQUFHO1lBQ2QsU0FBUyxFQUFFLENBQUM7U0FDYjtRQUNELFlBQVksRUFBRTtZQUNaLElBQUksRUFBRSwrQkFBYyxDQUFDLE1BQU07WUFDM0IsV0FBVyxFQUFFLGNBQWM7WUFDM0IsU0FBUyxFQUFFLEVBQUU7WUFDYixTQUFTLEVBQUUsQ0FBQztTQUNiO1FBQ0QsWUFBWSxFQUFFO1lBQ1osSUFBSSxFQUFFLCtCQUFjLENBQUMsTUFBTTtZQUMzQixXQUFXLEVBQUUsY0FBYztZQUMzQixTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEVBQUU7WUFDTCxJQUFJLEVBQUUsK0JBQWMsQ0FBQyxNQUFNO1lBQzNCLFdBQVcsRUFBRSxTQUFTO1lBQ3RCLFNBQVMsRUFBRSxHQUFHO1lBQ2QsU0FBUyxFQUFFLENBQUM7U0FDYjtRQUNELE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSwrQkFBYyxDQUFDLE1BQU07WUFDM0IsV0FBVyxFQUFFLFFBQVE7WUFDckIsU0FBUyxFQUFFLEVBQUU7WUFDYixTQUFTLEVBQUUsQ0FBQztTQUNiO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLCtCQUFjLENBQUMsTUFBTTtZQUMzQixXQUFXLEVBQUUsVUFBVTtZQUN2QixTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxDQUFDO1NBQ2I7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsK0JBQWMsQ0FBQyxNQUFNO1lBQzNCLFdBQVcsRUFBRSxPQUFPO1lBQ3BCLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLENBQUM7U0FDYjtRQUNELE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSwrQkFBYyxDQUFDLE1BQU07WUFDM0IsV0FBVyxFQUFFLFNBQVM7WUFDdEIsU0FBUyxFQUFFLEVBQUU7WUFDYixTQUFTLEVBQUUsQ0FBQztTQUNiO0tBQ0o7SUFDRCxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsY0FBYyxFQUFDLFNBQVMsRUFBRTtJQUMvQyxvQkFBb0IsRUFBRSxLQUFLO0NBQzVCLENBQUM7QUFDRixrQkFBZSx3QkFBd0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEpzb25TY2hlbWEsIEpzb25TY2hlbWFUeXBlLCBKc29uU2NoZW1hVmVyc2lvbiB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5JztcblxuY29uc3QgSW5mcmFzdHJ1Y3R1cmVDb3N0U2NoZW1hOiBKc29uU2NoZW1hID0ge1xuICBzY2hlbWE6IEpzb25TY2hlbWFWZXJzaW9uLkRSQUZUNyxcbiAgdGl0bGU6ICdNb2JpbGUgcHVzaCBub3RpZmljYXRpb24gRGV2aWNlIE1hbmFnZXIgUmVxdWVzdCcsXG4gIHR5cGU6IEpzb25TY2hlbWFUeXBlLk9CSkVDVCxcbiAgcHJvcGVydGllczoge1xuICAgIHJlbnRJZDoge1xuICAgICAgdHlwZTogSnNvblNjaGVtYVR5cGUuU1RSSU5HLFxuICAgICAgZGVzY3JpcHRpb246ICdVbmlxdWUgaWRlbnRpZmllciBmb3IgdGhlIHVzZXInLFxuICAgICAgbWF4TGVuZ3RoOiAxMDAsXG4gICAgICBtaW5MZW5ndGg6IDEsXG4gICAgfSxcbiAgICBjdXN0b21lck5hbWU6IHtcbiAgICAgIHR5cGU6IEpzb25TY2hlbWFUeXBlLlNUUklORyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnY3VzdG9tZXJOYW1lJyxcbiAgICAgIG1heExlbmd0aDogNTAsXG4gICAgICBtaW5MZW5ndGg6IDEsXG4gICAgfSxcbiAgICBhcHBhcnRtZW50Tm86IHtcbiAgICAgIHR5cGU6IEpzb25TY2hlbWFUeXBlLlNUUklORyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnYXBwYXJ0bWVudE5vJyxcbiAgICAgIG1heExlbmd0aDogMTAsXG4gICAgICBtaW5MZW5ndGg6IDEsXG4gICAgfSxcbiAgICBhZGRyZXNzOiB7XG4gICAgICAgIHR5cGU6IEpzb25TY2hlbWFUeXBlLlNUUklORyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdhZGRyZXNzJyxcbiAgICAgICAgbWF4TGVuZ3RoOiAxNTAsXG4gICAgICAgIG1pbkxlbmd0aDogMSxcbiAgICAgIH0sXG4gICAgICBzdWJ1cmI6IHtcbiAgICAgICAgdHlwZTogSnNvblNjaGVtYVR5cGUuU1RSSU5HLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ3N1YnVyYicsXG4gICAgICAgIG1heExlbmd0aDogNTAsXG4gICAgICAgIG1pbkxlbmd0aDogMSxcbiAgICAgIH0sXG4gICAgICBwb3N0Q29kZToge1xuICAgICAgICB0eXBlOiBKc29uU2NoZW1hVHlwZS5TVFJJTkcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAncG9zdENvZGUnLFxuICAgICAgICBtYXhMZW5ndGg6IDEwLFxuICAgICAgICBtaW5MZW5ndGg6IDEsXG4gICAgICB9LFxuICAgICAgc3RhdGU6IHtcbiAgICAgICAgdHlwZTogSnNvblNjaGVtYVR5cGUuU1RSSU5HLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ3N0YXRlJyxcbiAgICAgICAgbWF4TGVuZ3RoOiAyMCxcbiAgICAgICAgbWluTGVuZ3RoOiAxLFxuICAgICAgfSxcbiAgICAgIGNvdW50cnk6IHtcbiAgICAgICAgdHlwZTogSnNvblNjaGVtYVR5cGUuU1RSSU5HLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ2NvdW50cnknLFxuICAgICAgICBtYXhMZW5ndGg6IDYwLFxuICAgICAgICBtaW5MZW5ndGg6IDEsXG4gICAgICB9LFxuICB9LFxuICByZXF1aXJlZDogWydyZW50SWQnLCAnY3VzdG9tZXJOYW1lJywnYWRkcmVzcycsXSxcbiAgYWRkaXRpb25hbFByb3BlcnRpZXM6IGZhbHNlLFxufTtcbmV4cG9ydCBkZWZhdWx0IEluZnJhc3RydWN0dXJlQ29zdFNjaGVtYTsiXX0=