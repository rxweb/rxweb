import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { LeapYearValidationComponent } from './leapYear-template-driven.component';



describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error LeapYear with blank value', fakeAsync(() => {
            const fixture = createInstance(LeapYearValidationComponent);
            expect(specTester(fixture, { name: 'Bharat', admissionYear: 2004 },'rxleapYear')).toBe(false);
            //expect(specTester(fixture, { name: 'Naman', admissionYear: 2001 },'rxleapYear')).toBe(false);
            //expect(specTester(fixture, { name: 'Bharat', admissionYear: 2001 },'rxleapYear')).toBe(true);
            //expect(specTester(fixture, { joiningYear: 2001 },'rxleapYear')).toBe(true);
        }));    

//end        
    })

})
