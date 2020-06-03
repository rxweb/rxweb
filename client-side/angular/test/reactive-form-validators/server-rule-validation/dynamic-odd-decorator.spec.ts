import { prop, ReactiveFormConfig, RxFormBuilder, FormBuilderConfiguration, RxFormGroup } from '@rxweb/reactive-form-validators';

export class User {

	@prop()
	type: string;

	@prop()
	oddNumber: number;

	@prop()
	multiplesOfOddNumber: number;

}

    describe('Dynamic Validation decorator', () => {
        let formBuilder = new RxFormBuilder();
        beforeEach(() => {
            ReactiveFormConfig.set({
                "validationMessage": {
                    "odd": "Please enter a valid odd number",
                }
            });
        });
        describe('odd dynamic validation', () => {

            let user = new User();
            it('should not error in oddNumber with conditional expression in dynamic odd validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        type: {},
                        oddNumber: {
                            odd: { conditionalExpression: 'x => x.type == "Odd"', }
                        }
                    }
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.type.setValue('Odd');
                    userFormGroup.controls.oddNumber.setValue(11);
                    expect(userFormGroup.controls.oddNumber.errors).toBeNull();
                });

            it('should not error in oddNumber with conditional expression in dynamic odd validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        type: {},
                        oddNumber: {
                            odd: { conditionalExpression: 'x => x.type == "Odd"', }
                        }
                    }
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.type.setValue('Even');
                    userFormGroup.controls.oddNumber.setValue(14);
                    expect(userFormGroup.controls.oddNumber.errors).toBeNull();
                });

            it('should error in oddNumber with conditional expression in dynamic odd validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        type: {},
                        oddNumber: {
                            odd: { conditionalExpression: 'x => x.type == "Odd"', }
                        }
                    }
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.type.setValue('Odd');
                    userFormGroup.controls.oddNumber.setValue(16);
                    expect(userFormGroup.controls.oddNumber.errors).toEqual({ 'odd': { message: 'Please enter a valid odd number', refValues: [16] } });
                });

            it('should error in multiplesOfOddNumber adding custom message in dynamic odd validation.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        multiplesOfOddNumber: {
                            odd: { message: '{{0}} is not a odd number.', }
                        }
                    }
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.multiplesOfOddNumber.setValue(18);
                    expect(userFormGroup.controls.multiplesOfOddNumber.errors).toEqual({ 'odd': { message: '18 is not a odd number.', refValues: [18] } });
                });
            //end
        });
    });
