import { fakeAsync, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgForm } from "@angular/forms"


import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { PasswordValidationComponent } from './password-template-driven.component';





describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error password with blank value', fakeAsync(() => {
            const fixture = createInstance(PasswordValidationComponent);
            expect(specTester(fixture, {newPassword:'User@123'},'password')).toBe(false);
            expect(specTester(fixture, {newPassword:'User'},'password')).toBe(true);
            expect(specTester(fixture,{oldPassword:'Admin@123'},'password')).toBe(false);
            expect(specTester(fixture,{oldPassword:'Admin'},'password')).toBe(true);
        }));    

//end        
    })

})
