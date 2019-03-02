import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { EmployeeInfo } from './employee-info.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Component({
    selector: 'app-choice-maxLength',
    templateUrl: './choice-max-length.component.html'
})

export class ChoiceMaxLengthComponent implements OnInit {
    employeeInfoFormGroup: FormGroup

    selectedQualifications: string[] = [];

    constructor(
        private formBuilder: RxFormBuilder, private http: HttpClient) { }

        qualificationsArray: string[] = [];

    ngOnInit() {
        let employeeInfo = new EmployeeInfo();
        this.http.get("assets/examples/reactive-form-validators/decorators/choice/maxLength/choice.json?v="+environment.appVersion).subscribe(response => {
            this.qualificationsArray = response['qualificationsArray'];
        })

        this.employeeInfoFormGroup = this.formBuilder.formGroup(employeeInfo);
    }

    addQualification(element: any, index: number) {
        element.checked ? this.selectedQualifications.push(element.value) : this.selectedQualifications.splice(index, 1);
        this.employeeInfoFormGroup.controls.qualifications.setValue(this.selectedQualifications);
    }
}
