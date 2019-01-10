import { fakeAsync, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgForm } from "@angular/forms"


import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { CompareValidationComponent } from './compare-template-driven.component';




describe('template-driven forms integration tests', () => {



    describe('basic functionality', () => {
        
        it('should not error compare with blank value', fakeAsync(() => {
            const fixture = createInstance(CompareValidationComponent);
            expect(specTester(fixture, {email: 'ushmidave@gmail.com',confirmEmail:'ushmidave@gmail.com'},'[compare]="fieldNameEmail"')).toBe(false);
            expect(specTester(fixture, {password: 'User@123',confirmPassword:'User@123'},'[compare]="fieldNamePassword"')).toBe(false);
            expect(specTester(fixture, {password: 'User@123',confirmPassword:'User@123'},'[compare]="comparePassword"')).toBe(false);     
    
        }));

//end        
    })

})
