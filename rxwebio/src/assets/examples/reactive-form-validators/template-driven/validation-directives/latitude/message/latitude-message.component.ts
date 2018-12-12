import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { Country } from './country.model';

@Component({
    selector: 'app-latitude-message-template-driven-validation-directives',
    templateUrl: './latitude-message.component.html'
})
export class LatitudeMessageTemplateDrivenValidationDirectivesComponent implements OnInit {
    country: Country
	
    constructor(
    ) { }

    ngOnInit() {
       this.country= new Country()
    }
}
