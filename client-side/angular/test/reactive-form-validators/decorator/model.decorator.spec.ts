import { RxFormControl, prop, model, ReactiveFormConfig, RxFormBuilder } from '@rxweb/reactive-form-validators';

@model([{
    propNames: [":all:"], validationConfig: { required: true }, error: { conditionalExpression: (c) => c.dirty }, excludePropNames: ["userName"]
}, { propNames: ['userName'], validationConfig: { alpha: { allowWhiteSpace: true } } }])
export class User {

    @prop()
    userName: string;

    @prop()
    password: string;
}

@model([{
    propNames: [":all:"],
    ignore: (x) => x.type == "Master"
}])
export class Employee{
    @prop()
    type:string

    @prop()
    firstName:string;

    @prop()
    lastName:string;

    email : string;
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


        it('should not invalid formcontrol of userName',
            () => {
                let formGroup = formBuilder.formGroup(User);
                expect((formGroup.controls.userName.errors)).toBeNull();
                expect((<RxFormControl>formGroup.controls.password).errorMessage).toEqual(undefined);
            });

        it('password formcontrol should be invalid formcontrol and  userName formcontrol should not',
            () => {
                let formGroup = formBuilder.formGroup(User);
                formGroup.controls.userName.setValue("");
                formGroup.controls.password.setValue("");
                expect((formGroup.controls.userName.errors)).toBeNull();
                expect(formGroup.controls.password.errors).toEqual({ 'required': { message: 'This field is required.', refValues: [] } });;
            });

        it('should error, invalid alpha value in userName FormControl.',
            () => {
                let user = new User();
                user.userName = "Indi@";
                let formGroup = formBuilder.formGroup(user);
                expect(formGroup.controls.userName.errors).toEqual({ 'alpha': { message: 'Only alphabets are allowed.', refValues: ['Indi@'] } });
            });
it('should not error, should not define all properties',
    () => {
        var employee = new Employee();
        employee.type = "Master";
        let formGroup = formBuilder.formGroup(employee);
        expect(Object.keys(formGroup.controls).length).toBe(0);
     });

        //end
    });
});
