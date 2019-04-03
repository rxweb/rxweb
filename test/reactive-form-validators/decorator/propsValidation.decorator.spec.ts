import { prop, propsValidation, ReactiveFormConfig, RxFormBuilder } from '@rxweb/reactive-form-validators';

@propsValidation([{ propNames: [":all:"], validation: { required: true } }, { propNames: ['userName'], validation: { alpha: { allowWhiteSpace: true } } }])
export class User {

    @prop()
    userName: string;

    @prop()
    password: string;
}




describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
        ReactiveFormConfig.set({
            "validationMessage": {
                "alpha": "Only alphabets are allowed.",
                "required": "This field is required."
            }
        });
    });

    describe('propsValidationDecorator', () => {


        it('should invalid formcontrol of userName',
            () => {
                let formGroup = formBuilder.formGroup(User);
                expect((formGroup.controls.userName.errors)).toEqual({ 'required': { message: 'This field is required.', refValues: [] } });
                expect(formGroup.controls.password.errors).toEqual({ 'required': { message: 'This field is required.', refValues: [] } });
            });

        it('should error, invalid alpha value in userName FormControl.',
            () => {
                let user = new User();
                user.userName = "Indi@";
                let formGroup = formBuilder.formGroup(user);
                expect(formGroup.controls.userName.errors).toEqual({ 'alpha': { message: 'Only alphabets are allowed.', refValues: ['Indi@'] } });
            });


        //end
    });
});
