import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { Contact } from './contact.model';

@Component({
    selector: 'app-minLength-add-template-driven-validation-decorators',
    templateUrl: './min-length-add.component.html'
})
export class MinLengthAddTemplateDrivenValidationDecoratorsComponent implements OnInit {
    contact: Contact
	
    constructor(
    ) { }

    ngOnInit() {
       this.contact= new Contact()
    }
}
