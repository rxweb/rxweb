import { fakeAsync, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgForm } from "@angular/forms"


import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { OddValidationComponent } from './odd-template-driven.component';





describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error Odd with blank value', fakeAsync(() => {
            const fixture = createInstance(OddValidationComponent);
            expect(specTester(fixture, {type:'Odd',oddNumber:13},'odd')).toBe(false);
            expect(specTester(fixture, {type:'Even',oddNumber:12},'odd')).toBe(false);
            expect(specTester(fixture, {type:'Odd',oddNumber:23454},'odd')).toBe(true);
            expect(specTester(fixture,{multiplesOfOddNumber:26},'odd')).toBe(true);
        }));    

//end        
    })

})
