import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { EmployeeInfo } from './employee-info.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-oneOf-add',
    templateUrl: './one-of-add.component.html'
})
export class OneOfAddComponent implements OnInit {
    employeeInfoFormGroup: FormGroup
 
    constructor(
        private formBuilder: RxFormBuilder ,private http: HttpClient) { }

        projectDomainsArray : string[] = [];
      
        ngOnInit() {
          let employeeInfo = new EmployeeInfo();
          this.http.get("assets/examples/reactive-form-validators/decorators/oneOf/add/one-of.json?v="+environment.appVersion).subscribe(response => {
            this.projectDomainsArray = response['projectDomainsArray'];
        })
      
          this.employeeInfoFormGroup = this.formBuilder.formGroup(employeeInfo);
        }

        index = 0;
        addProjectDomain(element:any) {
          var value = this.employeeInfoFormGroup.controls.projectDomains.value;
          if(!value)
            value = [];
            if(element.checked) {
                  value.push(element.value);
                  this.index++;
            }
            else
            {
            var indexOf = value.indexOf(element.value);
            value.splice(indexOf,1);
            }
          this.employeeInfoFormGroup.controls.projectDomains.setValue(value)
        }
}
