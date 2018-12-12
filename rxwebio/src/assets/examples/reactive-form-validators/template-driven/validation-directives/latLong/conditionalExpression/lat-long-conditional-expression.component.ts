import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { Country } from './country.model';

@Component({
    selector: 'app-latLong-conditionalExpression-template-driven-validation-directives',
    templateUrl: './lat-long-conditional-expression.component.html'
})
export class LatLongConditionalExpressionTemplateDrivenValidationDirectivesComponent implements OnInit {
    country: Country
	
    constructor(
    ) { }

    ngOnInit() {
       this.country= new Country()
    }
}
