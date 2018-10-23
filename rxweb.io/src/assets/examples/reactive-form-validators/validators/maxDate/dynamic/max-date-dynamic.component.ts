import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-maxDate-dynamic-validator',
    templateUrl: './max-date-dynamic.component.html'
})
export class MaxDateDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			birthDate : {
				maxDate :  {value:new Date(2018,7,30),conditionalExpression:(x,y) => x.userName == "Bharat" ,} 
			},
						
			admissionDate : {
				maxDate :  {value:new Date(2018,7,30),conditionalExpression:'x => x.userName == "Bharat"',} 
			},
						
			registrationDate : {
				maxDate :  {value:new Date(2018,7,30),message:'{{0}} exceeds the Maximum Date Limit',} 
			},
			        };
		 var user = {
			userName:'', birthDate:'', admissionDate:'', registrationDate:'', 
		}
		this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
    }
}
