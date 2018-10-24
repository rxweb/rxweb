import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-latitude-message-validator',
    templateUrl: './latitude-message.component.html'
})
export class LatitudeMessageValidatorComponent implements OnInit {
    countryFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.countryFormGroup = this.formBuilder.group({
            firstCountryLatitude:['', RxwebValidators.latitude({message:'{{0}} is not a latitude' })], 
        });
    }
}
