import { AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import { RxwebValidators, ReactiveFormConfig } from '@rxweb/reactive-form-validators';


(function () {

   
  describe('reactive-form-based-validation', () => {

      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "alpha": "Only alphabets are allowed.",
          }
        });
    });

    it('should not error on an empty string.',
      () => {
        expect(RxwebValidators.alpha()(new FormControl(''))).toBeNull();
      });

    it('should not error on null.',
      () => {
        expect(RxwebValidators.alpha()(new FormControl(null))).toBeNull();
      });

    it('should not error on undefined.',
      () => {
        expect(RxwebValidators.alpha()(new FormControl(undefined))).toBeNull();
      });

    it('should not error in firstName property with alphabet value.',
      () => {
        expect(RxwebValidators.alpha()(new FormControl('Bharat'))).toBeNull();
      });

    it('should error in firstName property with non alphabet value.',
      () => {
        expect(RxwebValidators.alpha()(new FormControl('Bharat@'))).toEqual({ 'alpha': { message: 'Only alphabets are allowed.', refValues: ['Bharat@'] } });
      });

    it('should not error in lastName property with alphabet value.',
      () => {
        expect(RxwebValidators.alpha()(new FormControl('Shah'))).toBeNull();
      });

    it('should error in lastName property with non alphabet value.',
      () => {
        expect(RxwebValidators.alpha()(new FormControl('Shah@'))).toEqual({ 'alpha': { message: 'Only alphabets are allowed.', refValues: ['Shah@'] } });
      });
      
    })

})();
