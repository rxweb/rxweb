import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { MaxDateValidationComponent } from './max-date-template-driven.component';





describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error maxDate with blank value', fakeAsync(() => {
            const fixture = createInstance(MaxDateValidationComponent);        
            expect(specTester(fixture, { allocationDate: "06/20/2018" },'rxmaxDate')).toBe(false);
            //expect(specTester(fixture, { allocationDate: "08/31/2018" },'rxmaxDate')).toBe(true);
            //expect(specTester(fixture, { userName: 'Bharat', admissionDate: "06/20/2018" },'rxmaxDate')).toBe(false);
            //expect(specTester(fixture, { userName: 'Naman', admissionDate: "08/31/2018" },'rxmaxDate')).toBe(false);
            //expect(specTester(fixture, { userName: 'Bharat', admissionDate: "08/31/2018" },'rxmaxDate')).toBe(true);
            //expect(specTester(fixture, { enrollmentDate: '04/06/2018', lastRegistrationDate: "02/05/2018" },'rxmaxDate')).toBe(false);
            //expect(specTester(fixture, { enrollmentDate: '04/06/2018', lastRegistrationDate: "08/07/2018" },'rxmaxDate')).toBe(true);
            //expect(specTester(fixture, { registrationDate: '08/31/2018' },'rxmaxDate')).toBe(true);
        }));    

//end        
    })

})
