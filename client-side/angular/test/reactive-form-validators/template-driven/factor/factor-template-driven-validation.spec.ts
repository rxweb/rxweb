import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { FactorValidationComponent } from './factor-template-driven.component';


describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error factor with blank value', fakeAsync(() => {
            const fixture = createInstance(FactorValidationComponent);
            expect(specTester(fixture, {firstNumber:25,fifthNumber:1},'rxfactor')).toBe(false);
            //expect(specTester(fixture, {firstNumber:25,fifthNumber:0},'rxfactor')).toBe(true);
            //expect(specTester(fixture, {firstNumber:25,thirdNumber:0},'rxfactor')).toBe(true);
            //expect(specTester(fixture, {firstNumber:25,thirdNumber:1},'rxfactor')).toBe(false);
            //expect(specTester(fixture, {firstNumber:26,thirdNumber:0},'rxfactor')).toBe(false);
            //expect(specTester(fixture, {fourthNumber:1},'rxfactor')).toBe(false);
            //expect(specTester(fixture, {fourthNumber:0},'rxfactor')).toBe(true);
            //expect(specTester(fixture, {sixthNumber:1},'rxfactor')).toBe(false);
            //expect(specTester(fixture, {sixthNumber:0},'rxfactor')).toBe(true);
        }));    

//end        
    })

})
