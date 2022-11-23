import {FormControl} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';



  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "grid": "Only accepts grid number.",
        }
      });
    });

    describe('gridValidator', () => {

	      it('should not error on an empty string.',
        () => { 
          expect(RxwebValidators.grid()(new FormControl(''))).toBeNull();
        });
	
      it('should not error on null.',
        () => { 
          expect(RxwebValidators.grid()(new FormControl(null))).toBeNull();
        });
	
      it('should not error on undefined.',
        () => { 
          expect(RxwebValidators.grid()(new FormControl(undefined))).toBeNull(); 
        });

it('should not error on valid value.',
        () => { 
            expect(RxwebValidators.grid()(new FormControl("A12425GABC1234002M"))).toBeNull(); 
        });

	//end
    });
  });
