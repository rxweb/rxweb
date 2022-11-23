import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { LongitudeValidationComponent } from './longitude-template-driven.component';


describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error longitude with blank value', fakeAsync(() => {
            const fixture = createInstance(LongitudeValidationComponent);
            expect(specTester(fixture, { continent: 'Asia', thirdCountryLongitude: "-77.0364" },'longitude')).toBe(false);
            //expect(specTester(fixture, { continent: 'Antartica', thirdCountryLongitude: "8951" },'rxlongitude')).toBe(false);
            //expect(specTester(fixture, { continent: 'Asia', thirdCountryLongitude: "8951" },'rxlongitude')).toBe(true);
            //expect(specTester(fixture, { firstCountryLongitude: '8951' },'rxlongitude')).toBe(true);
        }));    

//end        
    })

})
