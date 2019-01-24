import { fakeAsync, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgForm } from "@angular/forms"


import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { LessThanValidationComponent } from './less-than-template-driven.component';





describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error lessThan with blank value', fakeAsync(() => {
            const fixture = createInstance(LessThanValidationComponent);
            expect(specTester(fixture, {obtainedMarks:33,otherActivityMarks:26},'lessThan')).toBe(false);
            expect(specTester(fixture, {obtainedMarks:100,otherActivityMarks:105},'lessThan')).toBe(true);
            expect(specTester(fixture, {obtainedMarks:33,passingMarks:32},'lessThan')).toBe(false);
            expect(specTester(fixture, {obtainedMarks:50,passingMarks:55},'lessThan')).toBe(false);
            expect(specTester(fixture, {obtainedMarks:33,passingMarks:35},'lessThan')).toBe(true);
            expect(specTester(fixture, {obtainedMarks:10,otherMarks:15},'lessThan')).toBe(true);
        }));    

//end        
    })

})
