import { fakeAsync } from '@angular/core/testing';
import { AlphaValidationComponent } from "./alpha-template-driven.components"
import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"


describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {

        it('should not error alpha with blank value', fakeAsync(() => {
            const fixture = createInstance(AlphaValidationComponent);
            expect(specTester(fixture, { countryName: '' }, 'alpha')).toBe(false);
            //expect(specTester(fixture, { countryName: undefined }, 'rxalpha')).toBe(false);
            //expect(specTester(fixture, { countryName: 'John' }, 'rxalpha')).toBe(false);
            //expect(specTester(fixture, { countryName: null }, 'rxalpha')).toBe(false);
            //expect(specTester(fixture, { countryName: 'John1' }, 'alpha')).toBe(true);
            //expect(specTester(fixture, { countryName: 'John1@' }, 'rxalpha')).toBe(true);

        }));

        //end        
    })

})
