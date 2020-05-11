import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { OddValidationComponent } from './odd-template-driven.component';





describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error Odd with blank value', fakeAsync(() => {
            const fixture = createInstance(OddValidationComponent);
            expect(specTester(fixture, { type: 'Odd', oddNumber: 13 },'rxodd')).toBe(false);
            //expect(specTester(fixture, { type: 'Even', oddNumber: 12 },'rxodd')).toBe(false);
            //expect(specTester(fixture, { type: 'Odd', oddNumber: 23454 },'rxodd')).toBe(true);
            //expect(specTester(fixture, { multiplesOfOddNumber: 26 },'rxodd')).toBe(true);
        }));    

//end        
    })

})
