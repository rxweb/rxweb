import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { MaxLengthValidationComponent } from './max-length-template-driven.component';






describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error maxLength with blank value', fakeAsync(() => {
            const fixture = createInstance(MaxLengthValidationComponent);        
            expect(specTester(fixture, { firstName: "Ushmi" },'rxmaxLength')).toBe(false);
            //expect(specTester(fixture, { firstName: "SamanthaRuthPrabhu" },'rxmaxLength')).toBe(true);
            //expect(specTester(fixture, { firstName: 'Bharat', lastName: "Patel" },'rxmaxLength')).toBe(false);
            //expect(specTester(fixture, { firstName: 'Naman', lastName: "AtharintikiDaaredi" },'rxmaxLength')).toBe(false);
            //expect(specTester(fixture, { firstName: 'Bharat', lastName: "AtharintikiDaaredi" },'rxmaxLength')).toBe(true);
            //expect(specTester(fixture, { userName: 'Bharat.patel' },'rxmaxLength')).toBe(true);
        }));    

//end        
    })

})
