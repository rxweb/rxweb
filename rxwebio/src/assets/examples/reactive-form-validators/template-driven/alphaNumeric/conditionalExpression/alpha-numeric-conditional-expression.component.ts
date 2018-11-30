import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { Location } from './location.model';

@Component({
    selector: 'app-alphaNumeric-conditionalExpression-template-driven',
    templateUrl: './alpha-numeric-conditional-expression.component.html'
})
export class AlphaNumericConditionalExpressionTemplateDrivenComponent implements OnInit {
    location: Location
	
    constructor(
    ) { }

    ngOnInit() {
       this.location= new Location()
    }
}
