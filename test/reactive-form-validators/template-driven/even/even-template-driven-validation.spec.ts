import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { EvenValidationComponent } from './even-template-driven.component';






describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error even with blank value', fakeAsync(() => {
            const fixture = createInstance(EvenValidationComponent);
            expect(specTester(fixture, { type: 'Even', evenNumber: 12 },'rxeven')).toBe(false);
            //expect(specTester(fixture, { type: 'Odd', evenNumber: 13 },'rxeven')).toBe(false);
            //expect(specTester(fixture, { type: 'Even', evenNumber: 2345 },'rxeven')).toBe(true);
            //expect(specTester(fixture, { multiplesOfEvenNumber: 25 },'rxeven')).toBe(true);
        }));    

//end        
    })

})
