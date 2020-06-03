import {FormBuilder} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';



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
            "not":"not condition failed."
        }
    });
    });

    describe('notValidator', () => {
      
  
      it('should not error in licenseDate property.',
      () => {
        let formBuilder = new FormBuilder();
        let formGroup = formBuilder.group({
          'dob': "09/02/2019",
          'licenseDate': "10/02/2019"
        });
        expect(RxwebValidators.not({validation:{minDate:{fieldName:'dob',operator:">="},contains:{value:"-"}}})(formGroup.controls.licenseDate)).toEqual({'not':{ message: 'not condition failed.', refValues: [ "10/02/2019" ] } });
      });

     

      it('should error in licenseDate property.',
      () => {
        let formBuilder = new FormBuilder();
        let formGroup = formBuilder.group({
          'dob': "09/02/2019",
          'licenseDate': "08/02/2019"
        });
        expect(RxwebValidators.not({validation:{minDate:{fieldName:'dob',operator:">="},contains:{value:"-"}}})(formGroup.controls.licenseDate)).toBeNull();
      });

	//end
    });
  });
