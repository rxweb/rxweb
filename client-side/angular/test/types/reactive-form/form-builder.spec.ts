import { fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { IFormGroup, IFormBuilder, IFormArray } from "@rxweb/types"
interface Auth {
    login: string;
}
interface AuthLogin extends Auth {
    password: string;
}

export interface Skill {
    name: string;
}

(function () {
    describe('Generic Type Form Builder Methods', () => {
        let formBuilder: IFormBuilder;

        beforeEach(() => {
            formBuilder = new FormBuilder();
        });

        it('Only Login Field Allowed', () => {
            const authFormGroup = formBuilder.group<Auth>({ 'login': 'some value' });

            expect(authFormGroup.controls.login.value).toEqual('some value');
        });

        it('Create Control by using value and disable property', () => {
            const authFormGroup = formBuilder.group<Auth>({ 'login': { value: 'some value', disabled: true } });

            expect(authFormGroup.controls.login.value).toEqual('some value');
            expect(authFormGroup.controls.login.disabled).toEqual(true);
        });

        it('Create Control of two properties Login and Password', () => {
            const authFormGroup = formBuilder.group<AuthLogin>(
                { 'login': ['some value'], 'password': ['some value'] });

            expect(authFormGroup.controls.login.value).toEqual('some value');
            expect(authFormGroup.controls.password.value).toEqual('some value');
        });

        it('should use controls whose form state is a primitive value', () => {
            const authFormGroup = formBuilder.group<Auth>({ 'login': formBuilder.control<string>("some value") });
            expect(authFormGroup.controls.login.value).toEqual('some value');
        });

        it('Form Array', () => {

            const formArray = formBuilder.array<Skill>([
                formBuilder.group({
                    name: ["Angular", Validators.required]
                })
            ])
            let nestedFormGroup = formArray.controls[0] as IFormGroup<Skill>;
            expect(nestedFormGroup.controls.name.value).toEqual('Angular');
        });


    });
})();
