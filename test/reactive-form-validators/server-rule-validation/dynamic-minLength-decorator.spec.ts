import { ReactiveFormConfig, RxFormBuilder, FormBuilderConfiguration, RxFormGroup } from '../../../packages/reactive-form-validators';

import { minLength, prop } from '../../../packages/reactive-form-validators';

export class Contact {

	@prop()
	countryName: string;

	@prop()
	mobileNo: string;

	@prop()
	landLineNo: string;

	@prop()
	stateCode: string;

}


(function () {
    describe('Dynamic Validation decorator', () => {
        let formBuilder = new RxFormBuilder();
        beforeEach(() => {
            ReactiveFormConfig.set({
                "validationMessage": {
                    "minLength": "Input is less than the minimum length.",
                }
            });
        });

        describe('minLength dynamic validation', () => {

            let contact = new Contact();

            it('should not error in mobileNo adding dynamic minLength validation',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        mobileNo: {
                            minLength: { value: 10 }
                        }
                    };
                    let contactFormGroup = <RxFormGroup>formBuilder.formGroup(contact, formBuilderConfiguration);
                    contactFormGroup.controls.mobileNo.setValue(8754965845);
                    expect(contactFormGroup.controls.mobileNo.errors).toBeNull();
                });

            it('should error in mobileNo adding dynamic minLength validation',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        mobileNo: {
                            minLength: { value: 10 }
                        }
                    };
                    let contactFormGroup = <RxFormGroup>formBuilder.formGroup(contact, formBuilderConfiguration);
                    contactFormGroup.controls.mobileNo.setValue(87549658);
                    expect(contactFormGroup.controls.mobileNo.errors).toEqual({ 'minLength': { message: 'Input is less than the minimum length.', refValues: [87549658, 10] } });
                });

            it('should not error in stateCode with conditional expression in dynamic minLength validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        countryName: {},
                        stateCode: {
                            minLength: { value: 3, conditionalExpression: 'x => x.countryName == "India"', }
                        }
                    }
                    let contactFormGroup = <RxFormGroup>formBuilder.formGroup(contact, formBuilderConfiguration);
                    contactFormGroup.controls.countryName.setValue("India");
                    contactFormGroup.controls.stateCode.setValue('IND');
                    expect(contactFormGroup.controls.stateCode.errors).toBeNull();
                });

            it('should not error in stateCode with conditional expression in dynamic minLength validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        countryName: { },
                        stateCode: {
                            minLength: { value: 3, conditionalExpression: 'x => x.countryName == "India"', }
                        }
                    }
                    let contactFormGroup = <RxFormGroup>formBuilder.formGroup(contact, formBuilderConfiguration);
                    contactFormGroup.controls.countryName.setValue('Australia');
                    contactFormGroup.controls.stateCode.setValue('AU');
                    expect(contactFormGroup.controls.stateCode.errors).toBeNull();
                });

            it('should error in stateCode with conditional expression in dynamic minLength validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        countryName: {},
                        stateCode: {
                            minLength: { value: 3, conditionalExpression: 'x => x.countryName == "India"', }
                        }
                    }
                    let contactFormGroup = <RxFormGroup>formBuilder.formGroup(contact, formBuilderConfiguration);
                    contactFormGroup.controls.countryName.setValue("India");
                    contactFormGroup.controls.stateCode.setValue('IN');
                    expect(contactFormGroup.controls.stateCode.errors).toEqual({ 'minLength': { message: 'Input is less than the minimum length.', refValues: ['IN',3] } });
                });

            it('should error in landLineNo adding custom message in dynamic minLength validation.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        landLineNo: {
                            minLength: { value: 8, message: 'Minimum 8 characters are required', }
                        }
                    }
                    let contactFormGroup = <RxFormGroup>formBuilder.formGroup(contact, formBuilderConfiguration);
                    contactFormGroup.controls.landLineNo.setValue(20145);
                    expect(contactFormGroup.controls.landLineNo.errors).toEqual({ 'minLength': { message: 'Minimum 8 characters are required', refValues: [20145,8] } });
                });
            //end
        });
    });
})();  