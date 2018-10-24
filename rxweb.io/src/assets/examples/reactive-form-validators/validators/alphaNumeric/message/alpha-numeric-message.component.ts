import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-alphaNumeric-message-validator',
    templateUrl: './alpha-numeric-message.component.html'
})
export class AlphaNumericMessageValidatorComponent implements OnInit {
    locationFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.locationFormGroup = this.formBuilder.group({
            postalAddress:['', RxwebValidators.alphaNumeric({allowWhiteSpace:true  ,message:'Please enter only alphanumerics, special characters are not allowed and whitespace is allowed.' })], 
        });
    }
}
