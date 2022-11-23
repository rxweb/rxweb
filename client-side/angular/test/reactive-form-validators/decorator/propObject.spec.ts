import { FormGroup } from '@angular/forms';

import { prop, propObject, RxFormBuilder, RxFormGroup } from '../../../packages/reactive-form-validators';

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
export class Telephone {
    @prop()
    mobileNumber: number;
}

export class UserContact {
    @prop()
    contactType: string;
    @propObject(undefined, { entityProvider: function () { return this.contactType == "address" ? Address : Telephone } }) 
    contact: Telephone | Address
}


describe('propObject', () => {
    let formBuilder = new RxFormBuilder();
    it('should not error,prop using RxFormGroup',
        () => {
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

    it('"contact" Nested FormGroup modelInstance should be "Address"',
        () => {
            let userFormGroup = <RxFormGroup>formBuilder.formGroup(UserContact, { contactType: 'address', contact: {} });
            expect(userFormGroup.modelInstance.constructor).toEqual(UserContact);
            let contactFormGroup = userFormGroup.controls.contact as RxFormGroup;
            expect(contactFormGroup.modelInstance.constructor).toEqual(Address);
            expect(contactFormGroup.controls.city).toBeDefined();
            expect(contactFormGroup.controls.country).toBeDefined();
            expect(contactFormGroup.controls.mobileNumber).not.toBeDefined();
        })


    it('"contact" Nested FormGroup modelInstance should be "Address" and map the respective properties value',
        () => {
            let userFormGroup = <RxFormGroup>formBuilder.formGroup(UserContact, { contactType: 'address', contact: { city:'Boston',country:'USA' } });
            expect(userFormGroup.modelInstance.constructor).toEqual(UserContact);
            let contactFormGroup = userFormGroup.controls.contact as RxFormGroup;
            expect(contactFormGroup.modelInstance.constructor).toEqual(Address);
            expect(contactFormGroup.controls.city).toBeDefined();
            expect(contactFormGroup.controls.country).toBeDefined();
            expect(contactFormGroup.controls.city.value).toEqual("Boston");
            expect(contactFormGroup.controls.country.value).toEqual("USA");
            expect(contactFormGroup.controls.mobileNumber).not.toBeDefined();
        })

    it('"contact" Nested FormGroup modelInstance should be changed to "Address"',
        () => {
            let userContact = new UserContact();
            userContact.contactType = "address";
            userContact.contact = new Telephone();
            let userFormGroup = <RxFormGroup>formBuilder.formGroup(userContact);
            expect(userFormGroup.modelInstance.constructor).toEqual(UserContact);
            let contactFormGroup = userFormGroup.controls.contact as RxFormGroup;
            expect(contactFormGroup.modelInstance.constructor).toEqual(Address);
            expect(contactFormGroup.controls.city).toBeDefined();
            expect(contactFormGroup.controls.country).toBeDefined();
            expect(contactFormGroup.controls.mobileNumber).not.toBeDefined();
        })

    it('"contact" Nested FormGroup modelInstance should be "Telephone"',
        () => {
            let userFormGroup = <RxFormGroup>formBuilder.formGroup(UserContact, { contactType: 'telephone', contact: {} });
            expect(userFormGroup.modelInstance.constructor).toEqual(UserContact);
            let contactFormGroup = userFormGroup.controls.contact as RxFormGroup;
            expect(contactFormGroup.modelInstance.constructor).toEqual(Telephone);
            expect(contactFormGroup.controls.city).not.toBeDefined();
            expect(contactFormGroup.controls.country).not.toBeDefined();
            expect(contactFormGroup.controls.mobileNumber).toBeDefined();
        })
});
