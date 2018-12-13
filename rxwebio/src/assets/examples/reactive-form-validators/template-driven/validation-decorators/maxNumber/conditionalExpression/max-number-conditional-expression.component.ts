import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { SubjectDetails } from './subject-details.model';

@Component({
    selector: 'app-maxNumber-conditionalExpression-template-driven-validation-decorators',
    templateUrl: './max-number-conditional-expression.component.html'
})
export class MaxNumberConditionalExpressionTemplateDrivenValidationDecoratorsComponent implements OnInit {
    subjectdetails: SubjectDetails
	
    constructor(
    ) { }

    ngOnInit() {
       this.subjectdetails= new SubjectDetails()
    }
}
