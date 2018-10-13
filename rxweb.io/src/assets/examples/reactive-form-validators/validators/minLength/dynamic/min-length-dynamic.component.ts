import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-minLength-dynamic-validator',
    templateUrl: './min-length-dynamic.component.html'
})
export class MinLengthDynamicValidatorComponent implements OnInit {
    contactFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			mobileNo : {
				minLength :  {value:10,} 
			},
						
			landLineNo : {
				minLength :  {value:8,message:'Minimum 8 characters are allowed',} 
			},
						
			countryCode : {
				minLength :  {value:3,conditionalExpression:(x,y)=>{ return x.countryName == "India"},} 
			},
						
			stateCode : {
				minLength :  {value:3,conditionalExpression:x => x.countryName == "India",} 
			},
			        };
		 var contact = {
			mobileNo:'', landLineNo:'', countryCode:'', stateCode:'', 
		}
		this.contactFormGroup = this.formBuilder.formGroup(contact,formBuilderConfiguration);
    }
}
