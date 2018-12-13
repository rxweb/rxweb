import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { Location } from './location.model';

@Component({
    selector: 'app-alphaNumeric-message-template-driven-validation-decorators',
    templateUrl: './alpha-numeric-message.component.html'
})
export class AlphaNumericMessageTemplateDrivenValidationDecoratorsComponent implements OnInit {
    location: Location
	
    constructor(
    ) { }

    ngOnInit() {
       this.location= new Location()
    }
}
