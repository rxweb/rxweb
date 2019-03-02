import { Component, OnInit } from '@angular/core';
import { FormGroup,FormArray } from "@angular/forms"

import { RxFormBuilder, FormBuilderConfiguration } from '@rxweb/reactive-form-validators';

import { User,Address } from './propArray.model';

@Component({
    selector: 'app-propArray-server',
    templateUrl: './prop-array-server-component.html'
})
export class PropArrayServerComponent implements OnInit {

    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let user = new User();
        user.addresses = new Array<Address>();
        let address = new Address();
        user.addresses.push(address);
        let formBuilderConfiguration = new FormBuilderConfiguration();
        let userData = {
            City:'Ahmedabad',
            Country:'India',
            email_Address:'bharat.patel@gmail.com',
        };
        formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(userData));
        this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
        }

    addAddress(){
      let addresses = this.userFormGroup.controls.addresses as FormArray;
      addresses.push(this.formBuilder.formGroup(Address));
    }

    onSubmit(){
    }
}
