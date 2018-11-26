import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { Location } from './location.model';

@Component({
    selector: 'app-upperCase-conditionalExpression-template-driven',
    templateUrl: './upper-case-conditional-expression.component.html'
})
export class UpperCaseConditionalExpressionTemplateDrivenComponent implements OnInit {
    location: Location

    constructor(
    ) { }

    ngOnInit() {
       this.location= new Location()
    }
}
