import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { EmployeeInfo } from '../employee-info.model';

@Component({
    selector: 'app-employee-info-edit',
    templateUrl: './employee-info-edit.component.html'
})
export class EmployeeInfoEditComponent implements OnInit {

    employeeInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,		private http: HttpClient

    ) { }

    ngOnInit() {
        this.http.get('assets/employee-info-data.json').subscribe(employeeInfo => {
            this.employeeInfoFormGroup = this.formBuilder.formGroup<EmployeeInfo>(EmployeeInfo,employeeInfo);
        })
    }
}
