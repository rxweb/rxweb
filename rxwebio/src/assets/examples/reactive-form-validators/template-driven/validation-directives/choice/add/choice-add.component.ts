import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { EmployeeInfo } from './employee-info.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-choice-add-template-driven-validation-directives',
    templateUrl: './choice-add.component.html'
})
export class ChoiceAddTemplateDrivenValidationDirectivesComponent implements OnInit {
    employeeInfo: EmployeeInfo

    selectedProjectDomains:string[] = [];
 
    constructor(
        private formBuilder: RxFormBuilder ,private http: HttpClient) { }

        projectDomainsArray : string[] = [];
      
        ngOnInit() {
          this.employeeInfo = new EmployeeInfo();
          this.http.get("assets/examples/reactive-form-validators/template-driven/validation-directives/choice/add/choice.json?v="+environment.appVersion).subscribe(response => {
            this.projectDomainsArray = response['projectDomainsArray'];
        })
        }

        addProjectDomain(element: any, index: number) {
            element.checked ? this.selectedProjectDomains.push(element.value) : this.selectedProjectDomains.splice(index, 1);
            this.employeeInfo.projectDomains = this.selectedProjectDomains;
        }
}
