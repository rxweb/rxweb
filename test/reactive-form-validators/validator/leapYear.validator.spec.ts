import { AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import { RxwebValidators, ReactiveFormConfig } from '../../../packages/reactive-form-validators';

(function () {
  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "leapYear": "Please enter a valid leap year",
        }
      });
    });

    describe('leapYearValidator', () => {

      it('should not error on an empty string.',
        () => {
          expect(RxwebValidators.leapYear()(new FormControl(''))).toBeNull();
        });

      it('should not error on null.',
        () => {
          expect(RxwebValidators.leapYear()(new FormControl(null))).toBeNull();
        });

      it('should not error on undefined.',
        () => {
          expect(RxwebValidators.leapYear()(new FormControl(undefined))).toBeNull();
        });

      it("Should not error, leapYear validator Conditional Expression with type 'function'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name': 'Bharat',
            'birthYear': '1996'
          });
          expect(RxwebValidators.leapYear({ conditionalExpression: (x, y) => x.name == "Bharat" })(formGroup.controls.birthYear)).toBeNull()
        });

      it("Should not error, leapYear validator Conditional Expression with type 'function'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name': 'Mahesh',
            'birthYear': '1997'
          });
          expect(RxwebValidators.leapYear({ conditionalExpression: (x, y) => x.name == "Bharat" })(formGroup.controls.birthYear)).toBeNull()
        });

      it("Should error, leapYear validator Conditional Expression with type 'function'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name': 'Bharat',
            'birthYear': '1997'
          });
          expect(RxwebValidators.leapYear({ conditionalExpression: (x, y) => x.name == "Bharat" })(formGroup.controls.birthYear)).toEqual({ 'leapYear': { message: 'Please enter a valid leap year', refValues: ['1997'] } }); 
        });

      it("Should not error, leapYear validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name': 'Bharat',
            'admissionYear': '2000'
          });
          expect(RxwebValidators.leapYear({ conditionalExpression: 'x => x.name == "Bharat"' })(formGroup.controls.admissionYear)).toBeNull()
        });

      it("Should not error, leapYear validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name': 'Mahesh',
            'admissionYear': '2001'
          });
          expect(RxwebValidators.leapYear({ conditionalExpression: 'x => x.name == "Bharat"' })(formGroup.controls.admissionYear)).toBeNull()
        });

      it("Should error, leapYear validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name': 'Bharat',
            'admissionYear': '2001'
          });
          expect(RxwebValidators.leapYear({ conditionalExpression: 'x => x.name == "Bharat"' })(formGroup.controls.admissionYear)).toEqual({ 'leapYear': { message: 'Please enter a valid leap year', refValues: ['2001'] } }); 
        });

      it("Should error, leapYear validator Shows custom message",
        () => {
          expect(RxwebValidators.leapYear({ message: '{{0}} is not a leap year' })(new FormControl('2015'))).toEqual({ 'leapYear': { message: '2015 is not a leap year', refValues: ['2015'] } });
        });

      //end
    });

  });
  })();
