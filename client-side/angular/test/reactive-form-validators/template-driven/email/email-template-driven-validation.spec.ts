import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { EmailValidationComponent } from './email-template-driven.component';




describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error email with blank value', fakeAsync(() => {
            const fixture = createInstance(EmailValidationComponent);
            expect(specTester(fixture, { email: 'ushmidave@gmail.com' },'rxemail')).toBe(false);
            //expect(specTester(fixture, { email: 'ushmidavegmailcom' },'rxemail')).toBe(true);
            //expect(specTester(fixture, { email: 'abc@gmail.com', businessEmailAddress: 'xyz@gmail.com' },'rxemail')).toBe(false);
            //expect(specTester(fixture, { email: 'xyz@gmail.com', businessEmailAddress: 'xyzgmailcom' },'rxemail')).toBe(false);
            //expect(specTester(fixture, { email: 'abc@gmail.com', businessEmailAddress: 'xyzgmailcom' },'rxemail')).toBe(true);
            //expect(specTester(fixture, { otherEmailAddress: 'mnogmailcom' },'rxemail')).toBe(true);
        }));    

//end        
    })

})
