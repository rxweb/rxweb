import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { DigitValidationComponent } from './digit-template-driven.component';



describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error digit with blank value', fakeAsync(() => {
            const fixture = createInstance(DigitValidationComponent);
            expect(specTester(fixture, { age: 21 },'rxdigit')).toBe(false);
            //expect(specTester(fixture, { age: '+91' },'rxdigit')).toBe(true);
            //expect(specTester(fixture, { age: 30, faxNumber: 13235551234 },'rxdigit')).toBe(false);
            //expect(specTester(fixture, { age: 20, faxNumber: '+13235551234' },'rxdigit')).toBe(false);
            //expect(specTester(fixture, { age: 30, faxNumber: '+13235551234' },'rxdigit')).toBe(true);
            //expect(specTester(fixture, { mobileNumber: '+9148848447878' },'rxdigit')).toBe(true);
        }));    

//end        
    })

})
