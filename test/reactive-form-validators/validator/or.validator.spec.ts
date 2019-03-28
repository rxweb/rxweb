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
            "or":"or condition failed."
        }
    });
    });

    describe('orValidator', () => {
      
  
      it('should not error in licenseDate property.',
      () => {
        let formBuilder = new FormBuilder();
        let formGroup = formBuilder.group({
          'dob': "09/02/2019",
          'licenseDate': "10/02/2019"
        });
        expect(RxwebValidators.or({validation:{minDate:{fieldName:'dob',operator:">="},contains:{value:"-"}}})(formGroup.controls.licenseDate)).toBeNull()
      });

      it('should not error in licenseDate property, contains validation fails.',
      () => {
        let formBuilder = new FormBuilder();
        let formGroup = formBuilder.group({
          'dob': "09/02/2019",
          'licenseDate': "10-02-2019"
        });
        expect(RxwebValidators.or({validation:{minDate:{fieldName:'dob',operator:">="},contains:{value:"-"}}})(formGroup.controls.licenseDate)).toBeNull()
      });

      it('should error in licenseDate property.',
      () => {
        let formBuilder = new FormBuilder();
        let formGroup = formBuilder.group({
          'dob': "09/02/2019",
          'licenseDate': "08/02/2019"
        });
        expect(RxwebValidators.or({validation:{minDate:{fieldName:'dob',operator:">="},contains:{value:"-"}}})(formGroup.controls.licenseDate)).toEqual({'or':{ message: 'or condition failed.', refValues: [ "08/02/2019" ] } });
      });

	//end
    });
  });
