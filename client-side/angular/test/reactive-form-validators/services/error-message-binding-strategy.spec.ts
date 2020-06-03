import { FormArray, FormGroup } from "@angular/forms"
import { error, ReactiveFormConfig, RxFormBuilder,  RxFormControl, RxFormGroup, propObject, propArray, required, ErrorMessageBindingStrategy } from '@rxweb/reactive-form-validators';


export class Hobby {

    @required()
    name: string;
}

export class Address {

    @required()
    city: string;
}
export class User {

    @required()
    userName: string;

    @error({ conditionalExpression: (c) => c.touched })
    @required()
    password: string;

    @propArray(Hobby)
    hobbies: Hobby[];

    @propObject(Address)
    address: Address;
}



describe('error-message-binding-strategy', () => {
    let formbuilder = new RxFormBuilder();
    beforeEach(() => {
        
    });
    it('none error message strategy', () => {
        ReactiveFormConfig.set({
            "validationMessage": {
                "required": "This field is required."
            },
            "reactiveForm": {
                "errorMessageBindingStrategy": ErrorMessageBindingStrategy.None
            }
        });
        let user = new User();
        user.address = new Address();
        user.hobbies = new Array<Hobby>();
        user.hobbies.push(new Hobby());
        let formGroup = formbuilder.formGroup(user) as FormGroup;
        let addressFormGroup = formGroup.controls.address as FormGroup;
        let hobbyFormArray = formGroup.controls.hobbies as FormArray;
        let hobbyFormGroup = hobbyFormArray.controls[0] as FormGroup;
        expect((<RxFormControl>formGroup.controls.userName).errorMessage).toBe("This field is required.");

        //applied error decorator on password property
        expect((<RxFormControl>formGroup.controls.password).errorMessage).toBe(undefined);
        
        expect((<RxFormControl>addressFormGroup.controls.city).errorMessage).toBe("This field is required.");
        expect((<RxFormControl>hobbyFormGroup.controls.name).errorMessage).toBe("This field is required.");
    })

    it('"OnSubmit" error message strategy', () => {
        ReactiveFormConfig.set({
            "validationMessage": {
                "required": "This field is required."
            },
            "reactiveForm": {
                "errorMessageBindingStrategy": ErrorMessageBindingStrategy.OnSubmit
            }
        });
        let user = new User();
        user.address = new Address();
        user.hobbies = new Array<Hobby>();
        user.hobbies.push(new Hobby());

        let formGroup = formbuilder.formGroup(user) as RxFormGroup;
        let addressFormGroup = formGroup.controls.address as FormGroup;
        let hobbyFormArray = formGroup.controls.hobbies as FormArray;
        let hobbyFormGroup = hobbyFormArray.controls[0] as FormGroup;
        expect((<RxFormControl>formGroup.controls.userName).errorMessage).toBe(undefined);

        //applied error decorator on password property
        expect((<RxFormControl>formGroup.controls.password).errorMessage).toBe(undefined);

        expect((<RxFormControl>addressFormGroup.controls.city).errorMessage).toBe(undefined);
        expect((<RxFormControl>hobbyFormGroup.controls.name).errorMessage).toBe(undefined);

        formGroup.submitted = true

        expect((<RxFormControl>formGroup.controls.userName).errorMessage).toBe("This field is required.");
        expect((<RxFormControl>formGroup.controls.password).errorMessage).toBe(undefined);
        expect((<RxFormControl>addressFormGroup.controls.city).errorMessage).toBe("This field is required.");
        expect((<RxFormControl>hobbyFormGroup.controls.name).errorMessage).toBe("This field is required.");

    })

    it('"OnDirty" error message strategy', () => {
        ReactiveFormConfig.set({
            "validationMessage": {
                "required": "This field is required."
            },
            "reactiveForm": {
                "errorMessageBindingStrategy": ErrorMessageBindingStrategy.OnDirty
            }
        });
        let user = new User();
        user.address = new Address();
        user.hobbies = new Array<Hobby>();
        user.hobbies.push(new Hobby());

        let formGroup = formbuilder.formGroup(user) as RxFormGroup;
        let addressFormGroup = formGroup.controls.address as FormGroup;
        let hobbyFormArray = formGroup.controls.hobbies as FormArray;
        let hobbyFormGroup = hobbyFormArray.controls[0] as FormGroup;
        expect((<RxFormControl>formGroup.controls.userName).errorMessage).toBe(undefined);

        //applied error decorator on password property
        expect((<RxFormControl>formGroup.controls.password).errorMessage).toBe(undefined);

        expect((<RxFormControl>addressFormGroup.controls.city).errorMessage).toBe(undefined);
        expect((<RxFormControl>hobbyFormGroup.controls.name).errorMessage).toBe(undefined);

        formGroup.controls.userName.markAsDirty();
        addressFormGroup.controls.city.markAsDirty();
        hobbyFormGroup.controls.name.markAsDirty();

        expect((<RxFormControl>formGroup.controls.userName).errorMessage).toBe("This field is required.");
        expect((<RxFormControl>formGroup.controls.password).errorMessage).toBe(undefined);
        expect((<RxFormControl>addressFormGroup.controls.city).errorMessage).toBe("This field is required.");
        expect((<RxFormControl>hobbyFormGroup.controls.name).errorMessage).toBe("This field is required.");

    })

    it('"OnTouched" error message strategy', () => {
        ReactiveFormConfig.set({
            "validationMessage": {
                "required": "This field is required."
            },
            "reactiveForm": {
                "errorMessageBindingStrategy": ErrorMessageBindingStrategy.OnTouched
            }
        });
        let user = new User();
        user.address = new Address();
        user.hobbies = new Array<Hobby>();
        user.hobbies.push(new Hobby());

        let formGroup = formbuilder.formGroup(user) as RxFormGroup;
        let addressFormGroup = formGroup.controls.address as FormGroup;
        let hobbyFormArray = formGroup.controls.hobbies as FormArray;
        let hobbyFormGroup = hobbyFormArray.controls[0] as FormGroup;
        expect((<RxFormControl>formGroup.controls.userName).errorMessage).toBe(undefined);

        //applied error decorator on password property
        expect((<RxFormControl>formGroup.controls.password).errorMessage).toBe(undefined);

        expect((<RxFormControl>addressFormGroup.controls.city).errorMessage).toBe(undefined);
        expect((<RxFormControl>hobbyFormGroup.controls.name).errorMessage).toBe(undefined);

        formGroup.controls.userName.markAsTouched();
        addressFormGroup.controls.city.markAsTouched();
        hobbyFormGroup.controls.name.markAsTouched();

        expect((<RxFormControl>formGroup.controls.userName).errorMessage).toBe("This field is required.");
        expect((<RxFormControl>formGroup.controls.password).errorMessage).toBe(undefined);
        expect((<RxFormControl>addressFormGroup.controls.city).errorMessage).toBe("This field is required.");
        expect((<RxFormControl>hobbyFormGroup.controls.name).errorMessage).toBe("This field is required.");

    })

    it('"OnDirtyOrTouched" error message strategy', () => {
        ReactiveFormConfig.set({
            "validationMessage": {
                "required": "This field is required."
            },
            "reactiveForm": {
                "errorMessageBindingStrategy": ErrorMessageBindingStrategy.OnDirtyOrTouched
            }
        });
        let user = new User();
        user.address = new Address();
        user.hobbies = new Array<Hobby>();
        user.hobbies.push(new Hobby());

        let formGroup = formbuilder.formGroup(user) as RxFormGroup;
        let addressFormGroup = formGroup.controls.address as FormGroup;
        let hobbyFormArray = formGroup.controls.hobbies as FormArray;
        let hobbyFormGroup = hobbyFormArray.controls[0] as FormGroup;
        expect((<RxFormControl>formGroup.controls.userName).errorMessage).toBe(undefined);

        //applied error decorator on password property
        expect((<RxFormControl>formGroup.controls.password).errorMessage).toBe(undefined);

        expect((<RxFormControl>addressFormGroup.controls.city).errorMessage).toBe(undefined);
        expect((<RxFormControl>hobbyFormGroup.controls.name).errorMessage).toBe(undefined);

        formGroup.controls.userName.markAsTouched();
        addressFormGroup.controls.city.markAsDirty();
        hobbyFormGroup.controls.name.markAsTouched();

        expect((<RxFormControl>formGroup.controls.userName).errorMessage).toBe("This field is required.");
        expect((<RxFormControl>formGroup.controls.password).errorMessage).toBe(undefined);
        expect((<RxFormControl>addressFormGroup.controls.city).errorMessage).toBe("This field is required.");
        expect((<RxFormControl>hobbyFormGroup.controls.name).errorMessage).toBe("This field is required.");

    })

    it('override error message strategy through error decorator', () => {
        ReactiveFormConfig.set({
            "validationMessage": {
                "required": "This field is required."
            },
            "reactiveForm": {
                "errorMessageBindingStrategy": ErrorMessageBindingStrategy.OnSubmit
            }
        });
        let user = new User();

        let formGroup = formbuilder.formGroup(user) as RxFormGroup;

        expect((<RxFormControl>formGroup.controls.password).errorMessage).toBe(undefined);

        formGroup.controls.password.markAsTouched();

        expect((<RxFormControl>formGroup.controls.password).errorMessage).toBe("This field is required.");

    })

 it('"OnDirtyOrSubmit" error message strategy', () => {
        ReactiveFormConfig.set({
            "validationMessage": {
                "required": "This field is required."
            },
            "reactiveForm": {
                "errorMessageBindingStrategy": ErrorMessageBindingStrategy.OnDirtyOrSubmit
            }
        });
        let user = new User();
        user.address = new Address();
        user.hobbies = new Array<Hobby>();
        user.hobbies.push(new Hobby());

        let formGroup = formbuilder.formGroup(user) as RxFormGroup;
        let addressFormGroup = formGroup.controls.address as FormGroup;
        let hobbyFormArray = formGroup.controls.hobbies as FormArray;
        let hobbyFormGroup = hobbyFormArray.controls[0] as FormGroup;
        expect((<RxFormControl>formGroup.controls.userName).errorMessage).toBe(undefined);

        //applied error decorator on password property
        expect((<RxFormControl>formGroup.controls.password).errorMessage).toBe(undefined);

        expect((<RxFormControl>addressFormGroup.controls.city).errorMessage).toBe(undefined);
        expect((<RxFormControl>hobbyFormGroup.controls.name).errorMessage).toBe(undefined);

        formGroup.submitted = true

        expect((<RxFormControl>formGroup.controls.userName).errorMessage).toBe("This field is required.");
        expect((<RxFormControl>formGroup.controls.password).errorMessage).toBe(undefined);
        expect((<RxFormControl>addressFormGroup.controls.city).errorMessage).toBe("This field is required.");
        expect((<RxFormControl>hobbyFormGroup.controls.name).errorMessage).toBe("This field is required.");

    })

it('"OnTouchedOrSubmit" error message strategy', () => {
        ReactiveFormConfig.set({
            "validationMessage": {
                "required": "This field is required."
            },
            "reactiveForm": {
                "errorMessageBindingStrategy": ErrorMessageBindingStrategy.OnTouchedOrSubmit
            }
        });
        let user = new User();
        user.address = new Address();
        user.hobbies = new Array<Hobby>();
        user.hobbies.push(new Hobby());

        let formGroup = formbuilder.formGroup(user) as RxFormGroup;
        let addressFormGroup = formGroup.controls.address as FormGroup;
        let hobbyFormArray = formGroup.controls.hobbies as FormArray;
        let hobbyFormGroup = hobbyFormArray.controls[0] as FormGroup;
        expect((<RxFormControl>formGroup.controls.userName).errorMessage).toBe(undefined);

        //applied error decorator on password property
        expect((<RxFormControl>formGroup.controls.password).errorMessage).toBe(undefined);

        expect((<RxFormControl>addressFormGroup.controls.city).errorMessage).toBe(undefined);
        expect((<RxFormControl>hobbyFormGroup.controls.name).errorMessage).toBe(undefined);

        formGroup.controls.userName.markAsTouched();
        addressFormGroup.controls.city.markAsTouched();
        hobbyFormGroup.controls.name.markAsTouched();

        expect((<RxFormControl>formGroup.controls.userName).errorMessage).toBe("This field is required.");
        expect((<RxFormControl>formGroup.controls.password).errorMessage).toBe(undefined);
        expect((<RxFormControl>addressFormGroup.controls.city).errorMessage).toBe("This field is required.");
        expect((<RxFormControl>hobbyFormGroup.controls.name).errorMessage).toBe("This field is required.");

    })

    


})
