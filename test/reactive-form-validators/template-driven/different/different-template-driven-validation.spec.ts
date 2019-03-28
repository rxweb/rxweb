import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { DifferentValidationComponent } from './different-template-driven.component';







describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error different with blank value', fakeAsync(() => {
            const fixture = createInstance(DifferentValidationComponent);
            expect(specTester(fixture, {firstName:'Bharat',lastName:'Patel'},'different')).toBe(false);
            expect(specTester(fixture, {firstName:'Bharat',lastName:'Bharat'},'different')).toBe(true);
            expect(specTester(fixture, {firstName:'Bharat',middleName:'Bharat'},'different')).toBe(true);
            expect(specTester(fixture, {firstName:'Bharat',middleName:'Mukesh'},'different')).toBe(false);
        }));    

//end        
    })

})
