import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { AccountInfo } from './account-info.model';

@Component({
    selector: 'app-different-message',
    templateUrl: './different-message.component.html'
})
export class DifferentMessageComponent implements OnInit {
    accountInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let accountInfo = new AccountInfo();
        this.accountInfoFormGroup = this.formBuilder.formGroup(accountInfo);
    }
}
