import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-range-dynamic-validator',
    templateUrl: './range-dynamic.component.html'
})
export class RangeDynamicValidatorComponent implements OnInit {
    employeeInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			age : {
				range : {minimumNumber:18,maximumNumber:60,} 
			},			
			experience : {
				range : {minimumNumber:2,maximumNumber:20,conditionalExpression:'x => x.age >=25',} 
			},			
			salary : {
				range : {minimumNumber:1000,maximumNumber:200000,message:'Your Salary should be between 10000 to 200000.',} 
			},
		};
		var employeeInfo = { age:'', projectDuration:'', experience:'', salary:'',  }
		this.employeeInfoFormGroup = this.formBuilder.group(employeeInfo,formBuilderConfiguration);
    }
}
