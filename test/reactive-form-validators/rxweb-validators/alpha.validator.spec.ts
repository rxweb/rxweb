import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "alpha": "Only alphabets are allowed.",
        }
      });
    });

    describe('alpha', () => {

	      it('should not error on an empty string.',
        () => { 
          expect(RxwebValidators.alpha()(new FormControl(''))).toBeNull();
        });
	
      it('should not error on null.',
        () => { 
          expect(RxwebValidators.alpha()(new FormControl(null))).toBeNull();
        });
	
      it('should not error on undefined.',
        () => { 
          expect(RxwebValidators.alpha()(new FormControl(undefined))).toBeNull(); 
        });

      it("Should not error, If you want to apply conditional validation on 'Country Code' or 'City' then you need to add this input as 'India'.",
        () => { 
          expect(RxwebValidators.alpha()(new FormControl('India'))).toBeNull(); 
        });


      it("Should error, If you want to apply conditional validation on 'Country Code' or 'City' then you need to add this input as 'India'.",
        () => { 
          expect(RxwebValidators.alpha()(new FormControl('India@'))).toEqual({'alpha':{ message: 'Only alphabets are allowed.', refValues: [ 'India@' ] } }); 
        });

      it("Should not error, Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'countryName':['India'],
            'countryCode':'IN'
          });
          expect(RxwebValidators.alpha({conditionalExpression:(x,y) => x.countryName == "India"})(formGroup.controls.countryCode)).toBeNull()
        });

      it("Should not error, Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'countryName':['France'],
            'countryCode':'IN01'
          });
          expect(RxwebValidators.alpha({conditionalExpression:(x,y) => x.countryName == "India"})(formGroup.controls.countryCode)).toBeNull()
        });


      it("Should error, Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'countryName':['India'],
            'countryCode':'IN@'
          });
          expect(RxwebValidators.alpha({conditionalExpression:(x,y) => x.countryName == "India"})(formGroup.controls.countryCode)).toEqual({'alpha':{ message: 'Only alphabets are allowed.', refValues: [ 'IN@' ] } }); 
        });

      it("Should not error, Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'countryName':['India'],
            'cityName':'GOA'
          });
          expect(RxwebValidators.alpha({conditionalExpression:'x => x.countryName =="India"'})(formGroup.controls.cityName)).toBeNull()
        });

      it("Should not error, Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'countryName':['France'],
            'cityName':'New Delhi'
          });
          expect(RxwebValidators.alpha({conditionalExpression:'x => x.countryName =="India"'})(formGroup.controls.cityName)).toBeNull()
        });


      it("Should error, Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'countryName':['India'],
            'cityName':'New Delhi'
          });
          expect(RxwebValidators.alpha({conditionalExpression:'x => x.countryName =="India"'})(formGroup.controls.cityName)).toEqual({'alpha':{ message: 'Only alphabets are allowed.', refValues: [ 'New Delhi' ] } }); 
        });

      it("Should not error, This allowed whitespace in alpha validation",
        () => { 
          expect(RxwebValidators.alpha({allowWhiteSpace:true})(new FormControl('New Delhi'))).toBeNull(); 
        });


      it("Should error, Shows custom message",
        () => { 
          expect(RxwebValidators.alpha({message:'You can enter only alphabets.'})(new FormControl('DL01'))).toEqual({'alpha':{ message: 'You can enter only alphabets.', refValues: [ 'DL01' ] } }); 
        });



	//end
    });
  });
})();

