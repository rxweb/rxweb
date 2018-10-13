import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { AccountInfo } from './account-info.model';

@Component({
    selector: 'app-different-fieldName',
    templateUrl: './different-field-name.component.html'
})
export class DifferentFieldNameComponent implements OnInit {

    accountInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let accountInfo = new AccountInfo();
        this.accountInfoFormGroup = this.formBuilder.formGroup(accountInfo);
    }
}
