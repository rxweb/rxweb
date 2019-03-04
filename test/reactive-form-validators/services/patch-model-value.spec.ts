import {FormGroup, FormArray} from '@angular/forms';

import { RxFormBuilder, RxFormGroup, prop, propObject, propArray } from '../../../packages/reactive-form-validators';

export class Address {
    @prop()
    areaName: string;
}
export class Hobby {
    @prop()
    name: string;
}

export class User {
    @prop()
    firstName: string;

    @propObject(Address)
    address: Address;

    @propArray(Hobby)
    hobbies: Hobby[];
}


(function(){
 describe('patch-model-value',()=>{
     let formBuilder = new RxFormBuilder();
     beforeEach(() => {});
      it('should pass, with model property',()=>{
          let user = new User();
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user);
          expect(userFormGroup.controls.firstName.value).toBe(null);
          userFormGroup.patchModelValue({firstName:'Ajay'});
          expect(userFormGroup.controls.firstName.value).toEqual('Ajay');
         })

        it('should pass, with model nested object property',()=>{
          let user = new User();
          user.address = new Address();
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user);
          let nestedFormGroup:FormGroup = <FormGroup>userFormGroup.controls.address;
          expect(nestedFormGroup.controls.areaName.value).toBe(null);
          userFormGroup.patchModelValue({address:{areaName:"Ahmedabad"}});
          expect(nestedFormGroup.controls.areaName.value).toEqual('Ahmedabad');
     })

     it('should pass, with model nested array object property', () => {
         let user = new User();
         user.address = new Address();
         let userFormGroup = <RxFormGroup>formBuilder.formGroup(user);
         let nestedFormGroup: FormGroup = <FormGroup>userFormGroup.controls.address;
         expect(nestedFormGroup.controls.areaName.value).toBe(null);
         userFormGroup.patchModelValue({ address: { areaName: "Ahmedabad" } });
         expect(nestedFormGroup.controls.areaName.value).toEqual('Ahmedabad');
     })

     it('should pass, with model nested array object property', () => {
         let user = new User();
         user.hobbies = new Array<Hobby>();
         let hobby = new Hobby();
         user.hobbies.push(hobby);
         let userFormGroup = <RxFormGroup>formBuilder.formGroup(user);
         let nestedFormArray: FormArray = <FormArray>userFormGroup.controls.hobbies;
         let formGroup = <FormGroup>nestedFormArray.controls[0];
         expect(formGroup.controls.name.value).toBe(null);
         userFormGroup.patchModelValue({ hobbies: [{ name: "Chess" }] });
         expect(formGroup.controls.name.value).toEqual('Chess');
     })

     

})
})();