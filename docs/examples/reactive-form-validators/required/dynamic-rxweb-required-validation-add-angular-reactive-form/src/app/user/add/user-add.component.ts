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
			firstName : {
				required : true  
			},
			lastName : {
				required :  {conditionalExpressions:'x => x.firstName == "John"',} 
			},
			userName : {
				required :  {message:'Username cannot be blank.',} 
			},
        };
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
