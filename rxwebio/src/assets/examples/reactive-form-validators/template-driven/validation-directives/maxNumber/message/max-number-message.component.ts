import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { SubjectDetails } from './subject-details.model';

@Component({
    selector: 'app-maxNumber-message-template-driven-validation-directives',
    templateUrl: './max-number-message.component.html'
})
export class MaxNumberMessageTemplateDrivenValidationDirectivesComponent implements OnInit {
    subjectdetails: SubjectDetails
	
    constructor(
    ) { }

    ngOnInit() {
       this.subjectdetails= new SubjectDetails()
    }
}
