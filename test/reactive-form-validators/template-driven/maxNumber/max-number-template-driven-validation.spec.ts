import { fakeAsync, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgForm } from "@angular/forms"


import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { MaxNumberValidationComponent } from './max-number-template-driven.component';



describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error maxNumber with blank value', fakeAsync(() => {
            const fixture = createInstance(MaxNumberValidationComponent);        
            expect(specTester(fixture, {passingMarks:10},'maxNumber')).toBe(false);
            expect(specTester(fixture, {passingMarks:100},'maxNumber')).toBe(true);
            expect(specTester(fixture, {subjectCode:'8CS5A',obtainedMarks:90},'maxNumber')).toBe(false);
            expect(specTester(fixture, {subjectCode:'8CF5A',obtainedMarks:105},'maxNumber')).toBe(false);
            expect(specTester(fixture, {subjectCode:'8CS5A',obtainedMarks:105},'maxNumber')).toBe(true);
            expect(specTester(fixture, {practicalMarks:75},'maxNumber')).toBe(true);
        }));    

//end        
    })

})
