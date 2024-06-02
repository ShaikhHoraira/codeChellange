"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
const FinancialCostSchema = {
    schema: aws_apigateway_1.JsonSchemaVersion.DRAFT7,
    title: 'Mobile push notification Device Manager Request',
    type: aws_apigateway_1.JsonSchemaType.OBJECT,
    properties: {
        insuranceId: {
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
    required: ['insuranceId', 'customerName', 'address',],
    additionalProperties: false,
};
exports.default = FinancialCostSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluYW5jaWFsQ29zdFNjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY2hlbWEvZmluYW5jaWFsQ29zdFNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtEQUEyRjtBQUUzRixNQUFNLG1CQUFtQixHQUFlO0lBQ3RDLE1BQU0sRUFBRSxrQ0FBaUIsQ0FBQyxNQUFNO0lBQ2hDLEtBQUssRUFBRSxpREFBaUQ7SUFDeEQsSUFBSSxFQUFFLCtCQUFjLENBQUMsTUFBTTtJQUMzQixVQUFVLEVBQUU7UUFDVixXQUFXLEVBQUU7WUFDWCxJQUFJLEVBQUUsK0JBQWMsQ0FBQyxNQUFNO1lBQzNCLFdBQVcsRUFBRSxnQ0FBZ0M7WUFDN0MsU0FBUyxFQUFFLEdBQUc7WUFDZCxTQUFTLEVBQUUsQ0FBQztTQUNiO1FBQ0QsWUFBWSxFQUFFO1lBQ1osSUFBSSxFQUFFLCtCQUFjLENBQUMsTUFBTTtZQUMzQixXQUFXLEVBQUUsY0FBYztZQUMzQixTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxDQUFDO1NBQ2I7UUFDRCxZQUFZLEVBQUU7WUFDWixJQUFJLEVBQUUsK0JBQWMsQ0FBQyxNQUFNO1lBQzNCLFdBQVcsRUFBRSxjQUFjO1lBQzNCLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLENBQUM7U0FDYjtRQUNELE9BQU8sRUFBRTtZQUNMLElBQUksRUFBRSwrQkFBYyxDQUFDLE1BQU07WUFDM0IsV0FBVyxFQUFFLFNBQVM7WUFDdEIsU0FBUyxFQUFFLEdBQUc7WUFDZCxTQUFTLEVBQUUsQ0FBQztTQUNiO1FBQ0QsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLCtCQUFjLENBQUMsTUFBTTtZQUMzQixXQUFXLEVBQUUsUUFBUTtZQUNyQixTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxDQUFDO1NBQ2I7UUFDRCxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsK0JBQWMsQ0FBQyxNQUFNO1lBQzNCLFdBQVcsRUFBRSxVQUFVO1lBQ3ZCLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLENBQUM7U0FDYjtRQUNELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSwrQkFBYyxDQUFDLE1BQU07WUFDM0IsV0FBVyxFQUFFLE9BQU87WUFDcEIsU0FBUyxFQUFFLEVBQUU7WUFDYixTQUFTLEVBQUUsQ0FBQztTQUNiO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLCtCQUFjLENBQUMsTUFBTTtZQUMzQixXQUFXLEVBQUUsU0FBUztZQUN0QixTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxDQUFDO1NBQ2I7S0FDSjtJQUNELFFBQVEsRUFBRSxDQUFDLGFBQWEsRUFBRSxjQUFjLEVBQUMsU0FBUyxFQUFFO0lBQ3BELG9CQUFvQixFQUFFLEtBQUs7Q0FDNUIsQ0FBQztBQUNGLGtCQUFlLG1CQUFtQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSnNvblNjaGVtYSwgSnNvblNjaGVtYVR5cGUsIEpzb25TY2hlbWFWZXJzaW9uIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXknO1xuXG5jb25zdCBGaW5hbmNpYWxDb3N0U2NoZW1hOiBKc29uU2NoZW1hID0ge1xuICBzY2hlbWE6IEpzb25TY2hlbWFWZXJzaW9uLkRSQUZUNyxcbiAgdGl0bGU6ICdNb2JpbGUgcHVzaCBub3RpZmljYXRpb24gRGV2aWNlIE1hbmFnZXIgUmVxdWVzdCcsXG4gIHR5cGU6IEpzb25TY2hlbWFUeXBlLk9CSkVDVCxcbiAgcHJvcGVydGllczoge1xuICAgIGluc3VyYW5jZUlkOiB7XG4gICAgICB0eXBlOiBKc29uU2NoZW1hVHlwZS5TVFJJTkcsXG4gICAgICBkZXNjcmlwdGlvbjogJ1VuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGUgdXNlcicsXG4gICAgICBtYXhMZW5ndGg6IDEwMCxcbiAgICAgIG1pbkxlbmd0aDogMSxcbiAgICB9LFxuICAgIGN1c3RvbWVyTmFtZToge1xuICAgICAgdHlwZTogSnNvblNjaGVtYVR5cGUuU1RSSU5HLFxuICAgICAgZGVzY3JpcHRpb246ICdjdXN0b21lck5hbWUnLFxuICAgICAgbWF4TGVuZ3RoOiA1MCxcbiAgICAgIG1pbkxlbmd0aDogMSxcbiAgICB9LFxuICAgIGFwcGFydG1lbnRObzoge1xuICAgICAgdHlwZTogSnNvblNjaGVtYVR5cGUuU1RSSU5HLFxuICAgICAgZGVzY3JpcHRpb246ICdhcHBhcnRtZW50Tm8nLFxuICAgICAgbWF4TGVuZ3RoOiAxMCxcbiAgICAgIG1pbkxlbmd0aDogMSxcbiAgICB9LFxuICAgIGFkZHJlc3M6IHtcbiAgICAgICAgdHlwZTogSnNvblNjaGVtYVR5cGUuU1RSSU5HLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ2FkZHJlc3MnLFxuICAgICAgICBtYXhMZW5ndGg6IDE1MCxcbiAgICAgICAgbWluTGVuZ3RoOiAxLFxuICAgICAgfSxcbiAgICAgIHN1YnVyYjoge1xuICAgICAgICB0eXBlOiBKc29uU2NoZW1hVHlwZS5TVFJJTkcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnc3VidXJiJyxcbiAgICAgICAgbWF4TGVuZ3RoOiA1MCxcbiAgICAgICAgbWluTGVuZ3RoOiAxLFxuICAgICAgfSxcbiAgICAgIHBvc3RDb2RlOiB7XG4gICAgICAgIHR5cGU6IEpzb25TY2hlbWFUeXBlLlNUUklORyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdwb3N0Q29kZScsXG4gICAgICAgIG1heExlbmd0aDogMTAsXG4gICAgICAgIG1pbkxlbmd0aDogMSxcbiAgICAgIH0sXG4gICAgICBzdGF0ZToge1xuICAgICAgICB0eXBlOiBKc29uU2NoZW1hVHlwZS5TVFJJTkcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnc3RhdGUnLFxuICAgICAgICBtYXhMZW5ndGg6IDIwLFxuICAgICAgICBtaW5MZW5ndGg6IDEsXG4gICAgICB9LFxuICAgICAgY291bnRyeToge1xuICAgICAgICB0eXBlOiBKc29uU2NoZW1hVHlwZS5TVFJJTkcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnY291bnRyeScsXG4gICAgICAgIG1heExlbmd0aDogNjAsXG4gICAgICAgIG1pbkxlbmd0aDogMSxcbiAgICAgIH0sXG4gIH0sXG4gIHJlcXVpcmVkOiBbJ2luc3VyYW5jZUlkJywgJ2N1c3RvbWVyTmFtZScsJ2FkZHJlc3MnLF0sXG4gIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiBmYWxzZSxcbn07XG5leHBvcnQgZGVmYXVsdCBGaW5hbmNpYWxDb3N0U2NoZW1hOyJdfQ==