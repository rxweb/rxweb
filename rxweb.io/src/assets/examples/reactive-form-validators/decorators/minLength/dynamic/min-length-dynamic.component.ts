import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,
} from '@rxweb/reactive-form-validators';

import { Contact } from './contact.model';

@Component({
    selector: 'app-minLength-dynamic',
    templateUrl: './min-length-dynamic.component.html'
})
export class MinLengthDynamicComponent implements OnInit {

    contactFormGroup: FormGroup
					
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let contact = new Contact();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			mobileNo : {
				minLength :  {value:10,} 
			},
						
			landLineNo : {
				minLength :  {value:8,message:'Minimum 8 characters are allowed',} 
			},
						
			countryCode : {
				minLength :  {value:3,conditionalExpression:(x,y)=> x.countryName == "India",} 
			},
						
			stateCode : {
				minLength :  {value:3,conditionalExpression:'x => x.countryName == "India"',} 
			},
			        };
		this.contactFormGroup = this.formBuilder.formGroup(contact,formBuilderConfiguration);
    }
}
