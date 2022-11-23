import { fakeAsync} from '@angular/core/testing';

import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { MaxNumberValidationComponent } from './max-number-template-driven.component';



describe('template-driven forms integration tests', () => {

    describe('basic functionality', () => {
        
        it('should not error maxNumber with blank value', fakeAsync(() => {
            const fixture = createInstance(MaxNumberValidationComponent);        
            expect(specTester(fixture, { passingMarks: 10 },'rxmaxNumber')).toBe(false);
            //expect(specTester(fixture, { passingMarks: 100 },'rxmaxNumber')).toBe(true);
            //expect(specTester(fixture, { subjectCode: '8CS5A', obtainedMarks: 90 },'rxmaxNumber')).toBe(false);
            //expect(specTester(fixture, { subjectCode: '8CF5A', obtainedMarks: 105 },'rxmaxNumber')).toBe(false);
            //expect(specTester(fixture, { subjectCode: '8CS5A', obtainedMarks: 105 },'rxmaxNumber')).toBe(true);
            //expect(specTester(fixture, { practicalMarks: 75 },'rxmaxNumber')).toBe(true);
        }));    

//end        
    })

})
