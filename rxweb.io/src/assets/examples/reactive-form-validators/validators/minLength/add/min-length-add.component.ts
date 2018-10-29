import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-minLength-add-validator',
    templateUrl: './min-length-add.component.html'
})
export class MinLengthAddValidatorComponent implements OnInit {
    contactFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.contactFormGroup = this.formBuilder.group({
            countryName:['', RxwebValidators.minLength({value:8 })], 
        });
    }
}
