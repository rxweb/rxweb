import { fakeAsync, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgForm } from "@angular/forms"


import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { ContainsValidationComponent } from './contains-template-driven.component';





describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error contains with blank value', fakeAsync(() => {
            const fixture = createInstance(ContainsValidationComponent);
            expect(specTester(fixture, {emailAddress:'abc@gmail.com'},'contains')).toBe(false);
            expect(specTester(fixture, {recoveryEmailAddress:'ushmidave@gmail.com'},'contains')).toBe(false);
            expect(specTester(fixture,{otherEmailAddress:'ushmidave@hotmail.com'},'contains')).toBe(true);
        }));    

//end        
    })

})
