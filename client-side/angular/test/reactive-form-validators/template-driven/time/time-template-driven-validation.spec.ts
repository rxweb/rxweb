import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { TimeValidationComponent } from './time-template-driven.component';


describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error time with blank value', fakeAsync(() => {
            const fixture = createInstance(TimeValidationComponent);
            expect(specTester(fixture, { totalOutTime: '20:05:33' },'rxtime')).toBe(false);
            //expect(specTester(fixture, { totalOutTime: '20:05' },'rxtime')).toBe(true);
            //expect(specTester(fixture, { entryPlace: 'Lunch Room', entryTime: '20:25' },'rxtime')).toBe(false);
            //expect(specTester(fixture, { entryPlace: 'Conference Room', entryTime: '20:25:02' },'rxtime')).toBe(false);
            //expect(specTester(fixture, { entryPlace: 'Lunch Room', entryTime: '20:25:02' },'rxtime')).toBe(true);
       
            //expect(specTester(fixture, { exitTime: '20:25:02' },'rxtime')).toBe(true);
        }));    

//end        
    })

})
