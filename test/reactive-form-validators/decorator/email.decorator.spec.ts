
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { ReactiveFormConfig,RxFormBuilder } from '../../../packages/reactive-form-validators';


import {  email, } from    '../../../packages/reactive-form-validators';  

export class User {

	@email() 
	email: string;

	//If you want to apply conditional expression of type 'function'
	@email({conditionalExpression:(x,y) => x.email == "abc@gmail.com"  }) 
	recoveryEmailAddress: string;

	//If you want to apply conditional expression of type 'string'
	@email({conditionalExpression:'x => x.email =="abc@gmail.com"' }) 
	businessEmailAddress: string;

	@email({message:'Please enter valid email' }) 
	otherEmailAddress: string;

}




(function() {
  describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "email": "Invalid email format",
        }
      });
    });

    describe('emailDecorator', () => {

	
	  it('should not error in countryName property with null value.',
        () => {
        let formGroup = formBuilder.formGroup(User);
        expect(formGroup.controls.email.errors).toBeNull();
     });

	 it('should not error in countryName property with null value.',
        () => {
		let user = new User();
        user.email = undefined;
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.email.errors).toBeNull();
     });

    it("Should not error, email decorator  Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.email = 'abc@gmail.com';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.recoveryEmailAddress.setValue('ajay.ojha@radixweb.com');
        expect(formGroup.controls.recoveryEmailAddress.errors).toBeNull();
     });

    it('recoveryEmailAddress value should be "ajay.ojha@radixweb.com".',
        () => {
        let user = new User();
        user.recoveryEmailAddress = 'ajay.ojha@radixweb.com';
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.recoveryEmailAddress.value).toEqual('ajay.ojha@radixweb.com');
     });
    it("Should not error, email decorator  Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.email = 'john@gmail.com';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.recoveryEmailAddress.setValue('ajayojha@radix');
        expect(formGroup.controls.recoveryEmailAddress.errors).toBeNull();
     });



    it("Should error, email decorator Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.email = 'abc@gmail.com';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.recoveryEmailAddress.setValue('ajayojha@radix');
        expect(formGroup.controls.recoveryEmailAddress.errors).toEqual({'email':{ message: 'Invalid email format', refValues: [ 'ajayojha@radix' ] } });
     });


    it("Should not error, email decorator  Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.email = 'abc@gmail.com';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.businessEmailAddress.setValue('ajay.ojha@radixweb.com');
        expect(formGroup.controls.businessEmailAddress.errors).toBeNull();
     });

    it('businessEmailAddress value should be "ajay.ojha@radixweb.com".',
        () => {
        let user = new User();
        user.businessEmailAddress = 'ajay.ojha@radixweb.com';
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.businessEmailAddress.value).toEqual('ajay.ojha@radixweb.com');
     });
    it("Should not error, email decorator  Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.email = 'alex@gmail.com';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.businessEmailAddress.setValue('ajayojha@radix');
        expect(formGroup.controls.businessEmailAddress.errors).toBeNull();
     });



    it("Should error, email decorator Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.email = 'abc@gmail.com';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.businessEmailAddress.setValue('ajayojha@radix');
        expect(formGroup.controls.businessEmailAddress.errors).toEqual({'email':{ message: 'Invalid email format', refValues: [ 'ajayojha@radix' ] } });
     });



	 it("Should error, email decorator Shows custom message",
        () => {
		let user = new User();
        let formGroup = formBuilder.formGroup(user);
		formGroup.controls.otherEmailAddress.setValue('ajayojha@radix');
        expect(formGroup.controls.otherEmailAddress.errors).toEqual({'email':{ message: 'Please enter valid email', refValues: [ 'ajayojha@radix' ] } });
     });



	//end
    });
  });
})();
