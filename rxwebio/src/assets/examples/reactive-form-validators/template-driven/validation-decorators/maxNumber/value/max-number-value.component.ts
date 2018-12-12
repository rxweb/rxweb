import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { SubjectDetails } from './subject-details.model';

@Component({
    selector: 'app-maxNumber-value-template-driven-validation-decorators',
    templateUrl: './max-number-value.component.html'
})
export class MaxNumberValueTemplateDrivenValidationDecoratorsComponent implements OnInit {
    subjectdetails: SubjectDetails
	
    constructor(
    ) { }

    ngOnInit() {
       this.subjectdetails= new SubjectDetails()
    }
}
