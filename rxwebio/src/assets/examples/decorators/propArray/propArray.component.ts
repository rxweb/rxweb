import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { User,Address } from './propArray.model';

@Component({
    selector: 'app-propArray-add',
    templateUrl: './propArray.component.html'
})
export class PropArrayComponent implements OnInit {

    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let user = new User();
        user.address = new Array<Address>();
        let address = new Address();
        user.address.push(address);
        this.userFormGroup = this.formBuilder.formGroup(user);
    }
}
