import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-email-message-validator',
    templateUrl: './email-message.component.html'
})
export class EmailMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            otherEmailAddress:['', RxwebValidators.email({message:'Please enter valid email' })], 
        });
    }
}
