import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-minDate-dynamic-validator',
    templateUrl: './min-date-dynamic.component.html'
})
export class MinDateDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			admissionDate : {
				minDate : {value:new Date(2018,7,30),conditionalExpression:'x => x.userName == "Bharat"',} 
			},			
			registrationDate : {
				minDate : {value:new Date(2018,7,30),message:'{{0}} exceeds the Minimum Date Limit',} 
			},
		};
		var user = { userName:'', birthDate:'', admissionDate:'', registrationDate:'',  }
		this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
    }
}
