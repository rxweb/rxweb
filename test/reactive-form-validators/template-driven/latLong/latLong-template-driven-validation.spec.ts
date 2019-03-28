import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { LatLongValidationComponent } from './latLong-template-driven.component';




describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error latLong with blank value', fakeAsync(() => {
            const fixture = createInstance(LatLongValidationComponent);
            expect(specTester(fixture, {continent:'Asia',thirdCountry:"27.0238, 74.2179"},'latLong')).toBe(false);
            expect(specTester(fixture, {continent:'Antartica',thirdCountry:"8951"},'latLong')).toBe(false);
            expect(specTester(fixture, {continent:'Asia',thirdCountry:"8951"},'latLong')).toBe(true);
            expect(specTester(fixture, {firstCountry:'8951'},'latLong')).toBe(true);
        }));    

//end        
    })

})
