import { AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import { RxwebValidators, ReactiveFormConfig,NumericValueType } from '../../../packages/reactive-form-validators';

(function () {
  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "numeric": "Enter a valid numeric digit.",
        }
      });
    });

    describe('numericValidator', () => {

        it('should not error on an empty string.',
          () => {
            expect(RxwebValidators.numeric()(new FormControl(''))).toBeNull();
          });
  
        it('should not error on null.',
          () => {
            expect(RxwebValidators.numeric()(new FormControl(null))).toBeNull();
          });
  
        it('should not error on undefined.',
          () => {
            expect(RxwebValidators.numeric()(new FormControl(undefined))).toBeNull();
          });
          
          it("Should not error, numeric validator If you enter a valid negative number",
          () => { 
            expect(RxwebValidators.numeric({acceptValue:NumericValueType.NegativeNumber})(new FormControl(-12))).toBeNull(); 
          });
        
          it("Should error, numeric validator If you do not enter a valid negative number",
          () => { 
            expect(RxwebValidators.numeric({acceptValue:NumericValueType.NegativeNumber})(new FormControl(12))).toEqual({'numeric':{ message: 'Enter a valid numeric digit.', refValues: [ 12 ] } }); 
          });

          it("Should not error, numeric validator If you enter a valid decimal number",
          () => { 
            expect(RxwebValidators.numeric({allowDecimal:true})(new FormControl(12.1))).toBeNull(); 
          });
        
          it("Should not error, numeric validator Conditional Expression with type 'function'",
          () => {
            let formBuilder = new FormBuilder();
            let formGroup = formBuilder.group({
              'dataType': 'Integer',
              'integerNumber': 15
            });
            expect(RxwebValidators.numeric({ acceptValue:NumericValueType.PositiveNumber,conditionalExpression: (x, y) => x.dataType == "Integer" })(formGroup.controls.integerNumber)).toBeNull()
          });
  
          it("Should not error, numeric validator Conditional Expression with type 'function'",
          () => {
            let formBuilder = new FormBuilder();
            let formGroup = formBuilder.group({
              'dataType': 'Real',
              'integerNumber': -14
            });
            expect(RxwebValidators.numeric({ acceptValue:NumericValueType.PositiveNumber,conditionalExpression: (x, y) => x.dataType == "Integer" })(formGroup.controls.integerNumber)).toBeNull()
          });
  
          it("Should error, numeric validator Conditional Expression with type 'function'",
          () => {
            let formBuilder = new FormBuilder();
            let formGroup = formBuilder.group({
              'dataType': 'Integer',
              'integerNumber': -15
            });
            expect(RxwebValidators.numeric({ acceptValue:NumericValueType.PositiveNumber,conditionalExpression: (x, y) => x.dataType == "Integer" })(formGroup.controls.integerNumber)).toEqual({ 'numeric': { message: 'Enter a valid numeric digit.', refValues: [-15] } }); 
          });
  
          it("Should not error, numeric validator Conditional Expression with type 'string'",
          () => {
            let formBuilder = new FormBuilder();
            let formGroup = formBuilder.group({
              'dataType': 'Real',
              'realNumber': -15
            });
            expect(RxwebValidators.numeric({ acceptValue:NumericValueType.Both,conditionalExpression: 'x => x.dataType == "Real"' })(formGroup.controls.realNumber)).toBeNull()
          });
  
          it("Should not error, numeric validator Conditional Expression with type 'string'",
          () => {
            let formBuilder = new FormBuilder();
            let formGroup = formBuilder.group({
              'dataType': 'Integer',
              'realNumber': -12.5
            });
            expect(RxwebValidators.numeric({ acceptValue:NumericValueType.Both,conditionalExpression: 'x => x.dataType == "Real"' })(formGroup.controls.realNumber)).toBeNull()
          });
  
          it("Should error, numeric validator Conditional Expression with type 'string'",
          () => {
            let formBuilder = new FormBuilder();
            let formGroup = formBuilder.group({
              'dataType': 'Real',
              'realNumber': 17.8
            });
            expect(RxwebValidators.numeric({ acceptValue:NumericValueType.Both,conditionalExpression: 'x => x.dataType == "Real"' })(formGroup.controls.realNumber)).toEqual({ 'numeric': { message: 'Enter a valid numeric digit.', refValues: [17.8] } }); 
          });

          it("Should error, numeric validator Shows custom message",
          () => {
            expect(RxwebValidators.numeric({ message: '{{0}} is not a positive number' })(new FormControl(-2))).toEqual({ 'numeric': { message: '-2 is not a positive number', refValues: [-2] } });
          });             

        });
    });
    })();