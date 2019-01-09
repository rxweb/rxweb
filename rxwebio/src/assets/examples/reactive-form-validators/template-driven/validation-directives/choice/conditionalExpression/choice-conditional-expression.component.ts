import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { EmployeeInfo } from './employee-info.model';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-choice-conditionalExpression-template-driven-validation-directives',
    templateUrl: './choice-conditional-expression.component.html'
})
export class ChoiceConditionalExpressionTemplateDrivenValidationDirectivesComponent implements OnInit {
    employeeInfo = new EmployeeInfo();

    selectedQualifications: string[] = [];
    selectedSkills: string[] = [];

    constructor(
        private formBuilder: RxFormBuilder, private http: HttpClient) { }

    qualificationsArray: string[] = [];
    skillsArray: string[] = [];

    ngOnInit() {
        this.employeeInfo = new EmployeeInfo();
        this.http.get("assets/examples/reactive-form-validators/template-driven/validation-directives/choice/conditionalExpression/choice.json").subscribe(response => {
            this.qualificationsArray = response['qualificationsArray'];
            this.skillsArray = response['skillsArray'];
        })
    }

    addQualification(element: any, index: number) {
        element.checked ? this.selectedQualifications.push(element.value) : this.selectedQualifications.splice(index, 1);
        this.employeeInfo.qualifications = this.selectedQualifications;
    }
    
    addSkill(element: any, index: number) {
        element.checked ? this.selectedSkills.push(element.value) : this.selectedSkills.splice(index, 1);
        this.employeeInfo.skills = this.selectedSkills;
    }

}
