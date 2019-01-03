import { ReactiveFormConfig, RxFormBuilder, FormBuilderConfiguration, RxFormGroup } from '../../../packages/reactive-form-validators';

import { maxLength, prop } from '../../../packages/reactive-form-validators';

export class User {

	@prop()
	firstName: string;

	@prop()
	lastName: string;

	@prop()
	userName: string;

}


(function () {
    describe('Dynamic Validation decorator', () => {
        let formBuilder = new RxFormBuilder();
        beforeEach(() => {
            ReactiveFormConfig.set({
                "validationMessage": {
                    "maxLength": "Input exceeds the maximum length.",
                }
            });
        });

        describe('maxLength dynamic validation', () => {

            let user = new User();

            it('should not error in firstName adding dynamic maxLength validation',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        firstName: {
                            maxLength: { value: 16 }
                        }
                    };
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.firstName.setValue('Bharat');
                    expect(userFormGroup.controls.firstName.errors).toBeNull();
                });

            it('should error in firstName adding dynamic maxLength validation',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        firstName: {
                            maxLength: { value: 16 }
                        }
                    };
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.firstName.setValue('Krishna-dwaipayana');
                    expect(userFormGroup.controls.firstName.errors).toEqual({ 'maxLength': { message: 'Input exceeds the maximum length.', refValues: ['Krishna-dwaipayana', 16] } });
                });

            it('should not error in lastName with conditional expression in dynamic maxLength validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        firstName: {
                            maxLength: {value: 16}
                        },
                        lastName: {
                            maxLength: { value: 16, conditionalExpression: 'x => x.firstName == "Bharat"', }
                        }
                    }
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.firstName.setValue("Bharat");
                    userFormGroup.controls.lastName.setValue('Patel');
                    expect(userFormGroup.controls.lastName.errors).toBeNull();
                });

            it('should not error in lastName with conditional expression in dynamic maxLength validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        firstName: {
                            maxLength: {value: 16}
                        },
                        lastName: {
                            maxLength: { value: 16, conditionalExpression: 'x => x.firstName == "Bharat"', }
                        }
                    }
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.firstName.setValue('Mahesh');
                    userFormGroup.controls.lastName.setValue('Puttaswamayya-Mutthuraju');
                    expect(userFormGroup.controls.lastName.errors).toBeNull();
                });

            it('should error in lastName with conditional expression in dynamic maxLength validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        firstName: {
                            maxLength: {value: 16}
                        },
                        lastName: {
                            maxLength: { value: 16, conditionalExpression: 'x => x.firstName == "Bharat"', }
                        }
                    }
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.firstName.setValue("Bharat");
                    userFormGroup.controls.lastName.setValue('Puttaswamayya-Mutthuraju');
                    expect(userFormGroup.controls.lastName.errors).toEqual({ 'maxLength': { message: 'Input exceeds the maximum length.', refValues: ['Puttaswamayya-Mutthuraju',16] } });
                });

            it('should error in userName adding custom message in dynamic maxLength validation.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        userName: {
                            maxLength: { value: 10, message: 'Minimum 8 characters are required', }
                        }
                    }
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.userName.setValue('Gopalamenon');
                    expect(userFormGroup.controls.userName.errors).toEqual({ 'maxLength': { message: 'Minimum 8 characters are required', refValues: ['Gopalamenon',10] } });
                });
            //end
        });
    });
})();  