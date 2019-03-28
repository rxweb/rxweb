import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { AlphaNumericValidationComponent } from './alphaNumeric-template-driven.component';


describe('template-driven forms integration tests', () => {



    describe('basic functionality', () => {
        
        it('should not error alphaNumeric with blank value', fakeAsync(() => {
            const fixture = createInstance(AlphaNumericValidationComponent);
            expect(specTester(fixture, { areaName: '' }, 'alphaNumeric')).toBe(false);
            expect(specTester(fixture, { areaName: undefined }, 'alphaNumeric')).toBe(false);
            expect(specTester(fixture, { areaName: 'John' }, 'alphaNumeric')).toBe(false);
            expect(specTester(fixture, { areaName: null }, 'alphaNumeric')).toBe(false);
            expect(specTester(fixture, { areaName: 'John1' }, 'alphaNumeric')).toBe(false);
            expect(specTester(fixture, { areaName: 'John1@' }, 'alphaNumeric')).toBe(true);
           expect(specTester(fixture, {areaName: 'Delhi',cityCode:'DI'},'alphaNumeric')).toBe(false);
           expect(specTester(fixture,{areaName: 'Delhi',cityCode:'@DI'},'alphaNumeric')).toBe(true);
           expect(specTester(fixture,{areaName:'Mumbai',cityCode:'@DI'},'alphaNumeric')).toBe(false);
           expect(specTester(fixture,{flatAddress:'Victoria Park'},'alphaNumeric')).toBe(false);
           expect(specTester(fixture,{postalAddress:'1600 Amphi-theatre'},'alphaNumeric')).toBe(true);
     
        }));

//end        
    })

})
