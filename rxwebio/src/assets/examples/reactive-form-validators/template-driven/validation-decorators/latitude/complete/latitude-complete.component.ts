import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { Country } from './country.model';

@Component({
    selector: 'app-latitude-complete-template-driven-validation-decorators',
    templateUrl: './latitude-complete.component.html'
})
export class LatitudeCompleteTemplateDrivenValidationDecoratorsComponent implements OnInit {
    country: Country
	
    constructor(
    ) { }

    ngOnInit() {
       this.country= new Country()
    }
}
