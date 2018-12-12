import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { Contact } from './contact.model';

@Component({
    selector: 'app-minLength-value-template-driven-validation-decorators',
    templateUrl: './min-length-value.component.html'
})
export class MinLengthValueTemplateDrivenValidationDecoratorsComponent implements OnInit {
    contact: Contact
	
    constructor(
    ) { }

    ngOnInit() {
       this.contact= new Contact()
    }
}
