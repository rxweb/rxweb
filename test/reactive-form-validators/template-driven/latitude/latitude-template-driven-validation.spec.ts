import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { LatitudeValidationComponent } from './latitude-template-driven.component';

describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error latitude with blank value', fakeAsync(() => {
            const fixture = createInstance(LatitudeValidationComponent);
            expect(specTester(fixture, {continent:'Asia',thirdCountryLatitude:"38.8951"},'latitude')).toBe(false);
            expect(specTester(fixture, {continent:'Antartica',thirdCountryLatitude:"8951"},'latitude')).toBe(false);
            expect(specTester(fixture, {continent:'Asia',thirdCountryLatitude:"8951"},'latitude')).toBe(true);
            expect(specTester(fixture, {firstCountryLatitude:'8951'},'latitude')).toBe(true);
        }));    

//end        
    })

})
