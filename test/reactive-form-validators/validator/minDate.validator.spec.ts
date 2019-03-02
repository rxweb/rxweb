import { AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import { RxwebValidators, ReactiveFormConfig } from '../../../packages/reactive-form-validators';

(function () {
  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "minDate": "Minimum Date is not matched",
        }
      });
    });

    describe('minDateValidator', () => {

      it('should not error on an empty string.',
        () => {
          expect(RxwebValidators.minDate()(new FormControl(''))).toBeNull();
        });

      it('should not error on null.',
        () => {
          expect(RxwebValidators.minDate()(new FormControl(null))).toBeNull();
        });

      it('should not error on undefined.',
        () => {
          expect(RxwebValidators.minDate()(new FormControl(undefined))).toBeNull();
        });

        it("Should not error, minDate validator If you enter a date value which is less than a mentioned minimum date",
        () => { 
          expect(RxwebValidators.minDate({value:'07/30/2018'})(new FormControl('08/31/2018'))).toBeNull(); 
        });
      
        it("Should error, minDate validator If you enter a date value which is greater than a mentioned minimum date",
        () => { 
          expect(RxwebValidators.minDate({value:'07/30/2018'})(new FormControl('06/31/2018'))).toEqual({'minDate':{ message: 'Minimum Date is not matched', refValues: [ '06/31/2018' ] } }); 
        });
  
        it("Should not error, minDate validator Conditional Expression with type 'function'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name': 'Bharat',
            'birthDate': '09/31/2018'
          });
          expect(RxwebValidators.minDate({ value:'07/30/2018',conditionalExpression: (x, y) => x.name == "Bharat" })(formGroup.controls.birthDate)).toBeNull()
        });

        it("Should not error, minDate validator Conditional Expression with type 'function'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name': 'Mahesh',
            'birthDate': '05/31/2018'
          });
          expect(RxwebValidators.minDate({ value:'07/30/2018', conditionalExpression: (x, y) => x.name == "Bharat" })(formGroup.controls.birthDate)).toBeNull()
        });

        it("Should error, minDate validator Conditional Expression with type 'function'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name': 'Bharat',
            'birthDate': '06/31/2018'
          });
          expect(RxwebValidators.minDate({ value:'07/30/2018', conditionalExpression: (x, y) => x.name == "Bharat" })(formGroup.controls.birthDate)).toEqual({ 'minDate': { message: 'Minimum Date is not matched', refValues: ['06/31/2018'] } }); 
        });

        it("Should not error, minDate validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name': 'Bharat',
            'admissionDate': '09/20/2018'
          });
          expect(RxwebValidators.minDate({ value:'07/30/2018',conditionalExpression: 'x => x.name == "Bharat"' })(formGroup.controls.admissionDate)).toBeNull()
        });

        it("Should not error, minDate validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name': 'Mahesh',
            'admissionDate': '04/31/2018'
          });
          expect(RxwebValidators.minDate({ value:'07/30/2018', conditionalExpression: 'x => x.name == "Bharat"' })(formGroup.controls.admissionDate)).toBeNull()
        });

        it("Should error, minDate validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name': 'Bharat',
            'admissionDate': '04/21/2018'
          });
          expect(RxwebValidators.minDate({ value:'07/30/2018', conditionalExpression: 'x => x.name == "Bharat"' })(formGroup.controls.admissionDate)).toEqual({ 'minDate': { message: 'Minimum Date is not matched', refValues: ['04/21/2018'] } }); 
        });

        it("Should error, minDate validator Shows custom message",
        () => {
          expect(RxwebValidators.minDate({ value:'07/30/2018', message: '{{0}} exceeds the minimum Date Limit' })(new FormControl('06/30/2018'))).toEqual({ 'minDate': { message: '06/30/2018 exceeds the minimum Date Limit', refValues: ['06/30/2018'] } });
        });

        it("Should not error, minDate validator based on the value of a perticular field",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'enrollmentDate': '08/31/2018',
            'lastRegistrationDate': '11/31/2018'
          });
          expect(RxwebValidators.minDate({ fieldName:'enrollmentDate' })(formGroup.controls.lastRegistrationDate)).toBeNull()
        });

        it("Should error, minDate validator based on the value of a perticular field",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'enrollmentDate': '08/31/2018',
            'lastRegistrationDate': '05/31/2018'
          });
          expect(RxwebValidators.minDate({ fieldName:'enrollmentDate' })(formGroup.controls.lastRegistrationDate)).toEqual({ 'minDate': { message: 'Minimum Date is not matched', refValues: ['05/31/2018'] } }); 
        });

        
        it("Should error, lastRegistrationDate should be greaterThan enrollmentDate",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'enrollmentDate': '08/31/2018',
            'lastRegistrationDate': '08/31/2018'
          });
          expect(RxwebValidators.minDate({ fieldName:'enrollmentDate',operator:">" })(formGroup.controls.lastRegistrationDate)).toEqual({ 'minDate': { message: 'Minimum Date is not matched', refValues: ['08/31/2018'] } }); 
        });

        it("Should not error, lastRegistrationDate should be greaterThanEqualTo enrollmentDate",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'enrollmentDate': '08/31/2018',
            'lastRegistrationDate': '08/31/2018'
          });
          expect(RxwebValidators.minDate({ fieldName:'enrollmentDate' })(formGroup.controls.lastRegistrationDate)).toBeNull(); 
        });


      //end
    });

  });
  })();
