import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { SubjectDetails } from './subject-details.model';

@Component({
    selector: 'app-maxNumber-complete-template-driven-validation-directives',
    templateUrl: './max-number-complete.component.html'
})
export class MaxNumberCompleteTemplateDrivenValidationDirectivesComponent implements OnInit {
    subjectdetails: SubjectDetails
	
    constructor(
    ) { }

    ngOnInit() {
       this.subjectdetails= new SubjectDetails()
    }
}
