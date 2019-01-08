import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-compose-message-validator',
    templateUrl: './compose-message.component.html'
})
export class ComposeMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            countryName:['', RxwebValidators.compose({validators:[RxwebValidators.alpha()]  ,message:'You can only enter alphabets.' })], 
        });
    }
}
