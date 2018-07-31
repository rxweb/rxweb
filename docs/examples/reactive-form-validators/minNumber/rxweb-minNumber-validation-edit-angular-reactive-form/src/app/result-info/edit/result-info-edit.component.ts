import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { ResultInfo } from '../result-info.model';

@Component({
    selector: 'app-result-info-edit',
    templateUrl: './result-info-edit.component.html'
})
export class ResultInfoEditComponent implements OnInit {

    resultInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,		private http: HttpClient

    ) { }

    ngOnInit() {
        this.http.get('assets/result-info-data.json').subscribe(resultInfo => {
            this.resultInfoFormGroup = this.formBuilder.formGroup<ResultInfo>(ResultInfo,resultInfo);
        })
    }
}
