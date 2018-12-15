import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';



(function() {
  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "different": "Do not enter same inputs.",
        }
      });
    });

    describe('differentValidator', () => {

	      it("Should not error, different validator Last Name and First Name must be different",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'firstName':['Mukesh'],
            'lastName':'Bharat'
          });
          expect(RxwebValidators.different({fieldName:'firstName'})(formGroup.controls.lastName)).toBeNull()
        });


      it("Should error,  different validator Last Name and First Name must be different",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'firstName':['Shah'],
            'lastName':'Shah'
          });
          expect(RxwebValidators.different({fieldName:'firstName'})(formGroup.controls.lastName)).toEqual({'different':{ message: 'Do not enter same inputs.', refValues: [ 'Shah','Shah' ] } }); 
        });



      it("Should error,  different validator Shows custom message.",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'firstName':['Mukesh'],
            'middleName':'Mukesh'
          });
          expect(RxwebValidators.different({fieldName:'firstName',message:'{{0}} is same as firstName'})(formGroup.controls.middleName)).toEqual({'different':{ message: 'Mukesh is same as firstName', refValues: [ 'Mukesh','Mukesh' ] } }); 
        });




	//end
    });
  });
})();
