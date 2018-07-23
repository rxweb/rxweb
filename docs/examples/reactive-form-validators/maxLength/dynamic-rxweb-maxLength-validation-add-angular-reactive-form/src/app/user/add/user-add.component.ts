import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration } from '@rxweb/reactive-form-validators';

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
			firstName : {
				maxLength :  {value:16,} 
			},
			lastName : {
				maxLength :  {value:16,conditionalExpressions:'x,y=>x.firstName == "John"',} 
			},
			userName : {
				maxLength :  {value:10,message:'Maximum 10 characters are allowed',} 
			},
        };
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
