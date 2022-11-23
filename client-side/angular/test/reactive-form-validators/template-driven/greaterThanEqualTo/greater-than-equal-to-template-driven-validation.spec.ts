import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { GreaterThanEqualToValidationComponent } from './greater-than-equal-to-template-driven.component';



describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error greaterThanEqualTo with blank value', fakeAsync(() => {
            const fixture = createInstance(GreaterThanEqualToValidationComponent);
            expect(specTester(fixture, { admissionAge: 25, retiermentAge: 26 },'rxgreaterThanEqualTo')).toBe(false);
            //expect(specTester(fixture, { admissionAge: 25, retiermentAge: 20 },'rxgreaterThanEqualTo')).toBe(true);
            //expect(specTester(fixture, { admissionAge: 25, memberAge: 0 },'rxgreaterThanEqualTo')).toBe(true);
            //expect(specTester(fixture, { admissionAge: 25, memberAge: 25 },'rxgreaterThanEqualTo')).toBe(false);
            //expect(specTester(fixture, { admissionAge: 10, memberAge: 1 },'rxgreaterThanEqualTo')).toBe(false);
            //expect(specTester(fixture, { admissionAge: 10, otherAge: 1 },'rxgreaterThanEqualTo')).toBe(true);
        }));    

//end        
    })

})
