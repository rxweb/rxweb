import { AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import { RxwebValidators, ReactiveFormConfig } from '../../../packages/reactive-form-validators';

(function () {
  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "minLength": "Minimum length is not matched",
        }
      });
    });

    describe('minLengthValidator', () => {

        it('should not error on an empty string.',
          () => {
            expect(RxwebValidators.minLength()(new FormControl(''))).toBeNull();
          });
  
        it('should not error on null.',
          () => {
            expect(RxwebValidators.minLength()(new FormControl(null))).toBeNull();
          });
  
        it('should not error on undefined.',
          () => {
            expect(RxwebValidators.minLength()(new FormControl(undefined))).toBeNull();
          });

          it("Should not error, minLength validator If you enter a value which is greater than a mentioned minimum length",
          () => { 
            expect(RxwebValidators.minLength({value:10})(new FormControl(8579461257))).toBeNull(); 
          });
        
          it("Should error, minLength validator If you enter a value whose length is less than a mentioned minimum length",
          () => { 
            expect(RxwebValidators.minLength({value:10})(new FormControl(845796154))).toEqual({'minLength':{ message: 'Minimum length is not matched', refValues: [ 845796154,10 ] } }); 
          });

          it("Should error, minLength validator Shows custom message",
          () => {
            expect(RxwebValidators.minLength({ value:8, message: 'Minimum 8 characters are allowed' })(new FormControl(2548759))).toEqual({ 'minLength': { message: 'Minimum 8 characters are allowed', refValues: [2548759,8] } });
          });                       

          it("Should not error, minLength validator Conditional Expression with type 'function'",
          () => {
            let formBuilder = new FormBuilder();
            let formGroup = formBuilder.group({
              'countryName': 'India',
              'countryCode': 'IND'
            });
            expect(RxwebValidators.minLength({ value:3,conditionalExpression: (x, y) => x.countryName == "India" })(formGroup.controls.countryCode)).toBeNull()
          });
  
          it("Should not error, minLength validator Conditional Expression with type 'function'",
          () => {
            let formBuilder = new FormBuilder();
            let formGroup = formBuilder.group({
              'countryName': 'Denmark',
              'countryCode': 'DE'
            });
            expect(RxwebValidators.minLength({ value:3,conditionalExpression: (x, y) => x.countryName == "India" })(formGroup.controls.countryCode)).toBeNull()
          });
  
          it("Should error, minLength validator Conditional Expression with type 'function'",
          () => {
            let formBuilder = new FormBuilder();
            let formGroup = formBuilder.group({
              'countryName': 'India',
              'countryCode': 'IN'
            });
            expect(RxwebValidators.minLength({ value:3,conditionalExpression: (x, y) => x.countryName == "India" })(formGroup.controls.countryCode)).toEqual({ 'minLength': { message: 'Minimum length is not matched', refValues: ['IN',3] } }); 
          });
  
          it("Should not error, minLength validator Conditional Expression with type 'string'",
          () => {
            let formBuilder = new FormBuilder();
            let formGroup = formBuilder.group({
              'countryName': 'India',
              'stateCode': 'RAJ'
            });
            expect(RxwebValidators.minLength({ value:3,conditionalExpression: 'x => x.countryName == "India"' })(formGroup.controls.stateCode)).toBeNull()
          });
  
          it("Should not error, minLength validator Conditional Expression with type 'string'",
          () => {
            let formBuilder = new FormBuilder();
            let formGroup = formBuilder.group({
              'countryName': 'Denmark',
              'stateCode': 'DE'
            });
            expect(RxwebValidators.minLength({ value:3,conditionalExpression: 'x => x.countryName == "India"' })(formGroup.controls.stateCode)).toBeNull()
          });
  
          it("Should error, minLength validator Conditional Expression with type 'string'",
          () => {
            let formBuilder = new FormBuilder();
            let formGroup = formBuilder.group({
              'countryName': 'India',
              'stateCode': 'IN'
            });
            expect(RxwebValidators.minLength({ value:3,conditionalExpression: 'x => x.countryName == "India"' })(formGroup.controls.stateCode)).toEqual({ 'minLength': { message: 'Minimum length is not matched', refValues: ['IN',3] } }); 
          });
          
        });
    });
    })();