import { fakeAsync, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgForm } from "@angular/forms"


import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { MinNumberValidationComponent } from './min-number-template-driven.component';


describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error minNumber with blank value', fakeAsync(() => {
            const fixture = createInstance(MinNumberValidationComponent);        
            expect(specTester(fixture, {maths:55},'minNumber')).toBe(false);
            expect(specTester(fixture, {maths:20},'minNumber')).toBe(true);
            expect(specTester(fixture, {maths:50,statstics:90},'minNumber')).toBe(false);
            expect(specTester(fixture, {maths:40,statstics:20},'minNumber')).toBe(false);
            expect(specTester(fixture, {maths:50,statstics:20},'minNumber')).toBe(true);
            expect(specTester(fixture, {science:30},'minNumber')).toBe(true);
        }));    

//end        
    })

})
