import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { NumberInfo } from './number-info.model';

@Component({
    selector: 'app-longitude-edit',
    templateUrl: './longitude-edit.component.html'
})
export class LongitudeEditComponent implements OnInit {
    numberInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,private http: HttpClient    ) { }

    ngOnInit() {
        this.http.get('assets/examples/reactive-form-validators/decorators/longitude/edit/number-info-data.json').subscribe(numberInfo => {
            this.numberInfoFormGroup = this.formBuilder.formGroup<NumberInfo>(NumberInfo,numberInfo);
        })
    }
}
