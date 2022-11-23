import { rule, prop ,ReactiveFormConfig, RxFormBuilder } from '../../../packages/reactive-form-validators';


export class AddressInfo {

    @prop()
    zipcode: number;

    @prop()
    countryName: string;

    //If you want to apply conditional expression of type 'function'
    @rule({ customRules: [(entity) => { return entity.zipcode == 4000 ? { 'required': 'This field is dependent on the zipcode and countryName field' } : null; }], conditionalExpression: (x, y) => x.countryName == "India" })
    stateName: string;

    //If you want to apply conditional expression of type 'string'
    @rule({ customRules: [(entity) => { return entity.zipcode == 4000 ? { 'required': 'This field is dependent on the zipcode and countryName field' } : null; }], conditionalExpression: 'x => x.countryName =="India"' })
    cityName: string;

    @rule({ customRules: [(entity) => { return entity.zipcode == 10001 ? { 'required': 'This field is dependent on the zipcode field' } : null; }] })
    colonyName: string;

}


    describe('Decorator', () => {
        let formBuilder = new RxFormBuilder();
        beforeEach(() => {
            ReactiveFormConfig.set({
                "validationMessage": {
                    "rule": "Enter valid input based on customRules",
                }
            });
        });

        describe('ruleDecorator', () => {

            it('zipcode value should be 10001.',
            () => {
            let addressInfo = new AddressInfo();
            addressInfo.zipcode = 10001;
            let formGroup = formBuilder.formGroup(addressInfo);
            expect(formGroup.controls.zipcode.value).toEqual(10001);
            });

            it('should not error, rule decorator validation based on customRules',
            () => {
                let addressInfo = new AddressInfo();
                addressInfo.zipcode = 10000;
                let formGroup = formBuilder.formGroup(addressInfo);
                formGroup.controls.colonyName.setValue('Bandra');
                expect(formGroup.controls.colonyName.errors).toBeNull();
            });

            it('should error, rule decorator validation based on customRules',
            () => {
                let addressInfo = new AddressInfo();
                addressInfo.zipcode = 10001;
                let formGroup = formBuilder.formGroup(addressInfo);
                formGroup.controls.colonyName.setValue('Bandra');
                expect(formGroup.controls.colonyName.errors).toEqual({ 'required': 'This field is dependent on the zipcode field'});
            });

            it("should not error, rule decorator  If you want to apply conditional expression of type 'function'",
            () => {
                let addressInfo = new AddressInfo();
                addressInfo.zipcode = 4001;
                addressInfo.countryName = 'India';
                let formGroup = formBuilder.formGroup(addressInfo);
                formGroup.controls.stateName.setValue('Maharashtra');
                expect(formGroup.controls.stateName.errors).toBeNull();
             });

             it("should not error, rule decorator  If you want to apply conditional expression of type 'function'",
             () => {
                 let addressInfo = new AddressInfo();
                 addressInfo.zipcode = 4000;
                 addressInfo.countryName = 'Australia';
                 let formGroup = formBuilder.formGroup(addressInfo);
                 formGroup.controls.stateName.setValue('Queensland');
                 expect(formGroup.controls.stateName.errors).toBeNull();
              });

              it("should error, rule decorator  If you want to apply conditional expression of type 'function'",
              () => {
                  let addressInfo = new AddressInfo();
                  addressInfo.zipcode = 4000;
                  addressInfo.countryName = 'India';
                  let formGroup = formBuilder.formGroup(addressInfo);
                  formGroup.controls.stateName.setValue('Queensland');
                  expect(formGroup.controls.stateName.errors).toEqual({ 'required': 'This field is dependent on the zipcode and countryName field'});
               });

               it("should not error, rule decorator  If you want to apply conditional expression of type 'string'",
               () => {
                   let addressInfo = new AddressInfo();
                   addressInfo.zipcode = 4001;
                   addressInfo.countryName = 'India';
                   let formGroup = formBuilder.formGroup(addressInfo);
                   formGroup.controls.cityName.setValue('Mumbai');
                   expect(formGroup.controls.cityName.errors).toBeNull();
                });
   
                it("should not error, rule decorator  If you want to apply conditional expression of type 'string'",
                () => {
                    let addressInfo = new AddressInfo();
                    addressInfo.zipcode = 4000;
                    addressInfo.countryName = 'Australia';
                    let formGroup = formBuilder.formGroup(addressInfo);
                    formGroup.controls.cityName.setValue('Brisbane');
                    expect(formGroup.controls.cityName.errors).toBeNull();
                 });
   
                 it("should error, rule decorator  If you want to apply conditional expression of type 'string'",
                 () => {
                     let addressInfo = new AddressInfo();
                     addressInfo.zipcode = 4000;
                     addressInfo.countryName = 'India';
                     let formGroup = formBuilder.formGroup(addressInfo);
                     formGroup.controls.cityName.setValue('Mumbai');
                     expect(formGroup.controls.cityName.errors).toEqual({ 'required': 'This field is dependent on the zipcode and countryName field'});
                  });

            //end
        });
    });
