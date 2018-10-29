import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-lowerCase-message-validator',
    templateUrl: './lower-case-message.component.html'
})
export class LowerCaseMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            lastName:['', RxwebValidators.lowerCase({message:'You can enter only lowerCase letters.' })], 
        });
    }
}
