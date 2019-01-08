import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-noneOf-matchValues-validator',
    templateUrl: './none-of-match-values.component.html'
})
export class NoneOfMatchValuesValidatorComponent implements OnInit {
    employeeInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder ,private http: HttpClient) { }

        projectDomainsArray : string[] = [];
      
        ngOnInit() {
            this.employeeInfoFormGroup = this.formBuilder.group({
                projectDomains:['', RxwebValidators.noneOf({matchValues:["ECommerce", "Banking","Educational","Gaming"]})]
                
            });
          this.http.get("assets/examples/reactive-form-validators/validators/noneOf/matchValues/none-of.json").subscribe(response => {
            this.projectDomainsArray = response['projectDomainsArray'];
        })
      
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
