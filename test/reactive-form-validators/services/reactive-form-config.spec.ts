import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { ReactiveFormConfig,RxFormBuilder, RxwebValidators } from '../../../packages/reactive-form-validators';


import {  alpha, } from    '../../../packages/reactive-form-validators'; 

(function() {
    describe('Decorator', () => {
      let formBuilder = new RxFormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "alpha": "Only alphabets are allowed.",
            "dateFormat":"mdy"
          }
        });
      });

      describe('reactive-form-config', () => {
        it("should show global validation message when the input is invalid",
        () => {
    
          let formGroup = formBuilder.formGroup(
              {
                  'location':['',RxwebValidators.alpha()]
              }
          );
          formGroup.controls.location.setValue('@Victoria-123');
         expect(formGroup.controls.location.errors).toEqual({'alpha':{ message: 'Only alphabets are allowed.', refValues: [ '@Victoria-123' ] } });
     });
      })

    });
});