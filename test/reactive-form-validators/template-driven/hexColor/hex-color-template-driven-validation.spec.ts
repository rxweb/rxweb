import { fakeAsync, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgForm } from "@angular/forms"


import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { HexColorValidationComponent } from './hex-color-template-driven.component';




describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error hexColor with blank value', fakeAsync(() => {
            const fixture = createInstance(HexColorValidationComponent);
            expect(specTester(fixture, {color:'#AFAFAF'},'hexColor')).toBe(false);
            expect(specTester(fixture, {color:'#AF'},'hexColor')).toBe(true);
            expect(specTester(fixture, {color:'#AFAFAF',headerHexcolorCode:'#DD'},'hexColor')).toBe(true);
            expect(specTester(fixture, {color:'#DD',headerHexcolorCode:'#DD'},'hexColor')).toBe(false);
            expect(specTester(fixture, {color:'#AFAFAF',headerHexcolorCode:'#ffff00'},'hexColor')).toBe(false);
            expect(specTester(fixture, {bodyHexcolorCode:'AF'},'hexColor')).toBe(true);
        }));    

//end        
    })

})
