import { fakeAsync} from '@angular/core/testing';

import { AlphaValidationComponent } from "./alpha-decorator-based-template-driven.components"
import { specTester } from "../../spec-tester"
import { createInstance } from "../../component-provider"


describe('decorator based template-driven forms integration tests', () => {



    describe('basic functionality', () => {
        
        it('should not error alpha with blank value', fakeAsync(() => {
            const fixture = createInstance(AlphaValidationComponent);
            expect(specTester(fixture, { countryName: '' }, 'alpha')).toBe(false);
            expect(specTester(fixture, { countryName: undefined }, 'alpha')).toBe(false);
            expect(specTester(fixture, { countryName: 'John' }, 'alpha')).toBe(false);
            expect(specTester(fixture, { countryName: null }, 'alpha')).toBe(false);
            expect(specTester(fixture, { countryName: 'John1' }, 'alpha')).toBe(true);
            expect(specTester(fixture, { countryName: 'John1@' }, 'alpha')).toBe(true);
        
        }));

//end        
    })

})
