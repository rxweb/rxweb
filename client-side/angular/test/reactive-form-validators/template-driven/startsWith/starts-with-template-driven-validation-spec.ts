import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { StartsWithValidationComponent } from './starts-with-template-driven.component';


describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error startsWith with blank value', fakeAsync(() => {
            const fixture = createInstance(StartsWithValidationComponent);
            expect(specTester(fixture, { name: 'Bharat' },'rxstartsWith')).toBe(false);
            //expect(specTester(fixture, { name: 'Naman' },'rxstartsWith')).toBe(true);
            //expect(specTester(fixture, { name: 'Bharat', taskId: '#123' },'rxstartsWith')).toBe(false);
            //expect(specTester(fixture, { name: 'Bharat', taskId: '123' },'rxstartsWith')).toBe(false);
            //expect(specTester(fixture, { name: 'Bharat', taskId: '123' },'rxstartsWith')).toBe(true);
       
            //expect(specTester(fixture, { company: 'Microsoft' },'rxstartsWith')).toBe(true);
        }));    

//end        
    })

})
