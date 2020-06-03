

import { RxFormBuilder, RxFormGroup,  RxFormArray, prop, propObject, propArray, ResetFormType } from '@rxweb/reactive-form-validators';

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




 describe('reset-form',()=>{
     let formBuilder = new RxFormBuilder();
     beforeEach(() => {});
      it('should pass, reset form "ControlsOnly"',()=>{
          let user = new User();
          user.firstName = "Ajay";
          user.lastName = "Ojha"
            let userFormGroup = <RxFormGroup>formBuilder.formGroup(user);
            userFormGroup.controls.firstName.setValue("Anne");
            userFormGroup.controls.lastName.setValue("Hodds");
            expect(userFormGroup.value).toEqual({ firstName: 'Anne', lastName: 'Hodds' });
            userFormGroup.resetForm({resetType:ResetFormType.ControlsOnly})
            expect(userFormGroup.value).toEqual({ firstName: 'Ajay', lastName: 'Ojha' });
     })

      it('should pass, reset form "FormGroupsOnly"', () => {
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
          expect(userFormGroup.value).toEqual({ firstName: 'Anne', lastName: 'Hodds', address: { name: "St. Luios Road" } });
          userFormGroup.resetForm({ resetType: ResetFormType.FormGroupsOnly })
          expect(userFormGroup.value).toEqual({ firstName: 'Anne', lastName: 'Hodds', address: { name: "St. Road" } });
      })

      it('should pass, reset form "FormArraysOnly"', () => {
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
          expect(userFormGroup.value).toEqual({ firstName: 'Anne', lastName: 'Hodds', address: { name: "St. Luios Road" }, hobbies: [{name:"Rugby"}] });
          userFormGroup.resetForm({ resetType: ResetFormType.FormArraysOnly })
          expect(userFormGroup.value).toEqual({ firstName: 'Anne', lastName: 'Hodds', address: { name: "St. Luios Road" }, hobbies: [{name:"Chess"}] });
      })

      it('should pass, reset form "ControlsAndFormGroupsOnly"', () => {
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
          expect(userFormGroup.value).toEqual({ firstName: 'Anne', lastName: 'Hodds', address: { name: "St. Luios Road" }, hobbies: [{ name: "Rugby" }] });
          userFormGroup.resetForm({ resetType: ResetFormType.ControlsAndFormGroupsOnly })
          expect(userFormGroup.value).toEqual({ firstName: 'Ajay', lastName: 'Ojha', address: { name: "St. Road" }, hobbies: [{ name: "Rugby" }] });
      })

      it('should pass, reset form "DefinedPropsOnly"', () => {
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
          expect(userFormGroup.value).toEqual({ firstName: 'Anne', lastName: 'Hodds', address: { name: "St. Luios Road" }, hobbies: [{ name: "Rugby" }] });
          userFormGroup.resetForm({ resetType: ResetFormType.DefinedPropsOnly, value: { firstName: 'Ajai', address: {name:'North Road'}} })
          expect(userFormGroup.value).toEqual({ firstName: 'Ajai', lastName: 'Hodds', address: { name: "North Road" }, hobbies: [{ name: "Rugby" }] });
      })

      it('should pass, reset form "All"', () => {
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
          expect(userFormGroup.value).toEqual({ firstName: 'Anne', lastName: 'Hodds', address: { name: "St. Luios Road" }, hobbies: [{ name: "Rugby" }] });
          userFormGroup.resetForm({ resetType: ResetFormType.All })
          expect(userFormGroup.value).toEqual({ firstName: 'Ajay', lastName: 'Ojha', address: { name: "St. Road" }, hobbies: [{ name: "Chess" }] });
      })

      it('should pass, reset form without passing parameter', () => {
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
          expect(userFormGroup.value).toEqual({ firstName: 'Anne', lastName: 'Hodds', address: { name: "St. Luios Road" }, hobbies: [{ name: "Rugby" }] });
          userFormGroup.resetForm()
          expect(userFormGroup.value).toEqual({ firstName: 'Ajay', lastName: 'Ojha', address: { name: "St. Road" }, hobbies: [{ name: "Chess" }] });
      })

      it('should pass, reset form with passing parameter', () => {
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
          expect(userFormGroup.value).toEqual({ firstName: 'Anne', lastName: 'Hodds', address: { name: "St. Luios Road" }, hobbies: [{ name: "Rugby" }] });
          userFormGroup.resetForm({ value: { lastName: 'Johnson' } })
          expect(userFormGroup.value).toEqual({ firstName: 'Ajay', lastName: 'Johnson', address: { name: "St. Road" }, hobbies: [{ name: "Chess" }] });
      })

      it('should pass, reset form only selected controls', () => {
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
          expect(userFormGroup.value).toEqual({ firstName: 'Anne', lastName: 'Hodds', address: { name: "St. Luios Road" }, hobbies: [{ name: "Rugby" }] });
          userFormGroup.resetForm({ with: ["firstName","address.name"] })
          expect(userFormGroup.value).toEqual({ firstName: 'Ajay', lastName: 'Hodds', address: { name: "St. Road" }, hobbies: [{ name: "Rugby" }] });
      })

    it('should pass, reset formarray zero index', () => {
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
          expect(userFormGroup.value).toEqual({ firstName: 'Anne', lastName: 'Hodds', address: { name: "St. Luios Road" }, hobbies: [{ name: "Rugby" }] });
          userFormGroup.resetForm({ value: { hobbies: { index: 0, groupOptions: { resetType: ResetFormType.ControlsOnly } } } })
          expect(userFormGroup.value).toEqual({ firstName: 'Ajay', lastName: 'Ojha', address: { name: "St. Road" }, hobbies: [{ name: "Chess" }] });
      })

    it('should pass, reset formarray with previous state', () => {
        let user = new User();
        user.firstName = "Ajay";
        user.lastName = "Ojha"
        user.address = new Address();
        user.address.name = "St. Road";
        user.hobbies = new Array<Hobby>();
        let hobby = new Hobby();
        hobby.name = "Chess";
        let hobby2 = new Hobby();
        hobby2.name = "Cricket";
        user.hobbies.push(hobby);
        user.hobbies.push(hobby2)
        let userFormGroup = <RxFormGroup>formBuilder.formGroup(user);
        let addressFormGroup = <RxFormGroup>userFormGroup.controls.address;
        userFormGroup.controls.firstName.setValue("Anne");
        userFormGroup.controls.lastName.setValue("Hodds");
        addressFormGroup.controls.name.setValue("St. Luios Road");
        let hobbiesFormArray = userFormGroup.controls.hobbies as RxFormArray;
        let hobbyFormGroup = hobbiesFormArray.controls[0] as RxFormGroup;
        hobbyFormGroup.controls.name.setValue("Rugby");
        hobbiesFormArray.removeAt(1);
        expect(userFormGroup.value).toEqual({ firstName: 'Anne', lastName: 'Hodds', address: { name: "St. Luios Road" }, hobbies: [{ name: "Rugby" }] });
        userFormGroup.resetForm({ value: { hobbies: { pushFunction: (value) => formBuilder.formGroup(Hobby,value) } } })
        expect(userFormGroup.value).toEqual({ firstName: 'Ajay', lastName: 'Ojha', address: { name: "St. Road" }, hobbies: [{ name: "Chess" }, { name: "Cricket" }] });
    })

     
    it('should pass, reset form "ControlsOnly" and lastName should null' , () => {
        let user = new User();
        user.firstName = "Ajay";
        let userFormGroup = <RxFormGroup>formBuilder.formGroup(user);
        userFormGroup.controls.firstName.setValue("Anne");
        userFormGroup.controls.lastName.setValue("Hodds");
        expect(userFormGroup.value).toEqual({ firstName: 'Anne', lastName: 'Hodds' });
        userFormGroup.resetForm({ resetType: ResetFormType.ControlsOnly })
        expect(userFormGroup.value).toEqual({ firstName: 'Ajay', lastName: null});
    })
      
     

})
