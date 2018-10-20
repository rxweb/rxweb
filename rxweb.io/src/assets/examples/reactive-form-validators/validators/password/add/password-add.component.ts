import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-password-add-validator',
    templateUrl: './password-add.component.html'
})
export class PasswordAddValidatorComponent implements OnInit {
    loginInfoFormGroup: FormGroup
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.loginInfoFormGroup = this.formBuilder.group({
										password:['', RxwebValidators.password({validation:{maxLength: 10,minLength: 5,digit: true,specialCharacter: true} })], 
								});
    }
}
