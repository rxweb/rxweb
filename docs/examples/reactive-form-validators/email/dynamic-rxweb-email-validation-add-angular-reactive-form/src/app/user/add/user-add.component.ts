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
			email : {
				email : true  
			},
			recoveryEmailAddress : {
				email :  {conditionalExpressions:'x,y => x.email >= "abc@gmail.com" ',} 
			},
			otherEmailAddress : {
				email :  {message:'Please enter valid email',} 
			},
        };
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
