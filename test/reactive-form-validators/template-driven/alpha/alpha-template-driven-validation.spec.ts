import { fakeAsync} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgForm } from "@angular/forms"

import { AlphaValidationComponent, Location } from "./alpha-template-driven.components"
import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"


describe('template-driven forms integration tests', () => {



    describe('basic functionality', () => {
        
        it('should not error alpha with blank value', fakeAsync(() => {
            const fixture = createInstance(AlphaValidationComponent);
            expect(specTester(fixture, { areaName: '' }, 'alphaNumeric')).toBe(false);
            expect(specTester(fixture, { areaName: undefined }, 'alphaNumeric')).toBe(false);
            expect(specTester(fixture, { areaName: 'John' }, 'alphaNumeric')).toBe(false);
            expect(specTester(fixture, { areaName: null }, 'alphaNumeric')).toBe(false);
            expect(specTester(fixture, { areaName: 'John1' }, 'alphaNumeric')).toBe(false);
            expect(specTester(fixture, { areaName: 'John1@' }, 'alphaNumeric')).toBe(true);
        }));

//end        
    })

})
