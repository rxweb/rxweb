import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "digit": "only digits are allowed",
        }
      });
    });

    describe('digit', () => {
      it('should not error on an empty string.',
        () => { 
          expect(RxwebValidators.digit()(new FormControl(''))).toBeNull();
        });
	
      it('should not error on null.',
        () => { 
          expect(RxwebValidators.digit()(new FormControl(null))).toBeNull();
        });
	
      it('should not error on undefined.',
        () => { 
          expect(RxwebValidators.digit()(new FormControl(undefined))).toBeNull(); 
        });

      it('should not give error on control which contains value which is digit.',
        () => { 
          expect(RxwebValidators.digit()(new FormControl('21'))).toBeNull(); 
        });

      it('should give error on control which contains value which is not digit.',
        () => { 
          expect(RxwebValidators.digit()(new FormControl('21qar'))).toEqual({'digit':{ message: 'only digits are allowed', refValues: [ '21qar' ] } }); 
        });


	      it('should not give error if the Age value is greaterThan or equal to 25 in phoneNumber FormControl  with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'age':['25'],
            'phoneNumber':['9898065491'],
          });
          expect(RxwebValidators.digit({conditionalExpression:(x,y) => x.age >= 25 })(formGroup.controls.phoneNumber)).toBeNull();

        });

	      it('should not give error if the Age value is greaterThan or equal to 25 in phoneNumber FormControl  with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'age':['25'],
            'faxNumber':['13235551234'],
          });
          expect(RxwebValidators.digit({conditionalExpression:'x => x.age >=25'})(formGroup.controls.faxNumber)).toBeNull();

        });

	      it('should not give error if the Age value is not greaterThan or equal to 25 in phoneNumber FormControl  with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'age':['23'],
            'phoneNumber':['9898065491'],
          });
          expect(RxwebValidators.digit({conditionalExpression:(x,y) => x.age >= 25 })(formGroup.controls.phoneNumber)).toBeNull();

        });

	      it('should not give error if the Age value is not greaterThan or equal to 25 in phoneNumber FormControl  with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'age':['23'],
            'faxNumber':['13235551234'],
          });
          expect(RxwebValidators.digit({conditionalExpression:'x => x.age >=25'})(formGroup.controls.faxNumber)).toBeNull();

        });


	      it('should give error if the Age value is not greaterThan or equal to 25 in  phoneNumber FormControl  with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'age':['25'],
            'phoneNumber':['9898065491qar'],
          });
          expect(RxwebValidators.digit({conditionalExpression:(x,y) => x.age >= 25 })(formGroup.controls.phoneNumber)).toEqual({'digit':{ message: 'only digits are allowed', refValues: [ '9898065491qar' ] } });

        });

	      it('should give error if the Age value is not greaterThan or equal to 25 in  phoneNumber FormControl  with ConditionExpression with String',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'age':['25'],
            'faxNumber':['9898065491qar'],
          });
          expect(RxwebValidators.digit({conditionalExpression:'x => x.age >=25'})(formGroup.controls.faxNumber)).toEqual({'digit':{ message: 'only digits are allowed', refValues: [ '9898065491qar' ] } });

        });




	      it('should give error, if the control contains value which is not digit.',
        () => {
          expect(RxwebValidators.digit({message:'Please enter only digit.'})(new FormControl('9898065491qar'))).toEqual({'digit':{ message: 'Please enter only digit.', refValues: [ '9898065491qar' ] } });

        });



//end
    });
  });
})();
