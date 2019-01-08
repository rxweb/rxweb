import { ReactiveFormConfig,RxFormBuilder, FormBuilderConfiguration, RxFormGroup } from '../../../packages/reactive-form-validators';


import {  password, } from    '../../../packages/reactive-form-validators';  

export class LoginInfo {

	@password({validation:{maxLength: 10,minLength: 5,digit: true,specialCharacter: true} }) 
	newPassword: string;

	@password({validation:{maxLength: 10,minLength: 5,digit: true,specialCharacter: true}  ,message:'Password is not valid' }) 
	oldPassword: string;

}

(function() {
  describe('Dyanmic-password-validation-decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "password": "Invalid Password",
        }
      });
    });

    describe('passwordDecorator', () => {
        let loginInfo = new LoginInfo();
        it('should not error in newPassword in dynamic password validation.',
        () => {
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
                newPassword:{
                    password:
                    {
                        validation:
                        { maxLength: 10,minLength: 5,digit: true,specialCharacter: true}
                    }
                }               
            }
 
            let userFormGroup = <RxFormGroup>formBuilder.formGroup(loginInfo, formBuilderConfiguration);
            userFormGroup.controls.newPassword.setValue('User@12345');
            expect(userFormGroup.controls.newPassword.errors).toBeNull();
            });

            it('should not error in newPassword in dynamic password validation.',
            () => {
                let formBuilderConfiguration = new FormBuilderConfiguration();
                formBuilderConfiguration.dynamicValidation = {
                    newPassword:{
                        password:
                        {
                            validation:
                            { maxLength: 10,minLength: 5,digit: true,specialCharacter: true}
                        }
                    }               
                }
     
                let userFormGroup = <RxFormGroup>formBuilder.formGroup(loginInfo, formBuilderConfiguration);
                userFormGroup.controls.newPassword.setValue('User');
                expect(userFormGroup.controls.newPassword.errors).toEqual({ 'password': { message: 'Invalid Password', refValues: ['User'] } });
                });

        });
    })
})();
