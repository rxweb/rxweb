import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { Country } from './country.model';

@Component({
    selector: 'app-longitude-conditionalExpression-template-driven',
    templateUrl: './longitude-conditional-expression.component.html'
})
export class LongitudeConditionalExpressionTemplateDrivenComponent implements OnInit {
    country: Country
	
    constructor(
    ) { }

    ngOnInit() {
       this.country= new Country()
    }
}
