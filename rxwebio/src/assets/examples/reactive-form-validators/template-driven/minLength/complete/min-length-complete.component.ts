import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { Contact } from './contact.model';

@Component({
    selector: 'app-minLength-complete-template-driven',
    templateUrl: './min-length-complete.component.html'
})
export class MinLengthCompleteTemplateDrivenComponent implements OnInit {
    contact: Contact
	
    constructor(
    ) { }

    ngOnInit() {
       this.contact= new Contact()
    }
}
