import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { JsonValidationComponent } from './json-template-driven.component';





describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error json with blank value', fakeAsync(() => {
            const fixture = createInstance(JsonValidationComponent);
            expect(specTester(fixture, {location:'{CountryName:India}',locationJson:"{'Country':'India'}"},'json')).toBe(false);
            //expect(specTester(fixture, {location:'{CountryName:India}',locationJson:"{'Country':'Indi"},'json')).toBe(true);
           // expect(specTester(fixture, {contactJson:"{'Country':'Ind"},'json')).toBe(true);
        }));    

//end        
    })

})
