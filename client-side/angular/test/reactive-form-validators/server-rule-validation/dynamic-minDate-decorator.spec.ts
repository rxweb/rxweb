import { prop,ReactiveFormConfig, RxFormBuilder, FormBuilderConfiguration, RxFormGroup } from '@rxweb/reactive-form-validators';

export class User {

	@prop()
	userName: string;

	@prop()
	allocationDate: Date;

	@prop()
	admissionDate: Date;

	@prop()
	registrationDate: Date;

	@prop()
	enrollmentDate: Date;

	@prop()
	lastRegistrationDate: Date;

}


    describe('Dynamic Validation decorator', () => {
        let formBuilder = new RxFormBuilder();
        beforeEach(() => {
            ReactiveFormConfig.set({
                "validationMessage": {
                    "minDate": "input exceeds the Minimum Date Limit.",
                }
            });
        });

        describe('minDate dynamic validation', () => {

            let user = new User();

            it('should not error in allocationDate adding dynamic minDate validation',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        allocationDate: {
                            minDate: { value: '07/30/2018' }
                        }
                    };
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.allocationDate.setValue('07/31/2018');
                    expect(userFormGroup.controls.allocationDate.errors).toBeNull();
                });

            it('should error in allocationDate adding dynamic minDate validation',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        allocationDate: {
                            minDate: { value: '07/30/2018' }
                        }
                    };
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.allocationDate.setValue('07/29/2018');
                    expect(userFormGroup.controls.allocationDate.errors).toEqual({ 'minDate': { message: 'input exceeds the Minimum Date Limit.', refValues: ['07/29/2018'] } });
                });

            it('should not error in admissionDate with conditional expression in dynamic minDate validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        userName: {},
                        admissionDate: {
                            minDate: { value: '07/30/2018', conditionalExpression: 'x => x.userName == "Bharat"', }
                        }
                    }
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.userName.setValue("Bharat");
                    userFormGroup.controls.admissionDate.setValue('07/30/2019');
                    expect(userFormGroup.controls.admissionDate.errors).toBeNull();
                });

            it('should not error in admissionDate with conditional expression in dynamic minDate validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        userName: { },
                        admissionDate: {
                            minDate: { value: '07/30/2018', conditionalExpression: 'x => x.userName == "Bharat"', }
                        }
                    }
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.userName.setValue('Srishti');
                    userFormGroup.controls.admissionDate.setValue('01/30/2018');
                    expect(userFormGroup.controls.admissionDate.errors).toBeNull();
                });

            it('should error in admissionDate with conditional expression in dynamic minDate validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        userName: {},
                        admissionDate: {
                            minDate: { value: '07/30/2018', conditionalExpression: 'x => x.userName == "Bharat"', }
                        }
                    }
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.userName.setValue("Bharat");
                    userFormGroup.controls.admissionDate.setValue('07/30/2017');
                    expect(userFormGroup.controls.admissionDate.errors).toEqual({ 'minDate': { message: 'input exceeds the Minimum Date Limit.', refValues: ['07/30/2017'] } });
                });

            it('should error in registrationDate adding custom message in dynamic minDate validation.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        registrationDate: {
                            minDate: { value: '07/30/2018', message: '{{0}} exceeds the Minimum Date Limit', }
                        }
                    }
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.registrationDate.setValue('07/30/2011');
                    expect(userFormGroup.controls.registrationDate.errors).toEqual({ 'minDate': { message: '07/30/2011 exceeds the Minimum Date Limit', refValues: ['07/30/2011'] } });
                });

                it('should not error in lastRegistrationDate based on fieldName',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        enrollmentDate: {},
                        lastRegistrationDate: {
                            minDate: { fieldName: 'enrollmentDate' }
                        }
                    }
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.enrollmentDate.setValue('07/30/2019');
                    userFormGroup.controls.lastRegistrationDate.setValue('07/25/2020');
                    expect(userFormGroup.controls.lastRegistrationDate.errors).toBeNull();
                });

                it('should error in lastRegistrationDate based on fieldName.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        enrollmentDate: {},
                        lastRegistrationDate: {
                            minDate: { fieldName: 'enrollmentDate' }
                        }
                    }
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.enrollmentDate.setValue('07/30/2019');
                    userFormGroup.controls.lastRegistrationDate.setValue('07/25/2019');
                    expect(userFormGroup.controls.lastRegistrationDate.errors).toEqual({ 'minDate': { message: 'input exceeds the Minimum Date Limit.', refValues: ['07/25/2019'] } });
                });
            //end
        });
    });
