import { fakeAsync, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgForm } from "@angular/forms"


import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { RequiredValidationComponent } from './required-template-driven.component';


describe('template-driven forms integration tests', () => {



    describe('basic functionality', () => {

        it('should not error required with blank value', fakeAsync(() => {
            const fixture = createInstance(RequiredValidationComponent);
            expect(specTester(fixture, { firstName: '' }, 'required')).toBe(true);
            expect(specTester(fixture, { firstName: 'Bharat',lastName:''},'required')).toBe(true);
            expect(specTester(fixture, { userName:  ''}, 'required')).toBe(true);
        }));
        //end        
    })

})