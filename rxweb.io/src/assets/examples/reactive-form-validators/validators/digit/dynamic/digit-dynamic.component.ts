import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-digit-dynamic-validator',
    templateUrl: './digit-dynamic.component.html'
})
export class DigitDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
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
		 var user = {
			age:'', phoneNumber:'', faxNumber:'', mobileNumber:'', 
		}
		this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
    }
}
