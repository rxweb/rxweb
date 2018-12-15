
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { ReactiveFormConfig,RxFormBuilder } from '../../../packages/reactive-form-validators';


import {  lessThanEqualTo,prop, } from    '../../../packages/reactive-form-validators';  

export class User {

	@prop()
	totalMarks: number;

	@lessThanEqualTo({fieldName:'totalMarks' }) 
	passingMarks: number;

	//If you want to apply conditional expression of type 'function'
	@lessThanEqualTo({fieldName:'totalMarks'  ,conditionalExpression:(x,y) => x.totalMarks == 100  }) 
	obtainedMarks: number;

	//If you want to apply conditional expression of type 'string'
	@lessThanEqualTo({fieldName:'totalMarks'  ,conditionalExpression:'x => x.totalMarks == 100' }) 
	practicalExamMarks: number;

	@lessThanEqualTo({fieldName:'totalMarks'  ,message:'Please enter number less than 100.' }) 
	otherMarks: number;

}




(function() {
  describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "lessThanEqualTo": "value should be less than equal to field",
        }
      });
    });

    describe('lessThanEqualToDecorator', () => {

	
    it("Should not error, lessThanEqualTo decorator  Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.totalMarks = 100;
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.obtainedMarks.setValue(90);
        expect(formGroup.controls.obtainedMarks.errors).toBeNull();
     });

    it('obtainedMarks value should be "90".',
        () => {
        let user = new User();
        user.obtainedMarks = 90;
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.obtainedMarks.value).toEqual(90);
     });
    it("Should not error, lessThanEqualTo decorator  Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.totalMarks = 10;
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.obtainedMarks.setValue(105);
        expect(formGroup.controls.obtainedMarks.errors).toBeNull();
     });



    it("Should error, lessThanEqualTo decorator Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.totalMarks = 100;
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.obtainedMarks.setValue(105);
        expect(formGroup.controls.obtainedMarks.errors).toEqual({'lessThanEqualTo':{ message: 'value should be less than equal to field', refValues: [ 105,100 ] } });
     });


    it("Should not error, lessThanEqualTo decorator  Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.totalMarks = 100;
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.practicalExamMarks.setValue(90);
        expect(formGroup.controls.practicalExamMarks.errors).toBeNull();
     });

    it('practicalExamMarks value should be "90".',
        () => {
        let user = new User();
        user.practicalExamMarks = 90;
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.practicalExamMarks.value).toEqual(90);
     });
    it("Should not error, lessThanEqualTo decorator  Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.totalMarks = 10;
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.practicalExamMarks.setValue(105);
        expect(formGroup.controls.practicalExamMarks.errors).toBeNull();
     });



    it("Should error, lessThanEqualTo decorator Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.totalMarks = 100;
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.practicalExamMarks.setValue(105);
        expect(formGroup.controls.practicalExamMarks.errors).toEqual({'lessThanEqualTo':{ message: 'value should be less than equal to field', refValues: [ 105,100 ] } });
     });



    it("Should error, lessThanEqualTo decorator Shows custom message",
        () => {
		let user = new User();
		user.totalMarks = 100;
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.otherMarks.setValue(200);
        expect(formGroup.controls.otherMarks.errors).toEqual({'lessThanEqualTo':{ message: 'Please enter number less than 100.', refValues: [ 200,100 ] } });
     });



	//end
    });
  });
})();
