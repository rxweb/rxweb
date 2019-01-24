import { fakeAsync, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgForm } from "@angular/forms"


import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { EnsWithValidationComponent } from './ends-with-template-driven.component';





describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error endsWith with blank value', fakeAsync(() => {
            const fixture = createInstance(EnsWithValidationComponent);
            expect(specTester(fixture, {name:'Bharat'},'endsWith')).toBe(false);
            expect(specTester(fixture, {name:'Ushmi'},'endsWith')).toBe(true);
            expect(specTester(fixture, {name:'Bharat',taskId:'123451'},'endsWith')).toBe(false);
            expect(specTester(fixture, {name:'Ushmi',taskId:'2345'},'endsWith')).toBe(false);
            expect(specTester(fixture, {name:'Bharat',taskId:'2345'},'endsWith')).toBe(true);
            expect(specTester(fixture,{company:'Google'},'endsWith')).toBe(true);
        }));    

//end        
    })

})
