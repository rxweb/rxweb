import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { Country } from './country.model';

@Component({
    selector: 'app-latLong-conditionalExpression-template-driven',
    templateUrl: './lat-long-conditional-expression.component.html'
})
export class LatLongConditionalExpressionTemplateDrivenComponent implements OnInit {
    country: Country
	
    constructor(
    ) { }

    ngOnInit() {
       this.country= new Country()
    }
}
