import { fakeAsync} from '@angular/core/testing';


import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { CompareValidationComponent } from './compare-template-driven.component';




describe('template-driven forms integration tests', () => {



    describe('basic functionality', () => {
        
        it('should not error compare with blank value', fakeAsync(() => {
            const fixture = createInstance(CompareValidationComponent);
            expect(specTester(fixture, {email: 'ushmidave@gmail.com',confirmEmail:'ushmidave@gmail.com'},'compare')).toBe(false);
            expect(specTester(fixture, {password: 'User@123',confirmPassword:'User@123'},'compare')).toBe(false);
            expect(specTester(fixture, {password: 'User@123',confirmPassword:'User@123'},'compare')).toBe(false);     
    
        }));

//end        
    })

})
