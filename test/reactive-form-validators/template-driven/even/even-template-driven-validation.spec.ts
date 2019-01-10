import { fakeAsync, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgForm } from "@angular/forms"


import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { EvenValidationComponent } from './even-template-driven.component';






describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error even with blank value', fakeAsync(() => {
            const fixture = createInstance(EvenValidationComponent);
            expect(specTester(fixture, {type:'Even',evenNumber:12},'even')).toBe(false);
            expect(specTester(fixture, {type:'Odd',evenNumber:13},'even')).toBe(false);
            expect(specTester(fixture, {type:'Even',evenNumber:2345},'even')).toBe(true);
            expect(specTester(fixture,{multiplesOfEvenNumber:25},'even')).toBe(true);
        }));    

//end        
    })

})
