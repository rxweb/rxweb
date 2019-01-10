import { fakeAsync, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgForm } from "@angular/forms"


import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { DigitValidationComponent } from './digit-template-driven.component';



describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error digit with blank value', fakeAsync(() => {
            const fixture = createInstance(DigitValidationComponent);
            expect(specTester(fixture, {age:21},'digit')).toBe(false);
            expect(specTester(fixture, {age:'+91'},'digit')).toBe(true);
            expect(specTester(fixture, {age:30,faxNumber:13235551234},'digit')).toBe(false);
            expect(specTester(fixture, {age:20,faxNumber:'+13235551234'},'digit')).toBe(false);
            expect(specTester(fixture, {age:30,faxNumber:'+13235551234'},'digit')).toBe(true);
            expect(specTester(fixture,{mobileNumber:'+9148848447878'},'digit')).toBe(true);
        }));    

//end        
    })

})
