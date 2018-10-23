import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,
} from '@rxweb/reactive-form-validators';

import { User } from './user.model';

@Component({
    selector: 'app-leapYear-dynamic',
    templateUrl: './leap-year-dynamic.component.html'
})
export class LeapYearDynamicComponent implements OnInit {

    userFormGroup: FormGroup
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let user = new User();
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
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
