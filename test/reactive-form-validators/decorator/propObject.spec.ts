import {AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';

import { ReactiveFormConfig,RxFormBuilder,FormBuilderConfiguration,RxFormGroup} from '../../../packages/reactive-form-validators';


import {  prop,propObject,required,propArray,RxwebValidators } from    '../../../packages/reactive-form-validators'; 

export class Address {
    @prop()
    city: string;
  
    @prop()
    country: string;
  }
  
  export class User {
  
    @prop()
    emailAddress: string;
  
    @propObject(Address)
    address: Address;
  }

  (function() {
    describe('propObject', () => {
        let formBuilder = new RxFormBuilder();
        var formBuilderConfig = new FormBuilderConfiguration();
    it('should not error,prop using RxFormGroup',
    ()=>{
        let user = new User();
        user.address = new Address();
        let userFormGroup = <RxFormGroup>formBuilder.formGroup(user);
        expect(userFormGroup.controls.emailAddress.value).toBeNull();
        userFormGroup.controls.emailAddress.setValue('xyz@gmail.com');
        expect(userFormGroup.controls.emailAddress.value).toEqual('xyz@gmail.com');         
         let addressformGroup = <FormGroup>userFormGroup.controls.address;
         expect(addressformGroup.controls.city.value).toBeNull();
         addressformGroup.controls.city.setValue('Mumbai');
         expect(addressformGroup.controls.city.value).toBe('Mumbai');
         expect(addressformGroup.controls.country.value).toBeNull();
         addressformGroup.controls.country.setValue('India');
         expect(addressformGroup.controls.country.value).toBe('India');
    }) 

    });
  })();