import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-password-dynamic-validator',
    templateUrl: './password-dynamic.component.html'
})
export class PasswordDynamicValidatorComponent implements OnInit {
    loginInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			newPassword : {
				password :  {validation:{maxLength: 10,minLength: 5,digit: true,specialCharacter: true},} 
			},
						
			oldPassword : {
				password :  {validation:{maxLength: 10,minLength: 5,digit: true,specialCharacter: true},message:'Password is not valid',} 
			},
			        };
		 var loginInfo = {
			newPassword:'', oldPassword:'', 
		}
		this.loginInfoFormGroup = this.formBuilder.group(loginInfo,formBuilderConfiguration);
    }
}
