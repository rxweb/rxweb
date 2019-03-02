import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';



(function() {
  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "baseConfig":{
          "dateFormat": "mdy",
           "seperator": "/"
        },
        "internationalization": {
            "dateFormat": "mdy",
            "seperator": "/"
        },
        "validationMessage": {
            "contains": "you should contains.",
            "minDate":"minimum date.",
            "and":"and condition failed."
        }
    });
    });

    describe('andValidator', () => {
      
  
      it('should not error in licenseDate property.',
      () => {
        let formBuilder = new FormBuilder();
        let formGroup = formBuilder.group({
          'dob': "09/02/2019",
          'licenseDate': "10/02/2019"
        });
        expect(RxwebValidators.and({validation:{minDate:{fieldName:'dob',operator:">="},contains:{value:"/"}}})(formGroup.controls.licenseDate)).toBeNull()
      });

      it('should error in licenseDate property.',
      () => {
        let formBuilder = new FormBuilder();
        let formGroup = formBuilder.group({
          'dob': "09/02/2019",
          'licenseDate': "10-02-2019"
        });
        expect(RxwebValidators.and({validation:{minDate:{fieldName:'dob',operator:">="},contains:{value:"/"}}})(formGroup.controls.licenseDate)).toEqual({'and':{ message: 'and condition failed.', refValues: [ "10-02-2019" ] } });
      });

	//end
    });
  });
})();
