import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { Contact } from './contact.model';

@Component({
    selector: 'app-minLength-message-template-driven',
    templateUrl: './min-length-message.component.html'
})
export class MinLengthMessageTemplateDrivenComponent implements OnInit {
    contact: Contact

    constructor(
    ) { }

    ngOnInit() {
       this.contact= new Contact()
    }
}
