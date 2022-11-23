import { FormBuilder } from "@angular/forms"
import { RxwebValidators, ReactiveFormConfig, required, prop, RxFormBuilder } from '@rxweb/reactive-form-validators';

class User {
    @required({ conditionalExpression: function () { return this.countryName == "India"; } })
    firstName: string;

    @required({ conditionalExpression: (x) => x.countryName == "India" })
    lastName: string;
    @prop()
    countryName: string;
}


describe('conditional expression', () => {
    beforeEach(() => {
        ReactiveFormConfig.set({
            "validationMessage": {
                "alpha": "Only alphabets are allowed.",
                "required": "This field is required."
            }
        });
    });


    let formbuilder = new FormBuilder();

    it('should pass.', () => {
        let userFormGroup = formbuilder.group({
            firstName: ['@ja', RxwebValidators.alpha({ conditionalExpression: (x) => x.firstName == "@jay" })]
        })
        userFormGroup.controls.firstName.setValue('@jay');
        expect(userFormGroup.controls.firstName.errors).toEqual({ 'alpha': { message: 'Only alphabets are allowed.', refValues: ['@jay'] } });
    })

    it('should pass.', () => {
        let userFormGroup = formbuilder.group({
            firstName: ['@ja', RxwebValidators.alpha({ conditionalExpression: (x) => x.firstName == "@jay" })]
        })
        userFormGroup.controls.firstName.setValue('@jay');
        expect(userFormGroup.controls.firstName.errors).toEqual({ 'alpha': { message: 'Only alphabets are allowed.', refValues: ['@jay'] } });
    })

    it('should required with simple conditional expression function.',
        () => {
            let rxFormBuilder = new RxFormBuilder();
            let user = new User();
            user.countryName = "India";
            let formGroup = rxFormBuilder.formGroup(user);
            formGroup.controls.firstName.updateValueAndValidity();
            expect(formGroup.controls.firstName.errors).toEqual({ 'required': { message: 'This field is required.', refValues: [] } });
        });

    it('should required with arrow function.',
        () => {
            let rxFormBuilder = new RxFormBuilder();
            let user = new User();
            user.countryName = "India";
            let formGroup = rxFormBuilder.formGroup(user);
            formGroup.controls.lastName.updateValueAndValidity();
            expect(formGroup.controls.lastName.errors).toEqual({ 'required': { message: 'This field is required.', refValues: [] } });
        });

})
