"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
const MarketingandSalesCostSchema = {
    schema: aws_apigateway_1.JsonSchemaVersion.DRAFT7,
    title: 'Mobile push notification Device Manager Request',
    type: aws_apigateway_1.JsonSchemaType.OBJECT,
    properties: {
        marketingInvoiceId: {
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
    required: ['marketingInvoiceId', 'customerName', 'address',],
    additionalProperties: false,
};
exports.default = MarketingandSalesCostSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2V0aW5nYW5kU2FsZXNDb3N0U2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NjaGVtYS9tYXJrZXRpbmdhbmRTYWxlc0Nvc3RTY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrREFBMkY7QUFFM0YsTUFBTSwyQkFBMkIsR0FBZTtJQUM5QyxNQUFNLEVBQUUsa0NBQWlCLENBQUMsTUFBTTtJQUNoQyxLQUFLLEVBQUUsaURBQWlEO0lBQ3hELElBQUksRUFBRSwrQkFBYyxDQUFDLE1BQU07SUFDM0IsVUFBVSxFQUFFO1FBQ1Ysa0JBQWtCLEVBQUU7WUFDbEIsSUFBSSxFQUFFLCtCQUFjLENBQUMsTUFBTTtZQUMzQixXQUFXLEVBQUUsZ0NBQWdDO1lBQzdDLFNBQVMsRUFBRSxHQUFHO1lBQ2QsU0FBUyxFQUFFLENBQUM7U0FDYjtRQUNELFlBQVksRUFBRTtZQUNaLElBQUksRUFBRSwrQkFBYyxDQUFDLE1BQU07WUFDM0IsV0FBVyxFQUFFLGNBQWM7WUFDM0IsU0FBUyxFQUFFLEVBQUU7WUFDYixTQUFTLEVBQUUsQ0FBQztTQUNiO1FBQ0QsWUFBWSxFQUFFO1lBQ1osSUFBSSxFQUFFLCtCQUFjLENBQUMsTUFBTTtZQUMzQixXQUFXLEVBQUUsY0FBYztZQUMzQixTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEVBQUU7WUFDTCxJQUFJLEVBQUUsK0JBQWMsQ0FBQyxNQUFNO1lBQzNCLFdBQVcsRUFBRSxTQUFTO1lBQ3RCLFNBQVMsRUFBRSxHQUFHO1lBQ2QsU0FBUyxFQUFFLENBQUM7U0FDYjtRQUNELE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSwrQkFBYyxDQUFDLE1BQU07WUFDM0IsV0FBVyxFQUFFLFFBQVE7WUFDckIsU0FBUyxFQUFFLEVBQUU7WUFDYixTQUFTLEVBQUUsQ0FBQztTQUNiO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLCtCQUFjLENBQUMsTUFBTTtZQUMzQixXQUFXLEVBQUUsVUFBVTtZQUN2QixTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxDQUFDO1NBQ2I7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsK0JBQWMsQ0FBQyxNQUFNO1lBQzNCLFdBQVcsRUFBRSxPQUFPO1lBQ3BCLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLENBQUM7U0FDYjtRQUNELE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSwrQkFBYyxDQUFDLE1BQU07WUFDM0IsV0FBVyxFQUFFLFNBQVM7WUFDdEIsU0FBUyxFQUFFLEVBQUU7WUFDYixTQUFTLEVBQUUsQ0FBQztTQUNiO0tBQ0o7SUFDRCxRQUFRLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxjQUFjLEVBQUMsU0FBUyxFQUFFO0lBQzNELG9CQUFvQixFQUFFLEtBQUs7Q0FDNUIsQ0FBQztBQUNGLGtCQUFlLDJCQUEyQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSnNvblNjaGVtYSwgSnNvblNjaGVtYVR5cGUsIEpzb25TY2hlbWFWZXJzaW9uIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXknO1xuXG5jb25zdCBNYXJrZXRpbmdhbmRTYWxlc0Nvc3RTY2hlbWE6IEpzb25TY2hlbWEgPSB7XG4gIHNjaGVtYTogSnNvblNjaGVtYVZlcnNpb24uRFJBRlQ3LFxuICB0aXRsZTogJ01vYmlsZSBwdXNoIG5vdGlmaWNhdGlvbiBEZXZpY2UgTWFuYWdlciBSZXF1ZXN0JyxcbiAgdHlwZTogSnNvblNjaGVtYVR5cGUuT0JKRUNULFxuICBwcm9wZXJ0aWVzOiB7XG4gICAgbWFya2V0aW5nSW52b2ljZUlkOiB7XG4gICAgICB0eXBlOiBKc29uU2NoZW1hVHlwZS5TVFJJTkcsXG4gICAgICBkZXNjcmlwdGlvbjogJ1VuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGUgdXNlcicsXG4gICAgICBtYXhMZW5ndGg6IDEwMCxcbiAgICAgIG1pbkxlbmd0aDogMSxcbiAgICB9LFxuICAgIGN1c3RvbWVyTmFtZToge1xuICAgICAgdHlwZTogSnNvblNjaGVtYVR5cGUuU1RSSU5HLFxuICAgICAgZGVzY3JpcHRpb246ICdjdXN0b21lck5hbWUnLFxuICAgICAgbWF4TGVuZ3RoOiA1MCxcbiAgICAgIG1pbkxlbmd0aDogMSxcbiAgICB9LFxuICAgIGFwcGFydG1lbnRObzoge1xuICAgICAgdHlwZTogSnNvblNjaGVtYVR5cGUuU1RSSU5HLFxuICAgICAgZGVzY3JpcHRpb246ICdhcHBhcnRtZW50Tm8nLFxuICAgICAgbWF4TGVuZ3RoOiAxMCxcbiAgICAgIG1pbkxlbmd0aDogMSxcbiAgICB9LFxuICAgIGFkZHJlc3M6IHtcbiAgICAgICAgdHlwZTogSnNvblNjaGVtYVR5cGUuU1RSSU5HLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ2FkZHJlc3MnLFxuICAgICAgICBtYXhMZW5ndGg6IDE1MCxcbiAgICAgICAgbWluTGVuZ3RoOiAxLFxuICAgICAgfSxcbiAgICAgIHN1YnVyYjoge1xuICAgICAgICB0eXBlOiBKc29uU2NoZW1hVHlwZS5TVFJJTkcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnc3VidXJiJyxcbiAgICAgICAgbWF4TGVuZ3RoOiA1MCxcbiAgICAgICAgbWluTGVuZ3RoOiAxLFxuICAgICAgfSxcbiAgICAgIHBvc3RDb2RlOiB7XG4gICAgICAgIHR5cGU6IEpzb25TY2hlbWFUeXBlLlNUUklORyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdwb3N0Q29kZScsXG4gICAgICAgIG1heExlbmd0aDogMTAsXG4gICAgICAgIG1pbkxlbmd0aDogMSxcbiAgICAgIH0sXG4gICAgICBzdGF0ZToge1xuICAgICAgICB0eXBlOiBKc29uU2NoZW1hVHlwZS5TVFJJTkcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnc3RhdGUnLFxuICAgICAgICBtYXhMZW5ndGg6IDIwLFxuICAgICAgICBtaW5MZW5ndGg6IDEsXG4gICAgICB9LFxuICAgICAgY291bnRyeToge1xuICAgICAgICB0eXBlOiBKc29uU2NoZW1hVHlwZS5TVFJJTkcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnY291bnRyeScsXG4gICAgICAgIG1heExlbmd0aDogNjAsXG4gICAgICAgIG1pbkxlbmd0aDogMSxcbiAgICAgIH0sXG4gIH0sXG4gIHJlcXVpcmVkOiBbJ21hcmtldGluZ0ludm9pY2VJZCcsICdjdXN0b21lck5hbWUnLCdhZGRyZXNzJyxdLFxuICBhZGRpdGlvbmFsUHJvcGVydGllczogZmFsc2UsXG59O1xuZXhwb3J0IGRlZmF1bHQgTWFya2V0aW5nYW5kU2FsZXNDb3N0U2NoZW1hOyJdfQ==