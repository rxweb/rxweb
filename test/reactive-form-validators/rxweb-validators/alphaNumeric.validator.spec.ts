import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "alphaNumeric": "Only Alpha Numerics are allowed.",
        }
      });
    });

    describe('alphaNumeric', () => {
      it('should not error on an empty string.',
        () => { 
          expect(RxwebValidators.alphaNumeric()(new FormControl(''))).toBeNull();
        });
	
      it('should not error on null.',
        () => { 
          expect(RxwebValidators.alphaNumeric()(new FormControl(null))).toBeNull();
        });
	
      it('should not error on undefined.',
        () => { 
          expect(RxwebValidators.alphaNumeric()(new FormControl(undefined))).toBeNull(); 
        });

      it('should not give error on control which contains value other than alphabets and numbers.',
        () => { 
          expect(RxwebValidators.alphaNumeric()(new FormControl('Delhi'))).toBeNull(); 
        });

      it('should give error on control which contains value other than alphabets and numbers.',
        () => { 
          expect(RxwebValidators.alphaNumeric()(new FormControl('Delhi@'))).toEqual({'alphaNumeric':{ message: 'Only Alpha Numerics are allowed.', refValues: [ 'Delhi@' ] } }); 
        });


	      it('should not give error in flatAddress value with space.',
        () => {
          expect(RxwebValidators.alphaNumeric({allowWhiteSpace:true})(new FormControl('D3 Deshana appartment'))).toBeNull();

        });


	      it('should give error in flatAddress value with space.',
        () => {
          expect(RxwebValidators.alphaNumeric({allowWhiteSpace:false})(new FormControl('D3 Deshana appartment'))).toEqual({'alphaNumeric':{ message: 'Only Alpha Numerics are allowed.', refValues: [ 'D3 Deshana appartment' ] } });

        });




	      it('should give error, if the control contains value which is non alphabet.',
        () => {
          expect(RxwebValidators.alphaNumeric({message:'Please enter only alphanumerics, special characters are not allowed and whitespace is allowed.'})(new FormControl('D-3 Deshana appartment'))).toEqual({'alphaNumeric':{ message: 'Please enter only alphanumerics, special characters are not allowed and whitespace is allowed.', refValues: [ 'D-3 Deshana appartment' ] } });

        });



	      it('should not give error if the areaName value is Delhi and alphabets in countryCode FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'areaName':['Delhi'],
            'countryCode':['Del'],
          });
          expect(RxwebValidators.alphaNumeric({conditionalExpression:(x,y) => x.areaName == "Delhi" })(formGroup.controls.countryCode)).toBeNull();

        });

	      it('should not give error if the areaName value is Delhi and alphabets in cityCode FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'areaName':['Delhi'],
            'cityCode':['Del'],
          });
          expect(RxwebValidators.alphaNumeric({conditionalExpression:'x => x.areaName =="Delhi"'})(formGroup.controls.cityCode)).toBeNull();

        });

	      it('should not give error if the areaName value is Udaipur and non alphabets in cityCode FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'areaName':['Udaipur'],
            'cityCode':['Udz@'],
          });
          expect(RxwebValidators.alphaNumeric({conditionalExpression:'x => x.areaName =="Delhi"'})(formGroup.controls.cityCode)).toBeNull();

        });

	      it('should not give error if the areaName value is Udaipur and non alphabets in cityCode FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'areaName':['Udaipur'],
            'cityCode':['Udz@'],
          });
          expect(RxwebValidators.alphaNumeric({conditionalExpression:(x,y) => x.areaName == "Delhi" })(formGroup.controls.cityCode)).toBeNull();

        });


	      it('should give error if the areaName value is Delhi and non alphabets in countryCode FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'areaName':['Delhi'],
            'countryCode':['Delhi@'],
          });
          expect(RxwebValidators.alphaNumeric({conditionalExpression:(x,y) => x.areaName == "Delhi" })(formGroup.controls.countryCode)).toEqual({'alphaNumeric':{ message: 'Only Alpha Numerics are allowed.', refValues: [ 'Delhi@' ] } });

        });

	      it('should  give error if areaName value is Delhi and non alphabets in countryCode FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'areaName':['Delhi'],
            'cityCode':['GJ@'],
          });
          expect(RxwebValidators.alphaNumeric({conditionalExpression:'x => x.areaName =="Delhi"'})(formGroup.controls.cityCode)).toEqual({'alphaNumeric':{ message: 'Only Alpha Numerics are allowed.', refValues: [ 'GJ@' ] } });

        });



//end
    });
  });
})();
