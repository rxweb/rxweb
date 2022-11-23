import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { AlphaNumericValidationComponent } from './alphaNumeric-template-driven.component';


describe('template-driven forms integration tests', () => {



    describe('basic functionality', () => {
        
        it('should not error alphaNumeric with blank value', fakeAsync(() => {
            const fixture = createInstance(AlphaNumericValidationComponent);
            expect(specTester(fixture, { areaName: '' }, 'rxalphaNumeric')).toBe(false);
            //expect(specTester(fixture, { areaName: undefined }, 'rxalphaNumeric')).toBe(false);
            //expect(specTester(fixture, { areaName: 'John' }, 'rxalphaNumeric')).toBe(false);
            //expect(specTester(fixture, { areaName: null }, 'rxalphaNumeric')).toBe(false);
            //expect(specTester(fixture, { areaName: 'John1' }, 'rxalphaNumeric')).toBe(false);
            //expect(specTester(fixture, { areaName: 'John1@' }, 'rxalphaNumeric')).toBe(true);
            //expect(specTester(fixture, { areaName: 'Delhi', cityCode: 'DI' },'rxalphaNumeric')).toBe(false);
            //expect(specTester(fixture, { areaName: 'Delhi', cityCode: '@DI' },'rxalphaNumeric')).toBe(true);
            //expect(specTester(fixture, { areaName: 'Mumbai', cityCode: '@DI' },'rxalphaNumeric')).toBe(false);
            //expect(specTester(fixture, { flatAddress: 'Victoria Park' },'rxalphaNumeric')).toBe(false);
            //expect(specTester(fixture, { postalAddress: '1600 Amphi-theatre' },'rxalphaNumeric')).toBe(true);
     
        }));

//end        
    })

})
