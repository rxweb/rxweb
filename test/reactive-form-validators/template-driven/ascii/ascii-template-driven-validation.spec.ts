import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { AsciiValidationComponent } from './ascii-template-driven.component';



describe('template-driven forms integration tests', () => {



    describe('basic functionality', () => {
        
        it('should not error ascii with blank value', fakeAsync(() => {
            const fixture = createInstance(AsciiValidationComponent);
            expect(specTester(fixture, {language: 'Java',alphabetAsciiCode:'65'},'ascii')).toBe(false);
            expect(specTester(fixture, {language: 'C#',alphabetAsciiCode:'王明'},'ascii')).toBe(false);
            expect(specTester(fixture, {language: 'Java',alphabetAsciiCode:'王明'},'ascii')).toBe(true);
           expect(specTester(fixture,{specialCharAsciiCode:'这是书'},'ascii')).toBe(true);
           
        }));

//end        
    })

})
