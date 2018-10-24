import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-latLong-add-validator',
    templateUrl: './lat-long-add.component.html'
})
export class LatLongAddValidatorComponent implements OnInit {
    countryFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.countryFormGroup = this.formBuilder.group({
            firstCountry:['', RxwebValidators.latLong()], 
        });
    }
}
