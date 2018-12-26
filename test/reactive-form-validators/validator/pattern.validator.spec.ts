import { AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import { RxwebValidators, ReactiveFormConfig } from '../../../packages/reactive-form-validators';

(function () {
  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationmessage": {
          "pattern": "Please add input as per pattern",
        }
      });
    });

    describe('patternValidator', () => {

      it('should not error on an empty string.',
        () => {
          expect(RxwebValidators.pattern()(new FormControl(''))).toBeNull();
        });

      it('should not error on null.',
        () => {
          expect(RxwebValidators.pattern()(new FormControl(null))).toBeNull();
        });

      it('should not error on undefined.',
        () => {
          expect(RxwebValidators.pattern()(new FormControl(undefined))).toBeNull();
        });

        it("Should not error, pattern validator If you enter an alphabetic value",
        () => { 
          expect(RxwebValidators.pattern({expression:{'onlyAlpha': RegExp(/^[A-Za-z]+$/)}})(new FormControl('Bharat'))).toBeNull(); 
        });
      
        it("Should error, pattern validator If you enter a non alphabetic value",
        () => { 
          expect(RxwebValidators.pattern({expression:{'onlyAlpha': RegExp(/^[A-Za-z]+$/)}})(new FormControl(55))).toEqual({'onlyAlpha':{ message: '', refValues: [ 55 ] } }); 
        });

        it("Should error, pattern validator Shows custom message",
        () => {
          expect(RxwebValidators.pattern({ expression:{'zipCode':RegExp('^[0-9]{5}(?:-[0-9]{4})?$') }, message: 'Zip code should match 12345 or 12345-6789' })(new FormControl(313001))).toEqual({ 'zipCode': { message: 'Zip code should match 12345 or 12345-6789', refValues: [313001] } });
        });

        
        it("Should not error, pattern validator Conditional Expression with type 'function'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'userName': 'Bharat',
            'contactNumber': 8796547812
          });
          expect(RxwebValidators.pattern({ expression:{'onlyDigit': RegExp(/^[0-9]*$/)},conditionalExpression: (x, y) => x.userName == "Bharat" })(formGroup.controls.contactNumber)).toBeNull()
        });

        it("Should not error, pattern validator Conditional Expression with type 'function'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'userName': 'Mahesh',
            'contactNumber': '+91-8796547812'
          });
          expect(RxwebValidators.pattern({ expression:{'onlyDigit': RegExp(/^[0-9]*$/)},conditionalExpression: (x, y) => x.userName == "Bharat" })(formGroup.controls.contactNumber)).toBeNull()
        });

        it("Should error, pattern validator Conditional Expression with type 'function'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'userName': 'Bharat',
            'contactNumber': '+91-8796547812'
          });
          expect(RxwebValidators.pattern({ expression:{'onlyDigit': RegExp(/^[0-9]*$/)},conditionalExpression: (x, y) => x.userName == "Bharat" })(formGroup.controls.contactNumber)).toEqual({ 'onlyDigit': { message: '', refValues: ['+91-8796547812'] } }); 
        });

        it("Should not error, pattern validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'userName': 'Bharat',
            'age': 25
          });
          expect(RxwebValidators.pattern({ expression:{'onlyDigit': RegExp(/^[0-9]*$/)},conditionalExpression: 'x => x.userName == "Bharat"' })(formGroup.controls.age)).toBeNull()
        });

        it("Should not error, pattern validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'userName': 'Mahesh',
            'age': '+55'
          });
          expect(RxwebValidators.pattern({ expression:{'onlyDigit': RegExp(/^[0-9]*$/)},conditionalExpression: 'x => x.userName == "Bharat"' })(formGroup.controls.age)).toBeNull()
        });

        it("Should error, pattern validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'userName': 'Bharat',
            'age': '+55'
          });
          expect(RxwebValidators.pattern({ expression:{'onlyDigit': RegExp(/^[0-9]*$/)},conditionalExpression: 'x => x.userName == "Bharat"' })(formGroup.controls.age)).toEqual({ 'onlyDigit': { message: '', refValues: ['+55'] } }); 
        });

    });
});
})();