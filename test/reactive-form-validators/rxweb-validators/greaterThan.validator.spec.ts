import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "greaterThan": "value should be greater than field",
        }
      });
    });

    describe('greaterThan', () => {

	      it('should not error on an empty string.',
        () => { 
          expect(RxwebValidators.greaterThan()(new FormControl(''))).toBeNull();
        });
	
      it('should not error on null.',
        () => { 
          expect(RxwebValidators.greaterThan()(new FormControl(null))).toBeNull();
        });
	
      it('should not error on undefined.',
        () => { 
          expect(RxwebValidators.greaterThan()(new FormControl(undefined))).toBeNull(); 
        });

      it("Should not error, If you want to apply conditional validation on 'Voter Age' then need to add 'Age' field greater than '17'.",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'age':[18],
            'memberAge':19
          });
          expect(RxwebValidators.greaterThan({fieldName:'age',conditionalExpression:(x,y) => x.age > 17 })(formGroup.controls.memberAge)).toBeNull()
        });

      it("Should not error, If you want to apply conditional validation on 'Voter Age' then need to add 'Age' field greater than '17'.",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'age':[12],
            'memberAge':2
          });
          expect(RxwebValidators.greaterThan({fieldName:'age',conditionalExpression:(x,y) => x.age > 17 })(formGroup.controls.memberAge)).toBeNull()
        });


      it("Should error, If you want to apply conditional validation on 'Voter Age' then need to add 'Age' field greater than '17'.",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'age':[18],
            'memberAge':2
          });
          expect(RxwebValidators.greaterThan({fieldName:'age',conditionalExpression:(x,y) => x.age > 17 })(formGroup.controls.memberAge)).toEqual({'greaterThan':{ message: 'value should be greater than field', refValues: [ 2,18 ] } }); 
        });

      it("Should not error, If you want to apply conditional validation on 'Voter Age' then need to add 'Age' field greater than '17'.",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'age':[18],
            'voterAge':19
          });
          expect(RxwebValidators.greaterThan({fieldName:'age',conditionalExpression:'x => x.age > 17'})(formGroup.controls.voterAge)).toBeNull()
        });

      it("Should not error, If you want to apply conditional validation on 'Voter Age' then need to add 'Age' field greater than '17'.",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'age':[12],
            'voterAge':2
          });
          expect(RxwebValidators.greaterThan({fieldName:'age',conditionalExpression:'x => x.age > 17'})(formGroup.controls.voterAge)).toBeNull()
        });


      it("Should error, If you want to apply conditional validation on 'Voter Age' then need to add 'Age' field greater than '17'.",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'age':[18],
            'voterAge':2
          });
          expect(RxwebValidators.greaterThan({fieldName:'age',conditionalExpression:'x => x.age > 17'})(formGroup.controls.voterAge)).toEqual({'greaterThan':{ message: 'value should be greater than field', refValues: [ 2,18 ] } }); 
        });


      it("Should error, Shows custom message",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'age':[12],
            'otherAge':1
          });
          expect(RxwebValidators.greaterThan({fieldName:'age',message:'Please enter number greater than 0.'})(formGroup.controls.otherAge)).toEqual({'greaterThan':{ message: 'Please enter number greater than 0.', refValues: [ 1,12 ] } }); 
        });



	//end
    });
  });
})();

