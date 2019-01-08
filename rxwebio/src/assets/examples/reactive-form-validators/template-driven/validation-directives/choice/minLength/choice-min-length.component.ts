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

    selectedHobbies: string[] = [];

    constructor(
        private formBuilder: RxFormBuilder, private http: HttpClient) { }

        hobbiesArray: string[] = [];

    ngOnInit() {
        this.employeeInfo = new EmployeeInfo();
        this.http.get("assets/examples/reactive-form-validators/decorators/choice/minLength/choice.json").subscribe(response => {
            this.hobbiesArray = response['qualificationsArray'];
        })
    }

    addHobbies(element: any, index: number) {
        element.checked ? this.selectedHobbies.push(element.value) : this.selectedHobbies.splice(index, 1);
        this.employeeInfo.hobbies = this.selectedHobbies;
    }
}
