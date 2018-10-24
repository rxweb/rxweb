import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { LoginInfo } from './login-info.model';

@Component({
    selector: 'app-password-edit',
    templateUrl: './password-edit.component.html'
})
export class PasswordEditComponent implements OnInit {
    loginInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,        private http: HttpClient

    ) { }

    ngOnInit() {
        this.http.get('assets/examples/reactive-form-validators/decorators/password/edit/login-info-data.json').subscribe(loginInfo => {
            this.loginInfoFormGroup = this.formBuilder.formGroup<LoginInfo>(LoginInfo,loginInfo);
        })
    }
}
