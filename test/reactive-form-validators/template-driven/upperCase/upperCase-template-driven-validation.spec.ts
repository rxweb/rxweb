import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { UpperCaseValidationComponent } from './upperCase-template-driven.component';

describe('template-driven forms integration tests', () => {



    describe('basic functionality', () => {

        it('should not error upperCase with blank value', fakeAsync(() => {
            const fixture = createInstance(UpperCaseValidationComponent);
            expect(specTester(fixture, { countryName: 'AUSTRALIA' }, 'upperCase')).toBe(false);
            expect(specTester(fixture, { countryName: 'australia' }, 'upperCase')).toBe(true);
            expect(specTester(fixture, { countryName: 'INDIA',cityName:'MUMBAI'},'upperCase')).toBe(false);
            expect(specTester(fixture, { countryName: 'AUSTRALIA',cityName:'sydney'},'upperCase')).toBe(false);
            expect(specTester(fixture, { countryName: 'INDIA',cityName:'mumbai'},'upperCase')).toBe(true);
            expect(specTester(fixture, { colonyName: 'BANDRA' }, 'upperCase')).toBe(false);
            expect(specTester(fixture, { colonyName: 'versova' }, 'upperCase')).toBe(true);
        }));
        //end        
    })

})