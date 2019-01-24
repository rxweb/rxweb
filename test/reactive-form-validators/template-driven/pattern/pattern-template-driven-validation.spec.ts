import { fakeAsync, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgForm } from "@angular/forms"


import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { PatternValidationComponent } from './pattern-template-driven.component';






describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error pattern with blank value', fakeAsync(() => {
            const fixture = createInstance(PatternValidationComponent);
            expect(specTester(fixture, {userName:'Bharat'},'pattern')).toBe(false);
            expect(specTester(fixture, {userName:'Bharat',age:13},'pattern')).toBe(false);
            expect(specTester(fixture, {userName:'Nanam',age:'abc'},'pattern')).toBe(false);
         //   expect(specTester(fixture, {userName:'Bharat',age:'abc'},'pattern')).toBe(true);
       //     expect(specTester(fixture,{zipCode:10},'pattern')).toBe(true);
        }));    

//end        
    })

})
