import { prop,ReactiveFormConfig, RxFormBuilder, FormBuilderConfiguration, RxFormGroup } from '@rxweb/reactive-form-validators';

export class User {

    @prop()
    name: string;

    @prop()
    taskId: string;

    @prop()
    company: string;

}


    describe('Dynamic Validation decorator', () => {
        let formBuilder = new RxFormBuilder();
        beforeEach(() => {
            ReactiveFormConfig.set({
                "validationMessage": {
                    "startsWith": "Input must starts with a pre defined value",
                }
            });
        });

        describe('startsWith dynamic validation', () => {

            let user = new User();

            it('should not error in name adding dynamic startsWith validation',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        name: {
                            startsWith: { value: 'B' }
                        }
                    };
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.name.setValue('Bharat');
                    expect(userFormGroup.controls.name.errors).toBeNull();
                });

            it('should error in name adding dynamic startsWith validation',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        name: {
                            startsWith: { value: 'B' }
                        }
                    };
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.name.setValue('Srishti');
                    expect(userFormGroup.controls.name.errors).toEqual({ 'startsWith': { message: 'Input must starts with a pre defined value', refValues: ['Srishti', 'B'] } });
                });

            it('should not error in taskId with conditional expression in dynamic startsWith validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        name: {
                            startsWith: { value: 'B' }
                        },
                        taskId: {
                            startsWith: { value: '#', conditionalExpression: 'x => x.name == "Bharat"', }
                        }
                    }
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.name.setValue('Bharat');
                    userFormGroup.controls.taskId.setValue('#51457');
                    expect(userFormGroup.controls.taskId.errors).toBeNull();
                });

            it('should not error in taskId with conditional expression in dynamic startsWith validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        name: {
                            startsWith: { value: 'B' }
                        },
                        taskId: {
                            startsWith: { value: '#', conditionalExpression: 'x => x.name == "Bharat"', }
                        }
                    }
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.name.setValue('Srishti');
                    userFormGroup.controls.taskId.setValue('51457');
                    expect(userFormGroup.controls.taskId.errors).toBeNull();
                });

            it('should error in taskId with conditional expression in dynamic startsWith validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        name: {
                            startsWith: { value: 'B' }
                        },
                        taskId: {
                            startsWith: { value: '#', conditionalExpression: 'x => x.name == "Bharat"', }
                        }
                    }
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.name.setValue('Bharat');
                    userFormGroup.controls.taskId.setValue('61937');
                    expect(userFormGroup.controls.taskId.errors).toEqual({ 'startsWith': { message: 'Input must starts with a pre defined value', refValues: ['61937', '#'] } });
                });

            it('should error in company adding custom message in dynamic startsWith validation.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        company: {
                            startsWith: { value: 'R', message: '{{0}} does not starts with `R`', }
                        }
                    }
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.company.setValue('Microsoft');
                    expect(userFormGroup.controls.company.errors).toEqual({ 'startsWith': { message: 'Microsoft does not starts with `R`', refValues: ['Microsoft','R'] } });
                });
            //end
        });
    });
