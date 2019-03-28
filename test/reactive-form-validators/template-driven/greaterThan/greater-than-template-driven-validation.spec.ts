import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { GreaterThanValidationComponent } from './greater-than-template-driven.component';




describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error greaterThan with blank value', fakeAsync(() => {
            const fixture = createInstance(GreaterThanValidationComponent);
            expect(specTester(fixture, {age:25,retiermentAge:26},'greaterThan')).toBe(false);
            expect(specTester(fixture, {age:25,retiermentAge:20},'greaterThan')).toBe(true);
            expect(specTester(fixture, {age:25,voterAge:0},'greaterThan')).toBe(true);
            expect(specTester(fixture, {age:25,voterAge:26},'greaterThan')).toBe(false);
            expect(specTester(fixture, {age:10,voterAge:1},'greaterThan')).toBe(false);
            expect(specTester(fixture, {age:10,otherAge:1},'greaterThan')).toBe(true);
        }));    

//end        
    })

})
