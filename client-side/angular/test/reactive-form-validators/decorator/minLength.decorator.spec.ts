import { minLength, prop ,ReactiveFormConfig, RxFormBuilder } from '@rxweb/reactive-form-validators';

export class Contact {

    @prop()
    countryName: string;

    @minLength({ value: 10 })
    mobileNo: string;

    @minLength({ value: 8, message: 'Minimum 8 characters are allowed' })
    landLineNo: string;

    //If you want to apply conditional expression of type 'function'
    @minLength({ value: 3, conditionalExpression: (x, y) => x.countryName == "India" })
    countryCode: string;

    //If you want to apply conditional expression of type 'string'
    @minLength({ value: 3, conditionalExpression: 'x => x.countryName == "India"' })
    stateCode: string;

}


    describe('Decorator', () => {
        let formBuilder = new RxFormBuilder();
        beforeEach(() => {
            ReactiveFormConfig.set({
                "validationMessage": {
                    "minLength": "Minimum length is not matched",
                }
            });
        });

        describe('minLengthDecorator', () => {

            it("Should not error in countryName property with undefined value.",
                () => {
                    let contact = new Contact();
                    contact.countryName = undefined;
                    let formGroup = formBuilder.formGroup(contact);
                    expect(formGroup.controls.countryName.errors).toBeNull();
                });

            it('countryName value should be "India".',
                () => {
                    let contact = new Contact();
                    contact.countryName = 'India';
                    let formGroup = formBuilder.formGroup(contact);
                    expect(formGroup.controls.countryName.value).toEqual('India');
                });

            it("Should not error, minLength decorator If the input length is greater than or equal to 10",
                () => {
                    let contact = new Contact();
                    let formGroup = formBuilder.formGroup(contact);
                    formGroup.controls.mobileNo.setValue('+91-8745964851');
                    expect(formGroup.controls.mobileNo.errors).toBeNull();
                });

            it("Should error, minLength decorator If the input length is less than 10",
                () => {
                    let contact = new Contact();
                    let formGroup = formBuilder.formGroup(contact);
                    formGroup.controls.mobileNo.setValue('8745964');
                    expect(formGroup.controls.mobileNo.errors).toEqual({ 'minLength': { message: 'Minimum length is not matched', refValues: ['8745964', 10] } });
                });

            it("Should error, minLength decorator Shows Custom Validation Message.",
                () => {
                    let contact = new Contact();
                    let formGroup = formBuilder.formGroup(contact);
                    formGroup.controls.landLineNo.setValue('24928');
                    expect(formGroup.controls.landLineNo.errors).toEqual({ 'minLength': { message: 'Minimum 8 characters are allowed', refValues: ['24928', 8] } });
                });

            it("Should not error, minLength decorator  Conditional Expression with type 'function'",
                () => {
                    let contact = new Contact();
                    contact.countryName = 'India';
                    let formGroup = formBuilder.formGroup(contact);
                    formGroup.controls.countryCode.setValue('IND');
                    expect(formGroup.controls.countryCode.errors).toBeNull();
                });

            it('countryCode value should be "IND".',
                () => {
                    let contact = new Contact();
                    contact.countryCode = 'IND';
                    let formGroup = formBuilder.formGroup(contact);
                    expect(formGroup.controls.countryCode.value).toEqual('IND');
                });
            it("Should not error, minLength decorator  Conditional Expression with type 'function'",
                () => {
                    let contact = new Contact();
                    contact.countryName = 'Denmark';
                    let formGroup = formBuilder.formGroup(contact);
                    formGroup.controls.countryCode.setValue('DE');
                    expect(formGroup.controls.countryCode.errors).toBeNull();
                });

            it("Should error, minLength decorator Conditional Expression with type 'function'",
                () => {
                    let contact = new Contact();
                    contact.countryName = 'India';
                    let formGroup = formBuilder.formGroup(contact);
                    formGroup.controls.countryCode.setValue('IN');
                    expect(formGroup.controls.countryCode.errors).toEqual({ 'minLength': { message: 'Minimum length is not matched', refValues: ['IN', 3] } });
                });


            it("Should not error, minLength decorator  Conditional Expression with type 'string'",
                () => {
                    let contact = new Contact();
                    contact.countryName = 'India';
                    let formGroup = formBuilder.formGroup(contact);
                    formGroup.controls.stateCode.setValue('RAJ');
                    expect(formGroup.controls.stateCode.errors).toBeNull();
                });

            it('stateCode value should be "RAJ".',
                () => {
                    let contact = new Contact();
                    contact.stateCode = 'RAJ';
                    let formGroup = formBuilder.formGroup(contact);
                    expect(formGroup.controls.stateCode.value).toEqual('RAJ');
                });
            it("Should not error, minLength decorator  Conditional Expression with type 'string'",
                () => {
                    let contact = new Contact();
                    contact.countryName = 'Australia';
                    let formGroup = formBuilder.formGroup(contact);
                    formGroup.controls.stateCode.setValue('AU');
                    expect(formGroup.controls.stateCode.errors).toBeNull();
                });

            it("Should error, minLength decorator Conditional Expression with type 'string'",
                () => {
                    let contact = new Contact();
                    contact.countryName = 'India';
                    let formGroup = formBuilder.formGroup(contact);
                    formGroup.controls.stateCode.setValue('GJ');
                    expect(formGroup.controls.stateCode.errors).toEqual({ 'minLength': { message: 'Minimum length is not matched', refValues: ['GJ', 3] } });
                });
            //end
        });
    });
