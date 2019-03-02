import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';



(function() {
  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "cusip": "Only accepts cusip's.",
        }
      });
    });

    describe('cusipValidator', () => {

	      it('should not error on an empty string.',
        () => { 
          expect(RxwebValidators.cusip()(new FormControl(''))).toBeNull();
        });
	
      it('should not error on null.',
        () => { 
          expect(RxwebValidators.cusip()(new FormControl(null))).toBeNull();
        });
	
      it('should not error on undefined.',
        () => { 
          expect(RxwebValidators.cusip()(new FormControl(undefined))).toBeNull(); 
        });

it('should not error on undefined.',
        () => { 
          expect(RxwebValidators.cusip()(new FormControl("037833100"))).toBeNull(); 
        });

	//end
    });
  });
})();
