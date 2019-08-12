import { FormGroup, FormArray } from '@angular/forms';

import { ReactiveFormConfig, prop, required, propArray, RxFormBuilder, FormBuilderConfiguration, RxFormGroup } from '../../../packages/reactive-form-validators';
import { tick, fakeAsync } from '@angular/core/testing';
export class Skill {
    @prop()
    name: string;
}
export class Person {

    @propArray(Skill)
    skills: Skill[];

    @required()
    name: string;
}

export class Address {
    @prop()
    city: string;

    @prop()
    country: string;
}

export class Telephone {
    @prop()
    mobileNumber: number;
}

export class UserContact {
    @prop()
    contactType: string;
    @propArray(undefined, { entityProvider: function () { return this.contactType == "address" ? Address : Telephone } })
    contacts: Telephone[] | Address[]
}

export class UserAddress {
    @prop()
    city: string;

    @required()
    country: string;
}

export class User {

    @prop()
    emailAddress: string;

    @propArray(UserAddress, { allowMaxIndex: 2, messageKey: 'maxIndex' })
    addresses: UserAddress[];
}





describe('prop-array', () => {
    let formBuilder = new RxFormBuilder();

    describe('prop-array-function-spec', () => {
        it('should not error, create group function object based on propArray',
            () => {
                var formBuilderConfig = new FormBuilderConfiguration();
                formBuilderConfig.autoInstanceConfig = {
                    arrayPropInstanceConfig: [{
                        propertyName: 'skills',
                        rowItems: 10
                    }]
                }
                let formGroup = <RxFormGroup>formBuilder.formGroup(Person, formBuilderConfig);
                expect(formGroup.modelInstance.constructor).toEqual(Person);
                expect(formGroup.modelInstance.skills[0].constructor).toEqual(Skill);
                expect(formGroup.modelInstance.skills.length).toEqual(10);


                let skillGroup = <FormGroup>formGroup.controls.skills['controls'][0];
                expect(skillGroup.controls.name.value).toBeNull();

                let skillFormGroup = formBuilder.group({
                    skillname: ['Development']

                })
                expect(skillFormGroup.controls.skillname.value).toEqual('Development');
            });
        it('should not error, add new element to a form with propArray', () => {
            let person = new Person();
            person.skills = new Array<Skill>();
            let skill = new Skill();
            person.skills.push(skill)
            let userFormGroup = formBuilder.formGroup(person);

            let skillFormGroup = userFormGroup.controls.skills as FormArray;
            expect(skillFormGroup.push(formBuilder.formGroup(Skill)));
        })


        it('"contacts" Nested FormArray modelInstance should be "Address"',
            () => {
                let userFormGroup = <RxFormGroup>formBuilder.formGroup(UserContact, { contactType: 'address', contacts: [{}] });
                expect(userFormGroup.modelInstance.constructor).toEqual(UserContact);
                let contactsFormArray = userFormGroup.controls.contacts as FormArray;
                let contactFormGroup = contactsFormArray.controls[0] as RxFormGroup;
                expect(contactFormGroup.modelInstance.constructor).toEqual(Address);
                expect(contactFormGroup.controls.city).toBeDefined();
                expect(contactFormGroup.controls.country).toBeDefined();
                expect(contactFormGroup.controls.mobileNumber).not.toBeDefined();
            })
        it('"contacts" Nested FormArray modelInstance should be "Address" and map the respective properties value',
            () => {
                let userFormGroup = <RxFormGroup>formBuilder.formGroup(UserContact, { contactType: 'address', contacts: [{ city: 'Boston', country: 'USA' }] });
                expect(userFormGroup.modelInstance.constructor).toEqual(UserContact);
                let contactsFormArray = userFormGroup.controls.contacts as FormArray;
                let contactFormGroup = contactsFormArray.controls[0] as RxFormGroup;
                expect(contactFormGroup.modelInstance.constructor).toEqual(Address);
                expect(contactFormGroup.controls.city).toBeDefined();
                expect(contactFormGroup.controls.country).toBeDefined();
                expect(contactFormGroup.controls.city.value).toEqual("Boston");
                expect(contactFormGroup.controls.country.value).toEqual("USA");
                expect(contactFormGroup.controls.mobileNumber).not.toBeDefined();
            })
        it('"contacts" Nested FormArray modelInstance should be "Telephone"',
            () => {
                let userFormGroup = <RxFormGroup>formBuilder.formGroup(UserContact, { contactType: 'telephone', contacts: [{}] });
                expect(userFormGroup.modelInstance.constructor).toEqual(UserContact);
                let contactsFormArray = userFormGroup.controls.contacts as FormArray;
                let contactFormGroup = contactsFormArray.controls[0] as RxFormGroup;
                expect(contactFormGroup.modelInstance.constructor).toEqual(Telephone);
                expect(contactFormGroup.controls.city).not.toBeDefined();
                expect(contactFormGroup.controls.country).not.toBeDefined();
                expect(contactFormGroup.controls.mobileNumber).toBeDefined();
            })

        it('Nested FormArray "allowMaxIndex" validation',
            fakeAsync(() => {
                ReactiveFormConfig.set({
                    "validationMessage": {
                        "maxIndex": "this field is required.",
                    }
                });
                let user = new User();
                user.addresses = new Array<UserAddress>();
                let address = new UserAddress();
                user.addresses.push(address);
                let userFormGroup = formBuilder.formGroup(user);
                let addresses = userFormGroup.controls.addresses as FormArray;
                addresses.push(formBuilder.formGroup(Address));
                expect(userFormGroup.controls.addresses.errors).toBeNull();
                addresses.push(formBuilder.formGroup(Address));
                tick(500);
                expect(userFormGroup.controls.addresses.errors !== null).toBeTruthy();
            }))
    });
})
