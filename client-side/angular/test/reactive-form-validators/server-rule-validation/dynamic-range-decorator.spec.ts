import { prop, ReactiveFormConfig, RxFormBuilder, FormBuilderConfiguration, RxFormGroup } from '@rxweb/reactive-form-validators';


export class EmployeeInfo {

    @prop()
    age: number;

    @prop()
    experience: number;

    @prop()
    salary: number;

}


describe('Dynamic Validation decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
        ReactiveFormConfig.set({
            "validationMessage": {
                "range": "Input exceeds the range",
            }
        });
    });

    describe('range dynamic validation', () => {

        let employeeInfo = new EmployeeInfo();

        it('should not error in age adding dynamic range validation',
            () => {
                let formBuilderConfiguration = new FormBuilderConfiguration();
                formBuilderConfiguration.dynamicValidation = {
                    age: {
                        range: {
                            minimumNumber: 18,
                            maximumNumber: 60
                        }
                    }
                };
                let employeeInfoFormGroup = <RxFormGroup>formBuilder.formGroup(employeeInfo, formBuilderConfiguration);
                employeeInfoFormGroup.controls.age.setValue(25);
                expect(employeeInfoFormGroup.controls.age.errors).toBeNull();
            });

        it('should error in age adding dynamic range validation',
            () => {
                let formBuilderConfiguration = new FormBuilderConfiguration();
                formBuilderConfiguration.dynamicValidation = {
                    age: {
                        range: {
                            minimumNumber: 18,
                            maximumNumber: 60
                        }
                    }
                };
                let employeeInfoFormGroup = <RxFormGroup>formBuilder.formGroup(employeeInfo, formBuilderConfiguration);
                employeeInfoFormGroup.controls.age.setValue(10);
                expect(employeeInfoFormGroup.controls.age.errors).toEqual({ 'range': { message: 'Input exceeds the range', refValues: [10, 18, 60] } });
            });

        it('should not error in experience with conditional expression in dynamic range validation with string.',
            () => {
                let formBuilderConfiguration = new FormBuilderConfiguration();
                formBuilderConfiguration.dynamicValidation = {
                    age: {
                        range: {
                            minimumNumber: 18,
                            maximumNumber: 60
                        }
                    },
                    experience: {
                        range: { minimumNumber: 2, maximumNumber: 20, conditionalExpression: 'x => x.age >= 25', }
                    }
                }
                let employeeInfoFormGroup = <RxFormGroup>formBuilder.formGroup(employeeInfo, formBuilderConfiguration);
                employeeInfoFormGroup.controls.age.setValue(30);
                employeeInfoFormGroup.controls.experience.setValue(10);
                expect(employeeInfoFormGroup.controls.experience.errors).toBeNull();
            });

        it('should not error in experience with conditional expression in dynamic range validation with string.',
            () => {
                let formBuilderConfiguration = new FormBuilderConfiguration();
                formBuilderConfiguration.dynamicValidation = {
                    age: {
                        range: {
                            minimumNumber: 18,
                            maximumNumber: 60
                        }
                    },
                    experience: {
                        range: { minimumNumber: 2, maximumNumber: 20, conditionalExpression: 'x => x.age >= 25', }
                    }
                }
                let employeeInfoFormGroup = <RxFormGroup>formBuilder.formGroup(employeeInfo, formBuilderConfiguration);
                employeeInfoFormGroup.controls.age.setValue(20);
                employeeInfoFormGroup.controls.experience.setValue(40);
                expect(employeeInfoFormGroup.controls.experience.errors).toBeNull();
            });

        it('should error in experience with conditional expression in dynamic range validation with string.',
            () => {
                let formBuilderConfiguration = new FormBuilderConfiguration();
                formBuilderConfiguration.dynamicValidation = {
                    age: {
                        range: {
                            minimumNumber: 18,
                            maximumNumber: 60
                        }
                    },
                    experience: {
                        range: { minimumNumber: 2, maximumNumber: 20, conditionalExpression: 'x => x.age >= 25', }
                    }
                }
                let employeeInfoFormGroup = <RxFormGroup>formBuilder.formGroup(employeeInfo, formBuilderConfiguration);
                employeeInfoFormGroup.controls.age.setValue(30);
                employeeInfoFormGroup.controls.experience.setValue(40);
                expect(employeeInfoFormGroup.controls.experience.errors).toEqual({ 'range': { message: 'Input exceeds the range', refValues: [40, 2, 20] } });
            });

        it('should error in salary adding custom message in dynamic range validation.',
            () => {
                let formBuilderConfiguration = new FormBuilderConfiguration();
                formBuilderConfiguration.dynamicValidation = {
                    salary: {
                        range: { minimumNumber: 1000, maximumNumber: 200000, message: 'Your Salary should be between 1000 to 200000.', }
                    }
                }
                let employeeInfoFormGroup = <RxFormGroup>formBuilder.formGroup(employeeInfo, formBuilderConfiguration);
                employeeInfoFormGroup.controls.salary.setValue(100);
                expect(employeeInfoFormGroup.controls.salary.errors).toEqual({ 'range': { message: 'Your Salary should be between 1000 to 200000.', refValues: [100, 1000, 200000] } });
            });
        //end
    });
});
