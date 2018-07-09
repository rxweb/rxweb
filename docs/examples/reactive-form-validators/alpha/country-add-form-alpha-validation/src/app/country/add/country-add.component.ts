import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { Country } from '../country.model';

@Component({
    selector: 'app-country-add',
    templateUrl: './country-add.component.html'
})
export class CountryAddComponent implements OnInit {

    countryFormGroup: FormGroup

    constructor(
	private formBuilder: RxFormBuilder
	) { }

    ngOnInit() {
        let country = new Country();
        this.countryFormGroup = this.formBuilder.formGroup(country);

    }
}
