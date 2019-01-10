import { fakeAsync, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgForm } from "@angular/forms"


import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { LessThanEqualToValidationComponent } from './less-than-equal-to-template-driven.component';




describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error lessThanEqualTo with blank value', fakeAsync(() => {
            const fixture = createInstance(LessThanEqualToValidationComponent);
            expect(specTester(fixture, {totalMarks:100,passingMarks:26},'lessThanEqualTo')).toBe(false);
            expect(specTester(fixture, {totalMarks:100,passingMarks:105},'lessThanEqualTo')).toBe(true);
            expect(specTester(fixture, {totalMarks:100,practicalExamMarks:91},'lessThanEqualTo')).toBe(false);
            expect(specTester(fixture, {totalMarks:25,practicalExamMarks:26},'lessThanEqualTo')).toBe(false);
            expect(specTester(fixture, {totalMarks:100,practicalExamMarks:109},'lessThanEqualTo')).toBe(true);
            expect(specTester(fixture, {totalMarks:10,otherMarks:15},'lessThanEqualTo')).toBe(true);
        }));    

//end        
    })

})
