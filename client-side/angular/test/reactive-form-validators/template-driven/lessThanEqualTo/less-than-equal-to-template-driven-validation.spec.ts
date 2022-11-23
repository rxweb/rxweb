import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { LessThanEqualToValidationComponent } from './less-than-equal-to-template-driven.component';




describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error lessThanEqualTo with blank value', fakeAsync(() => {
            const fixture = createInstance(LessThanEqualToValidationComponent);
            expect(specTester(fixture, { totalMarks: 100, passingMarks: 26 },'rxlessThanEqualTo')).toBe(false);
            //expect(specTester(fixture, { totalMarks: 100, passingMarks: 105 },'rxlessThanEqualTo')).toBe(true);
            //expect(specTester(fixture, { totalMarks: 100, practicalExamMarks: 91 },'rxlessThanEqualTo')).toBe(false);
            //expect(specTester(fixture, { totalMarks: 25, practicalExamMarks: 26 },'rxlessThanEqualTo')).toBe(false);
            //expect(specTester(fixture, { totalMarks: 100, practicalExamMarks: 109 },'rxlessThanEqualTo')).toBe(true);
            //expect(specTester(fixture, { totalMarks: 10, otherMarks: 15 },'rxlessThanEqualTo')).toBe(true);
        }));    

//end        
    })

})
