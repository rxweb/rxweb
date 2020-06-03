import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { PasswordValidationComponent } from './password-template-driven.component';





describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error password with blank value', fakeAsync(() => {
            const fixture = createInstance(PasswordValidationComponent);
            expect(specTester(fixture, { newPassword: 'User@123' },'rxpassword')).toBe(false);
            //expect(specTester(fixture, { newPassword: 'User' },'rxpassword')).toBe(true);
            //expect(specTester(fixture, { oldPassword: 'Admin@123' },'rxpassword')).toBe(false);
            //expect(specTester(fixture, { oldPassword: 'Admin' },'rxpassword')).toBe(true);
        }));    

//end        
    })

})
