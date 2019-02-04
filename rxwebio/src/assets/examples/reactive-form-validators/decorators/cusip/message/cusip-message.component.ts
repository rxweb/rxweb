import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { CompanyInfo } from './company-info.model';

@Component({
    selector: 'app-cusip-message',
    templateUrl: './cusip-message.component.html'
})
export class CusipMessageComponent implements OnInit {
    companyInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder    ) { }

    ngOnInit() {
        let companyInfo = new CompanyInfo();
        this.companyInfoFormGroup = this.formBuilder.formGroup(companyInfo);
    }
}
