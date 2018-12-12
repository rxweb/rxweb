import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { Country } from './country.model';

@Component({
    selector: 'app-longitude-message-template-driven-validation-decorators',
    templateUrl: './longitude-message.component.html'
})
export class LongitudeMessageTemplateDrivenValidationDecoratorsComponent implements OnInit {
    country: Country
	
    constructor(
    ) { }

    ngOnInit() {
       this.country= new Country()
    }
}
