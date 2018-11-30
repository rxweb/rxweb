import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { Contact } from './contact.model';

@Component({
    selector: 'app-minLength-edit',
    templateUrl: './min-length-edit.component.html'
})
export class MinLengthEditComponent implements OnInit {
    contactFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,private http: HttpClient    ) { }

    ngOnInit() {
        this.http.get('assets/examples/reactive-form-validators/decorators/minLength/edit/contact-data.json').subscribe(contact => {
            this.contactFormGroup = this.formBuilder.formGroup<Contact>(Contact,contact);
        })
    }
}
