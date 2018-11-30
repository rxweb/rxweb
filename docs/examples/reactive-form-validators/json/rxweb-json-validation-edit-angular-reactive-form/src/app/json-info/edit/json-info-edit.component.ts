import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { JsonInfo } from '../json-info.model';

@Component({
    selector: 'app-json-info-edit',
    templateUrl: './json-info-edit.component.html'
})
export class JsonInfoEditComponent implements OnInit {

    jsonInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,		private http: HttpClient

    ) { }

    ngOnInit() {
        this.http.get('assets/json-info-data.json').subscribe(jsonInfo => {
            this.jsonInfoFormGroup = this.formBuilder.formGroup<JsonInfo>(JsonInfo,jsonInfo);
        })
    }
}
