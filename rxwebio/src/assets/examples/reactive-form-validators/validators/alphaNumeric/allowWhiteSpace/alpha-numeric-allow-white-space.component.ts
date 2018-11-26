import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-alphaNumeric-allowWhiteSpace-validator',
    templateUrl: './alpha-numeric-allow-white-space.component.html'
})
export class AlphaNumericAllowWhiteSpaceValidatorComponent implements OnInit {
    locationFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.locationFormGroup = this.formBuilder.group({
            flatAddress:['', RxwebValidators.alphaNumeric({allowWhiteSpace:true })], 
        });
    }
}
