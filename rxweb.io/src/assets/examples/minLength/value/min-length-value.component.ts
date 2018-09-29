import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { Contact } from './contact.model';

@Component({
    selector: 'app-minlength-value',
    templateUrl: './min-length-value.component.html'
})
export class MinLengthValueComponent implements OnInit {

    contactFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let contact = new Contact();
        this.contactFormGroup = this.formBuilder.formGroup(contact);
    }
}
