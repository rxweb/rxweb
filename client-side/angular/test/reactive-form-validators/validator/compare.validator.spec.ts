import {FormBuilder} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '@rxweb/reactive-form-validators';



  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "compare": "Both field are not matched",
        }
      });
    });

    describe('compareValidator', () => {

	
      it("Should error,  compare validator ",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'password':['User@123'],
            'confirmPassword':'user@123'
          });
          expect(RxwebValidators.compare({fieldName:'password',message:'You must enter same password'})(formGroup.controls.confirmPassword)).toEqual({'compare':{ message: 'You must enter same password', refValues: [ 'user@123','User@123' ] } }); 
        });




	//end
    });
  });
