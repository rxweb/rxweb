import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { EmployeeInfo } from './employee-info.model';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-noneOf-nonArrayValue',
    templateUrl: './none-of-non-array-value.component.html'
})
export class NoneOfNonArrayValueComponent implements OnInit {

    constructor(
        private formBuilder: RxFormBuilder, private http: HttpClient) { }

    
    employeeInfoFormGroup: FormGroup;
    excludedDepartments: string[] = ["HR", "Network", "Sales"];
    ngOnInit() {
        debugger;
        let employeeInfo = new EmployeeInfo();
        this.employeeInfoFormGroup = this.formBuilder.formGroup(employeeInfo);
    }
}