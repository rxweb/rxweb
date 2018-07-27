import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration  } from '@rxweb/reactive-form-validators';

import { EmployeeInfo } from '../employee-info.model';

@Component({
    selector: 'app-employee-info-add',
    templateUrl: './employee-info-add.component.html'
})
export class EmployeeInfoAddComponent implements OnInit {

    employeeInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let employeeInfo = new EmployeeInfo();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.validations = {
			age : {
				range :  {minimumNumber:18,maximumNumber:60,} 
			},
			experience : {
				range :  {minimumNumber:2,maximumNumber:20,conditionalExpressions:'x => x.age >=25',} 
			},
			salary : {
				range :  {minimumNumber:1000,maximumNumber:200000,message:'Your Salary should be between 10000 to 200000.',} 
			},
        };
		this.employeeInfoFormGroup = this.formBuilder.formGroup(employeeInfo,formBuilderConfiguration);
    }
}
