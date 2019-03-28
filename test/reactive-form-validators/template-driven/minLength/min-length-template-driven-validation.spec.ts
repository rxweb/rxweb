import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { MinLengthValidationComponent } from './min-length-template-driven.component';


describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error minLength with blank value', fakeAsync(() => {
            const fixture = createInstance(MinLengthValidationComponent);        
            expect(specTester(fixture, {mobileNo:9898065021},'minLength')).toBe(false);
            expect(specTester(fixture, {mobileNo:989806},'minLength')).toBe(true);
            expect(specTester(fixture, {countryName:'India',stateCode:"IND"},'minLength')).toBe(false);
            expect(specTester(fixture, {countryName:'Australia',stateCode:"AU"},'minLength')).toBe(false);
            expect(specTester(fixture, {countryName:'India',stateCode:"IN"},'minLength')).toBe(true);
            expect(specTester(fixture, {landLineNo:266},'minLength')).toBe(true);
        }));    

//end        
    })

})
