import { fakeAsync, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgForm } from "@angular/forms"


import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { StartsWithValidationComponent } from './starts-with-template-driven.component';


describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error startsWith with blank value', fakeAsync(() => {
            const fixture = createInstance(StartsWithValidationComponent);
            expect(specTester(fixture, {name:'Bharat'},'startsWith')).toBe(false);
            expect(specTester(fixture, {name:'Naman'},'startsWith')).toBe(true);
            expect(specTester(fixture, {name:'Bharat', taskId:'#123'},'startsWith')).toBe(false);
            expect(specTester(fixture, {name:'Bharat',taskId:'123'},'startsWith')).toBe(false);
            expect(specTester(fixture, {name:'Bharat',taskId:'123'},'startsWith')).toBe(true);
       
            expect(specTester(fixture,{company:'Microsoft'},'startsWith')).toBe(true);
        }));    

//end        
    })

})
