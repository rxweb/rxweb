import { Component, OnInit } from '@angular/core';
import { FormGroup,FormArray } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { User,Address } from './propArray.model';

@Component({
    selector: 'app-propArray-default',
    templateUrl: './prop-array-default-component.html'
})
export class PropArrayDefaultComponent implements OnInit {

    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let user = new User();
        user.addresses = new Array<Address>();
        let address = new Address();
        user.addresses.push(address);
        this.userFormGroup = this.formBuilder.formGroup(user);
        }

    addAddress(){
      let addresses = this.userFormGroup.controls.addresses as FormArray;
      addresses.push(this.formBuilder.formGroup(Address));
    }

    onSubmit(){
    }
}
