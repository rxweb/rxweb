import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration  } from '@rxweb/reactive-form-validators';

import { SubjectDetails } from '../subject-details.model';

@Component({
    selector: 'app-subject-details-add',
    templateUrl: './subject-details-add.component.html'
})
export class SubjectDetailsAddComponent implements OnInit {

    subjectDetailsFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let subjectDetails = new SubjectDetails();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.validations = {
			maximumMarks : {
				maxNumber :  {value:100,conditionalExpressions:'x => x.subjectCode == "8CS5A"',} 
			},
			passingMarks : {
				maxNumber :  {value:50,message:'{{0}} exceeds the Maximum Students Limit',} 
			},
        };
		this.subjectDetailsFormGroup = this.formBuilder.formGroup(subjectDetails,formBuilderConfiguration);
    }
}
