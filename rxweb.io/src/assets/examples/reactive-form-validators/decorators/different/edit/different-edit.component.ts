import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { AccountInfo } from './account-info.model';

@Component({
    selector: 'app-different-edit',
    templateUrl: './different-edit.component.html'
})
export class DifferentEditComponent implements OnInit {

    accountInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,		private http: HttpClient

    ) { }

    ngOnInit() {
        this.http.get('assets/examples/reactive-form-validators/decorators/different/edit/account-info-data.json').subscribe(accountInfo => {
            this.accountInfoFormGroup = this.formBuilder.formGroup<AccountInfo>(AccountInfo,accountInfo);
        })
    }
}
