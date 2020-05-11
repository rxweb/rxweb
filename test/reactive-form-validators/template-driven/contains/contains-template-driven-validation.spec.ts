import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { ContainsValidationComponent } from './contains-template-driven.component';





describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error contains with blank value', fakeAsync(() => {
            const fixture = createInstance(ContainsValidationComponent);
            expect(specTester(fixture, { emailAddress: 'abc@gmail.com' },'rxcontains')).toBe(false);
            //expect(specTester(fixture, { recoveryEmailAddress: 'ushmidave@gmail.com' },'rxcontains')).toBe(false);
            //expect(specTester(fixture, { otherEmailAddress: 'ushmidave@hotmail.com' },'rxcontains')).toBe(true);
        }));    

//end        
    })

})
