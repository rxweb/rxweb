import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { NumericValidationComponent } from './numeric-template-driven.component';



describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error numeric with blank value', fakeAsync(() => {
            const fixture = createInstance(NumericValidationComponent);        
            expect(specTester(fixture, {negativeNumber:-55},'numeric')).toBe(false);
            expect(specTester(fixture, {negativeNumber:55},'numeric')).toBe(true);
            expect(specTester(fixture, {decimalNumber:5.5},'numeric')).toBe(false);
            expect(specTester(fixture, {decimalNumber:-55},'numeric')).toBe(true);
            expect(specTester(fixture, {dataType:'Real',realNumber:90},'numeric')).toBe(false);
            expect(specTester(fixture, {dataType:'Decimal',realNumber:-20.5},'numeric')).toBe(false);
            expect(specTester(fixture, {positiveNumber:-30},'numeric')).toBe(true);
        }));    

//end        
    })

})
