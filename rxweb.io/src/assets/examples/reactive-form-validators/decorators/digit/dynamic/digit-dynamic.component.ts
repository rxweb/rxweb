import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,
} from '@rxweb/reactive-form-validators';

import { User } from './user.model';

@Component({
    selector: 'app-digit-dynamic',
    templateUrl: './digit-dynamic.component.html'
})
export class DigitDynamicComponent implements OnInit {

    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let user = new User();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			age : {
				digit : true  
			},
						
			phoneNumber : {
				digit :  {conditionalExpression:(x,y) => x.age >= 25 ,} 
			},
						
			faxNumber : {
				digit :  {conditionalExpression:'x => x.age ==25',} 
			},
						
			mobileNumber : {
				digit :  {message:'Please enter only digit.',} 
			},
			        };
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
