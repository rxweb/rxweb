import {AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';

import { ReactiveFormConfig,RxFormBuilder,FormBuilderConfiguration,RxFormGroup, FormGroupExtension} from '../../../packages/reactive-form-validators';


import {  prop,propObject,required,propArray,RxwebValidators } from    '../../../packages/reactive-form-validators'; 
import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';

(function(){
 describe('dirty_check',()=>{
     let formbuilder = new RxFormBuilder();
  it('should not error,dirty check using RxFormGroup',()=>{
    let userFormGroup = formbuilder.group({
        firstName : [''],
        lastName : ['']
    })
    let isDirty = (<FormGroupExtension>userFormGroup).isDirty()
    expect(userFormGroup.controls.firstName.value).toBe('');
    expect(userFormGroup.controls.lastName.value).toBe('');
    expect(isDirty).toBe(false);
})
  it('should error,dirty check' ,()=>{
    let userFormGroup = formbuilder.group({
        firstName : [''],
        lastName : ['']
    })    
    userFormGroup.controls.firstName.setValue('Bharat');
    userFormGroup.controls.lastName.setValue('Patel');  
    let isDirty = (<FormGroupExtension>userFormGroup).isDirty()
    
    expect(isDirty).toBe(true);
  })
 
 it('should not error,dirty check for nested formgroup',()=>{
    let userFormGroup = formbuilder.group({
        firstName : [''],
        lastName : [''],
     addressFormGroup :  formbuilder.group({
        street : [''],
        zipcode : ['']
    })
  })
  let isDirty = (<FormGroupExtension>userFormGroup).isDirty()
  let address = userFormGroup.controls.addressFormGroup['controls'];
    expect(isDirty).toBe(false);
 })
 it('should error,dirty check for nested formgroup',()=>{
    let userFormGroup = formbuilder.group({
        firstName : [''],
        lastName : [''],
     addressFormGroup :  formbuilder.group({
        street : [''],
        zipcode : ['']
    })
  })
  userFormGroup.controls.firstName.setValue('Bharat');
  userFormGroup.controls.lastName.setValue('Patel');  
 
  let address = userFormGroup.controls.addressFormGroup['controls'];
  address.street.setValue('Victoria park')
  address.zipcode.setValue('Zipcode')
  let isDirty = (<FormGroupExtension>userFormGroup).isDirty()
    expect(isDirty).toBe(true);
 })

 })
})();