import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { AttandanceDetail } from '../attandance-detail.model';

@Component({
    selector: 'app-attandance-detail-edit',
    templateUrl: './attandance-detail-edit.component.html'
})
export class AttandanceDetailEditComponent implements OnInit {

    attandanceDetailFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,		private http: HttpClient

    ) { }

    ngOnInit() {
        this.http.get('assets/attandance-detail-data.json').subscribe(attandanceDetail => {
            this.attandanceDetailFormGroup = this.formBuilder.formGroup<AttandanceDetail>(AttandanceDetail,attandanceDetail);
        })
    }
}
