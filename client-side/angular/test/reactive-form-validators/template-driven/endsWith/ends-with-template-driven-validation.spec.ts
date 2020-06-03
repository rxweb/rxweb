import { fakeAsync} from '@angular/core/testing';


import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { EnsWithValidationComponent } from './ends-with-template-driven.component';





describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error endsWith with blank value', fakeAsync(() => {
            const fixture = createInstance(EnsWithValidationComponent);
            expect(specTester(fixture, { name: 'Bharat' },'rxendsWith')).toBe(false);
            //expect(specTester(fixture, { name: 'Ushmi' },'rxendsWith')).toBe(true);
            //expect(specTester(fixture, { name: 'Bharat', taskId: '123451' },'rxendsWith')).toBe(false);
            //expect(specTester(fixture, { name: 'Ushmi', taskId: '2345' },'rxendsWith')).toBe(false);
            //expect(specTester(fixture, { name: 'Bharat', taskId: '2345' },'rxendsWith')).toBe(true);
            //expect(specTester(fixture, { company: 'Google' },'rxendsWith')).toBe(true);
        }));    

//end        
    })

})
