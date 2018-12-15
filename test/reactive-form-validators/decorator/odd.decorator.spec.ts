
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { ReactiveFormConfig,RxFormBuilder } from '../../../packages/reactive-form-validators';


import {  odd,prop, } from    '../../../packages/reactive-form-validators';  

export class User {

	@prop()
	type: string;

	//If you want to apply conditional expression of type 'function'
	@odd({conditionalExpression:(x,y) => x.type == "Odd"  }) 
	number: number;

	//If you want to apply conditional expression of type 'string'
	@odd({conditionalExpression:'x => x.type == "Odd"' }) 
	oddNumber: number;

	@odd({message:'{{0}} is not an odd number' }) 
	multiplesOfOddNumber: number;

}




(function() {
  describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "odd": "Enter a valid odd number.",
        }
      });
    });

    describe('oddDecorator', () => {

	
    it("Should not error, odd decorator  Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.type = 'Odd';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.number.setValue(27);
        expect(formGroup.controls.number.errors).toBeNull();
     });

    it('number value should be "27".',
        () => {
        let user = new User();
        user.number = 27;
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.number.value).toEqual(27);
     });
    it("Should not error, odd decorator  Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.type = 'Even';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.number.setValue(26);
        expect(formGroup.controls.number.errors).toBeNull();
     });



    it("Should error, odd decorator Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.type = 'Odd';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.number.setValue(26);
        expect(formGroup.controls.number.errors).toEqual({'odd':{ message: 'Enter a valid odd number.', refValues: [ 26 ] } });
     });


    it("Should not error, odd decorator  Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.type = 'Odd';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.oddNumber.setValue(27);
        expect(formGroup.controls.oddNumber.errors).toBeNull();
     });

    it('oddNumber value should be "27".',
        () => {
        let user = new User();
        user.oddNumber = 27;
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.oddNumber.value).toEqual(27);
     });
    it("Should not error, odd decorator  Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.type = 'Even';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.oddNumber.setValue(26);
        expect(formGroup.controls.oddNumber.errors).toBeNull();
     });



    it("Should error, odd decorator Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.type = 'Odd';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.oddNumber.setValue(26);
        expect(formGroup.controls.oddNumber.errors).toEqual({'odd':{ message: 'Enter a valid odd number.', refValues: [ 26 ] } });
     });



	 it("Should error, odd decorator Shows custom message.",
        () => {
		let user = new User();
        let formGroup = formBuilder.formGroup(user);
		formGroup.controls.multiplesOfOddNumber.setValue(26);
        expect(formGroup.controls.multiplesOfOddNumber.errors).toEqual({'odd':{ message: '26 is not an odd number', refValues: [ 26 ] } });
     });



	//end
    });
  });
})();
