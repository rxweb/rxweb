import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { Location } from '../location.model';

@Component({
    selector: 'app-location-edit',
    templateUrl: './location-edit.component.html'
})
export class LocationEditComponent implements OnInit {

    locationFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,		private http: HttpClient

    ) { }

    ngOnInit() {
        this.http.get('assets/location-data.json').subscribe(location => {
            this.locationFormGroup = this.formBuilder.formGroup<Location>(Location,location);
        })
    }
}
