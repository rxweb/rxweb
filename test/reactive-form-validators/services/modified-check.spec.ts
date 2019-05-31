import { FormArray } from "@angular/forms"

import { RxFormBuilder, RxFormGroup, RxFormControl,RxFormArray,prop, propObject, propArray } from '@rxweb/reactive-form-validators';

export class ContactMechanism {
    @prop()
    streetAddress: string;

    @prop()
    city: string;
}


export class Facility {
    @prop()
    id: number;

    @prop()
    name: string;

    @propArray() facilityContactMechanisms: FacilityContactMechanism[];
}


export class FacilityContactMechanism {
    @propObject(ContactMechanism) contactMechanism: ContactMechanism;
}


export class Hobby {

    @prop()
    name: string;
}

export class Address {

    @prop()
    name: string;
}

export class User {


    private _firstName: number;

    @prop()
    get firstName() {
        return this._firstName;
    }

    set firstName(value: number) {
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
      it('should pass, isModified flag should be true',()=>{
            let user = new User();
            let userFormGroup = <RxFormGroup>formBuilder.formGroup(user);
            userFormGroup.controls.firstName.setValue("Ajay");
            expect((<RxFormControl>userFormGroup.controls.firstName).isModified).toBe(true);
            expect((<RxFormGroup>userFormGroup).isModified).toBe(true);
         })

      it('should pass, isModified flag should be false', () => {
          let user = new User();
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user);
          expect((<RxFormControl>userFormGroup.controls.firstName).isModified).toBe(false);
          expect((<RxFormGroup>userFormGroup).isModified).toBe(false);
      })

      it('should pass, Nested formgroup `isModified` flag should be true', () => {
          let user = new User();
          user.address = new Address();
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user);
          let addressFormGroup = <RxFormGroup>userFormGroup.controls.address
          addressFormGroup.controls.name.setValue("St. Road");
          expect((<RxFormControl>addressFormGroup.controls.name).isModified).toBe(true);
          expect((<RxFormGroup>addressFormGroup).isModified).toBe(true);
          expect((<RxFormGroup>userFormGroup).isModified).toBe(true);
      })

      it('should pass, Nested formgroup `isModified` flag should be false', () => {
          let user = new User();
          user.address = new Address();
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user);
          let addressFormGroup = <RxFormGroup>userFormGroup.controls.address
          expect((<RxFormControl>addressFormGroup.controls.name).isModified).toBe(false);
          expect((<RxFormGroup>addressFormGroup).isModified).toBe(false);
          expect((<RxFormGroup>userFormGroup).isModified).toBe(false);
      })

      it('should pass, Nested FormArray `isModified` flag should be false', () => {
          let user = new User();
          user.hobbies = new Array<Hobby>();
          user.hobbies.push(new Hobby());
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user);
          let hobbiesFormArray = <RxFormArray>userFormGroup.controls.hobbies
          let hobbyFormGroup = <RxFormGroup>hobbiesFormArray.controls[0];
          expect((<RxFormControl>hobbyFormGroup.controls.name).isModified).toBe(false);
          expect((<RxFormGroup>hobbyFormGroup).isModified).toBe(false);
          expect((<RxFormGroup>userFormGroup).isModified).toBe(false);
      })

      it('should pass, Nested FormArray `isModified` flag should be true', () => {
          let user = new User();
          user.hobbies = new Array<Hobby>();
          user.hobbies.push(new Hobby());
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user);
          let hobbiesFormArray = <RxFormArray>userFormGroup.controls.hobbies
          let hobbyFormGroup = <RxFormGroup>hobbiesFormArray.controls[0];
          hobbyFormGroup.controls.name.setValue("Chess");
          expect((<RxFormControl>hobbyFormGroup.controls.name).isModified).toBe(true);
          expect((<RxFormGroup>hobbyFormGroup).isModified).toBe(true);
          expect((<RxFormGroup>userFormGroup).isModified).toBe(true);
      })

      it('should pass, Nested FormArray `isModified` flag should be true after removing last index', () => {
          let user = new User();
          user.hobbies = new Array<Hobby>();
          user.hobbies.push(new Hobby());
          user.hobbies.push(new Hobby());
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user);
          let hobbiesFormArray = <RxFormArray>userFormGroup.controls.hobbies
          expect((<RxFormArray>hobbiesFormArray).isModified).toBe(false);
          expect((<RxFormGroup>userFormGroup).isModified).toBe(false);
          hobbiesFormArray.removeAt(1);
          expect((<RxFormArray>hobbiesFormArray).isModified).toBe(true);
          expect((<RxFormGroup>userFormGroup).isModified).toBe(true);
      })

      //bug fix #180
      it('should pass blank modified value object', () => {
          let facility = new Facility();
          facility.name = "Store 1";
          facility.facilityContactMechanisms = new Array<FacilityContactMechanism>();


          let facilityFormGroup = <RxFormGroup>formBuilder.formGroup(facility);

          let contactMechanism = new ContactMechanism();
          contactMechanism.streetAddress = "Lincoln In";
          contactMechanism.city = "New York";

          let facilityContactMechanisms: FormArray = facilityFormGroup.controls.facilityContactMechanisms as FormArray;

          let contactMechanismFormGroup = formBuilder.formGroup(contactMechanism) as RxFormGroup;

          facilityContactMechanisms.push(contactMechanismFormGroup);
          facilityFormGroup.commit();
          expect(facilityFormGroup.isModified).toBeFalsy();
          contactMechanismFormGroup.controls.streetAddress.setValue("Lincoln");
          expect(facilityFormGroup.isModified).toBeTruthy();
          contactMechanismFormGroup.controls.streetAddress.setValue("Lincoln In");
          expect(facilityFormGroup.isModified).toBeFalsy();
      })
     

})
