import {FormBuilder} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';


  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "json": "Invalid json format",
        }
      });
    });
    describe('jsonValidator', () => {

        it("Should not error, json validator.",
       () => {
        let formBuilder = new FormBuilder();
        let formGroup = formBuilder.group({
            location:['',RxwebValidators.json()]
        })
        formGroup.controls.location.setValue("{'Country':'India'}");
        expect(formGroup.controls.location.errors).toBeNull();
    });


   });
  })
