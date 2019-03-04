
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import { ReactiveFormConfig, RxFormBuilder, FormBuilderConfiguration } from '../../../packages/reactive-form-validators';


import { async, prop } from '../../../packages/reactive-form-validators';

function isUniqueUserName(control: FormControl) {
    const promise = new Promise((resolve, reject) => {
        if (control.value != null)
            resolve(null)
        else
            resolve({ 'isUniqueUserName': true })
    });
    return promise;
}

function isUniqueEmail(control: FormControl) {
    const promise = new Promise((resolve, reject) => {
        if (control.value != null)
            resolve(null)
        else
            resolve({ 'isUniqueEmail': true })
    });
    return promise;
}



export class User {

    @async([isUniqueUserName])
    userName: string;

    @prop()
    email: string;

}




(function () {
    describe('Decorator', () => {
        let formBuilder = new RxFormBuilder();

        describe('asyncDecorator', () => {



            it('should not error, value is "ajay".',
                () => {
                    let user = new User();
                    user.userName = "ajay";
                    let formGroup = formBuilder.formGroup(user);
                    expect(formGroup.controls.userName.errors).toBeNull();
                });


            it('should not error, value is "ajay@rxweb.io".',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        name: { async: [isUniqueEmail] }
                    };

                    let user = new User();
                    user.userName = "ajay@rxweb.io";
                    let formGroup = formBuilder.formGroup(user, formBuilderConfiguration);
                    expect(formGroup.controls.userName.errors).toBeNull();
                });

            //end
        });
    });
})();
