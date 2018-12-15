import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { Location } from './location.model';

@Component({
    selector: 'app-upperCase-conditionalExpression-template-driven-validation-decorators',
    templateUrl: './upper-case-conditional-expression.component.html'
})
export class UpperCaseConditionalExpressionTemplateDrivenValidationDecoratorsComponent implements OnInit {
    location: Location
	
    constructor(
    ) { }

    ngOnInit() {
       this.location= new Location()
    }
}
