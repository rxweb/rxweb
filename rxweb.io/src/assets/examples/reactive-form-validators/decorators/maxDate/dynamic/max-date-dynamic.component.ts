import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,
} from '@rxweb/reactive-form-validators';

import { User } from './user.model';

@Component({
    selector: 'app-maxDate-dynamic',
    templateUrl: './max-date-dynamic.component.html'
})
export class MaxDateDynamicComponent implements OnInit {

    userFormGroup: FormGroup
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let user = new User();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			birthDate : {
				maxDate :  {value:new Date(2018,7,30),conditionalExpression:(x,y) => x.userName == "John" ,} 
			},
						
			admissionDate : {
				maxDate :  {value:new Date(2018,7,30),conditionalExpression:'x => x.userName == "John"',} 
			},
						
			registrationDate : {
				maxDate :  {value:new Date(2018,7,30),message:'{{0}} exceeds the Maximum Date Limit',} 
			},
			        };
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
