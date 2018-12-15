
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { ReactiveFormConfig,RxFormBuilder } from '../../../packages/reactive-form-validators';


import {  greaterThan,prop, } from    '../../../packages/reactive-form-validators';  

export class User {

	@prop()
	age: number;

	@greaterThan({fieldName:'age' }) 
	retiermentAge: number;

	//If you want to apply conditional expression of type 'function'
	@greaterThan({fieldName:'age'  ,conditionalExpression:(x,y) => x.age > 17  }) 
	memberAge: number;

	//If you want to apply conditional expression of type 'string'
	@greaterThan({fieldName:'age'  ,conditionalExpression:'x => x.age > 17' }) 
	voterAge: number;

	@greaterThan({fieldName:'age'  ,message:'Please enter number greater than 0.' }) 
	otherAge: number;

}




(function() {
  describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "greaterThan": "value should be greater than field",
        }
      });
    });

    describe('greaterThanDecorator', () => {

	
    it("Should not error, greaterThan decorator  If you want to apply conditional validation on 'Voter Age' then need to add 'Age' field greater than '17'.",
        () => {
		let user = new User();
		user.age = 18;
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.memberAge.setValue(19);
        expect(formGroup.controls.memberAge.errors).toBeNull();
     });

    it('memberAge value should be "19".',
        () => {
        let user = new User();
        user.memberAge = 19;
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.memberAge.value).toEqual(19);
     });
    it("Should not error, greaterThan decorator  If you want to apply conditional validation on 'Voter Age' then need to add 'Age' field greater than '17'.",
        () => {
		let user = new User();
		user.age = 12;
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.memberAge.setValue(2);
        expect(formGroup.controls.memberAge.errors).toBeNull();
     });



    it("Should error, greaterThan decorator If you want to apply conditional validation on 'Voter Age' then need to add 'Age' field greater than '17'.",
        () => {
		let user = new User();
		user.age = 18;
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.memberAge.setValue(2);
        expect(formGroup.controls.memberAge.errors).toEqual({'greaterThan':{ message: 'value should be greater than field', refValues: [ 2,18 ] } });
     });


    it("Should not error, greaterThan decorator  If you want to apply conditional validation on 'Voter Age' then need to add 'Age' field greater than '17'.",
        () => {
		let user = new User();
		user.age = 18;
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.voterAge.setValue(19);
        expect(formGroup.controls.voterAge.errors).toBeNull();
     });

    it('voterAge value should be "19".',
        () => {
        let user = new User();
        user.voterAge = 19;
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.voterAge.value).toEqual(19);
     });
    it("Should not error, greaterThan decorator  If you want to apply conditional validation on 'Voter Age' then need to add 'Age' field greater than '17'.",
        () => {
		let user = new User();
		user.age = 12;
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.voterAge.setValue(2);
        expect(formGroup.controls.voterAge.errors).toBeNull();
     });



    it("Should error, greaterThan decorator If you want to apply conditional validation on 'Voter Age' then need to add 'Age' field greater than '17'.",
        () => {
		let user = new User();
		user.age = 18;
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.voterAge.setValue(2);
        expect(formGroup.controls.voterAge.errors).toEqual({'greaterThan':{ message: 'value should be greater than field', refValues: [ 2,18 ] } });
     });



    it("Should error, greaterThan decorator Shows custom message",
        () => {
		let user = new User();
		user.age = 12;
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.otherAge.setValue(1);
        expect(formGroup.controls.otherAge.errors).toEqual({'greaterThan':{ message: 'Please enter number greater than 0.', refValues: [ 1,12 ] } });
     });



	//end
    });
  });
})();
