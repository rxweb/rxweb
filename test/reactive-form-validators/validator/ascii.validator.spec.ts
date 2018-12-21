import { AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import { RxwebValidators, ReactiveFormConfig } from '../../../packages/reactive-form-validators';



(function () {
    describe('Validator', () => {
        beforeEach(() => {
          ReactiveFormConfig.set({
            "validationMessage": {
              "ascii": "Please enter a valid ascii code",
            }
          });
    });
    describe('asciiValidator', () => {

        it('should not error on an empty string.',
          () => {
            expect(RxwebValidators.ascii()(new FormControl(''))).toBeNull();
          });
  
        it('should not error on null.',
          () => {
            expect(RxwebValidators.ascii()(new FormControl(null))).toBeNull();
          });
  
        it('should not error on undefined.',
          () => {
            expect(RxwebValidators.ascii()(new FormControl(undefined))).toBeNull();
          });
  
        it("Should not error, ascii validator Conditional Expression with type 'function'",
          () => {
            let formBuilder = new FormBuilder();
            let formGroup = formBuilder.group({
              'language': 'Java',
              'numberAsciiCode': '65'
            });
            expect(RxwebValidators.ascii({ conditionalExpression: (x, y) => x.language == "Java" })(formGroup.controls.numberAsciiCode)).toBeNull()
          });
  
        it("Should not error, ascii validator Conditional Expression with type 'function'",
          () => {
            let formBuilder = new FormBuilder();
            let formGroup = formBuilder.group({
              'language': 'C#',
              'numberAsciiCode': '中國哲學'
            });
            expect(RxwebValidators.ascii({ conditionalExpression: (x, y) => x.language == "C#" })(formGroup.controls.numberAsciiCode)).toBeNull()
          });
  
        it("Should error, ascii validator Conditional Expression with type 'function'",
          () => {
            let formBuilder = new FormBuilder();
            let formGroup = formBuilder.group({
              'language': 'Java',
              'numberAsciiCode': '中國哲學'
            });
            expect(RxwebValidators.ascii({ conditionalExpression: (x, y) => x.language == "Java" })(formGroup.controls.numberAsciiCode)).toEqual({ 'ascii': { message: 'Please enter a valid ascii code.', refValues: ['中國哲學'] } });
          });
  
        it("Should not error, ascii validator Conditional Expression with type 'string'",
          () => {
            let formBuilder = new FormBuilder();
            let formGroup = formBuilder.group({
              'language': 'Java',
              'alphabetAsciiCode': 'rx'
            });
            expect(RxwebValidators.ascii({ conditionalExpression: 'x => x.language == "Java"' })(formGroup.controls.alphabetAsciiCode)).toBeNull()
          });
  
        it("Should not error, ascii validator Conditional Expression with type 'string'",
          () => {
            let formBuilder = new FormBuilder();
            let formGroup = formBuilder.group({
              'language': 'C#',
              'alphabetAsciiCode': '中國哲學'
            });
            expect(RxwebValidators.ascii({ conditionalExpression: 'x => x.language == "C#"' })(formGroup.controls.alphabetAsciiCode)).toBeNull()
          });
  
        it("Should error, ascii validator Conditional Expression with type 'string'",
          () => {
            let formBuilder = new FormBuilder();
            let formGroup = formBuilder.group({
              'language': 'Java',
              'alphabetAsciiCode': '中國哲學'
            });
            expect(RxwebValidators.ascii({ conditionalExpression: 'x => x.language == "Java"' })(formGroup.controls.cityCode)).toEqual({ 'ascii': { message: 'Please enter a valid ascii code.', refValues: ['中國哲學'] } });
          });
  
        it("Should error, ascii validator Shows custom message",
          () => {
            expect(RxwebValidators.ascii({ message: '{{0}} is not an Ascii Code' })(new FormControl('中国哲学书电子化计划'))).toEqual({ 'ascii': { message: '中国哲学书电子化计划 is not valid ascii code', refValues: ['中国哲学书电子化计划'] } });
          });
      });

  });
});

