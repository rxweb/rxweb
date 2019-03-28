import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { LeapYearValidationComponent } from './leapYear-template-driven.component';



describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error LeapYear with blank value', fakeAsync(() => {
            const fixture = createInstance(LeapYearValidationComponent);
            expect(specTester(fixture, {name:'Bharat',admissionYear:2004},'leapYear')).toBe(false);
            expect(specTester(fixture, {name:'Naman',admissionYear:2001},'leapYear')).toBe(false);
            expect(specTester(fixture, {name:'Bharat',admissionYear:2001},'leapYear')).toBe(true);
            expect(specTester(fixture, {joiningYear:2001},'leapYear')).toBe(true);
        }));    

//end        
    })

})
