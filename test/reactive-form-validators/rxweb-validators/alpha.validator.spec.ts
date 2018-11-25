import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
            "validationMessage": {
                "alpha": "only accepts alphabets.",
            }
        });
   });

    describe('alpha', () => {
      it('should not error on an empty string.',
         () => { expect(RxwebValidators.alpha()(new FormControl(''))).toBeNull();
     });

      it('should not error on any value in alphabets.',
         () => { expect(RxwebValidators.alpha()(new FormControl('India'))).toBeNull(); });

      it('should not allow other than alphabets.',
         () => { expect(RxwebValidators.alpha()(new FormControl('India@'))).toEqual({'alpha':{ message: 'only accepts alphabets.', refValues: [ 'India@' ] } }); });

      it('should not error on null.',
         () => { expect(RxwebValidators.alpha()(new FormControl(null))).toBeNull(); });

      it('should not error on undefined.',
         () => { expect(RxwebValidators.alpha()(new FormControl(undefined))).toBeNull(); });

      it('should allowWhitespace.',
         () => { expect(RxwebValidators.alpha({allowWhiteSpace:true})(new FormControl("New Delhi"))).toBeNull(); });

      it('should not allowWhitespace.',
         () => { expect(RxwebValidators.alpha()(new FormControl("New Delhi"))).toEqual({'alpha':{ message: 'only accepts alphabets.', refValues: [ 'New Delhi' ] } })});

      it('show custom error message only.',
         () => { expect(RxwebValidators.alpha({message:'Only accepts alphabets without space.'})(new FormControl("New Delhi"))).toEqual({'alpha':{ message: 'Only accepts alphabets without space.', refValues: [ 'New Delhi' ] } })});

      it('should not error on empty config object.',
         () => { expect(RxwebValidators.alpha({})(new FormControl("India"))).toBeNull()});

      it('should not error if country is India in countryName FormControl and alphabets in stateName FormControl.',
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'countryName':['India'],
            'stateName':'Gujarat'
          });
          expect(RxwebValidators.alpha({conditionalExpression:(x,y)=> x.countryName == 'India' })(formGroup.controls.stateName)).toBeNull()
        });

      it('should give error if country is India in countryName FormControl and non alphabets characters are in stateName FormControl.',
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'countryName':['India'],
            'stateName':'Gujarat@'
          });
          expect(RxwebValidators.alpha({conditionalExpression:(x,y)=> x.countryName == 'India' })(formGroup.controls.stateName)).toEqual({'alpha':{ message: 'only accepts alphabets.', refValues: [ 'Gujarat@' ] } })
        });

    });
  });
})();
