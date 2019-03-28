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

});
