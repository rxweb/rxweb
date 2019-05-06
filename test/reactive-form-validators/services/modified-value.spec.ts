import {FormGroup, FormArray} from '@angular/forms';

import { RxFormBuilder, RxFormGroup, RxFormControl,RxFormArray,prop, propObject, propArray } from '@rxweb/reactive-form-validators';

export class Hobby {

    @prop()
    name: string;
}

export class Address {

    @prop()
    name: string;
}

export class User {


    private _firstName: string;

    @prop()
    get firstName() {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    @propObject(Address)
    address: Address;

    @propArray(Hobby)
    hobbies:Hobby[]
}




 describe('modified-value',()=>{
     let formBuilder = new RxFormBuilder();
     beforeEach(() => {});
      it('should pass, should be available firstname value in "modifiedValue" property',()=>{
            let user = new User();
            let userFormGroup = <RxFormGroup>formBuilder.formGroup(user);
            userFormGroup.controls.firstName.setValue("Ajay");
            expect((<RxFormGroup>userFormGroup).modifiedValue).toEqual({firstName:'Ajay'});
     })

      it('should pass, a should not be available "firstName" value in "modifiedValue" property', () => {
          let user = new User();
          user.firstName = "Ajay";
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user);
          expect((<RxFormGroup>userFormGroup).modifiedValue).toEqual({});
      })

      it('should pass', () => {
          let user = new User();
          user.firstName = "Ajay";
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user);
          expect(userFormGroup.controls.firstName.value).toEqual("Ajay");
          expect((<RxFormGroup>userFormGroup).modifiedValue).toEqual({});
          userFormGroup.controls.firstName.setValue("Ajai");
          expect((<RxFormGroup>userFormGroup).modifiedValue).toEqual({ firstName: 'Ajai' });
          userFormGroup.controls.firstName.setValue("Ajay");
          expect((<RxFormGroup>userFormGroup).modifiedValue).toEqual({});
      })

      it('should pass, Nested formgroup modified value', () => {
          let user = new User();
          user.address = new Address();
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user);
          let addressFormGroup = <RxFormGroup>userFormGroup.controls.address
          addressFormGroup.controls.name.setValue("St. Road");
          expect((<RxFormGroup>addressFormGroup).modifiedValue).toEqual({ name: 'St. Road' });
          expect((<RxFormGroup>userFormGroup).modifiedValue).toEqual({ address: { name: 'St. Road' } });
      })

      

      it('should pass, Nested FormArray modified value', () => {
          let user = new User();
          user.hobbies = new Array<Hobby>();
          user.hobbies.push(new Hobby());
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user);
          let hobbiesFormArray = <RxFormArray>userFormGroup.controls.hobbies
          let hobbyFormGroup = <RxFormGroup>hobbiesFormArray.controls[0];
          hobbyFormGroup.controls.name.setValue("Chess");
          expect((<RxFormGroup>hobbyFormGroup).modifiedValue).toEqual({ name: "Chess" });
          expect((<RxFormGroup>userFormGroup).modifiedValue).toEqual({ hobbies: [{name:"Chess"}]});
      })

})
