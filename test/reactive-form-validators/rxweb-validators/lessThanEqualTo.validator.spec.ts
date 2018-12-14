import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "lessThanEqualTo": "value should be less than equal to field",
        }
      });
    });

    describe('lessThanEqualTo', () => {

	      it('should not error on an empty string.',
        () => { 
          expect(RxwebValidators.lessThanEqualTo()(new FormControl(''))).toBeNull();
        });
	
      it('should not error on null.',
        () => { 
          expect(RxwebValidators.lessThanEqualTo()(new FormControl(null))).toBeNull();
        });
	
      it('should not error on undefined.',
        () => { 
          expect(RxwebValidators.lessThanEqualTo()(new FormControl(undefined))).toBeNull(); 
        });

      it("Should not error, Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'totalMarks':[100],
            'obtainedMarks':90
          });
          expect(RxwebValidators.lessThanEqualTo({fieldName:'totalMarks',conditionalExpression:(x,y) => x.totalMarks == 100 })(formGroup.controls.obtainedMarks)).toBeNull()
        });

      it("Should not error, Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'totalMarks':[10],
            'obtainedMarks':105
          });
          expect(RxwebValidators.lessThanEqualTo({fieldName:'totalMarks',conditionalExpression:(x,y) => x.totalMarks == 100 })(formGroup.controls.obtainedMarks)).toBeNull()
        });


      it("Should error, Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'totalMarks':[100],
            'obtainedMarks':105
          });
          expect(RxwebValidators.lessThanEqualTo({fieldName:'totalMarks',conditionalExpression:(x,y) => x.totalMarks == 100 })(formGroup.controls.obtainedMarks)).toEqual({'lessThanEqualTo':{ message: 'value should be less than equal to field', refValues: [ 105,100 ] } }); 
        });

      it("Should not error, Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'totalMarks':[100],
            'practicalExamMarks':90
          });
          expect(RxwebValidators.lessThanEqualTo({fieldName:'totalMarks',conditionalExpression:'x => x.totalMarks == 100'})(formGroup.controls.practicalExamMarks)).toBeNull()
        });

      it("Should not error, Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'totalMarks':[10],
            'practicalExamMarks':105
          });
          expect(RxwebValidators.lessThanEqualTo({fieldName:'totalMarks',conditionalExpression:'x => x.totalMarks == 100'})(formGroup.controls.practicalExamMarks)).toBeNull()
        });


      it("Should error, Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'totalMarks':[100],
            'practicalExamMarks':105
          });
          expect(RxwebValidators.lessThanEqualTo({fieldName:'totalMarks',conditionalExpression:'x => x.totalMarks == 100'})(formGroup.controls.practicalExamMarks)).toEqual({'lessThanEqualTo':{ message: 'value should be less than equal to field', refValues: [ 105,100 ] } }); 
        });


      it("Should error, Shows custom message",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'age':[100],
            'otherMarks':200
          });
          expect(RxwebValidators.lessThanEqualTo({fieldName:'totalMarks',message:'Please enter number less than 100.'})(formGroup.controls.otherMarks)).toEqual({'lessThanEqualTo':{ message: 'Please enter number less than 100.', refValues: [ 200,100 ] } }); 
        });



	//end
    });
  });
})();

