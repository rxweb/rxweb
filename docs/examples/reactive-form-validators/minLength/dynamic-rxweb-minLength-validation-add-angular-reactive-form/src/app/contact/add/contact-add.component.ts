import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration } from '@rxweb/reactive-form-validators';

import { Contact } from '../contact.model';

@Component({
    selector: 'app-contact-add',
    templateUrl: './contact-add.component.html'
})
export class ContactAddComponent implements OnInit {

    contactFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let contact = new Contact();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.validations = {
			countryName : {
				minLength : true  
			},
			mobileNo : {
				minLength :  {value:10,message:'Minimum 10 characters are allowed',} 
			},
			landLineNo : {
				minLength :  {value:8,message:'Minimum 8 characters are allowed',} 
			},
			countryCode : {
				minLength :  {value:3,conditionalExpressions:'x,y=>x.countryName == "India"',} 
			},
        };
		this.contactFormGroup = this.formBuilder.formGroup(contact,formBuilderConfiguration);
    }
}
