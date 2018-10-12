import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,
} from '@rxweb/reactive-form-validators';

import { SubjectDetails } from './subject-details.model';

@Component({
    selector: 'app-maxNumber-dynamic',
    templateUrl: './max-number-dynamic.component.html'
})
export class MaxNumberDynamicComponent implements OnInit {

    subjectDetailsFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let subjectDetails = new SubjectDetails();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			maximumMarks : {
				maxNumber :  {value:100,conditionalExpression:(x,y) =>{ return   x.subjectCode == "8CS5A" },} 
			},
						
			obtainedMarks : {
				maxNumber :  {value:100,conditionalExpression:x => x.subjectCode == "8CS5A",} 
			},
						
			passingMarks : {
				maxNumber :  {value:50,message:'{{0}} exceeds the Maximum marks Limit',} 
			},
			        };
		this.subjectDetailsFormGroup = this.formBuilder.formGroup(subjectDetails,formBuilderConfiguration);
    }
}
