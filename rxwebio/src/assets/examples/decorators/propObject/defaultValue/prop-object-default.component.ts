import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { User,Address } from './propObject.model';

@Component({
    selector: 'app-propObject-default',
    templateUrl: './prop-object-default.component.html'
})
export class PropObjectDefaultComponent implements OnInit {

    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let user = new User();
        user.address = new Address();
        this.userFormGroup = this.formBuilder.formGroup(user);
    }
}
