import { maxDate, prop ,ReactiveFormConfig, RxFormBuilder } from '@rxweb/reactive-form-validators';


export class User {

    @prop()
    userName: string;

    @maxDate({ value: '07/30/2018' })
    allocationDate: string;

    //If you want to apply conditional expression of type 'function'
    @maxDate({ value: '07/30/2018', conditionalExpression: (x, y) => x.userName == "Bharat" })
    birthDate: string;

    //If you want to apply conditional expression of type 'string'
    @maxDate({ value: '07/30/2018', conditionalExpression: 'x => x.userName == "Bharat"' })
    admissionDate: string;

    @maxDate({ value: '07/30/2018', message: '{{0}} exceeds the Maximum Date Limit' })
    registrationDate: string;

    @prop()
    enrollmentDate: string;

    @maxDate({ fieldName: 'enrollmentDate' })
    lastRegistrationDate: string;

}

    describe('Decorator', () => {
        let formBuilder = new RxFormBuilder();
        beforeEach(() => {
            ReactiveFormConfig.set({
                "validationMessage": {
                    "maxDate": "Maximum Date is not matched",
                }
            });
        });

        describe('maxDateDecorator', () => {

            it('should not error in allocationDate property with null value.',
                () => {
                    let formGroup = formBuilder.formGroup(User);
                    expect(formGroup.controls.allocationDate.errors).toBeNull();
                });

            it('should not error in allocationDate property with undefined value.',
                () => {
                    let user = new User();
                    user.allocationDate = undefined;
                    let formGroup = formBuilder.formGroup(user);
                    expect(formGroup.controls.allocationDate.errors).toBeNull();
                });

            it('should not error in allocationDate property with "07/28/2018" value.',
                () => {
                    let user = new User();
                    user.allocationDate = '07/28/2018';
                    let formGroup = formBuilder.formGroup(user);
                    expect(formGroup.controls.allocationDate.errors).toBeNull();
                });

            it('should error in allocationDate property with "07/31/2018" value.',
                () => {
                    let user = new User();
                    user.allocationDate = '07/31/2018';
                    let formGroup = formBuilder.formGroup(user);
                    expect(formGroup.controls.allocationDate.errors).toEqual({ 'maxDate': { message: 'Maximum Date is not matched', refValues: ['07/31/2018'] } });
                });

            it("Should not error, maxDate decorator  Conditional Expression with type 'function'",
                () => {
                    let user = new User();
                    user.userName = 'Bharat';
                    let formGroup = formBuilder.formGroup(user);
                    formGroup.controls.birthDate.setValue('05/20/2018');
                    expect(formGroup.controls.birthDate.errors).toBeNull();
                });

            it('birthDate value should be "05/20/2018".',
                () => {
                    let user = new User();
                    user.birthDate = '05/20/2018';
                    let formGroup = formBuilder.formGroup(user);
                    expect(formGroup.controls.birthDate.value).toEqual('05/20/2018');
                });

            it("Should not error, maxDate decorator  Conditional Expression with type 'function'",
                () => {
                    let user = new User();
                    user.userName = 'Mahesh';
                    let formGroup = formBuilder.formGroup(user);
                    formGroup.controls.birthDate.setValue('08/20/2018');
                    expect(formGroup.controls.birthDate.errors).toBeNull();
                });



            it("Should error, maxDate decorator Conditional Expression with type 'function'",
                () => {
                    let user = new User();
                    user.userName = 'Bharat';
                    let formGroup = formBuilder.formGroup(user);
                    formGroup.controls.birthDate.setValue('08/20/2018');
                    expect(formGroup.controls.birthDate.errors).toEqual({ 'maxDate': { message: 'Maximum Date is not matched', refValues: ['08/20/2018'] } });
                });


            it("Should not error, maxDate decorator  Conditional Expression with type 'string'",
                () => {
                    let user = new User();
                    user.userName = 'Bharat';
                    let formGroup = formBuilder.formGroup(user);
                    formGroup.controls.admissionDate.setValue('05/20/2018');
                    expect(formGroup.controls.admissionDate.errors).toBeNull();
                });

            it('admissionDate value should be "05/20/2018".',
                () => {
                    let user = new User();
                    user.admissionDate = '05/20/2018';
                    let formGroup = formBuilder.formGroup(user);
                    expect(formGroup.controls.admissionDate.value).toEqual('05/20/2018');
                });

            it("Should not error, maxDate decorator  Conditional Expression with type 'string'",
                () => {
                    let user = new User();
                    user.userName = 'Mahesh';
                    let formGroup = formBuilder.formGroup(user);
                    formGroup.controls.admissionDate.setValue('08/20/2018');
                    expect(formGroup.controls.admissionDate.errors).toBeNull();
                });

            it("Should error, maxDate decorator Conditional Expression with type 'string'",
                () => {
                    let user = new User();
                    user.userName = 'Bharat';
                    let formGroup = formBuilder.formGroup(user);
                    formGroup.controls.admissionDate.setValue('08/20/2018');
                    expect(formGroup.controls.admissionDate.errors).toEqual({ 'maxDate': { message: 'Maximum Date is not matched', refValues: ['08/20/2018'] } });
                });

            it("Should error, maxDate decorator Shows Custom Validation Message.",
                () => {
                    let user = new User();
                    let formGroup = formBuilder.formGroup(user);
                    formGroup.controls.registrationDate.setValue('07/31/2019');
                    expect(formGroup.controls.registrationDate.errors).toEqual({ 'maxDate': { message: '07/31/2019 exceeds the Maximum Date Limit', refValues: ['07/31/2019'] } });
                });

                it("Should not error, maxDate decorator based on fieldName",
                () => {
                let user = new User();
                user.enrollmentDate = '07/20/2018';
                let formGroup = formBuilder.formGroup(user);
                formGroup.controls.lastRegistrationDate.setValue('06/20/2018');
                expect(formGroup.controls.lastRegistrationDate.errors).toBeNull();
             });

             
             it("Should error, maxDate decorator based on fieldName",
             () => {
             let user = new User();
             user.enrollmentDate = '07/20/2018';
             let formGroup = formBuilder.formGroup(user);
             formGroup.controls.lastRegistrationDate.setValue('08/20/2018');
             expect(formGroup.controls.lastRegistrationDate.errors).toEqual({'maxDate':{ message: 'Maximum Date is not matched', refValues: [ '08/20/2018' ] } });
          });

            //end
        });
    });
