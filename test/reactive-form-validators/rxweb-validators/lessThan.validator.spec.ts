import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "lessThan": "value should be less than field",
        }
      });
    });

    describe('lessThan', () => {

	      it('should not error on an empty string.',
        () => { 
          expect(RxwebValidators.lessThan()(new FormControl(''))).toBeNull();
        });
	
      it('should not error on null.',
        () => { 
          expect(RxwebValidators.lessThan()(new FormControl(null))).toBeNull();
        });
	
      it('should not error on undefined.',
        () => { 
          expect(RxwebValidators.lessThan()(new FormControl(undefined))).toBeNull(); 
        });

      it("Should not error, Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'obtainedMarks':[34],
            'practicalExamMarks':90
          });
          expect(RxwebValidators.lessThan({fieldName:'obtainedMarks',conditionalExpression:(x,y) =>  x.obtainedMarks < 35})(formGroup.controls.practicalExamMarks)).toBeNull()
        });

      it("Should not error, Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'obtainedMarks':[10],
            'practicalExamMarks':105
          });
          expect(RxwebValidators.lessThan({fieldName:'obtainedMarks',conditionalExpression:(x,y) =>  x.obtainedMarks < 35})(formGroup.controls.practicalExamMarks)).toBeNull()
        });


      it("Should error, Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'obtainedMarks':[34],
            'practicalExamMarks':105
          });
          expect(RxwebValidators.lessThan({fieldName:'obtainedMarks',conditionalExpression:(x,y) =>  x.obtainedMarks < 35})(formGroup.controls.practicalExamMarks)).toEqual({'lessThan':{ message: 'value should be less than field', refValues: [ 105,34 ] } }); 
        });

      it("Should not error, Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'obtainedMarks':[34],
            'passingMarks':90
          });
          expect(RxwebValidators.lessThan({fieldName:'obtainedMarks',conditionalExpression:'x => x.obtainedMarks < 35'})(formGroup.controls.passingMarks)).toBeNull()
        });

      it("Should not error, Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'obtainedMarks':[10],
            'passingMarks':105
          });
          expect(RxwebValidators.lessThan({fieldName:'obtainedMarks',conditionalExpression:'x => x.obtainedMarks < 35'})(formGroup.controls.passingMarks)).toBeNull()
        });


      it("Should error, Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'obtainedMarks':[34],
            'passingMarks':105
          });
          expect(RxwebValidators.lessThan({fieldName:'obtainedMarks',conditionalExpression:'x => x.obtainedMarks < 35'})(formGroup.controls.passingMarks)).toEqual({'lessThan':{ message: 'value should be less than field', refValues: [ 105,34 ] } }); 
        });


      it("Should error, Shows custom message",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'obtainedMarks':[100],
            'otherMarks':105
          });
          expect(RxwebValidators.lessThan({fieldName:'obtainedMarks',message:'Please enter number greater than 100.'})(formGroup.controls.otherMarks)).toEqual({'lessThan':{ message: 'Please enter number greater than 100.', refValues: [ 105,100 ] } }); 
        });



	//end
    });
  });
})();

