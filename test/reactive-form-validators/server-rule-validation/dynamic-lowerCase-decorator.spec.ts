import { ReactiveFormConfig, RxFormBuilder, FormBuilderConfiguration, RxFormGroup } from '../../../packages/reactive-form-validators';

import { lowerCase, prop, } from "../../../packages/reactive-form-validators"

export class User {

	@prop()
	username: string;

	@prop()
	middleName: string;

	@prop()
	lastName: string;

}

(function () {
    describe('Dynamic Validation decorator', () => {
        let formBuilder = new RxFormBuilder();
        beforeEach(() => {
            ReactiveFormConfig.set({
                "validationMessage": {
                    "lowerCase": "Input must be in Lowercase",
                }
            });
        });
        describe('lowerCase dynamic validation', () => {

            let user = new User();

            it('should not error in username adding dynamic lowerCase validation',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        username: {
                            lowerCase: true
                        }
                    };
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
                    userFormGroup.controls.username.setValue('bharat');
                    expect(userFormGroup.controls.username.errors).toBeNull();
                });

                it('should error in username adding dynamic lowerCase validation',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        username: {
                            lowerCase: true
                        }
                    };
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
                    userFormGroup.controls.username.setValue('Bharat');
                    expect(userFormGroup.controls.username.errors).toEqual({'lowerCase':{ message: 'Input must be in Lowercase', refValues: [ 'Bharat' ] } });
                });

                it('should not error in middleName with conditional expression in dynamic lowerCase validation with string.',
                () =>{
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        username : {
                            lowerCase : true  
                        },
                        middleName : {
                            lowerCase :  {conditionalExpression:'x => x.username == "jonathan.feldman"',} 
                        }
                    }
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
                    userFormGroup.controls.username.setValue('jonathan.feldman'); 
                    userFormGroup.controls.middleName.setValue('elizabeth');
                    expect(userFormGroup.controls.middleName.errors).toBeNull();
                });

                it('should not error in middleName with conditional expression in dynamic lowerCase validation with string.',
                () =>{
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        username : {
                            lowerCase : true  
                        },
                        middleName : {
                            lowerCase :  {conditionalExpression:'x => x.username == "jonathan.feldman"',} 
                        }
                    }
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
                    userFormGroup.controls.username.setValue('srishti.khandelwal'); 
                    userFormGroup.controls.middleName.setValue('Elizabeth');
                    expect(userFormGroup.controls.middleName.errors).toBeNull();
                });

                it('should error in middleName with conditional expression in dynamic lowerCase validation with string.',
                () =>{
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        username : {
                            lowerCase : true  
                        },
                        middleName : {
                            lowerCase :  {conditionalExpression:'x => x.username == "jonathan.feldman"',} 
                        }
                    }
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
                    userFormGroup.controls.username.setValue('jonathan.feldman'); 
                    userFormGroup.controls.middleName.setValue('Elizabeth');
                    expect(userFormGroup.controls.middleName.errors).toEqual({'lowerCase':{ message: 'Input must be in Lowercase', refValues: [ 'Elizabeth' ] } });
                });

                it('should error in lastName adding custom message in dynamic lowerCase validation.',
                () =>{
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        lastName : {
                            lowerCase :  {message:'You can enter only lowerCase letters.',} 
                        }
                    }
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
                    userFormGroup.controls.lastName.setValue('Feldman');
                    expect(userFormGroup.controls.lastName.errors).toEqual({'lowerCase':{ message: 'You can enter only lowerCase letters.', refValues: [ 'Feldman' ] } });
                });
            //end
        });
    });
})();