import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { Contact } from './contact.model';

@Component({
    selector: 'app-minlength-conditionalExpressions',
    templateUrl: './min-length-conditional-expressions.component.html'
})
export class MinLengthConditionalExpressionsComponent implements OnInit {

    contactFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let contact = new Contact();
        this.contactFormGroup = this.formBuilder.formGroup(contact);
    }
}
