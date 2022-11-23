import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { MinLengthValidationComponent } from './min-length-template-driven.component';


describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error minLength with blank value', fakeAsync(() => {
            const fixture = createInstance(MinLengthValidationComponent);        
            expect(specTester(fixture, { mobileNo: 9898065021 },'rxminLength')).toBe(false);
            //expect(specTester(fixture, { mobileNo: 989806 },'rxminLength')).toBe(true);
            //expect(specTester(fixture, { countryName: 'India', stateCode: "IND" },'rxminLength')).toBe(false);
            //expect(specTester(fixture, { countryName: 'Australia', stateCode: "AU" },'rxminLength')).toBe(false);
            //expect(specTester(fixture, { countryName: 'India', stateCode: "IN" },'rxminLength')).toBe(true);
            //expect(specTester(fixture, { landLineNo: 266 },'rxminLength')).toBe(true);
        }));    

//end        
    })

})
