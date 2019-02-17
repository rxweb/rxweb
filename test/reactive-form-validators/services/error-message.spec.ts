import {AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';

import { ReactiveFormConfig,RxFormBuilder,FormBuilderConfiguration,RxFormGroup, FormGroupExtension} from '../../../packages/reactive-form-validators';


import {  error,alpha,prop,RxwebValidators,RxFormControl } from    '../../../packages/reactive-form-validators'; 
import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';

class User{
    @error({conditionalExpression:function(control:AbstractControl){return this.type == "user"; }})
    @alpha()
    userName:string;

    @error({conditionalExpression:function(control:AbstractControl){return control.dirty; }})
    @alpha()
    firstName:string;

    @prop()
    type:string;
}


(function(){
 describe('error-message',()=>{
     let formbuilder = new RxFormBuilder();
     beforeEach(() => {
         ReactiveFormConfig.set({
             "validationMessage": {
                 "alpha": "only alphabets are allowed.",
                 "password": "Please enter correct password."
             }
         });
     });
  it('should pass, errorMessage and errorMessages property value should be blank',()=>{
    let userFormGroup = formbuilder.group({
        password : ['',[RxwebValidators.alpha(),RxwebValidators.password({ validation: { maxLength: 10, minLength: 5, digit: true, specialCharacter: true } })]],
    })
      let passwordControl = <RxFormControl>userFormGroup.controls.password;
      expect(passwordControl.errorMessage).toBe(undefined);
      expect(passwordControl.errorMessages).toEqual([]);
     })

     it('should fail, errorMessage and errorMessages property value should not be blank', () => {
         let userFormGroup = formbuilder.group({
             password: ['@a', [RxwebValidators.alpha(), RxwebValidators.password({ validation: { maxLength: 10, minLength: 5, digit: true, specialCharacter: true } })]],
         })
         let passwordControl = <RxFormControl>userFormGroup.controls.password;
         expect(passwordControl.errorMessage).toBe("Please enter correct password.");
         expect(passwordControl.errorMessages).toEqual(["only alphabets are allowed.","Please enter correct password."]);
     })

     it('should not bind error in userName FormControl', () => {
         let user = new User();
         user.userName = "@User";
        let userFormGroup = formbuilder.formGroup(user);
        let control = <RxFormControl>userFormGroup.controls.userName;
        expect(control.errorMessage).toBe(undefined);
        expect(control.errorMessages).toEqual([]);
    })

    it('should bind error in userName FormControl', () => {
        let user = new User();
        user.userName = "@User";
        user.type = "user";
       let userFormGroup = formbuilder.formGroup(user);
       let control = <RxFormControl>userFormGroup.controls.userName;
       expect(control.errorMessage).toBe("only alphabets are allowed.");
       expect(control.errorMessages).toEqual(["only alphabets are allowed."]);
   })

   it('should not bind error until the FormControl is dirty', () => {
    let user = new User();
    user.firstName = "@User";
   let userFormGroup = formbuilder.formGroup(user);
   let control = <RxFormControl>userFormGroup.controls.firstName;
   expect(control.errorMessage).toBe(undefined);
   expect(control.errorMessages).toEqual([]);
})


})
})();