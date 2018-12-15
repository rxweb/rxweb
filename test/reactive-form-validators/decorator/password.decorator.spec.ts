
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { ReactiveFormConfig,RxFormBuilder } from '../../../packages/reactive-form-validators';


import {  password, } from    '../../../packages/reactive-form-validators';  

export class LoginInfo {

	@password({validation:{maxLength: 10,minLength: 5,digit: true,specialCharacter: true} }) 
	newPassword: string;

	@password({validation:{maxLength: 10,minLength: 5,digit: true,specialCharacter: true}  ,message:'Password is not valid' }) 
	oldPassword: string;

}




(function() {
  describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "password": "Invalid Password",
        }
      });
    });

    describe('passwordDecorator', () => {

	
	 it("Should not error, password decorator  ",
        () => {
		let loginInfo = new LoginInfo();
        loginInfo.newPassword = undefined;
        let formGroup = formBuilder.formGroup(loginInfo);
        expect(formGroup.controls.newPassword.errors).toBeNull();
     });

    it('newPassword value should be "Admin@123".',
        () => {
        let loginInfo = new LoginInfo();
        loginInfo.newPassword = 'Admin@123';
        let formGroup = formBuilder.formGroup(loginInfo);
        expect(formGroup.controls.newPassword.value).toEqual('Admin@123');
     });

	 it("Should error, password decorator ",
        () => {
		let loginInfo = new LoginInfo();
        let formGroup = formBuilder.formGroup(loginInfo);
		formGroup.controls.newPassword.setValue('Admin123');
        expect(formGroup.controls.newPassword.errors).toEqual({'password':{ message: 'Invalid Password', refValues: [ 'Admin123' ] } });
     });



	 it("Should error, password decorator Shows Custom Validation Message",
        () => {
		let loginInfo = new LoginInfo();
        let formGroup = formBuilder.formGroup(loginInfo);
		formGroup.controls.oldPassword.setValue('Admin123');
        expect(formGroup.controls.oldPassword.errors).toEqual({'password':{ message: 'Password is not valid', refValues: [ 'Admin123' ] } });
     });



	//end
    });
  });
})();
