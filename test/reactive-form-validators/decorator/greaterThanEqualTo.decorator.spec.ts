
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { ReactiveFormConfig,RxFormBuilder } from '../../../packages/reactive-form-validators';


import {  greaterThanEqualTo,prop, } from    '../../../packages/reactive-form-validators';  

export class User {

	@prop()
	admissionAge: number;

	@greaterThanEqualTo({fieldName:'admissionAge' }) 
	retiermentAge: number;

	//If you want to apply conditional expression of type 'function'
	@greaterThanEqualTo({fieldName:'admissionAge'  ,conditionalExpression:(x,y) => x.admissionAge >= 18  }) 
	voterAge: number;

	//If you want to apply conditional expression of type 'string'
	@greaterThanEqualTo({fieldName:'admissionAge'  ,conditionalExpression:'x => x.admissionAge >= 18 ' }) 
	memberAge: number;

	@greaterThanEqualTo({fieldName:'admissionAge'  ,message:'Please enter number greater than or equal to 1.' }) 
	otherAge: number;

}




(function() {
  describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "greaterThanEqualTo": "value should be greater than equal to field",
        }
      });
    });

    describe('greaterThanEqualToDecorator', () => {

	
    it("Should not error, greaterThanEqualTo decorator  Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.admissionAge = 18;
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
    it("Should not error, greaterThanEqualTo decorator  Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.admissionAge = 12;
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.voterAge.setValue(2);
        expect(formGroup.controls.voterAge.errors).toBeNull();
     });



    it("Should error, greaterThanEqualTo decorator Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.admissionAge = 18;
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.voterAge.setValue(2);
        expect(formGroup.controls.voterAge.errors).toEqual({'greaterThanEqualTo':{ message: 'value should be greater than equal to field', refValues: [ 2,18 ] } });
     });


    it("Should not error, greaterThanEqualTo decorator  Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.admissionAge = 18;
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
    it("Should not error, greaterThanEqualTo decorator  Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.admissionAge = 12;
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.memberAge.setValue(2);
        expect(formGroup.controls.memberAge.errors).toBeNull();
     });



    it("Should error, greaterThanEqualTo decorator Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.admissionAge = 18;
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.memberAge.setValue(2);
        expect(formGroup.controls.memberAge.errors).toEqual({'greaterThanEqualTo':{ message: 'value should be greater than equal to field', refValues: [ 2,18 ] } });
     });



    it("Should error, greaterThanEqualTo decorator Shows custom message",
        () => {
		let user = new User();
		user.admissionAge = 12;
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.otherAge.setValue(1);
        expect(formGroup.controls.otherAge.errors).toEqual({'greaterThanEqualTo':{ message: 'Please enter number greater than or equal to 1.', refValues: [ 1,12 ] } });
     });



	//end
    });
  });
})();
