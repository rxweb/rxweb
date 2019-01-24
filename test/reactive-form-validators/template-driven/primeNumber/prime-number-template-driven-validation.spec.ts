import { fakeAsync, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgForm } from "@angular/forms"


import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { PrimeNumberValidationComponent } from './prime-number-template-driven.component';







describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error primeNumber with blank value', fakeAsync(() => {
            const fixture = createInstance(PrimeNumberValidationComponent);
            expect(specTester(fixture, {numberType:'Prime', thirdNumber:2},'primeNumber')).toBe(false);
            expect(specTester(fixture, {numberType:'Composite',thirdNumber:1},'primeNumber')).toBe(false);
            expect(specTester(fixture, {numberType:'Prime',thirdNumber:1},'primeNumber')).toBe(true);
       
            expect(specTester(fixture,{firstNumber:1},'primeNumber')).toBe(true);
        }));    

//end        
    })

})
