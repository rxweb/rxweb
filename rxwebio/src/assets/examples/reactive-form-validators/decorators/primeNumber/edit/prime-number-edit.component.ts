import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { NumberInfo } from './number-info.model';

@Component({
    selector: 'app-primeNumber-edit',
    templateUrl: './prime-number-edit.component.html'
})
export class PrimeNumberEditComponent implements OnInit {
    numberInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,private http: HttpClient    ) { }

    ngOnInit() {
        this.http.get('assets/examples/reactive-form-validators/decorators/primeNumber/edit/number-info-data.json?v=' + environment.appVersion).subscribe(numberInfo => {
            this.numberInfoFormGroup = this.formBuilder.formGroup<NumberInfo>(NumberInfo,numberInfo);
        })
    }
}
