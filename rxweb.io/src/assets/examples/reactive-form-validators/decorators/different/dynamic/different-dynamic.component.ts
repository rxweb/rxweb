import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,} from '@rxweb/reactive-form-validators';

import { AccountInfo } from './account-info.model';

@Component({
    selector: 'app-different-dynamic',
    templateUrl: './different-dynamic.component.html'
})
export class DifferentDynamicComponent implements OnInit {
    accountInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,private http: HttpClient    ) { }

    ngOnInit() {
        let accountInfo = new AccountInfo();
        let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('assets/examples/reactive-form-validators/decorators/different/dynamic/dynamic.json').subscribe(dynamic => {
            formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
			this.accountInfoFormGroup = this.formBuilder.formGroup(accountInfo,formBuilderConfiguration);
        })
    }
}
