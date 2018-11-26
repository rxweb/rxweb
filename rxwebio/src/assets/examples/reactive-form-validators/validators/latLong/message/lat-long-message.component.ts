import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-latLong-message-validator',
    templateUrl: './lat-long-message.component.html'
})
export class LatLongMessageValidatorComponent implements OnInit {
    countryFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.countryFormGroup = this.formBuilder.group({
            firstCountry:['', RxwebValidators.latLong({message:'{{0}} is not a proper proper Latitude or Longitude' })], 
        });
    }
}
