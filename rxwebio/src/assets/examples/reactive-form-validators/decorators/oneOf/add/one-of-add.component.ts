import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { EmployeeInfo } from './employee-info.model';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-oneOf-add',
    templateUrl: './one-of-add.component.html'
})
export class OneOfAddComponent implements OnInit {
    employeeInfoFormGroup: FormGroup

    selectedProjectDomains:string[] = [];
 
    constructor(
        private formBuilder: RxFormBuilder ,private http: HttpClient) { }

        projectDomainsArray : string[] = [];
      
        ngOnInit() {
          let employeeInfo = new EmployeeInfo();
          this.http.get("assets/examples/reactive-form-validators/decorators/oneOf/add/one-of.json").subscribe(response => {
            this.projectDomainsArray = response['projectDomainsArray'];
        })
      
          this.employeeInfoFormGroup = this.formBuilder.formGroup(employeeInfo);
        }

        addProjectDomain(element: any, index: number) {
            element.checked ? this.selectedProjectDomains.push(element.value) : this.selectedProjectDomains.splice(index, 1);
            this.employeeInfoFormGroup.controls.projects.setValue(this.selectedProjectDomains);
        }
}
