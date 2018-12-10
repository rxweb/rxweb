import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "password": "Invalid Password",
        }
      });
    });

    describe('password', () => {

	      it('should not give error, if the control contains the value according to the validation pattern mentioned.',
        () => {
          expect(RxwebValidators.password({validation:{maxLength: 10,minLength: 5,digit: true,specialCharacter: true}})(new FormControl('Admin@1'))).toBeNull();

        });


	      it('should give error, if the control does not contain the value according to the validation pattern mentioned.',
        () => {
          expect(RxwebValidators.password({validation:{maxLength: 10,minLength: 5,digit: true,specialCharacter: true}})(new FormControl('Admin'))).toEqual({'password':{ message: 'Invalid Password', refValues: [ 'Admin' ] } });

        });




	      it('should give error, if the control does not contain the value according to the validation pattern mentioned.',
        () => {
          expect(RxwebValidators.password({message:'Password is not valid',validation:{maxLength: 10,minLength: 5,digit: true,specialCharacter: true}})(new FormControl('User123'))).toEqual({'password':{ message: 'Password is not valid', refValues: [ 'User123' ] } });

        });



//end
    });
  });
})();
