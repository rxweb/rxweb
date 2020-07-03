import { prop,RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';
import { FormControl, Validators } from '@angular/forms';

export class User {

    @prop()
    lastName: string;

    @prop()
    firstName: string;

}

describe('form-group', () => {
    let formbuilder = new RxFormBuilder();
    /// bug : https://github.com/rxweb/rxweb/issues/346
    it('should pass.', () => {
        let userFormGroup: RxFormGroup = <RxFormGroup>formbuilder.formGroup(User);
        userFormGroup.removeControl('lastName');
        userFormGroup.addControl('lastName', new FormControl('', {
            validators: [Validators.required, Validators.email],
            updateOn: 'blur'
        }));
        userFormGroup.controls.firstName.setValue("John");
        userFormGroup.controls.lastName.setValue("Doe");
        expect(userFormGroup.controls.lastName.value).toEqual('Doe');
    })
})
