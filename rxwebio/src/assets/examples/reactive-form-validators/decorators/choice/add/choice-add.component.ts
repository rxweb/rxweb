import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { EmployeeInfo } from './employee-info.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Component({
    selector: 'app-choice-add',
    templateUrl: './choice-add.component.html'
})
export class ChoiceAddComponent implements OnInit {
    employeeInfoFormGroup: FormGroup

    selectedProjectDomains:string[] = [];
 
    constructor(
        private formBuilder: RxFormBuilder ,private http: HttpClient) { }

        projectDomainsArray : string[] = [];
      
        ngOnInit() {
          let employeeInfo = new EmployeeInfo();
          this.http.get("assets/examples/reactive-form-validators/decorators/choice/add/choice.json?v="+environment.appVersion).subscribe(response => {
            this.projectDomainsArray = response['projectDomainsArray'];
        })
      
          this.employeeInfoFormGroup = this.formBuilder.formGroup(employeeInfo);
        }

        addProjectDomain(element: any, index: number) {
            element.checked ? this.selectedProjectDomains.push(element.value) : this.selectedProjectDomains.splice(index, 1);
            this.employeeInfoFormGroup.controls.projectDomains.setValue(this.selectedProjectDomains);
        }
}
