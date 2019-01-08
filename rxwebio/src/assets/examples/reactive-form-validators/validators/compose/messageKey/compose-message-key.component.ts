import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-compose-messageKey-validator',
    templateUrl: './compose-message-key.component.html'
})
export class ComposeMessageKeyValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            lastName:['', RxwebValidators.compose({validators:[RxwebValidators.required(), RxwebValidators.alpha()]  ,messageKey:'composeMessageKey' })], 
        });
    }
}
