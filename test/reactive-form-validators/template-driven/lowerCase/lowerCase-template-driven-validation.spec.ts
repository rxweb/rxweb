import { fakeAsync, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgForm } from "@angular/forms"


import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { LowerCaseValidationComponent } from './lowerCase-template-driven.component';



describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error lowerCase with blank value', fakeAsync(() => {
            const fixture = createInstance(LowerCaseValidationComponent);
            expect(specTester(fixture, {username:'bharat'},'lowerCase')).toBe(false);
            expect(specTester(fixture, {username:'BHARAT'},'lowerCase')).toBe(true);
            
            expect(specTester(fixture, {username:'jonathan.feldman',middleName:"bharat"},'lowerCase')).toBe(false);
            expect(specTester(fixture, {username:'jonhan.feldman',middleName:"BHARAT"},'lowerCase')).toBe(false);
            expect(specTester(fixture, {username:'jonathan.feldman',middleName:"BHARAT"},'lowerCase')).toBe(true);
            expect(specTester(fixture, {lastName:'PATEL'},'lowerCase')).toBe(true);
        }));    

//end        
    })

})
