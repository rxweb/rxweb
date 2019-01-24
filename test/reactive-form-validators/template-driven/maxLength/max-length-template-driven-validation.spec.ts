import { fakeAsync, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgForm } from "@angular/forms"


import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { MaxLengthValidationComponent } from './max-length-template-driven.component';






describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error maxLength with blank value', fakeAsync(() => {
            const fixture = createInstance(MaxLengthValidationComponent);        
            expect(specTester(fixture, {firstName:"Ushmi"},'maxLength')).toBe(false);
            expect(specTester(fixture, {firstName:"SamanthaRuthPrabhu"},'maxLength')).toBe(true);
            expect(specTester(fixture, {firstName:'Bharat',lastName:"Patel"},'maxLength')).toBe(false);
            expect(specTester(fixture, {firstName:'Naman',lastName:"AtharintikiDaaredi"},'maxLength')).toBe(false);
            expect(specTester(fixture, {firstName:'Bharat',lastName:"AtharintikiDaaredi"},'maxLength')).toBe(true);
            expect(specTester(fixture, {userName:'Bharat.patel'},'maxLength')).toBe(true);
        }));    

//end        
    })

})
