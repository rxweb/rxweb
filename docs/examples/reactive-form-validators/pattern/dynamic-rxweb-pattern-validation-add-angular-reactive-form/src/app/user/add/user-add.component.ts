import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration  } from '@rxweb/reactive-form-validators';

import { User } from '../user.model';

@Component({
    selector: 'app-user-add',
    templateUrl: './user-add.component.html'
})
export class UserAddComponent implements OnInit {

    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let user = new User();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.validations = {
			userName : {
				pattern :  {pattern:{'onlyAlpha': /^[A-Z]+$/},} 
			},
			zipCode : {
				pattern :  {pattern:{'zipCode':/^\d{5}(?:[-\s]\d{4})?$/ },message:'Zipcode must be 5 digits',} 
			},
			age : {
				pattern :  {pattern:{'onlyDigit': /^[0-9]*$/},conditionalExpressions:'x=>x.userName=="John"',} 
			},
        };
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
