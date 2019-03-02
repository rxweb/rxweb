import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';

import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-noneOf-nonArrayValue',
    templateUrl: './none-of-non-array-value.component.html'
})
export class NoneOfNonArrayValueValidatorComponent implements OnInit {

    constructor(
        private formBuilder: RxFormBuilder, private http: HttpClient) { }

    excludedDepartments: string[] = ["HR", "Network", "Sales"];
    employeeInfoFormGroup: FormGroup
    ngOnInit() {
        this.employeeInfoFormGroup = this.formBuilder.group({
            department: ['', RxwebValidators.noneOf({ matchValues: this.excludedDepartments })],
        });
    }
}