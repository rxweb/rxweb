import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { RangeValidationComponent } from './range-template-driven.component';

describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error range with blank value', fakeAsync(() => {
            const fixture = createInstance(RangeValidationComponent);
            expect(specTester(fixture, { age: 20 },'rxrange')).toBe(false);
            //expect(specTester(fixture, { age: 10 },'rxrange')).toBe(true);
            //expect(specTester(fixture, { age: 25, experience: 3 },'rxrange')).toBe(false);
            //expect(specTester(fixture, { age: 23, experience: 0 },'rxrange')).toBe(false);
            //expect(specTester(fixture, { age: 25, experience: 0 },'rxrange')).toBe(true);
       
            //expect(specTester(fixture, { salary: 1 },'rxrange')).toBe(true);
        }));    

//end        
    })

})
