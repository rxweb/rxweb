import { fakeAsync} from '@angular/core/testing';


import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { LowerCaseValidationComponent } from './lowerCase-template-driven.component';



describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error lowerCase with blank value', fakeAsync(() => {
            const fixture = createInstance(LowerCaseValidationComponent);
            expect(specTester(fixture, { username: 'bharat' },'rxlowerCase')).toBe(false);
            //expect(specTester(fixture, { username: 'BHARAT' },'rxlowerCase')).toBe(true);
            
            //expect(specTester(fixture, { username: 'jonathan.feldman', middleName: "bharat" },'rxlowerCase')).toBe(false);
            //expect(specTester(fixture, { username: 'jonhan.feldman', middleName: "BHARAT" },'rxlowerCase')).toBe(false);
            //expect(specTester(fixture, { username: 'jonathan.feldman', middleName: "BHARAT" },'rxlowerCase')).toBe(true);
            //expect(specTester(fixture, { lastName: 'PATEL' },'rxlowerCase')).toBe(true);
        }));    

//end        
    })

})
