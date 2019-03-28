import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { MacValidationComponent } from './mac-template-driven.component';




describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error mac with blank value', fakeAsync(() => {
            const fixture = createInstance(MacValidationComponent);           
            expect(specTester(fixture, {device:'Laptop',localMacAddress:"E8:FC:AF:B9:BE:A2"},'mac')).toBe(false);
            expect(specTester(fixture, {device:'PC',localMacAddress:"E8:FC:AF:"},'mac')).toBe(false);
            expect(specTester(fixture, {device:'Laptop',localMacAddress:"E8:FC:AF:"},'mac')).toBe(true);
            expect(specTester(fixture, {systemMacAddress:'E8:FC:AF:'},'mac')).toBe(true);
        }));    

//end        
    })

})
