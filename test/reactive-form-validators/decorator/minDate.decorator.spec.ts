import { AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import { ReactiveFormConfig, RxFormBuilder } from '../../../packages/reactive-form-validators';

import { minDate, prop } from '../../../packages/reactive-form-validators';

export class User {

    @prop()
    userName: string;

    @minDate({ value: '07/30/2018' })
    allocationDate: Date;

    //If you want to apply conditional expression of type 'function'
    @minDate({ value: '07/30/2018', conditionalExpression: (x, y) => x.userName == "Bharat" })
    birthDate: Date;

    //If you want to apply conditional expression of type 'string'
    @minDate({ value: '07/30/2018', conditionalExpression: 'x => x.userName == "Bharat"' })
    admissionDate: Date;

    @minDate({ value: '07/30/2018', message: '{{0}} exceeds the Minimum Date Limit' })
    registrationDate: Date;

    @prop()
    enrollmentDate: Date;

    @minDate({ fieldName: 'enrollmentDate' })
    lastRegistrationDate: Date;

}

(function () {
    describe('Decorator', () => {
        let formBuilder = new RxFormBuilder();
        beforeEach(() => {
            ReactiveFormConfig.set({
                "validationMessage": {
                    "minDate": "Minimum Date is not matched",
                }
            });
        });

        describe('minDateDecorator', () => {

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

            it('should not error in allocationDate property with "07/31/2018" value.',
                () => {
                    let user = new User();
                    user.allocationDate = '07/31/2018';
                    let formGroup = formBuilder.formGroup(user);
                    expect(formGroup.controls.allocationDate.errors).toBeNull();
                });

            it('should error in allocationDate property with "07/28/2018" value.',
                () => {
                    let user = new User();
                    user.allocationDate = '07/28/2018';
                    let formGroup = formBuilder.formGroup(user);
                    expect(formGroup.controls.allocationDate.errors).toEqual({ 'minDate': { message: 'Minimum Date is not matched', refValues: ['07/28/2018'] } });
                });

            it("Should not error, minDate decorator  Conditional Expression with type 'function'",
                () => {
                    let user = new User();
                    user.userName = 'Bharat';
                    let formGroup = formBuilder.formGroup(user);
                    formGroup.controls.birthDate.setValue('09/20/2018');
                    expect(formGroup.controls.birthDate.errors).toBeNull();
                });

            it('birthDate value should be "10/20/2018".',
                () => {
                    let user = new User();
                    user.birthDate = '10/20/2018';
                    let formGroup = formBuilder.formGroup(user);
                    expect(formGroup.controls.birthDate.value).toEqual('10/20/2018');
                });

            it("Should not error, minDate decorator  Conditional Expression with type 'function'",
                () => {
                    let user = new User();
                    user.userName = 'Mahesh';
                    let formGroup = formBuilder.formGroup(user);
                    formGroup.controls.birthDate.setValue('05/20/2018');
                    expect(formGroup.controls.birthDate.errors).toBeNull();
                });



            it("Should error, minDate decorator Conditional Expression with type 'function'",
                () => {
                    let user = new User();
                    user.userName = 'Bharat';
                    let formGroup = formBuilder.formGroup(user);
                    formGroup.controls.birthDate.setValue('05/20/2018');
                    expect(formGroup.controls.birthDate.errors).toEqual({ 'minDate': { message: 'Minimum Date is not matched', refValues: ['05/20/2018'] } });
                });


            it("Should not error, minDate decorator  Conditional Expression with type 'string'",
                () => {
                    let user = new User();
                    user.userName = 'Bharat';
                    let formGroup = formBuilder.formGroup(user);
                    formGroup.controls.admissionDate.setValue('09/20/2018');
                    expect(formGroup.controls.admissionDate.errors).toBeNull();
                });

            it('admissionDate value should be "09/20/2018".',
                () => {
                    let user = new User();
                    user.admissionDate = '09/20/2018';
                    let formGroup = formBuilder.formGroup(user);
                    expect(formGroup.controls.admissionDate.value).toEqual('09/20/2018');
                });

            it("Should not error, minDate decorator  Conditional Expression with type 'string'",
                () => {
                    let user = new User();
                    user.userName = 'Mahesh';
                    let formGroup = formBuilder.formGroup(user);
                    formGroup.controls.admissionDate.setValue('05/20/2018');
                    expect(formGroup.controls.admissionDate.errors).toBeNull();
                });

            it("Should error, minDate decorator Conditional Expression with type 'string'",
                () => {
                    let user = new User();
                    user.userName = 'Bharat';
                    let formGroup = formBuilder.formGroup(user);
                    formGroup.controls.admissionDate.setValue('05/20/2018');
                    expect(formGroup.controls.admissionDate.errors).toEqual({ 'minDate': { message: 'Minimum Date is not matched', refValues: ['05/20/2018'] } });
                });

            it("Should error, minDate decorator Shows Custom Validation Message.",
                () => {
                    let user = new User();
                    let formGroup = formBuilder.formGroup(user);
                    formGroup.controls.registrationDate.setValue('06/31/2018');
                    expect(formGroup.controls.registrationDate.errors).toEqual({ 'minDate': { message: '06/31/2018 exceeds the Minimum Date Limit', refValues: ['06/31/2018'] } });
                });

                it("Should not error, `mDate` decorator based on fieldName",
                () => {
                let user = new User();
                user.enrollmentDate = '07/20/2018';
                let formGroup = formBuilder.formGroup(user);
                formGroup.controls.lastRegistrationDate.setValue('09/20/2018');
                expect(formGroup.controls.lastRegistrationDate.errors).toBeNull();
             });

             
             it("Should error, minDate decorator based on fieldName",
             () => {
             let user = new User();
             user.enrollmentDate = '07/31/2018';
             let formGroup = formBuilder.formGroup(user);
             formGroup.controls.lastRegistrationDate.setValue('06/20/2018');
             expect(formGroup.controls.lastRegistrationDate.errors).toEqual({'minDate':{ message: 'Minimum Date is not matched', refValues: [ '06/20/2018' ] } });
          });

            //end
        });
    });
})();
