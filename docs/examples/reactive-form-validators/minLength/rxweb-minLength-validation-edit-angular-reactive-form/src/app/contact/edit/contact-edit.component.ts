import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { Contact } from '../contact.model';

@Component({
    selector: 'app-contact-edit',
    templateUrl: './contact-edit.component.html'
})
export class ContactEditComponent implements OnInit {

    contactFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,		private http: HttpClient

    ) { }

    ngOnInit() {
        this.http.get('assets/contact-data.json').subscribe(contact => {
            this.contactFormGroup = this.formBuilder.formGroup<Contact>(Contact,contact);
        })
    }
}
