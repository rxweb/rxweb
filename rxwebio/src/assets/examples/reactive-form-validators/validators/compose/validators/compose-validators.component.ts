import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-compose-validators-validator',
    templateUrl: './compose-validators.component.html'
})
export class ComposeValidatorsValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            firstName:['', RxwebValidators.compose({validators:[RxwebValidators.required(), RxwebValidators.alpha()] })], 
        });
    }
}
