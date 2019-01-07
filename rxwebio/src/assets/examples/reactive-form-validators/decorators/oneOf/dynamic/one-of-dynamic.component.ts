import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,} from '@rxweb/reactive-form-validators';
import { EmployeeInfo } from './employee-info.model';


@Component({
    selector: 'app-oneOf-dynamic',
    templateUrl: './one-of-dynamic.component.html'
})
export class OneOfDynamicComponent implements OnInit {
    employeeInfoFormGroup: FormGroup

    selectedQualifications: string[] = [];
    selectedSkills: string[] = [];
    selectedHobbies: string[] = [];
    selectedProjectDomains : string[] = [];

    constructor(
        private formBuilder: RxFormBuilder,private http: HttpClient    ) { }

        qualificationsArray: string[] = [];
        skillsArray: string[] = [];
        hobbiesArray: string[] = [];
        projectDomainsArray : string[] = [];
    
    ngOnInit() {
        let employeeInfo = new EmployeeInfo();
        let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('assets/examples/reactive-form-validators/decorators/oneOf/dynamic/dynamic.json').subscribe(dynamic => {
            formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
			this.employeeInfoFormGroup = this.formBuilder.formGroup(employeeInfo,formBuilderConfiguration);
        })

        this.http.get("assets/examples/reactive-form-validators/decorators/oneOf/dynamic/one-of.json").subscribe(response => {
            this.qualificationsArray = response['qualificationsArray'];
            this.skillsArray = response['skillsArray'];
            this.hobbiesArray = response['hobbiesArray'];
            this.projectDomainsArray = response['projectDomainsArray'];
        })

        this.employeeInfoFormGroup = this.formBuilder.formGroup(employeeInfo);
    }

    addProjectDomain(element: any, index: number) {
        element.checked ? this.selectedProjectDomains.push(element.value) : this.selectedProjectDomains.splice(index, 1);
        this.employeeInfoFormGroup.controls.projects.setValue(this.selectedProjectDomains);
    }

    addQualification(element: any, index: number) {
        element.checked ? this.selectedQualifications.push(element.value) : this.selectedQualifications.splice(index, 1);
        this.employeeInfoFormGroup.controls.qualifications.setValue(this.selectedQualifications);
    }
    
    addSkill(element: any, index: number) {
        element.checked ? this.selectedSkills.push(element.value) : this.selectedSkills.splice(index, 1);
        this.employeeInfoFormGroup.controls.skills.setValue(this.selectedSkills);
    }
    
    addHobby(element: any, index: number) {
        element.checked ? this.selectedHobbies.push(element.value) : this.selectedHobbies.splice(index, 1);
        this.employeeInfoFormGroup.controls.hobbies.setValue(this.selectedHobbies);
    }
}
