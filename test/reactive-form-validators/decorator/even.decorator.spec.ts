
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { ReactiveFormConfig,RxFormBuilder } from '../../../packages/reactive-form-validators';


import {  even,prop, } from    '../../../packages/reactive-form-validators';  

export class User {

	@prop()
	type: string;

	//If you want to apply conditional expression of type 'function'
	@even({conditionalExpression:(x,y) => x.type == "Even"  }) 
	number: number;

	//If you want to apply conditional expression of type 'string'
	@even({conditionalExpression:'x => x.type == "Even"' }) 
	evenNumber: number;

	@even({message:'{{0}} is not an even number' }) 
	multiplesOfEvenNumber: number;

}




(function() {
  describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "even": "Enter a valid even number.",
        }
      });
    });

    describe('evenDecorator', () => {

	
    it("Should not error, even decorator  Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.type = 'Even';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.number.setValue(14);
        expect(formGroup.controls.number.errors).toBeNull();
     });

    it('number value should be "14".',
        () => {
        let user = new User();
        user.number = 14;
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.number.value).toEqual(14);
     });
    it("Should not error, even decorator  Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.type = 'Odd';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.number.setValue(15);
        expect(formGroup.controls.number.errors).toBeNull();
     });



    it("Should error, even decorator Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.type = 'Even';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.number.setValue(15);
        expect(formGroup.controls.number.errors).toEqual({'even':{ message: 'Enter a valid even number.', refValues: [ 15 ] } });
     });


    it("Should not error, even decorator  Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.type = 'Even';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.evenNumber.setValue(20);
        expect(formGroup.controls.evenNumber.errors).toBeNull();
     });

    it('evenNumber value should be "20".',
        () => {
        let user = new User();
        user.evenNumber = 20;
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.evenNumber.value).toEqual(20);
     });
    it("Should not error, even decorator  Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.type = 'Odd';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.evenNumber.setValue(19);
        expect(formGroup.controls.evenNumber.errors).toBeNull();
     });



    it("Should error, even decorator Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.type = 'Even';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.evenNumber.setValue(21);
        expect(formGroup.controls.evenNumber.errors).toEqual({'even':{ message: 'Enter a valid even number.', refValues: [ 21 ] } });
     });



	 it("Should error, even decorator Shows custom message.",
        () => {
		let user = new User();
        let formGroup = formBuilder.formGroup(user);
		formGroup.controls.multiplesOfEvenNumber.setValue(21);
        expect(formGroup.controls.multiplesOfEvenNumber.errors).toEqual({'even':{ message: '21 is not an even number', refValues: [ 21 ] } });
     });



	//end
    });
  });
})();
