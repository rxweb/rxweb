import { AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import { RxwebValidators, ReactiveFormConfig } from '../../../packages/reactive-form-validators';


(function () {
  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "alphaNumeric": "Only alphanumerics are allowed.",
        }
      });
    });
    describe('alphaNumericValidator', () => {

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

        it('should not error,allowWhiteSpace true.',
        () => {
          expect(RxwebValidators.alphaNumeric({allowWhiteSpace:true})(new FormControl('Victoria Park'))).toBeNull();
        });

        it('should error,allowWhiteSpace true.',
        () => {
          expect(RxwebValidators.alphaNumeric({allowWhiteSpace:true})(new FormControl('Victoria@ Park'))).toEqual({ 'alphaNumeric': { message: 'Only alphanumerics are allowed.', refValues: ['Victoria@ Park'] } });
        });

       it("Should not error, alphaNumeric validator Conditional Expression with type 'function'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'areaName': 'Delhi',
            'countryCode': 'AU'
          });
          expect(RxwebValidators.alphaNumeric({ conditionalExpression: (x, y) => x.areaName == "Delhi" })(formGroup.controls.countryCode)).toBeNull()
        });

      it("Should not error, alphaNumeric validator Conditional Expression with type 'function'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'areaName': 'Mumbai',
            'countryCode': '@AU'
          });
          expect(RxwebValidators.alphaNumeric({ conditionalExpression: (x, y) => x.areaName == "Delhi" })(formGroup.controls.countryCode)).toBeNull()
        });

      it("Should error, alphaNumeric validator Conditional Expression with type 'function'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'areaName': 'Delhi',
            'countryCode': '@IN'
          });
          expect(RxwebValidators.alphaNumeric({ conditionalExpression: (x, y) => x.areaName == "Delhi" })(formGroup.controls.countryCode)).toEqual({ 'alphaNumeric': { message: 'Only alphanumerics are allowed.', refValues: ['@IN'] } });
        });

      it("Should not error, alphaNumeric validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'areaName': 'Delhi',
            'cityCode': 'DI'
          });
          expect(RxwebValidators.alphaNumeric({ conditionalExpression: 'x => x.areaName == "Delhi"' })(formGroup.controls.cityCode)).toBeNull()
        });

      it("Should not error, alphaNumeric validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'areaName': 'Mumbai',
            'cityCode': '@MI'
          });
          expect(RxwebValidators.alphaNumeric({ conditionalExpression: 'x => x.areaName == "Delhi"' })(formGroup.controls.cityCode)).toBeNull()
        });

      it("Should error, alphaNumeric validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'areaName': 'Delhi',
            'cityCode': '@DI'
          });
          expect(RxwebValidators.alphaNumeric({ conditionalExpression: 'x => x.areaName == "Delhi"' })(formGroup.controls.cityCode)).toEqual({ 'alphaNumeric': { message: 'Only alphanumerics are allowed.', refValues: ['@DI'] } });
        });

      it("Should error, alphaNumeric validator Shows custom message",
        () => {
          expect(RxwebValidators.alphaNumeric({ message: 'Please enter only alphanumerics, special characters are not allowed.' })(new FormControl('16 amphi-theatre'))).toEqual({ 'alphaNumeric': { message: 'Please enter only alphanumerics, special characters are not allowed.', refValues: ['16 amphi-theatre'] } });
        });
    })
  });
});
