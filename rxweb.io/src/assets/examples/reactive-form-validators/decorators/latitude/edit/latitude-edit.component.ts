import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { NumberInfo } from './number-info.model';

@Component({
    selector: 'app-latitude-edit',
    templateUrl: './latitude-edit.component.html'
})
export class LatitudeEditComponent implements OnInit {

    numberInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,		private http: HttpClient

    ) { }

    ngOnInit() {
        this.http.get('assets/examples/reactive-form-validators/decorators/latitude/edit/number-info-data.json').subscribe(numberInfo => {
            this.numberInfoFormGroup = this.formBuilder.formGroup<NumberInfo>(NumberInfo,numberInfo);
        })
    }
}
