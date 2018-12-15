import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';



(function() {
  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "password": "Invalid Password",
        }
      });
    });

    describe('passwordValidator', () => {

	      it("Should not error, password validator ",
        () => { 
          expect(RxwebValidators.password({validation:{maxLength: 10,minLength: 5,digit: true,specialCharacter: true}})(new FormControl('Admin@123'))).toBeNull(); 
        });


      it("Should error, password validator ",
        () => { 
          expect(RxwebValidators.password({validation:{maxLength: 10,minLength: 5,digit: true,specialCharacter: true}})(new FormControl('Admin123'))).toEqual({'password':{ message: 'Invalid Password', refValues: [ 'Admin123' ] } }); 
        });



      it("Should error, password validator Shows Custom Validation Message",
        () => { 
          expect(RxwebValidators.password({validation:{maxLength: 10,minLength: 5,digit: true,specialCharacter: true},message:'Password is not valid'})(new FormControl('Admin123'))).toEqual({'password':{ message: 'Password is not valid', refValues: [ 'Admin123' ] } }); 
        });




	//end
    });
  });
})();
