import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { Contact } from './contact.model';

@Component({
    selector: 'app-minlength-message',
    templateUrl: './min-length-message.component.html'
})
export class MinLengthMessageComponent implements OnInit {

    contactFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let contact = new Contact();
        this.contactFormGroup = this.formBuilder.formGroup(contact);
    }
}
