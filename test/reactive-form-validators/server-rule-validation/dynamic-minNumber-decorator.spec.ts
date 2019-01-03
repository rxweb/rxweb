import { ReactiveFormConfig, RxFormBuilder, FormBuilderConfiguration, RxFormGroup } from '../../../packages/reactive-form-validators';

import { minNumber, prop } from '../../../packages/reactive-form-validators';

export class ResultInfo {

	@prop()
	maths: number;

	@prop()
	statstics: number;

	@prop()
	science: number;

}


(function () {
    describe('Dynamic Validation decorator', () => {
        let formBuilder = new RxFormBuilder();
        beforeEach(() => {
            ReactiveFormConfig.set({
                "validationMessage": {
                    "minNumber": "Minimum number is not matched.",
                }
            });
        });

        describe('minNumber dynamic validation', () => {

            let resultInfo = new ResultInfo();

            it('should not error in maths adding dynamic minNumber validation',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        maths: {
                            minNumber: { value: 35 }
                        }
                    };
                    let resultInfoFormGroup = <RxFormGroup>formBuilder.formGroup(resultInfo, formBuilderConfiguration);
                    resultInfoFormGroup.controls.maths.setValue(60);
                    expect(resultInfoFormGroup.controls.maths.errors).toBeNull();
                });

            it('should error in maths adding dynamic minNumber validation',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        maths: {
                            minNumber: { value: 35 }
                        }
                    };
                    let resultInfoFormGroup = <RxFormGroup>formBuilder.formGroup(resultInfo, formBuilderConfiguration);
                    resultInfoFormGroup.controls.maths.setValue(25);
                    expect(resultInfoFormGroup.controls.maths.errors).toEqual({ 'minNumber': { message: 'Minimum number is not matched.', refValues: [25, 35] } });
                });

            it('should not error in statstics with conditional expression in dynamic minNumber validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        maths: {
                            minNumber: { value: 35 }
                        },
                        statstics: {
                            minNumber: { value: 35, conditionalExpression: 'x => x.maths == 50', }
                        }
                    }
                    let resultInfoFormGroup = <RxFormGroup>formBuilder.formGroup(resultInfo, formBuilderConfiguration);
                    resultInfoFormGroup.controls.maths.setValue(50);
                    resultInfoFormGroup.controls.statstics.setValue(60);
                    expect(resultInfoFormGroup.controls.statstics.errors).toBeNull();
                });

            it('should not error in statstics with conditional expression in dynamic minNumber validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        maths: {
                            minNumber: { value: 35 }
                        },
                        statstics: {
                            minNumber: { value: 35, conditionalExpression: 'x => x.maths == 50', }
                        }
                    }
                    let resultInfoFormGroup = <RxFormGroup>formBuilder.formGroup(resultInfo, formBuilderConfiguration);
                    resultInfoFormGroup.controls.maths.setValue(60);
                    resultInfoFormGroup.controls.statstics.setValue(30);
                    expect(resultInfoFormGroup.controls.statstics.errors).toBeNull();
                });

            it('should error in statstics with conditional expression in dynamic minNumber validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        maths: {
                            minNumber: { value: 35 }
                        },
                        statstics: {
                            minNumber: { value: 35, conditionalExpression: 'x => x.maths == 50', }
                        }
                    }
                    let resultInfoFormGroup = <RxFormGroup>formBuilder.formGroup(resultInfo, formBuilderConfiguration);
                    resultInfoFormGroup.controls.maths.setValue(50);
                    resultInfoFormGroup.controls.statstics.setValue(30);
                    expect(resultInfoFormGroup.controls.statstics.errors).toEqual({ 'minNumber': { message: 'Minimum number is not matched.', refValues: [30, 35] } });
                });

            it('should error in science adding custom message in dynamic minNumber validation.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        science: {
                            minNumber: { value: 35, message: 'Number should not be less than 35', }
                        }
                    }
                    let resultInfoFormGroup = <RxFormGroup>formBuilder.formGroup(resultInfo, formBuilderConfiguration);
                    resultInfoFormGroup.controls.science.setValue(31);
                    expect(resultInfoFormGroup.controls.science.errors).toEqual({ 'minNumber': { message: 'Number should not be less than 35', refValues: [31,35] } });
                });
            //end
        });
    });
})();  