import { fakeAsync, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgForm } from "@angular/forms"


import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { MinDateValidationComponent } from './min-date-template-driven.component';






describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error minDate with blank value', fakeAsync(() => {
            const fixture = createInstance(MinDateValidationComponent);        
            expect(specTester(fixture, {allocationDate:"09/20/2018"},'minDate')).toBe(false);
            expect(specTester(fixture, {allocationDate:"06/20/2018"},'minDate')).toBe(true);
            expect(specTester(fixture, {userName:'Bharat',admissionDate:"09/20/2018"},'minDate')).toBe(false);
            expect(specTester(fixture, {userName:'Naman',admissionDate:"06/20/2018"},'minDate')).toBe(false);
            expect(specTester(fixture, {userName:'Bharat',admissionDate:"06/20/2018"},'minDate')).toBe(true);
            expect(specTester(fixture, {enrollmentDate:'04/06/2018',lastRegistrationDate:"05/06/2018"},'minDate')).toBe(false);
            expect(specTester(fixture, {enrollmentDate:'04/06/2018',lastRegistrationDate:"02/02/2018"},'minDate')).toBe(true);
            expect(specTester(fixture, {registrationDate:'02/02/2018'},'minDate')).toBe(true);
        }));    

//end        
    })

})
