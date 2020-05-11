import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { PrimeNumberValidationComponent } from './prime-number-template-driven.component';







describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error primeNumber with blank value', fakeAsync(() => {
            const fixture = createInstance(PrimeNumberValidationComponent);
            expect(specTester(fixture, { numberType: 'Prime', thirdNumber: 2 },'rxprimeNumber')).toBe(false);
            //expect(specTester(fixture, { numberType: 'Composite', thirdNumber: 1 },'rxprimeNumber')).toBe(false);
            //expect(specTester(fixture, { numberType: 'Prime', thirdNumber: 1 },'rxprimeNumber')).toBe(true);
       
            //expect(specTester(fixture, { firstNumber: 1 },'rxprimeNumber')).toBe(true);
        }));    

//end        
    })

})
