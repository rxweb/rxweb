import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { CompanyInfo } from './company-info.model';

@Component({
    selector: 'app-cusip-edit',
    templateUrl: './cusip-edit.component.html'
})
export class CusipEditComponent implements OnInit {
    companyInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,private http: HttpClient    ) { }

    ngOnInit() {
        this.http.get('assets/examples/reactive-form-validators/decorators/cusip/edit/company-info-data.json?v=' + environment.appVersion).subscribe(companyInfo => {
            this.companyInfoFormGroup = this.formBuilder.formGroup<CompanyInfo>(CompanyInfo,companyInfo);
        })
    }
}
