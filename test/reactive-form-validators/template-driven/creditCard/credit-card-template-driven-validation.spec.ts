import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { CreditCardValidationComponent } from './credit-card-template-driven.component';



describe('template-driven forms integration tests', () => {



    describe('basic functionality', () => {
        
        it('should not error creditCard with blank value', fakeAsync(() => {
            const fixture = createInstance(CreditCardValidationComponent);
            expect(specTester(fixture, {cardType: 'Visa',otherVisaCard:4111111111111111},'creditCard')).toBe(false);
            expect(specTester(fixture, {cardType: 'Meastro',otherVisaCard:4111111},'creditCard')).toBe(false);
   
        }));

//end        
    })

})
