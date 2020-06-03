

import { RxFormBuilder, RxFormGroup,  RxFormArray, prop, propObject, propArray} from '@rxweb/reactive-form-validators';

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

    @prop()
    lastName: string;

    @propObject(Address)
    address: Address;

    @propArray(Hobby)
    hobbies:Hobby[]
}




 describe('commit',()=>{
     let formBuilder = new RxFormBuilder();
     beforeEach(() => {});
      it('should pass, commit form "FormGroup" level',()=>{
          let user = new User();
          user.firstName = "Ajay";
          user.lastName = "Ojha"
            let userFormGroup = <RxFormGroup>formBuilder.formGroup(user);
            userFormGroup.controls.firstName.setValue("Anne");
            userFormGroup.controls.lastName.setValue("Hodds");
            expect(userFormGroup.isModified).toBe(true);
            userFormGroup.commit();
            expect(userFormGroup.isModified).toBe(false);
            expect(userFormGroup.value).toEqual({ firstName: "Anne", lastName: "Hodds" });
     })

      it('should pass, commit form nested FormGroup level', () => {
          let user = new User();
          user.firstName = "Ajay";
          user.lastName = "Ojha"
          user.address = new Address();
          user.address.name = "St. Road";
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user);
          let addressFormGroup = <RxFormGroup>userFormGroup.controls.address;
          userFormGroup.controls.firstName.setValue("Anne");
          userFormGroup.controls.lastName.setValue("Hodds");
          addressFormGroup.controls.name.setValue("St. Luios Road");
          expect(userFormGroup.isModified).toBe(true);
          userFormGroup.commit();
          expect(userFormGroup.isModified).toBe(false);
          expect(userFormGroup.value).toEqual({ firstName: "Anne", lastName: "Hodds", address: {name:'St. Luios Road'} });
      })

      it('should pass, commit form Nested FormArray level', () => {
          let user = new User();
          user.firstName = "Ajay";
          user.lastName = "Ojha"
          user.address = new Address();
          user.address.name = "St. Road";
          user.hobbies = new Array<Hobby>();
          let hobby = new Hobby();
          hobby.name = "Chess";
          user.hobbies.push(hobby);
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user);
          let addressFormGroup = <RxFormGroup>userFormGroup.controls.address;
          userFormGroup.controls.firstName.setValue("Anne");
          userFormGroup.controls.lastName.setValue("Hodds");
          addressFormGroup.controls.name.setValue("St. Luios Road");
          let hobbiesFormArray = userFormGroup.controls.hobbies as RxFormArray;
          let hobbyFormGroup = hobbiesFormArray.controls[0] as RxFormGroup;
          hobbyFormGroup.controls.name.setValue("Rugby");
          expect(userFormGroup.isModified).toBe(true);
          userFormGroup.commit();
          expect(userFormGroup.isModified).toBe(false);
          expect(userFormGroup.value).toEqual({ firstName: "Anne", lastName: "Hodds", address: { name: 'St. Luios Road' }, hobbies: [{name:"Rugby"}] });
      })
})
