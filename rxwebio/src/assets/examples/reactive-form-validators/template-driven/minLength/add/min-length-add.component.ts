import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { Contact } from './contact.model';

@Component({
    selector: 'app-minLength-add-template-driven',
    templateUrl: './min-length-add.component.html'
})
export class MinLengthAddTemplateDrivenComponent implements OnInit {
    contact: Contact

    constructor(
    ) { }

    ngOnInit() {
       this.contact= new Contact()
    }
}
