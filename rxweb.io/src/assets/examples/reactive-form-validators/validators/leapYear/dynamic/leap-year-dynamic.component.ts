import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-leapYear-dynamic-validator',
    templateUrl: './leap-year-dynamic.component.html'
})
export class LeapYearDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			birthYear : {
				leapYear :  {conditionalExpression:(x,y) => x.name == "Bharat" ,} 
			},
						
			admissionYear : {
				leapYear :  {conditionalExpression:'x => x.name == "Bharat"',} 
			},
						
			joiningYear : {
				leapYear :  {message:'{{0}} is not a leap year',} 
			},
			        };
		 var user = {
			name:'', birthYear:'', admissionYear:'', joiningYear:'', 
		}
		this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
    }
}
