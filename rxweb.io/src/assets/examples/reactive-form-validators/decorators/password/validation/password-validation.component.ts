import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { LoginInfo } from './login-info.model';

@Component({
    selector: 'app-password-validation',
    templateUrl: './password-validation.component.html'
})
export class PasswordValidationComponent implements OnInit {
    loginInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let loginInfo = new LoginInfo();
        this.loginInfoFormGroup = this.formBuilder.formGroup(loginInfo);
    }
}
