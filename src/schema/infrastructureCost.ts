import { JsonSchema, JsonSchemaType, JsonSchemaVersion } from 'aws-cdk-lib/aws-apigateway';

const InfrastructureCostSchema: JsonSchema = {
  schema: JsonSchemaVersion.DRAFT7,
  title: 'Mobile push notification Device Manager Request',
  type: JsonSchemaType.OBJECT,
  properties: {
    rentId: {
      type: JsonSchemaType.STRING,
      description: 'Unique identifier for the user',
      maxLength: 100,
      minLength: 1,
    },
    customerName: {
      type: JsonSchemaType.STRING,
      description: 'customerName',
      maxLength: 50,
      minLength: 1,
    },
    appartmentNo: {
      type: JsonSchemaType.STRING,
      description: 'appartmentNo',
      maxLength: 10,
      minLength: 1,
    },
    address: {
        type: JsonSchemaType.STRING,
        description: 'address',
        maxLength: 150,
        minLength: 1,
      },
      suburb: {
        type: JsonSchemaType.STRING,
        description: 'suburb',
        maxLength: 50,
        minLength: 1,
      },
      postCode: {
        type: JsonSchemaType.STRING,
        description: 'postCode',
        maxLength: 10,
        minLength: 1,
      },
      state: {
        type: JsonSchemaType.STRING,
        description: 'state',
        maxLength: 20,
        minLength: 1,
      },
      country: {
        type: JsonSchemaType.STRING,
        description: 'country',
        maxLength: 60,
        minLength: 1,
      },
  },
  required: ['rentId', 'customerName','address',],
  additionalProperties: false,
};
export default InfrastructureCostSchema;