import {RxFormControl, propObject, prop, RxFormBuilder, RxFormGroup, required,ReactiveFormConfig } from '@rxweb/reactive-form-validators';
class Address {
    @prop()
    cityName: string;
}
export class User {

    @prop()
    firstName: string;

    @required()
    lastName: string;

    @propObject(Address)
    address: Address;
}

describe('back-end-errors', () => {
    let formbuilder = new RxFormBuilder();
    beforeEach(() => {
        ReactiveFormConfig.set({
            "validationMessage": {
                "required": "This field is required.",
            }
        });
    });

    it('Back end error messages only', () => {
        let userFormGroup: RxFormGroup = <RxFormGroup>formbuilder.formGroup(User);
        (<RxFormControl>userFormGroup.controls.firstName).setBackEndErrors({ invalidValue: 'The entered value is Invalid' });
        expect((<RxFormControl>userFormGroup.controls.firstName).errorMessage).toEqual('The entered value is Invalid');
        expect((<RxFormControl>userFormGroup.controls.firstName).errorMessages).toEqual(['The entered value is Invalid']);
    })

    it('validator plus back end error messages', () => {
        let userFormGroup: RxFormGroup = <RxFormGroup>formbuilder.formGroup(User);
        (<RxFormControl>userFormGroup.controls.lastName).setBackEndErrors({ invalidValue: 'The entered value is Invalid' });
        expect((<RxFormControl>userFormGroup.controls.lastName).errorMessage).toEqual('The entered value is Invalid');
        expect((<RxFormControl>userFormGroup.controls.lastName).errorMessages).toEqual(['This field is required.','The entered value is Invalid']);
    })

    it('set backend error messages through formgroup', () => {
        let userFormGroup: RxFormGroup = <RxFormGroup>formbuilder.formGroup(User,{ firstName: 'John', address: {cityName:'Boston'}});
        userFormGroup.setBackEndErrors({ address: { cityName: { invalidCity: 'Invalid City' } }, firstName: { invalidValue: 'The entered value is Invalid' } });
        let addressFormGroup = userFormGroup.controls.address as RxFormGroup;
        expect((<RxFormControl>userFormGroup.controls.firstName).errorMessage).toEqual('The entered value is Invalid');
        expect((<RxFormControl>userFormGroup.controls.firstName).errorMessages).toEqual(['The entered value is Invalid']);
        expect((<RxFormControl>addressFormGroup.controls.cityName).errorMessages).toEqual(['Invalid City']);
        expect((<RxFormControl>addressFormGroup.controls.cityName).errorMessage).toEqual('Invalid City');
    })

    it('Clear backend error', () => {
        let userFormGroup: RxFormGroup = <RxFormGroup>formbuilder.formGroup(User);
        (<RxFormControl>userFormGroup.controls.firstName).clearBackEndErrors();
        expect((<RxFormControl>userFormGroup.controls.firstName).errorMessage).toEqual(undefined);
        expect((<RxFormControl>userFormGroup.controls.firstName).errorMessages).toEqual([]);
    })
})
