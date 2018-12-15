
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { ReactiveFormConfig,RxFormBuilder } from '../../../packages/reactive-form-validators';


import {  compare,prop, } from    '../../../packages/reactive-form-validators';  

export class User {

	@prop()
	email: string;

	@compare({fieldName:'email' }) 
	confirmEmail: string;

	@prop()
	password: string;

	//Shows custom message
	@compare({fieldName:'password'  ,message:'You must enter same password' }) 
	confirmPassword: string;

}




(function() {
  describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "compare": "Both field are not matched",
        }
      });
    });

    describe('compareDecorator', () => {

	

    it("Should error, compare decorator ",
        () => {
		let user = new User();
		user.password = 'User@123';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.confirmPassword.setValue('user@123');
        expect(formGroup.controls.confirmPassword.errors).toEqual({'compare':{ message: 'You must enter same password', refValues: [ 'user@123','User@123' ] } });
     });



	//end
    });
  });
})();
