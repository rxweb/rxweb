import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { Country } from './country.model';

@Component({
    selector: 'app-latLong-edit',
    templateUrl: './lat-long-edit.component.html'
})
export class LatLongEditComponent implements OnInit {
    countryFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,private http: HttpClient    ) { }

    ngOnInit() {
        this.http.get('assets/examples/reactive-form-validators/decorators/latLong/edit/country-data.json').subscribe(country => {
            this.countryFormGroup = this.formBuilder.formGroup<Country>(Country,country);
        })
    }
}
