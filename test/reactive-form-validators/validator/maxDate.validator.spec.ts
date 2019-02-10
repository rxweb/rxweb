import { AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import { RxwebValidators, ReactiveFormConfig } from '../../../packages/reactive-form-validators';

(function () {
  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "maxDate": "Maximum Date is not matched",
        }
      });
    });

    describe('maxDateValidator', () => {

      it('should not error on an empty string.',
        () => {
          expect(RxwebValidators.maxDate()(new FormControl(''))).toBeNull();
        });

      it('should not error on null.',
        () => {
          expect(RxwebValidators.maxDate()(new FormControl(null))).toBeNull();
        });

      it('should not error on undefined.',
        () => {
          expect(RxwebValidators.maxDate()(new FormControl(undefined))).toBeNull();
        });

        it("Should not error, maxDate validator If you enter a date value which is less than a mentioned maximum date",
        () => { 
          expect(RxwebValidators.maxDate({value:'07/30/2018'})(new FormControl('06/31/2018'))).toBeNull(); 
        });
      
        it("Should error, maxDate validator If you enter a date value which is greater than a mentioned maximum date",
        () => { 
          expect(RxwebValidators.maxDate({value:'07/30/2018'})(new FormControl('08/31/2018'))).toEqual({'maxDate':{ message: 'Maximum Date is not matched', refValues: [ '08/31/2018' ] } }); 
        });
  
        it("Should not error, maxDate validator Conditional Expression with type 'function'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name': 'Bharat',
            'birthDate': '05/31/2018'
          });
          expect(RxwebValidators.maxDate({ value:'07/30/2018',conditionalExpression: (x, y) => x.name == "Bharat" })(formGroup.controls.birthDate)).toBeNull()
        });

        it("Should not error, maxDate validator Conditional Expression with type 'function'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name': 'Mahesh',
            'birthDate': '08/31/2018'
          });
          expect(RxwebValidators.maxDate({ value:'07/30/2018', conditionalExpression: (x, y) => x.name == "Bharat" })(formGroup.controls.birthDate)).toBeNull()
        });

        it("Should error, maxDate validator Conditional Expression with type 'function'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name': 'Bharat',
            'birthDate': '08/31/2018'
          });
          expect(RxwebValidators.maxDate({ value:'07/30/2018', conditionalExpression: (x, y) => x.name == "Bharat" })(formGroup.controls.birthDate)).toEqual({ 'maxDate': { message: 'Maximum Date is not matched', refValues: ['08/31/2018'] } }); 
        });

        it("Should not error, maxDate validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name': 'Bharat',
            'admissionDate': '05/31/2018'
          });
          expect(RxwebValidators.maxDate({ value:'07/30/2018',conditionalExpression: 'x => x.name == "Bharat"' })(formGroup.controls.admissionDate)).toBeNull()
        });

        it("Should not error, maxDate validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name': 'Mahesh',
            'admissionDate': '08/31/2018'
          });
          expect(RxwebValidators.maxDate({ value:'07/30/2018', conditionalExpression: 'x => x.name == "Bharat"' })(formGroup.controls.admissionDate)).toBeNull()
        });

        it("Should error, maxDate validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name': 'Bharat',
            'admissionDate': '08/31/2018'
          });
          expect(RxwebValidators.maxDate({ value:'07/30/2018', conditionalExpression: 'x => x.name == "Bharat"' })(formGroup.controls.admissionDate)).toEqual({ 'maxDate': { message: 'Maximum Date is not matched', refValues: ['08/31/2018'] } }); 
        });

        it("Should error, maxDate validator Shows custom message",
        () => {
          expect(RxwebValidators.maxDate({ value:'07/30/2018', message: '{{0}} exceeds the Maximum Date Limit' })(new FormControl('09/30/2018'))).toEqual({ 'maxDate': { message: '09/30/2018 exceeds the Maximum Date Limit', refValues: ['09/30/2018'] } });
        });

        it("Should not error, maxDate validator based on the value of a perticular field",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'enrollmentDate': '08/31/2018',
            'lastRegistrationDate': '07/31/2018'
          });
          expect(RxwebValidators.maxDate({ fieldName:'enrollmentDate' })(formGroup.controls.lastRegistrationDate)).toBeNull()
        });

        it("Should error, maxDate validator based on the value of a perticular field",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'enrollmentDate': '08/31/2018',
            'lastRegistrationDate': '11/31/2018'
          });
          expect(RxwebValidators.maxDate({ fieldName:'enrollmentDate' })(formGroup.controls.lastRegistrationDate)).toEqual({ 'maxDate': { message: 'Maximum Date is not matched', refValues: ['11/31/2018'] } }); 
        });

        it("Should error, enrollmentDate should be lessThan lastRegistrationDate",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'enrollmentDate': '08/31/2018',
            'lastRegistrationDate': '08/31/2018'
          });
          expect(RxwebValidators.maxDate({ fieldName:'enrollmentDate',operator:"<" })(formGroup.controls.lastRegistrationDate)).toEqual({ 'maxDate': { message: 'Maximum Date is not matched', refValues: ['08/31/2018'] } }); 
        });

        it("Should not error, enrollmentDate should be lessThanEqualTo lastRegistrationDate",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'enrollmentDate': '08/31/2018',
            'lastRegistrationDate': '08/31/2018'
          });
          expect(RxwebValidators.maxDate({ fieldName:'enrollmentDate' })(formGroup.controls.lastRegistrationDate)).toBeNull(); 
        });

      //end
    });

  });
  })();
