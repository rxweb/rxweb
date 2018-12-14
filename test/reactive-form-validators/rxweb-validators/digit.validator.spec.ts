import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';

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

      it("Should not error, If you want to apply conditional expression of type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'age':[25],
            'phoneNumber':9898164093
          });
          expect(RxwebValidators.digit({conditionalExpression:(x,y) => x.age >= 25 })(formGroup.controls.phoneNumber)).toBeNull()
        });

      it("Should not error, If you want to apply conditional expression of type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'age':[21],
            'phoneNumber':'+91-9898164093'
          });
          expect(RxwebValidators.digit({conditionalExpression:(x,y) => x.age >= 25 })(formGroup.controls.phoneNumber)).toBeNull()
        });


      it("Should error, If you want to apply conditional expression of type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'age':[25],
            'phoneNumber':'+91-9898164093'
          });
          expect(RxwebValidators.digit({conditionalExpression:(x,y) => x.age >= 25 })(formGroup.controls.phoneNumber)).toEqual({'digit':{ message: 'only digits are allowed', refValues: [ '+91-9898164093' ] } }); 
        });

      it("Should not error, If you want to apply conditional expression of type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'age':[25],
            'faxNumber':442081234567
          });
          expect(RxwebValidators.digit({conditionalExpression:'x => x.age >=25'})(formGroup.controls.faxNumber)).toBeNull()
        });

      it("Should not error, If you want to apply conditional expression of type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'age':[21],
            'faxNumber':'+44-208-1234567'
          });
          expect(RxwebValidators.digit({conditionalExpression:'x => x.age >=25'})(formGroup.controls.faxNumber)).toBeNull()
        });


      it("Should error, If you want to apply conditional expression of type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'age':[25],
            'faxNumber':'+44-208-1234567'
          });
          expect(RxwebValidators.digit({conditionalExpression:'x => x.age >=25'})(formGroup.controls.faxNumber)).toEqual({'digit':{ message: 'only digits are allowed', refValues: [ '+44-208-1234567' ] } }); 
        });


      it("Should error, Shows custom message",
        () => { 
          expect(RxwebValidators.digit({message:'Please enter only digit.'})(new FormControl('+91-9898164093'))).toEqual({'digit':{ message: 'Please enter only digit.', refValues: [ '+91-9898164093' ] } }); 
        });



	//end
    });
  });
})();

