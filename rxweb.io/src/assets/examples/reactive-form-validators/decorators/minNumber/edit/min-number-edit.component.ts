import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { ResultInfo } from './result-info.model';

@Component({
    selector: 'app-minNumber-edit',
    templateUrl: './min-number-edit.component.html'
})
export class MinNumberEditComponent implements OnInit {

    resultInfoFormGroup: FormGroup
					
	    constructor(
        private formBuilder: RxFormBuilder,		private http: HttpClient

    ) { }

    ngOnInit() {
        this.http.get('assets/examples/reactive-form-validators/decorators/minNumber/edit/result-info-data.json').subscribe(resultInfo => {
            this.resultInfoFormGroup = this.formBuilder.formGroup<ResultInfo>(ResultInfo,resultInfo);
        })
    }
}
