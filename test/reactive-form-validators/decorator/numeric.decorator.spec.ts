import { AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import { ReactiveFormConfig, RxFormBuilder } from '../../../packages/reactive-form-validators';

import { numeric, prop, NumericValueType, } from "../../../packages/reactive-form-validators"

export class UserInfo {

    @prop()
    dataType: string;

    @numeric({ acceptValue: NumericValueType.NegativeNumber })
    negativeNumber: number;

    @numeric({ allowDecimal: true })
    decimalNumber: number;

    //If you want to apply conditional expression of type 'function'
    @numeric({ acceptValue: NumericValueType.PositiveNumber, conditionalExpression: (x, y) => x.dataType == "Integer" })
    integerNumber: number;

    //If you want to apply conditional expression of type 'string'
    @numeric({ acceptValue: NumericValueType.Both, conditionalExpression: 'x => x.dataType == "Real"' })
    realNumber: number;

    @numeric({ message: '{{0}} is not a positive number' })
    positiveNumber: number;

}


(function () {
    describe('Decorator', () => {
        let formBuilder = new RxFormBuilder();
        beforeEach(() => {
            ReactiveFormConfig.set({
                "validationMessage": {
                    "numeric": "Enter a valid numeric digit.",
                }
            });
            ReactiveFormConfig.number = { decimalSymbol:".",groupSymbol:"," }
        });

        describe('numericDecorator', () => {

            it("Should not error, numeric decorator If the input contains a negative number",
                () => {
                    let userInfo = new UserInfo();
                    let formGroup = formBuilder.formGroup(userInfo);
                    formGroup.controls.negativeNumber.setValue('-34');
                    expect(formGroup.controls.negativeNumber.errors).toBeNull();
                });

            it("Should error, numeric decorator If the input does not contains a negative number",
                () => {
                    let userInfo = new UserInfo();
                    let formGroup = formBuilder.formGroup(userInfo);
                    formGroup.controls.negativeNumber.setValue(12);
                    expect(formGroup.controls.negativeNumber.errors).toEqual({ 'numeric': { message: 'Enter a valid numeric digit.', refValues: [12] } });
                });

            it("Should not error, numeric decorator If the input contains a decimal number",
                () => {
                    let userInfo = new UserInfo();
                    let formGroup = formBuilder.formGroup(userInfo);
                    debugger;
                    formGroup.controls.decimalNumber.setValue('34.2');
                    expect(formGroup.controls.decimalNumber.errors).toBeNull();
                });

                it("Should not error, numeric decorator  Conditional Expression with type 'function'",
                () => {
                    let userInfo = new UserInfo();
                    userInfo.dataType = 'Integer';
                    let formGroup = formBuilder.formGroup(userInfo);
                    formGroup.controls.integerNumber.setValue(12);
                    expect(formGroup.controls.integerNumber.errors).toBeNull();
                });

            it('integerNumber value should be 12.',
                () => {
                    let userInfo = new UserInfo();
                    userInfo.integerNumber = 12;
                    let formGroup = formBuilder.formGroup(userInfo);
                    expect(formGroup.controls.integerNumber.value).toEqual(12);
                });
            it("Should not error, numeric decorator  Conditional Expression with type 'function'",
                () => {
                    let userInfo = new UserInfo();
                    userInfo.dataType = 'Real';
                    let formGroup = formBuilder.formGroup(userInfo);
                    formGroup.controls.integerNumber.setValue(-12);
                    expect(formGroup.controls.integerNumber.errors).toBeNull();
                });

            it("Should error, numeric decorator Conditional Expression with type 'function'",
                () => {
                    let userInfo = new UserInfo();
                    userInfo.dataType = 'Integer';
                    let formGroup = formBuilder.formGroup(userInfo);
                    formGroup.controls.integerNumber.setValue(-12);
                    expect(formGroup.controls.integerNumber.errors).toEqual({ 'numeric': { message: 'Enter a valid numeric digit.', refValues: [-12] } });
                });


            it("Should not error, numeric decorator  Conditional Expression with type 'string'",
                () => {
                    let userInfo = new UserInfo();
                    userInfo.dataType = 'Real';
                    let formGroup = formBuilder.formGroup(userInfo);
                    formGroup.controls.realNumber.setValue(15);
                    expect(formGroup.controls.realNumber.errors).toBeNull();
                });

            it('realNumber value should be "RAJ".',
                () => {
                    let userInfo = new UserInfo();
                    userInfo.realNumber = 15;
                    let formGroup = formBuilder.formGroup(userInfo);
                    expect(formGroup.controls.realNumber.value).toEqual(15);
                });
            it("Should not error, numeric decorator  Conditional Expression with type 'string'",
                () => {
                    let userInfo = new UserInfo();
                    userInfo.dataType = 'Integer';
                    let formGroup = formBuilder.formGroup(userInfo);
                    formGroup.controls.realNumber.setValue(-20);
                    expect(formGroup.controls.realNumber.errors).toBeNull();
                });

            it("Should error, numeric decorator Conditional Expression with type 'string'",
                () => {
                    let userInfo = new UserInfo();
                    userInfo.dataType = 'Real';
                    let formGroup = formBuilder.formGroup(userInfo);
                    formGroup.controls.realNumber.setValue('20.5');
                    expect(formGroup.controls.realNumber.errors).toEqual({ 'numeric': { message: 'Enter a valid numeric digit.', refValues: ['20.5'] } });
                });

                it("Should error, numeric decorator Shows Custom Validation Message.",
                () => {
                    let userInfo = new UserInfo();
                    let formGroup = formBuilder.formGroup(userInfo);
                    formGroup.controls.positiveNumber.setValue(-2);
                    expect(formGroup.controls.positiveNumber.errors).toEqual({ 'numeric': { message: '-2 is not a positive number', refValues: [-2] } });
                });

            //end
        });
    });
})();
