import { RxFormBuilder, FormGroupExtension } from '@rxweb/reactive-form-validators';

describe('dirty_check', () => {
    let formbuilder = new RxFormBuilder();
    it('should not error,dirty check using RxFormGroup', () => {
        let userFormGroup = formbuilder.group({
            firstName: [''],
            lastName: ['']
        })
        let isDirty = (<FormGroupExtension>userFormGroup).isDirty()
        expect(userFormGroup.controls.firstName.value).toBe('');
        expect(userFormGroup.controls.lastName.value).toBe('');
        expect(isDirty).toBe(false);
    })
    it('should error,dirty check', () => {
        let userFormGroup = formbuilder.group({
            firstName: [''],
            lastName: ['']
        })
        userFormGroup.controls.firstName.setValue('Bharat');
        userFormGroup.controls.lastName.setValue('Patel');
        let isDirty = (<FormGroupExtension>userFormGroup).isDirty()

        expect(isDirty).toBe(true);
    })

    it('should not error,dirty check for nested formgroup', () => {
        let userFormGroup = formbuilder.group({
            firstName: [''],
            lastName: [''],
            addressFormGroup: formbuilder.group({
                street: [''],
                zipcode: ['']
            })
        })
        let isDirty = (<FormGroupExtension>userFormGroup).isDirty()
        let address = userFormGroup.controls.addressFormGroup['controls'];
        expect(isDirty).toBe(false);
    })
    it('should error,dirty check for nested formgroup', () => {
        let userFormGroup = formbuilder.group({
            firstName: [''],
            lastName: [''],
            addressFormGroup: formbuilder.group({
                street: [''],
                zipcode: ['']
            })
        })
        userFormGroup.controls.firstName.setValue('Bharat');
        userFormGroup.controls.lastName.setValue('Patel');

        let address = userFormGroup.controls.addressFormGroup['controls'];
        address.street.setValue('Victoria park')
        address.zipcode.setValue('Zipcode')
        let isDirty = (<FormGroupExtension>userFormGroup).isDirty()
        expect(isDirty).toBe(true);
    })

})
