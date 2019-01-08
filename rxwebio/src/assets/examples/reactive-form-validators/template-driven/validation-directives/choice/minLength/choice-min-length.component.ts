import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { EmployeeInfo } from './employee-info.model';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-choice-minLength-template-driven-validation-directives',
    templateUrl: './choice-min-length.component.html'
})

export class ChoiceMinLengthTemplateDrivenValidationDirectivesComponent implements OnInit {
    employeeInfo = new EmployeeInfo();

    selectedQualification: string[] = [];

    constructor(
        private formBuilder: RxFormBuilder, private http: HttpClient) { }

        qualificationsArray: string[] = [];

    ngOnInit() {
        this.employeeInfo = new EmployeeInfo();
        this.http.get("assets/examples/reactive-form-validators/template-driven/validation-directives/choice/minLength/choice.json").subscribe(response => {
            this.qualificationsArray = response['qualificationsArray'];
        })
    }

    addQualification(element: any, index: number) {
        element.checked ? this.selectedQualification.push(element.value) : this.selectedQualification.splice(index, 1);
        this.employeeInfo.qualifications = this.selectedQualification;
    }
}
