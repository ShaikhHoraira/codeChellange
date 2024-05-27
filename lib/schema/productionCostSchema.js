"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
const ProductionCostcostSchema = {
    schema: aws_apigateway_1.JsonSchemaVersion.DRAFT7,
    title: 'Mobile push notification Device Manager Request',
    type: aws_apigateway_1.JsonSchemaType.OBJECT,
    properties: {
        productionCostId: {
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
    required: ['productionCostId', 'customerName', 'address',],
    additionalProperties: false,
};
exports.default = ProductionCostcostSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdGlvbkNvc3RTY2hlbWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2NoZW1hL3Byb2R1Y3Rpb25Db3N0U2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0RBQTJGO0FBRTNGLE1BQU0sd0JBQXdCLEdBQWU7SUFDM0MsTUFBTSxFQUFFLGtDQUFpQixDQUFDLE1BQU07SUFDaEMsS0FBSyxFQUFFLGlEQUFpRDtJQUN4RCxJQUFJLEVBQUUsK0JBQWMsQ0FBQyxNQUFNO0lBQzNCLFVBQVUsRUFBRTtRQUNWLGdCQUFnQixFQUFFO1lBQ2hCLElBQUksRUFBRSwrQkFBYyxDQUFDLE1BQU07WUFDM0IsV0FBVyxFQUFFLGdDQUFnQztZQUM3QyxTQUFTLEVBQUUsR0FBRztZQUNkLFNBQVMsRUFBRSxDQUFDO1NBQ2I7UUFDRCxZQUFZLEVBQUU7WUFDWixJQUFJLEVBQUUsK0JBQWMsQ0FBQyxNQUFNO1lBQzNCLFdBQVcsRUFBRSxjQUFjO1lBQzNCLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLENBQUM7U0FDYjtRQUNELFlBQVksRUFBRTtZQUNaLElBQUksRUFBRSwrQkFBYyxDQUFDLE1BQU07WUFDM0IsV0FBVyxFQUFFLGNBQWM7WUFDM0IsU0FBUyxFQUFFLEVBQUU7WUFDYixTQUFTLEVBQUUsQ0FBQztTQUNiO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsSUFBSSxFQUFFLCtCQUFjLENBQUMsTUFBTTtZQUMzQixXQUFXLEVBQUUsU0FBUztZQUN0QixTQUFTLEVBQUUsR0FBRztZQUNkLFNBQVMsRUFBRSxDQUFDO1NBQ2I7UUFDRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsK0JBQWMsQ0FBQyxNQUFNO1lBQzNCLFdBQVcsRUFBRSxRQUFRO1lBQ3JCLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLENBQUM7U0FDYjtRQUNELFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSwrQkFBYyxDQUFDLE1BQU07WUFDM0IsV0FBVyxFQUFFLFVBQVU7WUFDdkIsU0FBUyxFQUFFLEVBQUU7WUFDYixTQUFTLEVBQUUsQ0FBQztTQUNiO1FBQ0QsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLCtCQUFjLENBQUMsTUFBTTtZQUMzQixXQUFXLEVBQUUsT0FBTztZQUNwQixTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsK0JBQWMsQ0FBQyxNQUFNO1lBQzNCLFdBQVcsRUFBRSxTQUFTO1lBQ3RCLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLENBQUM7U0FDYjtLQUNKO0lBQ0QsUUFBUSxFQUFFLENBQUMsa0JBQWtCLEVBQUUsY0FBYyxFQUFDLFNBQVMsRUFBRTtJQUN6RCxvQkFBb0IsRUFBRSxLQUFLO0NBQzVCLENBQUM7QUFDRixrQkFBZSx3QkFBd0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEpzb25TY2hlbWEsIEpzb25TY2hlbWFUeXBlLCBKc29uU2NoZW1hVmVyc2lvbiB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5JztcblxuY29uc3QgUHJvZHVjdGlvbkNvc3Rjb3N0U2NoZW1hOiBKc29uU2NoZW1hID0ge1xuICBzY2hlbWE6IEpzb25TY2hlbWFWZXJzaW9uLkRSQUZUNyxcbiAgdGl0bGU6ICdNb2JpbGUgcHVzaCBub3RpZmljYXRpb24gRGV2aWNlIE1hbmFnZXIgUmVxdWVzdCcsXG4gIHR5cGU6IEpzb25TY2hlbWFUeXBlLk9CSkVDVCxcbiAgcHJvcGVydGllczoge1xuICAgIHByb2R1Y3Rpb25Db3N0SWQ6IHtcbiAgICAgIHR5cGU6IEpzb25TY2hlbWFUeXBlLlNUUklORyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnVW5pcXVlIGlkZW50aWZpZXIgZm9yIHRoZSB1c2VyJyxcbiAgICAgIG1heExlbmd0aDogMTAwLFxuICAgICAgbWluTGVuZ3RoOiAxLFxuICAgIH0sXG4gICAgY3VzdG9tZXJOYW1lOiB7XG4gICAgICB0eXBlOiBKc29uU2NoZW1hVHlwZS5TVFJJTkcsXG4gICAgICBkZXNjcmlwdGlvbjogJ2N1c3RvbWVyTmFtZScsXG4gICAgICBtYXhMZW5ndGg6IDUwLFxuICAgICAgbWluTGVuZ3RoOiAxLFxuICAgIH0sXG4gICAgYXBwYXJ0bWVudE5vOiB7XG4gICAgICB0eXBlOiBKc29uU2NoZW1hVHlwZS5TVFJJTkcsXG4gICAgICBkZXNjcmlwdGlvbjogJ2FwcGFydG1lbnRObycsXG4gICAgICBtYXhMZW5ndGg6IDEwLFxuICAgICAgbWluTGVuZ3RoOiAxLFxuICAgIH0sXG4gICAgYWRkcmVzczoge1xuICAgICAgICB0eXBlOiBKc29uU2NoZW1hVHlwZS5TVFJJTkcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnYWRkcmVzcycsXG4gICAgICAgIG1heExlbmd0aDogMTUwLFxuICAgICAgICBtaW5MZW5ndGg6IDEsXG4gICAgICB9LFxuICAgICAgc3VidXJiOiB7XG4gICAgICAgIHR5cGU6IEpzb25TY2hlbWFUeXBlLlNUUklORyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdzdWJ1cmInLFxuICAgICAgICBtYXhMZW5ndGg6IDUwLFxuICAgICAgICBtaW5MZW5ndGg6IDEsXG4gICAgICB9LFxuICAgICAgcG9zdENvZGU6IHtcbiAgICAgICAgdHlwZTogSnNvblNjaGVtYVR5cGUuU1RSSU5HLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ3Bvc3RDb2RlJyxcbiAgICAgICAgbWF4TGVuZ3RoOiAxMCxcbiAgICAgICAgbWluTGVuZ3RoOiAxLFxuICAgICAgfSxcbiAgICAgIHN0YXRlOiB7XG4gICAgICAgIHR5cGU6IEpzb25TY2hlbWFUeXBlLlNUUklORyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdzdGF0ZScsXG4gICAgICAgIG1heExlbmd0aDogMjAsXG4gICAgICAgIG1pbkxlbmd0aDogMSxcbiAgICAgIH0sXG4gICAgICBjb3VudHJ5OiB7XG4gICAgICAgIHR5cGU6IEpzb25TY2hlbWFUeXBlLlNUUklORyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdjb3VudHJ5JyxcbiAgICAgICAgbWF4TGVuZ3RoOiA2MCxcbiAgICAgICAgbWluTGVuZ3RoOiAxLFxuICAgICAgfSxcbiAgfSxcbiAgcmVxdWlyZWQ6IFsncHJvZHVjdGlvbkNvc3RJZCcsICdjdXN0b21lck5hbWUnLCdhZGRyZXNzJyxdLFxuICBhZGRpdGlvbmFsUHJvcGVydGllczogZmFsc2UsXG59O1xuZXhwb3J0IGRlZmF1bHQgUHJvZHVjdGlvbkNvc3Rjb3N0U2NoZW1hOyJdfQ==