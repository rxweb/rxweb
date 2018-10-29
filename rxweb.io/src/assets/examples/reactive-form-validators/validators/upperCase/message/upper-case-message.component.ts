import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-upperCase-message-validator',
    templateUrl: './upper-case-message.component.html'
})
export class UpperCaseMessageValidatorComponent implements OnInit {
    locationFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.locationFormGroup = this.formBuilder.group({
            colonyName:['', RxwebValidators.upperCase({message:'You can enter only upperCase letters.' })], 
        });
    }
}
