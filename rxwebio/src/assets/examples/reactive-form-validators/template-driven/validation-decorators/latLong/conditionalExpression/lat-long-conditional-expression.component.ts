import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { Country } from './country.model';

@Component({
    selector: 'app-latLong-conditionalExpression-template-driven-validation-decorators',
    templateUrl: './lat-long-conditional-expression.component.html'
})
export class LatLongConditionalExpressionTemplateDrivenValidationDecoratorsComponent implements OnInit {
    country: Country
	
    constructor(
    ) { }

    ngOnInit() {
       this.country= new Country()
    }
}
