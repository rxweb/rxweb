import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { PortValidationComponent } from './port-template-driven.component';







describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error port with blank value', fakeAsync(() => {
            const fixture = createInstance(PortValidationComponent);
            expect(specTester(fixture, { browser: 'Chrome', shoppingWebsitePort: 4200 },'rxport')).toBe(false);
            //expect(specTester(fixture, { browser: 'Firefox', shoppingWebsitePort: 600005 },'rxport')).toBe(false);
            //expect(specTester(fixture, { browser: 'Chrome', shoppingWebsitePort: 600005 },'rxport')).toBe(true);
       
            //expect(specTester(fixture, { educationalWebsitePort: 600005 },'rxport')).toBe(true);
        }));    

//end        
    })

})
