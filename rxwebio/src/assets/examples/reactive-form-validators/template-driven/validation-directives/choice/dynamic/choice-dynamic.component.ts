import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,} from '@rxweb/reactive-form-validators';
import { EmployeeInfo } from './employee-info.model';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'app-choice-dynamic-template-driven-validation-directives',
    templateUrl: './choice-dynamic.component.html'
})
export class ChoiceDynamicTemplateDrivenValidationDirectivesComponent implements OnInit {
    employeeInfo = new EmployeeInfo();

    selectedQualifications: string[] = [];
    selectedSkills: string[] = [];
    selectedHobbies: string[] = [];
    selectedQualifaications: string[] = [];
    selectedProjectDomains : string[] = [];

    constructor(
        private formBuilder: RxFormBuilder,private http: HttpClient    ) { }

        qualificationsArray: string[] = [];
        skillsArray: string[] = [];
        hobbiesArray: string[] = [];
        projectDomainsArray : string[] = [];
    
    ngOnInit() {
        this.employeeInfo = new EmployeeInfo();
        let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('assets/examples/reactive-form-validators/template-driven/validation-directives/choice/dynamic/dynamic.json?v='+environment.appVersion).subscribe(dynamic => {
            formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
        })

        this.http.get("assets/examples/reactive-form-validators/template-driven/validation-directives/choice/dynamic/choice.json?v="+environment.appVersion).subscribe(response => {
            this.qualificationsArray = response['qualificationsArray'];
            this.skillsArray = response['skillsArray'];
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


}
