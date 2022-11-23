import { FormControl } from '@angular/forms';

import { RxwebValidators, ReactiveFormConfig } from '@rxweb/reactive-form-validators';



describe('Validator', () => {
    beforeEach(() => {
        ReactiveFormConfig.set({
            "validationMessage": {
                "password": {
                    minLength: 'Minimum Character length should be 5.',
                    maxLength: 'MaxLength allowed is 5',
                    password: "Invalid Password"
                },
            }
        });
    });

    describe('passwordValidator', () => {

        it("Should not error, password validator ",
            () => {
                expect(RxwebValidators.password({ validation: { maxLength: 10, minLength: 5, digit: true, specialCharacter: true } })(new FormControl('Admin@123'))).toBeNull();
            });


        it("Should error, password validator ",
            () => {
                expect(RxwebValidators.password({ validation: { maxLength: 10, minLength: 5, digit: true, specialCharacter: true } })(new FormControl('Admin123'))).toEqual({ 'password': { message: 'Invalid Password', refValues: ['Admin123'] } });
            });



        it("Should error, password validator Shows Custom Validation Message",
            () => {
                expect(RxwebValidators.password({ validation: { maxLength: 10, minLength: 5, digit: true, specialCharacter: true }, message: 'Password is not valid' })(new FormControl('Admin123'))).toEqual({ 'password': { message: 'Password is not valid', refValues: ['Admin123'] } });
            });
        //feat : https://github.com/rxweb/rxweb/issues/273
        it("Should error, show global custom validation messages",
            () => {
                expect(RxwebValidators.password({ validation: { maxLength: 10, minLength: 5, digit: true, specialCharacter: true } })(new FormControl('A'))).toEqual({ 'password': { message: 'Minimum Character length should be 5.', refValues: ['A'] } });
            });




        //end
    });
});
