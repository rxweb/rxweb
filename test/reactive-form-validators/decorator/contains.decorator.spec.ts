
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { ReactiveFormConfig,RxFormBuilder } from '../../../packages/reactive-form-validators';


import {  contains, } from    '../../../packages/reactive-form-validators';  

export class User {

	@contains({value:'@gmail.com' }) 
	emailAddress: string;

	//If you want to apply conditional expression of type 'function'
	@contains({value:'@gmail.com'  ,conditionalExpression:(x,y) => x.emailAddress == "abc@gmail.com" }) 
	businessEmailAddress: string;

	//If you want to apply conditional expression of type 'string'
	@contains({value:'@gmail.com'  ,conditionalExpression:'x => x.emailAddress == "abc@gmail.com"' }) 
	recoveryEmailAddress: string;

	@contains({value:'@gmail.com'  ,message:'Please enter valid gmailId' }) 
	otherEmailAddress: string;

}




(function() {
  describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "contains": "input not contain string",
        }
      });
    });

    describe('containsDecorator', () => {

	
    it("Should not error, contains decorator  Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.emailAddress = 'abc@gmail.com';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.businessEmailAddress.setValue('xyz@gmail.com');
        expect(formGroup.controls.businessEmailAddress.errors).toBeNull();
     });

    it('businessEmailAddress value should be "xyz@gmail.com".',
        () => {
        let user = new User();
        user.businessEmailAddress = 'xyz@gmail.com';
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.businessEmailAddress.value).toEqual('xyz@gmail.com');
     });
    it("Should not error, contains decorator  Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.emailAddress = 'xyz@gmail.com';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.businessEmailAddress.setValue('mno@rediff.com');
        expect(formGroup.controls.businessEmailAddress.errors).toBeNull();
     });



    it("Should error, contains decorator Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.emailAddress = 'abc@gmail.com';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.businessEmailAddress.setValue('abc@yahoo.com');
        expect(formGroup.controls.businessEmailAddress.errors).toEqual({'contains':{ message: 'input not contain string', refValues: [ 'abc@yahoo.com','@gmail.com' ] } });
     });


    it("Should not error, contains decorator  Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.emailAddress = 'abc@gmail.com';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.recoveryEmailAddress.setValue('xyz@gmail.com');
        expect(formGroup.controls.recoveryEmailAddress.errors).toBeNull();
     });

    it('recoveryEmailAddress value should be "xyz@gmail.com".',
        () => {
        let user = new User();
        user.recoveryEmailAddress = 'xyz@gmail.com';
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.recoveryEmailAddress.value).toEqual('xyz@gmail.com');
     });
    it("Should not error, contains decorator  Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.emailAddress = 'john@gmail.com';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.recoveryEmailAddress.setValue('mark@rediff.com');
        expect(formGroup.controls.recoveryEmailAddress.errors).toBeNull();
     });



    it("Should error, contains decorator Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.emailAddress = 'abc@gmail.com';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.recoveryEmailAddress.setValue('abc@yahoo.com');
        expect(formGroup.controls.recoveryEmailAddress.errors).toEqual({'contains':{ message: 'input not contain string', refValues: [ 'abc@yahoo.com','@gmail.com' ] } });
     });



	 it("Should error, contains decorator Shows custom message",
        () => {
		let user = new User();
        let formGroup = formBuilder.formGroup(user);
		formGroup.controls.otherEmailAddress.setValue('admin123@hotmail.com');
        expect(formGroup.controls.otherEmailAddress.errors).toEqual({'contains':{ message: 'Please enter valid gmailId', refValues: [ 'admin123@hotmail.com','@gmail.com' ] } });
     });



	//end
    });
  });
})();
