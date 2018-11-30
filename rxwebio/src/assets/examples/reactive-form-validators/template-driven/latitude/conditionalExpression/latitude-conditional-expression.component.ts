import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { Country } from './country.model';

@Component({
    selector: 'app-latitude-conditionalExpression-template-driven',
    templateUrl: './latitude-conditional-expression.component.html'
})
export class LatitudeConditionalExpressionTemplateDrivenComponent implements OnInit {
    country: Country
	
    constructor(
    ) { }

    ngOnInit() {
       this.country= new Country()
    }
}
