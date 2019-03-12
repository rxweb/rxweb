import {AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';

import { ReactiveFormConfig,RxFormBuilder,FormBuilderConfiguration,RxFormGroup, FormGroupExtension} from '../../../packages/reactive-form-validators';


import {  prop,RxwebValidators,minNumber } from    '../../../packages/reactive-form-validators'; 


class User {
    @minNumber({
        
        dynamicConfig: (x, y) => {
            if (x.age > 18)
                return { value: 2500 };
            else
                return { value: 3500 };
        }
    })
    amount: any[];

    @prop()
    age: string;
}


(function(){
 describe('dynamic-config',()=>{
     let formbuilder = new RxFormBuilder();
     beforeEach(() => {
         ReactiveFormConfig.set({
             "validationMessage": {
                 "minNumber": "Number should less than equal to minimum number.",
             }
         });
     });
  
    it('should pass, when the age control value is above 18 and amount is 2600',()=>{
    let userFormGroup = formbuilder.formGroup(User)
      userFormGroup.controls.age.setValue(19);
      userFormGroup.controls.amount.setValue(2600);
      expect(userFormGroup.controls.amount.errors).toBeNull();
    })

    it('should error, when the age control value is below 17 and amount is 2600',()=>{
        let userFormGroup = formbuilder.formGroup(User)
        userFormGroup.controls.age.setValue(17);
          userFormGroup.controls.amount.setValue(2600);
          expect(userFormGroup.controls.amount.errors).toEqual({'minNumber':{ message: 'Number should less than equal to minimum number.', refValues: [ 2600,3500 ] } }); 
         })



})
})();