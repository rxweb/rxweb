import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { EmployeeInfo } from './employee-info.model';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-choice-complete-template-driven-validation-directives',
    templateUrl: './choice-complete.component.html'
})
export class ChoiceCompleteTemplateDrivenValidationDirectivesComponent implements OnInit {
    employeeInfo: EmployeeInfo

    selectedQualifications: string[] = [];
    selectedSkills: string[] = [];
    selectedHobbies: string[] = [];
    selectedProjectDomains : string[] = [];
    selectedLanguages:string[] = [];

    constructor(
        private formBuilder: RxFormBuilder, private http: HttpClient) { }

    qualificationsArray: string[] = [];
    languagesArray: string[] = [];
    skillsArray: string[] = [];
    hobbiesArray: string[] = [];
    projectDomainsArray : string[] = [];

    ngOnInit() {
        this.employeeInfo = new EmployeeInfo();
        this.http.get("assets/examples/reactive-form-validators/decorators/choice/complete/choice.json").subscribe(response => {
            this.qualificationsArray = response['qualificationsArray'];
            this.skillsArray = response['skillsArray'];
            this.languagesArray = response['languagesArray'];
            this.hobbiesArray = response['hobbiesArray'];
            this.projectDomainsArray = response['projectDomainsArray'];
        })

    }

    addProjectDomain(element: any, index: number) {
        element.checked ? this.selectedProjectDomains.push(element.value) : this.selectedProjectDomains.splice(index, 1);
        this.employeeInfo.projectDomains = this.selectedProjectDomains;
    }

    addQualification(element: any, index: number) {
        element.checked ? this.selectedQualifications.push(element.value) : this.selectedQualifications.splice(index, 1);
        this.employeeInfo.qualifications = this.selectedQualifications;
    }
    
    addSkill(element: any, index: number) {
        element.checked ? this.selectedSkills.push(element.value) : this.selectedSkills.splice(index, 1);
        this.employeeInfo.skills = this.selectedSkills;
    }
    
    addHobby(element: any, index: number) {
        element.checked ? this.selectedHobbies.push(element.value) : this.selectedHobbies.splice(index, 1);
        this.employeeInfo.hobbies = this.selectedHobbies;
    }

    addLanguages(element: any, index: number) {
        element.checked ? this.selectedLanguages.push(element.value) : this.selectedLanguages.splice(index, 1);
        this.employeeInfo.languages = this.selectedLanguages;
    }
}
