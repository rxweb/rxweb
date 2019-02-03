
import {  RxFormBuilder } from '../../../packages/reactive-form-validators';


import { prop, propObject, propArray } from '../../../packages/reactive-form-validators';

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
                debugger;
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
            



            //end
        });
    });
})();
