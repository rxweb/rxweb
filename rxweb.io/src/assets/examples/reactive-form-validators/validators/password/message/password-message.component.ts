import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-password-message-validator',
    templateUrl: './password-message.component.html'
})
export class PasswordMessageValidatorComponent implements OnInit {
    loginInfoFormGroup: FormGroup
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.loginInfoFormGroup = this.formBuilder.group({
										oldPassword:['', RxwebValidators.password({validation:{maxLength: 10,minLength: 5,digit: true,specialCharacter: true}  ,message:'Password is not valid' })], 
								});
    }
}
