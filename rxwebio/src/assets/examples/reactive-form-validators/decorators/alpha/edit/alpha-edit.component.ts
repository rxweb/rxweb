import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { Country } from './country.model';

@Component({
    selector: 'app-alpha-edit',
    templateUrl: './alpha-edit.component.html'
})
export class AlphaEditComponent implements OnInit {
    countryFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,private http: HttpClient    ) { }

    ngOnInit() {
        this.http.get('assets/examples/reactive-form-validators/decorators/alpha/edit/country-data.json?v=' + environment.appVersion).subscribe(country => {
            this.countryFormGroup = this.formBuilder.formGroup<Country>(Country,country);
        })
    }
}
