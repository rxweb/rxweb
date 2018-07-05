import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { Country } from '../country.model';
import { HttpClient } from '@angular/common/http';
@Component({
    templateUrl: './remote-data.component.html'
})
export class RemoteDataComponent implements OnInit {
    countryFormGroup: FormGroup

    constructor(private formBuilder: RxFormBuilder, private http: HttpClient) { }

    ngOnInit() {
        this.http.get('assets/country-data.json').subscribe(country => {
            this.countryFormGroup = this.formBuilder.formGroup<Country>(Country,country);
        })
    }
}
