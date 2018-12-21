import { AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import { RxwebValidators, ReactiveFormConfig } from '../../../packages/reactive-form-validators';

(function () {
  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "minNumber": "Number should less than equal to minimum number.",
        }
      });
    });

    describe('minNumberValidator', () => {

      it('should not error on an empty string.',
        () => {
          expect(RxwebValidators.minNumber()(new FormControl(''))).toBeNull();
        });

      it('should not error on null.',
        () => {
          expect(RxwebValidators.minNumber()(new FormControl(null))).toBeNull();
        });

      it('should not error on undefined.',
        () => {
          expect(RxwebValidators.minNumber()(new FormControl(undefined))).toBeNull();
        });

        it("Should not error, minNumber validator If you enter a value which is greater than a mentioned minimum number",
        () => { 
          expect(RxwebValidators.minNumber({value:35})(new FormControl(45))).toBeNull(); 
        });
      
        it("Should error, minNumber validator If you enter a value which is less than a mentioned minimum number",
        () => { 
          expect(RxwebValidators.minNumber({value:35})(new FormControl(25))).toEqual({'minNumber':{ message: 'Number should less than equal to minimum number.', refValues: [ 25,35 ] } }); 
        });

        it("Should not error, minNumber validator Conditional Expression with type 'function'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'maths': 50,
            'english': 90
          });
          expect(RxwebValidators.minNumber({ value:35,conditionalExpression: (x, y) => x.maths == 50 })(formGroup.controls.english)).toBeNull()
        });

        it("Should not error, minNumber validator Conditional Expression with type 'function'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'maths': 60,
            'english': 10
          });
          expect(RxwebValidators.minNumber({ value:35,conditionalExpression: (x, y) => x.maths == 50 })(formGroup.controls.english)).toBeNull()
        });

        it("Should error, minNumber validator Conditional Expression with type 'function'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'maths': 50,
            'english': 10
          });
          expect(RxwebValidators.minNumber({ value:35,conditionalExpression: (x, y) => x.maths == 50 })(formGroup.controls.english)).toEqual({ 'minNumber': { message: 'Number should less than equal to minimum number.', refValues: [10,35] } }); 
        });

        it("Should not error, minNumber validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'maths': 50,
            'statstics': 90
          });
          expect(RxwebValidators.minNumber({ value:35,conditionalExpression: 'x => x.maths == 50' })(formGroup.controls.statstics)).toBeNull()
        });

        it("Should not error, minNumber validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'maths': 60,
            'statstics': 10
          });
          expect(RxwebValidators.minNumber({ value:35,conditionalExpression: 'x => x.maths == 50' })(formGroup.controls.statstics)).toBeNull()
        });

        it("Should error, minNumber validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'maths': 50,
            'statstics': 10
          });
          expect(RxwebValidators.minNumber({ value:35,conditionalExpression: 'x => x.maths == 50' })(formGroup.controls.statstics)).toEqual({ 'minNumber': { message: 'Number should less than equal to minimum number.', refValues: [10,35] } }); 
        });

        it("Should error, minNumber validator Shows custom message",
        () => {
          expect(RxwebValidators.minNumber({ value:35, message: 'Number should not be less than 35' })(new FormControl(20))).toEqual({ 'minNumber': { message: 'Number should not be less than 35', refValues: [20,35] } });
        });
      //end
    });

});
})();
