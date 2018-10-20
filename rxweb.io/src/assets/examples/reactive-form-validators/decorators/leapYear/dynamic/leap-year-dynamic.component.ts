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
				leapYear :  {conditionalExpression:(x,y) => x.name == "John" ,} 
			},
						
			admissionYear : {
				leapYear :  {conditionalExpression:'x => x.name == "John"',} 
			},
						
			joiningYear : {
				leapYear :  {message:'{{0}} is not a leap year',} 
			},
			        };
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
