import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { Contact } from './contact.model';

@Component({
    selector: 'app-minLength-value-template-driven',
    templateUrl: './min-length-value.component.html'
})
export class MinLengthValueTemplateDrivenComponent implements OnInit {
    contact: Contact
	
    constructor(
    ) { }

    ngOnInit() {
       this.contact= new Contact()
    }
}
