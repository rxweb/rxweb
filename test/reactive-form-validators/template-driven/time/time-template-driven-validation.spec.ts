import { fakeAsync, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgForm } from "@angular/forms"


import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { TimeValidationComponent } from './time-template-driven.component';


describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error time with blank value', fakeAsync(() => {
            const fixture = createInstance(TimeValidationComponent);
            expect(specTester(fixture, {totalOutTime:'20:05:33'},'time')).toBe(false);
            expect(specTester(fixture, {totalOutTime:'20:05'},'time')).toBe(true);
            expect(specTester(fixture, {entryPlace:'Lunch Room', entryTime:'20:25'},'time')).toBe(false);
            expect(specTester(fixture, {entryPlace:'Conference Room',entryTime:'20:25:02'},'time')).toBe(false);
            expect(specTester(fixture, {entryPlace:'Lunch Room',entryTime:'20:25:02'},'time')).toBe(true);
       
            expect(specTester(fixture,{exitTime:'20:25:02'},'time')).toBe(true);
        }));    

//end        
    })

})
