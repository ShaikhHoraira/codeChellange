import { Schema, Validator } from 'jsonschema';
import LogisticCostSchema from '../../src/schema/logisticCostSchema'

const validRequest = {
    transportId: "1321321321+564",
    customerName: "Sam",
    appartmentNo : "503",
    address : "7 Thomas Holmes Street",
    suburb : "Maribyrnong",
    postCode : "3032",
    state : "Vic",
    country : "Australia"
};

describe('Authenticated Register endpoint handler', () => {
  let v: Validator;

  beforeEach(() => {
    v = new Validator();
    v.addSchema(LogisticCostSchema as Schema);
  });

  describe('Schema', () => {
    it('Should pass the schema', () => {
      const result = v.validate(validRequest, LogisticCostSchema as Schema);
      expect(result.errors.length).toBe(0);
    });
  });

  describe('Address', () => {
    it('Should support minimum length of 1', () => {
      const customRequest = { ...validRequest, address: '' };
      const result = v.validate(customRequest, LogisticCostSchema as Schema);
      expect(result.errors[0].property).toBe('instance.address');
      expect(result.errors[0].message).toBe('does not meet minimum length of 1');
    });
  });

  describe('address', () => {
    it('Should only support maximum of 100 characters (pass 100)', () => {
      const customRequest = {
        ...validRequest,
          address: 'E9rYawMbmTMRoJKNa0FqG68etPpoLzVKr3qi9QB1uhSTp2bAHbFwOi2B2k62VAPnxytGbWxcYU3WRxF376Pxu3wzzodE7BX46Jja',
        
      };
      const result = v.validate(customRequest, LogisticCostSchema as Schema);
      expect(result.errors.length).toBe(0);
    });

    // it('Should only support maximum of 100 characters (fail 101)', () => {
    //   const customRequest = {
    //     ...validRequest,
       
    //       address: 'E9rYawMbmTMRoJKNa0FqG68etPpoLzVKr3qi9QB1uhSTp2bAHbFwOi2B2k62VAPnxytGbWxcYU3WRxF376Pxu3wzzodE7BX46Jja2',
   
    //   };
    //   const result = v.validate(customRequest, RegistrationSchema as Schema);
    //   expect(result.errors[0].property).toBe('instance.address');
    //   expect(result.errors[0].message).toBe('does not meet maximum length of 100');
    // });

    it('Should support minimum length of 1', () => {
      const customRequest = {
        ...validRequest,
          address: '',
      };
      const result = v.validate(customRequest, LogisticCostSchema as Schema);
      expect(result.errors[0].property).toBe('instance.address');
      expect(result.errors[0].message).toBe('does not meet minimum length of 1');
    });
  });

  describe('CustomerName', () => {
    it('Should support minimum length of 1', () => {
      const customRequest = {
        ...validRequest,
          customerName: '',

      };
      const result = v.validate(customRequest, LogisticCostSchema as Schema);
      expect(result.errors[0].property).toBe('instance.customerName');
      expect(result.errors[0].message).toBe('does not meet minimum length of 1');
    });
  });

  describe('suburb', () => {
    it('Should have address minimum length 1', () => {
      const customRequest = {
        ...validRequest,
        suburb: ''
      };
      const result = v.validate(customRequest, LogisticCostSchema as Schema);
      expect(result.errors.length).toBe(1);
    });
});
    describe('suburb', () => {
        it('Should have address not more then length 50(giving 100)', () => {
          const customRequest = {
            ...validRequest,
            suburb: 'E9rYawMbmTMRoJKNa0FqG68etPpoLzVKr3qi9QB1uhSTp2bAHbFwOi2B2k62VAPnxytGbWxcYU3WRxF376Pxu3wzzodE7BX46Jja2'
          };
          const result = v.validate(customRequest, LogisticCostSchema as Schema);
          expect(result.errors.length).toBe(1);
        });
    });
//     it('Should not support other channel types', () => {
//       const customRequest = {
//         ...validRequest,
//         ChannelType: 'SOME_OTHER_CHANNEL',
//       };
//       const result = v.validate(customRequest, RegistrationSchema as Schema);
//       expect(result.errors[0].property).toBe('instance.ChannelType');
//       expect(result.errors[0].message).toBe('is not one of enum values: PUSH');
//     });
//   });

//   describe('AppVersion', () => {
//     it('Should only support maximum of 50 characters (pass 50)', () => {
//       const customRequest = {
//         ...validRequest,
//         Demographic: {
//           ...validRequest.Demographic,
//           AppVersion: 'lzn0VACJD9buM0yb7uwTfc0CQfUIX6DtOO7j30acLk1oYHYaGY',
//         },
//       };
//       const result = v.validate(customRequest, RegistrationSchema as Schema);
//       expect(result.errors.length).toBe(0);
//     });

//     it('Should only support maximum of 50 characters (fail 51)', () => {
//       const customRequest = {
//         ...validRequest,
//         Demographic: {
//           ...validRequest.Demographic,
//           AppVersion: 'lzn0VACJD9buM0yb7uwTfc0CQfUIX6DtOO7j30acLk1oYHYaGY1',
//         },
//       };
//       const result = v.validate(customRequest, RegistrationSchema as Schema);
//       expect(result.errors[0].property).toBe('instance.Demographic.AppVersion');
//       expect(result.errors[0].message).toBe('does not meet maximum length of 50');
//     });

//     it('Should support minimum length of 1', () => {
//       const customRequest = {
//         ...validRequest,
//         Demographic: {
//           ...validRequest.Demographic,
//           AppVersion: '',
//         },
//       };
//       const result = v.validate(customRequest, RegistrationSchema as Schema);
//       expect(result.errors[0].property).toBe('instance.Demographic.AppVersion');
//       expect(result.errors[0].message).toBe('does not meet minimum length of 1');
//     });
//   });

//   describe('Make', () => {
//     it('Should only support maximum of 50 characters (pass 50)', () => {
//       const customRequest = {
//         ...validRequest,
//         Demographic: {
//           ...validRequest.Demographic,
//           Make: 'lzn0VACJD9buM0yb7uwTfc0CQfUIX6DtOO7j30acLk1oYHYaGY',
//         },
//       };
//       const result = v.validate(customRequest, RegistrationSchema as Schema);
//       expect(result.errors.length).toBe(0);
//     });

//     it('Should only support maximum of 50 characters (fail 51)', () => {
//       const customRequest = {
//         ...validRequest,
//         Demographic: {
//           ...validRequest.Demographic,
//           Make: 'lzn0VACJD9buM0yb7uwTfc0CQfUIX6DtOO7j30acLk1oYHYaGY2',
//         },
//       };
//       const result = v.validate(customRequest, RegistrationSchema as Schema);
//       expect(result.errors[0].property).toBe('instance.Demographic.Make');
//       expect(result.errors[0].message).toBe('does not meet maximum length of 50');
//     });

//     it('Should support minimum length of 1', () => {
//       const customRequest = {
//         ...validRequest,
//         Demographic: {
//           ...validRequest.Demographic,
//           Make: '',
//         },
//       };
//       const result = v.validate(customRequest, RegistrationSchema as Schema);
//       expect(result.errors[0].property).toBe('instance.Demographic.Make');
//       expect(result.errors[0].message).toBe('does not meet minimum length of 1');
//     });
//   });

//   describe('Model', () => {
//     it('Should only support maximum of 100 characters (pass 100)', () => {
//       const customRequest = {
//         ...validRequest,
//         Demographic: {
//           ...validRequest.Demographic,
//           Model: 'E9rYawMbmTMRoJKNa0FqG68etPpoLzVKr3qi9QB1uhSTp2bAHbFwOi2B2k62VAPnxytGbWxcYU3WRxF376Pxu3wzzodE7BX46Jja',
//         },
//       };
//       const result = v.validate(customRequest, RegistrationSchema as Schema);
//       expect(result.errors.length).toBe(0);
//     });

//     it('Should only support maximum of 100 characters (fail 101)', () => {
//       const customRequest = {
//         ...validRequest,
//         Demographic: {
//           ...validRequest.Demographic,
//           Model: 'E9rYawMbmTMRoJKNa0FqG68etPpoLzVKr3qi9QB1uhSTp2bAHbFwOi2B2k62VAPnxytGbWxcYU3WRxF376Pxu3wzzodE7BX46Jja2',
//         },
//       };
//       const result = v.validate(customRequest, RegistrationSchema as Schema);
//       expect(result.errors[0].property).toBe('instance.Demographic.Model');
//       expect(result.errors[0].message).toBe('does not meet maximum length of 100');
//     });

//     it('Should support minimum length of 1', async () => {
//       const customRequest = {
//         ...validRequest,
//         Demographic: {
//           ...validRequest.Demographic,
//           Model: '',
//         },
//       };
//       const result = v.validate(customRequest, RegistrationSchema as Schema);
//       expect(result.errors[0].property).toBe('instance.Demographic.Model');
//       expect(result.errors[0].message).toBe('does not meet minimum length of 1');
//     });
//   });

//   describe('ModelVersion', () => {
//     it('Should only support maximum of 50 characters (pass 50)', () => {
//       const customRequest = {
//         ...validRequest,
//         Demographic: {
//           ...validRequest.Demographic,
//           ModelVersion: 'lzn0VACJD9buM0yb7uwTfc0CQfUIX6DtOO7j30acLk1oYHYaGY',
//         },
//       };
//       const result = v.validate(customRequest, RegistrationSchema as Schema);
//       expect(result.errors.length).toBe(0);
//     });

//     it('Should only support maximum of 50 characters (fail 51)', () => {
//       const customRequest = {
//         ...validRequest,
//         Demographic: {
//           ...validRequest.Demographic,
//           ModelVersion: 'lzn0VACJD9buM0yb7uwTfc0CQfUIX6DtOO7j30acLk1oYHYaGY2',
//         },
//       };
//       const result = v.validate(customRequest, RegistrationSchema as Schema);
//       expect(result.errors[0].property).toBe('instance.Demographic.ModelVersion');
//       expect(result.errors[0].message).toBe('does not meet maximum length of 50');
//     });

//     it('Should support minimum length of 1', () => {
//       const customRequest = {
//         ...validRequest,
//         Demographic: {
//           ...validRequest.Demographic,
//           ModelVersion: '',
//         },
//       };
//       const result = v.validate(customRequest, RegistrationSchema as Schema);
//       expect(result.errors[0].property).toBe('instance.Demographic.ModelVersion');
//       expect(result.errors[0].message).toBe('does not meet minimum length of 1');
//     });
//   });

//   describe('Platform', () => {
//     it('Should only support maximum of 50 characters (pass 50)', () => {
//       const customRequest = {
//         ...validRequest,
//         Demographic: {
//           ...validRequest.Demographic,
//           Platform: 'lzn0VACJD9buM0yb7uwTfc0CQfUIX6DtOO7j30acLk1oYHYaGY',
//         },
//       };
//       const result = v.validate(customRequest, RegistrationSchema as Schema);
//       expect(result.errors.length).toBe(0);
//     });

//     it('Should only support maximum of 50 characters (fail 51)', () => {
//       const customRequest = {
//         ...validRequest,
//         Demographic: {
//           ...validRequest.Demographic,
//           Platform: 'lzn0VACJD9buM0yb7uwTfc0CQfUIX6DtOO7j30acLk1oYHYaGY2',
//         },
//       };
//       const result = v.validate(customRequest, RegistrationSchema as Schema);
//       expect(result.errors[0].property).toBe('instance.Demographic.Platform');
//       expect(result.errors[0].message).toBe('does not meet maximum length of 50');
//     });

//     it('Should support minimum length of 1', () => {
//       const customRequest = {
//         ...validRequest,
//         Demographic: {
//           ...validRequest.Demographic,
//           Platform: '',
//         },
//       };
//       const result = v.validate(customRequest, RegistrationSchema as Schema);
//       expect(result.errors[0].property).toBe('instance.Demographic.Platform');
//       expect(result.errors[0].message).toBe('does not meet minimum length of 1');
//     });
//   });
});
