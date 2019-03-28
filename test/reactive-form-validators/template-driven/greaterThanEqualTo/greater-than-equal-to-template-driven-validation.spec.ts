import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { GreaterThanEqualToValidationComponent } from './greater-than-equal-to-template-driven.component';



describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error greaterThanEqualTo with blank value', fakeAsync(() => {
            const fixture = createInstance(GreaterThanEqualToValidationComponent);
            expect(specTester(fixture, {admissionAge:25,retiermentAge:26},'greaterThanEqualTo')).toBe(false);
            expect(specTester(fixture, {admissionAge:25,retiermentAge:20},'greaterThanEqualTo')).toBe(true);
            expect(specTester(fixture, {admissionAge:25,memberAge:0},'greaterThanEqualTo')).toBe(true);
            expect(specTester(fixture, {admissionAge:25,memberAge:25},'greaterThanEqualTo')).toBe(false);
            expect(specTester(fixture, {admissionAge:10,memberAge:1},'greaterThanEqualTo')).toBe(false);
            expect(specTester(fixture, {admissionAge:10,otherAge:1},'greaterThanEqualTo')).toBe(true);
        }));    

//end        
    })

})
