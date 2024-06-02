"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
const LogisticCostSchema = {
    schema: aws_apigateway_1.JsonSchemaVersion.DRAFT7,
    title: 'Mobile push notification Device Manager Request',
    type: aws_apigateway_1.JsonSchemaType.OBJECT,
    properties: {
        transportId: {
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
    required: ['transportId', 'customerName', 'address',],
    additionalProperties: false,
};
exports.default = LogisticCostSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naXN0aWNDb3N0U2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NjaGVtYS9sb2dpc3RpY0Nvc3RTY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrREFBMkY7QUFFM0YsTUFBTSxrQkFBa0IsR0FBZTtJQUNyQyxNQUFNLEVBQUUsa0NBQWlCLENBQUMsTUFBTTtJQUNoQyxLQUFLLEVBQUUsaURBQWlEO0lBQ3hELElBQUksRUFBRSwrQkFBYyxDQUFDLE1BQU07SUFDM0IsVUFBVSxFQUFFO1FBQ1YsV0FBVyxFQUFFO1lBQ1gsSUFBSSxFQUFFLCtCQUFjLENBQUMsTUFBTTtZQUMzQixXQUFXLEVBQUUsZ0NBQWdDO1lBQzdDLFNBQVMsRUFBRSxHQUFHO1lBQ2QsU0FBUyxFQUFFLENBQUM7U0FDYjtRQUNELFlBQVksRUFBRTtZQUNaLElBQUksRUFBRSwrQkFBYyxDQUFDLE1BQU07WUFDM0IsV0FBVyxFQUFFLGNBQWM7WUFDM0IsU0FBUyxFQUFFLEVBQUU7WUFDYixTQUFTLEVBQUUsQ0FBQztTQUNiO1FBQ0QsWUFBWSxFQUFFO1lBQ1osSUFBSSxFQUFFLCtCQUFjLENBQUMsTUFBTTtZQUMzQixXQUFXLEVBQUUsY0FBYztZQUMzQixTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEVBQUU7WUFDTCxJQUFJLEVBQUUsK0JBQWMsQ0FBQyxNQUFNO1lBQzNCLFdBQVcsRUFBRSxTQUFTO1lBQ3RCLFNBQVMsRUFBRSxHQUFHO1lBQ2QsU0FBUyxFQUFFLENBQUM7U0FDYjtRQUNELE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSwrQkFBYyxDQUFDLE1BQU07WUFDM0IsV0FBVyxFQUFFLFFBQVE7WUFDckIsU0FBUyxFQUFFLEVBQUU7WUFDYixTQUFTLEVBQUUsQ0FBQztTQUNiO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLCtCQUFjLENBQUMsTUFBTTtZQUMzQixXQUFXLEVBQUUsVUFBVTtZQUN2QixTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxDQUFDO1NBQ2I7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsK0JBQWMsQ0FBQyxNQUFNO1lBQzNCLFdBQVcsRUFBRSxPQUFPO1lBQ3BCLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLENBQUM7U0FDYjtRQUNELE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSwrQkFBYyxDQUFDLE1BQU07WUFDM0IsV0FBVyxFQUFFLFNBQVM7WUFDdEIsU0FBUyxFQUFFLEVBQUU7WUFDYixTQUFTLEVBQUUsQ0FBQztTQUNiO0tBQ0o7SUFDRCxRQUFRLEVBQUUsQ0FBQyxhQUFhLEVBQUUsY0FBYyxFQUFDLFNBQVMsRUFBRTtJQUNwRCxvQkFBb0IsRUFBRSxLQUFLO0NBQzVCLENBQUM7QUFDRixrQkFBZSxrQkFBa0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEpzb25TY2hlbWEsIEpzb25TY2hlbWFUeXBlLCBKc29uU2NoZW1hVmVyc2lvbiB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5JztcblxuY29uc3QgTG9naXN0aWNDb3N0U2NoZW1hOiBKc29uU2NoZW1hID0ge1xuICBzY2hlbWE6IEpzb25TY2hlbWFWZXJzaW9uLkRSQUZUNyxcbiAgdGl0bGU6ICdNb2JpbGUgcHVzaCBub3RpZmljYXRpb24gRGV2aWNlIE1hbmFnZXIgUmVxdWVzdCcsXG4gIHR5cGU6IEpzb25TY2hlbWFUeXBlLk9CSkVDVCxcbiAgcHJvcGVydGllczoge1xuICAgIHRyYW5zcG9ydElkOiB7XG4gICAgICB0eXBlOiBKc29uU2NoZW1hVHlwZS5TVFJJTkcsXG4gICAgICBkZXNjcmlwdGlvbjogJ1VuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGUgdXNlcicsXG4gICAgICBtYXhMZW5ndGg6IDEwMCxcbiAgICAgIG1pbkxlbmd0aDogMSxcbiAgICB9LFxuICAgIGN1c3RvbWVyTmFtZToge1xuICAgICAgdHlwZTogSnNvblNjaGVtYVR5cGUuU1RSSU5HLFxuICAgICAgZGVzY3JpcHRpb246ICdjdXN0b21lck5hbWUnLFxuICAgICAgbWF4TGVuZ3RoOiA1MCxcbiAgICAgIG1pbkxlbmd0aDogMSxcbiAgICB9LFxuICAgIGFwcGFydG1lbnRObzoge1xuICAgICAgdHlwZTogSnNvblNjaGVtYVR5cGUuU1RSSU5HLFxuICAgICAgZGVzY3JpcHRpb246ICdhcHBhcnRtZW50Tm8nLFxuICAgICAgbWF4TGVuZ3RoOiAxMCxcbiAgICAgIG1pbkxlbmd0aDogMSxcbiAgICB9LFxuICAgIGFkZHJlc3M6IHtcbiAgICAgICAgdHlwZTogSnNvblNjaGVtYVR5cGUuU1RSSU5HLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ2FkZHJlc3MnLFxuICAgICAgICBtYXhMZW5ndGg6IDE1MCxcbiAgICAgICAgbWluTGVuZ3RoOiAxLFxuICAgICAgfSxcbiAgICAgIHN1YnVyYjoge1xuICAgICAgICB0eXBlOiBKc29uU2NoZW1hVHlwZS5TVFJJTkcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnc3VidXJiJyxcbiAgICAgICAgbWF4TGVuZ3RoOiA1MCxcbiAgICAgICAgbWluTGVuZ3RoOiAxLFxuICAgICAgfSxcbiAgICAgIHBvc3RDb2RlOiB7XG4gICAgICAgIHR5cGU6IEpzb25TY2hlbWFUeXBlLlNUUklORyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdwb3N0Q29kZScsXG4gICAgICAgIG1heExlbmd0aDogMTAsXG4gICAgICAgIG1pbkxlbmd0aDogMSxcbiAgICAgIH0sXG4gICAgICBzdGF0ZToge1xuICAgICAgICB0eXBlOiBKc29uU2NoZW1hVHlwZS5TVFJJTkcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnc3RhdGUnLFxuICAgICAgICBtYXhMZW5ndGg6IDIwLFxuICAgICAgICBtaW5MZW5ndGg6IDEsXG4gICAgICB9LFxuICAgICAgY291bnRyeToge1xuICAgICAgICB0eXBlOiBKc29uU2NoZW1hVHlwZS5TVFJJTkcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnY291bnRyeScsXG4gICAgICAgIG1heExlbmd0aDogNjAsXG4gICAgICAgIG1pbkxlbmd0aDogMSxcbiAgICAgIH0sXG4gIH0sXG4gIHJlcXVpcmVkOiBbJ3RyYW5zcG9ydElkJywgJ2N1c3RvbWVyTmFtZScsJ2FkZHJlc3MnLF0sXG4gIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiBmYWxzZSxcbn07XG5leHBvcnQgZGVmYXVsdCBMb2dpc3RpY0Nvc3RTY2hlbWE7Il19