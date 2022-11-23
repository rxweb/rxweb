import { fakeAsync} from '@angular/core/testing';


import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { HexColorValidationComponent } from './hex-color-template-driven.component';




describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error hexColor with blank value', fakeAsync(() => {
            const fixture = createInstance(HexColorValidationComponent);
            expect(specTester(fixture, { color: '#AFAFAF' },'rxhexColor')).toBe(false);
            //expect(specTester(fixture, { color: '#AF' },'rxhexColor')).toBe(true);
            //expect(specTester(fixture, { color: '#AFAFAF', headerHexcolorCode: '#DD' },'rxhexColor')).toBe(true);
            //expect(specTester(fixture, { color: '#DD', headerHexcolorCode: '#DD' },'rxhexColor')).toBe(false);
            //expect(specTester(fixture, { color: '#AFAFAF', headerHexcolorCode: '#ffff00' },'rxhexColor')).toBe(false);
            //expect(specTester(fixture, { bodyHexcolorCode: 'AF' },'rxhexColor')).toBe(true);
        }));    

//end        
    })

})
