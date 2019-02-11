import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder, FormBuilderConfiguration } from '@rxweb/reactive-form-validators';

import { User } from './user.model';

@Component({
    selector: 'app-prop-server',
    templateUrl: './prop-server.component.html'
})
export class PropServerComponent implements OnInit {

    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let user = new User();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        let userData = {
            email_Address:'bharat.patel@gmail.com',
        };
        formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(userData));
        this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}