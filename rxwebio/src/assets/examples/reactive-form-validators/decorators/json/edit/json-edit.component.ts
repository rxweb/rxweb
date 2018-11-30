import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { JsonInfo } from './json-info.model';

@Component({
    selector: 'app-json-edit',
    templateUrl: './json-edit.component.html'
})
export class JsonEditComponent implements OnInit {
    jsonInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,private http: HttpClient    ) { }

    ngOnInit() {
        this.http.get('assets/examples/reactive-form-validators/decorators/json/edit/json-info-data.json').subscribe(jsonInfo => {
            this.jsonInfoFormGroup = this.formBuilder.formGroup<JsonInfo>(JsonInfo,jsonInfo);
        })
    }
}
