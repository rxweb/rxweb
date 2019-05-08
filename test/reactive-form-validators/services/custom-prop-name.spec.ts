
import { FormBuilderConfiguration,RxFormBuilder, prop, propObject, propArray, alpha } from '@rxweb/reactive-form-validators';

export class Address{
    @prop()
    name:string;
}
export class Hobby{
    @prop()
    name:string;
}

export class User {

    @prop()
    userName: string;

    @prop({name:'first_name'})
    firstName: string;

    @alpha()
    @prop({defaultValue:"Hi!"})
    message:string;

    @propObject(Address,{name:'user_address'})
    address:Address

    @propArray(Hobby,{name:"user_hobbies"})
    hobbies:Hobby[]
}




    describe('prop-config', () => {
        let formBuilder = new RxFormBuilder();

        describe('custom-prop-config-spec', () => {

            it('FormControl value and user object first_name value should be the same',
            () => {
                let user = {
                    first_name:'Jhon',
                };
                let userFormGroup = formBuilder.formGroup(User,user);
                expect(userFormGroup.controls.firstName.value).toEqual(user.first_name);

            });

            it('Nested FormGroup object value and user_address property object value should be the same',
            () => {
                let user = {
                    user_address:{
                        name:'Boston'
                    }
                };
                let userFormGroup = formBuilder.formGroup(User,user);
                expect(userFormGroup.controls.address.value).toEqual(user.user_address);

            });

            it('Nested FormArray object value and user_hobbies property object value should be the same',
            () => {
                let user = {
                    user_hobbies:[{
                        name:'Chess'
                    }]
                };
                let userFormGroup = formBuilder.formGroup(User,user);
                expect(userFormGroup.controls.hobbies.value).toEqual(user.user_hobbies);

            });

            it('default value should set in FormControl.',
            () => {
                let user = new User();
                let userFormGroup = formBuilder.formGroup(user);
                expect(userFormGroup.controls.message.value).toEqual("Hi!");
            });

            it('Should error, default value should set in FormControl and control should be invalid.',
            () => {
                let user = new User();
                let userFormGroup = formBuilder.formGroup(user);
                expect(userFormGroup.controls.message.invalid).toEqual(true);
            });

            it('Should pass, should apply default value of "ajai" in userName FormControl.',
            () => {
                let formBuilderConfiguration = new FormBuilderConfiguration();
                formBuilderConfiguration.propsConfig = { userName: { defaultValue: 'ajai' } };
                let userFormGroup = formBuilder.formGroup(User, formBuilderConfiguration);
                expect(userFormGroup.controls.userName.value).toEqual('ajai');
                });

            it('Should pass, should not apply default value of "ajai" in userName FormControl.',
                () => {
                    let user = new User();
                    user.userName = "john";
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.propsConfig = { userName: { defaultValue: 'ajai' } };
                    let userFormGroup = formBuilder.formGroup(user, formBuilderConfiguration);
                    expect(userFormGroup.controls.userName.value).toEqual('john');
                });


            



            //end
        });
    });
