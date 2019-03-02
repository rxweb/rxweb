
import {  RxFormBuilder } from '../../../packages/reactive-form-validators';


import { prop, propObject, propArray,alpha } from '../../../packages/reactive-form-validators';

export class Address{
    @prop()
    name:string;
}
export class Hobby{
    @prop()
    name:string;
}

export class User {

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




(function () {
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
            



            //end
        });
    });
})();
