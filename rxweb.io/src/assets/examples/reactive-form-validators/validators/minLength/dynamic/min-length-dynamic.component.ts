import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-minLength-dynamic-validator',
    templateUrl: './min-length-dynamic.component.html'
})
export class MinLengthDynamicValidatorComponent implements OnInit {
    contactFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			mobileNo : {
				minLength : {value:10,} 
			},			
			landLineNo : {
				minLength : {value:8,message:'Minimum 8 characters are allowed',} 
			},			
			stateCode : {
				minLength : {value:3,conditionalExpression:'x => x.countryName == "India"',} 
			},
		};
		var contact = { countryName:'', mobileNo:'', landLineNo:'', countryCode:'', stateCode:'',  }
		this.contactFormGroup = this.formBuilder.group(contact,formBuilderConfiguration);
    }
}
