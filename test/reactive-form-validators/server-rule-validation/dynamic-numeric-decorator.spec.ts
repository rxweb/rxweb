import { ReactiveFormConfig, RxFormBuilder, FormBuilderConfiguration, RxFormGroup, NumericValueType } from '../../../packages/reactive-form-validators';

import { numeric, prop } from '../../../packages/reactive-form-validators';

export class UserInfo {

	@prop()
	dataType: string;

	@prop()
	negativeNumber: number;

	@prop()
	decimalNumber: number;

	@prop()
	realNumber: number;

	@prop()
	positiveNumber: number;

}


(function () {
    describe('Dynamic Validation decorator', () => {
        let formBuilder = new RxFormBuilder();
        beforeEach(() => {
            ReactiveFormConfig.set({
                "validationMessage": {
                    "numeric": "Please enter valid number",
                }
            });
        });

        describe('numeric dynamic validation', () => {

            let userInfo = new UserInfo();

            it('should not error in negativeNumber adding dynamic numeric validation',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        negativeNumber: {
                            numeric: { acceptValue: NumericValueType.NegativeNumber }
                        }
                    };
                    let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(userInfo, formBuilderConfiguration);
                    userInfoFormGroup.controls.negativeNumber.setValue(-15);
                    expect(userInfoFormGroup.controls.negativeNumber.errors).toBeNull();
                });

            it('should error in negativeNumber adding dynamic numeric validation',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        negativeNumber: {
                            numeric: { acceptValue: NumericValueType.NegativeNumber }
                        }
                    };
                    let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(userInfo, formBuilderConfiguration);
                    userInfoFormGroup.controls.negativeNumber.setValue(14);
                    expect(userInfoFormGroup.controls.negativeNumber.errors).toEqual({ 'numeric': { message: 'Please enter valid number', refValues: [14] } });
                });

                it('should not error in decimalNumber adding dynamic numeric validation',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        decimalNumber: {
                            numeric: { allowDecimal: true }
                        }
                    };
                    let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(userInfo, formBuilderConfiguration);
                    userInfoFormGroup.controls.decimalNumber.setValue(15.1);
                    expect(userInfoFormGroup.controls.decimalNumber.errors).toBeNull();
                });

            it('should not error in realNumber with conditional expression in dynamic numeric validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        dataType: {},
                        realNumber: {
                            numeric: { acceptValue: NumericValueType.Both, conditionalExpression: 'x => x.dataType == "Real"', }
                        }
                    }
                    let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(userInfo, formBuilderConfiguration);
                    userInfoFormGroup.controls.dataType.setValue('Real');
                    userInfoFormGroup.controls.realNumber.setValue(7);
                    expect(userInfoFormGroup.controls.realNumber.errors).toBeNull();
                });

            it('should not error in realNumber with conditional expression in dynamic numeric validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        dataType: {},
                        realNumber: {
                            numeric: { acceptValue: NumericValueType.Both, conditionalExpression: 'x => x.dataType == "Real"', }
                        }
                    }
                    let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(userInfo, formBuilderConfiguration);
                    userInfoFormGroup.controls.dataType.setValue('Integer');
                    userInfoFormGroup.controls.realNumber.setValue(8.1);
                    expect(userInfoFormGroup.controls.realNumber.errors).toBeNull();
                });

            it('should error in realNumber with conditional expression in dynamic numeric validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        dataType: {},
                        realNumber: {
                            numeric: { acceptValue: NumericValueType.Both, conditionalExpression: 'x => x.dataType == "Real"', }
                        }
                    }
                    let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(userInfo, formBuilderConfiguration);
                    userInfoFormGroup.controls.dataType.setValue('Real');
                    userInfoFormGroup.controls.realNumber.setValue(8.1);
                    expect(userInfoFormGroup.controls.realNumber.errors).toEqual({ 'numeric': { message: 'Please enter valid number', refValues: [8.1] } });
                });

            it('should error in positiveNumber adding custom message in dynamic numeric validation.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        positiveNumber: {
                            numeric: { message: '{{0}} is not a positive number', }
                        }
                    }
                    let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(userInfo, formBuilderConfiguration);
                    userInfoFormGroup.controls.positiveNumber.setValue(-5);
                    expect(userInfoFormGroup.controls.positiveNumber.errors).toEqual({ 'numeric': { message: '-5 is not a positive number', refValues: [-5] } });
                });
            //end
        });
    });
})();  