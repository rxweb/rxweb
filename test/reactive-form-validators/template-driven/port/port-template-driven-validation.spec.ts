import { fakeAsync, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgForm } from "@angular/forms"


import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { PortValidationComponent } from './port-template-driven.component';







describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error port with blank value', fakeAsync(() => {
            const fixture = createInstance(PortValidationComponent);
            expect(specTester(fixture, {browser:'Chrome', shoppingWebsitePort:4200},'port')).toBe(false);
            expect(specTester(fixture, {browser:'Firefox',shoppingWebsitePort:600005},'port')).toBe(false);
            expect(specTester(fixture, {browser:'Chrome',shoppingWebsitePort:600005},'port')).toBe(true);
       
            expect(specTester(fixture,{educationalWebsitePort:600005},'port')).toBe(true);
        }));    

//end        
    })

})
