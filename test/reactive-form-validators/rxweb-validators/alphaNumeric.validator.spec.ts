import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';

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

      it("Should not error, ",
        () => { 
          expect(RxwebValidators.alphaNumeric({allowWhiteSpace:true})(new FormControl('Victoria Park'))).toBeNull(); 
        });


      it("Should error, ",
        () => { 
          expect(RxwebValidators.alphaNumeric({message:'Please enter only alphanumerics, special characters are not allowed.'})(new FormControl('1600 Amphi-theatre Pkwy'))).toEqual({'alphaNumeric':{ message: 'Please enter only alphanumerics, special characters are not allowed.', refValues: [ '1600 Amphi-theatre Pkwy' ] } }); 
        });

      it("Should not error, Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'areaName':['Delhi'],
            'countryCode':'IN'
          });
          expect(RxwebValidators.alphaNumeric({conditionalExpression:(x,y) => x.areaName == "Delhi" })(formGroup.controls.countryCode)).toBeNull()
        });

      it("Should not error, Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'areaName':['Mumbai'],
            'countryCode':'IN@1'
          });
          expect(RxwebValidators.alphaNumeric({conditionalExpression:(x,y) => x.areaName == "Delhi" })(formGroup.controls.countryCode)).toBeNull()
        });


      it("Should error, Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'areaName':['Delhi'],
            'countryCode':'IN@'
          });
          expect(RxwebValidators.alphaNumeric({conditionalExpression:(x,y) => x.areaName == "Delhi" })(formGroup.controls.countryCode)).toEqual({'alphaNumeric':{ message: 'Only Alpha Numerics are allowed.', refValues: [ 'IN@' ] } }); 
        });

      it("Should not error, Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'areaName':['Delhi'],
            'cityCode':'NY'
          });
          expect(RxwebValidators.alphaNumeric({conditionalExpression:'x => x.areaName =="Delhi"'})(formGroup.controls.cityCode)).toBeNull()
        });

      it("Should not error, Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'areaName':['Mumbai'],
            'cityCode':'NY#1'
          });
          expect(RxwebValidators.alphaNumeric({conditionalExpression:'x => x.areaName =="Delhi"'})(formGroup.controls.cityCode)).toBeNull()
        });


      it("Should error, Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'areaName':['Delhi'],
            'cityCode':'NY@'
          });
          expect(RxwebValidators.alphaNumeric({conditionalExpression:'x => x.areaName =="Delhi"'})(formGroup.controls.cityCode)).toEqual({'alphaNumeric':{ message: 'Only Alpha Numerics are allowed.', refValues: [ 'NY@' ] } }); 
        });



	//end
    });
  });
})();

