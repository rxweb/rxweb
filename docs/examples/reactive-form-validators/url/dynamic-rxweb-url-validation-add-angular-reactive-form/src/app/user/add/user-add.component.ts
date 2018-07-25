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
			adminWebsiteUrl : {
				url : true  
			},
			customerWebsiteUrl : {
				url :  {conditionalExpressions:'x => x.adminWebsiteUrl == "https://google.co.in" ',} 
			},
			maintenanceWebSiteUrl : {
				url :  {message:'Is not the correct url pattern.',} 
			},
        };
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
