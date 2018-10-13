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
				leapYear :  {conditionalExpression:(x,y) =>{ return  x.name == "John" },} 
			},
						
			admissionYear : {
				leapYear :  {conditionalExpression:x => x.name == "John",} 
			},
						
			joiningYear : {
				leapYear :  {message:'{{0}} is not a leap year',} 
			},
			        };
		 var user = {
			birthYear:'', admissionYear:'', joiningYear:'', 
		}
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
