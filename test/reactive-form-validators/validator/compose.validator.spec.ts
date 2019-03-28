import {FormBuilder, FormControl} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '@rxweb/reactive-form-validators';



  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "compose": "multiple validations are failed.",
            "composeValidationKey": "should allow alphabets and numeric.",
          "alpha":"only alphabets are allowed."
        }
      });
    });

    describe('composeValidator', () => {

	      it('should not error on an empty string.',
        () => { 
          expect(RxwebValidators.compose({
            validators:[RxwebValidators.alpha()]
          })(new FormControl(''))).toBeNull();
        });
	
      it('should not error on null.',
        () => { 
          expect(RxwebValidators.compose({
            validators: [RxwebValidators.alpha()]
          })(new FormControl(null))).toBeNull();
        });
	
      it('should not error on undefined.',
        () => { 
          expect(RxwebValidators.compose({
            validators: [RxwebValidators.alpha()]
          })(new FormControl(undefined))).toBeNull(); 
        });

      it('should not error, FormControl value is alpha.',
        () => {
          expect(RxwebValidators.compose({
            validators: [RxwebValidators.alpha()]
          })(new FormControl("India"))).toBeNull();
        });

      it('should error, FormControl value is not alpha.',
          () => {
          expect(RxwebValidators.compose({
            validators: [RxwebValidators.alpha()]
          })(new FormControl("India@"))).toEqual({ 'alpha': { message: 'only alphabets are allowed.', refValues: ['India@'] } })
        });

      it('should error with custom message key.',
        () => {
          expect(RxwebValidators.compose({
            validators: [RxwebValidators.alpha()], messageKey:'composeValidationKey'
          })(new FormControl("India@"))).toEqual({ 'composeValidationKey': { message: 'should allow alphabets and numeric.', refValues: ['India@'] } })
        });

      it("Should not error, Conditional Expression passed and countryCode value in alphabets. Conditional Expression value type of 'function'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'countryName': 'India',
            'countryCode': 'IN'
          });
          expect(RxwebValidators.compose({
            validators: [RxwebValidators.alpha()], conditionalExpression: (x, y) => x.countryName == "India"
          })(formGroup.controls.countryCode)).toBeNull()
        });

      it("Should not error, Conditional Expression passed and countryCode value in alphabets. Conditional Expression value type of 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'countryName': 'India',
            'countryCode': 'IN'
          });
          expect(RxwebValidators.compose({
            validators: [RxwebValidators.alpha()], conditionalExpression: 'x => x.countryName == "India"'
          })(formGroup.controls.countryCode)).toBeNull()
        });

      it("Should error, Conditional Expression passed and countryCode value is not alphabets. Conditional Expression value type of 'function'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'countryName': 'India',
            'countryCode': 'IN@'
          });
          expect(RxwebValidators.compose({
            validators: [RxwebValidators.alpha()], conditionalExpression: (x, y) => x.countryName == "India"
          })(formGroup.controls.countryCode)).toEqual({ 'alpha': { message: 'only alphabets are allowed.', refValues: ['IN@'] } })
        });

      it("Should error, Conditional Expression passed and countryCode value is not alphabets. Conditional Expression value type of 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'countryName': 'India',
            'countryCode': 'IN@'
          });
          expect(RxwebValidators.compose({
            validators: [RxwebValidators.alpha()], conditionalExpression: 'x => x.countryName == "India"'
          })(formGroup.controls.countryCode)).toEqual({ 'alpha': { message: 'only alphabets are allowed.', refValues: ['IN@'] } })
        });


      it('should error with custom message.',
        () => {
          expect(RxwebValidators.compose({
            validators: [RxwebValidators.alpha()], message: 'only alphabets are allowed.'
          })(new FormControl("India@"))).toEqual({ 'compose': { message: 'only alphabets are allowed.', refValues: ['India@'] } })
        });



	//end
    });
  });
